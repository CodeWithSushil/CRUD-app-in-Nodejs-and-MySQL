const express = require("express");
const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodejs'
});

// Connect
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('Mysql Connected...')
});

const app = express();

//Create DB
app.get('/createdb', (req, res) => {
 let sql = "CREATE DATABASE nodejs";
 db.query(sql, (err, result) => {
   if(err) throw err;
   console.log(result);
   res.send('Database Created..')
 });
});

//create table
app.get('/createpoststable', (req, res) => {
  let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});

//Insert Post
app.get('/addpost', (req, res) => {
  let post = {title:'CWS', body:'This is Code With Sushil'};
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Post added...");
  });
});

//Select Post
app.get('/getposts', (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send("Posts Fetched...");
  });
});

//Select single Post
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Post Fetched...");
  });
});

//update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated title';
  let sql = `UPDATE posts SET title='${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Post Updated...");
  });
});

//Delete Post
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id= ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Post Deleted...");
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
