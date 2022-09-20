

const view= `
<div class="container  mt-3">
        <h1>Cargar Nuevo Producto</h1>
        
        <form  onsubmit="return enviarProducto(this)" class="row g-3">
            <input id="title" type="text" placeholder="Ingrese titulo" name="title" class="form-control">
            <input id="thumbnail" type="text" placeholder="Ingrese url imagen" name="thumbnail" class="form-control">
            <input id="price" type="number" placeholder="Ingrese precio" name="price" class="form-control">
            <input id="submit" type="submit" value="enviar" class="btn btn-primary mb-3">
        </form>

`
const viewMensajes=`
            <div class="container mb-5" >
            <h2>Nuevo Mensaje</h2>
              <form onsubmit="return enviarMensaje(this)">
                <div class="chat-message clearfix">
                  <div class="input-group mb-0">
                    <div class="input-group-append">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="email..."
                        id="email"
                        required
                      />
                    </div>
                    <div class="input-group-append">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mensaje..."
                        id="mensajeChat"
                        required
                      />
                    </div>
                    <input
                      type="submit"
                      class="form-control"
                      placeholder="Enviar mensaje"
                      id="submit"
                    />
                  </div>
                </div>
              </form>
            </div>

`


const viewProductos= `
<h1>View Productos</h1>
<div class="container mt-3">
{{#if productos}}
<table  class="table table-primary" align="center">
    <thead>
        <tr class="table-dark">
            <th>Producto</th>
            <th>Precio</th>
            <th>Miniatura</th>
        </tr>
    </thead>
    {{#each productos}}
        <tr> 
            <td class="table-info">{{this.title}}</td>
            <td class="table-success"> {{this.price}}</td>
            <td class="table-warning"><img style="height: 30px" class="img-fluid" src="{{this.thumbnail}}" alt="imagen"/></td>
        </tr>
    {{/each}}
</table>
{{else}}
<p>No hay productos cargados</p>

{{/if}}

`
const viewListaMensajes= `
<h1>Historial Mensajes</h1>
<div class="container mt-3">
{{#if mensajes}}
<div>
    {{#each mensajes}}
        <strong style="color:blue">{{this.email}}</strong><span style="color:brown">[{{this.fyh}} ]</span>:<i style="color:green">{{this.mensaje}}</i><br>
        
    {{/each}}
</div>
{{else}}
<p>No hay Mensajes </p>

{{/if}}

`



const viewController= Handlebars.compile(view)
const viewHtml =viewController()
document.getElementById('divCargaProductos').innerHTML = viewHtml


const msgController= Handlebars.compile(viewMensajes)
const msgHtml =msgController()
document.getElementById('divMensaje').innerHTML = msgHtml





///////////////////////////////////////////////////////////////////


const title = document.getElementById('title')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')
const submitProducto = document.getElementById('submitProducto')

const mensajes = document.getElementById('mensajes')
const mensaje = document.getElementById('mensajeChat')
const email = document.getElementById('email')








const enviarProducto= (event)=>{
    socket.emit('new-prod',{title:title.value, price:price.value,thumbnail:thumbnail.value})
    title.value = ''
    price.value = ''
    thumbnail.value = ''
    return false
}

const enviarMensaje= (event)=>{
    const date = new Date();
	const fyh = ` ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}/${date.getHours()}/${date.getMinutes()}/${date.getSeconds()}`

    socket.emit('new-msj',{email:email.value, mensaje:mensaje.value, fyh})
    mensaje.value = ''
    return false
}


const socket = io.connect()

socket.on('productos', (datosEmit)=>{
    const productos= {productos:datosEmit}
    const prodController= Handlebars.compile(viewProductos)
    const prodHtml =prodController(productos)
    document.getElementById('divProductos').innerHTML = prodHtml
})



socket.on('mensajes', (datosEmit)=>{
    const mensajes= {mensajes:datosEmit}
    const msgListController= Handlebars.compile(viewListaMensajes)
    console.log(mensajes)
    const msgListHtml =msgListController(mensajes)
    document.getElementById('divHistorialMensajes').innerHTML = msgListHtml
})



