// import serverless from 'serverless-http';
import express from 'express';
import 'dotenv/config'
import { createSite, updateSite, getPreviewLink, addServices } from './duda_api.js';
const app = express();
app.use(express.json());
const port = 3000;

app.post('/create', (req, res) => {

    var businessEmail = req.body.email
    createSite().then(response => {
        if (response.status != 200) {
            return response
        } else {
            var siteName = response.data.site_name
            updateSite(siteName, req.body.site_data)
            addServices(siteName, req.body.services)
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

// export default handler = serverless(app);