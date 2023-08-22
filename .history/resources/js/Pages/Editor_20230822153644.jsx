import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

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

    //AG-GRID starts here
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  
    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
      {field: 'make', filter: true},
      {field: 'model', filter: true},
      {field: 'price'}
    ]);
  
    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        sortable: true
      }));
  
    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
      console.log('cellClicked', event);
    }, []);
  
    // Example load data from server
    useEffect(() => {
      fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
    }, []);
  
    // Example using Grid's API
    const buttonListener = useCallback( e => {
      gridRef.current.api.deselectAll();
    }, []);


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
                            <div className='justify-center'>

                                {/* Example using Grid's API */}
                                <button onClick={buttonListener}>Push Me</button>

                                {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                                <div className="ag-theme-alpine" style={{ height: 500}}>

                                <AgGridReact
                                    ref={gridRef} // Ref for accessing Grid's API

                                    rowData={rowData} // Row Data for Rows

                                    columnDefs={columnDefs} // Column Defs for Columns
                                    defaultColDef={defaultColDef} // Default Column Properties

                                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                    rowSelection='multiple' // Options - allows click selection of rows

                                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                                    />
                                </div>
                                </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
