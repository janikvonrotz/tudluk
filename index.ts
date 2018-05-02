import * as fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'

// declare variables and interfaces
let filepath:string = "bookshelf.md"
interface Book {
    url: string
    title: string
    author: string
    isbn: string
    filepath: string
}
let books: Book[] = []

// read the data file
fs.readFile(filepath, 'utf8', (error, data) => {

    // split document lines into array
    let lines:string[] = data.split('\n')

    // create book list by parsing the array
    let book = <Book>{}
    for (let line of lines) {

        // for each image tag create a new book entrz
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

    // create html book list content
    let HTMLBookList: String = ""
    for (let book of books) {
        HTMLBookList += `
<div class="box">
    <img src="${book.filepath}" />
    <p>${book.title}</p>
    <p>${book.author}</p>
</div>
`
    }

    // generate html document
    let HTMLContent = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
    <h1>Hello ${"World"}</h1>
    
    <div class="wrapper">
        ${HTMLBookList}
    </div>

</body>
</html>
`
    // write html content
    fs.writeFile("index.html", HTMLContent, (error) => console.error )
})





