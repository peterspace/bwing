import{_ as fe}from"./index-5aabe9ce.js";const ue=Symbol(),Z=Object.getPrototypeOf,J=new WeakMap,Ee=e=>e&&(J.has(e)?J.get(e):Z(e)===Object.prototype||Z(e)===Array.prototype),_e=e=>Ee(e)&&e[ue]||null,ee=(e,t=!0)=>{J.set(e,t)},F=e=>typeof e=="object"&&e!==null,L=new WeakMap,K=new WeakSet,be=(e=Object.is,t=(o,b)=>new Proxy(o,b),s=o=>F(o)&&!K.has(o)&&(Array.isArray(o)||!(Symbol.iterator in o))&&!(o instanceof WeakMap)&&!(o instanceof WeakSet)&&!(o instanceof Error)&&!(o instanceof Number)&&!(o instanceof Date)&&!(o instanceof String)&&!(o instanceof RegExp)&&!(o instanceof ArrayBuffer),r=o=>{switch(o.status){case"fulfilled":return o.value;case"rejected":throw o.reason;default:throw o}},l=new WeakMap,c=(o,b,g=r)=>{const h=l.get(o);if((h==null?void 0:h[0])===b)return h[1];const I=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o));return ee(I,!0),l.set(o,[b,I]),Reflect.ownKeys(o).forEach(W=>{if(Object.getOwnPropertyDescriptor(I,W))return;const D=Reflect.get(o,W),P={value:D,enumerable:!0,configurable:!0};if(K.has(D))ee(D,!1);else if(D instanceof Promise)delete P.value,P.get=()=>g(D);else if(L.has(D)){const[m,X]=L.get(D);P.value=c(m,X(),g)}Object.defineProperty(I,W,P)}),Object.preventExtensions(I)},E=new WeakMap,u=[1,1],v=o=>{if(!F(o))throw new Error("object required");const b=E.get(o);if(b)return b;let g=u[0];const h=new Set,I=(i,a=++u[0])=>{g!==a&&(g=a,h.forEach(n=>n(i,a)))};let W=u[1];const D=(i=++u[1])=>(W!==i&&!h.size&&(W=i,m.forEach(([a])=>{const n=a[1](i);n>g&&(g=n)})),g),P=i=>(a,n)=>{const _=[...a];_[1]=[i,..._[1]],I(_,n)},m=new Map,X=(i,a)=>{if(h.size){const n=a[3](P(i));m.set(i,[a,n])}else m.set(i,[a])},q=i=>{var a;const n=m.get(i);n&&(m.delete(i),(a=n[1])==null||a.call(n))},de=i=>(h.add(i),h.size===1&&m.forEach(([n,_],U)=>{const j=n[3](P(U));m.set(U,[n,j])}),()=>{h.delete(i),h.size===0&&m.forEach(([n,_],U)=>{_&&(_(),m.set(U,[n]))})}),$=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o)),k=t($,{deleteProperty(i,a){const n=Reflect.get(i,a);q(a);const _=Reflect.deleteProperty(i,a);return _&&I(["delete",[a],n]),_},set(i,a,n,_){const U=Reflect.has(i,a),j=Reflect.get(i,a,_);if(U&&(e(j,n)||E.has(n)&&e(j,E.get(n))))return!0;q(a),F(n)&&(n=_e(n)||n);let B=n;if(n instanceof Promise)n.then(w=>{n.status="fulfilled",n.value=w,I(["resolve",[a],w])}).catch(w=>{n.status="rejected",n.reason=w,I(["reject",[a],w])});else{!L.has(n)&&s(n)&&(B=v(n));const w=!K.has(B)&&L.get(B);w&&X(a,w)}return Reflect.set(i,a,B,_),I(["set",[a],n,j]),!0}});E.set(o,k);const pe=[$,D,c,de];return L.set(k,pe),Reflect.ownKeys(o).forEach(i=>{const a=Object.getOwnPropertyDescriptor(o,i);"value"in a&&(k[i]=o[i],delete a.value,delete a.writable),Object.defineProperty($,i,a)}),k})=>[v,L,K,e,t,s,r,l,c,E,u],[he]=be();function C(e={}){return he(e)}function S(e,t,s){const r=L.get(e);let l;const c=[],E=r[3];let u=!1;const o=E(b=>{if(c.push(b),s){t(c.splice(0));return}l||(l=Promise.resolve().then(()=>{l=void 0,u&&t(c.splice(0))}))});return u=!0,()=>{u=!1,o()}}function Ie(e,t){const s=L.get(e),[r,l,c]=s;return c(r,l(),t)}const d=C({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),ce={state:d,subscribe(e){return S(d,()=>e(d))},push(e,t){e!==d.view&&(d.view=e,t&&(d.data=t),d.history.push(e))},reset(e){d.view=e,d.history=[e]},replace(e){d.history.length>1&&(d.history[d.history.length-1]=e,d.view=e)},goBack(){if(d.history.length>1){d.history.pop();const[e]=d.history.slice(-1);d.view=e}},setData(e){d.data=e}},f={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return f.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return f.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatNativeUrl(e,t,s){if(f.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let r=e;r.includes("://")||(r=e.replaceAll("/","").replaceAll(":",""),r=`${r}://`),r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},formatUniversalUrl(e,t,s){if(!f.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let r=e;r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(f.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(f.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(f.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(f.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=ce.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},me=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),p=C({enabled:me,userSessionId:"",events:[],connectedWalletId:void 0}),Ae={state:p,subscribe(e){return S(p.events,()=>e(Ie(p.events[p.events.length-1])))},initialize(){p.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(p.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){p.connectedWalletId=e},click(e){if(p.enabled){const t={type:"CLICK",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}},track(e){if(p.enabled){const t={type:"TRACK",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}},view(e){if(p.enabled){const t={type:"VIEW",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}}},O=C({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),A={state:O,subscribe(e){return S(O,()=>e(O))},setChains(e){O.chains=e},setWalletConnectUri(e){O.walletConnectUri=e},setIsCustomDesktop(e){O.isCustomDesktop=e},setIsCustomMobile(e){O.isCustomMobile=e},setIsDataLoaded(e){O.isDataLoaded=e},setIsUiLoaded(e){O.isUiLoaded=e},setIsAuth(e){O.isAuth=e}},H=C({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),V={state:H,subscribe(e){return S(H,()=>e(H))},setConfig(e){var t,s;Ae.initialize(),A.setChains(e.chains),A.setIsAuth(!!e.enableAuthMode),A.setIsCustomMobile(!!((t=e.mobileWallets)!=null&&t.length)),A.setIsCustomDesktop(!!((s=e.desktopWallets)!=null&&s.length)),f.setModalVersionInStorage(),Object.assign(H,e)}};var ge=Object.defineProperty,te=Object.getOwnPropertySymbols,Oe=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable,se=(e,t,s)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,De=(e,t)=>{for(var s in t||(t={}))Oe.call(t,s)&&se(e,s,t[s]);if(te)for(var s of te(t))ye.call(t,s)&&se(e,s,t[s]);return e};const G="https://explorer-api.walletconnect.com",Q="wcm",z="js-2.6.2";async function x(e,t){const s=De({sdkType:Q,sdkVersion:z},t),r=new URL(e,G);return r.searchParams.append("projectId",V.state.projectId),Object.entries(s).forEach(([l,c])=>{c&&r.searchParams.append(l,String(c))}),(await fetch(r)).json()}const T={async getDesktopListings(e){return x("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return x("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return x("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return x("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${G}/w3m/v1/getWalletImage/${e}?projectId=${V.state.projectId}&sdkType=${Q}&sdkVersion=${z}`},getAssetImageUrl(e){return`${G}/w3m/v1/getAssetImage/${e}?projectId=${V.state.projectId}&sdkType=${Q}&sdkVersion=${z}`}};var ve=Object.defineProperty,oe=Object.getOwnPropertySymbols,we=Object.prototype.hasOwnProperty,Le=Object.prototype.propertyIsEnumerable,ne=(e,t,s)=>t in e?ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Ce=(e,t)=>{for(var s in t||(t={}))we.call(t,s)&&ne(e,s,t[s]);if(oe)for(var s of oe(t))Le.call(t,s)&&ne(e,s,t[s]);return e};const re=f.isMobile(),y=C({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),je={state:y,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=V.state;if(e==="NONE"||t==="ALL"&&!e)return y.recomendedWallets;if(f.isArray(e)){const s={recommendedIds:e.join(",")},{listings:r}=await T.getAllListings(s),l=Object.values(r);l.sort((c,E)=>{const u=e.indexOf(c.id),v=e.indexOf(E.id);return u-v}),y.recomendedWallets=l}else{const{chains:s,isAuth:r}=A.state,l=s==null?void 0:s.join(","),c=f.isArray(t),E={page:1,sdks:r?"auth_v1":void 0,entries:f.RECOMMENDED_WALLET_AMOUNT,chains:l,version:2,excludedIds:c?t.join(","):void 0},{listings:u}=re?await T.getMobileListings(E):await T.getDesktopListings(E);y.recomendedWallets=Object.values(u)}return y.recomendedWallets},async getWallets(e){const t=Ce({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:r}=V.state,{recomendedWallets:l}=y;if(r==="ALL")return y.wallets;l.length?t.excludedIds=l.map(g=>g.id).join(","):f.isArray(s)&&(t.excludedIds=s.join(",")),f.isArray(r)&&(t.excludedIds=[t.excludedIds,r].filter(Boolean).join(",")),A.state.isAuth&&(t.sdks="auth_v1");const{page:c,search:E}=e,{listings:u,total:v}=re?await T.getMobileListings(t):await T.getDesktopListings(t),o=Object.values(u),b=E?"search":"wallets";return y[b]={listings:[...y[b].listings,...o],total:v,page:c??1},{listings:o,total:v}},getWalletImageUrl(e){return T.getWalletImageUrl(e)},getAssetImageUrl(e){return T.getAssetImageUrl(e)},resetSearch(){y.search={listings:[],total:0,page:1}}},N=C({open:!1}),Y={state:N,subscribe(e){return S(N,()=>e(N))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:r}=A.state;if(f.removeWalletConnectDeepLink(),A.setWalletConnectUri(e==null?void 0:e.uri),A.setChains(e==null?void 0:e.chains),ce.reset("ConnectWallet"),s&&r)N.open=!0,t();else{const l=setInterval(()=>{const c=A.state;c.isUiLoaded&&c.isDataLoaded&&(clearInterval(l),N.open=!0,t())},200)}})},close(){N.open=!1}};var Pe=Object.defineProperty,ae=Object.getOwnPropertySymbols,Te=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable,ie=(e,t,s)=>t in e?Pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Se=(e,t)=>{for(var s in t||(t={}))Te.call(t,s)&&ie(e,s,t[s]);if(ae)for(var s of ae(t))Re.call(t,s)&&ie(e,s,t[s]);return e};function We(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const M=C({themeMode:We()?"dark":"light"}),le={state:M,subscribe(e){return S(M,()=>e(M))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(M.themeMode=t),s&&(M.themeVariables=Se({},s))}},R=C({open:!1,message:"",variant:"success"}),Me={state:R,subscribe(e){return S(R,()=>e(R))},openToast(e,t){R.open=!0,R.message=e,R.variant=t},closeToast(){R.open=!1}};class Ue{constructor(t){this.openModal=Y.open,this.closeModal=Y.close,this.subscribeModal=Y.subscribe,this.setTheme=le.setThemeConfig,le.setThemeConfig(t),V.setConfig(t),this.initUi()}async initUi(){if(typeof window<"u"){await fe(()=>import("./index-74b32d7c.js"),["assets/index-74b32d7c.js","assets/index-5aabe9ce.js","assets/index-58faad99.css"]);const t=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",t),A.setIsUiLoaded(!0)}}}const ke=Object.freeze(Object.defineProperty({__proto__:null,WalletConnectModal:Ue},Symbol.toStringTag,{value:"Module"}));export{Ae as R,ce as T,f as a,ke as i,le as n,Me as o,A as p,Y as s,je as t,V as y};
