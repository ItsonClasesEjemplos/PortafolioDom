import { PortafolioService, Proyecto, SuperProyecto } from "./portafolioService.js";

const formulario = document.getElementById('formProyecto');
formulario.addEventListener('submit', createProyecto);

function createProyecto(event)
{
    event.preventDefault();
    
    // Separar tecnologias del miltiline por linea
    // const multiline = multilineInput.split('\n');
}