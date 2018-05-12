import * as fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import config from './config.json'

// declare arrays and interfaces
interface Book {
    url: string
    title: string
    author: string
    isbn: string
    filepath: string
}
let books: Book[] = []

// make sure the assets folder exists
if (!fs.existsSync(config.assetsFolder)){
    fs.mkdirSync(config.assetsFolder)
}

// read the data file
fs.readFile(config.dataFile, 'utf8', (error, data) => {

    // split document lines into array
    let lines:string[] = data.split('\n')

    // create book list by parsing the array
    let book = <Book>{}
    for (let line of lines) {

        // for each image tag create a new book entry
        if (line.startsWith('![]')) {
            book.url = line.replace('![](', '').replace(')  ','').replace('\r', '')
        }

        if (line.startsWith('Title: ')) {
            book.title = line.replace('Title: ', '').replace('  ', '').replace('\r', '')
        }

        if (line.startsWith('Author: ')) {
            book.author = line.replace('Author: ', '').replace('  ', '').replace('\r', '')
        }

        if (line.startsWith('ISBN: ')) {
            book.isbn = line.replace('ISBN: ', '').replace('  ', '').replace('\r', '')
            books.push({...book})
        }
    }

    if(config.downloadImages){
        // download the image files
        for (let book of [...books]) {
            book.filepath = `./assets/${book.isbn}${path.extname(book.url)}`
            if (!fs.existsSync(book.filepath)) {
                
                fetch(book.url).then(response => {
                        
                    let destination = fs.createWriteStream(book.filepath)
                    response.body.pipe(destination)
                    
                }).catch(error => console.error)
            }
        }
        // replace image filepath by url
    } else {
        for (let book of [...books]) {
            book.filepath = book.url
        }
    }

    // apply config to book list
    books = books.slice(0, config.limit)

    // create html book list content
    let HTMLBookList: String = ""
    for (let book of books) {
        HTMLBookList += `
<div class="box">
    <img src="${book.filepath}" />
    <div class="meta">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
    </div>
</div>
`
    }

    // generate html document
    let HTMLContent = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./node_modules/normalize.css/normalize.css">
    <link rel="stylesheet" href="./styles.css">
    <style>
    body {
        width: ${config.canvas.width}px;
        height: ${config.canvas.height}px;
    }
    .wrapper {
        grid-template-columns: repeat(${config.rows}, 320px);
    }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700" rel="stylesheet">
</head>
<body>    
    <div class="whitespace"></div>
    <div class="wrapper">
        ${HTMLBookList}
    </div>
    <div class="whitespace"></div>
</body>
</html>
`
    // write html content
    fs.writeFile(config.htmlFile, HTMLContent, (error) => console.error )
})





