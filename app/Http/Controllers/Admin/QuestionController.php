<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SectionRequest;
use App\Models\Question;
use App\Models\Survey;
use App\Services\QuestionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\Mode;
use App\Enums\QuestionType;
use App\Http\Requests\Admin\AddQuestionRequest;

class QuestionController extends Controller
{

    public function __construct(protected QuestionService $questionService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(string $surveyId)
    {
        $response = $this->questionService->getQuestions(surveyId: $surveyId);

        if ($response['status']) {
            $questions = $response['questions'];
            return Inertia::render('Question/Index', compact('questions', 'surveyId'));
        }

        return to_route('admin.surveys.index',)->with('error', $response['message']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($surveyId)
    {
        //checking if survey exists or not
        $survey = Survey::where('id', $surveyId)->exists();
        if (!@$survey) {
            return to_route('admin.surveys.index')->with('error', 'Survey not Found');
        }

        //checking the mode of creation i.e. creating question section or question
        $mode = request()->get('mode');
        if (!in_array($mode, array_column(Mode::cases(), 'value'))) {
            return to_route('admin.surveys.index')->with('error', 'Invalid mode selected.');
        }

        //rendering the inertia page according to the
        return match ($mode) {
            MODE::ROW->value => Inertia::render('Question/SectionForm', compact('surveyId')),
            MODE::CHILD->value => $this->renderQuestionForm($surveyId),
        };
    }

    private function renderQuestionForm($surveyId)
    {
        $questionTypes = array_column(QuestionType::cases(), 'name');
        $sections = Question::where(['parent_id' => null, 'question_type' => null])->orderBy('order_no')->get();
        return Inertia::render('Question/QuestionForm', compact('surveyId', 'sections', 'questionTypes'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($surveyId, Request $request)
    {
        //checking if survey exists or not
        $survey = Survey::where('id', $surveyId)->exists();
        if (!@$survey) {
            return to_route('admin.surveys.index')->with('error', 'Survey not Found');
        }

        //checking the mode of creation i.e. creating question section or question
        $mode = request()->get('mode');
        if (!in_array($mode, array_column(Mode::cases(), 'value'))) {
            return to_route('admin.surveys.index')->with('error', 'Invalid mode selected.');
        }

        $mode = $request->get('mode');
        $status = match ($mode) {
            MODE::ROW->value => $this->questionService->createSection(
                surveyId: $surveyId,
                request: app(
                    SectionRequest::class
                )
            ),
            MODE::CHILD->value => $this->questionService->createQuestion(
                surveyId: $surveyId,
                request: app(AddQuestionRequest::class)
            ),
        };

        if ($status['status']) {
            return to_route('admin.questions.index', $surveyId)->with('success', $status['message']);
        }
        return to_route('admin.questions.index', $surveyId)->with('error', $status['message']);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $surveyId, Question $question)
    {
        //checking if survey exists or not
        $survey = Survey::where('id', $surveyId)->exists();
        if (!@$survey) {
            return to_route('admin.surveys.index')->with('error', 'Survey not Found');
        }

        //checking the mode of creation i.e. creating question section or question
        $mode = request()->get('mode');
        if (!in_array($mode, array_column(Mode::cases(), 'value'))) {
            return to_route('admin.surveys.index')->with('error', 'Invalid mode selected.');
        }

        //rendering the inertia page according to the
        return match ($mode) {
            MODE::ROW->value => Inertia::render(
                'Question/SectionForm',
                compact(
                    'surveyId',
                    'question'
                )
            ),
            MODE::CHILD->value => dd('question'),
        };
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $surveyId,  string $question)
    {
        //checking if survey exists or not
        $survey = Survey::where('id', $surveyId)->exists();
        if (!@$survey) {
            return to_route('admin.surveys.index')->with('error', 'Survey not Found');
        }

        //checking the mode of creation i.e. creating question section or question
        $mode = request()->get('mode');
        if (!in_array($mode, array_column(Mode::cases(), 'value'))) {
            return to_route('admin.surveys.index')->with('error', 'Invalid mode selected.');
        }

        $mode = $request->get('mode');
        $status = match ($mode) {
            MODE::ROW->value => $this->questionService->editSection(
                surveyId: $surveyId,
                sectionId: $question,
                request: app(
                    SectionRequest::class
                )
            ),
            MODE::CHILD->value => dd('question'),
        };

        if ($status['status']) {
            return to_route('admin.questions.index', $surveyId)->with('success', $status['message']);
        }
        return to_route('admin.questions.index', $surveyId)->with('error', $status['message']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($surveyId, $question)
    {
        Question::destroy($question);

        return to_route('admin.questions.index', $surveyId)->with('success', "Data has been deleted");
    }
}
