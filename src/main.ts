import express from 'express';
import fs from 'fs';

const app = express()


const fileList = fs.readdirSync(process.env.HOME + '/Desktop/tinder2/static/images/');

async function next() {
    return 1
}

let current_image = 0


app.use(express.static(`${process.env.HOME}/Desktop/tinder2/static/`))

app.set('views', `${process.env.HOME}/Desktop/tinder2/views/`)
app.set('view engine', 'ejs')

app.get('/', (req: any, res: any) => {    
    res.render('index', {i: fileList[current_image], current: (current_image + 1), max: fileList.length})
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
    console.log(fileList);
    
    console.log(`Ready to go on ${PORT}`)
});