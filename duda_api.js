const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config()
const mailChimp = require("./mailchimp_api.js");

var options = {
    'method': 'POST',
    'headers': {
        'Authorization': process.env.DUDA_API_KEY,
        'Content-Type': 'application/json'
    }
}

var serviceList = {
    "boarding": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/boarding.svg", "alt-text": "boarding" } },
    "wellness": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/wellness.svg", "alt-text": "wellness" } },
    "emergencies": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/emergencies.svg", "alt-text": "emergencies" } },
    "medicine": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/medicine.svg", "alt-text": "medicine" } },
    "surgeries": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/surgeries.svg", "alt-text": "surgeries" } },
    "grooming": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/grooming.svg", "alt-text": "grooming" } },
    "dental": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/dental.svg", "alt-text": "dental" } },
    "vaccination": { "data": { "image": "https://irp.cdn-website.com/3f896bfe/dms3rep/multi/vaccinations.svg", "alt-text": "vaccination" } }
}



function createSite() {
    var url = 'https://api.duda.co/api/sites/multiscreen/create'
    options.body = JSON.stringify({
        "template_id": process.env.TEMPLATE_ID
    })

    return fetch(url, options)
        .then(response => {
            return response.json()
        })
        .catch(error => console.log('error', error));
}

function updateSite(siteName, businessData) {
    var url = `https://api.duda.co/api/sites/multiscreen/${siteName}/content`
    options.body = JSON.stringify(businessData)

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                console.log("status " + response.status)
            }
        })
        .catch(error => console.log('error', error));
}

async function addServices(siteName, services) {
    for (let i = 0; i < services.length; i++) {
        var service = services[i]
        var row = serviceList[service]
        await updateCollection(siteName, row).then(response => {
            if (response.status != 200) {
                console.log(`${service}: ${response}`)
            }
        })
    }
    return new Promise(function(resolve, reject) {
        resolve('added services to site');
    });
}


function updateCollection(siteName, row) {
    var url = `https://api.duda.co/api/sites/multiscreen/${siteName}/collection/Services/row`
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

async function getPreviewLink(siteName, email) {
    var link = `${process.env.PREVIEW_HOST}${siteName}?device=desktop`
    return await mailChimp.createContact(email).then(response => {
        console.log(response)
        return mailChimp.sendEmail(email, link).then(response => {
            console.log(response)
            return link
        })
    })


}

module.exports = { createSite, updateSite, addServices, getPreviewLink }