(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{93:function(e,t,n){"use strict";function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,i=void 0;try{for(var d,o=e[Symbol.iterator]();!(a=(d=o.next()).done)&&(n.push(d.value),!t||n.length!==t);a=!0);}catch(e){r=!0,i=e}finally{try{a||null==o.return||o.return()}finally{if(r)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function r(e){var t=this;Object.entries(e).forEach((function(e){var n=a(e,2),r=(n[0],n[1]),i=r.get("camera"),d=r.get("fade");null===d.fade&&(d.fade=d.opacity-i.opacity);var o=d.duration-d.elapsed,u=t.delta.update>o?o:t.delta.update,f=(d.elapsed+u)/d.duration,c=d.fade*d.easing(f);i.opacity+=c-d.faded,d.faded=c,d.elapsed+=u,d.elapsed>=d.duration&&"function"==typeof d.ending&&d.ending(r,t.delta.update-u)}))}n.r(t),n.d(t,"fade",(function(){return r}))}}]);
//# sourceMappingURL=11.index.js.map