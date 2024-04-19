localStorage.setItem("clickedImage", "false");

function openModal(x, y) {
  x.classList.add("active");
  y.classList.add("modal-active");
}

function closeModal(x, y) {
  x.classList.remove("active");
  y.classList.remove("modal-active");
}

function DisplayImage() {
  var clickedImage = localStorage.getItem("clickedImage");

  if (clickedImage === "true") {
    const maskModal = document.querySelector(".mask-modal");
    const modal = document.querySelector(".modal");
    openModal(maskModal, modal);
    localStorage.setItem("clickedImage", "false");
  }
}

//agregar producto
function DisplaySuccess(mask, modal){
  openModal(mask, modal);
}

//main
document.addEventListener("DOMContentLoaded", function () {
  if (document.location.pathname === "/app/html/ver-productos.html") {

    const maskModal = document.querySelector(".mask-modal");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".close-modal");
    window.addEventListener(
      "storage",
      function () {
        DisplayImage();
      },
      false
    );
    closeButton.addEventListener("click", function () {
      closeModal(maskModal, modal);
    });
  }
  if (document.location.pathname === "/app/html/index.html"){
    console.log("hola")
    const maskModal = document.querySelector(".mask-modal");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".close-modal");

    document.querySelector("#roll").addEventListener("click", function () {
      DisplaySuccess(maskModal, modal);
    });
    closeButton.addEventListener("click", function () {
      closeModal(maskModal, modal);
    });
  }
});
