import fetch from 'node-fetch';
import 'dotenv/config'

var options = {
    'method': 'POST',
    'headers': {
        'Authorization': process.env.API_KEY,
        'Content-Type': 'application/json'
    }
}

export function createSite() {
    var url = 'https://api.duda.co/api/sites/multiscreen/create'
    options.body = JSON.stringify({
        "template_id": process.env.TEMPLATE_ID
    })

    return fetch(url, options)
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                data
            }))
        })
        .catch(error => console.log('error', error));

}

export function updateSite(siteName, businessData) {
    var url = `https://api.duda.co/api/sites/multiscreen/${siteName}/content`
    options.body = JSON.stringify(businessData)
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                console.log(response.status)
            }
        })
        .catch(error => console.log('error', error));
}

export function getPreviewLink(siteName, email) {
    var link = `${process.env.PREVIEW_HOST}${siteName}?device=desktop`
    console.log(link)
    return link
        //call mailchimp
}