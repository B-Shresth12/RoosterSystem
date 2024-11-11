<?php

namespace App\Repositories\Question;

interface QuestionRepositoryInterface
{
    public function getSurveyQuestions($surveyId): array;

    public function addSection($data, $surveyId): array;
    public function addQuestion($data, $surveyId): array;

    public function editSection($data, $surveyId, $sectionId): array;
}
