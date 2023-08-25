<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CsvFile extends Controller
{
    public function show(string $id) {
        $path = public_path($id);
        return response()->file($path);
    }

    public function index(){
        $files = Storage::disk('public')->files('uploads');
        return response($files);
        // return response($files[$files.count($files)-1]);
    }
}