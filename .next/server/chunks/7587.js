exports.id=7587,exports.ids=[7587],exports.modules={39556:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"bailoutToClientRendering",{enumerable:!0,get:function(){return o}});let i=n(36146),r=n(45869);function o(){let e=r.staticGenerationAsyncStorage.getStore();return null!=e&&!!e.forceStatic||((null==e?void 0:e.isStaticGeneration)&&(0,i.throwWithNoSSR)(),!1)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},88427:(e,t,n)=>{"use strict";function i(e){}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"clientHookInServerComponentError",{enumerable:!0,get:function(){return i}}),n(50167),n(16689),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},30636:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ReadonlyURLSearchParams:function(){return h},useSearchParams:function(){return g},usePathname:function(){return x},ServerInsertedHTMLContext:function(){return a.ServerInsertedHTMLContext},useServerInsertedHTML:function(){return a.useServerInsertedHTML},useRouter:function(){return u},useParams:function(){return b},useSelectedLayoutSegments:function(){return m},useSelectedLayoutSegment:function(){return w},redirect:function(){return l.redirect},permanentRedirect:function(){return l.permanentRedirect},RedirectType:function(){return l.RedirectType},notFound:function(){return c.notFound}});let i=n(16689),r=n(7443),o=n(27583),s=n(88427),d=n(6160),a=n(31575),l=n(37866),c=n(49363),p=Symbol("internal for urlsearchparams readonly");function f(){return Error("ReadonlyURLSearchParams cannot be modified")}class h{[Symbol.iterator](){return this[p][Symbol.iterator]()}append(){throw f()}delete(){throw f()}set(){throw f()}sort(){throw f()}constructor(e){this[p]=e,this.entries=e.entries.bind(e),this.forEach=e.forEach.bind(e),this.get=e.get.bind(e),this.getAll=e.getAll.bind(e),this.has=e.has.bind(e),this.keys=e.keys.bind(e),this.values=e.values.bind(e),this.toString=e.toString.bind(e),this.size=e.size}}function g(){(0,s.clientHookInServerComponentError)("useSearchParams");let e=(0,i.useContext)(o.SearchParamsContext),t=(0,i.useMemo)(()=>e?new h(e):null,[e]);{let{bailoutToClientRendering:e}=n(39556);e()}return t}function x(){return(0,s.clientHookInServerComponentError)("usePathname"),(0,i.useContext)(o.PathnameContext)}function u(){(0,s.clientHookInServerComponentError)("useRouter");let e=(0,i.useContext)(r.AppRouterContext);if(null===e)throw Error("invariant expected app router to be mounted");return e}function b(){(0,s.clientHookInServerComponentError)("useParams");let e=(0,i.useContext)(r.GlobalLayoutRouterContext),t=(0,i.useContext)(o.PathParamsContext);return(0,i.useMemo)(()=>(null==e?void 0:e.tree)?function e(t,n){void 0===n&&(n={});let i=t[1];for(let t of Object.values(i)){let i=t[0],r=Array.isArray(i),o=r?i[1]:i;if(!o||o.startsWith("__PAGE__"))continue;let s=r&&("c"===i[2]||"oc"===i[2]);s?n[i[0]]=i[1].split("/"):r&&(n[i[0]]=i[1]),n=e(t,n)}return n}(e.tree):t,[null==e?void 0:e.tree,t])}function m(e){void 0===e&&(e="children"),(0,s.clientHookInServerComponentError)("useSelectedLayoutSegments");let{tree:t}=(0,i.useContext)(r.LayoutRouterContext);return function e(t,n,i,r){let o;if(void 0===i&&(i=!0),void 0===r&&(r=[]),i)o=t[1][n];else{var s;let e=t[1];o=null!=(s=e.children)?s:Object.values(e)[0]}if(!o)return r;let a=o[0],l=(0,d.getSegmentValue)(a);return!l||l.startsWith("__PAGE__")?r:(r.push(l),e(o,n,!1,r))}(t,e)}function w(e){void 0===e&&(e="children"),(0,s.clientHookInServerComponentError)("useSelectedLayoutSegment");let t=m(e);return 0===t.length?null:t[0]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},49363:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{notFound:function(){return i},isNotFoundError:function(){return r}});let n="NEXT_NOT_FOUND";function i(){let e=Error(n);throw e.digest=n,e}function r(e){return(null==e?void 0:e.digest)===n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},37866:(e,t,n)=>{"use strict";var i;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{RedirectType:function(){return i},getRedirectError:function(){return s},redirect:function(){return d},permanentRedirect:function(){return a},isRedirectError:function(){return l},getURLFromRedirectError:function(){return c},getRedirectTypeFromError:function(){return p}});let r=n(54580),o="NEXT_REDIRECT";function s(e,t,n){void 0===n&&(n=!1);let i=Error(o);i.digest=o+";"+t+";"+e+";"+n;let s=r.requestAsyncStorage.getStore();return s&&(i.mutableCookies=s.mutableCookies),i}function d(e,t){throw void 0===t&&(t="replace"),s(e,t,!1)}function a(e,t){throw void 0===t&&(t="replace"),s(e,t,!0)}function l(e){if("string"!=typeof(null==e?void 0:e.digest))return!1;let[t,n,i,r]=e.digest.split(";",4);return t===o&&("replace"===n||"push"===n)&&"string"==typeof i&&("true"===r||"false"===r)}function c(e){return l(e)?e.digest.split(";",3)[2]:null}function p(e){if(!l(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}(function(e){e.push="push",e.replace="replace"})(i||(i={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6160:(e,t)=>{"use strict";function n(e){return Array.isArray(e)?e[1]:e}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSegmentValue",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},36146:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{NEXT_DYNAMIC_NO_SSR_CODE:function(){return n},throwWithNoSSR:function(){return i}});let n="NEXT_DYNAMIC_NO_SSR_CODE";function i(){let e=Error(n);throw e.digest=n,e}},9240:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{BA:()=>d,eJ:()=>l,es:()=>a,ko:()=>c});var r=n(97626),o=e([r]);r=(o.then?(await o)():o)[0];let d=e=>e?e.indexOf(".near")>-1?e:e.slice(0,6)+"..."+e.slice(-4):"-";function s(e){let t=e.split("."),n=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),i=t[1]?`.${t[1]}`:"";return n+i}let a=(e,t)=>(0,r.default)(e||0).eq(0)?"0":(0,r.default)(e).lt((0,r.default)(10).pow(-t))?`< ${(0,r.default)(10).pow(-t).toFixed(t)}`:parseFloat((0,r.default)(e).toFixed(t)),l=(e,t)=>(0,r.default)(e).eq(0)?"0":(0,r.default)(e).lt((0,r.default)(10).pow(-t))?`< ${(0,r.default)(10).pow(-t).toFixed(t)}`:s((0,r.default)(e).toFixed(t)),c=(e,t,n)=>{if((0,r.default)(e).eq(0))return n?"0":{integer:"0",decimal:""};if((0,r.default)(e).lt((0,r.default)(10).pow(-t)))return n?`< ${(0,r.default)(10).pow(-t).toFixed(t)}`:{integer:"",decimal:`< ${(0,r.default)(10).pow(-t).toFixed(t)}`};{let i=s((0,r.default)(e).toFixed(t));return n?`${i.split(".")[0]}.${i.split(".")[1]}`:{integer:i.split(".")[0],decimal:"."+i.split(".")[1]}}};i()}catch(e){i(e)}})},83110:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>h});var r=n(20997),o=n(66197),s=n(16689),d=n(6234),a=n(42601),l=n(67927),c=n(3251),p=n(42103),f=e([o,a,c]);[o,a,c]=f.then?(await f)():f;let h=(0,s.memo)(({loading:e,list:t,page:n,info:i,maxPage:s,userInfo:f,userRewardInfo:h,handlePageChange:g,handleRefresh:x})=>r.jsx(o.AnimatePresence,{mode:"wait",children:r.jsx(o.motion.div,{...d.nC,children:(0,r.jsxs)(p.PQ,{children:[(0,r.jsxs)(p.eb,{children:[r.jsx(p.X0,{children:"Leaderboard"}),(0,r.jsxs)(p.YX,{onClick:()=>{x()},children:[r.jsx(p.s8,{className:e&&"loading",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:r.jsx("path",{d:"M3.66135 8.30123C3.38153 9.3438 3.3632 10.4393 3.608 11.4906C3.8528 12.542 4.35316 13.5167 5.06474 14.3284C5.77633 15.1401 6.67716 15.7638 7.68741 16.1441C8.69766 16.5244 9.78613 16.6497 10.8564 16.5087C11.1011 16.4798 11.3474 16.5485 11.5419 16.6998C11.7364 16.8511 11.8635 17.0729 11.8957 17.3173C11.9279 17.5616 11.8626 17.8088 11.7139 18.0053C11.5653 18.2019 11.3452 18.332 11.1014 18.3675C9.72558 18.5486 8.32636 18.3877 7.02765 17.8989C5.72895 17.41 4.57085 16.6085 3.65595 15.5651C2.74106 14.5218 2.09761 13.2689 1.78261 11.9175C1.46762 10.5661 1.4908 9.15781 1.8501 7.81748L0.731352 7.51748C0.689922 7.50659 0.651985 7.48523 0.621182 7.45546C0.590379 7.42569 0.567743 7.38851 0.555445 7.34747C0.543147 7.30644 0.5416 7.26293 0.550952 7.22112C0.560304 7.17932 0.580242 7.14062 0.608852 7.10873L3.7176 3.60373C3.74833 3.56885 3.78818 3.54322 3.83266 3.52973C3.87715 3.51624 3.92452 3.51543 3.96944 3.52737C4.01437 3.53932 4.05508 3.56356 4.08699 3.59736C4.1189 3.63116 4.14076 3.67319 4.1501 3.71873L5.08885 8.30998C5.09726 8.35161 5.09493 8.3947 5.08207 8.43518C5.06921 8.47566 5.04625 8.5122 5.01535 8.54134C4.98445 8.57049 4.94664 8.59128 4.90548 8.60176C4.86432 8.61224 4.82117 8.61206 4.7801 8.60123L3.66135 8.30123ZM16.3376 11.7C16.6174 10.6574 16.6358 9.56192 16.391 8.51058C16.1462 7.45924 15.6458 6.48452 14.9342 5.6728C14.2226 4.86107 13.3218 4.23742 12.3115 3.8571C11.3013 3.47678 10.2128 3.35154 9.1426 3.49248C9.01971 3.51038 8.89449 3.50369 8.77421 3.47279C8.65393 3.44189 8.54099 3.3874 8.44194 3.31249C8.3429 3.23757 8.25972 3.14373 8.19725 3.0364C8.13477 2.92907 8.09425 2.8104 8.07802 2.68728C8.06179 2.56416 8.07018 2.43904 8.10271 2.3192C8.13524 2.19935 8.19126 2.08715 8.26751 1.98913C8.34377 1.89112 8.43873 1.80922 8.5469 1.74821C8.65506 1.6872 8.77427 1.64829 8.8976 1.63373C10.2734 1.45258 11.6726 1.61354 12.9713 2.10235C14.27 2.59117 15.4281 3.39275 16.343 4.43608C17.2579 5.47942 17.9013 6.7323 18.2163 8.08372C18.5313 9.43515 18.5082 10.8434 18.1489 12.1837L19.2676 12.4837C19.309 12.4946 19.347 12.516 19.3778 12.5458C19.4086 12.5755 19.4312 12.6127 19.4435 12.6537C19.4558 12.6948 19.4574 12.7383 19.448 12.7801C19.4387 12.8219 19.4187 12.8606 19.3901 12.8925L16.2814 16.3975C16.2506 16.4324 16.2108 16.458 16.1663 16.4715C16.1218 16.485 16.0744 16.4858 16.0295 16.4738C15.9846 16.4619 15.9439 16.4377 15.912 16.4039C15.8801 16.3701 15.8582 16.328 15.8489 16.2825L14.9101 11.6912C14.9017 11.6496 14.904 11.6065 14.9169 11.566C14.9297 11.5256 14.9527 11.489 14.9836 11.4599C15.0145 11.4307 15.0523 11.4099 15.0935 11.3995C15.1346 11.389 15.1778 11.3892 15.2189 11.4L16.3376 11.7Z",fill:"#979ABE"})})}),r.jsx("span",{children:"Update every 15 mins"})]})]}),r.jsx(c.Z,{info:i}),f.address&&r.jsx(p.cp,{children:l.L.map(e=>(0,r.jsxs)(p.ji,{$width:e.width,$gap:e.gap,$align:e.align,children:["rank"===e.key&&`#${h.rank}`,"user"===e.key&&r.jsx(a.n5,{user:f.address,avatar:f.avatar}),"pts"===e.key&&r.jsx(a.LD,{pts:h.reward_rank})]},e.key))}),r.jsx(a.ZP,{list:t,maxPage:s,page:n,handlePageChange:g,loading:e})]})})}));i()}catch(e){i(e)}})},42103:(e,t,n)=>{"use strict";n.d(t,{PQ:()=>s,X0:()=>d,YX:()=>l,cp:()=>c,eb:()=>a,ji:()=>o.ji,s8:()=>p});var i=n(57518),r=n.n(i),o=n(48664);let s=r().div.withConfig({componentId:"sc-8cb4a95c-0"})`
  width: 100%;
  margin-top: 40px;
  border-radius: 32px;
  border: 1px solid #32353f;
  background: #21232a;
  padding: 40px 0px;
`,d=r().div.withConfig({componentId:"sc-8cb4a95c-1"})`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`,a=r().div.withConfig({componentId:"sc-8cb4a95c-2"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 22px 0px 49px;
`,l=r().div.withConfig({componentId:"sc-8cb4a95c-3"})`
  border-radius: 32px;
  border: 1px solid #373a53;
  width: 210px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`,c=r().div.withConfig({componentId:"sc-8cb4a95c-4"})`
  padding-left: 21px;
  padding-right: 41px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  height: 50px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  margin: 27px 40px 0px;
`,p=r().span.withConfig({componentId:"sc-8cb4a95c-5"})`
  &.loading {
    animation: loading 1s linear infinite;
    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`},67927:(e,t,n)=>{"use strict";n.d(t,{L:()=>i,M:()=>r});let i=[{label:"Rank",width:20,key:"rank",gap:10},{label:"Address",width:60,key:"user",align:"left",gap:9},{label:"PTS",width:20,key:"pts",align:"right",gap:6}],r={1:["#FFEE98","#E9AE45"],2:["#D8E7FF","#85628A"],3:["#E7BA9A","#805F48"]}},42601:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{LD:()=>g,ZP:()=>x,n5:()=>h});var r=n(20997),o=n(16689),s=n(63658),d=n(2925),a=n(21004),l=n(67927),c=n(48664),p=e([a]);a=(p.then?(await p)():p)[0];let f=({rank:e})=>(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.Pl,{children:e<4&&(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25",height:"25",viewBox:"0 0 25 25",fill:"none",children:[r.jsx("path",{d:"M20.6407 15.1593C21.6627 17.5953 22.6468 20.0472 23.5925 22.5139C23.3842 22.7102 23.3333 22.8241 23.2305 22.8639C23.1815 22.8823 23.1273 22.8807 23.0795 22.8593L18.4388 20.7852L16.3842 24.4796C16.3406 24.5578 16.2753 24.6217 16.1961 24.6636C16.117 24.7054 16.0274 24.7234 15.9382 24.7154C15.8491 24.7073 15.7641 24.6736 15.6937 24.6183C15.6233 24.563 15.5705 24.4884 15.5416 24.4037L13.6842 18.9352C16.6657 19.1222 18.9833 17.8639 20.6407 15.1593ZM4.36844 15.1C5.97955 17.8537 8.29529 19.1315 11.3157 18.9352L9.45825 24.4037C9.42935 24.4884 9.37651 24.563 9.30611 24.6183C9.23571 24.6736 9.15079 24.7073 9.06162 24.7154C8.97245 24.7234 8.88287 24.7054 8.80371 24.6636C8.72456 24.6217 8.65924 24.5578 8.61566 24.4796L6.56011 20.7852L1.9277 22.8565C1.8773 22.879 1.82006 22.8806 1.76844 22.8611C1.66011 22.8204 1.60548 22.7 1.40918 22.5019C2.21844 20.3565 3.20455 17.8889 4.36844 15.1ZM12.3194 0C17.0944 0 20.9666 3.9287 20.9666 8.77407C20.9666 13.6204 17.0944 17.5481 12.3184 17.5481C7.54344 17.5481 3.67214 13.6204 3.67214 8.77407C3.67214 3.9287 7.54344 0 12.3194 0ZM11.9462 3.55556L11.9027 3.62685L10.5805 6.34537L7.60918 6.78333C7.53096 6.79476 7.45697 6.82601 7.39426 6.87413C7.33155 6.92225 7.2822 6.98562 7.25092 7.05821C7.21963 7.13081 7.20746 7.2102 7.21555 7.28883C7.22364 7.36746 7.25173 7.44271 7.29714 7.50741L7.35177 7.5713L9.50548 9.70093L8.99899 12.7009C8.9857 12.7793 8.99278 12.8597 9.01956 12.9345C9.04634 13.0093 9.09192 13.0759 9.15191 13.128C9.2119 13.1801 9.28428 13.2158 9.36209 13.2319C9.43991 13.2479 9.52053 13.2436 9.59622 13.2194L9.67307 13.187L12.3194 11.7759L14.9657 13.187C15.0357 13.2243 15.1141 13.243 15.1935 13.2413C15.2728 13.2395 15.3504 13.2174 15.4187 13.1771C15.487 13.1367 15.5438 13.0795 15.5837 13.0109C15.6235 12.9422 15.6451 12.8645 15.6462 12.7852L15.6397 12.7019L15.1323 9.70185L17.287 7.5713C17.3433 7.51581 17.3845 7.44683 17.4066 7.37091C17.4287 7.29499 17.431 7.21468 17.4133 7.13762C17.3955 7.06056 17.3584 6.98933 17.3053 6.93072C17.2522 6.8721 17.185 6.82806 17.1101 6.80278L17.0286 6.78426L14.0583 6.34537L12.7351 3.62685C12.7002 3.55529 12.6474 3.49395 12.5818 3.44876C12.5162 3.40357 12.4401 3.37606 12.3608 3.36889C12.2814 3.36172 12.2016 3.37514 12.129 3.40784C12.0564 3.44054 11.9934 3.49141 11.9462 3.55556Z",fill:`url(#paint0_linear_928_6455_${e})`}),r.jsx("defs",{children:(0,r.jsxs)("linearGradient",{id:`paint0_linear_928_6455_${e}`,x1:"12.5008",y1:"0",x2:"12.5008",y2:"24.7172",gradientUnits:"userSpaceOnUse",children:[r.jsx("stop",{stopColor:l.M[e][0]}),r.jsx("stop",{offset:"1",stopColor:l.M[e][1]})]})})]})}),r.jsx("span",{children:e})]}),h=({user:e,avatar:t})=>(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.vu,{src:t}),r.jsx("span",{children:(0,d.Kq)(e)})]}),g=({pts:e})=>(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.Vs,{$size:21}),r.jsx("span",{children:(0,a.EO)(e,1)})]}),x=(0,o.memo)(({list:e,maxPage:t,page:n,handlePageChange:i,loading:o})=>(0,r.jsxs)(c.PQ,{children:[r.jsx(c.eb,{children:l.L.map(e=>r.jsx(c.qj,{$width:e.width,$align:e.align,children:e.label},e.key))}),o?r.jsx(c.u,{children:r.jsx(s.Z,{size:60})}):e.length>0?(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.vc,{children:e.map(e=>r.jsx(c.N0,{children:l.L.map(t=>(0,r.jsxs)(c.ji,{$width:t.width,$gap:t.gap,$align:t.align,children:["rank"===t.key&&r.jsx(f,{rank:e.rank}),"user"===t.key&&r.jsx(h,{user:e.account.address,avatar:e.account.avatar}),"pts"===t.key&&r.jsx(g,{pts:e.reward})]},t.key))},e.rank))}),(0,r.jsxs)(c._3,{children:[(0,r.jsxs)(c.SG,{children:["Page ",n," of ",t]}),(0,r.jsxs)(c.fL,{children:[r.jsx(c.UA,{$disabled:1===n,onClick:()=>{n>1&&i(-1)},children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:r.jsx("path",{d:"M9 1L2 8L9 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})})}),r.jsx(c.UA,{$disabled:n===t,onClick:()=>{t>n&&i(1)},children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:r.jsx("path",{d:"M1 1L8 8L1 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})})})]})]})]}):r.jsx(c.HY,{children:"No Data"})]}));i()}catch(e){i(e)}})},48664:(e,t,n)=>{"use strict";n.d(t,{HY:()=>o.HY,N0:()=>a,PQ:()=>d,Pl:()=>h,SG:()=>u,UA:()=>m,Vs:()=>s.Vs,_3:()=>x,eb:()=>p,fL:()=>b,ji:()=>l,qj:()=>c,u:()=>o.u,vc:()=>f,vu:()=>g});var i=n(57518),r=n.n(i),o=n(4655),s=n(44945);let d=r().div.withConfig({componentId:"sc-c27fbb06-0"})`
  padding-top: 20px;
`,a=r().div.withConfig({componentId:"sc-c27fbb06-1"})`
  padding-left: 62px;
  padding-right: 80px;
  display: flex;
  align-items: center;
  height: 55px;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    background: rgba(55, 58, 83, 0.2);
  }
`,l=r().div.withConfig({componentId:"sc-c27fbb06-2"})`
  display: flex;
  align-items: center;
  gap: ${({$gap:e})=>e+"px"};
  width: ${({$width:e})=>e+"%"};
  justify-content: ${({$align:e})=>"left"===e?"flex-start":"right"===e?"flex-end":e};
`,c=r().div.withConfig({componentId:"sc-c27fbb06-3"})`
  width: ${({$width:e})=>e+"%"};
  text-align: ${({$align:e})=>e};
`,p=r().div.withConfig({componentId:"sc-c27fbb06-4"})`
  display: flex;
  align-items: center;
  padding-left: 62px;
  padding-right: 80px;
  color: #979abe;
  font-size: 18px;
  font-weight: 400;
  height: 55px;
`,f=r().div.withConfig({componentId:"sc-c27fbb06-5"})``,h=r().div.withConfig({componentId:"sc-c27fbb06-6"})`
  width: 25px;
  height: 25px;
  margin-top: -7px;
`,g=r().img.withConfig({componentId:"sc-c27fbb06-7"})`
  width: 26px;
  height: 26px;
`,x=r().div.withConfig({componentId:"sc-c27fbb06-8"})`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 80px;
  gap: 22px;
  margin-top: 20px;
`,u=r().div.withConfig({componentId:"sc-c27fbb06-9"})`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
`,b=r().div.withConfig({componentId:"sc-c27fbb06-10"})`
  display: flex;
  align-items: center;
  gap: 10px;
`,m=r().div.withConfig({componentId:"sc-c27fbb06-11"})`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #282d36;
  width: 55px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({$disabled:e})=>e?`
        opacity: 0.4;
      `:`cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(55, 58, 83, 0.5);
  }
  &:active {
    opacity: 0.4;
  }`}
`},3251:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var r=n(20997),o=n(16689),s=n(9240),d=n(36321),a=e([s]);s=(a.then?(await a)():a)[0];let l=(0,o.memo)(({info:e={}})=>(0,r.jsxs)(d.W5,{children:[(0,r.jsxs)(d.Ub,{children:[r.jsx(d.JU,{children:"Total PTS"}),(0,r.jsxs)(d.sp,{children:[r.jsx(d.Vs,{$size:21}),r.jsx("span",{children:(0,s.eJ)(e.total_reward||0,0)})]})]}),(0,r.jsxs)(d.Ub,{children:[r.jsx(d.JU,{children:"Total Users"}),(0,r.jsxs)(d.sp,{children:[r.jsx(d.Yw,{$size:15}),r.jsx("span",{children:(0,s.eJ)(e.total_users||0,0)})]})]}),(0,r.jsxs)(d.Ub,{children:[r.jsx(d.JU,{children:"Total quest execution"}),(0,r.jsxs)(d.sp,{children:[r.jsx(d.Et,{$size:24}),r.jsx("span",{children:(0,s.eJ)(e.total_quest_execution||0,0)})]})]})]}));i()}catch(e){i(e)}})},36321:(e,t,n)=>{"use strict";n.d(t,{Et:()=>s.Et,JU:()=>l,Ub:()=>a,Vs:()=>o.Vs,W5:()=>d,Yw:()=>s.Yw,sp:()=>c});var i=n(57518),r=n.n(i),o=n(44945),s=n(6578);let d=r().div.withConfig({componentId:"sc-dd082b1f-0"})`
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 28px;
  flex-wrap: nowrap;
  padding: 0px 40px;
`,a=r().div.withConfig({componentId:"sc-dd082b1f-1"})`
  flex-grow: 1;
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #2c2e3e;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`,l=r().div.withConfig({componentId:"sc-dd082b1f-2"})`
  color: #979abe;
  font-size: 18px;
  font-weight: 400;
`,c=r().div.withConfig({componentId:"sc-dd082b1f-3"})`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`},51394:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var i=n(16689),r=n(42501),o=n(78579);function s(){let[e,t]=(0,i.useState)([]),[n,s]=(0,i.useState)(!1),[d,a]=(0,i.useState)(1),[l,c]=(0,i.useState)(1),[p,f]=(0,i.useState)(),h=(0,i.useRef)(),g=(0,i.useCallback)(async e=>{if(!n){s(!0);try{let n=await (0,o.U2)(`${r.h}/api/quest/leaderboard?page=${e||d}&page_size=10`),i=n.data.data||[];t(i),s(!1),e&&a(e),c(n.data.total_page),f({total_reward:n.data.total_reward,total_users:n.data.total_users,total_quest_execution:n.data.total_quest_execution}),clearTimeout(h.current),h.current=setTimeout(()=>{g()},9e5)}catch(e){s(!1)}}},[n,d]),x=(0,i.useCallback)(e=>{let t=d+e;g(t)},[d]),u=(0,i.useCallback)(()=>{g(1)},[]);return(0,i.useEffect)(()=>{g(1)},[]),{loading:n,list:e,page:d,info:p,maxPage:l,handlePageChange:x,handleRefresh:u}}},6578:(e,t,n)=>{"use strict";n.d(t,{Et:()=>d,PQ:()=>s,SD:()=>o,Yw:()=>a});var i=n(57518),r=n.n(i);let o=r().div.withConfig({componentId:"sc-bedd96c0-0"})``,s=r().div.withConfig({componentId:"sc-bedd96c0-1"})`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`,d=r().div.withConfig({componentId:"sc-bedd96c0-2"})`
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>.6486*e}px;
  background-image: url(/images/quest/fist.png);
  background-size: 100%;
  background-repeat: no-repeat;
`,a=r().div.withConfig({componentId:"sc-bedd96c0-3"})`
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>1.53333*e}px;
  background-image: url(/images/quest/person.png);
  background-size: 100%;
  background-repeat: no-repeat;
`},58541:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>b});var r=n(20997),o=n(11163),s=n(16689),d=n(53015),a=n(63658),l=n(34675),c=n(18607),p=n(10268),f=e([d,l,c]);[d,l,c]=f.then?(await f)():f;let h=r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"12",viewBox:"0 0 18 12",children:r.jsx("path",{d:"M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"})}),g=r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:r.jsx("path",{d:"M9 1L2 8L9 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})}),x=r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:r.jsx("path",{d:"M1 1L8 8L1 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})}),u=function({campaign:e,bp:t}){let n=(0,o.useRouter)(),{loading:i,questList:a}=(0,c.Z)(e.id),f=(0,s.useRef)(null),u=function(e,t){e.stopPropagation(),"prev"===t?f.current&&f.current.slidePrev():f.current&&f.current.slideNext()};return(0,r.jsxs)(p.GC,{onClick:function(t){"bns"===e.category?n.push("/quest/leaderboard/DapDapXBNS"):"Shush"===e.category?n.push({pathname:"/shush"}):n.push("/quest/leaderboard/"+e.name.replace(/\s/g,""))},children:[(0,r.jsxs)(p.SD,{style:{flex:1},children:[r.jsx(p.qY,{$size:"32px",$weight:"700",$line:"120%",children:e.name}),r.jsx(p.qY,{$size:"14px",$line:"150%",$lineClamp:3,className:"ellipsis",style:{marginTop:20,marginBottom:20},children:e.description}),r.jsx(p.Sn,{$width:"75px",$height:"30px",$background:"rgba(0, 0, 0, 0.30)",$borderColor:"rgba(255, 255, 255, 0.15)",style:{marginBottom:19},children:(0,r.jsxs)(p.qY,{$size:"14px",$weight:"500",children:[e.quests.total," Quests"]})}),r.jsx(p.vW,{children:(0,r.jsxs)(p.G,{$gap:"9px",children:[r.jsx(p.qY,{$size:"16px",$weight:"700",children:"Explore now"}),r.jsx(p.Ld,{children:h})]})})]}),(0,r.jsxs)(p.SD,{style:{width:889},children:[r.jsx(d.Swiper,{width:402,spaceBetween:15,slidesPerView:1,onSwiper:e=>{f.current=e},children:a.map((e,n)=>r.jsx(d.SwiperSlide,{children:r.jsx(l.Z,{quest:e,bp:t})},n))}),(0,r.jsxs)(p.G,{$justify:"flex-end",$gap:"18px",style:{position:"absolute",right:0,bottom:28,height:50,zIndex:10,paddingRight:24},children:[r.jsx(p.Sn,{$width:"36px",$height:"36px",$background:"#393A4C",onClick:e=>u(e,"prev"),children:g}),r.jsx(p.Sn,{$width:"36px",$height:"36px",$background:"#393A4C",onClick:e=>u(e,"next"),children:x})]})]})]})},b=(0,s.memo)(({campaigns:e,loading:t,bp:n})=>(0,r.jsxs)(p.PQ,{children:[r.jsx(p.eb,{style:{marginTop:50,marginBottom:17},children:"Journeys"}),t?r.jsx(p.ZY,{children:r.jsx(a.Z,{size:60})}):r.jsx(p.G,{$gap:"50px",children:e.map((e,t)=>r.jsx(u,{campaign:e,bp:n},t))})]}));i()}catch(e){i(e)}})},10268:(e,t,n)=>{"use strict";n.d(t,{G:()=>o.G,GC:()=>a,Ld:()=>o.Ld,PQ:()=>s,SD:()=>o.SD,Sn:()=>o.Sn,ZY:()=>o.ZY,eb:()=>d,qY:()=>o.qY,vW:()=>l});var i=n(57518),r=n.n(i);n(44945);var o=n(24875);let s=r().div.withConfig({componentId:"sc-7163dbbe-0"})`
`,d=r().div.withConfig({componentId:"sc-7163dbbe-1"})`
  color: #FFF;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`;r().div.withConfig({componentId:"sc-7163dbbe-2"})`
  font-size: 20px;
  font-weight: 700;
  line-height: 120%;
  margin-top: 20px;
`,r().div.withConfig({componentId:"sc-7163dbbe-3"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 244px;
`,r().div.withConfig({componentId:"sc-7163dbbe-4"})`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,r().div.withConfig({componentId:"sc-7163dbbe-5"})`
  margin-top: 14px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;let a=r().div.withConfig({componentId:"sc-7163dbbe-6"})`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 35px;
  padding: 30px 0 30px 30px;
  min-height: 300px;
  border-radius: 20px;
  border: 1px solid #32353F;
  background: #21232A;
`,l=r().div.withConfig({componentId:"sc-7163dbbe-7"})`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 227px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #979ABE;
  fill: white;
  &:hover {
    border: none;
    background: linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%);
    fill: black;
    ${o.qY} {
      color: black;
    }
  }
`},93701:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>j});var r=n(20997),o=n(11163),s=n(16689),d=n(53015),a=n(63658),l=n(34675),c=n(32245),p=n(18607),f=n(92006),h=n(30886),g=e([d,l,p,h]);[d,l,p,h]=g.then?(await g)():g;let x=r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:r.jsx("path",{d:"M9 1L2 8L9 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})}),u=r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:r.jsx("path",{d:"M1 1L8 8L1 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})}),b=r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"12",viewBox:"0 0 18 12",fill:"none",children:r.jsx("path",{d:"M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z",fill:"#1E2028"})}),m=({campaign:e,categories:t,bp:n})=>{let i=(0,o.useRouter)();return r.jsx(h.au,{onClick:function(t){t.stopPropagation(),i.push("/quest/leaderboard/"+e.name.replace(/\s/g,""))},children:(0,r.jsxs)(h.G,{$direction:"column",$align:"flex-start",children:[(0,r.jsxs)(h.G,{$align:"flex-start",$justify:"space-between",children:[(0,r.jsxs)(h.SD,{style:{width:665},children:[r.jsx(h.eb,{children:r.jsx(h.X0,{children:e.name})}),r.jsx(h.yG,{children:e.description})]}),(0,r.jsxs)(h.Sn,{$width:"506px",$height:"auto",$background:"#2C2E3E",$borderRadius:"33px",style:{paddingTop:8,paddingRight:8,paddingBottom:8,paddingLeft:40},children:[(0,r.jsxs)(h.F8,{children:[e.start_time>Date.now()&&r.jsx("div",{children:"Upcoming"}),e.start_time>Date.now()?r.jsx(f.Z,{endTime:Number(e.start_time)}):r.jsx(f.Z,{endTime:Number(e.end_time)})]}),(0,r.jsxs)(h.Sn,{style:{marginLeft:48},$width:"227px",$borderRadius:"27px",$background:"linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)",children:[r.jsx(h.qY,{$color:"#02051E",$size:"16px",$weight:"700",children:"Explore now"}),r.jsx(h.Ld,{style:{marginLeft:9},children:b})]})]})]}),(0,r.jsxs)(h.e2,{children:[(0,r.jsxs)(h.w5,{style:{padding:"0px 10px 0px 6px"},children:[r.jsx(h.Vs,{$size:20}),(0,r.jsxs)("span",{style:{color:"#EBF479"},children:["Extra ",e.reward," PTS"]})]}),(0,r.jsxs)(h.w5,{children:[(0,r.jsxs)("span",{children:[e.quests.total," Quests:"]}),e.quests.total_category.sort((e,t)=>e.quest_category_id-t.quest_category_id).map(({total:e,quest_category_id:n})=>(0,r.jsxs)("span",{style:{color:`var(--${t[n]?.name}-color`},children:[e," #",t[n]?.name]},n))]}),(0,r.jsxs)(h.w5,{children:[(0,c.fD)(e.start_time,e.end_time)," UTC"]})]})]})})},w=({questList:e,bp:t})=>{let n=(0,s.useRef)(null),i=function(e,t){e.stopPropagation(),"prev"===t?n.current&&n.current.slidePrev():n.current&&n.current.slideNext()};return(0,r.jsxs)(h.sl,{children:[r.jsx(d.Swiper,{width:402,spaceBetween:15,slidesPerView:1,slidesPerGroupSkip:3,onSwiper:e=>{n.current=e},children:e.map((e,n)=>r.jsx(d.SwiperSlide,{children:r.jsx(l.Z,{quest:e,bp:t})},n))}),r.jsx(h.CV,{onClick:e=>i(e,"prev"),children:x}),r.jsx(h.CV,{className:"right",onClick:e=>i(e,"next"),children:u})]})},C=({campaign:e,categories:t,bp:n})=>{let{loading:i,questList:o}=(0,p.Z)(e.id);return i?r.jsx(h.ZY,{children:r.jsx(a.Z,{size:60})}):(0,r.jsxs)(h.YF,{"data-bp":n?.wrap,children:[r.jsx(m,{campaign:e,categories:t}),r.jsx(w,{questList:o,bp:n?.card})]})},j=(0,s.memo)(({onLoad:e,campaigns:t,categories:n,bp:i})=>(0,r.jsxs)(h.fJ,{children:[r.jsx(h.eb,{style:{marginTop:40,marginBottom:20},children:"Quests Campaign"}),r.jsx(h.G,{$direction:"column",$gap:"30px",children:t.length?t.map(e=>r.jsx(C,{campaign:e,categories:n,bp:i},e.id)):r.jsx("div",{style:{padding:20,fontSize:18,color:"rgb(151, 154, 190)"},children:"More Quests are coming soon,stay tuned..."})})]}));i()}catch(e){i(e)}})},30886:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{CV:()=>w,F8:()=>b,G:()=>a.G,Ld:()=>a.Ld,SD:()=>a.SD,Sn:()=>a.Sn,Vs:()=>d.Vs,X0:()=>d.X0,YF:()=>p,ZY:()=>a.ZY,au:()=>f,e2:()=>x,eb:()=>h,fJ:()=>c,qY:()=>a.qY,sl:()=>m,w5:()=>u,yG:()=>g});var r=n(66197),o=n(57518),s=n.n(o),d=n(44945),a=n(24875),l=e([r]);r=(l.then?(await l)():l)[0];let c=s().div.withConfig({componentId:"sc-561eb3bc-0"})`
  display: flex;
  flex-direction: column;
`,p=s().div.withConfig({componentId:"sc-561eb3bc-1"})`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 32px;
  padding: 30px 0 40px;
  background: radial-gradient(100% 100% at 0% 0%, #ae92ff 0%, #6d2df3 100%);
`,f=s().div.withConfig({componentId:"sc-561eb3bc-2"})`
  padding: 0 30px;
  box-sizing: border-box;
  /* display: flex;
  justify-content: space-between; */
  /* align-items: center; */
`;s().div.withConfig({componentId:"sc-561eb3bc-3"})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let h=s().div.withConfig({componentId:"sc-561eb3bc-4"})`
  color: #fff;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 31.2px */
  text-transform: capitalize;
`;s()(r.motion.div).withConfig({componentId:"sc-561eb3bc-5"})`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  width: 41px;
  height: 30px;
  text-align: center;
  padding-top: 2px;
  cursor: pointer;

  ${({$active:e})=>e&&`
  border: 1px solid rgba(255, 107, 142, 0.30);
  background: rgba(255, 107, 142, 0.15);`}
`;let g=s().div.withConfig({componentId:"sc-561eb3bc-6"})`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
`,x=s().div.withConfig({componentId:"sc-561eb3bc-7"})`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`,u=s().div.withConfig({componentId:"sc-561eb3bc-8"})`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;s().div.withConfig({componentId:"sc-561eb3bc-9"})`
  display: flex;
  align-items: center;
  gap: 9px;
  align-self: flex-end;
`,s().div.withConfig({componentId:"sc-561eb3bc-10"})`
  display: flex;
  align-items: center;
  gap: -6px;
`,s().div.withConfig({componentId:"sc-561eb3bc-11"})`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;let b=s().div.withConfig({componentId:"sc-561eb3bc-12"})`
  display: flex;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  gap: 20px;
`,m=s().div.withConfig({componentId:"sc-561eb3bc-13"})`
  position: relative;
  padding-left: 31px;

  .swiper {
    overflow: hidden;
  }
`,w=s().div.withConfig({componentId:"sc-561eb3bc-14"})`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10px;
  top: 76px;
  width: 36px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #393a4c;
  z-index: 10;
  &.right {
    left: unset;
    right: 10px;
  }
`;s().div.withConfig({componentId:"sc-561eb3bc-15"})`
  color: #979abe;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 50px 0 40px;
`,i()}catch(e){i(e)}})},79044:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>h});var r=n(20997),o=n(63658),s=n(6234),d=n(66197),a=n(16689),l=n(58541),c=n(93701),p=n(61239),f=e([d,l,c]);[d,l,c]=f.then?(await f)():f;let h=(0,a.memo)(({onLoad:e,id:t,campaignLoading:n,campaigns:i,questingLoading:a,quests:f,categoryLoading:h,categories:g,userInfo:x,loading:u})=>r.jsx(d.AnimatePresence,{mode:"wait",children:r.jsx(d.motion.div,{...s.nC,children:n||h?r.jsx(p.Z,{children:r.jsx(o.Z,{size:60})}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.Z,{onLoad:e,loading:n,campaigns:i.filter(e=>!e.category),categoryLoading:h,categories:g,bp:{wrap:"10015-003",card:"100151-001"}}),r.jsx(l.Z,{onLoad:e,loading:n,campaigns:i.filter(e=>e.category),categoryLoading:h,categories:g,bp:"10015-004"})]})})}));i()}catch(e){i(e)}})},61239:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i.ZY});var i=n(24875)},86092:(e,t,n)=>{"use strict";n.d(t,{Z:()=>h});var i=n(20997),r=n(11163),o=n(16689),s=n(57518),d=n.n(s);let a=d().div.withConfig({componentId:"sc-273b9bf1-0"})`
  width: 100%;
  height: 320px;
  position: relative;
  margin-bottom: 60px;
`,l=d().div.withConfig({componentId:"sc-273b9bf1-1"})`
  position: absolute;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #282d36;
  width: 36px;
  height: 44px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  top: calc(50% - 22px);

  ${({$disabled:e})=>e?`
        opacity: 0.4;
      `:`cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }`}
`,c=d().div.withConfig({componentId:"sc-273b9bf1-2"})`
  display: flex;
  flex-wrap: nowrap;
  transition: 0.3s;
  overflow: hidden;
`,p=d().img.withConfig({componentId:"sc-273b9bf1-3"})`
  border-radius: 32px;
  width: 100%;
  height: 320px;
  cursor: pointer;
`,f=d().div.withConfig({componentId:"sc-273b9bf1-4"})`
  width: 100%;
  overflow: hidden;
`,h=(0,o.memo)(({banners:e,bp:t})=>{let[n,s]=(0,o.useState)(0),d=(0,r.useRouter)(),h=(0,o.useRef)(),g=function(){h.current=setInterval(()=>{s(t=>t>e.length-2?0:t+1)},3e3)};return(0,o.useEffect)(()=>(g(),function(){h.current&&clearInterval(h.current)}),[]),(0,i.jsxs)(a,{children:[i.jsx(l,{$disabled:0===n,onClick:()=>{n>0&&s(n-1)},style:{left:"-18px"},children:i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:i.jsx("path",{d:"M9 1L2 8L9 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})})}),i.jsx(f,{children:i.jsx(c,{style:{width:100*e.length+"%",transform:`translateX(-${n*(100/e.length)}%)`},children:e.map(e=>i.jsx(p,{src:e.banner,onClick:()=>{if(e.link){if(e.link.includes("http")){window.open(e.link,"_blank");return}d.push(e.link)}},"data-bp":t},e.banner))})}),i.jsx(l,{$disabled:n===e.length-1,onClick:()=>{n<e.length-1&&s(n+1)},style:{right:"-18px"},children:i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:i.jsx("path",{d:"M1 1L8 8L1 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})})})]})})},56024:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>c});var r=n(20997),o=n(66197),s=n(16689),d=n(15071),a=e([o]);o=(a.then?(await a)():a)[0];let l=[{name:"Quests",key:"quests"},{name:"Leaderboard",key:"leaderboard"}],c=(0,s.memo)(({current:e,onChange:t,bp:n})=>r.jsx(d.Yt,{$width:500,children:l.map((i,s)=>(0,r.jsxs)(d.sI,{onClick:()=>{t(i.key)},"data-bp":n,children:[(0,r.jsxs)(d.iC,{$active:e===i.key,children:["quests"===i.key&&r.jsx(d.Et,{$size:37}),"leaderboard"===i.key&&r.jsx(d.Vs,{$size:34}),r.jsx("span",{children:i.name})]}),e===i.key&&r.jsx(o.motion.div,{initial:"hidden",animate:"show",variants:{hidden:{x:0===s?"50%":"-50%"},show:{x:"0%",transition:{staggerChildren:.5}}},children:r.jsx(d.sg,{})})]},i.key))}));i()}catch(e){i(e)}})},15071:(e,t,n)=>{"use strict";n.d(t,{Et:()=>s.Et,Vs:()=>o.Vs,Yt:()=>d,iC:()=>l,sI:()=>a,sg:()=>c});var i=n(57518),r=n.n(i),o=n(44945),s=n(6578);let d=r().div.withConfig({componentId:"sc-1b5e3432-0"})`
  display: flex;
  align-items: center;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #21242a;
  width: ${({$width:e})=>e}px;
  height: 66px;
  padding: 8px;
  box-sizing: border-box;
  margin: 0 auto;
`,a=r().div.withConfig({componentId:"sc-1b5e3432-1"})`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  cursor: pointer;
  position: relative;
`,l=r().div.withConfig({componentId:"sc-1b5e3432-2"})`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: ${({$active:e})=>e?"#1e2028":"#fff"};
  height: 50px;
  position: relative;
  z-index: 10;
`,c=r().div.withConfig({componentId:"sc-1b5e3432-3"})`
  position: absolute;
  border-radius: 30px;
  height: 50px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 100%;
  top: -50px;
`},92006:(e,t,n)=>{"use strict";n.d(t,{Z:()=>h});var i=n(20997),r=n(16689),o=n(52504),s=n(32245),d=n(57518),a=n.n(d);let l=a().div.withConfig({componentId:"sc-1e821b3b-0"})`
  display: flex;
  gap: 3px;
`,c=a().div.withConfig({componentId:"sc-1e821b3b-1"})`
  display: flex;
  flex-direction: column;
`,p=a().div.withConfig({componentId:"sc-1e821b3b-2"})`
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  line-height: normal;
`,f=a().div.withConfig({componentId:"sc-1e821b3b-3"})`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  width: 34px;
  line-height: normal;
`,h=(0,r.memo)(({endTime:e})=>{let[t,n]=(0,r.useState)(!1),{secondsRemaining:d}=(0,o.Z)(e/1e3),a=(0,s.$z)(d);return(0,r.useEffect)(()=>{n(!0)},[]),t?(0,i.jsxs)(l,{children:[(0,i.jsxs)(c,{children:[i.jsx(p,{children:(0,s.B0)(a.days)}),i.jsx(f,{children:"Days"})]}),i.jsx(c,{children:i.jsx(p,{children:":"})}),(0,i.jsxs)(c,{children:[i.jsx(p,{children:(0,s.B0)(a.hours)}),i.jsx(f,{children:"Hours"})]}),i.jsx(c,{children:i.jsx(p,{children:":"})}),(0,i.jsxs)(c,{children:[i.jsx(p,{children:(0,s.B0)(a.minutes)}),i.jsx(f,{children:"Mins"})]}),i.jsx(c,{children:i.jsx(p,{children:":"})}),(0,i.jsxs)(c,{children:[i.jsx(p,{children:(0,s.B0)(a.seconds)}),i.jsx(f,{children:"sec"})]})]}):i.jsx("div",{})})},18607:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>p});var r=n(16689),o=n(42501),s=n(22107),d=n(8433),a=n(59397),l=n(78579),c=e([d,a,s]);function p(e){let[t,n]=(0,r.useState)([]),[i,c]=(0,r.useState)(!1),{account:p}=(0,d.Z)(),{check:f}=(0,a.Z)({isNeedAk:!0,isQuiet:!0}),h=(0,r.useCallback)(async()=>{if(!i){c(!0);try{let t=await (0,l.U2)(`${o.h}/api/quest/list?campaign_id=${e}`),i=t.data;n(i?i.sort((e,t)=>e.quest_category_id-t.quest_category_id):[]),c(!1)}catch(e){c(!1)}}},[i,e]),{run:g}=(0,s.Z)(()=>{if(!p){h();return}f(h)},{wait:t.length?800:3e3});return(0,r.useEffect)(()=>{e&&g()},[e,p]),{loading:i,questList:t}}[d,a,s]=c.then?(await c)():c,i()}catch(e){i(e)}})},85565:(e,t,n)=>{"use strict";n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>w});var r=n(20997),o=n(16689),s=n(82361),d=n(3896),a=n(18607),l=n(83110),c=n(51394),p=n(36304),f=n(79240),h=n(80727),g=n(79044),x=n(86092),u=n(56024),b=n(24875),m=e([a,l,p,f,h,g,u]);[a,l,p,f,h,g,u]=m.then?(await m)():m;let w=(0,o.memo)(e=>{let[t,n]=(0,o.useState)("quests"),[i,m]=(0,o.useState)(),{loading:w,list:C,page:j,info:y,maxPage:v,handlePageChange:$,handleRefresh:k}=(0,c.Z)(),L=(0,p.L)(e=>e.user),{info:I,queryUserReward:_}=(0,f.Z)(),{loading:S,campaigns:E}=(0,s.Z)(),{loading:z,questList:Z}=(0,a.Z)(i),{loading:P,categories:M}=(0,d.Z)(),q=(0,o.useMemo)(()=>E.length?E.filter(e=>e.banner).map(e=>({banner:e.banner,link:e.link})):[],[E]);return(0,r.jsxs)(b.PQ,{children:[r.jsx(h.Z,{info:I}),!!q.length&&r.jsx(x.Z,{banners:q,bp:"10015-001"}),r.jsx(u.Z,{current:t,onChange:e=>{n(e)},bp:"10015-002"}),"leaderboard"===t&&r.jsx(l.Z,{loading:w,list:C,page:j,info:y,maxPage:v,userInfo:L,userRewardInfo:I,handlePageChange:$,handleRefresh:()=>{k(),_()}}),"quests"===t&&r.jsx(g.Z,{campaignLoading:S,campaigns:E,questingLoading:z,quests:Z,categoryLoading:P,categories:M,userInfo:L,onLoad:e=>{m(e)}})]})});i()}catch(e){i(e)}})},24875:(e,t,n)=>{"use strict";n.d(t,{BL:()=>b,Cp:()=>s,G:()=>L,HF:()=>d,I2:()=>w,Ld:()=>$,PO:()=>h,PQ:()=>j,QL:()=>u,SD:()=>C,Sn:()=>I,TB:()=>c,Uz:()=>o,YZ:()=>x,Yo:()=>v,ZC:()=>f,ZD:()=>p,ZY:()=>y,b7:()=>l,dx:()=>m,ic:()=>k,qY:()=>_,ry:()=>g,sd:()=>a});var i=n(57518),r=n.n(i);r().div.withConfig({componentId:"sc-886953d9-0"})`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 82px;
`;let o=r().button.withConfig({componentId:"sc-886953d9-1"})`
  /* margin: 17px 0 20px; */
  outline: none;
  border: none;
  width: 300px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #ebf479;
  color: #000;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`,s=r().div.withConfig({componentId:"sc-886953d9-2"})`
  color: #ebf479;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`,d=r().div.withConfig({componentId:"sc-886953d9-3"})`
  margin-bottom: 24px;
  width: 306px;
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`,a=r().div.withConfig({componentId:"sc-886953d9-4"})`
  width: 700px;
  height: 388px;
`,l=r().div.withConfig({componentId:"sc-886953d9-5"})`
  /* width: 529px; */
  width: 100%;
  height: 95px;
  flex-shrink: 0;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.5);
  &.active {
    border-color: #ebf479;
  }
`,c=r().div.withConfig({componentId:"sc-886953d9-6"})`
  flex: 1;
  height: 4px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.15);
  &.active {
    background: #ebf479;
  }
`,p=r().button.withConfig({componentId:"sc-886953d9-7"})`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 48px;
  border-radius: 10px;
  text-align: center;
  border-radius: 12px;
  background: rgba(124, 127, 150, 0.5);
  color: #000;
  font-family: Gantari;
  font-weight: 500;
  &.complete {
    font-weight: 700;
    border-radius: 10px;
    background: #ebf479;
  }
`,f=r().button.withConfig({componentId:"sc-886953d9-8"})`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 153px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #979abe;
  color: #979abe;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`,h=r().div.withConfig({componentId:"sc-886953d9-9"})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  &:before,
  &:after {
    content: '';
    position: absolute;
  }
  &:before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    background: linear-gradient(180deg, #e2e2e2 0%, #5b5b5b 100%);
  }
  &:after {
    left: 4px;
    top: 4px;
    right: 4px;
    bottom: 4px;
    border-radius: 10px;
    background: linear-gradient(180deg, #9a9a9a 0%, #f4f4f4 100%);
  }
`,g=r().input.withConfig({componentId:"sc-886953d9-10"})`
  position: relative;
  z-index: 50;
  outline: none;
  border: none;
  background: transparent;
  width: 22px;
  border-bottom: 2px solid #000;
  text-align: center;
  color: #000;
  text-align: center;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`,x=r().div.withConfig({componentId:"sc-886953d9-11"})`
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 422px;
  height: 54px;
  border-radius: 16px;
  border: 1px solid #ff83c6;
  background: rgba(55, 58, 83, 0.5);
  color: #ff83c6;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`,u=r().div.withConfig({componentId:"sc-886953d9-12"})`
  position: absolute;
  right: -23px;
  bottom: -20px;
`,b=r().div.withConfig({componentId:"sc-886953d9-13"})`
  font-family: Gantari;
  font-size: 52px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #afafaf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,m=i.keyframes`
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
`,w=r().div.withConfig({componentId:"sc-886953d9-14"})`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`,C=r().div.withConfig({componentId:"sc-886953d9-15"})`
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
  .swiper {
    overflow: hidden;
  }
`;r().div.withConfig({componentId:"sc-886953d9-16"})`
  width: 100%;
`;let j=r().div.withConfig({componentId:"sc-886953d9-17"})`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 100px;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`,y=r().div.withConfig({componentId:"sc-886953d9-18"})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`,v=r().div.withConfig({componentId:"sc-886953d9-19"})`
  display: flex;
  align-items: center;
  justify-content: center;
`,$=r().div.withConfig({componentId:"sc-886953d9-20"})`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s linear;

  &.proceed {
    transform: translate(2px, 2px);
  }
`,k=r().video.withConfig({componentId:"sc-886953d9-21"})``,L=r().div.attrs(e=>({$direction:e.$direction||"row",$wrap:e.$wrap||"wrap",$align:e.$align||"center",$justify:e.$justify||"center",$gap:e.$gap||"0px"})).withConfig({componentId:"sc-886953d9-22"})`
  display: flex;
  flex-wrap: ${e=>e.$wrap};
  flex-direction: ${e=>e.$direction};
  align-items: ${e=>e.$align};
  justify-content: ${e=>e.$justify};
  gap: ${e=>e.$gap};
`,I=r().button.attrs(e=>({$width:e.$width||"100%",$height:e.$height||"50px",$background:e.$background||"#373A53",$borderRadius:e.$borderRadius||"10px",$borderWidth:e.$borderWidth||"1px",$borderStyle:e.$borderStyle||"solid",$borderColor:e.$borderColor||"#373A53"})).withConfig({componentId:"sc-886953d9-23"})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${e=>e.$width};
  height: ${e=>e.$height};
  background: ${e=>e.$background};
  border-radius: ${e=>e.$borderRadius};
  border-width: ${e=>e.$borderWidth};
  border-style: ${e=>e.$borderStyle};
  border-color: ${e=>e.$borderColor};
  cursor: pointer;
  &[disabled] {
    cursor: no-drop;
    opacity: 0.5;
  }
`,_=r().div.withConfig({componentId:"sc-886953d9-24"})`
  color: ${e=>e.$color||"#FFF"};
  font-family: Gantari;
  font-size: ${e=>e.$size||"36px"};
  font-style: normal;
  font-weight: ${e=>e.$weight||"400"};
  line-height: ${e=>e.$line||"normal"};
  text-align: ${e=>e.$textAlign||"left"};
  box-sizing: border-box;

  &.ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: ${e=>e.$lineClamp||1};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`},27583:(e,t,n)=>{"use strict";e.exports=n(87093).vendored.contexts.HooksClientContext},31575:(e,t,n)=>{"use strict";e.exports=n(87093).vendored.contexts.ServerInsertedHtml},39332:(e,t,n)=>{e.exports=n(30636)}};