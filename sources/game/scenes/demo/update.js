import {loadSystems} from "core/loadSystems";

function update() {

    loadSystems.call(this);

    this.$camera.update(this.delta.update);
}

export {update};
