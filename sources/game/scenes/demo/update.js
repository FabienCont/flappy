import {loadSystems} from "core/loadSystems";

function update() {

    loadSystems.call(this,this.$systems);

    this.$camera.update(this.delta.update);
}

export {update};
