function loadProduct(A, query = false) {
  if (A.value === "") {
    var categories = [];
  } else {
    var categories = current_select_values(A); // ["frutas", "verduras"]
  }
  let changed_A = document.getElementById("categoria-producto");
  if (query) {
    changed_A = A;
  }

  fetch("../../frutas-verduras.json")
    .then(response => response.json())
    .then(data => {
      document.getElementById("producto").innerHTML = "";
      let option = new Option("Por seleccionar", "", true, false);
      document.getElementById("producto").appendChild(option);
      categories.forEach(category => {
        let found = false;
        if (!found && changed_A.value === category) {
          // si la categoria seleccionada es igual a la categoria actual
          found = true;
          data[category].forEach(product => {
            // crea un option por cada producto de la categoria
            var option = document.createElement("option");
            option.value = product;
            option.text = product;
            document.getElementById("producto").appendChild(option);
          });
        }
      });
    });
}

function loadRegion() {
  fetch("../../comunas-ciudades.json")
    .then(response => response.json())
    .then(data => {
      const regiones = data["regiones"];
      const regionSelect = document.getElementById("region");

      regiones.forEach(region => {
        const name = region["region"];
        const option = document.createElement("option");
        option.text = name;
        regionSelect.appendChild(option);
      });
    });
}

function loadComuna(C, query = false) {
  let selectedRegion = document.getElementById("region").value;
  
  fetch("../../comunas-ciudades.json")
    .then(response => response.json())
    .then(data => {

      document.getElementById("comuna").innerHTML = "";
      let option = new Option("Por seleccionar", "", true, true);
      document.getElementById("comuna").appendChild(option);
      
      data["regiones"].forEach(region => {
        if (selectedRegion === region.region) {
          region.comunas.forEach(comuna => {
            const option = document.createElement("option");
            option.value = comuna;
            option.text = comuna;
            document.getElementById("comuna").appendChild(option);
          });
        }
      });
    });
}

function current_select_values(e) {
  return Array.apply(null, Array(e.options.length)).map((cur, i, arr) => {
    return (arr[i] = e.options[i].value);
  });
}

//main
loadRegion();
document.addEventListener("DOMContentLoaded", function () {
  const selected_A = document.getElementById("categoria-producto");
  loadProduct(selected_A, true);
  selected_A.addEventListener("change", () => {
    loadProduct(selected_A);
  });

  const selected_C = document.getElementById("region");
  loadComuna(selected_C, true);
  selected_C.addEventListener("change", () => {
    loadComuna(selected_C);
  });
});
