// On DOM Web loaded ---

  // Tool Tip Toggle

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  // List Loader 
// Modal User Changer (Select Option)

var selectType = document.getElementById("inputGroupSelectUser");

var userNameDiv = document.getElementById("userNameDiv");

// Hide user name Div 

selectType.addEventListener("change", function() {

  if (selectType.value === "Invitado") { 

      userNameDiv.classList.add("fadeOut");

      setTimeout(() => {

          userNameDiv.style.display = "none";
          userNameDiv.classList.remove("fadeOut");
      }, 200); 
  } else {
      userNameDiv.style.display = "block";
  }
});


// Modal Edit Changer (Body and Color)

var btnActions = document.querySelectorAll(".btnActions");

btnActions.forEach(function(btn) {
  btn.addEventListener("click", function(event) {

    var recipient = btn.getAttribute("data-bs-whatever")
    var bgColor = btn.getAttribute("data-bg-color");
    var btnInfo = btn.getAttribute("title");

    // Modal Object
    var modal = new bootstrap.Modal(document.getElementById("modalEdit"));

    // Title changer
    var modalTitle = document.querySelector("#modalEdit .modal-title");
    modalTitle.textContent = recipient
    
    // Header BgColor changer
    var modalHeader = document.querySelector("#modalEdit .modal-header");
    modalHeader.style.backgroundColor = bgColor;

    // Body Changer
    var modalContent = document.querySelector("#modalEdit #content1")
    var modalDelete = document.querySelector("#modalEdit #content2")
    var modalFooter = document.querySelector("#modalEdit .modal-footer")

    if (recipient == "Eliminar Espacio"){
      modalContent.style.display = "none";
      modalDelete.style.display = "block";
      modalFooter.style.display = "none";
    } else{
      modalContent.style.display = "block";
      modalDelete.style.display = "none";
      modalFooter.style.display = "block";
    }

    modal.show();
  });
});

// Modal Add User to database.js

var adduserBtn = document.getElementById("add-userBtn");

adduserBtn.addEventListener("click", function(event){
  var username = document.getElementById("user-name").value.trim();
  var usercar = document.getElementById("user-car").value.trim();
  var usercel = document.getElementById("user-cel").value.trim();

  // Client Type validation
  if (selectType.value == "Invitado"){
    username = "Invitado";
  } 
  
  // Validate info
  if (username == "" || usercar == "" || usercel == "") {
    alert("Por favor rellene todos los campos.")
    return;
  } 

  if (!/^\d{3}-\d{7}$/.test(usercel)){
    alert("Por favor ingrese el formato correcto del número de celular.")
    return;
  }

  if (!/^[A-Z]{3}-\d{3}$/.test(usercar)){
    alert("El formato debe ser una placa XXX-###, donde X sea una letra mayuscula y # un digito.")
    return;
  }

  var newUser = {
    name: username,
    userType: selectType.value,
    userCel: usercel
  };

  users_data[usercar] = newUser;

  //Save and clean forms

  alert("Usuario agregado correctamente...")

  document.getElementById("inputGroupSelectUser").value = "Cliente";
  document.getElementById("user-name").value = "";
  document.getElementById("user-cel").value = "";
  document.getElementById("user-car").value = "";

});