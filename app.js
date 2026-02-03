// =====================
// Recipe Data (Part 1)
// =====================
const recipes = [
  { id: 1, title: "Pasta Alfredo", difficulty: "easy", time: 20 },
  { id: 2, title: "Chicken Curry", difficulty: "medium", time: 40 },
  { id: 3, title: "Beef Steak", difficulty: "hard", time: 50 },
  { id: 4, title: "Veg Sandwich", difficulty: "easy", time: 10 },
  { id: 5, title: "Fried Rice", difficulty: "easy", time: 25 },
  { id: 6, title: "Paneer Butter Masala", difficulty: "medium", time: 35 },
  { id: 7, title: "Biryani", difficulty: "hard", time: 60 },
  { id: 8, title: "Salad Bowl", difficulty: "easy", time: 15 }
];

// =====================
// DOM References
// =====================
const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// =====================
// State
// =====================
let currentFilter = "all";
let currentSort = "none";

// =====================
// Part 1 Render Functions
// =====================
const createRecipeCard = (recipe) => {
  const card = document.createElement("div");
  card.className = "recipe-card";

  card.innerHTML = `
    <h3>${recipe.title}</h3>
    <p>Difficulty: ${recipe.difficulty}</p>
    <p>Time: ${recipe.time} min</p>
  `;

  return card;
};

const renderRecipes = (recipesToRender) => {
  recipeContainer.innerHTML = "";
  recipesToRender.forEach(recipe => {
    recipeContainer.appendChild(createRecipeCard(recipe));
  });
};

// =====================
// Filter Functions (Pure)
// =====================
const filterByDifficulty = (recipes, level) => {
  return recipes.filter(r => r.difficulty === level);
};

const filterByQuick = (recipes) => {
  return recipes.filter(r => r.time < 30);
};

const applyFilter = (recipes, filter) => {
  switch (filter) {
    case "easy":
    case "medium":
    case "hard":
      return filterByDifficulty(recipes, filter);
    case "quick":
      return filterByQuick(recipes);
    default:
      return recipes;
  }
};

// =====================
// Sort Functions (Pure)
// =====================
const sortByName = (recipes) => {
  return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
};

const sortByTime = (recipes) => {
  return [...recipes].sort((a, b) => a.time - b.time);
};

const applySort = (recipes, sortType) => {
  switch (sortType) {
    case "name":
      return sortByName(recipes);
    case "time":
      return sortByTime(recipes);
    default:
      return recipes;
  }
};

// =====================
// Main Update Function
// =====================
const updateDisplay = () => {
  let result = recipes;
  result = applyFilter(result, currentFilter);
  result = applySort(result, currentSort);
  renderRecipes(result);
};

// =====================
// UI Helpers
// =====================
const updateActiveButtons = () => {
  filterButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === currentFilter);
  });

  sortButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sort === currentSort);
  });
};

// =====================
// Event Listeners
// =====================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    updateActiveButtons();
    updateDisplay();
  });
});

sortButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentSort = btn.dataset.sort;
    updateActiveButtons();
    updateDisplay();
  });
});

// =====================
// Init
// =====================
updateDisplay();
