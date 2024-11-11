<?php

namespace App\Http\Requests\Admin;

use App\Rules\QuestionTypeRule;
use Illuminate\Foundation\Http\FormRequest;

class AddQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'question' => 'bail|required',
            'question_section' => 'bail|required|exists:questions,id',
            'question_type' => ['bail', 'required', new QuestionTypeRule],
            'active_status' => 'boolean',
            'description' => 'nullable',
        ];
    }
}
