const colors = require('colors');
const Tarea = require("./tarea");


class Tareas{
    _listado ={ };

    get listadoArr(){
        const listado =[];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }
    constructor(){
        this._listado ={};
    }

    borrarTarea( id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas =[]){
        tareas.forEach(tarea =>{
        this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }
    listadoCompleto(){
         let estadoC ='';
        this.listadoArr.forEach((objeto, indice)=>{
            const indiceactual = indice+1;
            if(objeto.completadoEn == null){
                estadoC=`${colors.red("Pendiente")}`; 
            }else{
                estadoC=`${colors.green("Completado")}`;
            }
            console.log( `${colors.green(indiceactual)}${'.'.green} ${objeto.desc}::${estadoC}`);
        })
    }

    listarTareasCompletadas(completadas = true){
        let estadoC ='';
        let indice =0;
        this.listadoArr.forEach((objeto)=>{
            if(objeto.completadoEn != null){
            indice+=1;
            estadoC=`${colors.green("Completado")}`;
            console.log( `${colors.green(indice)}${'.'.green} ${objeto.desc}::${objeto.completadoEn.green}`);
            } 
        })    
    }

 listarTareasPendientes(pendiente = true){
        let estadoC ='';
        let indice = 0;
        this.listadoArr.forEach((objeto)=>{
            if(objeto.completadoEn == null){
            indice +=1;
            estadoC=`${colors.red("Pendiente")}`;
            console.log(`${colors.green(indice)}${'.'.green} ${objeto.desc}::${estadoC}`);
            } 
        })    
    }

    toggleCompletadas(ids =[]){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString(); 

            }
        } ) 

        this.listadoArr.forEach(tarea =>{
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;

            }
        })

    }


    

   



}



module.exports = Tareas; 