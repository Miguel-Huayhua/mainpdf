const express = require("express");
const app = express()
const cors = require('cors')
const pdf = require('pdfkit')
const fs = require('fs')
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => [
    res.download('./pdf/carta.pdf')
])

app.post('/file', (req, res, next) => {
    console.log(req.body)
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
    PDF.text(`       Yo, Miguel Huayhua Condori, hago este documento para que pueda ser descargada las veces que quieras, dirigida a ${req.body.nombre} ${req.body.apellido}` + " con el objetivo de presentar una carta de solo amistad, más nada estará involucrado" +
        ", y con el compromiso de no afectar nada, puedes contar conmigo las veces que necesites, como tu para mi.",
        50, 150, { lineGap: 15, });
    PDF.text("       Y lo que me falta a mí; el plan: comprender aquello que no entiendo perfectamente, y de ser posible aprender cosas nuevas de otras personas." +
        " Y pues ese momento llegó, veamos que el tiempo nos va a dar un giro, tu estarás diferente y yo igual, sigue el rumbo que planeas. Fin :P",
        { lineGap: 15 })

    PDF.image('me.jpg', 110, 520, { width: 75, height: 75 })
    PDF.image('firma69848.jpg', 80, 600, { width: 150, height: 90 })
    PDF.fontSize(15)
    PDF.text('..............................', 85, 650)
    PDF.fontSize(10)
    PDF.text('Miguel Huayhua Condori', 90, 670)
    PDF.text('Fase 3 XD', 120, 685)

    PDF.fontSize(15)
    PDF.text('..............................', 385, 650)
    PDF.text(`${req.body.nombre} ${req.body.apellido}`, 400, 670)
    PDF.fontSize(10)
    PDF.text('Tú', 445, 685)
    PDF.end();
    res.json({done:true});
})


app.listen(app.get('port'), () => {
    console.log('Servidor preparado')
})
