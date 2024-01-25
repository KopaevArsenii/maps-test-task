const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(
    cors({
        origin: 'http://localhost:5174',
        preflightContinue: true,
    }),
);

app.get('/data', async function(req,res) {
    const { data } = await axios.get("https://its62.ru/static-cache/roads.json")
    res.json(data);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})