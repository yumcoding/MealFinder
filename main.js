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
async function getMealById(mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  const data = await res.json();
  const mealDetails = data.meals[0];
  addToDom(mealDetails);
}

//addToDom
function addToDom(mealDetails) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`]) {
      ingredients.push(
        `${mealDetails[`strIngredient${i}`]} - ${mealDetails[`strMeasure${i}`]}`
      );
    }
  }

  // console.log(ingredients);

  singleMeal.innerHTML = `
  <h2>${mealDetails.strMeal}</h2>
  <img src="${mealDetails.strMealThumb}"/>
  <section class="ingredients">
    <ul>
      ${ingredients.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  </section>
  <div class="category">
    <div>${mealDetails.strCategory}</div>
    <div>${mealDetails.strArea}</div>
  </div>
  <section class="instruction">
     <p>${mealDetails.strInstructions}</p>
  </section>
  `;
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
