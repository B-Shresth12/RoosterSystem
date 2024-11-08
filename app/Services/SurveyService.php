<?php

namespace App\Services;

use App\Repositories\Survey\SurveyRepositoryInterface;

class SurveyService
{

    function __construct(protected SurveyRepositoryInterface $surveyRepository) {}

    function getSurvey(){
        return $this->surveyRepository->index();
    }

    function createSurvey(array $data)
    {
        return $this->surveyRepository->create($data);
    }

    function orderSurvey($order)
    {
        return $this->surveyRepository->order($order);
    }
}
