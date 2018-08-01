import { httpsConverter } from '../utility/utility';

export function getLatestPhotos() {
    let photos;
    return fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/latest_photos`)
        .then((response) => response.ok ? response.json() : console.log(response.status))
        .then((responseJSON) => {
            let convertedJSON = JSON.stringify(responseJSON, httpsConverter);
            convertedJSON = JSON.parse(convertedJSON);
            photos = convertedJSON.latest_photos;
            return photos;
        });
}
