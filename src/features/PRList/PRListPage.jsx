import { useState, useMemo } from 'react';
import PRListForm from "./PRListForm.jsx";
import { CreateSettingsService } from "../../services/SettingsService.jsx";

export default function PRListPage() {
    const settingsService = useMemo(() => CreateSettingsService(), []);
    const [errors, setErrors] = useState([]);
    const [config, setConfig] = useState(() => settingsService.load());

    // Orchestration functions:
    // These handlers live in the parent component (PRListPage) because React’s
    // “lift state up” pattern keeps shared data and side-effects in a single place.
    // Child components (Form, Grid, ErrorBanner) stay focused on UI concerns,
    // while this container coordinates data flow, service interactions, and errors.

    function handleChildError(source, message) {
        setErrors(prev => [...prev, message]);
    }
    
    function handleFormSubmit(configDto) {
        console.log("handleFormSubmit called");
        console.log(configDto);
        // Receive a config DTO from the form
        // Validate it if needed (later: GitHub PAT check, repo list check, etc.)
        // Try to save using your settings service
        // On success:
        // store config in state
        // clear errors
        // On failure:
        // call setErrors with a user-friendly message
        // OR call handleChildError('service', message)

        try {
            settingsService.save(configDto);
            setConfig(configDto);
            setErrors([]);
        } catch (err) {
            handleChildError('service', err.message || 'Failed to save settings');
        }
    }
    // end: Orchestration functions
    
    return (
        <>
            <h2>Pull Requests</h2>

            <PRListForm
                initialPat={config?.pat ?? ""}
                initialRepos={config?.repos ?? []}
                onSubmit={handleFormSubmit}
                onError={(message) => handleChildError('form', message)}
            />
        </>
    );
}
