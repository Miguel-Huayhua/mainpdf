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
    res.download('pdf/carta.pdf')
})

app.post('/file', (req, res, next) => {
    let { myfile } = req.files
    let arr = new Uint8Array(myfile.data)
    fs.writeFileSync(req.files.myfile.name, Buffer.from(arr))
    next()
}, (req, res) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let PDF = new pdf()
    PDF.pipe(fs.createWriteStream("./pdf/carta.pdf", "utf-8"))
    PDF.rect(10, 10, PDF.page.width - 20, PDF.page.height - 20).fillAndStroke('#fff', '#000');
    PDF.image('./friends.png', 30, 30, { width: 50, height: 50 })
    let date = new Date()

    PDF.fill('#000')
    PDF.text(`La Paz - Bolivia ${date.getDate()} de ${meses[date.getMonth()]} del ${date.getFullYear()}`, 0, 30, { align: 'right' }).fontSize(20)
    PDF.text("CARTA DE AMISTAD", 50, 90, { oblique: true, align: 'center' }).fontSize(20);
    PDF.fontSize(14);
    PDF.text(`       Yo, Miguel Huayhua Condori, hago este documento para que pueda ser descargada las veces que quieras, dirigida a ${req.body.nombre} ${req.body.apellido}` + " con el objetivo de presentar una carta de amistad, donde aseguramos una amistad sólida" +
        ", pase lo que pase será el comprobante.",
        50, 150, { lineGap: 15, });
    PDF.text("       Si necesitamos ayuda contamos entre nosotros y que debemos mantener nuestros objetivos seguros, sin fallos ni nada, ya que tenemos la oportunidad de empezar bien otra vez." +
        " Y pues ya veremos el como cambiaremos con el tiempo, este documento será testigo de muchas cosas, y lo bueno estará ahí  para que siga siempre..., gracias :P",
        { lineGap: 15 })

    PDF.image('me.jpg', 110, 520, { width: 75, height: 75 })
    PDF.image('firma69848.jpg', 80, 600, { width: 150, height: 90 })
    PDF.fontSize(15)
    PDF.text('..............................', 85, 650)
    PDF.fontSize(10)
    PDF.text('Miguel Huayhua Condori', 90, 670)
    PDF.text('Fase 3 XD', 120, 685)


    PDF.image(req.files.myfile.name, 410, 520, { width: 75, height: 75 })
    PDF.fontSize(15)
    PDF.text('..............................', 385, 650)
    PDF.fontSize(10)
    PDF.text(`${req.body.nombre} ${req.body.apellido}`, 390, 670)
    PDF.text('Tú', 445, 685)
    PDF.end()
    res.json({ done: true })
    fs.rm(req.files.myfile.name, (err) => {
        if (err) throw err
    })
})


app.listen(app.get('port'), () => {
})
