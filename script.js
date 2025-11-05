import { PortafolioService, Proyecto, SuperProyecto } from "./portafolioService.js";

const formulario = document.getElementById("formProyecto");
const container = document.getElementById("projects__container");
const formButtons = document.getElementById("form-buttons");
const formTitle = document.getElementById("form-title");

const servicio = new PortafolioService();

let updateMode = false;
let updatingProyectId = null;

//Main
formulario.addEventListener("submit", handleSubmit);
refresh();


//Vistas
function refresh() {
  container.innerHTML = "";
  servicio.getProyectos().forEach(renderProyecto);
}

function renderProyecto(proyecto) {
  const { id, nombre, descripcion, tecnologias, coolaboradores, repositorio } = proyecto;
  const projectId = `${id}`;

  const proyectoElemento = createElement("div", ["project"], { id: projectId });
  proyectoElemento.append(
    createElement("h3", [], {}, nombre),
    createElement("p", [], {}, descripcion),
    createListSection("Tecnologías", tecnologias),
    createListSection("Colaboradores", coolaboradores),
    createRepositorySection(repositorio),
    createButton("Eliminar", () => handleDelete(projectId)),
    createButton("Actualizar", () => handleUpdate(proyecto))
  );

  container.appendChild(proyectoElemento);
}

function createListSection(title, items) {
  const section = createElement("div", ["projects__section"]);
  const titleElem = createElement("p", [], {}, `<strong>${title}</strong>`);
  const list = createElement("ul");
  items.forEach((item) => list.appendChild(createElement("li", [], {}, item)));
  section.append(titleElem, list);
  return section;
}

function createRepositorySection(repoUrl) {
  const repoDiv = createElement("div");
  const text = `Puedes encontrar el repositorio en <a href="${repoUrl}" target="_blank">${repoUrl}</a>`;
  repoDiv.appendChild(createElement("p", [], {}, text));
  return repoDiv;
}

function createButton(label, handler) {
  const button = createElement("button", ["btn"], {}, label);
  button.addEventListener("click", handler);
  return button;
}

function createElement(tag, classes = [], attrs = {}, html = "") {
  const el = document.createElement(tag);
  if (classes.length) el.classList.add(...classes);
  Object.entries(attrs).forEach(([k, v]) => (el[k] = v));
  if (html) el.innerHTML = html;
  return el;
}

//Form

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const tecs = form.tecnologies.value.split("\n").filter(Boolean);
  const cols = form.contributors.value.split("\n").filter(Boolean);

  const proyecto = new Proyecto(
    form.name.value,
    tecs,
    form.description.value,
    cols,
    form.repository.value
  );

  if (updateMode) {
    servicio.actualizarProyecto(updatingProyectId, proyecto);
    turnOffUpdatingMode();
  } else {
    servicio.guardarProyecto(proyecto);
  }

  form.reset();
  refresh();
}

function handleDelete(id) {
  servicio.eliminarProyecto(id);
  refresh();
}

function handleUpdate(proyecto) {
  const { id, nombre, descripcion, tecnologias, coolaboradores, repositorio } = proyecto;

  updateMode = true;
  updatingProyectId = id;

  formulario.name.value = nombre;
  formulario.description.value = descripcion;
  formulario.repository.value = repositorio;
  formulario.tecnologies.value = tecnologias.join("\n");
  formulario.contributors.value = coolaboradores.join("\n");

  turnOnUpdatingMode();
}

function turnOnUpdatingMode() {
  formTitle.textContent = "Editar proyecto";

  if (!document.getElementById("btn-cancel")) {
    const cancelBtn = createButton("Cancelar", cancelUpdate);
    cancelBtn.id = "btn-cancel";
    formButtons.appendChild(cancelBtn);
  }
}

function turnOffUpdatingMode() {
  updateMode = false;
  updatingProyectId = null;
  formTitle.textContent = "Agregar proyecto";

  const cancelBtn = document.getElementById("btn-cancel");
  if (cancelBtn) cancelBtn.remove();

  formulario.reset();
}

function cancelUpdate(event) {
  event.preventDefault();
  turnOffUpdatingMode();
}