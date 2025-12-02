import { useState, useEffect } from 'react';
import { CreateSettingsDto } from "../../services/SettingsService.jsx";

export default function PRListForm({ onSubmit, onError, initialPat = "", initialRepos = [] }) {
    const [pat, setPat] = useState(initialPat);
    const [reposText, setReposText] = useState(initialRepos.join("\n"));

    useEffect(() => {
        setPat(initialPat);
    }, [initialPat]);

    useEffect(() => {
        setReposText(initialRepos.join("\n"));
    }, [initialRepos]);

    function handleSubmit(e) {
        e.preventDefault();
        
        const repos = reposText
            .split("\n")
            .map(r => r.trim())
            .filter(Boolean);

        repos.forEach(repo => {
            if (repo.indexOf("/") === -1) {
                const err = new Error(`Invalid GitHub repo: ${repo}`);
                if (onError) onError(err.message);
                throw err;
            }
        });

        const dto = CreateSettingsDto(pat, repos);
        onSubmit(dto);
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
