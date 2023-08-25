<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CsvFile extends Controller
{
    public function show(string $id) {
        $path = Storage::url($id);
        return response()->file($path);
    }
}
