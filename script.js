import { PortafolioService, Proyecto, SuperProyecto } from "./portafolioService.js";

const formulario = document.getElementById('formProyecto');
formulario.addEventListener('submit', createProyecto);

const servicio = new PortafolioService();
let updateMode = false;
let updatingProyect = 0;

function refresh(){
    const container = document.getElementById("projects__container");
    container.innerHTML = ``;
    const projects = servicio.getProyectos();
    projects.forEach(e => {
        const projectId = `${e.id}`;
        const proyectoElemento = document.createElement("div")
        proyectoElemento.classList.add("project")
        proyectoElemento.id = projectId;
        const titleProject = document.createElement("h3")
        titleProject.innerText = `${e.nombre}`;
        proyectoElemento.appendChild(titleProject);

        const description = document.createElement("p")
        description.innerHTML = `${e.descripcion}`
        proyectoElemento.appendChild(description)

        // Agregando nodos de Tecnologias
        const tecnologies = document.createElement("p")
        const tecnologiesStrong = document.createElement("strong")
        tecnologiesStrong.innerText = "Tecnologias";
        tecnologies.appendChild(tecnologiesStrong)
        proyectoElemento.appendChild(tecnologies);

        const tecSection = document.createElement("div")
        tecSection.classList.add("projects__section")
        proyectoElemento.appendChild(tecSection);

        const tecList = document.createElement("ul");
        e.tecnologias.forEach( t => {
            const tecItem = document.createElement("li")
            tecItem.innerText = `${t}`
            tecList.appendChild(tecItem);
        })
        tecSection.appendChild(tecList);

        // Agregando nodos de Coolaboradores
        const coolaborators = document.createElement("p")
        const coolaboratorsStrong = document.createElement("strong")
        coolaboratorsStrong.innerText = "Coolaboradores";
        coolaborators.appendChild(coolaboratorsStrong)
        proyectoElemento.appendChild(coolaborators);

        const colSection = document.createElement("div")
        colSection.classList.add("projects__section")
        proyectoElemento.appendChild(colSection);

        const colList = document.createElement("ul");
        e.coolaboradores.forEach( c => {
            const colItem = document.createElement("li")
            colItem.innerText = `${c}`
            colList.appendChild(colItem);
        })
        colSection.appendChild(colList);

        //Agregando nodo de repositorio
        const repo = document.createElement("div");
        const textRepo = document.createElement("p");
        textRepo.innerHTML= `Puedes encontrar el repositorio en <a href="${e.repositorio}">${e.repositorio}</a>`
        repo.appendChild(textRepo);
        proyectoElemento.appendChild(repo)

        //Adding delete button
        const deleteButton = document.createElement("button");
        deleteButton.id = `btn-delete-${projectId}`
        deleteButton.className = "btn";
        deleteButton.textContent = "Eliminar"
        deleteButton.addEventListener("click", ()=>{
            servicio.eliminarProyecto(projectId);
            refresh();
        })
        proyectoElemento.appendChild(deleteButton);

        //add update button
        const updateButton = document.createElement("button");
        updateButton.id = `btn-update-${projectId}`
        updateButton.className = "btn";
        updateButton.textContent = "Actualizar"
        updateButton.addEventListener("click", ()=>{
            updateMode = true;
            updatingProyect = projectId
            const nameProject = document.getElementById("name");
            nameProject.value = e.nombre
            const descriptionProject = document.getElementById("description");
            descriptionProject.value = e.nombre
            const repositoryProject = document.getElementById("repository");
            repositoryProject.value = e.nombre
            const tecsProject = document.getElementById("tecnologies");
            tecsProject.value = e.tecnologias.join("\n")
            const colsProject = document.getElementById("contributors");
            colsProject.value = e.coolaboradores.join("\n")
            turnOnUpdatingMode()
        })
        proyectoElemento.appendChild(updateButton);

        container.appendChild(proyectoElemento);
    });
}

function turnOnUpdatingMode(){
    const formButtons = document.getElementById("form-buttons");
    const title = document.getElementById("form-title");
    title.textContent = "Editar proyecto"
    const cancelButton = document.createElement("button");
    cancelButton.id = "btn-cancel"
    cancelButton.textContent = "Cancelar";
    formButtons.appendChild(cancelButton);
    cancelButton.addEventListener("click", (event)=>{
        event.preventDefault();
        turnOffUpdatingMode()
    })
}

function turnOffUpdatingMode(){
    updateMode = false;
    updatingProyect = 0;
    const title = document.getElementById("form-title");
    title.textContent = "Agregar proyecto";
    const cancelButton = document.getElementById("btn-cancel");
    cancelButton.remove();
    document.getElementById("formProyecto").reset()
}

function createProyecto(event)
{
    event.preventDefault();

    //Obtengo tecnologias y las separo en un array 
    var tecs = event.target['tecnologies'].value.split('\n')
    //Obtengo coolaboradores y los separo en un array 
    var coolaborators = event.target['contributors'].value.split('\n')
    //Creo proyecto extrayendo los valores faltantes directo de target
    const newProyecto = new Proyecto(
        event.target['name'].value, 
        tecs, 
        event.target['description'].value,
        coolaborators,
        event.target['repository'].value
    )

    if(updateMode){
        servicio.actualizarProyecto(updatingProyect, newProyecto);
        turnOffUpdatingMode();
    }else{
        servicio.guardarProyecto(newProyecto);
    }
    
    
    refresh();

    const formulario = document.getElementById("formProyecto");
    formulario.reset();
}

