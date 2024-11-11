<?php

namespace App\Enums;

enum QuestionType: string
{
    case INPUT = "input";
    case MULTIPLE_ANSWERS = "checkbox";
    case SINGLE_ANSWER = "radio";
}
