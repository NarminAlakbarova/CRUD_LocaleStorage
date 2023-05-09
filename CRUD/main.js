let userData = JSON.parse(localStorage.getItem("users")) ?? [];
let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let allcards = document.querySelector(".allcards");
let sumbit = document.querySelector(".btn-primary");
let editId = null;
let editStatus = false;
sumbit.disabled = true;
function checkValue() {
  if (inputs[0].value && inputs[1].value && inputs[2].value) {
    sumbit.removeAttribute("disabled");
  } else {
    sumbit.setAttribute("disabled", "");
  }
}
inputs.forEach((item) => {
  item.addEventListener("input", checkValue);
});

function drawCards() {
  allcards.innerHTML = "";
  userData.forEach((item) => {
    allcards.innerHTML += `
        
        <span class="card" style="width: 35rem">
            <div class="card-body">
              <div>
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.email}</p>
                <p class="card-text">${item.date}</p>
              </div>
              <div class="icons">
                <i class="fa-solid fa-user-pen " onclick=editCard("${item.id}")></i>
                <i class="fa-solid fa-trash-can " onclick=deleteCard("${item.id}",this)></i>
              </div>
            </div>
          </span>
        
        
        `;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!editStatus) {
    let obj = {
      name: inputs[0].value,
      email: inputs[1].value,
      date: inputs[2].value,
      id: Date.now(),
    };
    userData.push(obj);
    localStorage.setItem("users", JSON.stringify(userData));
    drawCards();
    inputs.forEach((item) => (item.value = ""));
    sumbit.disabled = true;
  } else {
    let finish = userData.find((obj) => obj.id == editId);
    finish.name = inputs[0].value;
    finish.email = inputs[1].value;
    finish.date = inputs[2].value;
    localStorage.setItem("users", JSON.stringify(userData));
drawCards()
    sumbit.innerText = "ADD";
    inputs.forEach((item) => (item.value = ""));
    editStatus = false;
  }
});

function deleteCard(id, button) {
  userData = userData.filter((item) => item.id != id);
  localStorage.setItem("users", JSON.stringify(userData));
  button.closest("span").remove();
}
function editCard(id) {
  editStatus = true;
  editId = id;
  let edit = userData.find((obj) => obj.id == id);
  inputs[0].value = edit.name;
  inputs[1].value = edit.email;
  inputs[2].value = edit.date;
  sumbit.innerText = "Edit";
}

window.onload = function () {
  drawCards();
};
