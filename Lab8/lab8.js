const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "weblab8",
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

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.post("/insert", function (req, res) {
//   var name = req.body.name;
//   var email = req.body.email;
//   var password = req.body.password;

//   var sql = `insert into users(name, email, password)
//   values('${name}', '${email}', '${password}')`;

//   connection.query(sql, function (err, results) {
//     if (err) throw err;

//     res.send("<h1>Data Inserted.</h1>");
//   });
// });

app.get("/api/products", (req, res) => {
  const sql = `SELECT * FROM products`;
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

app.put("/api/products/:id", (req, res) => {
  const itemId = req.params.id;
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;

  const sql = `UPDATE products SET name = ?, category = ?, price = ? WHERE id = ?`;
  connection.query(sql, [name, category, price, itemId], (err, results) => {
    if (err) {
      console.error("Error updating item:", err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the item." });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Item not found." });
    } else {
      res.json({ message: "Item updated successfully." });
    }
  });
});

app.delete("/api/products/:id", (req, res) => {
  const itemId = req.params.id;

  const sql = `DELETE from products WHERE id = ?`;
  connection.query(sql, [itemId], (err, results) => {
    if (err) {
      console.error("Error Deleting item:", err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the item." });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Item not found." });
    } else {
      res.json({ message: "Item Deleted successfully." });
    }
  });
});

app.post("/api/register", function (req, res) {
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
      res
        .status(500)
        .json({ error: "An error occurred while updating the item." });
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
      res
        .status(500)
        .json({ error: "An error occurred while updating the item." });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Item not found." });
    } else {
      res.json({ message: "Item Deleted successfully." });
    }
  });
});

app.post("/api/check-email", (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      res.status(500).send("Internal server error");
      return;
    }

    if (results.length > 0) {
      res.send({ exists: true });
    } else {
      res.send({ exists: false });
    }
  });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      if (results.length > 0) {
        res.send({ authenticated: true });
      } else {
        res.send({ authenticated: false });
      }
    });
  });

var server = app.listen(4000, function () {
  console.log("App running on port 4000");
});
