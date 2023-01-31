<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Variable;

class VariableRepository extends CoreRepository
{
    /**
     * @var Variable
     */
    protected $model;

    /**
     * VariableRepository constructor.
     *
     * @param Variable $model
     */
    public function __construct(Variable $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function getValue(string $slug, string $default = '')
    {
        $variable = $this->findOne([['name', $slug]]);
        if (!!$variable) return $variable->value;
        return $default;
    }

    public function setValue(string $slug, string $value)
    {
        $variable = $this->findOne([['name', $slug]]);
        if (!!$variable)
            $this->update($variable, ['value' => $value]);
    }
}
