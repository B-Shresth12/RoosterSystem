<?php

namespace App\Rules;

use App\Enums\QuestionType;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class QuestionTypeRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $questionType = array_column(QuestionType::cases(), 'name');
        $requestQuestionType = request()->input('question_type');
        if(!in_array($requestQuestionType, $questionType)){
            $fail("Invalid Question Type");
        }
    }
}
