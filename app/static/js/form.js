var context = document.body.getAttribute("data-context");

if (context === "agregar-producto") {
  document.getElementById("button-form-product").addEventListener("click", () => {
    if (openConfirmationModal(maskModal, modal, context)) {
      document.getElementById("submit-conf-bttn").addEventListener("click", () => submitProduct(maskModal, modal));
    }
  });
  document.getElementById("not-submit-conf-bttn").addEventListener("click", () => closeModal(maskModal, modal));
}

if (context === "agregar-pedido") {
  document.getElementById("button-form-pedido").addEventListener("click", () => {
    if (openConfirmationModal(maskModal, modal, context)) {
      document.getElementById("submit-conf-bttn").addEventListener("click", () => submitPedido(maskModal, modal));
    }
  });
  document.getElementById("not-submit-conf-bttn").addEventListener("click", () => closeModal(maskModal, modal));
}