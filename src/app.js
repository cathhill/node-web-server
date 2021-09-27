const path = require("path");

//npm modules usually required after core modules
const express = require("express");

const app = express();
//path is a core node module. .. goes up a folder level, ../.. goes up two.
const publicDirectoryPath = path.join(__dirname, "../public");

//app.set (setting name, value) - needs to be exact so express understands.
app.set("view engine", "hbs");
//static takes the path to the folder we want to serve up.
app.use(express.static(publicDirectoryPath));

//Don't need this block anymore as the static above will find index.html
/* //req = request, res = response
//this is for app.com. First argument is the route, second the callback.
app.get("", (req, res) => {
  // allows us to send something back to the requester in the browser.
  res.send("<h1>Hello</h1>");
}); */

/* //app.com/help. View on localhost:3000/help.
app.get("/help", (req, res) => {
  res.send([
    {
      name: "Andrew",
    },
    {
      name: "Sarah",
    },
  ]);
});

//app.com/about. View on localhost:2000/about.
app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
}); */

//app.com/weather. View on localhost:2000/weather.
app.get("/weather", (req, res) => {
  res.send({ forecast: "15°", location: "London" });
});

//starts the server (using port 3000). It will stay running on localhost:3000 unless it is stopped (ctrl+c).
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
