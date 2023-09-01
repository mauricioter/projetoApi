const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const { error, Console } = require('console')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// }) 






app.get('/anime/:id', (req, res) => {
    //  A função parseInt converte seu primeiro argumento para uma string,
    //  analisa, e retorna um inteiro ou NaN .
    const id = parseInt(req.params.id)
    console.log(id)
    // aqui ela está lendo o database, se der error ele vai retornar a mensagem
    fs.readFile('database.txt', 'utf-8', (error, data) => {
        if (error) {
            return res.status(500).send('Erro no Servidor')
        }
        // aqui ele esta transformando ela em uma array, evitando que eu use split e assim guardando ela dentro da variavel records 
        const records = JSON.parse(data)
        // aqui ele esta filtrando records, passando item por item e vendo se o item que eu procuro é o mesmo que o meu id
        const record = records.filter(item => item !== null).filter(item => item.id === id)
        console.log(record)
        // const linhas = data.split('\n')
        // console.log(linhas)
        // const ItensSele = linhas.find(linha => {
        //     const partes = linha.split(', ')
        //     const linhaID = partes[partes.length - 1]
        //     console.log(linhaID)
        //     return linhaID == id

        // }) 
        // aqui estou falando "Se tiver record, trazer oq tem em record"
        if (record) {
            res.status(200).send(record)
        } else {
            res.status(404).send('Anime não encontrado')
        }
    })
})

app.get('/animes', (req, res) => {
    let animes = req.query
    console.log(animes)
    if (fs.existsSync('database.txt')) {
        const resultAn = fs.readFileSync('database.txt', { encoding: 'utf-8' })
        const arrayResult = JSON.parse(resultAn)
        console.log(arrayResult)

        // fs.writeFileSync('database.txt', JSON.stringify(animes) + "\n" + resultAn)
        res.status(200).send({ data: arrayResult })
    }
})

app.get('/animes/:search', (req, res) => {
    let search = req.query.search
    console.log(search)
    if (!search) {
        res.status(404).json({ erro: 'Search is required' })
    }
    if (fs.existsSync('database.txt')) {
        const ler = fs.readFileSync('database.txt', { encoding: 'utf-8' })
        const arrayTransform = ler.split('\n')
        const selectItem = arrayTransform.find((item) => item.startsWith(`N${search}`))

        if (selectItem) {
            res.send(selectItem)
        } else {
            res.status(404).json({ erro: 'Anime not Found' })
        } if (selectItem !== search) {
            res.status(404).json({ erro: 'Database not Found' })
        }
    }
})

app.post('/anime', (req, res) => {
    let resultArray = [];
    const anime = req.body;
    if (!fs.existsSync('database.txt')) {
        fs.writeFileSync('database.txt', JSON.stringify(resultArray));
    }
    const result = fs.readFileSync('database.txt', { encoding: 'utf-8' });
    resultArray = JSON.parse(result);
    const id = (resultArray.length += 1);
    console.log(resultArray);
    anime.id = id;
    resultArray.push(anime);
    console.log(resultArray);
    fs.writeFileSync('database.txt', JSON.stringify(resultArray));
    res.status(200).send({ data: anime, message: 'Anime Criado' });
});
// app.post('/anime', (req, res) => {
//     const anime = req.body;
//     // anime.rating = 0;
//     // anime.id = 1
//     // fs.writeFileSync('database.txt', JSON.stringify(anime))
//     // res.status(200).send({ data: anime, message: "Anime Criado" })

//     if (!fs.existsSync('database.txt')) {
//         fs.writeFileSync('database.txt')
//     }
//     const result = fs.readFileSync('database.txt', { encoding: 'utf-8' })
//     const resultArray = JSON.parse(result) || [];
//     const id = resultArray.length += 1;
//     console.log(resultArray)
//     anime.id = id;
//     resultArray.push(anime)
//     console.log(resultArray)
//     fs.writeFileSync('database.txt', JSON.stringify(resultArray))
//     // if (!req.body.name) {
//     //     res.status(401).send({ code: 401, message: "names is requarid" })
//     // }
//     // if (!req.body.description) {
//     //     res.status(401).send({ code: 401, message: 'description is requarid' })
//     // }

//     // fs.writeFileSync('database.txt', JSON.stringify(anime) + "\n" + result)
//     res.status(200).send({ data: anime, message: "Anime Criado" })
//     // } else {
//     //     anime.id = 1
//     //     fs.writeFileSync('database.txt', JSON.stringify(anime))
//     //     res.status(200).send({ data: anime, message: "Anime Criado" })
//     // }
// })

app.patch('/anime', (req, res) => {
    res.send('Animes PATCH')
})

app.delete('/anime', (req, res) => {
    res.send('Anime DELETE')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

