import { PortafolioService, Proyecto, SuperProyecto } from "./portafolioService.js";

const formulario = document.getElementById('formProyecto');
formulario.addEventListener('submit', createProyecto);

const servicio = new PortafolioService();

function refresh(){
    const container = document.getElementById("projects__container");
    container.innerHTML = ``;
    const projects = servicio.getProyectos();
    projects.forEach(e => {
        const proyectoElemento = document.createElement("div")
        proyectoElemento.classList.add("project")
        proyectoElemento.id = `${e.id}-project`
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

        container.appendChild(proyectoElemento);
    });

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
    
    servicio.guardarProyecto(newProyecto);
    
    refresh();

    const formulario = document.getElementById("formProyecto");
    formulario.reset();
    // Separar tecnologias del miltiline por linea
    // const multiline = multilineInput.split('\n');
}