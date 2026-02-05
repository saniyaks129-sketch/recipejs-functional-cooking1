(() => {
  // ===== DATA (Part 1) =====
  const recipes = [
    {
      id: 1,
      title: "Pasta",
      difficulty: "easy",
      time: 20,
      description: "Quick and easy pasta.",
      ingredients: ["pasta", "salt", "oil"],
      steps: ["Boil water", "Add pasta", "Cook 10 mins"]
    },
    {
      id: 2,
      title: "Pizza",
      difficulty: "medium",
      time: 40,
      description: "Cheesy homemade pizza.",
      ingredients: ["flour", "cheese", "tomato"],
      steps: ["Prepare dough", "Add toppings", "Bake"]
    },
    {
      id: 3,
      title: "Biryani",
      difficulty: "hard",
      time: 60,
      description: "Spicy chicken biryani.",
      ingredients: ["rice", "chicken", "spices"],
      steps: ["Marinate chicken", "Cook rice", "Mix & cook"]
    }
  ];

  // ===== STATE (Part 2 & 4) =====
  let activeFilter = "all";
  let activeSort = null;
  let searchQuery = "";
  let favorites = JSON.parse(localStorage.getItem("recipeFavorites")) || [];
  let debounceTimer;

  // ===== DOM =====
  const recipeContainer = document.querySelector("#recipe-container");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const sortButtons = document.querySelectorAll("[data-sort]");
  const searchInput = document.querySelector("#search-input");
  const clearSearchBtn = document.querySelector("#clear-search");
  const recipeCounter = document.querySelector("#recipe-counter");

  // ===== UI RENDER (Part 1) =====
  const renderRecipes = (list) => {
    recipeContainer.innerHTML = list.map(r => `
      <div class="recipe-card">
        <button class="favorite-btn ${favorites.includes(r.id) ? "active" : ""}" data-id="${r.id}">❤️</button>
        <h3>${r.title}</h3>
        <p>${r.description}</p>
        <p><b>Difficulty:</b> ${r.difficulty}</p>
        <p><b>Time:</b> ${r.time} mins</p>

        <button class="toggle-btn">Toggle Ingredients</button>
        <ul class="ingredients" style="display:none;">
          ${r.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  };

  // ===== FILTERS (Part 2) =====
  const applyFilter = (list) => {
    if (activeFilter === "favorites") {
      return list.filter(r => favorites.includes(r.id));
    }
    if (activeFilter === "all") return list;
    return list.filter(r => r.difficulty === activeFilter);
  };

  // ===== SORT (Part 2) =====
  const applySort = (list) => {
    if (activeSort === "name") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (activeSort === "time") {
      return [...list].sort((a, b) => a.time - b.time);
    }
    return list;
  };

  // ===== SEARCH (Part 4) =====
  const applySearch = (list) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.toLowerCase().includes(q))
    );
  };

  // ===== COUNTER (Part 4) =====
  const updateCounter = (shown, total) => {
    recipeCounter.textContent = `Showing ${shown} of ${total} recipes`;
  };

  // ===== DISPLAY PIPELINE (Part 1–4) =====
  const updateDisplay = () => {
    let result = [...recipes];
    result = applySearch(result);
    result = applyFilter(result);
    result = applySort(result);

    updateCounter(result.length, recipes.length);
    renderRecipes(result);
  };

  // ===== EVENTS =====
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      updateDisplay();
    });
  });

  sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeSort = btn.dataset.sort;
      updateDisplay();
    });
  });

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = searchInput.value;
      clearSearchBtn.style.display = searchQuery ? "inline" : "none";
      updateDisplay();
    }, 300);
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    updateDisplay();
  });

  recipeContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("favorite-btn")) {
      const id = Number(e.target.dataset.id);
      favorites = favorites.includes(id)
        ? favorites.filter(f => f !== id)
        : [...favorites, id];

      localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
      updateDisplay();
    }

    if (e.target.classList.contains("toggle-btn")) {
      const ul = e.target.nextElementSibling;
      ul.style.display = ul.style.display === "none" ? "block" : "none";
    }
  });

  // ===== INIT =====
  updateDisplay();
})();

let searchQuery = '';
let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
let debounceTimer;

const searchInput = document.querySelector('#search-input');
const clearSearchBtn = document.querySelector('#clear-search');
const recipeCounter = document.querySelector('#recipe-counter');
const applySearch = (recipes, query) => {
  const lowerQuery = query.toLowerCase().trim();

  return recipes.filter(recipe => {
    const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);
    const ingredientMatch = recipe.ingredients.some(ing =>
      ing.toLowerCase().includes(lowerQuery)
    );
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(lowerQuery);

    return titleMatch || ingredientMatch || descriptionMatch;
  });
};

const applyFavoritesFilter = (recipes) => {
  return recipes.filter(recipe => favorites.includes(recipe.id));
};

const updateCounter = (shown, total) => {
  recipeCounter.textContent = `Showing ${shown} of ${total} recipes`;
};

const updateDisplay = () => {
  let filtered = [...recipes];

  if (searchQuery) {
    filtered = applySearch(filtered, searchQuery);
  }

  filtered = applyFilter(filtered, activeFilter);
  filtered = applySort(filtered, activeSort);

  updateCounter(filtered.length, recipes.length);
  renderRecipes(filtered);
};

<button 
  class="favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}" 
  data-recipe-id="${recipe.id}"
>❤️</button>

const toggleFavorite = (id) => {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fid => fid !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  updateDisplay();
};

if (e.target.classList.contains('favorite-btn')) {
  const id = Number(e.target.dataset.recipeId);
  toggleFavorite(id);
}

if (e.target.classList.contains('favorite-btn')) {
  const id = Number(e.target.dataset.recipeId);
  toggleFavorite(id);
}

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    searchQuery = searchInput.value;
    clearSearchBtn.style.display = searchQuery ? 'inline' : 'none';
    updateDisplay();
  }, 300);
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  clearSearchBtn.style.display = 'none';
  updateDisplay();
});

