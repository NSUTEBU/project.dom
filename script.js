let users = [
  { name: "Trevor", age: 30 },
  { name: "Mathew", age: 26 },
  { name: "Mark", age: 19 },
  { name: "luke", age: 29 },
  { name: "isaiah", age: 12 },
  { name: "jeremiah", age: 16 },
  { name: "Psalms", age: 27 },
  { name: "corinthians", age: 35 },
  { name: "Ephisians", age: 60 },
  { name: "Deutoronomy", age: 75 },
]

const form = document.querySelector("form");
const userContainers = document.querySelector(".user-name");

function displayuser({ age, name }) {
  return `
  <div class="user">
    <div class="user-profile"></div>
    <div>
      <p class="user-name">${name}</p>
      <p class="user-age">${age} year${age > 1 ? "s" : ""}</p>
    </div>
  </div>`
}

  function displayusers(persons) {
  return persons.length
  ? persons.map(displayuser).join("")
  : renderMessage("Sorry! NO User Found");
} 

function compareNames(name, searchTerm) {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}

function shouldResolve() {
  return Math.random() < 0.85;
}

function searchUsers(name, age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (shouldResolve()) {
        resolve(
          users.filter(
            (users) =>
              (!name || compareNames(users.name, name)) &&(!age || users.age === age)
          )
        );
      } else {
        reject({});
      }
    }, 2000);
  });
}

function renderMessage(message) {
  return `<div class="message">${message}</div>`;
}

userContainers.innerHTML = displayusers(users);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  userContainers.innerHTML = renderMessage( "Searching Users...");
    searchUsers(e.target.name.value, +e.target.age.value)
    .then((result) => {
      userContainers.innerHTML = displayusers(result); 
    })
    .catch((e) => {
      userContainers.innerHTML = renderMessage("Error loading user! please try again");
    });
});