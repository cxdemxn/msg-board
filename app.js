require('dotenv').config()

const express = require('express')
const path = require('node:path')

const messages = [
    
    {
        id: 0,
        text: 'Hello There',
        user: 'Amando',
        added: new Date()
    },
    {
        id: 1,
        text: 'Hello World',
        user: 'Charles',
        added: new Date()
    }
]

const app = express()

// setting the app's view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// setting where the app serves static assets from
const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

app.use(express.urlencoded({ extended: true }))

app.get('/message/:id', (req, res) => {
    const id = req.params.id
    const message = messages.filter(msg => msg.id == id)[0]

    if (!message)
        throw new Error('Message not found')

    res.render('message', { title: 'Message', message })
})

app.get('/new', (req, res) => {
    res.render('form', { title: 'Add new message'})
})
app.post('/new', (req, res) => {
    messages.push({ id: messages.length, user: req.body.usrName, text: req.body.usrMsg, added: new Date() })
    res.redirect('/')
})

app.get('/message', (req, res) => {
    console.log()
})

app.use('/', (req, res) => {
    res.render('index', { title: 'Mini MessageBoard', messages})
})


app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
})


const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`server listening on port ${PORT}`) })