import express from "express";

const app = express();
const port = 3000;

let itemList = [];
let itemList2 = [];

app.use(express.static("public"));

app.use(express.urlencoded({ extended : true}));

app.get("/", (req, res) => {
    const category = 'personal';
    res.render("index.ejs", { items: itemList , category: category});
});

app.get("/work", (req, res) => {
    const category = 'work';
    res.render("index.ejs", { items: itemList2 , category: category}) ;
});

app.post("/", (req, res) => {
    const itemToAdd = req.body.add;
    if (itemToAdd) {
        itemList.push(itemToAdd);
    }
    res.redirect("/");
});

app.post("/work", (req, res) => {
    const itemToAdd = req.body.add;
    if (itemToAdd) {
        itemList2.push(itemToAdd);
    }
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
