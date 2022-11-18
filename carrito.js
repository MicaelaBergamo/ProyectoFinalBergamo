let carroInit = []
let totalCarritoRecuperado = 0

// Funcion que toma los datos guardados del localStorage para crear una tabla en el html y asi mostrarlos en la seccion Carrito
traerCarro = () => {
    setTimeout(()=> {
    class Producto {
        constructor(obj) {
            this.id  = obj.id;
            this.nombre  = obj.nombre;
            this.precio  = parseFloat(obj.precio);
        }
    }
    const recuperados = JSON.parse(localStorage.getItem("miCarro"));
    const listaRecuperada = [];
    for (const producto of recuperados)
    listaRecuperada.push(new Producto(producto));

    let tablaARecuperar = document.getElementById("tabla")

    function renderizarProductos(){
        for(const producto of listaRecuperada){
            tablaARecuperar.innerHTML +=`
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            </tr>
        `;
}
} 
// Para mostrar el valor total a pagar, se redefine el valor de totalCarritoRecuperado al utilizar el metodo reduce en listaRecuperada (que contiene todos los productos agregados al carrito por el usuario) con la propiedad precio
    totalCarritoRecuperado = listaRecuperada.reduce((acumulador,prod) => acumulador+prod.precio,0);
    document.getElementById("total").innerText = "Total a pagar: $"+totalCarritoRecuperado;

renderizarProductos() },500)

} 
traerCarro()

// Funcion que borra la tabla del carrito del html y le reemplaza el texto al "total"
function vaciarCarrito() {
    localStorage.setItem("miCarro", JSON.stringify(carroInit))
    let borrarTabla = document.getElementById("tabla")
    borrarTabla.innerHTML =``
    document.getElementById("total").innerText = "Total a pagar: $0"
}

// Funcion que reemplaza el html de la seccion Carrito por un formulario a completar para finalizar la compra
function irComprar(){
    
    document.getElementById("fondodiv").innerHTML =`
    <div id="form">
    <h1 id="formtitulo">Complete sus datos para finalizar la compra:</h1>
    <div id="formcontenido">
        <div id="camponombre">
            <p> Ingrese su nombre completo: </p>
            <input id="nombre" type="text">
        </div>
        <br>
        <div id="tarjetainformacion">
                    <p>Numero de tarjeta:  - puede contener 15 o 16 digitos -</p>
                <input id="numerotarjeta" type="number" inputmode="numeric" maxlength="16" placeholder="0000-0000-0000-0000">
                
                    <p>Codigo de seguridad:  - puede contener 3 o 4 digitos -</p> 
                
                <input type="number" maxlength="4" placeholder="CVC-CVV" id="codigoseguridad">
                
        </div>
                <br>
                <input type="radio"> Pago en efectivo
                
                <div id="final">
                    <p id="precioFinal"> </p>
                </div>
                <button class="btn btn-light" id="botoncomprar" onclick="completarCompra()">Comprar</button>
                <a href="carrito.html" class="btn btn-danger" id="botoncancelar">Cancelar</a>
    </div>
</div>
    `
    document.getElementById("precioFinal").innerText = "Total a pagar: $"+totalCarritoRecuperado
    }

// Funcion para validar cada campo a completar del formulario
function completarCompra(){
        const expRegNombre="^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$"; // busqué una expresion regular para letras, espacios, apostrofes
        const nombre = document.getElementById("nombre")
        const numeroTarjeta = document.getElementById("numerotarjeta")
        const codigoSeguridad = document.getElementById("codigoseguridad")
    
        Swal.fire({
            title: 'Desea finalizar la transaccion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0D6EFD',
            cancelButtonColor: '#DC3545',
            confirmButtonText: 'Comprar',
            cancelButtonText: 'Cancelar',
            }).then((result) => {
            if (result.isConfirmed) {  // utilizo condicionales para validar cada campo y responder con su correspondiente mensaje en Sweet Alert
                if(nombre.value=="" || nombre.value.match(expRegNombre)==null){ // aplico la expresion regular para que no admita que hayan numeros al definirle respuesta de error en caso de que su valor sea null (es decir que no contenga letras, espacios o apostrofes) - (Tambien incluyo que no quede sin completar en la primera condicion)
                    setTimeout(()=> {  // les di un setTimeout para que el tiempo de respuesta sea mas realista
                        Swal.fire({
                            icon: 'error',
                            title: 'Por favor ingrese su nombre correctamente'
                        })
                        }, 1000)
                }

                else if(numeroTarjeta.value.length == 15 || numeroTarjeta.value.length == 16 && codigoSeguridad.value.length == 3 || codigoSeguridad.value.length == 4){
                setTimeout(()=> {
                Swal.fire(
                'Su compra ha sido finalizada con exito!',)
            }, 500)
            }
                else if(numeroTarjeta.value.length !== 15 || numeroTarjeta.value.length !==16 || codigoSeguridad.value.length !== 3 || codigoSeguridad.value.length !== 4) {
                setTimeout(()=> {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error en su numero de tarjeta/codigo de seguridad',
                        text: 'Por favor asegurese de ingresar la cantidad de caracteres correcta',
                    })
                    }, 1000)
                    }
            }
        })
    }