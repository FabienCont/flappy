(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{95:function(e,n,t){"use strict";t.r(n),t.d(n,"forces",(function(){return i}));var r=t(4);function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(e){var n=this;Object.entries(e).forEach((function(e){var t=o(e,2),i=(t[0],t[1]),a=i.get("forces"),s=i.get("position"),d=[];a.parts.forEach((function(e){var t=!1===e.ending,o=e.duration-e.elapsed,a=!1===t&&n.delta>o?o:n.delta,u=(e.elapsed+a)/e.duration,p=e.easing,c=!1!==e.easing?n.models.snippets[p.scope][p.name]():r.d(1),l={x:e.x*c(u),y:e.y*c(u)};if(s.x+=l.x-e.moved.x,s.y+=l.y-e.moved.y,e.moved=l,e.elapsed+=n.delta,!1!==e.handling){var f=e.handling;(0,n.models.snippets[f.scope][f.name])(i,e.moved.x,e.moved.y,e.elapsed,(function(){d.push(e)}))}if(e.elapsed>=e.duration&&!1!==e.ending&&-1===d.indexOf(e)){var v=e.ending;(0,n.models.snippets[v.scope][v.name])(i,e.moved.x,e.moved.y,e.elapsed),d.push(e)}})),a.parts=a.parts.filter((function(e){return-1===d.indexOf(e)}))}))}}}]);
//# sourceMappingURL=12.index.js.map