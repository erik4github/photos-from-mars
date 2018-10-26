import { httpsConverter } from '../utility/utility';

export function getLatestPhotos() {
    let photos;
    return fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/latest_photos`)
        .then((response) => response.text())
        .then((text) => text.length ? JSON.parse(text) : {}) 
        .then((responseJSON) => {
            let convertedJSON = JSON.stringify(responseJSON, httpsConverter);
            convertedJSON = JSON.parse(convertedJSON);
            photos = convertedJSON.latest_photos;
            return photos;
        });
}
