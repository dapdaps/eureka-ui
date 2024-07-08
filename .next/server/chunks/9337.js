exports.id=9337,exports.ids=[9337],exports.modules={39556:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"bailoutToClientRendering",{enumerable:!0,get:function(){return r}});let i=n(36146),o=n(45869);function r(){let e=o.staticGenerationAsyncStorage.getStore();return null!=e&&!!e.forceStatic||((null==e?void 0:e.isStaticGeneration)&&(0,i.throwWithNoSSR)(),!1)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},88427:(e,t,n)=>{"use strict";function i(e){}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"clientHookInServerComponentError",{enumerable:!0,get:function(){return i}}),n(50167),n(16689),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},30636:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ReadonlyURLSearchParams:function(){return g},useSearchParams:function(){return u},usePathname:function(){return x},ServerInsertedHTMLContext:function(){return c.ServerInsertedHTMLContext},useServerInsertedHTML:function(){return c.useServerInsertedHTML},useRouter:function(){return h},useParams:function(){return m},useSelectedLayoutSegments:function(){return b},useSelectedLayoutSegment:function(){return w},redirect:function(){return d.redirect},permanentRedirect:function(){return d.permanentRedirect},RedirectType:function(){return d.RedirectType},notFound:function(){return l.notFound}});let i=n(16689),o=n(7443),r=n(27583),a=n(88427),s=n(6160),c=n(31575),d=n(37866),l=n(49363),p=Symbol("internal for urlsearchparams readonly");function f(){return Error("ReadonlyURLSearchParams cannot be modified")}class g{[Symbol.iterator](){return this[p][Symbol.iterator]()}append(){throw f()}delete(){throw f()}set(){throw f()}sort(){throw f()}constructor(e){this[p]=e,this.entries=e.entries.bind(e),this.forEach=e.forEach.bind(e),this.get=e.get.bind(e),this.getAll=e.getAll.bind(e),this.has=e.has.bind(e),this.keys=e.keys.bind(e),this.values=e.values.bind(e),this.toString=e.toString.bind(e),this.size=e.size}}function u(){(0,a.clientHookInServerComponentError)("useSearchParams");let e=(0,i.useContext)(r.SearchParamsContext),t=(0,i.useMemo)(()=>e?new g(e):null,[e]);{let{bailoutToClientRendering:e}=n(39556);e()}return t}function x(){return(0,a.clientHookInServerComponentError)("usePathname"),(0,i.useContext)(r.PathnameContext)}function h(){(0,a.clientHookInServerComponentError)("useRouter");let e=(0,i.useContext)(o.AppRouterContext);if(null===e)throw Error("invariant expected app router to be mounted");return e}function m(){(0,a.clientHookInServerComponentError)("useParams");let e=(0,i.useContext)(o.GlobalLayoutRouterContext),t=(0,i.useContext)(r.PathParamsContext);return(0,i.useMemo)(()=>(null==e?void 0:e.tree)?function e(t,n){void 0===n&&(n={});let i=t[1];for(let t of Object.values(i)){let i=t[0],o=Array.isArray(i),r=o?i[1]:i;if(!r||r.startsWith("__PAGE__"))continue;let a=o&&("c"===i[2]||"oc"===i[2]);a?n[i[0]]=i[1].split("/"):o&&(n[i[0]]=i[1]),n=e(t,n)}return n}(e.tree):t,[null==e?void 0:e.tree,t])}function b(e){void 0===e&&(e="children"),(0,a.clientHookInServerComponentError)("useSelectedLayoutSegments");let{tree:t}=(0,i.useContext)(o.LayoutRouterContext);return function e(t,n,i,o){let r;if(void 0===i&&(i=!0),void 0===o&&(o=[]),i)r=t[1][n];else{var a;let e=t[1];r=null!=(a=e.children)?a:Object.values(e)[0]}if(!r)return o;let c=r[0],d=(0,s.getSegmentValue)(c);return!d||d.startsWith("__PAGE__")?o:(o.push(d),e(r,n,!1,o))}(t,e)}function w(e){void 0===e&&(e="children"),(0,a.clientHookInServerComponentError)("useSelectedLayoutSegment");let t=b(e);return 0===t.length?null:t[0]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},49363:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{notFound:function(){return i},isNotFoundError:function(){return o}});let n="NEXT_NOT_FOUND";function i(){let e=Error(n);throw e.digest=n,e}function o(e){return(null==e?void 0:e.digest)===n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},37866:(e,t,n)=>{"use strict";var i;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{RedirectType:function(){return i},getRedirectError:function(){return a},redirect:function(){return s},permanentRedirect:function(){return c},isRedirectError:function(){return d},getURLFromRedirectError:function(){return l},getRedirectTypeFromError:function(){return p}});let o=n(54580),r="NEXT_REDIRECT";function a(e,t,n){void 0===n&&(n=!1);let i=Error(r);i.digest=r+";"+t+";"+e+";"+n;let a=o.requestAsyncStorage.getStore();return a&&(i.mutableCookies=a.mutableCookies),i}function s(e,t){throw void 0===t&&(t="replace"),a(e,t,!1)}function c(e,t){throw void 0===t&&(t="replace"),a(e,t,!0)}function d(e){if("string"!=typeof(null==e?void 0:e.digest))return!1;let[t,n,i,o]=e.digest.split(";",4);return t===r&&("replace"===n||"push"===n)&&"string"==typeof i&&("true"===o||"false"===o)}function l(e){return d(e)?e.digest.split(";",3)[2]:null}function p(e){if(!d(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}(function(e){e.push="push",e.replace="replace"})(i||(i={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6160:(e,t)=>{"use strict";function n(e){return Array.isArray(e)?e[1]:e}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSegmentValue",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},36146:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{NEXT_DYNAMIC_NO_SSR_CODE:function(){return n},throwWithNoSSR:function(){return i}});let n="NEXT_DYNAMIC_NO_SSR_CODE";function i(){let e=Error(n);throw e.digest=n,e}},46545:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>s});var o=n(36304),r=n(70330),a=e([o,r]);function s(){let e=(0,o.L)(e=>e.user),{queryUserInfo:t}=(0,r.Z)();return{userInfo:e,queryUserInfo:t}}[o,r]=a.then?(await a)():a,i()}catch(e){i(e)}})},12302:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>f});var o=n(39332),r=n(16689),a=n(8433),s=n(42501),c=n(14300),d=n(59397),l=n(78579),p=e([a,c,d]);[a,c,d]=p.then?(await p)():p;let g={twitter:{label:"Twitter",path:"/api/user/bind/twitter"},telegram:{label:"Telegram",path:"/api/user/bind/telegram"},discord:{label:"Discord",path:"/api/user/bind/discord"}};function f({onSuccess:e,redirect_uri:t}){let[n,i]=(0,r.useState)(!1),{account:p}=(0,a.Z)(),[f,u]=(0,r.useState)(),x=(0,c.Z)(),h=(0,o.useSearchParams)(),{check:m}=(0,d.Z)({isNeedAk:!0,isQuiet:!0}),b=h.get("code"),w=(0,r.useCallback)(async(o,r)=>{if(n)return;u(o),i(!0);let a=g[o],c=x.loading({title:`${a.label} binding`});try{let n={};("twitter"===o||"discord"===o)&&(n={code:b,redirect_uri:t}),"telegram"===o&&(n=r);let d=await (0,l.v_)(`${s.h}${a.path}`,n);if(0!==d.code)throw Error(d.msg);x.dismiss(c),x.success({title:`${a.label} bind successfully`}),i(!1),e()}catch(e){i(!1),x.dismiss(c),x.fail({title:`${a.label} bind failed`})}},[b,n]);return(0,r.useEffect)(()=>{p&&b&&m(()=>{let e=sessionStorage.getItem("_auth_type");b&&e&&(w(e),sessionStorage.removeItem("_auth_type"))})},[b,p]),{loading:n,type:f,handleBind:w}}i()}catch(e){i(e)}})},72912:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var i=n(16689),o=n(42501),r=n(78579);function a(){let[e,t]=(0,i.useState)(),n=(0,i.useCallback)(async()=>{let e=await (0,r.U2)(`${o.h}/config`);t(e.data)},[]);return(0,i.useEffect)(()=>{n()},[]),e}},27416:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{MP:()=>r.Z,mQ:()=>a.Z,u_:()=>o.Z});var o=n(29828),r=n(92302),a=n(92228),s=e([o,r,a]);[o,r,a]=s.then?(await s)():s,i()}catch(e){i(e)}})},92302:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var o=n(20997),r=n(11163),a=n(16689),s=n(4669),c=n(94258),d=e([c]);c=(d.then?(await d)():d)[0];let l=({open:e,type:t,onClose:n,reward:i})=>{let d=(0,r.useRouter)();if((0,a.useEffect)(()=>{},[]),!e)return null;let l=o.jsx(c.zd,{}),p=o.jsx(c.x8,{onClick:n,src:"/images/marketing/close.svg"}),f={initial:{top:-1e4},animate:{top:0}};return"success"===t?(0,o.jsxs)(o.Fragment,{children:[l,(0,o.jsxs)(c.Eq,{...f,children:[p,o.jsx(c.Kw,{src:"/images/marketing/congrats.gif"}),o.jsx(c.Dx,{children:"Congrats!"}),(0,o.jsxs)(c.UB,{children:["You’ve got ",i,o.jsx(c.sN,{src:"/images/marketing/coin.svg"}),"PTS"]}),o.jsx(c.Uw,{onClick:()=>{d.push("/profile?active=pts")},children:"Go to DapDap Profile to check your PTS"})]})]}):(0,o.jsxs)(o.Fragment,{children:[l,(0,o.jsxs)(c.Eq,{...f,children:[p,o.jsx(c.Ak,{src:"/images/marketing/sorry.svg"}),o.jsx(c.Dx,{children:"Oops"}),(0,o.jsxs)(c.nS,{children:["You are not a new user and do not ",o.jsx("br",{})," meet the conditions for participation"]}),(0,o.jsxs)(c.eG,{onClick:s.l,children:["More activities are waiting for you… ",o.jsx("br",{}),"Go to DapDap,"]})]})]})};i()}catch(e){i(e)}})},94258:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Ak:()=>f,Dx:()=>g,Eq:()=>d,Kw:()=>p,UB:()=>u,Uw:()=>m,eG:()=>b,nS:()=>x,sN:()=>h,x8:()=>l,zd:()=>c});var o=n(66197),r=n(57518),a=n.n(r),s=e([o]);o=(s.then?(await s)():s)[0];let c=a().div.withConfig({componentId:"sc-9008961e-0"})`
  position: fixed;
  inset: 0;
  z-index: 50;
  top: 86px;

  backdrop-filter: blur(5px);
`,d=a()(o.motion.div).withConfig({componentId:"sc-9008961e-1"})`
  position: fixed;
  outline: 0;
  z-index: 1000;
  background-image: linear-gradient(to bottom, rgba(22, 24, 30, 1), rgba(38, 40, 54, 1));
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 500px;
  height: 323px;
  margin: auto;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #262836;
  padding: 24px;
  text-align: center;
`,l=a().img.withConfig({componentId:"sc-9008961e-2"})`
  position: absolute;
  right: 18px;
  top: 18px;
`,p=a().img.withConfig({componentId:"sc-9008961e-3"})`
  width: 100%;
  margin-top: -130px;
`,f=a().img.withConfig({componentId:"sc-9008961e-4"})``,g=a().div.withConfig({componentId:"sc-9008961e-5"})`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-top: 20px;
`,u=a().div.withConfig({componentId:"sc-9008961e-6"})`
  font-size: 20px;
  font-weight: 700;
  color: rgba(235, 244, 121, 1);
  margin-top: 14px;
`,x=a().div.withConfig({componentId:"sc-9008961e-7"})`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 14px;
`,h=a().img.withConfig({componentId:"sc-9008961e-8"})`
  width: 20px;
  margin: 0 5px;
`,m=a().div.withConfig({componentId:"sc-9008961e-9"})`
  font-size: 14px;
  font-weight: 500;
  color: rgba(151, 154, 190, 1);
  text-decoration: underline;
  margin-top: 56px;
  cursor: pointer;
`,b=a().div.withConfig({componentId:"sc-9008961e-10"})`
  font-size: 14px;
  font-weight: 500;
  color: rgba(151, 154, 190, 1);
  text-decoration: underline;
  margin-top: 56px;
  cursor: pointer;
`;i()}catch(e){i(e)}})},29828:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var o=n(20997),r=n(11163),a=n(16689),s=n(4669),c=n(29448),d=e([c]);c=(d.then?(await d)():d)[0];let l=({open:e,type:t,onClose:n,reward:i})=>{let[d,l]=(0,a.useState)(0),p=(0,r.useRouter)();if((0,a.useEffect)(()=>{},[]),!e)return null;let f=o.jsx(c.zd,{onClick:n}),g=o.jsx(c.x8,{onClick:n,src:"/images/marketing/close.svg"}),u={initial:{bottom:-352},animate:{bottom:0}};return"success"===t?(0,o.jsxs)(o.Fragment,{children:[f,(0,o.jsxs)(c.Eq,{...u,children:[g,o.jsx(c.Kw,{src:"/images/marketing/congrats.gif"}),o.jsx(c.Dx,{children:"Congrats!"}),(0,o.jsxs)(c.UB,{children:["You’ve got ",i,o.jsx(c.sN,{src:"/images/marketing/coin.svg"}),"PTS"]}),o.jsx(c.Uw,{onClick:()=>{p.push("/profile?active=pts")},children:"Go to DapDap Profile to check your PTS"})]})]}):(0,o.jsxs)(o.Fragment,{children:[f,(0,o.jsxs)(c.Eq,{...u,children:[g,o.jsx(c.Ak,{src:"/images/marketing/sorry.svg"}),o.jsx(c.Dx,{children:"Oops"}),(0,o.jsxs)(c.nS,{children:["You are not a new user and do not ",o.jsx("br",{})," meet the conditions for participation"]}),(0,o.jsxs)(c.eG,{onClick:s.l,children:["More activities are waiting for you… ",o.jsx("br",{}),"Go to DapDap,"]})]})]})};i()}catch(e){i(e)}})},29448:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Ak:()=>f,Dx:()=>g,Eq:()=>d,Kw:()=>p,UB:()=>u,Uw:()=>m,eG:()=>b,nS:()=>x,sN:()=>h,x8:()=>l,zd:()=>c});var o=n(66197),r=n(57518),a=n.n(r),s=e([o]);o=(s.then?(await s)():s)[0];let c=a().div.withConfig({componentId:"sc-ee2b4bd6-0"})`
  position: fixed;
  inset: 0;
  z-index: 1000;
  height: 100%;

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.5);
`,d=a()(o.motion.div).withConfig({componentId:"sc-ee2b4bd6-1"})`
  position: fixed;
  outline: 0;
  z-index: 1000;
  background-image: linear-gradient(to bottom, rgba(22, 24, 30, 1), rgba(38, 40, 54, 1));
  left: 14px;
  right: 14px;
  height: 352px;
  padding: 0 18px 36px;
  text-align: center;
`,l=a().img.withConfig({componentId:"sc-ee2b4bd6-2"})`
  position: absolute;
  right: 18px;
  top: 18px;
`,p=a().img.withConfig({componentId:"sc-ee2b4bd6-3"})`
  width: 100%;
  margin-top: -80px;
`,f=a().img.withConfig({componentId:"sc-ee2b4bd6-4"})`
  margin-top: 20px;
`,g=a().div.withConfig({componentId:"sc-ee2b4bd6-5"})`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-top: 20px;
`,u=a().div.withConfig({componentId:"sc-ee2b4bd6-6"})`
  font-size: 20px;
  font-weight: 700;
  color: rgba(235, 244, 121, 1);
  margin-top: 16px;
`,x=a().div.withConfig({componentId:"sc-ee2b4bd6-7"})`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 16px;
`,h=a().img.withConfig({componentId:"sc-ee2b4bd6-8"})`
  width: 20px;
  margin: 0 5px;
`,m=a().div.withConfig({componentId:"sc-ee2b4bd6-9"})`
  font-size: 14px;
  font-weight: 500;
  color: rgba(151, 154, 190, 1);
  text-decoration: underline;
  margin-top: 140px;
`,b=a().div.withConfig({componentId:"sc-ee2b4bd6-10"})`
  font-size: 14px;
  font-weight: 500;
  color: rgba(151, 154, 190, 1);
  text-decoration: underline;
  margin-top: 70px;
`;i()}catch(e){i(e)}})},92228:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var o=n(20997),r=n(66197),a=n(16689),s=n(71286),c=e([r]);r=(c.then?(await c)():c)[0];let d=[{name:"Quests",key:"Quests"},{name:"Leaderboard",key:"Leaderboard"}],l=(0,a.memo)(({current:e,onChange:t})=>{let n=(0,a.useRef)(0);return o.jsx(s.Yt,{$width:730,$mt:60,children:d.map((i,a)=>(0,o.jsxs)(s.sI,{onClick:()=>{n.current=d.findIndex(t=>t.key===e),t(i.key)},"data-bp":"4001-002",children:[(0,o.jsxs)(s.iC,{$active:e===i.key,children:["Quests"===i.key&&o.jsx(s.nP,{src:"/images/marketing/fist.svg"}),"Leaderboard"===i.key&&o.jsx(s.nP,{src:"/images/marketing/coin.svg"}),o.jsx("span",{children:i.name})]}),e===i.key&&o.jsx(r.motion.div,{initial:"hidden",animate:"show",variants:{hidden:{x:n.current>a?"30%":"-30%"},show:{x:"0%",transition:{staggerChildren:.5}}},children:o.jsx(s.sg,{})})]},i.key))})});i()}catch(e){i(e)}})},71286:(e,t,n)=>{"use strict";n.d(t,{Yt:()=>r,iC:()=>s,nP:()=>d,sI:()=>a,sg:()=>c});var i=n(57518),o=n.n(i);let r=o().div.withConfig({componentId:"sc-d9ee364c-0"})`
  display: flex;
  align-items: center;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #21242a;
  width: ${({$width:e})=>e}px;
  height: 66px;
  padding: 8px;
  box-sizing: border-box;
  margin: ${({$mt:e})=>e}px auto 0px;
`,a=o().div.withConfig({componentId:"sc-d9ee364c-1"})`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  cursor: pointer;
  position: relative;
`,s=o().div.withConfig({componentId:"sc-d9ee364c-2"})`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: ${({$active:e})=>e?"#1e2028":"#fff"};
  height: 50px;
  position: relative;
  z-index: 10;
`,c=o().div.withConfig({componentId:"sc-d9ee364c-3"})`
  position: absolute;
  border-radius: 30px;
  height: 50px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 100%;
  top: -50px;
`,d=o().img.withConfig({componentId:"sc-d9ee364c-4"})`
  width: 37px;
  height: 24px;
`},83812:(e,t,n)=>{"use strict";n.d(t,{y:()=>i});let i=new Map([["bitget","/images/marketing/bg-logo.svg"],["coin68","/images/marketing/coin68-logo.svg"],["namlongdao","/images/marketing/namlong-logo.png"],["okx","/images/marketing/okx.png"]])},13777:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var i=n(16689),o=n(42501),r=n(78579);function a(e){let[t,n]=(0,i.useState)([]),[a,s]=(0,i.useState)(!1),[c,d]=(0,i.useState)(1),[l,p]=(0,i.useState)(1),[f,g]=(0,i.useState)(),u=(0,i.useRef)(),x=(0,i.useCallback)(async t=>{if(!a){s(!0);try{let i=await (0,r.U2)(`${o.h}/api/activity/leaderboard?category
=${e}&page=${t||c}&page_size=10`),a=i.data.data||[];n(a),s(!1),t&&d(t),p(i.data.total_page),g({total_reward:i.data.total_reward,total_users:i.data.total_users,total_quest_execution:i.data.total_quest_execution}),clearTimeout(u.current),u.current=setTimeout(()=>{x()},9e5)}catch(e){s(!1)}}},[a,c]),h=(0,i.useCallback)(e=>{let t=c+e;x(t)},[c]),m=(0,i.useCallback)(()=>{x(1)},[]);return(0,i.useEffect)(()=>{x(1)},[]),{loading:a,list:t,page:c,info:f,maxPage:l,handlePageChange:h,handleRefresh:m}}},92357:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{AP:()=>F,Af:()=>g,Aw:()=>z,DK:()=>b,Dx:()=>m,FG:()=>G,JN:()=>L,LT:()=>H,Oc:()=>D,Os:()=>A,P9:()=>I,Rm:()=>l,S1:()=>O,TR:()=>u,Tr:()=>v,Ux:()=>j,Vp:()=>E,W2:()=>c,Zb:()=>R,_K:()=>M,eU:()=>$,h2:()=>Z,h8:()=>w,hJ:()=>U,ie:()=>p,jL:()=>d,ll:()=>T,oX:()=>f,p2:()=>x,pu:()=>P,qK:()=>k,rU:()=>S,s7:()=>N,sN:()=>y,wC:()=>_,xu:()=>h,zx:()=>C});var o=n(66197),r=n(57518),a=n.n(r),s=e([o]);o=(s.then?(await s)():s)[0];let c=a().div.withConfig({componentId:"sc-3f94117-0"})`
  /* background-color: #212633; */
`,d=a().div.withConfig({componentId:"sc-3f94117-1"})`
  height: 300px;
  margin-bottom: 60px;

  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  &.bitget {
    background-image: url('/images/marketing/bg-pc.png');
  }
  &.coin68 {
    background-image: url('/images/marketing/coin68-pc.png');
  }
  &.namlongdao {
    background-image: url('/images/marketing/coin68-pc.png');
  }
  &.okx {
    background-image: url('/images/marketing/bg-pc.png');
  }
`;a().div.withConfig({componentId:"sc-3f94117-2"})`
  height: 300px;
  margin-bottom: 60px;

  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;let l=a().img.withConfig({componentId:"sc-3f94117-3"})`
  width: 278px;
`,p=a().img.withConfig({componentId:"sc-3f94117-4"})`
  width: 36px;
  margin: 0 30px;
`,f=a().img.withConfig({componentId:"sc-3f94117-5"})`
  width: 70px;
  height: 70px;
`,g=a().img.withConfig({componentId:"sc-3f94117-6"})`
  width: 360px;
`,u=a().div.withConfig({componentId:"sc-3f94117-7"})`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
  .dapdap {
    color: #ebf479;
  }
  .partner {
    color: white;
  }
  .dapdap,
  .partner {
    font-size: 42px;
    font-weight: 900;
    font-family: 'Montserrat';
  }
`;a().img.withConfig({componentId:"sc-3f94117-8"})``;let x=a().div.withConfig({componentId:"sc-3f94117-9"})`
  font-size: 20px;
  font-weight: 500;
  color: #b1b4d6;
  text-align: center;
`,h=a().div.withConfig({componentId:"sc-3f94117-10"})`
  width: 1244px;
  margin: 27px auto 0;
`,m=a().div.withConfig({componentId:"sc-3f94117-11"})`
  font-size: 36px;
  font-weight: 700;
  background-image: linear-gradient(to right, #ebf479 0%, #979abe 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin: 80px auto 32px;
  display: flex;
  justify-content: space-between;
  align-items: end;
`,b=a().span.withConfig({componentId:"sc-3f94117-12"})`
  color: #ffdd4d;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: end;
  gap: 5px;
`,w=a().div.withConfig({componentId:"sc-3f94117-13"})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 10px;
  gap: 38px;
`,v=a().div.withConfig({componentId:"sc-3f94117-14"})`
  color: #979abe;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`,y=a().img.withConfig({componentId:"sc-3f94117-15"})`
  width: 20px;
  margin: 0 5px;
`,C=a().div.withConfig({componentId:"sc-3f94117-16"})`
  width: 700px;
  height: 74px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e2028;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
`,k=a().div.withConfig({componentId:"sc-3f94117-17"})`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`,I=a().span.withConfig({componentId:"sc-3f94117-18"})`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  justify-content: center;
`,j=a().img.withConfig({componentId:"sc-3f94117-19"})`
  width: 30px;
  height: 30px;
  margin-left: 4px;
`,_=a().img.withConfig({componentId:"sc-3f94117-20"})`
  width: 20px;
  height: 20px;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &.spin {
    animation: loading 1s linear infinite;
    transform-origin: center center;
  }
`;a().img.withConfig({componentId:"sc-3f94117-21"})`
  width: 18px;
  height: 18px;
`;let S=a().div.withConfig({componentId:"sc-3f94117-22"})`
  margin-top: 10px;
  color: #979abe;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  text-decoration-line: underline;
  cursor: pointer;
`,z=a().div.withConfig({componentId:"sc-3f94117-23"})`
  position: relative;
  margin-top: 84px;
`,P=a().div.withConfig({componentId:"sc-3f94117-24"})`
  color: #979abe;
  font-size: 26px;
  font-weight: 500;
  margin: 20px auto 0;
  text-align: center;
`;a().div.withConfig({componentId:"sc-3f94117-25"})`
  border-radius: 20px;
  border: 1px solid #373a53;
  padding: 28px 26px;
  background: #2c2e3e;
  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
`,a().div.withConfig({componentId:"sc-3f94117-26"})`
  display: flex;
  justify-content: space-between;
`,a()(o.motion.div).withConfig({componentId:"sc-3f94117-27"})`
  border-radius: 20px;
  margin-top: 30px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
  overflow-y: scroll;
  padding: 0 20px;
  display: flex;
`,a().div.withConfig({componentId:"sc-3f94117-28"})`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`,a().div.withConfig({componentId:"sc-3f94117-29"})`
  width: 238px;
  height: 74px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #02051e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  gap: 5px;
  cursor: pointer;
`;let E=a().div.withConfig({componentId:"sc-3f94117-30"})`
  display: inline-block;
  padding: 5px 8px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  color: #ebf479;
  font-size: 12px;
  font-weight: 500;
`,O=a().div.withConfig({componentId:"sc-3f94117-31"})`
  display: grid;
  grid-template-columns: 607px 607px;
  grid-template-rows: 177px 177px;
  gap: 30px;
  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
`,R=a().div.withConfig({componentId:"sc-3f94117-32"})`
  /* width: 607px;
  height: 177px; */
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #2c2e3e;
  display: flex;
  padding: 20px;
`,M=a().img.withConfig({componentId:"sc-3f94117-33"})`
  width: 84px;
  margin-right: 22px;
`,T=a().div.withConfig({componentId:"sc-3f94117-34"})`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`,D=a().img.withConfig({componentId:"sc-3f94117-35"})`
  width: 23px;
  height: 23px;
`,A=a().button.withConfig({componentId:"sc-3f94117-36"})`
  width: 104px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #02051e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:disabled {
    border: 1px solid #373a53;
    background: rgba(55, 58, 83, 0.5);
    cursor: not-allowed;
    color: white;
  }
`,N=a().div.withConfig({componentId:"sc-3f94117-37"})`
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`,L=a().div.withConfig({componentId:"sc-3f94117-38"})`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: end;
`;a().div.withConfig({componentId:"sc-3f94117-39"})`
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  -webkit-transition: -webkit-transform 1s linear;
  transition: transform 1s linear;
`,a().div.withConfig({componentId:"sc-3f94117-40"})`
  font-size: 16px;
  font-weight: 500;
  color: white;
  padding-top: 50px;
  display: flex;
  align-items: center;
  gap: 20px;
  &:last-child {
    padding-bottom: 50px;
  }
`,a().span.withConfig({componentId:"sc-3f94117-41"})``,a().img.withConfig({componentId:"sc-3f94117-42"})`
  width: 20px;
`;let U=a().div.withConfig({componentId:"sc-3f94117-43"})`
  position: fixed;
  top: 260px;
  right: 20px;
  width: 185px;
  height: 66px;
  z-index: 1;
  border-radius: 33px;

  &.bitget {
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: radial-gradient(72.14% 104.62% at 47.64% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 100%),
      radial-gradient(185.62% 109.56% at 0% 71.21%, #7efbfd 0%, #7138cd 55.21%, #4400b2 100%);
    box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, 0.15) inset;
  }
  &.coin68,
  &.namlongdao {
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: radial-gradient(72.14% 104.62% at 47.64% 100%, rgba(253, 126, 126, 1) 0%, rgba(255, 154, 61, 1) 100%),
      radial-gradient(185.62% 109.56% at 0% 71.21%, #7efbfd 0%, #7138cd 55.21%, #4400b2 100%);
    box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, 0.15) inset;
  }
`,Z=a().div.withConfig({componentId:"sc-3f94117-44"})`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
  padding-left: 30px;
`,$=a().div.withConfig({componentId:"sc-3f94117-45"})`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`,G=a().div.withConfig({componentId:"sc-3f94117-46"})`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 3px;
`,H=a().img.withConfig({componentId:"sc-3f94117-47"})`
  width: 69px;
  position: absolute;
  top: -9px;
  right: 0;
`,F=a().img.withConfig({componentId:"sc-3f94117-48"})`
  width: 19px;
`;a().img.withConfig({componentId:"sc-3f94117-49"})`
  width: 38px;
  height: 38px;
  margin-right: 20px;
`,a().div.withConfig({componentId:"sc-3f94117-50"})`
  flex-grow: 1;
`,a().div.withConfig({componentId:"sc-3f94117-51"})`
  margin-top: 33px;
  display: flex;
  width: 370px;
  height: 132px;
  padding: 23px;
  border-radius: 20px;
  color: white;
  background-color: rgba(44, 46, 62, 1);
  border: 1px solid rgba(55, 58, 83, 1);
`,a().div.withConfig({componentId:"sc-3f94117-52"})`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`,a().div.withConfig({componentId:"sc-3f94117-53"})`
  font-size: 14px;
  font-weight: 400;
  color: #979abe;
`,i()}catch(e){i(e)}})},27583:(e,t,n)=>{"use strict";e.exports=n(87093).vendored.contexts.HooksClientContext},31575:(e,t,n)=>{"use strict";e.exports=n(87093).vendored.contexts.ServerInsertedHtml},39332:(e,t,n)=>{e.exports=n(30636)}};