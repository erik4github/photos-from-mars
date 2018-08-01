// if using own server to hide API key
// const endpointURL = '';
// export function getNewPhotos(formData) {
//     let photos;
//     return fetch(endpointURL, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//             }
//         })
//         .then((response) => response.ok ? response.json() : console.log(response.status))
//         .then((responseJSON) => {
//             photos = responseJSON.photos;
//             return photos;
//         });
// }

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
