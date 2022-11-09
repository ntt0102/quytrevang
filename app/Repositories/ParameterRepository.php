<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Parameter;

class ParameterRepository extends CoreRepository
{
    /**
     * @var Parameter
     */
    protected $model;

    /**
     * ParameterRepository constructor.
     *
     * @param Parameter $model
     */
    public function __construct(Parameter $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function getValue(string $slug, string $default = '')
    {
        $parameter = $this->findOne([['slug', $slug]]);
        if ($parameter) return $parameter->value;
        return $default;
    }

    public function setValue(string $slug, string $value)
    {
        $parameter = $this->findOne([['slug', $slug]]);
        $this->update($parameter, ['value' => $value]);
    }
}
