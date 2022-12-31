const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchFieldArea = searchField.value;
  searchField.value = "";
  searchFieldArea.textContent = ""

  const emptyStringMessage = document.getElementById('empty-string');
  const resultErrorMessage = document.getElementById('result-error');

  if(searchFieldArea === ''){
    emptyStringMessage.style.display = 'block'
    resultErrorMessage.style.display = 'none'
  }

  else{
    emptyStringMessage.style.display = 'none'
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldArea}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayFood(data.meals));
  } 
};

const displayFood = (foods) => {
  
  const searchCards = document.getElementById("search-cards");
  searchCards.textContent = "";
  
  const resultErrorMessage = document.getElementById('result-error');
  const emptyStringMessage = document.getElementById('empty-string');

  if(!foods){
    resultErrorMessage.style.display = 'block'
    emptyStringMessage.style.display = 'none'
  }

  else{
    resultErrorMessage.style.display = 'none'
    foods.forEach((food) => {
      // console.log(food)
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div class="col">
              <div class="card h-100">
                  <img onclick="foodDetails(${food.idMeal})" src="${food.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${food.strMeal}</h5>
                  <p class="card-text">${food.strInstructions.slice(0, 100)}</p>
              </div>
              </div>
          </div>`;
      searchCards.appendChild(div);
    });
  }
};

const foodDetails = (details) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data.meals[0]));
};

const showDetails = (details) => {
  // console.log(details)
  const cardDetails = document.getElementById("card-details");

  cardDetails.innerHTML = `
            <div class="card card-details">
                <img src="${details.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${details.strMeal}</h5>
                    <p class="card-text">${details.strInstructions.slice(0,100)}</p>
                </div>
            </div>`;
};
