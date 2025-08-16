const addUserBtn = document.querySelector("#adduser");
const btntext = addUserBtn.innerText;

const UsernameTextField = document.querySelector("#username");
const recordDisplay = document.querySelector("#records");
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem("users");
if (objStr != null) {
  userArray = JSON.parse(objStr);
}

addUserBtn.onclick = () => {
  const name = UsernameTextField.value;
  //input 
if(name === undefined || name === null || name === ""){
  alert('enetr data')
}

  if (edit_id != null) {
    //edit
    userArray.splice(edit_id, 1, { name: name });
    edit_id = null;
  } else {
    //insert

    userArray.push({ name: name });
  }

  SaveInfo(userArray);
  UsernameTextField.value = "";
  addUserBtn.innerHTML = btntext;
};

//saveinfi function
function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  DisplayInfo();
}

//displayinfo function
function DisplayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${user.name}</td>
                  <td>
                    <i class="fa-solid fa-pen-to-square" onClick= EditInfo(${i})></i>
                    <i class="fa-solid fa-trash" onClick= DeleteInfo(${i})></i>
                  </td>
                </tr>   `;
  });
  recordDisplay.innerHTML = statement;
}

//editinfo function
function EditInfo(id) {
  edit_id = id;
  UsernameTextField.value = userArray[id].name;
  addUserBtn.innerHTML = "Edit";
}

//deleteinfi function
function DeleteInfo(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);
}
