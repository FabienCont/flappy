!function(t){function e(e){for(var n,r,s=e[0],o=e[1],a=0,u=[];a<s.length;a++)r=s[a],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&u.push(i[r][0]),i[r]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);for(c&&c(e);u.length;)u.shift()()}var n={},i={0:0};function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.e=function(t){var e=[],n=i[t];if(0!==n)if(n)e.push(n[2]);else{var s=new Promise((function(e,r){n=i[t]=[e,r]}));e.push(n[2]=s);var o,a=document.createElement("script");a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.src=function(t){return r.p+""+t+".index.js"}(t);var c=new Error;o=function(e){a.onerror=a.onload=null,clearTimeout(u);var n=i[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+r+": "+s+")",c.name="ChunkLoadError",c.type=r,c.request=s,n[1](c)}i[t]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:a})}),12e4);a.onerror=a.onload=o,document.head.appendChild(a)}return Promise.all(e)},r.m=t,r.c=n,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r.oe=function(t){throw console.error(t),t};var s=window.webpackJsonp=window.webpackJsonp||[],o=s.push.bind(s);s.push=e,s=s.slice();for(var a=0;a<s.length;a++)e(s[a]);var c=o;r(r.s=25)}([function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return r}));var i=function(t){var e=this;t&&t.forEach((function(t){var n=s.call(e,t.name,t.scope);e.$world.system(t.components,n)}))},r=function(){try{var t=this.models.scenes[this.currentScene];return void 0!==t&&null!=t.renderers&&t.renderers()?t.renderers():[]}catch(t){console.error("no renderers found for this scene :"+this.currentScene)}},s=function(t,e){try{if("string"!=typeof t||""===t)throw"no system name defined";return this.models.systems[e][t]()[t]}catch(e){throw"no system found with name :"+t}}},function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return r}));var i=function(t){var e=this;t.forEach((function(t){var n=s.call(e,t.name,t.scope);e.$world.system(t.components,n)}))},r=function(){try{var t=this.models.scenes[this.currentScene];return void 0!==t&&null!=t.systems&&t.systems()?t.systems():[]}catch(t){console.error("no systems found for this scene :"+this.currentScene)}},s=function(t,e){try{if("string"!=typeof t||""===t)throw"no system name defined";var n=this.models.systems[e][t]();if(n[t])return n[t];throw"system don't export good systemName"}catch(e){throw"no system found with name :"+t}}},function(t,e,n){"use strict";n.d(e,"c",(function(){return v})),n.d(e,"b",(function(){return d})),n.d(e,"a",(function(){return p}));var i=n(3);function r(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var a=function t(e){if("object"!==o(e)||null===e)return e;if(Array.isArray(e))return function(t,e){for(var n=Object.keys(t),i=new Array(n.length),r=0;r<n.length;r++){var s=n[r],a=t[s];"object"!==o(a)||null===a?i[s]=a:i[s]=e(a)}return i}(e,t);var n={};for(var i in e){var r=e[i];"object"!==o(r)||null===r?n[i]=r:n[i]=t(r)}return n},c=function(t){var e=this;try{var n="";return t.split(".").forEach((function(t,i){n=0==i?e[t]:n[t]})),n}catch(t){throw t}},u=function t(e,n){arguments.length>2&&void 0!==arguments[2]&&arguments[2];try{for(var i={},r=Object.keys(e),a=0;a<r.length;a++){var u=r[a],h=e[u],f=n[u];if(null==f){if(null==h._default)throw"error missing parameter :"+u;var l=JSON.parse(JSON.stringify(h._default));"ref"===h._type&&(l=c.call(this,l)),i[u]=l}else if(h._type.startsWith("array")&&Array.isArray(f)){i[u]=[];var d=h._type.match("array<(.*)>")[1];if("array"===d)for(var m=0;m<f.length;m++){var p=t.call(this,{array:h["_"+d]},{array:f[m]});i[u].push(p.array)}else if("object"===d)for(m=0;m<f.length;m++)i[u].push(t.call(this,h["_"+d],f[m]));else{if("string"!==d&&"number"!==d&&"boolean"!==d)throw"missing/wrong subType"+d+"in array model for param :"+u;for(m=0;m<f.length;m++){if(d!=o(f[m]))throw"wrong subType"+d+"in array model for param :"+u;i[u].push(f[m])}}}else if("object"!==h._type||"object"!==o(f)||Array.isArray(f))if(h._type===o(f))i[u]=f;else{if("ref"!==h._type||"string"!=typeof f)throw"error wrong type parameters for "+u+": waiting "+h._type+" and get "+o(f);i[u]=c.call(this,f)}else{i[u]={};var y=Object.keys(h).filter((function(t){return!t.startsWith("_")}));for(m=0;m<y.length;m++){var g=y[m],v=f[g]?f[g]:{},x=t.call(this,s({},g,h[g]),s({},g,v));i[u][g]=x[g]}}}return i}catch(t){throw t}},h=function(t,e){return t.reduce((function(t,n){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),i.forEach((function(e){s(t,e,n[e])}))}return t}({},t,s({},n[e],n))}),{})},f=function(){try{var t=this.models.scenes[this.currentScene];if(t&&t.entities)return t.entities()}catch(t){console.error("no entities found for this scene :"+this.currentScene)}},l=function(t,e){this.cachedEntities[t.scope]||(this.cachedEntities[t.scope]={}),this.cachedEntities[t.scope][t.name]=a(e)},d=function(t){var e=this;try{var n=[];return t.forEach((function(t){var s=null;if(!s){var a=y.call(e,t),c=h(t.components,"name"),u=function t(){for(var e=function(t){return t&&"object"===o(t)},n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return i.reduce((function(n,i){return Object.keys(i).forEach((function(s){var o=n[s],a=i[s];Array.isArray(o)&&Array.isArray(a)?n[s]=o.concat.apply(o,r(a)):e(o)&&e(a)?n[s]=t(o,a):n[s]=a})),n}),{})}(h(a.components,"name"),c);s=m.call(e,{name:a.name,components:Object.values(u)}),s=new i.a(s.name,s.components),l.call(e,t,s)}n.push(s)})),n}catch(t){console.error(t)}},m=function(t){var e=this;try{var n={name:t.name,components:[]};return t.components.forEach((function(t){var i=p.call(e,t);n.components.push(i)})),n}catch(t){throw t}},p=function(t){try{var e=g.call(this,t),n=t.params?t.params:{},i=u.call(this,e.params,n);return i.name=e.name,i}catch(t){throw t}},y=function(t){try{if("string"!=typeof t.name||""===t.name||"string"!=typeof t.scope||""===t.scope)throw"no entity name defined";return this.models.entities[t.scope][t.name]()}catch(e){throw"no entity found with name :"+t.name+" and scope :"+t.scope}},g=function(t){try{if("string"!=typeof t.name||""===t.name||"string"!=typeof t.scope||""===t.scope)throw"no component name defined";return this.models.components[t.scope][t.name]()}catch(e){throw"no component found with name :"+t.name+" and scope :"+t.scope}},v=function(){var t=f.call(this);return d.call(this,t)}},function(t,e,n){"use strict";function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,r=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(i=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,s=t}finally{try{i||null==a.return||a.return()}finally{if(r)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function r(t,e){this.components={},this.name=t,this.add=function(t){var e=this;!1===Array.isArray(t)&&(t=[t]),t.forEach((function(t){e.components[t.name]=t}))},this.get=function(t){return this.components[t]},this.has=function(t){!1===Array.isArray(t)&&(t=[t]);for(var e=0,n=t.length;e<n;e+=1){var i=t[e],r=i.replace("not:",""),s=i!==r;if(this.components.hasOwnProperty(r)===s)return!1}return!0},this.remove=function(t){!1===Array.isArray(t)&&(t=[t]);for(var e=0,n=t.length;e<n;e+=1){var i=t[e];!0===this.components.hasOwnProperty(i)&&delete this.components[i]}},this.add(e)}function s(t){this.entities={},this.add=function(t){var e=this;!1===Array.isArray(t)&&(t=[t]),t.forEach((function(t){e.entities[t.name]=t}))},this.get=function(t){return this.entities[t]},this.remove=function(t){!1===Array.isArray(t)&&(t=[t]);for(var e=0,n=t.length;e<n;e+=1){var i=t[e],r=i.name||i;!0===this.entities.hasOwnProperty(r)&&delete this.entities[r]}},this.system=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.entities,s={};Object.entries(r).forEach((function(t){var n=i(t,2),r=n[0],o=n[1];!0===o.has(e)&&(s[r]=o)})),n.call(t,s)}}n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return r}))},function(t,e,n){"use strict";function i(t){return function(e){return Math.pow(e,t)}}function r(t){return function(e){return 1-i(t)(1-e)}}function s(t){return function(e){return e*t}}function o(t){return i(2)(t)}function a(t){return r(2)(t)}function c(t){return function(e){return t(1-e)}}n.d(e,"b",(function(){return r})),n.d(e,"d",(function(){return s})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"e",(function(){return c}))},function(t,e,n){"use strict";n.r(e),n.d(e,"generateDecor",(function(){return s}));var i=n(2);function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,r=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(i=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,s=t}finally{try{i||null==a.return||a.return()}finally{if(r)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(t){var e=this,n=this.$world.entities.character.get("position").x,s=n+128,o=n-32,a=["top","bottom","background","water","pipeTop","pipeBottom","cloud"];this.$infos.started&&a.push("checkpoint");for(var c={},u=0;u<a.length;u++){var h=a[u];c[h]={model:this.models.entities.demo[h],width:64,maxPosition:o,maxId:0,entities:[]}}if(c.cloud.width=160,Object.entries(t).filter((function(t){var n=r(t,2),i=n[0],s=n[1],a=i.match(/^([a-zA-Z]+)/)[1],u=s.get("position").x+c[a].width<o;if(u)e.$world.remove(s);else{var h=i.match(/^[a-zA-Z]+([0-9]+)/)[1];c[a].entities.push(s),c[a].maxPosition<s.get("position").x+c[a].width&&(c[a].maxPosition=s.get("position").x+c[a].width,c[a].maxId=parseInt(h)+1)}return!u})),this.$infos.started&&0===c.checkpoint.entities.length){var f=c.pipeTop.maxPosition;c.checkpoint.maxPosition=f}Object.entries(c).forEach((function(t){for(var n=r(t,2),o=(n[0],n[1]);s>o.maxPosition;){i.b.call(e,[o.model()]).map((function(t){t.name=t.name+o.maxId,t.get("position").x=o.maxPosition,e.$world.add(t)})),o.maxPosition=o.maxPosition+o.width,o.maxId=o.maxId+1}}))}},function(t,e,n){"use strict";function i(t,e){this.x=t,this.y=e}function r(t,e,n,i){this.height=i,this.width=n,this.x=t,this.y=e}n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return r}))},function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}},function(t,e,n){"use strict";function i(){this.$controllers.inputs.length=0}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";function i(){}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";function i(){console.log("destroy demo scene"),console.log("-------"),this.$controllers.destroy(),delete this.$camera,delete this.$controllers,delete this.$origins,delete this.$world.entities,delete this.$world,delete this.$systems,delete this.$renderers}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n(0);n(12);function r(){this.context.fillStyle="#000000",this.context.fillRect(0,0,this.size.width,this.size.height),i.b.call(this,this.$renderers),this.$camera.render(),this.$cameraInfo.render()}},function(t,e,n){"use strict";n.r(e),n.d(e,"showHitbox",(function(){return s}));var i=n(6);function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,r=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(i=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,s=t}finally{try{i||null==a.return||a.return()}finally{if(r)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(t){var e=this;Object.entries(t).forEach((function(t){var n=r(t,2),s=(n[0],n[1]),o=s.get("camera"),a=s.get("hitbox"),c=s.get("origin"),u=s.get("position"),h=o.camera,f=(c.reference,new i.b(h.screen.x()+(u.x+a.x)*h.screen.scale()-(h.position.x()*h.screen.scale()-h.screen.width()/2+h.shaking.shift.x*h.screen.scale()),h.screen.y()+(u.y+a.y)*h.screen.scale()-(h.position.y()*h.screen.scale()-h.screen.height()/2+h.shaking.shift.y*h.screen.scale()),a.width*h.screen.scale(),a.height*h.screen.scale()));e.context.save(),e.context.lineWidth=2,e.context.strokeStyle="#639bff",e.context.strokeRect(f.x+1,f.y+1,f.width-2,f.height-2),e.context.restore()}))}},function(t,e,n){"use strict";function i(){console.log("resize demo scene")}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";function i(){console.log("setup demo scene")}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n(1);function r(){i.b.call(this,this.$systems),this.$camera.update(this.delta.update)}},function(t,e,n){"use strict";function i(){}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";function i(){}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";function i(){console.log("destroy loading scene"),console.log("-------"),delete this.state.redirect,delete this.$systems,delete this.$renderers}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n(0);function r(){i.b.call(this,this.$renderers),this.context.fillStyle="#181a1f",this.context.fillRect(0,0,this.size.width,this.size.height),this.context.font="16px Courier New",this.context.textAlign="start",this.context.textBaseline="top",this.context.fillStyle="#6b717d",this.context.fillText("/ Theatre",8,8),this.context.fillStyle="#d7dae0",this.context.fillText("$ preloading assets...",8,32),!1===this.preloading&&(this.context.fillText("$ preloading completed",8,56),this.context.fillText("$ loading demo scene...",8,80))}},function(t,e,n){"use strict";function i(){console.log("resize loading scene")}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var i=n(0),r=n(1);function s(){console.log("setup loading scene"),this.$renderers=i.a.call(this),this.$systems=r.a.call(this)}},function(t,e,n){"use strict";function i(){console.log("start loading scene"),this.state.redirect=!1}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";function i(){var t=this;!1===this.preloading&&!1===this.state.redirect&&(setTimeout((function(){t.load("demo")}),100),this.state.redirect=!0)}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return m}));var i=n(2),r=n(4);function s(t,e,n){var i=[];this.name=e,this.position={x:function(){return 0},y:function(){return 0}},this.screen={x:n.x,y:n.y,width:n.width,height:n.height,scale:n.scale},this.shaking={current:!1,duration:0,easing:null,elapsed:0,force:{x:0,y:0},shift:{x:0,y:0}},this.add=function(t){for(var e=0,n=i.length-1;n>=0;n-=1){var r=i[n];if(t.destination.z>r.destination.z||t.destination.z===r.destination.z&&t.destination.y>=r.destination.y){e=n+1;break}}i.splice(e,0,t)},this.idle=function(){this.shaking={current:!1,duration:0,easing:null,elapsed:0,force:{x:0,y:0},shift:{x:0,y:0}}},this.look=function(t,e){this.position.x=t,this.position.y=e},this.render=function(){var e=this;i.forEach((function(n){var i=n.destination,r=n.frame,s=n.opacity,o=n.source,a=e.visible(i.x*e.screen.scale(),i.y*e.screen.scale(),i.width*e.screen.scale(),i.height*e.screen.scale());if(s>0&&!0===a){var c=t.globalAlpha;t.globalAlpha=s;var u={destination:{x:e.screen.x()+i.x*e.screen.scale()-(e.position.x()*e.screen.scale()-e.screen.width()/2+e.shaking.shift.x*e.screen.scale()),y:e.screen.y()+i.y*e.screen.scale()-(e.position.y()*e.screen.scale()-e.screen.height()/2+e.shaking.shift.y*e.screen.scale()),width:i.width*e.screen.scale(),height:i.height*e.screen.scale()}},h={top:Math.min(0,u.destination.y-e.screen.y()),right:Math.max(0,u.destination.x+u.destination.width-(e.screen.x()+e.screen.width())),bottom:Math.max(0,u.destination.y+u.destination.height-(e.screen.y()+e.screen.height())),left:Math.min(0,u.destination.x-e.screen.x())};t.drawImage(o,r.x-h.left*(r.width/u.destination.width),r.y-h.top*(r.height/u.destination.height),r.width-h.right*(r.width/u.destination.width)-Math.abs(h.left*(r.width/u.destination.width)),r.height-h.bottom*(r.height/u.destination.height)-Math.abs(h.top*(r.height/u.destination.height)),u.destination.x-h.left,u.destination.y-h.top,u.destination.width-h.right-Math.abs(h.left),u.destination.height-h.bottom-Math.abs(h.top)),t.globalAlpha=c}})),i=[]},this.shake=function(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:r.e(r.b(2));this.idle(),this.shaking.force={x:t,y:e},this.shaking.current=!0,this.shaking.duration=n,this.shaking.easing=i},this.update=function(t){if(!1!==this.shaking.current)if(this.shaking.elapsed+t>=this.shaking.duration)this.idle();else{this.shaking.elapsed+=t;var e=this.shaking.easing(this.shaking.elapsed/this.shaking.duration),n=2*Math.random()*Math.PI;this.shaking.shift.x=Math.round(Math.cos(n)*this.shaking.force.x*e),this.shaking.shift.y=Math.round(Math.sin(n)*this.shaking.force.y*e)}},this.visible=function(t,e,n,i){var r=this.position.x()*this.screen.scale()-this.screen.width()/2+this.shaking.shift.x*this.screen.scale(),s=this.position.y()*this.screen.scale()-this.screen.height()/2+this.shaking.shift.y*this.screen.scale(),o=this.screen.width(),a=this.screen.height();return!(t+n<=r||t>=r+o||e+i<=s||e>=s+a)}}var o=[];function a(t,e,n){var i={};function r(){for(var t in i)i.hasOwnProperty(t)&&!0===i[t]&&(i[t]=!1,n.push({type:"KEYBOARD",action:t,state:"UP"}))}function s(t){var r="KEY_"+o[t.keyCode];-1!==e.indexOf(r)&&!1===i[r]&&(t.preventDefault(),i[r]=!0,n.push({type:"KEYBOARD",action:r,state:"DOWN"}))}function a(t){var r="KEY_"+o[t.keyCode];-1!==e.indexOf(r)&&!0===i[r]&&(t.preventDefault(),i[r]=!1,n.push({type:"KEYBOARD",action:r,state:"UP"}))}function c(){t.addEventListener("blur",r),t.addEventListener("keydown",s),t.addEventListener("keyup",a)}e.forEach((function(t){i[t]=!1})),c.call(this),this.destroy=function(){t.removeEventListener("blur",r),t.removeEventListener("keydown",s),t.removeEventListener("keyup",a)},this.setup=c}function c(t,e,n){function i(t){-1!==e.indexOf("CLICK_RIGHT")&&t.preventDefault()}function r(t){var i=t.button,r=["LEFT","MIDDLE","RIGHT"];if(void 0!==r[i]){var s="CLICK_"+r[i];if(-1!==e.indexOf(s)){t.preventDefault();var o=t.target.getBoundingClientRect(),a=t.clientX-o.left,c=t.clientY-o.top;n.push({type:"MOUSE",action:s,state:"DOWN",x:a,y:c})}}}function s(t){if(-1!==e.indexOf("MOVE")){t.preventDefault();var i=t.target.getBoundingClientRect(),r=t.clientX-i.left,s=t.clientY-i.top;n.push({type:"MOUSE",action:"MOVE",state:"ENTER",x:r,y:s})}}function o(t){if(-1!==e.indexOf("MOVE")){t.preventDefault();var i=t.target.getBoundingClientRect(),r=t.clientX-i.left,s=t.clientY-i.top;n.push({type:"MOUSE",action:"MOVE",state:"LEAVE",x:r,y:s})}}function a(t){if(-1!==e.indexOf("MOVE")){t.preventDefault();var i=t.target.getBoundingClientRect(),r=t.clientX-i.left,s=t.clientY-i.top;n.push({type:"MOUSE",action:"MOVE",x:r,y:s})}}function c(t){var i=t.button,r=["LEFT","MIDDLE","RIGHT"];if(void 0!==r[i]){var s="CLICK_"+r[i];if(-1!==e.indexOf(s)){t.preventDefault();var o=t.target.getBoundingClientRect(),a=t.clientX-o.left,c=t.clientY-o.top;n.push({type:"MOUSE",action:s,state:"UP",x:a,y:c})}}}function u(){t.addEventListener("contextmenu",i),t.addEventListener("mousedown",r),t.addEventListener("mouseenter",s),t.addEventListener("mouseleave",o),t.addEventListener("mousemove",a),t.addEventListener("mouseup",c),t.addEventListener("wheel",h)}function h(t){if(-1!==e.indexOf("SCROLL")){t.preventDefault();var i,r=t.target.getBoundingClientRect(),s=t.clientX-r.left,o=t.clientY-r.top;Math.abs(t.deltaY)>=Math.abs(t.deltaX)?(i="DOWN",t.deltaY<0&&(i="UP")):(i="RIGHT",t.deltaX<0&&(i="LEFT")),n.push({type:"MOUSE",action:"SCROLL",state:i,x:s,y:o})}}u.call(this),this.destroy=function(){t.removeEventListener("contextmenu",i),t.removeEventListener("mousedown",r),t.removeEventListener("mouseenter",s),t.removeEventListener("mouseleave",o),t.removeEventListener("mousemove",a),t.removeEventListener("mouseup",c),t.removeEventListener("wheel",h)},this.setup=u}function u(t,e){var n=[],i=[];(function(){n.push(new a(t,e,i)),n.push(new c(t,e,i))}).call(this),this.destroy=function(){n.forEach((function(t){t.destroy()}))},this.inputs=i}o[9]="TAB",o[13]="ENTER",o[16]="SHIFT",o[17]="CTRL",o[18]="ALT",o[27]="ESC",o[32]="SPACE",o[37]="LEFT",o[38]="UP",o[39]="RIGHT",o[40]="DOWN",o[48]="ZERO",o[49]="ONE",o[50]="TWO",o[51]="THREE",o[52]="FOUR",o[53]="FIVE",o[54]="SIX",o[55]="SEVEN",o[56]="EIGHT",o[57]="NINE",o[65]="A",o[66]="B",o[67]="C",o[68]="D",o[69]="E",o[70]="F",o[71]="G",o[72]="H",o[73]="I",o[74]="J",o[75]="K",o[76]="L",o[77]="M",o[78]="N",o[79]="O",o[80]="P",o[81]="Q",o[82]="R",o[83]="S",o[84]="T",o[85]="U",o[86]="V",o[87]="W",o[88]="X",o[89]="Y",o[90]="Z";var h=n(3),f=n(0),l=n(1),d=n(5);function m(){var t=this;console.log("start demo scene"),this.$controllers=new u(this.element,this.models.scenes[this.currentScene].inputs()),this.$world=new h.b(this),this.$infos={started:!1},this.$origins={default:{x:function(){return 0},y:function(){return 0},z:function(){return 0},scale:function(){return 1}}};var e=function(){return Math.min(t.size.width/160,t.size.height/144)};this.$camera=new s(this.context,"default",{x:function(){return(t.size.width-160*e())/2},y:function(){return(t.size.height-144*e())/2},width:function(){return 160*e()},height:function(){return 144*e()},scale:e}),this.$cameraInfo=new s(this.context,"info",{x:function(){return(t.size.width-160*e())/2},y:function(){return(t.size.height-144*e())/2},width:function(){return 160*e()},height:function(){return 144*e()},scale:e}),this.$renderers=f.a.call(this),this.$systems=l.a.call(this);var n=i.c.call(this);this.$world.add(n),d.generateDecor.call(this,[]),this.$camera.look((function(){return t.$world.entities.character.get("position").x+48}),(function(){return 72}))}},function(t,e,n){t.exports=n(31)},function(t,e,n){var i={"./datasets/common/inputs.json":[32,41],"./images/common/placeholder-8x1.png":[33,21],"./images/demo/all-flappy-bird-16x16@1x.png":[34,22],"./images/demo/background-16x16@1x.png":[35,23],"./images/demo/best-48x16@1x.png":[36,24],"./images/demo/character-32x32.png":[37,25],"./images/demo/clouds-160x16@1x.png":[38,26],"./images/demo/flappy-bird-16x16@1x.png":[39,27],"./images/demo/flappy-bird-shadow-16x8@1x.png":[40,28],"./images/demo/foreground-16x16@1x.png":[41,29],"./images/demo/game-over-64x64@1x.png":[42,30],"./images/demo/numbers-8x16@1x.png":[43,31],"./images/demo/numbers-blue-8x16@1x.png":[44,32],"./images/demo/pipe-16x16@1x.png":[45,33],"./images/demo/pipe-shadow-16x8@1x.png":[46,34],"./images/demo/touch-screen-64x32@1x.png":[47,35],"./images/demo/waves-16x16@1x.png":[48,36],"./sounds/demo/explode.mp3":[49,37],"./sounds/demo/jump.mp3":[50,38],"./spritesheets/common/character-32x32.png":[51,39],"./spritesheets/common/spritesheet.png":[52,40]};function r(t){if(!n.o(i,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=i[t],r=e[0];return n.e(e[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(i)},r.id=26,t.exports=r},function(t,e,n){var i={"./components/common/camera.json":[53,42],"./components/common/commands.json":[54,43],"./components/common/fade.json":[55,44],"./components/common/forces.json":[56,45],"./components/common/hitbox.json":[57,46],"./components/common/images.json":[58,47],"./components/common/inputs.json":[59,48],"./components/common/origin.json":[60,49],"./components/common/position.json":[61,50],"./components/common/timeout.json":[62,51],"./components/demo/decor.json":[63,52],"./components/demo/player.json":[64,53],"./components/demo/score.json":[65,54],"./entities/demo/background.json":[66,55],"./entities/demo/bestScore.json":[67,56],"./entities/demo/bestScoreStatic.json":[68,57],"./entities/demo/bottom.json":[69,58],"./entities/demo/character.json":[70,59],"./entities/demo/checkpoint.json":[71,60],"./entities/demo/cloud.json":[72,61],"./entities/demo/pipeBottom.json":[73,62],"./entities/demo/pipeTop.json":[74,63],"./entities/demo/score.json":[75,64],"./entities/demo/splashEnd.json":[76,65],"./entities/demo/top.json":[77,66],"./entities/demo/water.json":[78,67],"./scenes/demo/entities.json":[79,68],"./scenes/demo/inputs.json":[80,69],"./scenes/demo/renderers.json":[81,70],"./scenes/demo/systems.json":[82,71],"./snippets/demo/ease-in.js":[83,1],"./snippets/demo/ease-linear.js":[84,2],"./snippets/demo/ease-out.js":[85,3],"./snippets/demo/fade-ending.js":[86,4],"./snippets/demo/forces-down.js":[87,5],"./snippets/demo/forces-ending.js":[88,6],"./snippets/demo/forces-handling.js":[89,7],"./snippets/demo/handle-hitbox-score.js":[90,8],"./snippets/demo/handle-hitbox.js":[91,9],"./snippets/demo/timeout-ending.js":[92,10],"./systems/common/fade.js":[93,11],"./systems/common/forces.js":[94,12],"./systems/common/hitbox.js":[102,13],"./systems/common/images.js":[95,14],"./systems/common/inputs.js":[96,15],"./systems/common/previous.js":[97,16],"./systems/common/showHitbox.js":[12],"./systems/common/spritesheets.js":[98,17],"./systems/common/timeout.js":[99,18],"./systems/demo/commands.js":[100,19],"./systems/demo/generateDecor.js":[5],"./systems/demo/updateScore.js":[101,20]};function r(t){if(!n.o(i,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=i[t],r=e[0];return Promise.all(e.slice(1).map(n.e)).then((function(){return n(r)}))}r.keys=function(){return Object.keys(i)},r.id=27,t.exports=r},function(t,e,n){var i={"./demo/index.js":29,"./loading/index.js":30};function r(t){var e=s(t);return n(e)}function s(t){if(!n.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}r.keys=function(){return Object.keys(i)},r.resolve=s,t.exports=r,r.id=28},function(t,e,n){"use strict";n.r(e),function(t){var i=n(8);n.d(e,"after",(function(){return i.a}));var r=n(9);n.d(e,"before",(function(){return r.a}));var s=n(10);n.d(e,"destroy",(function(){return s.a}));var o=n(11);n.d(e,"render",(function(){return o.a}));var a=n(13);n.d(e,"resize",(function(){return a.a}));var c=n(14);n.d(e,"setup",(function(){return c.a}));var u=n(24);n.d(e,"start",(function(){return u.a}));var h=n(15);n.d(e,"update",(function(){return h.a})),void 0!==t.hot&&t.hot.accept(["./after.js","./before.js","./destroy.js","./render.js","./resize.js","./setup.js","./start.js","./update.js"])}.call(this,n(7)(t))},function(t,e,n){"use strict";n.r(e),function(t){var i=n(16);n.d(e,"after",(function(){return i.a}));var r=n(17);n.d(e,"before",(function(){return r.a}));var s=n(18);n.d(e,"destroy",(function(){return s.a}));var o=n(19);n.d(e,"render",(function(){return o.a}));var a=n(20);n.d(e,"resize",(function(){return a.a}));var c=n(21);n.d(e,"setup",(function(){return c.a}));var u=n(22);n.d(e,"start",(function(){return u.a}));var h=n(23);n.d(e,"update",(function(){return h.a})),void 0!==t.hot&&t.hot.accept(["./after.js","./before.js","./destroy.js","./render.js","./resize.js","./setup.js","./start.js","./update.js"])}.call(this,n(7)(t))},function(t,e,n){"use strict";function i(t,e,n,i){var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=document.createElement("canvas"),o=s.getContext(t);function a(){s.setAttribute("tabindex",0),s.focus()}function c(t,e){var n=window.devicePixelRatio||1;!0===r&&(n=Math.floor(n)),s.setAttribute("height",n*e),s.setAttribute("width",n*t),s.style.height="100%",s.style.width="100%",o.scale(n,n),!0===r&&u()}function u(){s.style.imageRendering="-moz-crisp-edges",s.style.imageRendering="-webkit-crisp-edges",s.style.imageRendering="crisp-edges",s.style.imageRendering="pixelated",o.imageSmoothingEnabled=!1}s.setAttribute("id",e),s.addEventListener("mousedown",a),c(n,i),this.context=o,this.element=s,this.focus=a,this.resize=c}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:60,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=0,r=null,s=!1;function o(){var e=performance.now();if(null!==r&&!1===s)for(i+=e-r;i>=1e3/this.framerate/this.speed&&!1===s;)i>=5e3?(console.log("droped",i),t(i-=i)):(i-=1e3/this.framerate/this.speed,t(1e3/this.framerate));requestAnimationFrame(this.update.bind(this)),r=e}function a(){s=!0}function c(){s=!1}function u(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;requestAnimationFrame((function(){for(;n--;)t(1e3/e.framerate)}))}this.framerate=e,this.speed=n,this.pause=a,this.play=c,this.tick=u,this.update=o}function s(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,r=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(i=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,s=t}finally{try{i||null==a.return||a.return()}finally{if(r)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.r(e);var o=function(){var t=this;return new Promise((function(e,i){var r=n(26),o=[];t.assetsLoaded=[],r.keys().forEach((function(e){var n=new Promise((function(n,i){r(e).then((function(i){var r=t.assetsLoaded.find((function(t){return t.key==e}));if(r&&r.source!=i||void 0===r){if(void 0!==r&&r.source!=i){var o=t.assetsLoaded.indexOf(r);o>-1&&t.assetsLoaded.splice(o,1)}(function(t,e){return new Promise((function(n,i){console.log("load assets or reload");var r=s(t.match(/(?!\.\/|\/)(.+?)(?=(?:\.[^\.\/]+$)|\/)/g),3),o=r[0],a=r[1],c=r[2],u={key:t,name:c,scope:a,source:e,type:o.substring(0,o.length-1)};if("dataset"===u.type&&(u.getter=function(){return u.source},n(u)),"image"===u.type||"spritesheet"===u.type){var h=new Image;h.src=u.source,h.onload=function(){u.getter=function(){return h},n(u)}}else if("sound"===u.type){var f=new Audio(u.source);f.oncanplaythrough=function(){u.getter=function(){return f.cloneNode()},n(u)}}}))})(e,i).then((function(e){t.assetsLoaded.push(e),void 0===t.assets[e.type+"s"]&&(t.assets[e.type+"s"]={}),void 0===t.assets[e.type+"s"][e.scope]&&(t.assets[e.type+"s"][e.scope]={}),t.assets[e.type+"s"][e.scope][e.name]=e.getter}))}n(i)}))}));o.push(n)})),Promise.all(o).then((function(t){e()}))}))};function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,r=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(i=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,s=t}finally{try{i||null==a.return||a.return()}finally{if(r)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c=function(){var t=this;return new Promise((function(e,i){var r=n(27),s=[];t.modelsLoaded=[],r.keys().forEach((function(e){var n=new Promise((function(n,i){r(e).then((function(i){var r=t.modelsLoaded.find((function(t){return t.key==e}));if(r&&r.source!=i||void 0===r){if(void 0!==r&&r.source!=i){var s=t.modelsLoaded.indexOf(r);s>-1&&t.modelsLoaded.splice(s,1)}u.call(t,e,i).then((function(e){t.modelsLoaded.push(e),void 0===t.models[e.type+"s"]&&(t.models[e.type+"s"]={}),void 0===t.models[e.type+"s"][e.scope]&&(t.models[e.type+"s"][e.scope]={}),t.models[e.type+"s"][e.scope][e.name]=e.getter}))}n(i)}))}));s.push(n)})),Promise.all(s).then((function(t){e()}))}))};function u(t,e){var n=this;return new Promise((function(i,r){console.log("load models or reload");var s=a(t.match(/(?!\.\/|\/)(.+?)(?=(?:\.[^\.\/]+$)|\/)/g),3),o=s[0],c=s[1],u=s[2],h={key:t,name:u,scope:c,source:e,type:o.substring(0,o.length-1)};"snippets"===o?(h.getter=h.source.default.bind(n),i(h)):h.getter=function(){return h.source},i(h)}))}var h=function(){var t=this,e=n(28);e.keys().forEach((function(n){var i=n.match(/^\.\/([^\/]+)\/index\.js$/)[1];t.scenes[i]=e(n)}))};new function(t){var e=t.container,n=t.expose||!1,s=t.framerate||60,a=t.sharp||!1,u=t.speed||1,f={height:e.offsetHeight,width:e.offsetWidth},l=null,d=null,m=!1,p=0;function y(t){this.delta=t,e.offsetWidth===this.size.width&&e.offsetHeight===this.size.height||g.call(this),!0===this.playing&&this.tick(),this.scene.before.call(this),p>0&&v.call(this),this.scene.render.call(this),this.scene.after.call(this)}function g(){this.size.width=e.offsetWidth,this.size.height=e.offsetHeight,l.resize(this.size.width,this.size.height),this.scene.resize.call(this)}function v(){for(;p>0;)this.scene.update.call(this),p-=1,!0!==m?null===d||(this.scene.destroy.call(this),this.scene=this.scenes[d],this.currentScene=d,this.scene.setup.call(this),this.scene.start.call(this),d=null):(this.scene.start.call(this),m=!1)}this.playing=!0,this.preloading=!0,this.currentScene,this.$={},this.scenes={},this.size=f,this.snippets={},this.state={},this.version="0.39.0",this.cachedEntities={},this.load=function(t){d=t},this.pause=function(){this.playing=!1},this.play=function(){this.playing=!0},this.restart=function(){m=!0},this.tick=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;p+=t},function(){var t=this;l=new i("2d","theatre",this.size.width,this.size.height,a),e.appendChild(l.element),l.focus(),this.container=e,this.context=l.context,this.element=l.element,this.models={},this.assets={},this.delta=0,this.loop=new r(y.bind(this),s,u);var n=o.call(this),f=c.call(this);h.call(this),Promise.all([n,f]).then((function(e){t.preloading=!1})),this.scene=this.scenes.loading,this.scene.setup.call(this),this.scene.start.call(this),this.loop.update()}.call(this,t),!0===n&&(window.theatre=this)}({container:document.body.querySelector(".theatre-container"),expose:!0,sharp:!0})}]);
//# sourceMappingURL=index.js.map