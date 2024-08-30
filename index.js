import express from "express";
import { adj } from "./data/adj.js";
import { noun } from "./data/noun.js";

const app = express();
const port = 3000;

// Serve static files
app.use(express.static("public"));

// Use EJS as the templating engine
app.set("view engine", "ejs");

// Get the current year
const currentYear = new Date().getFullYear();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Default h1 content
let h1Content = `Argo oluşturmak için butona bas👇`;

// Route to serve the main page
app.get("/", (req, res) => {
  res.render("pages/index.ejs", { year: currentYear, h1: h1Content });
});

// Route to handle form submission
app.post("/submit", (req, res) => {
  // Generate random indices
  const rdmAdjIndex = Math.floor(Math.random() * adj.length);
  const rdmNounIndex = Math.floor(Math.random() * noun.length);

  // Pick random adjective and noun
  const rdmAdj = adj[rdmAdjIndex];
  const rdmNoun = noun[rdmNounIndex];

  // Update h1 content
  h1Content = `${rdmAdj} ${rdmNoun}`;

  // Render the page with updated h1 content
  res.render("pages/index.ejs", {
    year: currentYear,
    h1: h1Content,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
