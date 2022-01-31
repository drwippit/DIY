import fetch from 'node-fetch';
import 'dotenv/config'

var options = {
    'method': 'POST',
    'headers': {
        'Authorization': process.env.MC_API_KEY,
        'Content-Type': 'application/json'
    }
}

export function createContact(emailAddress) {
    var url = `https://us14.api.mailchimp.com/3.0/lists/${process.env.MC_LIST_ID}/members`
    options.body = JSON.stringify({
        "email_address": emailAddress,
        "status": "transactional",
        "tags": [
            "PPC"
        ]
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