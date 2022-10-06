import { v4 as uuidV4 } from 'uuid';

//? Esta es la syntaxis de una clase
class Tarea {
    id = '';
    desc = '';
    date = null;

    //? El constructor es lo que se va a ejecutar cuando se cree una nueva instancia de la clase tarea
    constructor(desc) {
        this.id = uuidV4();
        this.desc = desc;
    }
}

export { Tarea };