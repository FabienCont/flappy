function Logger(silent) {
  function secureLog(functionName, logElement) {
    try {
      if (!silent) {
        console[functionName](logElement);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function trace(err, logElement) {
    secureLog('trace', logElement);
  }

  function time(logElement) {
    secureLog('time', logElement);
  }

  function timeEnd(logElement) {
    secureLog('timeEnd', logElement);
  }

  function debug(logElement) {
    secureLog('debug', logElement);
  }

  function log(logElement) {
    secureLog('log', logElement);
  }

  function info(logElement) {
    secureLog('info', logElement);
  }

  function warn(logElement) {
    secureLog('warn', logElement);
  }

  function error(logElement) {
    secureLog('error', logElement);
  }

  this.silent = silent;

  this.trace = trace;
  this.time = time;
  this.timeEnd = timeEnd;
  this.debug = debug;
  this.log = log;
  this.info = info;
  this.warn = warn;
  this.error = error;
}

export default Logger;
