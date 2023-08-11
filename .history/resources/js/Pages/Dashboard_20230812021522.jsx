import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';

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
            setErrorMessage('An error occurred while uploading the file.');
            setSuccessMessage('');
        }
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-3xl text-gray-900">Welcome, {auth.user.name}</div>
                        <div className="p-6 text-black-900">
                            <div className="container mt-5">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-center mb-5">Upload File in Laravel</h3>
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
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="file"
                                        className="custom-file-input"
                                        id="chooseFile"
                                        onChange={handleFileChange}
                                    />
                                    <label className="custom-file-label" htmlFor="chooseFile">
                                        {file ? file.name : 'Select file'}
                                    </label>
                                </div>
                                <button type="submit" className="text-center btn btn-primary btn-block mt-4">
                                    Upload Files
                                </button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
