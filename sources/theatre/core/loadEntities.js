import { Entity } from 'modules/world.js';

const cloneArray = function (a, fn) {
  const keys = Object.keys(a);
  const a2 = new Array(keys.length);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const cur = a[k];
    if (typeof cur !== 'object' || cur === null) {
      a2[k] = cur;
    } else {
      a2[k] = fn(cur);
    }
  }
  return a2;
};

const cloneProto = function (o) {
  if (typeof o !== 'object' || o === null) return o;
  if (Array.isArray(o)) return cloneArray(o, cloneProto);
  const o2 = {};
  for (const k in o) {
    const cur = o[k];
    if (typeof cur !== 'object' || cur === null) {
      o2[k] = cur;
    } else {
      o2[k] = cloneProto(cur);
    }
  }
  return o2;
};

const createNewParamsFromModel = function (paramsModel, params, deep = 0) {
  try {
    const newParams = {};
    const keysParamsModel = Object.keys(paramsModel);
    for (let i = 0; i < keysParamsModel.length; i++) {
      const keyModel = keysParamsModel[i];
      const modelNewParam = paramsModel[keyModel];
      const valueParam = params[keyModel];

      if (valueParam == undefined) {
        if (modelNewParam._default == undefined) {
          throw `error missing parameter :${keyModel}`;
        } else {
          let defaultValue = JSON.parse(JSON.stringify(modelNewParam._default));
          if (modelNewParam._type === 'ref') {
            defaultValue = loadRef.call(this, defaultValue);
          }
          newParams[keyModel] = defaultValue;
        }
      } else if (modelNewParam._type.startsWith('array') && Array.isArray(valueParam)) {
        newParams[keyModel] = [];
        const arraySubType = modelNewParam._type.match('array<(.*)>')[1];
        if (arraySubType === 'array') {
          for (var c = 0; c < valueParam.length; c++) {
            const arrayObject = createNewParamsFromModel.call(this, { array: modelNewParam[`_${arraySubType}`] }, { array: valueParam[c] });
            newParams[keyModel].push(arrayObject.array);
          }
        } else if (arraySubType === 'object') {
          for (var c = 0; c < valueParam.length; c++) {
            newParams[keyModel].push(createNewParamsFromModel.call(this, modelNewParam[`_${arraySubType}`], valueParam[c]));
          }
        } else if (arraySubType === 'string' || arraySubType === 'number' || arraySubType === 'boolean') {
          for (var c = 0; c < valueParam.length; c++) {
            if (arraySubType !== typeof valueParam[c]) {
              throw `wrong subType${arraySubType}in array model for param :${keyModel}`;
            }
            newParams[keyModel].push(valueParam[c]);
          }
        } else {
          throw `missing/wrong subType${arraySubType}in array model for param :${keyModel}`;
        }
      } else if (modelNewParam._type === 'dico' && typeof valueParam === 'object' && !Array.isArray(valueParam)) {
        newParams[keyModel] = {};
        const modelNewParamKeys = Object.keys(valueParam);
        for (var c = 0; c < modelNewParamKeys.length; c++) {
          const modelNewParamKey = modelNewParamKeys[c];
          const valueParamOfKey = valueParam[modelNewParamKey] ? valueParam[modelNewParamKey] : {};
          const newParamObject = createNewParamsFromModel.call(this, { [modelNewParamKey]: modelNewParam._dico }, { [modelNewParamKey]: valueParamOfKey });
          newParams[keyModel][modelNewParamKey] = newParamObject[modelNewParamKey];
        }
      } else if ((modelNewParam._type === 'object' || modelNewParam._type === 'snippet') && typeof valueParam === 'object' && !Array.isArray(valueParam)) {
        newParams[keyModel] = {};
        const modelNewParamKeys = Object.keys(modelNewParam).filter((key) => !key.startsWith('_'));
        for (var c = 0; c < modelNewParamKeys.length; c++) {
          const modelNewParamKey = modelNewParamKeys[c];
          const valueParamOfKey = valueParam[modelNewParamKey] ? valueParam[modelNewParamKey] : {};
          const newParamObject = createNewParamsFromModel.call(this, { [modelNewParamKey]: modelNewParam[modelNewParamKey] }, { [modelNewParamKey]: valueParamOfKey });
          newParams[keyModel][modelNewParamKey] = newParamObject[modelNewParamKey];
        }
      } else if (typeof valueParam.$snippet === 'object' && typeof valueParam === 'object') {
        newParams[keyModel] = this.models.snippets[valueParam.$snippet.scope][valueParam.$snippet.name].call(this);
      } else if (modelNewParam._type === typeof valueParam) {
        newParams[keyModel] = valueParam;
      } else {
        throw `error wrong type parameters for ${keyModel}: waiting ${modelNewParam._type} and get ${typeof valueParam}`;
      }
    }
    return newParams;
  } catch (err) {
    throw err;
  }
};

const mergeDeep = (...objects) => {
  const isObject = (obj) => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
        // prev[key] = pVal;
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
};

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => ({
    ...obj,
    [item[key]]: item,
  }), initialValue);
};

const getEntitiesScene = function getEntitiesScene() {
  try {
    const currentScene = this.models.scenes[this.currentScene];
    if (currentScene && currentScene.entities) {
      return currentScene.entities();
    }
  } catch (err) {
    console.error(`no entities found for this scene :${this.currentScene}`);
  }
};

const getCachedEntity = function (entityRef) {
  const cacheScope = this.cachedEntities[entityRef.scope];
  return cacheScope ? (cacheScope[entityRef.name] ? cloneProto(cacheScope[entityRef.name]) : null) : null;
};

const setCachedEntity = function (entityRef, entityGenerated) {
  if (!this.cachedEntities[entityRef.scope]) {
    this.cachedEntities[entityRef.scope] = {};
  }
  this.cachedEntities[entityRef.scope][entityRef.name] = cloneProto(entityGenerated);
};

const generateEntities = function generateEntities(sceneEntities) {
  try {
    const entities = [];
    sceneEntities.forEach((entityRef) => {
      // let newEntity=getCachedEntity.call(this,entityRef);
      let newEntity = null;
      if (!newEntity) {
        const entityDef = getEntityDefinition.call(this, entityRef);
        const componentsOverride = convertArrayToObject(entityRef.components, 'name');
        const componentsModel = convertArrayToObject(entityDef.components, 'name');
        const newEntityComponents = mergeDeep(componentsModel, componentsOverride);
        newEntity = generateEntityModel.call(this, { name: entityDef.name, components: Object.values(newEntityComponents) });
        newEntity = new Entity(newEntity.name, newEntity.components);
        // setCachedEntity.call(this, entityRef, newEntity);
      }
      entities.push(newEntity);
    });
    return entities;
  } catch (err) {
    console.error(err);
  }
};

const generateEntityModel = function (entityModelOverride) {
  try {
    const loadedEntity = { name: entityModelOverride.name, components: [] };
    entityModelOverride.components.forEach((component) => {
      const newComponent = createComponentFromModel.call(this, component);
      loadedEntity.components.push(newComponent);
    });
    return loadedEntity;
  } catch (err) {
    throw err;
  }
};

const createComponentFromModel = function (componentRef) {
  try {
    const componentModel = getComponentModel.call(this, componentRef);
    const params = componentRef.params ? componentRef.params : {};
    const newComponent = createNewParamsFromModel.call(this, componentModel.params, params);
    newComponent.name = componentModel.name;
    return newComponent;
  } catch (err) {
    throw err;
  }
};

const getEntityDefinition = function (entityRef) {
  try {
    if (typeof entityRef.name !== 'string' || entityRef.name === '' || typeof entityRef.scope !== 'string' || entityRef.scope === '') {
      throw 'no entity name defined';
    }
    return this.models.entities[entityRef.scope][entityRef.name]();
  } catch (err) {
    throw `no entity found with name :${entityRef.name} and scope :${entityRef.scope}`;
  }
};

const getComponentModel = function (componentRef) {
  try {
    if (typeof componentRef.name !== 'string' || componentRef.name === '' || typeof componentRef.scope !== 'string' || componentRef.scope === '') {
      throw 'no component name defined';
    }
    return this.models.components[componentRef.scope][componentRef.name]();
  } catch (err) {
    throw `no component found with name :${componentRef.name} and scope :${componentRef.scope}`;
  }
};

const loadEntities = function () {
  const sceneEntities = getEntitiesScene.call(this);
  return generateEntities.call(this, sceneEntities);
};

export { loadEntities, generateEntities, createComponentFromModel };
