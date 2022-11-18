let carroInit = []

let contenedor = document.getElementById("cartasProductos");
// funcion que toma los datos del archivo json e inserta una carta por cada producto en el html
function mostrarProductos(){
    const stockJson = "./stock.json"
    fetch(stockJson)
        .then(prods => prods.json())
        .then(stockProductos => {
            const STOCK = stockProductos.stock
            setTimeout(()=> {
            STOCK.forEach(producto => {
        contenedor.innerHTML += `
            <div id="carta" class="card col-sm-2">
                <img id="imagencarta" src=${producto.imagen} class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <p class="card-text">- ${producto.tipo} -</p>
                    <button id='btn${producto.id}' class="btn btn-primary">Agregar al carrito</button>
                </div>
            </div>   
        `;
    })
    // funcion que "llama" a los botones de las cartas y les agrega un addEventListener para que ejecuten la funcion agregarAlCarrito al hacerles click
    stockProductos.stock.forEach((producto)=>{ document.getElementById(`btn${producto.id}`).addEventListener("click",function(){agregarAlCarrito(producto)})}) }, 500)
})
}
mostrarProductos();

// funcion que agrega un producto al array inicial (carroInit) y lo guarda en el localStorage
function agregarAlCarrito(productoAComprar){
    carroInit.push(productoAComprar);
    localStorage.setItem("miCarro", JSON.stringify(carroInit))
    setTimeout(()=> {
    Toastify({
        text:"producto agregado!",
        duration: 3000,
        gravity: 'bottom',
        position:'right'
    }).showToast() }, 500)
}