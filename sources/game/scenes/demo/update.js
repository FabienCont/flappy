import {loadSystems} from "core/loadSystems";

function update() {

    // console.log('update demo scene');

    //this.$world.system(['inputs'], inputs);
    //this.$world.system(['commands'], commands);
    //this.$world.system(['position', 'forces'], forces);

    loadSystems.call(this);
    this.$camera.update(this.delta.update);
}

export {update};
/*
{
  systems:[
    {
      name:inputs,
      components:['inputs']
    }
  ]
}*/
