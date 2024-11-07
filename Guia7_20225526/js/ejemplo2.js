// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Recorrer el formulario
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNodo = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT
        if (tipoElemento == "text" && tipoNodo == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE PASSWORD
        else if (tipoElemento == "password" && tipoNodo == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE EMAIL
        else if (tipoElemento == "email" && tipoNodo == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO
        else if (tipoElemento == "radio" && tipoNodo == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE CHECKBOX
        else if (tipoElemento == "checkbox" && tipoNodo == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE FILE
        else if (tipoElemento == "file" && tipoNodo == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "date" && tipoNodo == "INPUT") {
            console.log(elemento);
            totDate++;
        }
        // Contabilizando el total de INPUT TYPE - EMAIL
        else if (tipoNodo == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado =`
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>
    `;

    bodyModal.innerHTML = resultado;
    //Funcion que permite mostrar el modal de Bootstrap
    //Esta funcion es definida por Bootstrap
    modal.show();
};

// validando el formulario
const validarFormulario = () => {
    const errores = [];
    const fechaActual = new Date();

    // verificar campos que esten vacios
    Array.from(formulario.elements).forEach((elemento) => {
        if (["text", "password", "email", "date"].includes(elemento.type) && elemento.value.trim() === "") {
            errores.push(`el campo ${elemento.name} no puede quedar vacio, por favor llenelo`);
        }
    });

    // verificar fecha de nacimiento
    const fechaNacimiento = formulario.elements["fechaNacimiento"];
    if (fechaNacimiento && new Date(fechaNacimiento.value) > fechaActual) {
        errores.push("La fecha de naciemiento no es valida");
    }

    // verificar email 
    const email = formulario.elements["email"];
    if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
        errores.push("ese correo electronico no es aceptable");
    }

    // verificqar contraseñas 
    const password = formulario.elements["password"];
    const repetirPassword = formulario.elements["repetirPassword"];
    if (password && repetirPassword && password.value !== repetirPassword.value) {
        errores.push("Las contraseñas no son iguales");
    }

    // verificar interes
    const intereses = formulario.querySelectorAll('input[name="intereses"]:checked');
    if (intereses.length === 0) {
        errores.push("debe seleccionar al menos un interes.");
    }

    // verificar carrera y pais
    if (!formulario.elements["carrera"].value) errores.push("seleccione una carrera por favor");
    if (!formulario.elements["pais"].value) errores.push("seleccione un pais por favor");

    if (errores.length > 0) {
        bodyModal.innerHTML = errores.join("<br>");
        modal.show();
    } else {
        recorrerFormulario();
    }
};

// agregando evento
button.onclick = (event) => {
    event.preventDefault();
    validarFormulario();
};
