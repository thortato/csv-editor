<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CsvFile extends Controller
{
    public function show(string $id) {
        $path = "../../../storage/files/".$id;
        return response()->file($path);
    }
}
