const serverless = require('serverless-http');
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dudaApi = require('./duda_api.js');

const app = express();
app.use(cors())
app.use(express.json());
// const port = 3000;

app.get('/', (req, res) => res.send('Agency+ PPC'))

app.post('/create', (req, res) => {
    var businessEmail = req.body.email
    dudaApi.createSite().then(response => {
        if (response.status != 200) {
            return response
        } else {
            var siteName = response.data.site_name
            dudaApi.updateSite(siteName, req.body.site_data, req.body.services).then(response => {
                dudaApi.addServices(siteName, req.body.services)
            })
            return {
                status: 200,
                data: dudaApi.getPreviewLink(siteName, businessEmail)
            }
        }
    }).then(data => res.status(data.status).send(data.data))
})

// app.listen(port, () => {
//     console.log(`app listening at http://localhost:${port}`)
// });

module.exports.handler = serverless(app);