const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use('/', express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
    console.log(`BEP3 UserInterface App listening at http://localhost:${port}`)
})