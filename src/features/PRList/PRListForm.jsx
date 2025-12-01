import { useState } from 'react';

export default function PRListForm({ onSubmit, onError }) {
    const [pat, setPat] = useState('');
    const [reposText, setReposText] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // gather DTO from local state
        // call onSubmit(dto)
        onSubmit({pat, reposText});
    };

    return (
        <>
            <form action="#" onSubmit={handleSubmit}>
                <div className="prlist-form">
                    <div className="prlist-form-repos">
                        <label htmlFor="repos">GitHub Org/Repo(s):</label><br/>
                        <textarea
                            id="repos"
                            rows="6"
                            cols="40"
                            value={reposText}
                            onChange={e => setReposText(e.target.value)}
                        />
                    </div>
                    
                    <div className="prlist-form-pat">
                        <label htmlFor="pat">GitHub Personal Access Token:</label><br/>
                        <input
                            id="pat"
                            size="48"
                            type="password"
                            value={pat}
                            onChange={e => setPat(e.target.value)}
                        />

                        <br/>

                        <button type="submit">Save Settings</button>
                    </div>
                </div>
            </form>
        </>
    );
}
