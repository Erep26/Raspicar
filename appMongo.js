var literal = {
    "es": {
        "strWelcome": "Bienvenido a la pagina de RaspiCar",
        "controlWeb": "Control Web",
        "fileGest": "Gestor de archivos",
        "conf": "Configuracion",
        "files": "Archivos",
        "jsText": [
            "Se han guardado los cambios realizados",
            "Escriva el nuevo nombre para ",
            "Error: no se puede renombrar a un nobre vacio",
            "Escriva el nombre para el nuevo archivo",
            "Error: no se puede crear un archivo con nobre vacio",
            "Escriva el nombre para el nuevo directorio",
            "Error: no se puede crear un directorio con nombre vacio",
            "Elemento borrado con exito",
            "Error: el archivo no es codificable en formato de texto",
            "Ya existe un directorio con este nombre",
            "Ya existe un archivo con este nombre"
        ]
    },
    "cat": {
        "strWelcome": "Benvingut a la pagina de RaspiCar",
        "controlWeb": "Control Web",
        "fileGest": "Gestor d'arxius",
        "conf": "Configuració",
        "files": "Arxius",
        "jsText": [
            "S'han guardat els canvis realitçats",
            "Escriu el nou nom per ",
            "Error: no es pot renombrar a un nom buit",
            "Escriu el nou nom per el nou arxiu",
            "Error: no es pot crear un arxiu amb nom buit",
            "Escriu el nom per el nou directori",
            "Error: no es pot crear un directori amb nom buit",
            "Element borrat amb exit",
            "Error: l'arxiu no es codificable en format de text",
            "Ja existeix un directori amb aquest nom",
            "Ja existeix un arxiu amb aquest nom"
        ]
    },
    "en": {
        "strWelcome": "Welcome to the RaspiCar page",
        "controlWeb": "Web Control",
        "fileGest": "File manager",
        "conf": "Settings",
        "files": "Files",
        "jsText": [
            "The changes are saved",
            "Write the new name for ",
            "Error: you can not rename with empty name",
            "Write the name for the new file",
            "Error: you can not create file with empty name",
            "Write the name for the new directory",
            "Error: you can not create a directory with empty name",
            "Item successfully deleted",
            "Error: the file is not codified in text format",
            "There is already a directory with this name",
            "There is already a file with this name"
        ]
    }
};
var idiom = {
    "lan": [
        {
            "id": "es",
            "str": "Español"
        },
        {
            "id": "cat",
            "str": "Catala"
        },
        {
            "id": "en",
            "str": "English"
        }
    ],
    "select": "en"
};

function exitNode(){
	console.log("Base de datos generada");
	process.exit(code=0)
}

function createLiteral(callback){
	mongo.literal.remove(function(){
		mongo.literal.save(literal, {w: 1}, function(){
			console.log("Coleccion 'literal' generada");
			callback();
		});
	});
}

function createIdiom(callback){
	mongo.idiom.remove(function(){
		mongo.idiom.save(idiom, {w: 1}, function(){
			console.log("Coleccion 'idiom' generada");
			callback();
		});
	});
}

function createDB(callback){
	createLiteral(function(){
		createIdiom(function(){
			callback();
		});
	});
}

var mongo = require('./mongo');
createDB(function(){exitNode()});