const cardsContainer = document.querySelector('.users-container');
const sortInput = document.querySelectorAll('.radio-input');
let sortedUsers;

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

const fetchUsers = async () => {
  const usersUrl = 'https://randomuser.me/api/?results=30';

  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(usersUrl);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const { results } = await response.json();
        return results;
      }
    } catch (e) {
      console.error(e);
    }
  }
};

const initApp = async () => {
  const usersData = await fetchUsers();
  fillCardContainer(usersData);
  addEventListener(usersData);
};

function fillCardContainer(usersData) {
  let userCard;
  usersData.forEach((card) => {
    addOption(card);
    userCard = createCard(card);
    cardsContainer.appendChild(userCard);
  });
}

function createCard({ picture, name, dob, email, phone, gender, location }) {
  // const locationURL
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img class="card-image" src="https://picsum.photos/200/300?random=${dob.age}" alt="card-image" >
    </div>
    <div class="user-image-container">
      <img class="user-image" src="${picture.large}" alt="user-image" >
    </div>
    <div class="col user-information">
      <h3 class="user-name">${name.first} ${name.last}</h3>
      <p class="user-age">${dob.age} years old</p>
      <div class="row contact-information">
        <a class="user-email" href="mailto:${email}">
          <span class="material-icons">email</span>
        </a>
        <a class="user-phone" href="tel:${phone}">
          <span class="material-icons">phone</span>
        </a>
        <a class="user-location" href="https://www.google.com.ua/maps/place/${location.city}" target="_blank">
          <span class="material-icons">location_on</span>
        </a>
      </div>
    </div>
  `;
  setCardBackground(card, gender);
  return card;
}

function setCardBackground(card, gender) {
  if (gender === 'female') {
    card.style.backgroundColor = '#ffc4fd6e';
  } else {
    card.style.backgroundColor = '#aaddff7a';
  }
  return card;
}

function addOption({ name }) {
  const usersList = document.querySelector('#users-list');
  const userName = `${name.first} ${name.last}`;
  const userElement = document.createElement('option');
  userElement.value = userName;
  userElement.innerText = userName;
  usersList.append(userElement);
}

const addEventListener = (usersData) => {
  sortInput.forEach((el) =>
    el.addEventListener('input', () => {
      cardsContainer.innerHTML = '';
      sortUsers(usersData, el.name);
    })
  );
};

function sortUsers(data, name) {
  const sortFunctions = {
    byAgeAscending: (a, b) => sortByAge(a, b),
    byAgeDescending: (a, b) => sortByAge(b, a),
    byNameAZ: (a, b) => sortByName(a, b),
    byNameZA: (a, b) => sortByName(b, a),
  };
  if (sortFunctions[name]) {
    sortedUsers = data.sort(sortFunctions[name]);
    console.log(sortedUsers);
    fillCardContainer(sortedUsers);
    // definesortedUsers(sex);
    // renderFriends(sortedUsers);
  }
}

function sortByAge(a, b) {
  return a.dob.age - b.dob.age;
}

function sortByName(a, b) {
  const userA = a.name.first.toLowerCase();
  const userB = b.name.first.toLowerCase();
  if (userA > userB) {
    return 1;
  }
  if (userA < userB) {
    return -1;
  }
  return 0;
}
