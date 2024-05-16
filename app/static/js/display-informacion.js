// main
const precio_ls = ["$1000", "$2000", "$3000", "$4000", "$5000"];
const maduracion_ls = ["lista para consumir", "madura", "verde"];

function DisplayProduct(val) {
  let [td_tipo, td_producto, td_region, td_comuna, td_foto] = val;
 
  let objectElement = document.createElement("object");
  objectElement.setAttribute("type", "text/html");
  objectElement.setAttribute("data", "..static/html/informacion-pedido.html");
  console.log(document.location.pathname);
  if (document.location.pathname === "/app/static/html/ver-productos.html") {
    objectElement.setAttribute("data", "../static/html/informacion-producto.html");
  }

  info_div.innerHTML = "";
  objectElement.onload = function () {
    
    const content = objectElement.contentDocument;
    const tipo = content.getElementById("tipo");
    const producto = content.getElementById("producto");
    const region = content.getElementById("region");
    const comuna = content.getElementById("comuna");
    const prodimage = content.getElementById("prodimage");
    const maduracion = content.getElementById("maduracion");
    const precio = content.getElementById("precio");
    
    //split la ruta por "/"
    let split = td_foto.split("/");
    split.splice(2, 1, "normal-images");
    td_foto_normal = split.join("/");
    split.splice(2, 1, "large-images");
    td_foto_large = split.join("/");

    if (document.location.pathname === "/app/html/ver-productos.html") {
      const large_image = document.querySelector("#popup-image");
      large_image.src = td_foto_large;
    }
    

    tipo.innerHTML += td_tipo;
    producto.innerHTML += td_producto;
    region.innerHTML += td_region;
    comuna.innerHTML += td_comuna;
    prodimage.src = td_foto_normal;
    maduracion.innerHTML += maduracion_ls[Math.floor(Math.random() * maduracion_ls.length)];
    precio.innerHTML += precio_ls[Math.floor(Math.random() * precio_ls.length)];
  };
  info_div.appendChild(objectElement);

  objectElement.classList.add("flexible-content");
}

function charge_table(number, sumval){
  number = parseInt(number) + sumval
  if (number <= 0) {
    number = 0
  }
  console.log(number)
  window.location.href = `/ver_producto/${number}`;
}


const selected_= document.getElementById("btn-next");
selected_.addEventListener("click", () => {
  // obtner el url
  const url = document.location.pathname;
  let number = url.split("/")[2];
  charge_table(number, 5);
});

const selected_back = document.getElementById("btn-back");
selected_back.addEventListener("click", () => {
  // obtner el url
  const url = document.location.pathname;
  let number = url.split("/")[2];
  charge_table(number, -5);
});