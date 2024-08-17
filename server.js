//Initialize the required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

//Initialize the express app and set the port
const app = express();
const PORT = process.env.PORT || 3000;

//Set up handlebars as the view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//Middleware

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

//Serve static files from the 'public' directory
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
let expenses = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route to get landing page
app.get("/", (req, res) => {
  res.render("home", { expenses });
});

//routes

app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

app.post("/api/expenses", (req, res) => {
  const { name, amount, category } = req.body;
  const newExpense = { id: expenses.length + 1, name, amount, category };
  expenses.push(newExpense);
  res.json(newExpense);
});
//starting server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
