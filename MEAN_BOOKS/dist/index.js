"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("./book.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
const uri = "mongodb://localhost:27017/BIBLI02";
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Mongo Data base connected successfuly");
});
app.get("/", (req, resp) => {
    resp.send("Hello Express");
});
app.get("/books", (req, resp) => {
    book_model_1.default.find((err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
/* Requête HTTP GET http://localhost:8700/books/id */
app.get("/books/:id", (req, resp) => {
    book_model_1.default.findById(req.params.id, (err, book) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(book);
        }
    });
});
app.post("/books", (req, resp) => {
    let book = new book_model_1.default(req.body);
    book.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
/* Requête HTTP PUT http://localhost:8700/books/id */
app.put("/books/:id", (req, resp) => {
    book_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err)
            resp.status(500).send(err);
        else {
            resp.send("Successfuly updated book");
        }
    });
});
/* Requête HTTP DELETE http://localhost:8700/books/id */
app.delete("/books/:id", (req, resp) => {
    book_model_1.default.deleteOne({ _id: req.params.id }, err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Successfuly deleted Book");
    });
});
/* Requête HTTP GET http://localhost:8085/pbooks?page=0&size=5 */
app.get("/pbooks", (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    book_model_1.default.paginate({}, { page: p, limit: size }, function (err, result) { if (err)
        resp.status(500).send(err);
    else
        resp.send(result); });
});
app.listen(8085, () => {
    console.log("Serve startd");
});
