<?php

namespace App\Models;

use App\Models\CoreModel;

class Faq extends CoreModel
{
    protected $visible = [
        'id',
        'topic',
        'question',
        'answer'
    ];

    protected $fillable = [
        'topic',
        'question',
        'answer'
    ];

    protected static $logAttributes = [
        'id',
        'topic',
        'question',
        'answer'
    ];
}
