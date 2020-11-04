function get(name) {

    const value = window.localStorage.getItem(name);

    return value ? JSON.parse(value) : value;
}

function remove(name) {

    window.localStorage.removeItem(name);
}

function set(name, value) {

    window.localStorage.setItem(name, JSON.stringify(value));
}

// exports current module as functions
export {get, remove, set};
