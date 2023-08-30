const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// }) 



app.get('/anime/:id', (req, res) => {
    let id = req.params.id
    if (fs.existsSync('database.txt') === id) {
        const result = fs.readFileSync('database.txt', { encoding: 'utf-8' })
        const resultArray = result.split('')
        console.log(resultArray)
        const ID = resultArray.length += 1

        if (!req.body.id) {
            res.status(404).send({ code: 404, message: 'Not Found' })
        }
        if (req.body.id !== Number) {
            res.status(410).send({ code: 410, message: 'Invalid ID' })
        }
    }
})

app.get('/animes', (req, res) => {
    res.send('Animes')
})

app.get('/animes/search', (req, res) => {
    console.log(req.query)
    res.status(200).send('Procurar Animes')
})

app.post('/anime', (req, res) => {
    let anime = req.body;
    anime.rating = 0;
    if (fs.existsSync('database.txt')) {
        const result = fs.readFileSync('database.txt', { encoding: 'utf-8' });
        const resultArray = result.split('\n');
        const id = resultArray.length += 1;
        anime.id = id;
        if (!req.body.name) {
            res.status(401).send({ code: 401, message: "names is requarid" })
        }
        if (!req.body.description) {
            res.status(401).send({ code: 401, message: 'description is requarid' })
        }

        fs.writeFileSync('database.txt', JSON.stringify(anime) + "\n" + result)
        res.status(200).send({ data: anime, message: "Anime Criado" })
    } else {
        anime.id = 1
        fs.writeFileSync('database.txt', JSON.stringify(anime))
        res.status(200).send({ data: anime, message: "Anime Criado" })
    }
})

app.patch('/anime', (req, res) => {
    res.send('Animes PATCH')
})

app.delete('/anime', (req, res) => {
    res.send('Anime DELETE')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

