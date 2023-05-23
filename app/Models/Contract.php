<?php

namespace App\Models;

use App\Models\CoreModel;

class Contract extends CoreModel
{
    protected $visible = [
        'id',
        'code',
        'user_code',
        'principal',
        'interest_rate',
        'advance',
        'paid_at',
        'withdrawn_at',
        'url_paid_docs',
        'url_withdrawn_docs',
        'status',
        'hold_days',
        'duration',
        'interest',
        'total',
        'bank_account',
        'confirmed_by'
    ];

    protected $fillable = [
        'code',
        'user_code',
        'principal',
        'interest_rate',
        'advance',
        'paid_at',
        'withdrawn_at',
        'paid_docs',
        'withdrawn_docs',
        'confirmed_by'
    ];

    protected static $logAttributes = [
        'code',
        'user_code',
        'principal',
        'interest_rate',
        'advance',
        'paid_at',
        'withdrawn_at',
        'paid_docs',
        'withdrawn_docs',
        'confirmed_by'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'paid_docs' => 'array',
        'withdrawn_docs' => 'array',
    ];

    /**
     * The attributes that it available in the json response.
     *
     * @var array
     */
    protected $appends = [
        'status',
        'hold_days',
        'duration',
        'interest',
        'total',
        'url_paid_docs',
        'url_withdrawn_docs',
        'bank_account'
    ];

    /**
     * Get the status
     *
     * @param  string  $value
     * @return string
     */
    public function getStatusAttribute()
    {
        $status = 0;
        if (!$this->paid_docs) return $status;
        $status++; //1
        if (!$this->confirmed_by) return $status;
        $status++; //2
        if (!$this->withdrawn_at) return $status;
        $status++; //3
        if (!$this->withdrawn_docs) return $status;
        $status++; //4
        return $status;
    }

    /**
     * Get duration interger days
     */
    public function getHoldDaysAttribute()
    {
        $start = date_create($this->paid_at);
        $end = !!$this->withdrawn_at ? date_create($this->withdrawn_at) : date_create();
        return (int)date_diff($start, $end)->format('%a');
    }

    /**
     * Get duration string
     */
    public function getDurationAttribute()
    {
        $dayTitle = trans('custom.day');
        $weekTitle = trans('custom.week');
        $duration = $this->hold_days;
        return $this->status <= 1
            ? 0 . $dayTitle : ($duration < 7 ? '' : floor($duration / 7) . $weekTitle) . ' ' . ($duration % 7) . $dayTitle;
    }

    /**
     * Get interest
     */
    public function getInterestAttribute()
    {
        $duration = $this->hold_days;
        return
            $this->status <= 1
            ? 0
            : floor(
                $this->principal *
                    (pow(1 + $this->interest_rate, $duration / 7) - 1)
            );
    }

    /**
     * Get total
     */
    public function getTotalAttribute()
    {
        return $this->principal + $this->interest;
    }

    /**
     * Get the bank account
     */
    public function getBankAccountAttribute()
    {
        return !!$this->user ? $this->user->bank_account : null;
    }

    /**
     * Get the url paid documents
     *
     * @param  string  $value
     * @return string
     */
    public function getUrlPaidDocsAttribute()
    {
        $code = !!$this->user ? $this->user->code : null;
        return array_map(function ($doc) use ($code) {
            return get_url_image(
                'storage/' . md5($code) . '/c/' . $doc
            );
        }, !!$this->paid_docs ? $this->paid_docs : []);
    }

    /**
     * Get the url withdrawn documents
     *
     * @param  string  $value
     * @return string
     */
    public function getUrlWithdrawnDocsAttribute()
    {
        $code = !!$this->user ? $this->user->code : null;
        return array_map(function ($doc) use ($code) {
            return get_url_image(
                'storage/' . md5($code) . '/c/' . $doc
            );
        }, !!$this->withdrawn_docs ? $this->withdrawn_docs : []);
    }

    /**
     * Get the user that owns the contract.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_code', 'code');
    }

    /**
     * Create code
     */
    static public function generateUniqueCode()
    {
        do {
            $code = random_int(10000000, 99999999);
        } while (self::where('code', $code)->first());

        return $code;
    }

    /**
     * Summary
     */
    static public function summary()
    {
        $contracts = self::whereNotNull('confirmed_by')
            ->where('withdrawn_docs', '[]')
            ->groupBy('user_code')
            ->selectRaw('sum(principal) as sum, user_code')
            ->get();
        return $contracts;
    }
}
