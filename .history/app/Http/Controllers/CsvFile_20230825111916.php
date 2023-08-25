<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CsvFile extends Controller
{
    public function show(string $id) {
        $path = storage_path("app\\public\\".$id);
        return response()->file($path);
    }
}