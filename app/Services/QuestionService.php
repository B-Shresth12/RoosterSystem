<?php

namespace App\Services;

use App\Http\Requests\Admin\SectionRequest;
use App\Repositories\Question\QuestionRepositoryInterface;

class QuestionService
{
    function __construct(protected QuestionRepositoryInterface $questionRepository) {}

    function getQuestions($surveyId)
    {
        return $this->questionRepository->getSurveyQuestions($surveyId);
    }

    function createSection(SectionRequest $request, $surveyId)
    {
        return $this->questionRepository->addSection($request->validated(), $surveyId);
    }

    function editSection(SectionRequest $request, $surveyId, $sectionId)
    {
        return $this->questionRepository->editSection($request->validated(), $surveyId, $sectionId);
    }
}
