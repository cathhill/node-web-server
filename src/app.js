const path = require("path");

//npm modules usually required after core modules
const express = require("express");
const { Server } = require("http");
//for partials:
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
// need to add this line so heroku can work - accesses environment variable for heroku. If this doesn't exist it uses the local port 3000:
const port = process.env.PORT || 3000;

//Define paths for Express config
//path is a core node module. .. goes up a folder level, ../.. goes up two.
// two x _ before dirname.
const publicDirectoryPath = path.join(__dirname, "../public");
//customising the views folder:
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
//app.set (setting name, value) - needs to be exact so express understands.
app.set("view engine", "hbs");
//tell express where to look for views:
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to Server.
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

app.get("", (req, res) => {
  //enables rendering of one of the views(handlebars templates = hbs file). It converts it to html. Second parameter is an object with what you want to show.
  res.render("index", {
    title: "Weather",
    name: "Catherine",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Catherine",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help me please!",
    title: "Help",
    name: "Catherine",
  });
});

//app.com/weather. View on localhost:2000/weather.
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  // callback often takes two arguments: error and data. Only one of these will have a value, the other will be undefined. Data here is destructured.
  // "={}" provides a default empty object for the data parameters (latitude, longitude, location) so that code still runs if the search provided isn't valid.
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      //return only returns one thing and then stops running, so the forecast data won't show if there is a geocode error.
      // forecastData comes from geocode function. Can't be called data as prevents getting 'data' from geocode above.
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  } //return stops the below section of code running so no problem with there being 2x responses.
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// /help/* deals with every other route starting with /help/.
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Catherine",
    errorMessage: "Help article not found.",
  });
});

//* deals with every other route. It has to come last otherwise it will happen when other routes should.
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Catherine",
    errorMessage: "Page not found",
  });
});

//starts the server (using port 3000). It will stay running on localhost:3000 unless it is stopped (ctrl+c).
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
