<?php

namespace App\Services\Special;

use App\Services\CoreService;
use App\Models\VpsUser;

class VpsOrderService extends CoreService
{
    private $vpsUser;

    public function __construct(VpsUser $vpsUser)
    {
        $this->vpsUser = $vpsUser;
    }

    public function getPosition()
    {
    }
}
