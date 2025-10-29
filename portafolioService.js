export class Proyecto {
    id;
    constructor(nombre, tecnologias, descripcion, coolaboradores, repositorio){
        this.nombre = nombre;
        this.tecnologias = tecnologias;
        this.descripcion = descripcion;
        this.coolaboradores = coolaboradores;
        this.repositorio = repositorio;
    }
}

export class SuperProyecto{
    constructor(fechaImplementacion, linkDespliegue, contactoCliente, esquemas){
        this.fechaImplementacion = fechaImplementacion;
        this.linkDespliegue = linkDespliegue;
        this.contactoCliente = contactoCliente;
        this.esquemas = esquemas;
    }
}

export class PortafolioService {
    proyectos = [];

    getProyectos(){
        return this.proyectos;
    }

    guardarProyecto(proyecto){
        proyecto.id = this.proyectos.length > 0 ? this.proyectos[this.proyectos.length-1]?.id + 1 : 1;
        this.proyectos.push(proyecto);
    }

    eliminarProyecto(proyectoId){
        var index = this.proyectos.findIndex(p => p.id == proyectoId);
        this.proyectos.splice(index, 1);
    }

    actualizarProyecto(proyectoId, proyecto){
        var index = this.proyectos.findIndex(p => p.id == proyectoId);
        proyecto.id = proyectoId;
        this.proyectos[index] = proyecto;

    }

    superActualizarProyecto(proyectoId, superProyecto){
         var index = this.proyectos.findIndex(p => p.id == proyectoId);
         this.proyectos[index] = {...this.proyectos[index], ...superProyecto}
    }

}