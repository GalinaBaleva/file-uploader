import express from 'express'
import morgan from 'morgan'
import { readFile, readdir, writeFile } from 'node:fs/promises'

const PORT = 8005


const app = express()
app.set('view engine', 'ejs')


const logFormat = `
time    :date[web]
method  :method 
type    :req[content-type] 
url     :url 
status  :status 
--------------------------------------------------`

app.use(
    express.json(),
    express.urlencoded({ extended: false }),
    express.text(),
    express.static('public'),
    morgan(logFormat)
)


app.post('/uploading', async (req, res) => {
    const body = req.body

    console.log(body)

    // await writeFile('cars/' + id, JSON.stringify(body, null, 2))

    // res.status(201).location(`/cars/${id}`).end()
})

// app.get('/cars/:id', async (req, res) => {
//     const path = req.path.split('/')
//     const id = path[path.length - 1]
//     const info = await readFile('cars/'+id, {encoding: 'utf-8'})
//     const carInfo = JSON.parse(info)
//     const carsI = Object.entries(carInfo)

//     res.render('car', { carsI })
// })


// app.get('/cars', async (req, res) => {

//     const files = await readdir('cars/')

//     res.render('cars', { files })
// })

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))




app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))