<?php

namespace App\Repositories\Survey;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Collection;


interface SurveyRepositoryInterface
{
    public function index(): Collection;
    public function create(array $data): Survey;
    public function destroy($id): bool;
    public function order($order): bool;
}
