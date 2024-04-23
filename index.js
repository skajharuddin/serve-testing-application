const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const { info } = require("console");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serial number
let slNo = 1;

let information = [
  {
    sl: slNo++,
    id: uuidv4(),
    username: "harry256",
    name: "Harry ",
    gender: "Male",
    parent: "Mr. Rozar",
    course: "Literature",
    session: "2021-2024",
    address: "United Kingdom",
    mobile: "7********1",
    email: "unknown@email.com",
    details: "Currently, pursuing a hons course in Literature.",
  },
  {
    sl: slNo++,
    id: uuidv4(),
    username: "mralex51",
    name: "Mr. Alex John",
    gender: "Male",
    parent: "Mr. John",
    course: "M.Tech",
    session: "2022-2024",
    address: "USA",
    mobile: "8********7",
    email: "a*******@email.com",
    details: "Currently pursuing Masters of Technology at Random University",
  },
];

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/home", (req, res) => {
  res.render("index.ejs", { information });
});

app.post("/post_login", (req, res) => {
  let { email, password } = req.body;

  if (email == "amaremailsau@email.com" && password == 5236) {
    res.render("index.ejs", { information });
    // res.send(`${email} and ${password}`);
  } else if (email == "4444" && password == 4444) {
    res.render("public.ejs", {information});
  } else {
    res.render("wrong.ejs");
  }

  // res.render("post_login.ejs", { email, password });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/", (req, res) => {
  let sl = slNo++;
  let id = uuidv4();

  let {
    username,
    name,
    gender,
    parent,
    course,
    sessionStart,
    sessionEnd,
    address,
    mobile,
    email,
    details,
  } = req.body;

  session = `${sessionStart} - ${sessionEnd}`;

  information.push({
    sl,
    id,
    username,
    name,
    gender,
    parent,
    course,
    session,
    address,
    mobile,
    email,
    details,
  });

  res.redirect("/");
});

app.get("/:id", (req, res) => {
  let { id } = req.params;
  let specificInfo = information.find((p) => id === p.id);
  res.render("show.ejs", { specificInfo });
  // console.log(specificInfo.id);
});

app.patch("/:id", (req, res) => {
  let { id } = req.params;
  let specificInfo = information.find((p) => id === p.id);

  specificInfo.name = req.body.name;
  specificInfo.gender = req.body.gender;
  specificInfo.parent = req.body.parent;
  specificInfo.session = `${req.body.sessionStart} - ${req.body.sessionEnd}`;
  specificInfo.address = req.body.address;
  specificInfo.mobile = req.body.mobile;
  specificInfo.email = req.body.email;
  specificInfo.details = req.body.details;

  // console.log(specificInfo);
  res.redirect("/");
});

app.get("/:id/edit", (req, res) => {
  let { id } = req.params;
  let specificInfo = information.find((p) => id === p.id);
  res.render("edit.ejs", { specificInfo });
});

app.delete("/:id", (req, res) => {
  let { id } = req.params;
  information = information.filter((p) => id != p.id);
  res.redirect("/home");
});

app.listen(port);
