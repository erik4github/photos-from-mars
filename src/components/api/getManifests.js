export function fetchRoverManifest(rover) {
    let maxSol;
    return fetch(`https://mars-photos.herokuapp.com/api/v1/manifests/${rover}`)
        .then((response) => response.ok ? response.json() : console.log(response.status))
        .then((responseJSON) => {
            maxSol = responseJSON.photo_manifest.max_sol;
            return maxSol;
        });
}

