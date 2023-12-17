/* ===== แถบการใช้งาน ===== */
const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
});

sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});

body.addEventListener("click", (e) => {
  let clickedElm = e.target;

  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});



fetch("https://gamertocoder.garena.co.th/api/minigames")
  .then((response) => {
    if (response.status !== 200) {
      return response.status;
    }
    return response.json();
  })
  .then((data) => {
    if (typeof data == "number") {
      alert(data);
    } else {
      for (let i = 0; i < data.length; i++) {
        const currentData = data[i];
        const newListItem = document.createElement("li");
        newListItem.classList.add("card");
        const genre_array = currentData.genre;
        let genre_string = genre_array[0];
        if (genre_array.length > 1) {
          for (let j = 1; j < genre_array.length; j++) {
            genre_string = genre_string + ", " + genre_array[j];
          }
        }
        const html =
          '<div class="name" onclick="changeName(' + currentData.name + ')"> ชื่อ: ' + currentData.name + '</div>'
          + '<img src="' + currentData.icon + '"/>'
          + '<div>ประเภท: ' + genre_string + '</div>'
          + '<div class="detail">' + currentData.description + '</div>'
          + '<a href="' + currentData.icon + '">link</a>';
        html.trim();
        newListItem.innerHTML = html;
        document.getElementById("list").appendChild(newListItem);
      }
    }
  });
