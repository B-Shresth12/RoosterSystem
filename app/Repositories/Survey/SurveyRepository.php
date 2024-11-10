<?php

namespace App\Repositories\Survey;

use App\Models\Survey;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class SurveyRepository implements SurveyRepositoryInterface
{
    public function index(): Collection
    {
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

    function update($data, $id): array
    {
        try {

            $survey = Survey::where('id', $id)->first();
            if (!@$survey) {
                return [
                    'status' => false,
                    'message' => "Survey not Found",
                ];
            }
            $data['is_active'] = $data['active_status'];

            $status = $survey->update($data);
            if ($status) {
                return [
                    'status' => true,
                    'survey' => $survey
                ];
            }
        } catch (Exception $e) {
            Log::error("SERVER ERROR::::{$e->getMessage()} on {$e->getFile()} line no: {$e->getLine()}");
        }
        return [
            'status' => false,
            'message' => "Something went wrong"
        ];
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
