function catchError(catchable) {
  return function (...params) {
    try {
      return catchable.call(this, ...params);
    } catch (error) {
      console.error(error);
    }
  };
}

// exports current module as a function
export default catchError;
