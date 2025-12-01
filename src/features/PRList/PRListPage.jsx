import { useState } from 'react';
import PRListForm from "./PRListForm.jsx";

export default function PRListPage() {
    const [errors, setErrors] = useState([]);
    const [config, setConfig] = useState(null);

    // Orchestration functions:
    // These handlers live in the parent component (PRListPage) because React’s
    // “lift state up” pattern keeps shared data and side-effects in a single place.
    // Child components (Form, Grid, ErrorBanner) stay focused on UI concerns,
    // while this container coordinates data flow, service interactions, and errors.

    function handleChildError(source, message) {
        setErrors(prev => [...prev, message]);
    }
    
    function handleFormSubmit(configDto) {
        // Receive a config DTO from the form
        // Validate it if needed (later: GitHub PAT check, repo list check, etc.)
        // Try to save using your settings service
        // On success:
        // store config in state
        // clear errors
        // On failure:
        // call setErrors with a user-friendly message
        // OR call handleChildError('service', message)

        // For now: just store the config
        setConfig(configDto);

        // Clear errors on new submit
        setErrors([]);
    }
    // end: Orchestration functions
    
    return (
        <>
            <h2>Pull Requests</h2>

            <PRListForm
                onSubmit={handleFormSubmit}
                onError={(message) => handleChildError('form', message)}
            />
        </>
    );
}
