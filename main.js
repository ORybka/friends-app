const CARDS_NUMBER = 30;
const requests = [fetch('https://randomuser.me/api/?results=30'), fetch('https://picsum.photos/v2/list?page=4&limit=30')];

Promise.all(requests)
  .then((responses) => {
    responses.forEach(() => handleErrors);
    return responses;
  })
  .then((responses) => Promise.all(responses.map((response) => response.json())))
  .then((data) => fillCardContainer(data[1], data[0].results))
  // .catch(displayErrorMessage);
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function displayErrorMessage() {
  console.log('Something went wrong...Please, reload the page!');
}

const cardsContainer = document.querySelector('.users-container');

document.addEventListener('DOMContentLoaded', () => {
  function fillCardContainer(url, userData) {
    let userCard;
    for (let i = 0; i <= CARDS_NUMBER; i++) {
      userCard = createCard(url[i].download_url, userData[i]);
      cardsContainer.appendChild(userCard);
    }
  }
});

function fillCardContainer(url, userData) {
  let userCard;
  for (let i = 0; i <= CARDS_NUMBER; i++) {
    userCard = createCard(url[i].download_url, userData[i]);
    cardsContainer.appendChild(userCard);
  }
}

function createCard(url, { picture, name, dob, email, phone }) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img class="card-image" src="${url}" alt="card-image" >
    </div>
    <div class="user-image-container">
      <img class="user-image" src="${picture.large}" alt="user-image" >
    </div>
    <div class="col user-information">
      <h3 class="user-name">${name.first} ${name.last}</h3>
      <p class="user-age">${dob.age} years old</p>
      <a class="user-email" href="mailto:${email}">${email}</a>
      <a class="user-phone" href="tel:${phone}">${phone}</a>
    </div>
  `;
  return card;
}

// icons for email, phone, map (location)
// male/female color of card
// preloader
