const requests = [fetch('https://randomuser.me/api/?results=30'), fetch('https://picsum.photos/v2/list?page=2&limit=30')];

Promise.all(requests)
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  .then((data) => data.forEach((data) => console.log(data)));
