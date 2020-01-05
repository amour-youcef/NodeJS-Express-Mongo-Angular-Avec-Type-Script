import express, { Response, Request } from "express";
import mongoose from "mongoose";
import Book from "./book.model";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const uri = "mongodb://localhost:27017/BIBLI02";

mongoose.connect(uri, (err) => {
    if (err) console.log(err);
    else console.log("Mongo Data base connected successfuly");
});

app.get("/", (req: Request, resp: Response) => {
    resp.send("Hello Express");
});

app.get("/books", (req: Request, resp: Response) => {
    Book.find((err, books) => {
        if (err) resp.status(500).send(err);
        else resp.send(books);
    })
});

/* Requête HTTP GET http://localhost:8700/books/id */
app.get("/books/:id", (req: Request, resp: Response) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(book);
        }
    });
})

app.post("/books", (req: Request, resp: Response) => {
    let book = new Book(req.body);
    book.save(err => {
        if (err) resp.status(500).send(err);
        else resp.send(book);
    })
})

/* Requête HTTP PUT http://localhost:8700/books/id */
app.put("/books/:id", (req: Request, resp: Response) => {
    Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) resp.status(500).send(err); else { resp.send("Successfuly updated book"); }
    })
});

/* Requête HTTP DELETE http://localhost:8700/books/id */
app.delete("/books/:id", (req: Request, resp: Response) => {
    Book.deleteOne({ _id: req.params.id }, err => {
        if (err) resp.status(500).send(err); else resp.send("Successfuly deleted Book");
    });
});

/* Requête HTTP GET http://localhost:8085/pbooks?page=0&size=5 */
app.get("/pbooks", (req: Request, resp: Response) => {
    let p: number = parseInt(req.query.page || 1);
    let size: number = parseInt(req.query.size || 5);
    Book.paginate({}, { page: p, limit: size },
        function (err, result) { if (err) resp.status(500).send(err); else resp.send(result); });
});

app.listen(8085, () => {
    console.log("Serve startd");

})