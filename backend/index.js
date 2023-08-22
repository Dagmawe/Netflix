import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dag370111!",
  database: "netflix",
});

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
const date = new Date();
// Stores the uploaded images in "public/images"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
// GET
app.get("/", (req, res) => {
  const q = "SELECT * FROM movies";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/type/:type", (req, res) => {
  const type = req.params.type;
  const q = "SELECT * FROM movies WHERE type = ?";
  db.query(q, [type], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/genre/:type", (req, res) => {
  const genre = req.params.type;
  const q = "SELECT * FROM movies WHERE genre = ?";
  db.query(q, [genre], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/shows-page/:genre/:type", (req, res) => {
  const q = "SELECT * FROM movies WHERE genre = ? AND type = ?";
  db.query(q, [req.params.genre, req.params.type], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// POST
app.post("/", (req, res) => {
  const q =
    "INSERT INTO movies (`title`, `image`,`rating`, `genre`, `type`, `trailer`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.image,
    req.body.rating,
    req.body.genre,
    req.body.type,
    req.body.trailer,
  ];
  db.query(q, [values], (err, data) => {
    if (err) res.json(err);
    return res.json("created movie");
  });
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
});
// PUT
app.put("/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "UPDATE movies SET `title` = ?, image = ?, rating = ? WHERE id = ?";
  const values = [req.body.title, req.body.image, req.body.rating];
  db.query(q, [...values, bookID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Movie has been updated");
  });
});

app.listen(8800, () => {
  console.log("connnect to backend!");
});
