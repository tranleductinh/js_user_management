let users = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [];

const dialog = document.getElementById("dialog");
const dialogDelete = document.getElementById("dialogDelete");
const dialogForm = document.getElementById("dialogForm");
const dialogFormDelete = document.getElementById("dialogFormDelete");
const userManagement = document.querySelector(".user-management__empty");
const listUser = document.getElementById("list_user");

function openDialog() {
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
                <button class="user-card__button user-card__button--edit">
                  Edit
                </button>
                <button class="user-card__button user-card__button--delete" onClick=deleteUser(${u.id})>
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
  deleteDialog()
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
  const userName = document.getElementById("user-name").value;
  const userEmail = document.getElementById("user-email").value;
  const userPhone = document.getElementById("user-phone").value;
  if (userName.length < 2) {
    document.getElementById("error-name").innerText = "Tên phải ≥ 2 ký tự";
    return;
  }
  if (userPhone.length < 10 || userPhone.length > 11) {
    document.getElementById("error-phone").innerText = "SĐT phải 10–11 chữ số";
    return;
  }
  const user = {
    id: Date.now(),
    userName,
    userEmail,
    userPhone,
  };
  users.push(user);
  saveUser();
  closeDialog();
  renderUser();
});
