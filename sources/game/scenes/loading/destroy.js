function destroy() {

    console.log('destroy loading scene');
    console.log('-------');

    delete this.state.redirect;
    delete this.$systems;
    delete this.$renderers;
}

export {destroy};
