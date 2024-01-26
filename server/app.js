const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

const clientUrl = 'http://localhost:5174'
const dataUrl = "https://its62.ru/static-cache/roads.json"

app.use(
    cors({
        origin: clientUrl,
        preflightContinue: true,
    }),
);

app.get('/data', async function(req,res) {
    const { data } = await axios.get(dataUrl)
    res.json(data);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})