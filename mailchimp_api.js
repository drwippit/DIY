import fetch from 'node-fetch';
import 'dotenv/config'



export function createContact(emailAddress) {
    var options = {
        'method': 'POST',
        'headers': {
            'Authorization': process.env.MC_API_KEY,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "email_address": emailAddress,
            "status": "transactional",
            "tags": [
                "PPC"
            ]
        })
    }


    var url = `https://us14.api.mailchimp.com/3.0/lists/${process.env.MC_LIST_ID}/members`
    return fetch(url, options)
        .then(response => {
            return response.json().then(data =>
                ({
                    status: response.status,
                    data
                }))
        }).catch(error => console.log('error', error));

}

export function sendEmail(email, previewLink) {
    var options = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "key": process.env.MD_API_KEY,
            "template_name": process.env.MD_TEMPLATE_NAME,
            "template_content": [{}],
            "message": {
                "global_merge_vars": [{
                    "name": "previewLink",
                    "content": previewLink
                }],
                "to": [{
                    "email": email,
                    "type": "to"
                }]
            }
        })
    }
    var url = 'https://mandrillapp.com/api/1.0/messages/send-template'

    return fetch(url, options)
        .then(response => {
            return response.json().then(data =>
                ({
                    status: response.status,
                    data
                }))
        }).catch(error => console.log('error', error));

}