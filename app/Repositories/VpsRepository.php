<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Vps;

class VpsRepository extends CoreRepository
{
    /**
     * @var Vps
     */
    protected $model;

    /**
     * VpsRepository constructor.
     *
     * @param Vps $model
     */
    public function __construct(Vps $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function getVps($date)
    {
        if ($date)
            return [
                'ATO' => [
                    'price' => $this->getQueryTimeRange($date, 'ATO')->where('type', 0)->get(),
                    'volume' => $this->getQueryTimeRange($date, 'ATO')->where('type', 1)->get(),
                    'vol10' => $this->getQueryTimeRange($date, 'ATO')->where('type', 2)->get()
                ],
                'ATC' => [
                    'price' => $this->getQueryTimeRange($date, 'ATC')->where('type', 0)->get(),
                    'volume' => $this->getQueryTimeRange($date, 'ATC')->where('type', 1)->get(),
                    'vol10' => $this->getQueryTimeRange($date, 'ATC')->where('type', 2)->get()
                ],
            ];
        else [];
    }

    /**
     * @inheritdoc
     */
    private function getQueryTimeRange($date, $session)
    {
        $startTime = trading_time('start' . $session . 'Time');
        $endTime = trading_time('end' . $session . 'Time');
        return $this->model->whereDate('x', $date)
            ->whereTime('x', '>=', $startTime)
            ->whereTime('x', '<=', $endTime);
    }

    /**
     * @inheritdoc
     * @param int $days
     */
    public function clear($days)
    {
        if ($days) return $this->model->whereDate('x', '<', now()->subDays($days))->delete();
        else return Vps::truncate();
    }
}
