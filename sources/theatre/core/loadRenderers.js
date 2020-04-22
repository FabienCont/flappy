const loadRenderers=function(){
  var sceneRenderers=getRenderers.call(this);
  sceneRenderers.forEach((renderer) => {
    var rendererSystem=getSystem.call(this,renderer.name,renderer.scope);
    this.$world.system(renderer.components, rendererSystem);
  });
}


const getRenderers=function(){
  try{
    return this.models.scenes[this.currentScene].renderers().renderers;
  }catch(err){
    console.error("no renderers found for this scene :"+this.currentScene)
  }
}
const getSystem=function(systemName,systemScope){
  try{
    if(typeof systemName!=="string"|| systemName===""){
      throw "no system name defined"
    }
    return this.models.systems[systemScope][systemName]()[systemName];
    //return require('components/common/'+componentRef.name+'.json');
  }catch(err){
    throw "no system found with name :"+systemName;
  }
}

export {loadRenderers};
