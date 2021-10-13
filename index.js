const express = require("express");
const fileupload = require("express-fileupload")
const app = express()
const cors = require('cors')
const pdf = require('pdfkit')
const fs = require('fs');

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileupload({ createParentPath: true }))

app.get('/', (req, res) => {
    res.send('hola');
})


})


app.listen(app.get('port'), () => {
})
