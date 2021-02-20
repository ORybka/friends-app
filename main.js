const imageSrc = 'https://picsum.photos/200/300';

const usersUrl = 'https://randomuser.me/api/?results=30';
fetch(usersUrl)
  .then(handleErrors)
  .then((response) => response.json())
  .then(({ results }) => fillCardContainer(results))
  .catch(displayErrorMessage);

const urlPhoto = 'https://picsum.photos/v2/list?page=2&limit=30';
fetch(urlPhoto)
  .then(handleErrors)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch(displayErrorMessage);

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

function fillCardContainer(userData) {
  let userCard;
  userData.forEach((card) => {
    userCard = createCard(card);
    cardsContainer.appendChild(userCard);
  });
}

function createCard({ picture, name, dob, email, phone }) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img class="card-image" src="${imageSrc}" alt="card-image" >
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
