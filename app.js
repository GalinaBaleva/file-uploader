import express from 'express'
import morgan from 'morgan'
import { createReadStream, createWriteStream } from 'node:fs'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'

const PORT = 8005
const uploadDir = './uploads'


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
    express.static('public'),
    morgan(logFormat)
)


app.post('/uploading', async (req, res) => {

    const filename = req.headers['file-name']

    if (!filename) {
        return res.status(400).send('Missing file-name header')
    }

    const filePath = path.join(uploadDir, filename);
    const writeStream = createWriteStream(filePath);

    try {
        await pipeline(req, writeStream)
        res.status(200).send('File uploaded successfully')
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }

})

app.get('/', async (req, res) => {
    try {
        const files = await readdir(uploadDir);

        res.status(200).render('index', { files });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/uploads/*', (req, res) => {
    const filePath = path.join(uploadDir, req.params[0]);

    res.download(filePath)
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))