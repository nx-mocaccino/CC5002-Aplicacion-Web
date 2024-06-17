function openModal(x, y) {
  x.classList.add("active");
  y.classList.add("modal-active");
}

function closeModal(x, y) {
  x.classList.remove("active");
  y.classList.remove("modal-active");
}

function DisplaySuccess(mask, modal) {
  openModal(mask, modal);
}

function openConfirmationModal(maskModal, modal, namevalue) {
  let checkedForm = validateForm(namevalue); // validate client-side
  console.log(checkedForm)
  if (checkedForm) {
    console.log("   [+] Frond: Formulario validado correctamente.");
    openModal(maskModal, modal);
    return true;
  }
  return false;
}

function submitProduct(maskModal, modal) {
  console.log("[+] Frond: Enviando formulario al backend.");

  let productoForm = document.getElementById("conf-form");
  let formData = new FormData(productoForm);
  let url = "/agregar_producto";
  fetch(url, {
    method: productoForm.method,
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throwError(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      closeModal(maskModal, modal);
      if (data.status === "success") {
        success_modal = document.querySelector(".modal-success");
        openModal(maskModal, success_modal);
        console.log("   [+] Back: Producto agregado con éxito al backend.");
      } else {
        error_message = document.querySelector(".error-message");
        error_message.innerHTML = data.message;
        console.log("   [-] Back: Error al agregar producto al backend.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function submitPedido(maskModal, modal) {
  let productoForm = document.getElementById("conf-form");
  let formData = new FormData(productoForm);
  let url = "/agregar_pedido";
  fetch(url, {
    method: productoForm.method,
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throwError(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      closeModal(maskModal, modal);
      if (data.status === "success") {
        success_modal = document.querySelector(".modal-success");
        openModal(maskModal, success_modal);
        console.log("   [+] Back: Producto agregado con éxito al backend.");
      } else {
        error_message = document.querySelector(".error-message");
        error_message.innerHTML = data.message;
        console.log("   [-] Back: Error al agregar producto al backend.");
      }
    })
    .catch((error) => {
      console.error("Error2:", error);
    });
}

//main
const maskModal = document.querySelector(".mask-modal");
const modal = document.querySelector(".modal");

// document.getElementById("roll").addEventListener("click", function () {
//   const modal = document.querySelector(".modal-roll");
//   console.log(modal);
//   openModal(maskModal, modal);
// });
