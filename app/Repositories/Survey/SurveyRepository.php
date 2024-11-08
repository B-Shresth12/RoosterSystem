<?php

namespace App\Repositories\Survey;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Collection;

class SurveyRepository implements SurveyRepositoryInterface
{
    public function index():Collection{
        return Survey::orderBy('order_no')->get();
    }

    public function create(array $data): Survey
    {
        $data['is_active'] = $data['active_status'];
        return Survey::create($data);
    }

    public function destroy($id): bool
    {
        return Survey::destroy($id);
    }

    public function order($order): bool
    {
        $m_order = 0;
        foreach ($order as $item) {
            $updateData = ["order_no" => ++$m_order];
            Survey::where('id', $item)->update($updateData);
        }
        // dd(Survey::orderBy('order_no')->pluck('id')->toArray());

        return true;
    }
}
