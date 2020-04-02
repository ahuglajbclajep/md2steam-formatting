try{self["workbox:core:5.1.2"]&&_()}catch(e){}const e={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},t=t=>[e.prefix,t,e.suffix].filter(e=>e&&e.length>0).join("-"),n=n=>n||t(e.precache),s=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),""),i=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class r extends Error{constructor(e,t){super(i(e,t)),this.name=e,this.details=t}}const c=new Set;const a=(e,t)=>e.filter(e=>t in e),o=async({request:e,mode:t,plugins:n=[]})=>{const s=a(n,"cacheKeyWillBeUsed");let i=e;for(const e of s)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},l=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:i=[]})=>{const r=await self.caches.open(e),c=await o({plugins:i,request:t,mode:"read"});let a=await r.match(c,s);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;a=await i.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:a,request:c})}return a},u=async({cacheName:e,request:t,response:n,event:i,plugins:u=[],matchOptions:h})=>{const f=await o({plugins:u,request:t,mode:"write"});if(!n)throw new r("cache-put-with-no-response",{url:s(f.url)});const d=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let i=t,r=!1;for(const t of s)if("cacheWillUpdate"in t){r=!0;const s=t.cacheWillUpdate;if(i=await s.call(t,{request:e,response:i,event:n}),!i)break}return r||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:u,response:n,request:f});if(!d)return;const w=await self.caches.open(e),p=a(u,"cacheDidUpdate"),y=p.length>0?await l({cacheName:e,matchOptions:h,request:f}):null;try{await w.put(f,d)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of c)await e()}(),e}for(const t of p)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:y,newResponse:d,request:f})},h=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=a(s,"fetchDidFail"),c=i.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}const o=e.clone();try{let i;i="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(i=await e.fetchDidSucceed.call(e,{event:n,request:o,response:i}));return i}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:o.clone()});throw e}};let f;async function d(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=t?t(s):s,r=function(){if(void 0===f){const e=new Response("");if("body"in e)try{new Response(e.body),f=!0}catch(e){f=!1}f=!1}return f}()?n.body:await n.blob();return new Response(r,i)}try{self["workbox:precaching:5.1.2"]&&_()}catch(e){}function w(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),i=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:i.href}}class p{constructor(e){this.t=n(e),this.s=new Map,this.i=new Map,this.o=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=w(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.s.has(s)&&this.s.get(s)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this.s.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.o.has(e)&&this.o.get(e)!==n.integrity)throw new r("add-to-cache-list-conflicting-integrities",{url:s});this.o.set(e,n.integrity)}if(this.s.set(s,e),this.i.set(s,i),t.length>0){const e="Workbox is precaching URLs without revision "+`info: ${t.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],i=await self.caches.open(this.t),r=await i.keys(),c=new Set(r.map(e=>e.url));for(const[e,t]of this.s)c.has(t)?s.push(e):n.push({cacheKey:t,url:e});const a=n.map(({cacheKey:n,url:s})=>{const i=this.o.get(n),r=this.i.get(s);return this.l({cacheKey:n,cacheMode:r,event:e,integrity:i,plugins:t,url:s})});return await Promise.all(a),{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this.t),t=await e.keys(),n=new Set(this.s.values()),s=[];for(const i of t)n.has(i.url)||(await e.delete(i),s.push(i.url));return{deletedURLs:s}}async l({cacheKey:e,url:t,cacheMode:n,event:s,plugins:i,integrity:c}){const a=new Request(t,{integrity:c,cache:n,credentials:"same-origin"});let o,l=await h({event:s,plugins:i,request:a});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:s,request:a,response:l}):l.status<400))throw new r("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await d(l)),await u({event:s,plugins:i,response:l,request:e===t?a:new Request(e),cacheName:this.t,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.s}getCachedURLs(){return[...this.s.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.s.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this.t)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new r("missing-precache-entry",{cacheName:this.t,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new r("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let y;const g=()=>(y||(y=new p),y);const R=(e,t)=>{const n=g().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:i}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const c=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(r,t);if(yield c.href,n&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=n,yield e.href}if(s){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:r});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let v=!1;function m(e){v||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:i}={})=>{const r=n();self.addEventListener("fetch",n=>{const c=R(n.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:i});if(!c)return;let a=self.caches.open(r).then(e=>e.match(c)).then(e=>e||fetch(c));n.respondWith(a)})})(e),v=!0)}const q=[],U={get:()=>q,add(e){q.push(...e)}},L=e=>{const t=g(),n=U.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},b=e=>{const t=g();e.waitUntil(t.activate())};var x;self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),x={},function(e){g().addToCacheList(e),e.length>0&&(self.addEventListener("install",L),self.addEventListener("activate",b))}([{url:"1.worker.js",revision:"9fe4a52400111f8d39305ae8554be80b"},{url:"2.worker.js",revision:"6fa27e6ce984de7cd9acb7e65527ae96"},{url:"index.html",revision:"482bde8f7aced66d1e13db49a62ddc06"},{url:"main.css",revision:"c05d6548e363d0bbdd7269ed1b120daa"},{url:"main.js",revision:"15bc0be84911afe4e5c97a12b4b240fb"},{url:"worker.js",revision:"0fbeff31e124391de935f67ea6d9fb4b"}]),m(x);
