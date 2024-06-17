function charge_product(key){
  if (key === ""){
    document.getElementById("producto").innerHTML = "";
    var option = document.createElement("option");
    option.text = "Seleccionar";
    option.value = "";
    document.getElementById("producto").add(option);
    return
  }
    else{
      fetch("/fetch_products/" + key, { method: "GET" }) //1
      .then(response => response.json()) //2
      .then(data => { //3
        document.getElementById("producto").innerHTML = "";
        var option = document.createElement("option");
        option.text = "Seleccionar";
        option.value = "";
        document.getElementById("producto").add(option);

        data.forEach(element => {
          var option = document.createElement("option");
          option.value = element;
          option.text = element;
          document.getElementById("producto").add(option);
        })
      })
    }
}

function charge_communes(key) {
  fetch("/fetch_communes/" + key, { method: "GET" })
    .then(response => response.json())
    .then(data => {

      document.getElementById("comuna").innerHTML = "";

      var option = document.createElement("option");
      option.text = "Seleccionar";
      option.value = "";
      document.getElementById("comuna").add(option);

      data.forEach(element => {
        var option = document.createElement("option");
        option.value = element.id;
        option.text = element.name;
        document.getElementById("comuna").add(option);})
    });
}

function current_select_values(e) {
  return Array.apply(null, Array(e.options.length)).map((cur, i, arr) => {
    return (arr[i] = e.options[i].value);
  });
}

//main
const selected_category = document.getElementById("categoria-producto");

selected_category.addEventListener("change", () => {
  charge_product(selected_category.value)
});


const selected_region = document.getElementById("region");
selected_region.addEventListener("change", () => {
  charge_communes(selected_region.value)
});