import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Dashboard({ auth }) {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            console.log(error);
            setErrorMessage('An error occurred while uploading the file.');
            setSuccessMessage('');
        }
    };

    //ag-grid here
    const [rowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);
    
    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ]);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editor</h2>}
        >
            <Head title="Editor" />

            {/* Feature Here */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-black-900">
                            <div className="container mt-5">

                            {/* <form onSubmit={handleSubmit}>
                                <h3 className="text-center mb-5">Upload your .CSV file here</h3>
                                {successMessage && (
                                    <div className="alert alert-success">
                                        <strong>{successMessage}</strong>
                                    </div>
                                )}
                                {errorMessage && (
                                    <div className="alert alert-danger">
                                        <strong>{errorMessage}</strong>
                                    </div>
                                )}

                                <div className="custom-file flex justify-center ">
                                    <input
                                        type="file"
                                        name="file"
                                        className="custom-file-input border border-black-700 py-2"
                                        id="chooseFile"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button type="submit" className="center bg-teal hover:bg-[1D7874] text-white font-bold my-2 py-2 px-4 rounded">
                                        Upload Files
                                    </button>
                                </div>
                            </form> */}
                            Tester
                            
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
