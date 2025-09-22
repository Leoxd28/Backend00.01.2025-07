const express = require('express');
const { readdirSync } = require('fs')

const router = express.Router();

const ROUTER_PATH = `${__dirname}`

readdirSync(ROUTER_PATH).filter((filename) => {
    const clenaName = filename.split('.').shift();
    if(clenaName !== 'index') {
        router.use(`/${clenaName}`, require(`./${filename}`))
    }
})

module.exports = router;