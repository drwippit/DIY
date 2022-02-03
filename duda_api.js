import fetch from 'node-fetch';
import 'dotenv/config'
import { createContact, sendEmail } from './mailchimp_api.js';

var options = {
    'method': 'POST',
    'headers': {
        'Authorization': process.env.DUDA_API_KEY,
        'Content-Type': 'application/json'
    }
}

var serviceList = {
    "boarding": { "data": { "image": "https://irp.cdn-website.com/md/dmtmpl/aad0f58c-db98-441d-823b-d7a4073ea56d/dms3rep/multi/CCB-6d3eb3f9.svg", "alt-text": "boarding" } },
    "wellness": { "data": { "image": "https://irp.cdn-website.com/md/dmtmpl/aad0f58c-db98-441d-823b-d7a4073ea56d/dms3rep/multi/CCB-6d3eb3f9.svg", "alt-text": "wellness" } },
    "emergencies": { "data": { "image": "https://irp.cdn-website.com/md/dmtmpl/aad0f58c-db98-441d-823b-d7a4073ea56d/dms3rep/multi/CCB-6d3eb3f9.svg", "alt-text": "emergencies" } },
    "medicine": { "data": { "image": "https://irp.cdn-website.com/md/dmtmpl/aad0f58c-db98-441d-823b-d7a4073ea56d/dms3rep/multi/CCB-6d3eb3f9.svg", "alt-text": "medicine" } },
    "surgeries": { "data": { "image": "https://irp.cdn-website.com/md/dmtmpl/aad0f58c-db98-441d-823b-d7a4073ea56d/dms3rep/multi/CCB-6d3eb3f9.svg", "alt-text": "surgeries" } },
    "grooming": { "data": { "image": "https://irp.cdn-website.com/md/dmtmpl/aad0f58c-db98-441d-823b-d7a4073ea56d/dms3rep/multi/CCB-6d3eb3f9.svg", "alt-text": "grooming" } }
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
                // console.log(response.status)
                console.log(response.statusText + "status" + response.status)
            }
        })
        .catch(error => console.log('error', error));
}

export function addServices(siteName, services) {
    for (let i = 0; i < services.length; i++) {
        var service = services[i]
        var row = serviceList[service]

        updateCollection(siteName, row).then(response => {
            if (response.status != 200) {
                console.log(response)
            }
        })
    }
}


function updateCollection(siteName, row) {
    var url = `https://api.duda.co/api/sites/multiscreen/${siteName}/collection/services/row`
    options.body = JSON.stringify([row])

    return fetch(url, options)
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                data
            }))
        })
        .catch(error => console.log('error', error));
}

export function getPreviewLink(siteName, email) {
    var link = `${process.env.PREVIEW_HOST}${siteName}?device=desktop`
    createContact(email)
    sendEmail(email, link)
    return link
}