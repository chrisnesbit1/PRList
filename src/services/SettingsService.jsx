import { useState } from 'react';

export function CreateSettingsDto(pat, reposArray) {
  return { pat, repos: reposArray };
}

export function CreateSettingsService() {
  let runtimePat = "";              // stays in memory only
  const STORAGE_KEY = "prlist_settings";

  return {
    getRuntimePat() {
      return runtimePat;
    },

    setRuntimePat(pat) {
      runtimePat = pat;
    },

    load() {
        console.log("CreateSettingsService.load called");
        try {
            const json = localStorage.getItem(STORAGE_KEY);
            if (!json) return CreateSettingsDto(runtimePat, []);
            const stored = JSON.parse(json);
            console.log(stored.repos);
            const repos = Array.isArray(stored.repos) ? stored.repos : [];
            return CreateSettingsDto(runtimePat, repos);
        } catch {
            return CreateSettingsDto(runtimePat, []);
        }
    },

    save(settingsDto) {
        console.log("CreateSettingsService.save called");
        console.log(settingsDto);
        const { pat, repos } = settingsDto;

        // PAT stays in memory only
        runtimePat = pat;

        // Only persist non-secret fields
        const toPersist = { repos };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
    }
  };
}
