const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const buildPrompt = require("../utils/promptBuilder");
require("dotenv").config();
const prisma = require("../../prisma/client");
const authenticateToken = require("../middlewares/auth.middleware");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      orderBy: { createdAt: "desc" },
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(JSON.parse(recipe));
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Failed to fetch recipe" });
  }


})

router.get("/user-recipes", (req, res) => {
  const userid = req.query.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  prisma.recipe
    .findMany({
      where: { userId: userid },
      select: {
        id: true,
        recipe: true,
        createdAt: true,
        updatedAt: true,
      },

      orderBy: { createdAt: "desc" },
    })
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch recipes" });
    });
});

router.post("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const recipe = req.body.recipe;
  try {
    await prisma.recipe.create({
      data: {
        userId,
        recipe,
      },
    });
    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

router.post("/generate-recipe", async (req, res) => {
  const {
    ingredients,
    cuisine,
    dietary,
    servings,
    timeLimit,
    additionalDetails,
  } = req.body;

  const prompt = buildPrompt({
    ingredients,
    cuisine,
    dietary,
    servings,
    timeLimit,
    additionalDetails,
  });

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recipe generated.";

    const cleanJSON = rawText.replace(/```json\n?|```/g, "");

    const recipe = JSON.parse(cleanJSON);

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
