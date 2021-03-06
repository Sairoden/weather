const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sairoden Gandarosa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Sairoden Gandarosa",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sairoden Gandarosa",
    helpText: "HELP",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address)
    return res.status(400).json({ error: "You must provide an address" });

  geocode(address, (err, { latitude, longitude, location } = {}) => {
    if (err) return res.status(400).json({ err });

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) return res.status(400).json({ err });

      res.status(200).json({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.status(400).json({ error: "You must provide a search term" });

  res.status(200).json({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found!",
    name: "Sairoden Gandarosa",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found!",
    name: "Sairoden Gandarosa",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
