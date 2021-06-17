require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bp = require("body-parser");
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/allUsers", function (req, res) {
  con.query("SELECT * FROM user", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/addUser", function (req, res) {
  let postData = req.body;
  con.query("INSERT INTO user SET ?", postData, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/addVotation", function (req, res) {
  let postData = req.body;
  con.query("INSERT INTO votation SET ?", postData, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/addTag", function (req, res) {
  let postData = req.body;
  con.query("INSERT INTO tag SET ?", postData, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/displayvote", function (req, res) {
  con.query("SELECT * FROM votation", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/getAnswers/:id", function (req, res) {
  con.query("SELECT * FROM answer WHERE id = ?", [req.params.id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});