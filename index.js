import express from "express";

const app = express();
const port = 3000;

let itemList = [];
let itemList2 = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const category = "personal";
    res.render("index.ejs", { items: itemList, category: category });
});

app.get("/work", (req, res) => {
    const category = "work";
    res.render("index.ejs", { items: itemList2, category: category });
});

app.post("/", (req, res) => {
    const itemToAdd = req.body.add;
    if (itemToAdd) {
        itemList.push({ text: itemToAdd, done: false });
    }
    res.redirect("/");
});

app.post("/work", (req, res) => {
    const itemToAdd = req.body.add;
    if (itemToAdd) {
        itemList2.push({ text: itemToAdd, done: false });
    }
    res.redirect("/work");
});

app.post('/mark-done', (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex, 10); // Parse the task index from the form data
    const targetList = req.body.category === 'work' ? itemList2 : itemList;

    if (taskIndex >= 0 && taskIndex < targetList.length) {
        targetList[taskIndex].done = true; // Mark the task as done
    }

    res.redirect(req.body.category === 'work' ? '/work' : '/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
