import { httpsConverter } from '../utility/utility';

export function getNewPhotos(rover, sol) {
    let photos;
    return fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/${rover}/photos?sol=${sol}`)
        .then((response) => response.ok ? response.json() : console.log(response.status))
        .then((responseJSON) => {
            let convertedJSON = JSON.stringify(responseJSON, httpsConverter);
            convertedJSON = JSON.parse(convertedJSON);
            photos = convertedJSON.photos;
            return photos;
        });
}
