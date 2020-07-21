const form = document.getElementById("submit");
const searchInput = document.getElementById("search");
const randomBtn = document.getElementById("random-btn");
const resultHeading = document.getElementById("result-heading");
const mealsContainer = document.getElementById("meals");
const singleMeal = document.getElementById("single-meal");

function findMeal(e) {
  e.preventDefault();

  const meal = searchInput.value;
  if (meal === "") {
    alert("Please enter the food name 😉");
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>Sorry, there's no recipe for ${meal} 😥</h2>`;
        } else {
          resultHeading.innerHTML = `<h2>Search Results for '${meal}': </h2>`;
          mealsContainer.innerHTML = data.meals
            .map(
              (recipe) => `
            <div class="meal">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
                <div class="mealInfo" data-mealid="${recipe.idMeal}">
                <h3>${recipe.strMeal}</h3>
                </div>
            </div>
            
            `
            )
            .join("");
        }
      });
  }

  searchInput.value = "";
}

// EventListeners

form.addEventListener("submit", findMeal);
