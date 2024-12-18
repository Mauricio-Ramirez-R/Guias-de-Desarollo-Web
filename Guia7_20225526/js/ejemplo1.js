// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.createElement("button"); // Boton para validar 

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// para validar si los id son unicos, y esto meterlo en los verificadores
const validarID = function (id) {
    return !document.getElementById(id);
};

//AGREGANDO FUNCIONES
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    //validando que se haya seleccionado un elemento
    if(elemento !=""){
        //Metodo perfectamente al modal de boostrap
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

// Funcion para validar que no queden campos vacios
const validarCampos = function () {
    let mensaje = "No hay campos vacios";

    for (const element of newForm.querySelectorAll("input, select, textarea")) {
        if ((element.type === "text" || element.tagName === "TEXTAREA") && element.value.trim() === "") {
            mensaje = `El campo "${element.id}" esta vacio`;
            break;
        } else if ((element.type === "radio" || element.type === "checkbox") && !element.checked) {
            const grupo = newForm.querySelectorAll(`input[name="${element.name}"]`);
            if (!Array.from(grupo).some(input => input.checked)) {
                mensaje = `No se ha seleccionado nada para:"${element.id}"`;
                break;
            }
        } else if (element.tagName === "SELECT" && element.value === "") {
            mensaje = `No se ha seleccionado nada para:"${element.id}"`;
            break;
        }
    }

    alert(mensaje);
};

// Creando el boton para validar
buttonValidar.textContent = "validar campos";
buttonValidar.classList.add("btn", "btn-warning");
buttonValidar.onclick = validarCampos;
newForm.appendChild(buttonValidar);

//verificador de ID
const newSelect = function () {
    const idElemento = `id${nombreElemento.value}`;
    if (!validarID(idElemento)) {
        alert("Ese ID ya existe, por favor ponga otro");
        return;
    }

    //Creando elementos
    let addElemento = document.createElement("select");
    //creando atributos para el nuevo elemento 
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    //creando option para el select
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion${i}`;
        addElemento.appendChild(addOption);
    }

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    //Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

//verificador de ID
const newRadioCheckbox = function (newElemento) {
    const idElemento = `id${nombreElemento.value}`;
    if (!validarID(idElemento)) {
        alert("Ese ID ya existe, por favor ponga otro");
        return;
    }

    // Creando elementos
    let addElemento = document.createElement("input");
    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

//verificador de ID
const newInput = function (newElemento) {
    const idElemento = `id${nombreElemento.value}`;
    if (!validarID(idElemento)) {
        alert("Ese ID ya existe, por favor ponga otro");
        return;
    }

    // Creando elementos de tipo = text, number, date, password,+ color y email
    let addElemento =
      newElemento == "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    //creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    //creando el elemento i como hijo del label, afterbegin le
    // indicamos que se creara antes de su primer hijo
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    // Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";
    // inicializando puntero en el campo del titulo para el control
    tituloElemento.focus();
}
);
