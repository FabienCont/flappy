import {loadSystems} from "core/loadSystems";

function update() {

    loadSystems.call(this,this.$systems);
    this.$camera.position.x=()=>{return this.$world.entities.character.get('position').x+50};
    this.$camera.update(this.delta.update);
}

export {update};
