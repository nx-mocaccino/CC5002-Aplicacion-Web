var context = document.body.getAttribute("data-context");

// variable local
let number_page = 0;
let number_page_prev = 0;
let actual_data = [];

function changeVisibility(e){
  e.classList.remove("container-hidden");
  e.classList.add("container-visible");
}

// this function display data in rows
function clickRows(rows) {
  const informationProduct = document.getElementById('information-content');
  rows.forEach(row => {
    row.addEventListener("click", () => {
      id = parseInt(row.children[0].textContent.trim());
      actual_data.some(values =>{
        if (values.id === id){    
          informationProduct.querySelector('#nombre_productor').innerHTML = `<strong>${"Tipo de Producto"}:</strong> ${values.nombre_productor}`;
          informationProduct.querySelector('#region').innerHTML = `<strong>${"Región"}:</strong> ${values.region}`;
          informationProduct.querySelector('#comuna').innerHTML = `<strong>${"Comuna"}:</strong> ${values.comuna}`;
          informationProduct.querySelector('#tipo').innerHTML = `<strong>${"Tipo"}:</strong> ${values.tipo}`;
          informationProduct.querySelector('#producto').innerHTML = `<strong>${"Producto"}:</strong> ${values.fruta_verdura[0]}`;
          informationProduct.querySelector('#email').innerHTML = `<strong>${"Correo Electrónico"}:</strong> ${values.email_productor}`;
          informationProduct.querySelector('#celular').innerHTML = `<strong>${"Celular Producto"}:</strong> ${values.celular_productor}`;
          informationProduct.querySelector('#descripcion').innerHTML = `<strong>${"Descripción"}:</strong> ${values.descripcion ? values.descripcion : 'Sin descripción'}`;
          informationProduct.querySelector('#foto640x480').src = values.foto[0].normal;
          document.getElementById('large-image').src = values.foto[0].large;
          changeVisibility(informationProduct);
          return true;
        }
        return false;
      })
    });
  });
}

// this function display data in rows
function clickRowsPedido(rows) {
  const informationProduct = document.getElementById('information-content');
  rows.forEach(row => {
    row.addEventListener("click", () => {
      id = parseInt(row.children[0].textContent.trim());
      actual_data.some(values =>{
        if (values.id === id){    
          informationProduct.querySelector('#nombre_comprador').innerHTML = `<strong>${"Tipo de Producto"}:</strong> ${values.nombre_comprador}`;
          informationProduct.querySelector('#region').innerHTML = `<strong>${"Región"}:</strong> ${values.region}`;
          informationProduct.querySelector('#comuna').innerHTML = `<strong>${"Comuna"}:</strong> ${values.comuna}`;
          informationProduct.querySelector('#tipo').innerHTML = `<strong>${"Tipo"}:</strong> ${values.tipo}`;
          informationProduct.querySelector('#producto').innerHTML = `<strong>${"Producto"}:</strong> ${values.fruta_verdura[0]}`;
          informationProduct.querySelector('#email').innerHTML = `<strong>${"Correo Electrónico"}:</strong> ${values.email_comprador}`;
          informationProduct.querySelector('#celular').innerHTML = `<strong>${"Celular Producto"}:</strong> ${values.celular_comprador}`;
          informationProduct.querySelector('#descripcion').innerHTML = `<strong>${"Descripción"}:</strong> ${values.descripcion ? values.descripcion : 'Sin descripción'}`;
          changeVisibility(informationProduct);
          return true;
        }
        return false;
      })
    });
  });
}

function populateTable(number_page1) {
  fetch(`/get_information_table_product/${number_page1}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
        if (data.length){
          let data_table = document.querySelector("#table-content tbody");
          data_table.innerHTML = "";
          data.forEach(nrow => {
            // actualizar informacion de la tabla
            actual_data = data
            register = document.createElement("tr");
            register.innerHTML = `
              <td>${nrow.id}</td>
              <td>${nrow.fruta_verdura[0]}</td>
              <td>${nrow.tipo}</td>
              <td>${nrow.region}</td>
              <td>${nrow.comuna}</td>
              <td><img src="${nrow.foto[0].minimal}" alt="foto_producto"></td>
            `;
            data_table.appendChild(register);
         });
        }else{
          number_page = number_page_prev;  
        }
        console.log(number_page, number_page_prev);
        const row_clicked = document.querySelectorAll("tbody tr");
        clickRows(row_clicked); 
    })
    .catch(error => {
      console.error('[x] Error fetching product table data:', error);
    });
}

function populateTablePedido(number_page1) {
  fetch(`/get_information_table_pedido/${number_page1}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
        if (data.length){
          let data_table = document.querySelector("#table-content tbody");
          data_table.innerHTML = "";
          data.forEach(nrow => {
            // actualizar informacion de la tabla
            actual_data = data
            register = document.createElement("tr");
            register.innerHTML = `
              <td>${nrow.id}</td>
              <td>${nrow.fruta_verdura[0]}</td>
              <td>${nrow.tipo}</td>
              <td>${nrow.region}</td>
              <td>${nrow.comuna}</td>
              <td>${nrow.nombre_comprador}</td>
            `;
            data_table.appendChild(register);
         });
        }else{
          number_page = number_page_prev;  
        }
        console.log(number_page, number_page_prev);
        const row_clicked = document.querySelectorAll("tbody tr");
        clickRowsPedido(row_clicked); 
    })
    .catch(error => {
      console.error('[x] Error fetching product table data:', error);
    });
}

function refreshTable(direction, num, context){
  number_page_prev = number_page;
  number_page = direction === "back" ? Math.max(0, number_page - num) : number_page + num;
  if (context == "ver-producto"){
    populateTable(number_page);
  }else{
    populateTablePedido(number_page);
  
  }
}

const selected_= document.getElementById("btn-next");
selected_.addEventListener("click", () => {
  refreshTable("next", 5, context);
});

const selected_back = document.getElementById("btn-back");
selected_back.addEventListener("click", () => {
  refreshTable("back", 5, context);
});

if (context === "ver-producto"){
  populateTable(number_page);
}else{
  populateTablePedido(number_page);
}

console.log(context)
if (context === "ver-producto"){
  // this function display the image in a modal
  const image640x480 = document.querySelector("#foto640x480");
  image640x480.addEventListener("click", () => {
    const mask_modal = document.querySelector("#mask-modal_large-image");
    const modal = document.querySelector("#modal_large-image");
    const button_close = document.querySelector(".close-modal");
    openModal(mask_modal, modal);

    button_close.addEventListener("click", () => {
      closeModal(mask_modal, modal);
    });
  });
}

