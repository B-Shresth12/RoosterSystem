<?php

namespace App\Providers;

use App\Repositories\Question\QuestionRepository;
use App\Repositories\Question\QuestionRepositoryInterface;
use App\Repositories\Survey\SurveyRepository;
use App\Repositories\Survey\SurveyRepositoryInterface;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            SurveyRepositoryInterface::class,
            SurveyRepository::class
        );
        $this->app->bind(
            QuestionRepositoryInterface::class,
            QuestionRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
