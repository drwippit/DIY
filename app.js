const serverless = require('serverless-http');
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dudaApi = require('./duda_api.js');

const app = express();
app.use(cors())
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => res.send('Agency+ PPC'))

app.post('/create', (req, res) => {
    var businessEmail = req.body.email
    var siteData = req.body.site_data
    var services = req.body.services

    dudaApi.createSite(businessEmail, siteData, services)
        .then((data) => {
            var siteName = data.site_name
            return dudaApi.updateSite(siteName, siteData).then(response => {}).then(response => {
                return dudaApi.addServices(siteName, services).then(respones => {
                    var a = dudaApi.getPreviewLink(siteName, businessEmail)
                    console.log(a)
                    return {
                        status: 200,
                        data: dudaApi.getPreviewLink(siteName, businessEmail)
                    }
                })

            })

            .catch(error => console.log('error', error));

        })
        .then(data => res.status(data.status).send(data.data))
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

module.exports.handler = serverless(app);