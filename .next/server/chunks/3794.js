"use strict";exports.id=3794,exports.ids=[3794],exports.modules={52504:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(16689);function o(){return"undefined"==typeof document||!("visibilityState"in document)||"visible"===document.visibilityState}let r=e=>{let t=Math.floor(Date.now()/1e3);return Number.isFinite(e)&&e>t?e-t:0},s=(e,t=1e3)=>{let i,n;i=Date.now()+t;let o=()=>{i+=t,n=setTimeout(o,i-Date.now()),e?.()};return n=setTimeout(o,i-Date.now()),{cancel:()=>clearTimeout(n)}},a=e=>{let t=(0,n.useRef)(null),[i,a]=(0,n.useState)(()=>r(e)),[d,l]=(0,n.useState)(!1),c=function(){let[e,t]=(0,n.useState)(()=>o());return(0,n.useEffect)(()=>{if(!("visibilityState"in document))return;let e=()=>{t(o())};return document.addEventListener("visibilitychange",e),()=>{document.removeEventListener("visibilitychange",e)}},[t]),e}(),p=(0,n.useCallback)(()=>l(!0),[l]),x=(0,n.useCallback)(()=>l(!1),[l]);return(0,n.useEffect)(()=>{let e;if(!d){let{cancel:i}=s(()=>{a(e=>e?e-1:(t.current?.(),e))});e=i,t.current=i}return()=>{e?.()}},[d,e,a]),(0,n.useEffect)(()=>{c?(a(r(e)),x()):p()},[p,x,e,a,c]),{secondsRemaining:i,pause:p,unpause:x}}},63858:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(20997),o=i(57518),r=i.n(o);let s=r().div.withConfig({componentId:"sc-a8b1009c-0"})`
  flex-grow: 1;
  height: ${({$size:e})=>e}px;
  position: relative;
  border-radius: 20px;
  ${({$noborder:e})=>!e&&"border: 1px solid #373a53;"}
  background: ${({$noborder:e})=>e?"rgba(255, 255, 255, 0.15)":"#2c2e3e"};
  box-sizing: border-box;
`,a=r().div.withConfig({componentId:"sc-a8b1009c-1"})`
  border-radius: 16px;
  background: #ebf479;
  position: absolute;
  width: ${({$value:e})=>e}%;
  height: ${({$size:e})=>e}px;
  ${({$noborder:e})=>!e&&" left: -1px;top: -1px;"}
`,d=({size:e=8,value:t,noBorder:i=!1})=>n.jsx(s,{$size:e,$noborder:i,children:n.jsx(a,{$size:e,$value:t,$noborder:i})})},34675:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var o=i(20997),r=i(39332),s=i(16689),a=i(63858),d=i(12349),l=i(88202),c=e([l]);l=(c.then?(await c)():c)[0];let p=(0,s.memo)(({quest:{isCampaign:e,is_claimed:t,participation_status:i,live:n,logo:s,name:c,description:p,sub_name:x,total_action:f,action_completed:h,reward:g,is_period:u,difficulty:m,id:w,quest_category_name:b},mt:v,bp:y,onClick:j})=>{let C=(0,r.useRouter)(),$=Array.from({length:f},(e,t)=>t);return(0,o.jsxs)(l.PQ,{$isCampaign:e,$mt:v,whileHover:{opacity:.9},onClick:e=>{e.stopPropagation(),C.push(`/quest/detail?id=${w}`),j?.()},"data-bp":y,children:[(0,o.jsxs)(l.Vg,{children:[o.jsx(l.wv,{children:s&&o.jsx(l.xL,{src:s,$disabled:!1===n})}),(0,o.jsxs)("div",{children:[o.jsx(l.Qe,{children:c}),o.jsx(l.fM,{$isCampaign:e,children:x})]})]}),(0,o.jsxs)("div",{children:[o.jsx(l.cm,{children:$.map((e,t)=>o.jsx(a.Z,{size:4,value:h>=t+1?100:0,noBorder:!0},t))}),(0,o.jsxs)(l.tc,{children:[(0,o.jsxs)(l.e2,{children:[(0,o.jsxs)(l.w5,{style:{padding:"0px 10px 0px 6px"},children:[o.jsx(l.Vs,{$size:18}),(0,o.jsxs)("span",{style:{color:"#EBF479"},children:[g," PTS"]})]}),m&&(0,o.jsxs)(l.w5,{children:[o.jsx(d.Z,{step:d.i[m]}),m]}),b&&(0,o.jsxs)(l.n1,{style:{color:`var(--${b}-color)`},children:["#",b]})]}),t?o.jsx(l.wB,{style:{color:"#979ABE"},children:"Claimed"}):"completed"===i?o.jsx(l.wB,{children:"Unclaimed"}):""]})]}),void 0!==n&&(0,o.jsxs)(l.VY,{children:[o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"8",height:"8",viewBox:"0 0 8 8",fill:"none",children:o.jsx("circle",{cx:"4",cy:"4",r:"4",fill:n?"#31B03E":"#979ABE"})}),o.jsx("span",{children:n?"Live":"Expired"})]})]})});n()}catch(e){n(e)}})},12349:(e,t,i)=>{i.d(t,{Z:()=>s,i:()=>r});var n=i(20997),o=i(16689);let r={Begginer:1,Intermediate:2,Senior:3},s=(0,o.memo)(({step:e})=>(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"14",viewBox:"0 0 16 14",fill:"none",children:[n.jsx("rect",{y:"8.4209",width:"4.21052",height:"5.05262",rx:"1",fill:"#EBF479"}),n.jsx("rect",{opacity:e>1?"1":"0.3",x:"5.89478",y:"5.05371",width:"4.21052",height:"8.42104",rx:"1",fill:"#EBF479"}),n.jsx("rect",{opacity:e>2?"1":"0.3",x:"11.7896",width:"4.21052",height:"13.4737",rx:"1",fill:"#EBF479"})]}))},88202:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{PQ:()=>l,Qe:()=>f,VY:()=>w,Vg:()=>c,Vs:()=>a.Vs,cm:()=>g,e2:()=>u,fM:()=>h,n1:()=>y,tc:()=>v,w5:()=>m,wB:()=>b,wv:()=>p,xL:()=>x});var o=i(66197),r=i(57518),s=i.n(r),a=i(44945),d=e([o]);o=(d.then?(await d)():d)[0];let l=s()(o.motion.div).withConfig({componentId:"sc-39553dd0-0"})`
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #2c2e3e;
  width: 402px;
  height: 186px;
  flex-shrink: 0;
  padding: 14px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({$isCampaign:e})=>e&&`
  background: radial-gradient(100% 100% at 0% 0%, #AE92FF 0%, #6D2DF3 100%);
  `}

  ${({$mt:e})=>e&&`margin-top: ${e}px`}
`,c=s().div.withConfig({componentId:"sc-39553dd0-1"})`
  display: flex;
  gap: 14px;
  flex-grow: 1;
  max-height: 100px;
  overflow: hidden;
`,p=s().div.withConfig({componentId:"sc-39553dd0-2"})`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`,x=s().img.withConfig({componentId:"sc-39553dd0-3"})`
  max-width: 100px;
  max-height: 100px;
  ${({$disabled:e})=>e&&"filter: grayscale(100%)"}
`,f=s().div.withConfig({componentId:"sc-39553dd0-4"})`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`,h=s().div.withConfig({componentId:"sc-39553dd0-5"})`
  color: ${({$isCampaign:e})=>e?"rgba(255,255,255,0.6)":"#979abe"};
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  margin-top: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`,g=s().div.withConfig({componentId:"sc-39553dd0-6"})`
  display: flex;
  align-items: center;
  gap: 5px;
`,u=s().div.withConfig({componentId:"sc-39553dd0-7"})`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
`,m=s().div.withConfig({componentId:"sc-39553dd0-8"})`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  height: 26px;
  flex-shrink: 0;
  padding: 0px 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`,w=s().div.withConfig({componentId:"sc-39553dd0-9"})`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(32, 34, 47, 0.8);
  padding: 0px 10px;
  height: 26px;
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`,b=s().div.withConfig({componentId:"sc-39553dd0-10"})`
  color: #ebf479;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`,v=s().div.withConfig({componentId:"sc-39553dd0-11"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`,y=s().div.withConfig({componentId:"sc-39553dd0-12"})`
  flex: 1;
  text-align: right;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;n()}catch(e){n(e)}})},80727:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>c});var o=i(20997),r=i(39332),s=i(16689),a=i(59397),d=i(74304),l=e([a]);a=(l.then?(await l)():l)[0];let c=(0,s.memo)(({info:e})=>{let t=(0,r.useRouter)(),{check:i}=(0,a.Z)({isNeedAk:!0});return(0,o.jsxs)(d.PQ,{onClick:()=>{i(()=>{t.push("/profile?active=pts")})},children:[(0,o.jsxs)(d.D,{children:[o.jsx(d.ar,{children:"My PTS"}),(0,o.jsxs)(d.FY,{children:[o.jsx(d.Vs,{$size:18}),o.jsx("span",{children:e?.reward||0})]})]}),o.jsx(d.RM,{}),(0,o.jsxs)(d.D,{children:[o.jsx(d.ar,{children:"My Rank"}),(0,o.jsxs)(d.FY,{children:["#",e?.rank||0]})]})]})});n()}catch(e){n(e)}})},74304:(e,t,i)=>{i.d(t,{D:()=>a,FY:()=>l,PQ:()=>s,RM:()=>c,Vs:()=>r.Vs,ar:()=>d});var n=i(57518),o=i.n(n),r=i(44945);let s=o().div.withConfig({componentId:"sc-54f168e4-0"})`
  border-radius: 33px;
  background: radial-gradient(72.14% 104.62% at 47.64% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 100%),
    radial-gradient(185.62% 109.56% at 0% 71.21%, #ff38a1 0%, #7138cd 55.21%, #4400b2 100%);
  box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, 0.15) inset;
  width: 235px;
  height: 66px;
  flex-shrink: 0;
  display: flex;
  box-sizing: border-box;
  padding: 12px 23px 12px 23px;
  align-items: center;
  gap: 20px;
  justify-content: center;
  position: fixed;
  right: 30px;
  bottom: 118px;
  z-index: 30;
  cursor: pointer;
`,a=o().div.withConfig({componentId:"sc-54f168e4-1"})`
  display: flex;
  flex-direction: column;
  gap: 7px;
`,d=o().div.withConfig({componentId:"sc-54f168e4-2"})`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`,l=o().div.withConfig({componentId:"sc-54f168e4-3"})`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 6px;
`,c=o().div.withConfig({componentId:"sc-54f168e4-4"})`
  width: 1px;
  height: 42px;
  background-color: rgba(255, 255, 255, 0.2);
`},32245:(e,t,i)=>{i.d(t,{$z:()=>r,B0:()=>s,fD:()=>a});var n=i(14384),o=i.n(n);let r=e=>{let t=Math.abs(e),i={days:0,hours:0,minutes:0,seconds:0};return t>=86400&&(i.days=Math.floor(t/86400),t-=86400*i.days),t>=3600&&(i.hours=Math.floor(t/3600),t-=3600*i.hours),t>=60&&(i.minutes=Math.floor(t/60),t-=60*i.minutes),i.seconds=Math.ceil(t),i},s=e=>e<10?"0"+e:""+e,a=(e,t)=>{if(!e||!t)return"";let i="yyyy/MM/dd",n=o()(new Date(Number(e)),i),r=o()(new Date(Number(t)),i),s=o()(new Date(Number(t)),"HH:mm");return`${n} - ${r} ${s}`}},82361:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(16689),o=i(42501),r=i(78579);function s(){let[e,t]=(0,n.useState)([]),[i,s]=(0,n.useState)(!1),a=(0,n.useCallback)(async()=>{if(!i){s(!0);try{let e=await (0,r.U2)(`${o.h}/api/quest/campaign_list`);t(e.data||[]),s(!1)}catch(e){s(!1)}}},[i]);return(0,n.useEffect)(()=>{a()},[]),{loading:i,campaigns:e}}},3896:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(16689),o=i(42501),r=i(78579);function s(){let[e,t]=(0,n.useState)({}),[i,s]=(0,n.useState)(!1),a=(0,n.useCallback)(async()=>{let e=sessionStorage.getItem("_quest_categories");if(e){t(JSON.parse(e));return}if(!i){s(!0);try{let e=await (0,r.U2)(`${o.h}/api/quest/category_list`),i=e.data||[],n=i.reduce((e,t)=>({...e,[t.id]:t}),{});t(n),s(!1),sessionStorage.setItem("_quest_categories",JSON.stringify(n))}catch(e){s(!1)}}},[i]);return(0,n.useEffect)(()=>{a()},[]),{loading:i,categories:e}}},44945:(e,t,i)=>{i.d(t,{PQ:()=>r,Vs:()=>a,X0:()=>s});var n=i(57518),o=i.n(n);let r=o().div.withConfig({componentId:"sc-f5620229-0"})`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`,s=o().div.withConfig({componentId:"sc-f5620229-1"})`
  color: #fff;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`,a=o().div.withConfig({componentId:"sc-f5620229-2"})`
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>e-1}px;
  background-image: url(/images/quest/coin.png);
  background-size: 100%;
  background-repeat: no-repeat;
`}};