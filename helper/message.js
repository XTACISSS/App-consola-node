const { read } = require('fs');

require('colors');

const mostrarMenu = () => {
    return new Promise((resolve) => {
        console.clear();
        console.log('========================='.magenta);
        console.log('  Seleccione una opción  '.red);
        console.log('=========================\n'.magenta);

        console.log(`${'1'.magenta}. Crear una tarea`);
        console.log(`${'2'.magenta}. Listar tareas`);
        console.log(`${'3'.magenta}. Listara tareas completadas`);
        console.log(`${'4'.magenta}. Listar tareas pendientes`);
        console.log(`${'5'.magenta}. Completar tareas`);
        console.log(`${'6'.magenta}. Borrar tarea`);
        console.log(`${'0'.magenta}. Salir \n`);

        //? Aquí estamos importando el modulo readline para poder trabajar con stdin o stdout
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        //? Aquí le estamos haciendo una pregunta al usuario con la función question mediante un input y esta ejecuta un callback
        readLine.question('Seleccione una opción: ', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
};

const pause = () => {

    return new Promise((resolve) => {
        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question(`\nPresione ${'ENTER'.magenta} para continuar\n`, (opt) => {
            readLine.close();
            resolve();
        });

    })

};

//? Para poder exportar mas de una función, o lo que sea que queramos exportar se acostumbra a exportar un objeto con todas las funciones dentro
module.exports = { mostrarMenu, pause };