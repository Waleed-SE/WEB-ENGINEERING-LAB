const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "weblab7",
});

app = express();

function connectDB() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the database!");
  });
}

connectDB();

app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("insert");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/insert", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var sql = `insert into users(name, email, password)
  values('${name}', '${email}', '${password}')`;

  connection.query(sql, function (err, results) {
    if (err) throw err;

    res.send("<h1>Data Inserted.</h1>");
  });
});

app.get("/api/users/:id", (req, res) => {
  const itemId = req.params.id;

  const sql = `SELECT * FROM users WHERE id = ?`;
  connection.query(sql, [itemId], (err, results) => {
    if (err) {
      console.error("Error fetching item:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the item." });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Item not found." });
    } else {
      res.json(results[0]);
    }
  });
});

app.get("/api/users", (req, res) => {
  const sql = `SELECT * FROM users`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching item:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the item." });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Item not found." });
    } else {
      res.json(results);
    }
  });
});

app.put("/api/users/:id", (req, res) => {
  const itemId = req.params.id;
  var name = req.body.name;

  const sql = `UPDATE users SET name = ? WHERE id = ?`;
  connection.query(sql, [name, itemId], (err, results) => {
    if (err) {
      console.error("Error updating item:", err);
      res.status(500).json({ error: "An error occurred while updating the item." });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Item not found." });
    } else {
      res.json({ message: "Item updated successfully." });
    }
  });
});

app.delete("/api/users/:id", (req, res) => {
  const itemId = req.params.id;

  const sql = `DELETE from users WHERE id = ?`;
  connection.query(sql, [itemId], (err, results) => {
    if (err) {
      console.error("Error Deleting item:", err);
      res.status(500).json({ error: "An error occurred while updating the item." });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Item not found." });
    } else {
      res.json({ message: "Item Deleted successfully." });
    }
  });
});

var server = app.listen(3000, function () {
  console.log("App running on port 3000");
});
