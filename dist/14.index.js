(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{91:function(t,n,i){"use strict";function e(t,n){this.x=t,this.y=n}function r(t,n,i,e){this.height=e,this.width=i,this.x=t,this.y=n}i.r(n),i.d(n,"hitbox",(function(){return h}));var o={collidePointPoint:function(t,n){if(t.x!==n.x||t.y!==n.y)return!1;return!0},collidePointRectangle:function(t,n){if(t.x<n.x||t.x>n.x+n.width||t.y<n.y||t.y>n.y+n.height)return!1;return!0},collideRectangleRectangle:function(t,n){if(t.x+t.width<n.x||t.x>n.x+n.width||t.y+t.height<n.y||t.y>n.y+n.height)return!1;return!0}};function c(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var i=[],e=!0,r=!1,o=void 0;try{for(var c,h=t[Symbol.iterator]();!(e=(c=h.next()).done)&&(i.push(c.value),!n||i.length!==n);e=!0);}catch(t){r=!0,o=t}finally{try{e||null==h.return||h.return()}finally{if(r)throw o}}return i}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function h(t){var n=this;Object.entries(t).forEach((function(i){var h=c(i,2),u=h[0],a=h[1];if("character"===u){var f=a.get("hitbox"),l=a.get("position"),s=new r(l.x,l.y,f.width,f.height);Object.entries(t).forEach((function(t){var i=c(t,2),h=i[0],a=i[1];if(u!==h){var f=a.get("hitbox"),l=a.get("position"),y=new r(l.x,l.y,f.width,f.height);!0===function(t,n){var i=[],c="collide";return t instanceof e==!0&&(i.push(t),c+="Point"),n instanceof e==!0&&(i.push(n),c+="Point"),-1===i.indexOf(t)&&t instanceof r==!0&&(i.push(t),c+="Rectangle"),-1===i.indexOf(n)&&n instanceof r==!0&&(i.push(n),c+="Rectangle"),o[c].apply(null,i)}(s,y)&&n.load("demo")}}))}})),[].forEach((function(t){t()}))}}}]);
//# sourceMappingURL=14.index.js.map