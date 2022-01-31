import express from 'express';
import 'dotenv/config'
import { createSite, updateSite, getPreviewLink } from './duda_api.js';
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
    var businessEmail = req.body.email
    createSite().then(response => {
        if (response.status != 200) {
            return response
        } else {
            var siteName = response.data.site_name
            updateSite(siteName, req.body)
            return {
                status: 200,
                data: getPreviewLink(siteName, businessEmail)
            }
        }
    }).then(data => res.status(data.status).send(data.data))
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});