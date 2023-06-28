require("colors");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const Tareas = require("./models/tareas");

console.clear();
const main = async () => {
  console.log("Hola mundo !!");
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        // Crear opción
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        const tc = true;
        tareas.listarTareasCompletadas(tc);
        break;
      case "4":
        const tp = true;
        tareas.listarTareasPendientes(tp);
        break;

      case "5":
      const ids = await mostrarListadoChecklist(tareas.listadoArr);
      tareas.toggleCompletadas(ids);
        break;
      case "6": // Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Está seguro");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada correctamente");
          }
        }

        break;
    }
    guardarDB(tareas.listadoArr);

    //console.log({opt})
    await pausa();
  } while (opt !== "0");
};
main();
