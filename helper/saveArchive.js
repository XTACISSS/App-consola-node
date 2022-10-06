import fs from 'fs';

const archivo = './db/data.json';

//? Esta función guardara la data en un archivo .json
const saveDB = (data) => {
    //? Usamos la librería fs para usar su función writeFileSync para guardar el archivo de con extension .json y lo parseamos a string
    fs.writeFileSync(archivo, JSON.stringify(data));
};

//? Con esta función leeremos los datos de nuestro archivo
const readDB = () => {
    //? Aquí hacemos la evaluación si existe o no el archivo .json, preguntando si es diferente a la función, por lo cual la condición se cumpliría en caso de que no exista el archivo.
    if (!fs.existsSync(archivo)) {
        return null;
    }

    //? Esta constante contiene el archivo leído
    const info = fs.readFileSync(archivo, 'utf8');
    const data = JSON.parse(info);

    return data;
};

export { saveDB, readDB };