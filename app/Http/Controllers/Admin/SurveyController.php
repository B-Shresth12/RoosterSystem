<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SurveyRequest;
use App\Models\Survey;
use App\Services\SurveyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{

    function __construct(protected SurveyService $surveyService) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $surveys = $this->surveyService->getSurvey();
        return Inertia::render('Survey/Index', compact('surveys'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Survey/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SurveyRequest $request)
    {
        $data = $request->validated();
        $survey = $this->surveyService->createSurvey($data);

        // return response()->json(true);
        return to_route('admin.questions.index', $survey->id)->with('questions', $survey->questions);
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
    public function edit(string $id)
    {
        $survey = Survey::find($id);
        if (!@$survey) {
            return back()->with('error', 'Survey not Found');
        }

        return Inertia::render('Survey/Form', compact('survey'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SurveyRequest $request, string $id)
    {
        $data = $request->validated();
        $status = $this->surveyService->updateSurvey($data,  $id);
        if ($status['status']) {
            return to_route('admin.surveys.index')->with('success', 'Survey has been updated');
        }

        return back()->with('error', $status['message']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Survey::destroy($id);

        return back()->with('success', "Survey has been deleted");
    }

    /**
     * Survey Order Manager
     */
    function order(Request $request)
    {
        $order = $request->input('order');

        $status = $this->surveyService->orderSurvey($order);
        return to_route('admin.surveys.index')->with('success', "Survey Sorted");
    }
}
