let users = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [];

const dialog = document.getElementById("dialog");
const dialogDelete = document.getElementById("dialogDelete");
const dialogForm = document.getElementById("dialogForm");
const dialogFormDelete = document.getElementById("dialogFormDelete");
const userManagement = document.querySelector(".user-management__empty");
const listUser = document.getElementById("list_user");
const dialogSubmit = document.getElementById("dialogSubmit");

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhone = document.getElementById("user-phone");
let dialogId = null;

function openDialog(id) {
  const dialogTitle = document.getElementById("dialogTitle");
  if (id) {
    const user = users.find((u) => u.id === id);
    dialogTitle.innerText = "Edit User";
    dialogSubmit.innerText = "Save Changes";
    userName.value = user.userName;
    userEmail.value = user.userEmail;
    userPhone.value = user.userPhone;
    dialogId = id;
  } else {
    dialogTitle.innerText = "Add User";
  }
  document.getElementById("error-name").innerText = "";
  document.getElementById("error-phone").innerText = "";
  dialog.show();
}

function closeDialog() {
  dialog.close();
  dialogDelete.close();
  dialogForm.reset();
}

function deleteDialog() {
  dialogDelete.show();
}
function renderUser() {
  if (users.length === 0) {
    userManagement.style.display = "block";
    listUser.innerHTML = "";
  } else {
    userManagement.style.display = "none";
    listUser.innerHTML = users
      .map((u) => {
        return `
            <article class="user-card">
              <h3 class="user-card__name">${u.userName}</h3>
              <p class="user-card__email">Email: ${u.userEmail}</p>
              <p class="user-card__phone">Phone: ${u.userPhone}</p>
              <div class="user-card__actions">
                <button class="user-card__button user-card__button--edit" onclick=openDialog(${u.id})>
                  Edit
                </button>
                <button class="user-card__button user-card__button--delete" onclick=deleteUser(${u.id})>
                  Delete
                </button>
              </div>
            </article>
        `;
      })
      .join("");
  }
}
renderUser();

function deleteUser(id) {
  deleteDialog();
  dialogFormDelete.addEventListener("submit", function (e) {
    e.preventDefault();
    users = users.filter((u) => u.id !== id);
    saveUser();
    renderUser();
    closeDialog();
  });
}
function saveUser() {
  localStorage.setItem("user", JSON.stringify(users));
}

dialogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (dialogId) {
    const user = users.findIndex((u) => u.id === dialogId);
    users[user] = {
      ...users[user],
      userName: userName.value,
      userEmail: userEmail.value,
      userPhone: userPhone.value,
    };
  } else {
    if (userName.value.length < 2) {
      document.getElementById("error-name").innerText = "Tên phải ≥ 2 ký tự";
      return;
    }
    if (userPhone.value.length < 10 || userPhone.value.length > 11) {
      document.getElementById("error-phone").innerText =
        "SĐT phải 10–11 chữ số";
      return;
    }
    const user = {
      id: Date.now(),
      userName: userName.value,
      userEmail: userEmail.value,
      userPhone: userPhone.value,
    };
    users.push(user);
  }

  saveUser();
  closeDialog();
  renderUser();
});

//xử lý sự kiện click outsite -> close modal dialog
dialog.addEventListener("click", function (e) {
  if (e.target === dialog) {
    closeDialog();
  }
});

dialogDelete.addEventListener("click", function (e) {
  if (e.target === dialogDelete) {
    closeDialog();
  }
});

window.addEventListener("storage", (e) => {
  if (e.key === "user") {
    users = JSON.parse(localStorage.getItem("user"));
    renderUser();
  }
});
