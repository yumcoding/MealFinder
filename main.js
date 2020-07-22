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
// Get Meal By ID
function getMealById(mealID) {
  const mealDetails = fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  )
    .then((res) => res.json())
    .then((data) => data.meals[0]);
  addToDom(mealDetails);
}

//addToDom
function addToDom(mealDetails) {
  console.log(mealDetails);
}

// EventListeners

form.addEventListener("submit", findMeal);

mealsContainer.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList.contains("mealInfo")) {
      return item;
    } else {
      return false;
    }
  });
  // console.log(mealInfo);
  const mealID = mealInfo.getAttribute("data-mealid");
  // console.log(mealID);
  getMealById(mealID);
});
