<?php

namespace App\Repositories\Question;

use App\Models\Question;
use App\Models\Survey;
use Exception;
use Illuminate\Support\Facades\Log;

class QuestionRepository implements QuestionRepositoryInterface
{

    public function getSurveyQuestions($surveyId): array
    {
        $survey = Survey::with(['questions' =>  fn($q) => $q->where('parent_id', null)->with('children')])->find($surveyId);
        if (!@$survey) {
            return [
                'status' => false,
                'message' => "Survey Not Found",
            ];
        }
        return [
            'status' => true,
            'questions' => $survey->questions,
        ];
    }

    public function addSection($data, $surveyId): array
    {
        try {
            $status = Question::create([
                'survey_id' => $surveyId,
                'text' => $data['section_name'],
                'description' => $data['section_description'],
                'status' => $data['active_status'],
                'order_no' => Question::where('parent_id', null)->max('order_no') + 1
            ]);
            if ($status) {
                return [
                    "status" => true,
                    "message" => "Section has been added"
                ];
            }
        } catch (Exception $e) {
            Log::error("SERVER ERROR::::{$e->getMessage()} on {$e->getFile()} line no: {$e->getLine()}");
        }

        return [
            "status" => false,
            "message" => "Something went wrong",
        ];
    }

    public function editSection($data, $surveyId, $sectionId): array
    {

        try {
            $section = Question::where('parent_id', null)->find($sectionId);
            if (!@$section) {
                return [
                    'status' => false,
                    "message" => "Question Section not Found",
                ];
            }
            $status = $section->update([
                'text' => $data['section_name'],
                'description' => $data['section_description'],
                'status' => $data['active_status'],
            ]);
            if ($status) {
                return [
                    'status' => true,
                    'message' => "Question Section has been updated",
                ];
            }
        } catch (Exception $e) {
            Log::error("SERVER ERROR::::{$e->getMessage()} on {$e->getFile()} line no: {$e->getLine()}");
        }

        return [
            'status' => false,
            "message" => "Something went wrong",
        ];
    }
}
