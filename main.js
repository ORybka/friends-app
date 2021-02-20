const url = 'https://randomuser.me/api/?results=30';
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results[0].name.first);
  });

// const urlPhoto = 'https://picsum.photos/v2/list?page=2&limit=30';
// fetch(urlPhoto)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });
