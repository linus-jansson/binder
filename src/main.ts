import express from 'express';
import fs from 'fs';

const app = express()


const fileList = fs.readdirSync('/images');

async function next() {
    return 1
}

function base64_encode(file: string) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

let current_image = 0


app.use(express.static(`/static/`))

app.set('views', `/views/`)
app.set('view engine', 'ejs')

app.get('/', (req: any, res: any) => { 
    let ci = base64_encode(`/images/${fileList[current_image]}`) 
    res.render('index', {i: ci, current: (current_image + 1), max: fileList.length})
})

app.get('/next', (req:any, res:any) => {
    
    if (fileList.length - 1 <= current_image)
        current_image = 0
    else 
        current_image++

    res.redirect('/');
})

let PORT = 8080

app.listen(8080, async () => {    
    console.log(`Ready to go on ${PORT}`)
});