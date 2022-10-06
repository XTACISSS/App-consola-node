import { Tarea } from './tarea.js';

/**
 * Asi es como funcionara el modelo de _listado
 * _listado:
 *      { 'uuid-1231234123-423-2: { id:12, desc:asd, date: 2002 }' }
 *      { 'uuid-1231234123-423-2: { id:12, desc:asd, date: 2002 }' }
 *      { 'uuid-1231234123-423-2: { id:12, desc:asd, date: 2002 }' }
 */

//? Creamos una nueva clase para manejar mas de una tarea, en base a la clase Tarea creada antes

class Tareas {
    _listado = {};

    //? Esto es un getter en donde convertiremos _listado en un array
    get listadoArr() {
        //? Aquí creamos el nuevo array
        const listado = [];

        //? Este método de JS sirve para extraer cada una de las llaves que se encuentren dentro de un objeto y retornando un array
        //? Aquí con el forEach estamos barriendo nuestro objeto _listado
        Object.keys(this._listado).forEach((key) => {
            //? Aquí estamos llenando nuestro nuevo array de listado, según los datos pasados en el key
            listado.push(this._listado[key]);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTareas(id = '') {
        if (this._listado[id]) {
            //? Con delete podemos borrar la propiedad de un objeto
            delete this._listado[id];
        }
    }

    cargarTareas(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    //? Los métodos se crean dentro de la clase
    crearTarea(desc = '') {
        //? Aquí creamos una nueva instancia de tarea y le pasamos la descripción como argumento
        const tarea = new Tarea(desc);
        //? Aquí guardamos dentro del objeto una propiedad que sera el id de nuestra tarea y luego lo igualamos a la nueva instancia de tarea que se creó la cual contiene la descripción y la fecha
        this._listado[tarea.id] = tarea;
    }

    listarTarea() {
        console.log();
        //? El segundo argumento del forEach es el indice
        this.listadoArr.forEach((tarea, id) => {
            const idx = `${id + 1}`.magenta;
            const { desc, date } = tarea;
            const estado = date ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarCompletadaPendiente(estadoT) {
        console.log();
        this.listadoArr.forEach((tarea, id) => {
            const idx = `${id + 1}.`.magenta;
            const { desc, date } = tarea;
            const estado = date ? 'Completada'.green : 'Pendiente'.red;

            if (estadoT) {
                if (date) {
                    console.log(`${idx} ${desc} :: ${date.green}`);
                }
            } else {
                if (!date) {
                    console.log(`${idx} ${desc} :: ${estado}`);
                }
            }
        });
    }

    listarPendiente() {
        console.log();
        this.listadoArr.forEach((tarea, id) => {
            const idx = `${id + 1}.`.magenta;
            const { desc, date } = tarea;
            const estado = date ? 'Completada'.green : 'Pendiente'.red;

            if (date === null) {
                console.log(`${idx} ${desc} :: ${'Pendiente'.red}`);
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];

            if (!tarea.date) {
                tarea.date = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                const tareaP = this._listado[tarea.id];

                tareaP.date = null;
            }
        });
    }
}

export { Tareas };