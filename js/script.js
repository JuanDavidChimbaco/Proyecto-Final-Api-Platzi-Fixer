const producto = [];
function Guardarproductos() {
  fetch('https://api.escuelajs.co/api/v1/products')
    .then((response) => response.json())
    .then(data => {
      data.forEach(function (producto) {
        producto.cantidad = 1
      })
      console.log(data);
      data.forEach(element => { producto.push(element) });
    })
}
// ------------------ Carrusel multiple ---------------
function carrusel() {
  let myCarousel = document.querySelectorAll('#featureContainer .carousel .carousel-item');
  myCarousel.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        // wrap carousel by using first child
        next = myCarousel[0]
      }
      let cloneChild = next.cloneNode(true)
      el.appendChild(cloneChild.children[0])
      next = next.nextElementSibling
    }
  })
}
// ------------------- Obtener las Categorias ---------------
const categorias = []
function categoriaProductos() {
  return new Promise((resolve) => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then((response) => response.json())
      .then(data => {
        data.forEach(element => {
          categorias.push(element);
        })
        resolve("Categorias OK")
      })
  })
}
// ------------------ Mostrar las categorias ---------------
function imprimirCategorias() {
  categoriaProductos()
    .then((response) => {
      let item = ""
      categorias.forEach((element, index) => {
        if (index == 0) {
          item += `<div class="carousel-item active">
                        <div class="col-md-2">
                            <div class="card">
                                <div class="card-img" >
                                    <a onclick="urlLocal('${element.id}'), productosPorCategorias()" >
                                        <img src="${element.image}"
                                            class="img-fluid rounded" style="height:200px;">
                                    </a>
                                </div>
                                <div class="card-img-overlays">
                                    ${element.name}
                                </div>
                            </div>
                        </div>
                    </div>`
        } else {
          item += `<div class="carousel-item">
                        <div class="col-md-2">
                            <div class="card">
                                <div class="card-img">
                                    <a onclick="urlLocal('${element.id}'), productosPorCategorias()" >
                                        <img src="${element.image}"
                                            class="img-fluid rounded" style="height:200px;">
                                    </a>
                                </div>
                                <div class="card-img-overlays">${element.name}</div>
                            </div>
                        </div>
                    </div>`

        }
      })
      document.getElementById("carouselCategorias").innerHTML = item
      carrusel()
    })
    // ------------------ Categorias en menu Desplegable---------
    .then((response) => {
      let item = ""
      categorias.forEach((element) => {
        item += ` <li><button onclick="urlLocal('${element.id}'), productosPorCategorias()"  class="dropdown-item">${element.name}</button></li>`
      });
      document.getElementById("product-category").innerHTML = item
    })
}
//----------------- Guardar en localStorage --------------------
function urlLocal(idCategoria) {
  localStorage.setItem("id", idCategoria);
}
//-----------Funcion para traer los productos por categoria----------
function productosPorCategorias() {
  let idCategoria = localStorage.id
  console.log(idCategoria);
  fetch(`https://api.escuelajs.co/api/v1/categories/${idCategoria}/products`)
    .then((response) => response.json())
    .then(data => {
      let lista = ""
      data.forEach(function (producto) {
        producto.cantidad = 1
      })
      data.forEach(element => {
        lista += `<div class="card mb-3 mx-3" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4 d-flex align-items-center">
                                <a href="#">
                                    <img src="${element.images[0]}" class="img-fluid rounded-start" alt="...">
                                </a>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-center text-info text-uppercase">${element.title}</h5>
                                        <p class="card-text">${element.description}</p>
                                        <div class="row">
                                          <div>
                                          <p class="card-text">$${element.price}</p>
                                          </div>
                                          <div>
                                          <button type="button" onclick="agregarProducto(${element.id})" class="btn btn-dark">Añadir Al carrito</button>  
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
      });
      document.getElementById("product-container").innerHTML = lista
    })
}
//-------------------Funcion Filtrar producto------------------
function filtrarProducto(element) {
  let textoBuscar = document.getElementById("txtBuscar").value
  if (textoBuscar) {
    let nombre = element.title
    textoBuscar = toTitleCase(textoBuscar);
    resultado = nombre.includes(textoBuscar)
    console.log(resultado);
    return resultado
  } else {

  }
}
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
//------------------Funcion para buscar un producto-------------
function buscarProducto() {
  let lista = ``
  const filteredData = producto.filter(filtrarProducto);
  console.log(filteredData);
  filteredData.forEach(element => {
    lista += `<div class="card mb-3 mx-3" style="max-width: 540px;">
      <div class="row g-0">
          <div class="col-md-4 d-flex align-items-center">
          <a href="#">
              <img src="${element.images[0]}" class="img-fluid rounded-start" alt="...">
          </a>
          </div>
          <div class="col-md-8">
              <div class="card-body">
                  <h5 class="card-title text-center text-info text-uppercase">${element.title}</h5>
                  <p class="card-text">${element.description}</p>
                  <div class="row">
                    <div>
                    <p class="card-text">$${element.price}</p>
                    </div>
                    <div>
                    <button class="btn btn-dark" onclick="agregarProducto(${element.id})">Añadir Al carrito</button>  
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`
  });
  document.getElementById("product-container").innerHTML = lista

}
//___________________Guardar en LocalStorage el id del Producto---------------------------
function detalleProdcuto(idPelicula) {
  localStorage.idPelicula = idPelicula
}
// ------------------ Mostrar Todos los productos --------------------
function productos() {
  fetch('https://api.escuelajs.co/api/v1/products')
    .then((response) => response.json())
    .then(data => {
      let lista = ""
      data.forEach(function (producto) {
        producto.cantidad = 1
      })
      console.log(data);
      data.forEach(element => {
        producto.push(element);
        lista += `<div class="card mb-3 mx-3" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4 d-flex align-items-center">
                                <a href="#">
                                    <img src="${element.images[0]}" class="img-fluid rounded-start" alt="...">
                                </a>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-center text-info text-uppercase">${element.title}</h5>
                                        <p class="card-text">${element.description}</p>
                                        <div class="row">
                                          <div>
                                          <p class="card-text">$${element.price}</p>
                                          </div>
                                          <div>
                                          <button class="btn btn-dark" onclick="agregarProducto(${element.id})">Añadir Al carrito</button>
                                          </div>
                                          <p class="card-text">$${element.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
      });
      document.getElementById("product-container").innerHTML = lista
    })
}
// ------------Refrescar la pagina --------------
function reload() {
  let btnReload = document.getElementById('reload')
  btnReload = location.reload()
  return btnReload
}
// ----------------FUNCIONALIDAD DEL CARRITO -----------------------------
// ----------------agregar al carrito----------------------
let carrito = []
const carritoContenedor = document.querySelector('#cart_menu_num')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')

vaciarCarrito.addEventListener('click', () => {
  carrito.length = []
  mostrarCarrito()
})

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito()
})

function agregarProducto(id) {
  const existe = carrito.some(element => element.id === id)
  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item = producto.find((element) => element.id === id)
    carrito.push(item)
  }
  mostrarCarrito()
}
//----------------mostrar el los productos en el carrito ----------
const mostrarCarrito = () => {
  const bodyDropdown = document.querySelector('.dropdown-menu #body-dropdown')
  bodyDropdown.innerHTML = ''
  carrito.forEach((element) => {
    const { id, title, images, price, cantidad } = element
    bodyDropdown.innerHTML += `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${images}" class="img-fluid rounded" alt="..." style="width: 100%; height:100%">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">Precio: $${price}</p>
          <p class="card-text">Cantidad: ${cantidad}</p>
          <button class="btn btn-primary" onclick="eliminarProducto(${id})">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
    `
  })
  if (carrito.length === 0) {
    bodyDropdown.innerHTML = `
      <p class="text-center text-primary">¡Carrito Vacio!</p>
    `
  }
  precioTotal.innerText = carrito.reduce((acumulador, element) => acumulador + element.cantidad * element.price, 0)
  carritoContenedor.textContent = carrito.length
  guardarLocalStorage()
}
//--------------eliminar producto del carrito--------------------------------
function eliminarProducto(id) {
  const eliminarId = id
  carrito = carrito.filter((element) => element.id !== eliminarId)
  mostrarCarrito()
}
//-------guardar los productos del carrito en el localStorage -----------
function guardarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

const dropdownMenu = document.querySelector('.dropdown-menu-end');
dropdownMenu.addEventListener('click', (event) => {
  event.stopPropagation();
});

var myHeaders = new Headers();
myHeaders.append("apikey", "9TTm1RCxV0LGEZ3moosHsesltghXcqtY");

/*var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch(`https://api.apilayer.com/fixer/convert?to=cop&from=usd&amount=2`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log('error', error)
  });*/