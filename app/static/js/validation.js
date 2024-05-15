// Set Styles for the form
function setError(element, message) {
  const parent = element.parentElement.parentElement;
  const error = parent.querySelector(".error");

  error.innerText = message;

  parent.classList.add("error");
  parent.classList.remove("success");
}
function setSuccess(element) {
  const parent = element.parentElement.parentElement;
  const error = parent.querySelector(".error");

  error.innerText = "";
  parent.classList.remove("error");
  parent.classList.add("success");
}
function setDefault(element) {
  const parent = element.parentElement.parentElement;
  const error = parent.querySelector(".error");

  error.innerText = "";

  parent.classList.remove("error");
  parent.classList.remove("success");
  parent.classList.remove("default");
}

// Validation functions
function isValidName(name) {
  const trimmedInput = name.value.trim();
  let message = "";
  let check = 1;

  // longitud
  if (trimmedInput.length < 3 || trimmedInput.length > 80) {
    message = "El nombre debe tener entre 3 y 80 caracteres.";
    check = -1;
  }

  // solo caracteres alfabéticos
  const re = /^[a-zA-Z\s]*$/;
  if (!re.test(trimmedInput)) {
    message = "Solo se debe contener caracteres alfabéticos.";
    check = -1;
  }
  return {valid: check, message: message};
}

function isValidEmail(email) {
  const trimmedInput = email.value.trim();
  if (trimmedInput.lengt <= 30) {
    return false;
  }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.value.trim());
}

function isValidPhone(phone) {
  const trimmedInput = phone.value.trim().replace(/\s/g, "");
  // del espacio en blanco
  console.log(trimmedInput);

  if (trimmedInput.length === 0) {
    return {valid: 0, message: ""};
  }
  const re = /^9\d{8}$/; // se valida el largo y que empiece con 9
  if (!re.test(trimmedInput)) {
    return {valid: -1, message: "Número no valido."};
  }

  return {valid: 1, message: ""};
}
function isValidTypeProduct(category) {
  const trimmedInput = category.value.trim();
  return trimmedInput !== "";
}
function isValidDescription(description) {
  // validar que solo sea texto
  const re = /^[a-zA-Z\s]*$/;
  if (!re.test(description.value.trim())) {
    return false;
  }
  return true;
}
function isValidRegion(region) {
  const trimmedInput = region.value.trim();
  return trimmedInput !== "";
}
function isValidComuna(comuna) {
  const trimmedInput = comuna.value.trim();
  return trimmedInput !== "";
}
function isValidProducto(producto) {
  const selectedOps = producto.selectedOptions;
  //mas de uno
  if (!selectedOps.length){
    return {valid: false, message: "Debe seleccionar al menos un producto."};
  }
  //maximo cinco
  if (selectedOps.length > 5) {
      return {valid: false, message: "Debe como máximo cinco productos."};
    }
  for (let i = 0; i < selectedOps.length; i++) {
    if (selectedOps[i].value === "") {
      return {valid: false, message: "'Por seleccionar' no valido."};
    }
  } 

  return {valid: true, message: ""};
}

function isValidFile(file) {
  var files = file.files;
  if (files.length > 3 || files.length < 1) {
    return {valid: false, message: "Debe subir al menos una imagen y menos de 3."};
  }
  return {valid: true, message: ""};
}

// Form validation. Check all fields
function validateForm() {
  let check = true;
  // give all values of the select element
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const categoryProduct = document.getElementById("categoria-producto");
  const description = document.getElementById("user_description");
  const region = document.getElementById("region");
  const comuna = document.getElementById("comuna");
  const producto = document.getElementById("producto");
  const files = document.getElementById("archivo-producto");

  // username - mandatory
  const validationName = isValidName(username);
  if (validationName.valid === -1) {
    setError(username, validationName.message);
    check = false;
  } else {
    setSuccess(username);
  }

  // email - mandatory
  if (!isValidEmail(email)) {
    setError(email, "Email no válido");
    check = false;
  } else {
    setSuccess(email);
  }

  //phone - optional
  const validationPhone = isValidPhone(phone);
  if (validationPhone.valid === -1) {
    setError(phone, validationPhone.message);
    check = false;
  } else if (validationPhone.valid === 0) {
    setDefault(phone);
  } else {
    setSuccess(phone);
  }

  // fruit_vegetable - mandatory
  if (!isValidTypeProduct(categoryProduct)) {
    setError(categoryProduct, "");
    check = false;
  } else {
    setSuccess(categoryProduct);
  }

  // description - optional
  if (!isValidDescription(description)) {
    setError(description, "Solo se aceptan caracteres alfabéticos.");
    check = false;
  } else {
    setDefault(description);
  }

  // region - mandatory
  if (!isValidRegion(region)) {
    setError(region, "");
    check = false;
  } else {
    setSuccess(region);
  }

  // comuna - mandatory
  if (!isValidComuna(comuna)) {
    setError(comuna, "");
    check = false;
  } else {
    setSuccess(comuna);
  }

  // producto - mandatory
  const selectedProduct = isValidProducto(producto);
  if (selectedProduct.valid === false) {
      setError(producto, selectedProduct.message);
      check = false;
  }else {
    setSuccess(producto);
  }

  // image - optional
  const validationFiles = isValidFile(files);
  if (!validationFiles.valid) {
    setError(files, "");
    check = false;
  } else {
    setSuccess(files);
  }
  // pop-up
  if (check) {
  }
  return check;
}

function submitRegisterDatabase(){
    let forms = document.getElementById("conf-form");
    console.log(forms);
    forms.submit();
    console.log("Se sube la información al servidor!")
}

// popup
const bttn_form = document.getElementById("button-form");
bttn_form.addEventListener("click", function (e) {
  let checkedForm = validateForm();
  if (checkedForm) {
    maskModal = document.querySelector(".mask-modal");
    modal = document.querySelector(".modal");
    openModal(maskModal, modal);

    document.querySelector(".close-modal").addEventListener("click", function () {
      closeModal(maskModal, modal);
    });

    document.querySelector(".check-modal").addEventListener("click", function () {
      closeModal(maskModal, modal);
      success_modal = document.querySelector(".modal-success");
      maskModal = document.querySelector(".mask-modal1");
      openModal(maskModal, success_modal);
      
    });
  }
});

//main
document.addEventListener("DOMContentLoaded", function () {
  const submit_conf_bttn = document.getElementById("submit-conf-btn");
  submit_conf_bttn.addEventListener("click", function () {
    submitRegisterDatabase()});
    
  });

