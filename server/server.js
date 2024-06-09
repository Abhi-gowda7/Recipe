// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Schema and Model
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// API Routes
app.post('/api/recipes', async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.send(newRecipe);
});

app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
