const API_URL = `http://localhost:3000`;
const table = document.getElementById("table-body");
let labelTitle =  document.getElementById('modalPersonaLabel');
let results ="" 

// //Obteniendo fecha actual
// let date = new Date();
// const formatDate = (date)=>{
// const anio = date.getFullYear()
// let mes = date.getMonth() + 1
// const dia = date.getDate()
// if (mes < 10) {
//   mes = `0${date.getMonth() + 1}`
// }
// let formatted_date = `${anio}-${(mes)}-${dia}`
//  return formatted_date;
// }

// //Obteniendo la edad
// const obtenerEdad = (fNacimiento,fHoy)=>{
//   let fnacimiento = new Date(fNacimiento).getTime();
//   let fhoy    = new Date(fHoy).getTime()
//   let aux = fhoy - fnacimiento
//   let edad = (aux/(1000*60*60*24))/365
//   return edad;
// }


//Modal Persona
const modalPersona = new bootstrap.Modal(document.getElementById('modalPersona'))
const formPersona = document.getElementById('formPersona')
const _name = document.getElementById('_name')
const lastName = document.getElementById('lastName')
const dateOfBirth = document.getElementById('dateOfBirth')
const country = document.getElementById('country')
const occupation = document.getElementById('occupation')
let opcion = ''

//Limpiamos el formulario cuando se va crear un nuevo registro
btnCrear.addEventListener('click',()=>{
  _name.value = ''
  lastName.value = ''
  dateOfBirth.value = ''
  country.value = ''
  occupation.value = ''
  // fechaNacimiento.disabled=false
  modalPersona.show()
  opcion = 'crear'
  labelTitle.innerHTML = "Registrar Persona"
})


//Procedimiento para mostrar empleados
const mostarPersonas = (personas) => {
  personas.forEach(persona => {
    results +=`
    <tr>
    <td style = "display:none">${persona.id}</td>
    <td>${persona.name}</td>
    <td>${persona.lastName}</td>
    <td>${persona.country}</td>
    <td>${persona.occupation}</td>
    <td>${persona.dateOfBirth.substr(0,10)}</td>
    <td>
      <a  class="btnEditar btn btn-warning">Editar</a>           
    </td>
    <td>
      <a  class="btnBorrar btn btn-danger">Eliminar</a>           
    </td>
    </tr>`
   });
   table.innerHTML = results
}

//Hcemos la llamada a la Api y asignamos la funcion mostrarEmpleados para listar todos los empleados en una tabla
fetch(`${API_URL}/persona`)
  .then(response => response.json())
  .then(persona => mostarPersonas(persona))


  const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar persona
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    //console.log(id);
    if (confirm("Eliminar persona?") == true) {

        //Llamada a la api para eliminar empleado
        fetch(`${API_URL}/persona/${id}`, {
            method: 'DELETE',
            })
            .then(res => res.text()) // or res.text()
            .then(() => location.reload())
      } else {
            console.log('Cancelado');
      }
})

//Procedimiento Editar persona
let id = 0
on(document, 'click', '.btnEditar', e => {
    labelTitle.innerHTML = "Actualizar Persona"
    const fila = e.target.parentNode.parentNode
    id = fila.children[0].innerHTML
    console.log(id);
    const nombreTabla = fila.children[1].innerHTML
    const apellidoTabla = fila.children[2].innerHTML
    const paisTabla = fila.children[3].innerHTML
    const ocupacionTabla = fila.children[4].innerHTML
    const fechaNacimientoTabla = fila.children[6].innerHTML


    _name.value = nombreTabla
    lastName.value = apellidoTabla
    country.value = paisTabla
    occupation.value = ocupacionTabla
    dateOfBirth.value = fechaNacimientoTabla
    opcion = 'editar'
    modalPersona.show()

})

//Procedimiento crear y editar empleado
formPersona.addEventListener('submit',(e)=>{
  e.preventDefault()
  if (opcion == 'crear') {
    if (_name.value != '' && lastName.value != '' && country.value != '' && occupation.value != '' && dateOfBirth.value != '') {
      // edad.value = parseInt(obtenerEdad(fechaNacimiento.value, fechaIngreso.value))
      fetch(`${API_URL}/persona`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
           name: _name.value,
           lastName: lastName.value,
           country: country.value,
           occupation: occupation.value,
           dateOfBirth: dateOfBirth.value,
        })
      })
      .then(res => res.json())
      .then(data =>{
         const nuevoPersona = []
         nuevoPersona.push(data)
         mostarPersonas(nuevoPersona)
      })
      modalPersona.hide()
    } else {
      alert('Complete todos los campos')
    }
  } 

  if (opcion == 'editar') {
    fetch(`${API_URL}/persona/${id}`,{
      method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: _name.value,
          lastName: lastName.value,
          country: country.value,
          occupation: occupation.value,
          dateOfBirth: dateOfBirth.value
       })
    })
    .then(res => res.text())
    .then(res => location.reload())
  } 

})