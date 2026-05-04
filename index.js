const express = require("express");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, 'public')));

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yashwanth123",
    database: "music7",
});

app.get("/", (req, res) => {
    res.render("home.ejs");
});

// app.get("/another", (req, res) => {
//     res.render("reg.ejs");
// });
app.get("/search", (req, res) => {
    res.render("search.ejs");
});
// app.get("/playl", (req, res) => {
//     res.render("createplaylist.ejs");
// });
app.get("/artist", (req, res) => {
    let q = "SELECT * FROM artist";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;

            res.render("artist.ejs", { data });
            //console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});
app.get("/artist/:id/song", (req, res) => {
    let { id } = req.params;
    let q = `select name,title from song as s join album as a on s.albumid=a.albumid join artist as art on art.artistid=a.artistid where a.artistid='${id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;
            res.render("songs_art.ejs", { data });
            //console.log(data);
        });
    } catch (err) {
        res.send("some error with DB");
    }
});
app.get("/artist/:id/album", (req, res) => {
    let { id } = req.params;
    let q = `select albumname from album  where artistid = '${id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;
            //res.send("success");
            res.render("album.ejs", { data });
            //console.log(result);
        });
    } catch (err) {
        res.send("some error with DB");
    }
});

app.get("/mood", (req, res) => {
    let q = "SELECT distinct mood FROM song";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;

            res.render("mood.ejs", { data });
            //console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});

app.get("/mood/:m", (req, res) => {
    let { m } = req.params;
    let q = `select distinct title from song where mood = '${m}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;
            //res.send("success");
            res.render("mood2.ejs", { data });
            // console.log(result);
        });
    } catch (err) {
        res.send("some error with DB");
    }
});

app.get("/genre", (req, res) => {
    let q = "SELECT distinct genre FROM album";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;
            res.render("genre.ejs", { data });
            //console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});

app.get("/genre/:g", (req, res) => {
    let { g } = req.params;
    let q = `select title from song s join album a on s.albumid=a.albumid where a.genre= '${g}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;
            //res.send("success");
            res.render("genre2.ejs", { data });
            //console.log(result);
        });
    } catch (err) {
        res.send("some error with DB");
    }
});

app.get("/register", (req, res) => {
    res.render("reg.ejs");
});

app.post("/register", (req, res) => {
    let { username, email, age, country, password } = req.body;
    let q = `INSERT INTO user ( username, email, age,country,password) VALUES ('${username}','${email}','${age}','${country}','${password}') `;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            //console.log("Registered succesfully!");
            res.redirect("/");
        });
    } catch (err) {
        res.send("some error occurred");
    }
});


app.get("/playlist", (req, res) => {
    res.render("play.ejs");
});
app.post("/playlist", (req, res) => {
    let { name, password, playlist } = req.body;
    let q = `INSERT INTO playlist (username,name) VALUES ('${name}','${playlist}') `;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log("Registered succesfully!");
            res.redirect("/");
        });
    } catch (err) {
        res.send("some error occurred");
    }
});


app.post("/search", (req, res) => {
    let { query } = req.body;
    console.log(query);
    let q = `SELECT * FROM song WHERE title LIKE '%${query}%'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;
            res.render("search_results.ejs", { data });
            console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});

let USN;
app.get("/login", (req, res) => {
    res.render("u_login.ejs")
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    USN = { username };
    const query = "SELECT * FROM User WHERE username = ? AND password = ?";
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.render("u_login.ejs", { message: "An error occurred. Please try again later." });
        } else {
            if (results.length > 0) {
                // Username and password match
                res.render("home.ejs", { username: username });
            } else {
                // Username or password is incorrect
                res.render("u_login.ejs", { message: "Incorrect username or password. Please try again." });
            }
        }
    });
});

app.get("/podcast", (req, res) => {
    let q = "SELECT podcast_name,podcaster_name FROM podcast";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;

            res.render("podcast.ejs", { data });
            //console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});


app.get("/educationhub", (req, res) => {
    let q = "SELECT tutorials,virtualworkshops from education_hub";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;

            res.render("educationhub.ejs", { data });
            // console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});

app.get("/instruments", (req, res) => {
    let q = "SELECT instrument_name,song_name from instruments";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;

            res.render("instruments.ejs", { data });
            console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});

app.get("/playl", (req, res) => {
    let q = "SELECT name from playlist where username='Johndoe'";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let data = result;

            res.render("createplaylist.ejs", { data });
            console.log(data);
        });
    } catch (err) {
        res.send("some error occurred");
    }
});
app.listen("3000", () => {
    console.log("server running on port 3000");
});