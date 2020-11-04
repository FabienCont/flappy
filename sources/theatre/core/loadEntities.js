import {Entity} from 'modules/world.js';


const cloneArray = function (a, fn) {
  var keys = Object.keys(a)
  var a2 = new Array(keys.length)
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]
    var cur = a[k]
    if (typeof cur !== 'object' || cur === null) {
      a2[k] = cur
    } else {
      a2[k] = fn(cur)
    }
  }
  return a2
};

const cloneProto=function (o) {
  if (typeof o !== 'object' || o === null) return o;
  if (Array.isArray(o)) return cloneArray(o, cloneProto)
  var o2 = {}
  for (var k in o) {
    var cur = o[k]
    if (typeof cur !== 'object' || cur === null) {
      o2[k] = cur
    } else {
      o2[k] = cloneProto(cur)
    }
  }
  return o2
}

const loadRef=function(value){
  try{
    var ref="";
    value.split(".").forEach((path,i) => {
      if(i==0){
        ref=this[path]
      }else{
        ref=ref[path];
      }
    });
    return ref
  }catch(err){
    throw err;
  }
}

const createNewParamsFromModel=function(paramsModel,params,deep=0){
  try{
    var newParams={};
    var keysParamsModel=Object.keys(paramsModel);
    for (var i = 0; i < keysParamsModel.length; i++) {
      var keyModel=keysParamsModel[i];
      var modelNewParam=paramsModel[keyModel];
      var valueParam=params[keyModel];

      if(valueParam==undefined){
        if(modelNewParam._default==undefined){
          throw "error missing parameter :"+keyModel;
        }else{
          var defaultValue=JSON.parse(JSON.stringify(modelNewParam._default));
          if(modelNewParam._type==="ref"){
            defaultValue=loadRef.call(this,defaultValue);
          }
          newParams[keyModel]=defaultValue;
        }
      }else {
        if(modelNewParam._type.startsWith("array") && Array.isArray(valueParam)){
          newParams[keyModel]=[]
          var arraySubType=modelNewParam._type.match("array<(.*)>")[1];
          if(arraySubType==="array"){
              for (var c = 0; c < valueParam.length; c++) {
                var arrayObject=createNewParamsFromModel.call(this,{array:modelNewParam["_"+arraySubType]},{array:valueParam[c]});
                newParams[keyModel].push(arrayObject["array"]);
              }
          }else if(arraySubType==="object"){
            for (var c = 0; c < valueParam.length; c++) {
              newParams[keyModel].push(createNewParamsFromModel.call(this,modelNewParam["_"+arraySubType],valueParam[c]));
            }
          }else if(arraySubType==="string"||arraySubType==="number"||arraySubType==="boolean"){
            for (var c = 0; c < valueParam.length; c++) {
              if(arraySubType!=typeof valueParam[c]){
                throw "wrong subType"+arraySubType+"in array model for param :"+keyModel;
              }
              newParams[keyModel].push(valueParam[c]);
            }
          }else {
            throw "missing/wrong subType"+arraySubType+"in array model for param :"+keyModel;
          }
        }else if(modelNewParam._type==="object" && typeof valueParam ==="object" && !Array.isArray(valueParam)){
          newParams[keyModel]={}
          var modelNewParamKeys= Object.keys(modelNewParam).filter(key=>!key.startsWith('_'));
          for (var c = 0; c < modelNewParamKeys.length; c++) {
            var modelNewParamKey=modelNewParamKeys[c]
            var valueParamOfKey=valueParam[modelNewParamKey]?valueParam[modelNewParamKey]:{};
            var newParamObject=createNewParamsFromModel.call(this,{[modelNewParamKey]:modelNewParam[modelNewParamKey]},{[modelNewParamKey]:valueParamOfKey});
            newParams[keyModel][modelNewParamKey]=newParamObject[modelNewParamKey];
          }
        }else if(modelNewParam._type===typeof valueParam){
          newParams[keyModel]=valueParam;
        }else if(modelNewParam._type==="ref" && typeof valueParam ==="string" ){
          newParams[keyModel]=loadRef.call(this,valueParam);
        }else{
          throw "error wrong type parameters for "+keyModel+": waiting "+modelNewParam._type+" and get "+typeof valueParam;
        }
      }
    }
    return newParams;
  }catch(err){
    throw err;
  }
};

const mergeDeep=(...objects)=> {
  const isObject = obj => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
        //prev[key] = pVal;
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      }
      else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}


const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const getEntitiesScene=function(){
  try{
    let currentScene=this.models.scenes[this.currentScene];
    if(currentScene && currentScene.entities){
      return currentScene.entities();
    }
  }catch(err){
    console.error("no entities found for this scene :"+this.currentScene)
  }
}

const getCachedEntity=function(entityRef){
  let cacheScope=this.cachedEntities[entityRef.scope];
  return cacheScope?(cacheScope[entityRef.name]?cloneProto(cacheScope[entityRef.name]):null):null;
}

const setCachedEntity=function(entityRef,entityGenerated){
  if(!this.cachedEntities[entityRef.scope]){
      this.cachedEntities[entityRef.scope]={};
    }
    this.cachedEntities[entityRef.scope][entityRef.name]=cloneProto(entityGenerated);
}

const generateEntities=function(sceneEntities){
  try{
    var entities=[];
    sceneEntities.forEach((entityRef) => {
      //let newEntity=getCachedEntity.call(this,entityRef);
      let newEntity=null;
      if(!newEntity){
        var entityDef=getEntityDefinition.call(this,entityRef);
        var componentsOverride=convertArrayToObject(entityRef.components,'name');
        var componentsModel=convertArrayToObject(entityDef.components,'name');
        var newEntityComponents=mergeDeep(componentsModel,componentsOverride);
        newEntity=generateEntityModel.call(this,{name:entityDef.name,components:Object.values(newEntityComponents)});
        newEntity=new Entity(newEntity.name,newEntity.components);
        setCachedEntity.call(this,entityRef,newEntity);
      }
      entities.push(newEntity);
    });
    return entities;
  }catch(err){
    console.error(err);
  }
}


const generateEntityModel=function(entityModelOverride){
  try{
    var loadedEntity={name:entityModelOverride.name,components:[]};
    entityModelOverride.components.forEach((component) => {
      var newComponent=createComponentFromModel.call(this,component);
      loadedEntity.components.push(newComponent);
    });
    return loadedEntity;
  }catch(err){
    throw err;
  }
}

const createComponentFromModel=function(componentRef){
  try{
    var componentModel=getComponentModel.call(this,componentRef);
    var params=componentRef.params?componentRef.params:{};
    var newComponent=createNewParamsFromModel.call(this,componentModel.params,params);
    newComponent.name=componentModel.name;
    return newComponent;
  }catch(err){
    throw err;
  }
}

const getEntityDefinition=function(entityRef){
  try{
    if(typeof entityRef.name!=="string"|| entityRef.name===""||typeof entityRef.scope!=="string" ||entityRef.scope==="" ){
      throw "no entity name defined"
    }
    return this.models.entities[entityRef.scope][entityRef.name]();
  }catch(err){
    throw "no entity found with name :"+entityRef.name+" and scope :"+entityRef.scope;
  }
}

const getComponentModel=function(componentRef){
  try{
    if(typeof componentRef.name!=="string"|| componentRef.name===""||typeof componentRef.scope!=="string" ||componentRef.scope===""){
      throw "no component name defined"
    }
    return this.models.components[componentRef.scope][componentRef.name]();
  }catch(err){
    throw "no component found with name :"+componentRef.name+" and scope :"+componentRef.scope;
  }
}

const loadEntities=function(){
  var sceneEntities=getEntitiesScene.call(this);
  return generateEntities.call(this,sceneEntities);
}

export {loadEntities,generateEntities,createComponentFromModel};
