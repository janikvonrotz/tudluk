import * as fs from 'fs'

// declare variables and interfaces
let filepath:string = "bookshelf.md"
interface Book {
    url: string
    title: string
    author: string
    isbn: string
}
let books: Book[] = []

// read the data file
fs.readFile(filepath, 'utf8', async (error, data) => {

    // split document lines into arraz
    let lines:string[] = data.split('\n')

    // create a list of books
    let book = <Book>{}
    for (let line of lines) {
        if (line.startsWith('![]')) {
            book.url = line.replace('![](', '').replace(')  ','').replace('\r', '')
        }

        if (line.startsWith('Titel: ')) {
            book.title = line.replace('Titel: ', '').replace('  ', '').replace('\r', '')
        }

        if (line.startsWith('Author: ')) {
            book.author = line.replace('Author: ', '').replace('  ', '').replace('\r', '')
        }

        if (line.startsWith('ISBN: ')) {
            book.isbn = line.replace('ISBN: ', '').replace('  ', '').replace('\r', '')
            books.push({...book})
        }
    }

    for (let book of books) {
        let response = await fetch(book.url)
        const destination = fs.createWriteStream('./${book.isbn}.jpg');
    }
});