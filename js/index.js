const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <p class="text ${LINE}">${tarea}</p>
                        </li>                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}
// crear un evento para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = ''
        id++
        console.log(LIST)
        }
    }
    
})




let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}