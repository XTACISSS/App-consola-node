//? Por lo general siempre van primero las importaciones de 3ros y luego las nuestras
import colors from 'colors';
import {
    inquirerMenu,
    pausa,
    leerInput,
    borrarTarea,
    confirmar,
    mostrarListadoChecklist,
} from './helper/inquirer.js';
import { Tareas } from './models/tareas.js';
import { saveDB, readDB } from './helper/saveArchive.js';

console.clear();

const main = async() => {
    let opt = '';

    //? Aquí hacemos una nueva instancia de las tareas
    const tareas = new Tareas();

    const tareasDB = readDB();

    if (tareasDB) {
        tareas.cargarTareas(tareasDB);
    }

    //? Lo que hace el do while, primero es ejecutar la acción y luego seguir con el loop 'mientras que: la condición se cumpla'
    do {
        //? Esto lo que hace es imprimir el menu
        opt = await inquirerMenu();

        //? Aquí hacemos una evaluación de la opción escogida por el usuario y en base a eso hacemos una u otra cosa
        switch (opt) {
            case '1':
                //? Esto ejecuta la función de leerInput y guarda dentro de desc lo que el usuario escribió (debería ser una descripción de la tarea)
                const desc = await leerInput('Descripción: ');

                //? Aquí invocamos a la función crearTarea y le mandamos como argumento la constante de desc (que es la descripción de la tarea)
                tareas.crearTarea(desc);

                break;

            case '2':
                tareas.listarTarea();

                //? Aquí listamos las tareas con el modelo de _listado
                // console.log(tareas.listadoArr);

                break;

            case '3':
                tareas.listarCompletadaPendiente(true);

                break;
            case '4':
                tareas.listarCompletadaPendiente(false);

                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);

                tareas.toggleCompletadas(ids);

                break;

            case '6':
                const id = await borrarTarea(tareas.listadoArr);

                if (id !== '0') {
                    const confirm = await confirmar('¿Estas seguro?');

                    if (confirm) {
                        tareas.borrarTareas(id);
                        console.log('Tarea eliminada con éxito'.green);
                    }
                }

                break;
        }

        saveDB(tareas.listadoArr);

        await pausa();
    } while (opt !== '0');
};

main();