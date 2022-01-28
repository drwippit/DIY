// create API
// Create Site with connected template
//Update Site with form contents
// Get Preview URL
//Send to MailChimp
// Send email from MailChimp
// Succcess Message for API

const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
const auth = require('dotenv').config();
app.get('/',(req,res)=>{
var siteName = ''
    var options = {
      'method': 'POST',
      'url': 'https://api.duda.co/api/sites/multiscreen/create',
      'headers': {
        'Authorization': process.env.API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "template_id": "1000772"
      })
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      var bodyParse = JSON.parse(response.body)
      siteName = bodyParse.site_name
      console.log(siteName);
      update(siteName);
    });
function update(siteName) {
   var options = {
        'method': 'POST',
        'url': `https://api.duda.co/api/sites/multiscreen/${siteName}/content`,
        'headers': {
          'Authorization': process.env.API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "location_data": {
            "phones": [],
            "emails": [
              {
                "emailAddress": "mymail@mailservice.com",
                "label": null
              }
            ],
            "social_accounts": {
              "socialAccounts": {}
            },
            "address_geolocation": "",
            "geo": {
              "longitude": null,
              "latitude": null
            },
            "logo_url": null,
            "business_hours": [],
            "label": null,
            "address": {}
          },
          "additional_locations": [],
          "site_texts": {
            "overview": "",
            "services": "",
            "custom": [],
            "about_us": ""
          },
          "business_data": {
            "name": "Pet Cemetary",
            "logo_url": null,
            "data_controller": null
          },
          "site_images": []
        })
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        getPreview(siteName);
      }); 
    }

    function getPreview (siteName){
        var previewLink = `http://dashboard.funkmountaintribe.com/preview/${siteName}?device=desktop`
        console.log(previewLink)
    }
}) 

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});