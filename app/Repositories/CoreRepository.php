<?php

namespace App\Repositories;

use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

class CoreRepository
{
    protected $model;

    /**
     * CoreRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    /**
     * @inheritdoc
     */
    public function latest($field)
    {
        return $this->model->latest($field)->first();
    }
    /**
     * @inheritdoc
     */
    public function where(array $conditions = [], $columns = ['*'], $orderBy = ['id', 'desc'])
    {
        return $this->model->where($conditions)->when(!empty($orderBy), function ($query) use ($orderBy) {
            $pairs = array_chunk($orderBy, 2);
            foreach ($pairs as $pair) {
                $query->orderBy(...$pair);
            }
        })->get($columns);
    }
    /**
     * @inheritdoc
     */
    public function whereIn($field, $array)
    {
        return $this->model->whereIn($field, $array)->get();
    }
    /**
     * @inheritdoc
     */
    public function whereJsonContains($field, array $conditions)
    {
        return $this->model->whereJsonContains($field, $conditions)->get();
    }
    /**
     * @inheritdoc
     */
    public function findOne(array $conditions)
    {
        return $this->model->where($conditions)->first();
    }
    /**
     * @inheritdoc
     */
    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }
    /**
     * @inheritdoc
     */
    public function findByIdWithTrashed(int $id)
    {
        return $this->model->withTrashed()->findOrFail($id);
    }
    /**
     * @inheritdoc
     */
    public function findAll($columns = ['*'], $orderBy = ['id', 'desc'])
    {
        return $this->model->when(!empty($orderBy), function ($query) use ($orderBy) {
            $pairs = array_chunk($orderBy, 2);
            foreach ($pairs as $pair) {
                $query->orderBy(...$pair);
            }
        })->get($columns);
    }
    /**
     * @inheritdoc
     */
    public function findAllWithTrashed($columns = ['*'])
    {
        return $this->model->withTrashed()->get($columns);
    }
    /**
     * @inheritdoc
     */
    public function findTrashedAll($columns = ['*'])
    {
        return $this->model->onlyTrashed()->get($columns);
    }
    /**
     * @inheritdoc
     */
    public function findByIds(array $ids, $columns = ['*'])
    {
        return $this->model->whereIn('id', $ids)->get($columns);
    }
    /**
     * @inheritdoc
     */
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }
    /**
     * @inheritdoc
     */
    public function update(Model $model, array $attributes = [])
    {
        return $model->update($attributes);
    }
    /**
     * @inheritdoc
     */
    public function save(Model $model)
    {
        return $model->save();
    }
    /**
     * @inheritdoc
     */
    public function delete(Model $model)
    {
        return $model->delete();
    }
    /**
     * @inheritdoc
     */
    public function get($query)
    {
        return $query->get();
    }
    /**
     * @inheritdoc
     */
    public function destroy(array $ids)
    {
        return $this->model->destroy($ids);
    }
    /**
     * @inheritdoc
     */
    public function restore(Model $model)
    {
        return $model->restore();
    }
    /**
     * @inheritdoc
     */
    public function forceDelete(Model $model)
    {
        return $model->forceDelete();
    }
    /**
     * @inheritdoc
     */
    public function findCount(array $conditions)
    {
        return $this->model->where($conditions)->count();
    }
    /**
     * @inheritdoc
     */
    public function toBase($query)
    {
        return $query->toBase();
    }
    /**
     * @inheritdoc
     */
    public function updateMultiple(Builder $query, array $attributes = [])
    {
        return $query->update($attributes);
    }
    /**
     * @inheritdoc
     */
    public function updateOrCreate(array $attributes, array $values)
    {
        return $this->model->updateOrCreate($attributes, $values);
    }
    /**
     * @inheritdoc
     */
    public function firstOrCreate(array $attributes, array $values)
    {
        return $this->model->firstOrCreate($attributes, $values);
    }
    /**
     * @inheritdoc
     */
    public function model()
    {
        return get_class($this->model);
    }
    /**
     * @inheritdoc
     */
    public function makeModel()
    {
        $this->model = App::make($this->model());
        return $this->model;
    }
    /**
     * @inheritdoc
     */
    public function resetModel()
    {
        return $this->makeModel();
    }
}
