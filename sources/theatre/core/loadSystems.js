const loadSystems=function(){
  var sceneSystems=getSystems.call(this);
  sceneSystems.forEach((system) => {
    var updateSystem=getSystem.call(this,system.name,system.scope);
    this.$world.system(system.components, updateSystem);
  });
}

const getSystems=function(){
  try{
    return this.models.scenes[this.currentScene].systems().systems;
  }catch(err){
    console.error("no systems found for this scene :"+this.currentScene)
  }
}
const getSystem=function(systemName,systemScope){
  try{
    if(typeof systemName!=="string"|| systemName===""){
      throw "no system name defined"
    }
    var systemModule=this.models.systems[systemScope][systemName]();
    if(systemModule[systemName]){
      return systemModule[systemName];
    }else throw "system don't export good systemName";
    //return require('components/common/'+componentRef.name+'.json');
  }catch(err){
    throw "no system found with name :"+systemName;
  }
}

export {loadSystems};