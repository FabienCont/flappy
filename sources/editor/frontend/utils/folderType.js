import entityString from 'editor/frontend/utils/template/entity.json.raw!=!raw-loader!editor/frontend/utils/template/entity.json';
import componentJSON from 'editor/frontend/utils/template/component.json';
import snippetString from '!!raw-loader!editor/frontend/utils/template/snippet';
import systemstring from '!!raw-loader!editor/frontend/utils/template/system';

const typeList = {
  images: { isAddable: true, ext: 'png', content: '' },
  sounds: { isAddable: true, ext: 'ogg', content: '' },
  datasets: { isAddable: true, ext: 'json', content: '[]' },
  sprites: { isAddable: false, ext: 'json', content: '' },
  systems: { isAddable: true, ext: 'js', content: systemstring },
  snippets: { isAddable: true, ext: 'js', content: snippetString },
  components: { isAddable: true, ext: 'json', content: componentJSON },
  entities: { isAddable: true, ext: 'json', content: entityString },
  scenes: { isAddable: false, ext: 'json', content: '' },
};

const isAddable = function isAddable(type) {
  if (typeList[type]) {
    return typeList[type].isAddable;
  }
  return false;
};

const getDefaultExt = function getDefaultExt(type) {
  if (typeList[type]) {
    return typeList[type].ext;
  } return 'undefined';
};

const getDefaultContent = function getDefaultContent(type) {
  if (typeList[type]) {
    return typeList[type].content;
  } return '';
};

export { isAddable, getDefaultExt, getDefaultContent };
