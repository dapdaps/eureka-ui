"use strict";exports.id=2463,exports.ids=[2463],exports.modules={52504:(e,t,i)=>{i.d(t,{Z:()=>o});var n=i(16689);function s(){return"undefined"==typeof document||!("visibilityState"in document)||"visible"===document.visibilityState}let a=e=>{let t=Math.floor(Date.now()/1e3);return Number.isFinite(e)&&e>t?e-t:0},r=(e,t=1e3)=>{let i,n;i=Date.now()+t;let s=()=>{i+=t,n=setTimeout(s,i-Date.now()),e?.()};return n=setTimeout(s,i-Date.now()),{cancel:()=>clearTimeout(n)}},o=e=>{let t=(0,n.useRef)(null),[i,o]=(0,n.useState)(()=>a(e)),[c,l]=(0,n.useState)(!1),d=function(){let[e,t]=(0,n.useState)(()=>s());return(0,n.useEffect)(()=>{if(!("visibilityState"in document))return;let e=()=>{t(s())};return document.addEventListener("visibilitychange",e),()=>{document.removeEventListener("visibilitychange",e)}},[t]),e}(),h=(0,n.useCallback)(()=>l(!0),[l]),p=(0,n.useCallback)(()=>l(!1),[l]);return(0,n.useEffect)(()=>{let e;if(!c){let{cancel:i}=r(()=>{o(e=>e?e-1:(t.current?.(),e))});e=i,t.current=i}return()=>{e?.()}},[c,e,o]),(0,n.useEffect)(()=>{d?(o(a(e)),p()):h()},[h,p,e,o,d]),{secondsRemaining:i,pause:h,unpause:p}}},29669:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Q:()=>l,e:()=>d});var s=i(69890),a=i(43602),r=i(59591),o=i.n(r),c=e([s,a]);[s,a]=c.then?(await c)():c;let l=(0,s.create)((0,a.persist)((e,t)=>({tokens:null,networks:null,set:t=>e(()=>({...t}))}),{name:"_shushi_tokens",version:.2,storage:(0,a.createJSONStorage)(()=>sessionStorage)})),d=(0,s.create)((0,a.persist)((e,t)=>({orders:{},addOrder:i=>{let n=t().orders;n[i.id]=i,e({orders:o()(n)})},getOrder:e=>t().orders[e],set:t=>e(()=>({...t}))}),{name:"_shush_orders",version:.2,storage:(0,a.createJSONStorage)(()=>localStorage)}));n()}catch(e){n(e)}})},32245:(e,t,i)=>{i.d(t,{$z:()=>a,B0:()=>r,fD:()=>o});var n=i(14384),s=i.n(n);let a=e=>{let t=Math.abs(e),i={days:0,hours:0,minutes:0,seconds:0};return t>=86400&&(i.days=Math.floor(t/86400),t-=86400*i.days),t>=3600&&(i.hours=Math.floor(t/3600),t-=3600*i.hours),t>=60&&(i.minutes=Math.floor(t/60),t-=60*i.minutes),i.seconds=Math.ceil(t),i},r=e=>e<10?"0"+e:""+e,o=(e,t)=>{if(!e||!t)return"";let i="yyyy/MM/dd",n=s()(new Date(Number(e)),i),a=s()(new Date(Number(t)),i),r=s()(new Date(Number(t)),"HH:mm");return`${n} - ${a} ${r}`}},81276:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>d});var s=i(20997),a=i(16689),r=i(57192),o=i(51116),c=i(35500),l=e([r,o]);[r,o]=l.then?(await l)():l;let d=(0,a.memo)(({anonymous:e,from:t,children:i})=>(0,s.jsxs)(c.PQ,{children:[s.jsx(c.hm,{src:"/images/shush/private-bg.png",$show:e,style:{top:"-52px"}}),s.jsx(c.hm,{src:"/images/shush/semi-private-bg.png",$show:!e}),s.jsx(r.Z,{navs:[{name:"Home",path:"/"},{name:"DapDap X Shush",path:""}]}),(0,s.jsxs)(c.Hz,{children:[(0,s.jsxs)(c.mu,{children:[s.jsx(c.Cr,{}),"search"!==t&&s.jsx(c.k_,{}),s.jsx(c.X0,{children:"MOVE YOUR TOKENS IN SILENCE"}),s.jsx(c.TK,{children:"Compliant Private Muti-chain Liquidity Aggregator"}),i]}),"index"===t&&s.jsx(o.Z,{})]})]}));n()}catch(e){n(e)}})},83105:(e,t,i)=>{i.d(t,{Z:()=>o});var n=i(20997),s=i(57518),a=i.n(s);let r=a().div.withConfig({componentId:"sc-710bba5f-0"})`
  height: 42px;
  border-radius: 8px;
  border: 1px solid #ff547d;
  background: rgba(255, 84, 125, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #ff547d;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-top: 19px;
`,o=()=>(0,n.jsxs)(r,{children:[n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"16",viewBox:"0 0 18 16",fill:"none",children:n.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.10016 1C7.86996 -0.333334 9.79446 -0.333333 10.5643 1L17.3935 12.8286C18.1633 14.1619 17.201 15.8286 15.6614 15.8286H2.00298C0.463382 15.8286 -0.498867 14.1619 0.270933 12.8286L7.10016 1ZM7.91793 6.22857C7.91793 5.72363 8.32727 5.31429 8.83221 5.31429C9.33716 5.31429 9.7465 5.72363 9.7465 6.22857V9.88572C9.7465 10.3907 9.33716 10.8 8.83221 10.8C8.32727 10.8 7.91793 10.3907 7.91793 9.88572V6.22857ZM8.83221 11.7143C8.32727 11.7143 7.91793 12.1236 7.91793 12.6286C7.91793 13.1335 8.32727 13.5429 8.83221 13.5429C9.33716 13.5429 9.7465 13.1335 9.7465 12.6286C9.7465 12.1236 9.33716 11.7143 8.83221 11.7143Z",fill:"#FF547D"})}),n.jsx("div",{children:"Order expired. This order has exceeded its time limit."})]})},729:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>l});var s=i(20997),a=i(16689),r=i(64392),o=i(6585),c=e([r,o]);[r,o]=c.then?(await c)():c;let l=(0,a.memo)(({order:e,tokens:t,onSuccess:i})=>{let{showButton:n,handleInWallet:a}=(0,r.Z)(e,t,i);return n?s.jsx(o.QC,{onClick:a,children:"Open in wallet"}):""});n()}catch(e){n(e)}})},40164:(e,t,i)=>{i.d(t,{Z:()=>g});var n=i(20997),s=i(16689),a=i(57518),r=i.n(a);let o=r().div.withConfig({componentId:"sc-812636fe-0"})`
  width: 36px;
  height: 36px;
  border: 1px solid ${({$loading:e,$active:t})=>e||t?"transparent":"#979ABE"};
  border-radius: 50%;
  color: ${({$loading:e,$active:t})=>e?"#fff":t?"#000":"#979ABE"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
`,c=r().div.withConfig({componentId:"sc-812636fe-1"})`
  background-color: ${({$active:e,$loading:t})=>t?"rgba(151, 154, 190, 0.2)":e?"#FCC42C":"transparent"};
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: center center;
  ${({$loading:e})=>e&&"animation: loading 1s linear infinite;"}
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,l=r().div.withConfig({componentId:"sc-812636fe-2"})`
  position: relative;
  z-index: 5;
`,d=r().div.withConfig({componentId:"sc-812636fe-3"})`
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 0px;
`,h=r().div.withConfig({componentId:"sc-812636fe-4"})`
  color: ${({$active:e})=>e?"#fff":"#979ABE"};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  bottom: -20px;
`,p=(0,s.memo)(({active:e,loading:t,icon:i,label:s})=>(0,n.jsxs)(o,{$active:e,$loading:t,children:[n.jsx(c,{$active:e,$loading:t,children:t&&n.jsx(d,{children:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",children:n.jsx("path",{d:"M18 19C18 9.05888 9.94113 1 0 1",stroke:"#FCC42C",strokeWidth:"2"})})})}),n.jsx(l,{children:i}),n.jsx(h,{$active:e,children:s})]})),u=[{status:0,label:"Waiting",icon:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"21",height:"21",viewBox:"0 0 21 21",fill:"none",children:n.jsx("path",{d:"M17.2995 10.2799C17.2995 12.0249 16.6063 13.6985 15.3724 14.9324C14.1385 16.1664 12.4649 16.8596 10.7198 16.8596C8.97477 16.8596 7.3012 16.1664 6.06726 14.9324C4.83332 13.6985 4.1401 12.0249 4.1401 10.2799C4.1401 8.53483 4.83332 6.86125 6.06726 5.62732C7.3012 4.39338 8.97477 3.70016 10.7198 3.70016C12.4649 3.70016 14.1385 4.39338 15.3724 5.62732C16.6063 6.86125 17.2995 8.53483 17.2995 10.2799ZM10.7198 18.6799C15.3591 18.6799 19.1198 14.9192 19.1198 10.2799C19.1198 5.64056 15.3591 1.87988 10.7198 1.87988C6.0805 1.87988 2.31982 5.64056 2.31982 10.2799C2.31982 14.9192 6.0805 18.6799 10.7198 18.6799ZM11.6295 6.7796C11.6295 6.53833 11.5337 6.30694 11.3631 6.13633C11.1925 5.96573 10.9611 5.86988 10.7198 5.86988C10.4786 5.86988 10.2472 5.96573 10.0766 6.13633C9.90595 6.30694 9.8101 6.53833 9.8101 6.7796V10.2799C9.8101 10.7822 10.2175 11.1896 10.7198 11.1896H14.2201C14.4614 11.1896 14.6928 11.0938 14.8634 10.9232C15.034 10.7525 15.1298 10.5212 15.1298 10.2799C15.1298 10.0386 15.034 9.80722 14.8634 9.63661C14.6928 9.46601 14.4614 9.37016 14.2201 9.37016H11.6295V6.7796Z",fill:"currentColor"})})},{status:1,label:"Swapping",icon:n.jsx("svg",{width:"22",height:"18",viewBox:"0 0 22 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.15535 10.3386C5.63485 10.8181 6.41104 10.8151 6.89054 10.3356C7.36705 9.8561 7.36705 9.07991 6.88755 8.60341L4.59194 6.31679C4.50648 6.23133 4.41159 6.1612 4.31064 6.10636C3.84345 5.84573 3.24225 5.91583 2.84485 6.31324L0.558228 8.60885C0.0787279 9.08835 0.081725 9.86454 0.561225 10.344C1.04073 10.8235 1.81991 10.8205 2.29642 10.341L2.42961 10.2073C2.89201 14.5428 6.56246 17.9208 11.0205 17.9208C13.4938 17.9208 15.7236 16.8806 17.2979 15.2149C17.3471 15.1786 17.3937 15.1386 17.4371 15.0951C17.5509 14.9813 17.6412 14.8462 17.7028 14.6975C17.7644 14.5488 17.7961 14.3894 17.7961 14.2284C17.7961 14.0675 17.7644 13.9081 17.7028 13.7594C17.6412 13.6106 17.5509 13.4755 17.4371 13.3617C17.3233 13.2479 17.1882 13.1576 17.0394 13.096C16.8907 13.0344 16.7313 13.0027 16.5704 13.0027C16.4094 13.0027 16.25 13.0344 16.1013 13.096C15.9526 13.1576 15.8175 13.2479 15.7037 13.3617C15.6972 13.3682 15.6908 13.3747 15.6844 13.3814L15.6656 13.3626C14.5328 14.6512 12.8726 15.4664 11.0205 15.4664C7.8712 15.4664 5.27195 13.1134 4.88471 10.0694L5.15535 10.3386ZM6.5812 4.97499C7.70433 3.81722 9.27852 3.09515 11.0202 3.09515C13.4149 3.09515 15.4925 4.45667 16.52 6.44813L16.3428 6.35519C15.7434 6.04052 15.0002 6.27128 14.6855 6.87066C14.3708 7.47003 14.6016 8.21326 15.201 8.52793L17.8958 9.94149C17.9512 9.98423 18.011 10.0228 18.0751 10.0564C18.6745 10.3711 19.4177 10.1403 19.7324 9.54094L21.2368 6.67292C21.5515 6.07355 21.3207 5.33032 20.7214 5.01565C20.122 4.70098 19.3788 4.93174 19.0641 5.53112L18.9265 5.79339C17.5866 2.7585 14.5504 0.640703 11.0202 0.640703C8.53283 0.640703 6.29416 1.69261 4.71781 3.37086L4.73342 3.38533C4.72394 3.39422 4.7146 3.40327 4.70538 3.41248C4.47552 3.64235 4.34638 3.95412 4.34638 4.2792C4.34638 4.60428 4.47552 4.91605 4.70538 5.14592C4.93525 5.37578 5.24702 5.50492 5.5721 5.50492C5.89718 5.50492 6.20895 5.37578 6.43882 5.14592C6.49173 5.093 6.53931 5.03575 6.5812 4.97499Z",fill:"currentColor"})})},{status:2,label:"Anonymizing",icon:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"21",height:"13",viewBox:"0 0 21 13",fill:"none",children:n.jsx("g",{clipPath:"url(#clip0_7734_293)",children:n.jsx("path",{d:"M20.7833 1.42533C20.7833 1.42533 20.0858 2.41159 16.1795 1.07388C14.3275 0.627984 12.38 1.58641 10.7226 2.30103C9.0611 1.60399 7.10868 0.659468 5.2588 1.12148C1.36373 2.49286 0.660607 1.5132 0.660607 1.5132C0.660607 1.5132 -0.0132181 11.0404 6.32534 12.3854C8.24847 12.8979 9.49637 11.1539 10.7485 11.1488C12.0005 11.1436 13.2596 12.8731 15.1785 12.3473C21.5094 10.9467 20.7805 1.42533 20.7805 1.42533H20.7833ZM9.76213 7.68039C9.76213 7.68039 4.5794 10.2086 3.25337 4.66745L5.78545 4.62791C6.68514 4.56048 7.57846 4.83022 8.30649 5.38915C9.03453 5.94809 9.55008 6.75997 9.76144 7.68039H9.76213ZM18.2024 4.66745C16.8771 10.2086 11.6936 7.68039 11.6936 7.68039C11.9051 6.76004 12.4207 5.94825 13.1487 5.38934C13.8767 4.83043 14.7699 4.56063 15.6696 4.62791L18.2017 4.66745H18.2024Z",fill:"currentColor"})})})},{status:3,label:"Done",icon:n.jsx("svg",{width:"16",height:"13",viewBox:"0 0 16 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M1.52 6.28L5.84 10.6L14.48 1.96",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})}],x=r().div.withConfig({componentId:"sc-e59003da-0"})`
  display: flex;
  align-items: center;
  margin: 23px 23px 0px;
  padding-bottom: 20px;
`,f=r().div.withConfig({componentId:"sc-e59003da-1"})`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
`,m=r().div.withConfig({componentId:"sc-e59003da-2"})`
  height: 1px;
  flex-grow: 1;
  background-color: #373a53;
`,g=(0,s.memo)(({status:e})=>n.jsx(x,{children:n.jsx(f,{children:u.map((t,i)=>(0,n.jsxs)(n.Fragment,{children:[n.jsx(p,{active:e>=i,loading:e===i,icon:t.icon,label:t.label},`${t.status}-icon`),i<u.length-1&&n.jsx(m,{},`${t.status}-line`)]}))})}))},15924:(e,t,i)=>{i.d(t,{Z:()=>o});var n=i(20997),s=i(52504),a=i(32245),r=i(16689);function o({endTime:e,onEnd:t}){let{secondsRemaining:i}=(0,s.Z)(e/1e3),o=(0,a.$z)(i);return(0,r.useEffect)(()=>{i<=0&&t()},[i]),(0,n.jsxs)("div",{className:"color",children:[(0,a.B0)(o.minutes),":",(0,a.B0)(o.seconds)]})}},85458:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>v});var s=i(20997),a=i(16689),r=i(97626),o=i(14384),c=i.n(o),l=i(66197),d=i(42326),h=i(2925),p=i(40164),u=i(83105),x=i(15924),f=i(729),m=i(6585),g=e([r,l,f,m]);[r,l,f,m]=g.then?(await g)():g;let v=(0,a.memo)(({order:e,tokens:t,defaultExpand:i,onSuccess:n})=>{let[o,g]=(0,a.useState)(i),v=t[e.inSymbol]||{},w=t[e.outSymbol]||{},[y,j]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{j(5===e.status)},[e]),(0,s.jsxs)(m.PQ,{children:[(0,s.jsxs)(m.v0,{initial:!1,style:{borderRadius:o?"16px 16px 0px 0px":"16px"},onClick:()=>{g(!o)},children:[(0,s.jsxs)(m.du,{children:[s.jsx(m.jj,{src:v.icon}),(0,s.jsxs)("div",{children:[e.inAmount," ",v.displayName]}),s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"10",viewBox:"0 0 13 10",fill:"none",children:s.jsx("path",{d:"M1 4.4C0.66863 4.4 0.4 4.66863 0.4 5C0.4 5.33137 0.668628 5.6 0.999999 5.6L1 4.4ZM11.9243 5.42428C12.1586 5.18996 12.1586 4.81006 11.9243 4.57575L8.10589 0.757368C7.87158 0.523054 7.49168 0.523053 7.25736 0.757367C7.02305 0.991682 7.02305 1.37158 7.25736 1.6059L10.6515 5.00001L7.25735 8.39412C7.02304 8.62844 7.02304 9.00833 7.25735 9.24265C7.49167 9.47696 7.87157 9.47696 8.10588 9.24265L11.9243 5.42428ZM0.999999 5.6L11.5 5.60001L11.5 4.40001L1 4.4L0.999999 5.6Z",fill:"#979ABE"})}),s.jsx(m.jj,{src:w.icon}),(0,s.jsxs)("div",{children:[s.jsx("span",{className:"color",children:new r.default(e.outAmount).toFixed(2)})," ",w.displayName]})]}),!y&&s.jsx(m.S1,{$expand:o,$done:4===e.status,children:4===e.status?s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"9.75",viewBox:"0 0 16 13",fill:"none",children:s.jsx("path",{d:"M1.52002 6.27996L5.84002 10.6L14.48 1.95996",stroke:"#000",strokeWidth:"2",strokeLinecap:"round"})}):s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"9",height:"2",viewBox:"0 0 9 2",fill:"none",children:s.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1ZM5.33333 1C5.33333 1.55228 4.88562 2 4.33333 2C3.78105 2 3.33333 1.55228 3.33333 1C3.33333 0.447715 3.78105 0 4.33333 0C4.88562 0 5.33333 0.447715 5.33333 1ZM7.66667 2C8.21895 2 8.66667 1.55228 8.66667 1C8.66667 0.447715 8.21895 0 7.66667 0C7.11438 0 6.66667 0.447715 6.66667 1C6.66667 1.55228 7.11438 2 7.66667 2Z",fill:"currentColor"})})}),y&&(0,s.jsxs)("svg",{width:"25",height:"25",viewBox:"0 0 25 25",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M10.8897 6C11.6595 4.66667 13.584 4.66667 14.3538 6L18.9725 13.9999C19.7423 15.3332 18.7801 16.9999 17.2405 16.9999H8.00298C6.46338 16.9999 5.50113 15.3332 6.27093 13.9999L10.8897 6ZM11.9018 9.46316C11.9018 9.06663 12.2233 8.74518 12.6198 8.74518C13.0163 8.74518 13.3378 9.06663 13.3378 9.46316V12.3351C13.3378 12.7316 13.0163 13.0531 12.6198 13.0531C12.2233 13.0531 11.9018 12.7316 11.9018 12.3351V9.46316ZM12.6194 13.7687C12.2231 13.7687 11.9018 14.0899 11.9018 14.4862C11.9018 14.8825 12.2231 15.2037 12.6194 15.2037C13.0156 15.2037 13.3369 14.8825 13.3369 14.4862C13.3369 14.0899 13.0156 13.7687 12.6194 13.7687Z",fill:"#FF547D"}),s.jsx("circle",{cx:"12.5",cy:"12.5",r:"12",fill:"#FF547D",fillOpacity:"0.1",stroke:"#FF547D"})]})]}),s.jsx(l.AnimatePresence,{initial:!1,children:o&&s.jsx(m.S3,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto"},collapsed:{opacity:0,height:0}},transition:{duration:.3,ease:[.04,.62,.23,.98]},children:(0,s.jsxs)(m.u7,{children:[(0,s.jsxs)(m.MZ,{children:[s.jsx("div",{children:"Shush ID:"}),s.jsx("div",{className:"color",children:e.houdiniId}),s.jsx(d.Z,{size:12,text:e.houdiniId,tooltipMessage:"Copied",tooltipTop:-31,tooltipRight:-12,tooltipFontSize:12,buttonColor:"rgba(255,255,255,0.6)"})]}),(0,s.jsxs)(m.MZ,{className:"mt",children:[s.jsx("div",{children:"Recipient: "}),s.jsx("div",{className:"white",children:(0,h.Y$)(e.receiverAddress)})]}),!y&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(m.t6,{className:"mt",children:[(0,s.jsxs)(m.kB,{children:[(0,s.jsxs)(m.MZ,{children:[s.jsx("div",{children:"Creation time: "}),s.jsx("div",{className:"white",children:c()(new Date(e.created),"dd/MM/yyyy HH:mm")})]}),0===e.status?(0,s.jsxs)(m.MZ,{className:"mt",children:[s.jsx("div",{children:"Send your funds within "}),s.jsx(x.Z,{endTime:new Date(e.expires).getTime(),onEnd:()=>{j(!0)}})]}):(0,s.jsxs)(m.MZ,{className:"mt",children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"9.75",viewBox:"0 0 16 13",fill:"none",children:s.jsx("path",{d:"M1.52002 6.27996L5.84002 10.6L14.48 1.95996",stroke:"#FCC42C",strokeWidth:"2",strokeLinecap:"round"})}),s.jsx("div",{className:"color",children:"Funds Received"})]})]}),(0,s.jsxs)(m.kB,{children:[(0,s.jsxs)(m.MZ,{children:[s.jsx("div",{children:"Send "}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("span",{className:"color",children:[e.inAmount," "]}),s.jsx("span",{children:v.displayName})]})]}),(0,s.jsxs)(m.MZ,{children:[s.jsx("div",{className:"color",children:(0,h.Y$)(e.senderAddress)}),s.jsx(d.Z,{size:12,text:e.senderAddress,tooltipMessage:"Copied",tooltipTop:-31,tooltipRight:-12,tooltipFontSize:12,buttonColor:"rgba(255,255,255,0.6)"})]}),0===e.status&&s.jsx(f.Z,{order:e,tokens:t,onSuccess:n})]}),(0,s.jsxs)(m.kB,{children:[s.jsx("div",{children:"Est. swap time"}),(0,s.jsxs)("div",{className:"color",children:[e.eta," minutes"]})]})]}),s.jsx(p.Z,{status:e.status})]}),y&&s.jsx(u.Z,{})]})},"content")})]})});n()}catch(e){n(e)}})},6585:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{MZ:()=>f,PQ:()=>c,QC:()=>v,S1:()=>p,S3:()=>u,du:()=>d,jj:()=>h,kB:()=>g,t6:()=>m,u7:()=>x,v0:()=>l});var s=i(66197),a=i(57518),r=i.n(a),o=e([s]);s=(o.then?(await o)():o)[0];let c=r().div.withConfig({componentId:"sc-e5808750-0"})`
  border-radius: 16px;
  border: 1px solid #373a53;
  background-color: #1d1f29;
  position: relative;
  z-index: 10;

  .color {
    color: #fcc42c;
    font-weight: 500;
  }

  .mt {
    margin-top: 12px;
  }
`,l=r()(s.motion.header).withConfig({componentId:"sc-e5808750-1"})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #262836;
  height: 48px;
  padding: 14px;
  box-sizing: border-box;
  cursor: pointer;
`,d=r().div.withConfig({componentId:"sc-e5808750-2"})`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  gap: 10px;
`,h=r().img.withConfig({componentId:"sc-e5808750-3"})`
  width: 22px;
  height: 22px;
`,p=r().div.withConfig({componentId:"sc-e5808750-4"})`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${({$done:e})=>e?"transparent":"#979abe"};
  background-color: ${({$expand:e,$done:t})=>t?"#FCC42C":e?"#979abe":"transparent"};
  color: ${({$expand:e,$done:t})=>t?"#000":e?"#fff":"#979ABE"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`,u=r()(s.motion.section).withConfig({componentId:"sc-e5808750-5"})`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`,x=r().div.withConfig({componentId:"sc-e5808750-6"})`
  padding: 14px 14px 24px;
  border-top: 1px solid #373a53;

  .white {
    color: #fff;
  }
`,f=r().div.withConfig({componentId:"sc-e5808750-7"})`
  display: flex;
  align-items: center;
  gap: 7px;
`,m=r().div.withConfig({componentId:"sc-e5808750-8"})`
  display: flex;
  justify-content: space-between;
`,g=r().div.withConfig({componentId:"sc-e5808750-9"})`
  width: 33%;
`,v=r().button.withConfig({componentId:"sc-e5808750-10"})`
  width: 115px;
  height: 26px;
  border-radius: 8px;
  background: #fcc42c;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  margin-top: 9px;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;n()}catch(e){n(e)}})},63137:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>l});var s=i(20997),a=i(16689),r=i(66197),o=i(37533),c=e([r,o]);function l({title:e,icon:t,content:i}){let[n,c]=(0,a.useState)(!1);return(0,s.jsxs)(o.ol,{children:[(0,s.jsxs)(o.B_,{initial:!1,style:{borderRadius:n?"16px 16px 0px 0px":"16px"},onClick:()=>{c(!n)},children:[(0,s.jsxs)(o.qb,{children:[s.jsx(o.wF,{src:t}),s.jsx("div",{children:e})]}),s.jsx(o.wv,{className:n?"open":"",children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",children:s.jsx("path",{d:"M7.78087 9.02391C7.38054 9.52432 6.61946 9.52432 6.21913 9.02391L0.299758 1.62469C-0.224053 0.969931 0.24212 -1.29017e-06 1.08063 -1.21687e-06L12.9194 -1.81894e-07C13.7579 -1.08589e-07 14.2241 0.969932 13.7002 1.62469L7.78087 9.02391Z",fill:"#979ABE"})})})]}),s.jsx(r.AnimatePresence,{initial:!1,children:n&&s.jsx(o.S3,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto"},collapsed:{opacity:0,height:0}},transition:{duration:.3,ease:[.04,.62,.23,.98]},children:(0,s.jsxs)(o.u7,{children:[" ",i]})},"content")})]})}[r,o]=c.then?(await c)():c,n()}catch(e){n(e)}})},51116:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>l});var s=i(20997),a=i(16689),r=i(63137),o=i(37533),c=e([r,o]);[r,o]=c.then?(await c)():c;let l=(0,a.memo)(()=>(0,s.jsxs)(o.PQ,{children:[s.jsx(o.X0,{children:"Q&A"}),(0,s.jsxs)(o.CK,{children:[s.jsx(r.Z,{title:"How does it work?",icon:"/images/shush/qa-1.svg",content:(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:"With Shush Finance you can privately swap, send or bridge between cryptocurrencies on the same of different blockchains."}),s.jsx("div",{className:"title3",children:"Step 1 - Get Your Order Quote"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Select Crypto Pair: Pick the two tokens you want to Swap, Send, or Bridge from and to."}),s.jsx("li",{children:"Enter Amount: Specify the crypto amount to transfer. Choose Fixed for a specific amount to be received or Variable for best market-dependent rates."}),s.jsx("li",{children:"Price Optimized: Shush Finance automatically finds the lowest rates."}),s.jsx("li",{children:"No Wallet Connect: For enhanced security, you are not required to connect your wallet."})]}),s.jsx("div",{className:"title3",children:"Step 2 - Send Your Funds to Start"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Receiving Wallet Address : Input the address of the receiving wallet, ensuring it's on the same blockchain as the receiving currency."}),s.jsx("li",{children:"Initiate Order: Send the specified crypto amount to the Shush Finance address provided."})]}),s.jsx("div",{className:"title3",children:"Step 3 - Transaction Completion"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Transaction Processing: Takes 20-40 minutes on average for Private Transactions and 3 minutes for Semi-Private."}),s.jsx("li",{children:"Track Progress: Follow your transaction's progress once your transaction initiates."}),s.jsx("li",{children:"Contact Support: Reach out to our Support Team for assistance by clicking the link below. Order ID: Please provide your Order ID to help us quickly address your issue."})]})]})}),s.jsx(r.Z,{title:"How long do transactions take?",icon:"/images/shush/qa-2.svg",content:(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:"While private transactions typically take 20 to 40 minutes to complete, and semi-private less than 3 minutes, the time taken varies depending on the type of transaction, tokens involved and other external factors. Here’s a detailed overview:"}),s.jsx("div",{className:"title3",children:"Private Transactions"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Standard Duration: Typically, private transactions take between 20 to 40 minutes to complete."}),s.jsx("li",{children:"Extended Timeframe: In certain cases, these transactions may take up to an hour. Factors influencing this include the specific token pair selected and potential congestion on the respective blockchains."}),s.jsx("li",{children:"Blockchain Influence: Transactions involving blockchains with a higher number of required verifications, and hence longer confirmation times, may result in extended transaction durations."})]}),s.jsx("div",{className:"title3",children:"Semi-Private Transactions"}),s.jsx("ul",{children:s.jsx("li",{children:"Faster Processing: Semi-private transactions are generally quicker, taking less than 3 minutes to complete."})}),s.jsx("div",{className:"title3",children:"Support for Delayed Transactions"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Contact Support: Reach out to our Support Bot for assistance."}),s.jsx("li",{children:"Provide Order ID: Make sure to provide your Order ID to help us quickly address issue."})]})]})}),s.jsx(r.Z,{title:"What are Private Transactions?",icon:"/images/shush/qa-3.svg",content:(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:"Private transactions in crypto are transfers where only the sender can trace the transaction. They provide a secure way of transferring crypto with guaranteed privacy, protecting both sender and recipient from potential exposure and risks. Here are some key features:"}),s.jsx("div",{className:"title3",children:"Sender Anonymity"}),s.jsx("div",{children:"The sender's originating wallet address remains hidden and untraceable by the recipient or any external parties."}),s.jsx("div",{className:"title3",children:"Recipient Privacy"}),s.jsx("div",{children:"The recipient receives funds without the sender’s wallet address being traceable on-chain."}),s.jsx("div",{className:"title3",children:"Untraceability"}),s.jsx("div",{children:"Unlike regular crypto transactions that are public on the blockchain, our private transactions are untraceable, keeping the details confidential."}),s.jsx("div",{className:"title3",children:"Enhanced Security"}),s.jsx("div",{children:"This untraceability guards against risks like phishing, fraud, or theft, as transaction details are not publicly exposed."}),s.jsx("div",{className:"title3",children:"Ideal Use Cases"}),s.jsx("div",{children:"Beneficial for those requiring financial discretion, including individuals and businesses transacting with third parties."})]})}),s.jsx(r.Z,{title:"What are Semi-Private Transactions?",icon:"/images/shush/qa-4.svg",content:(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:"Semi-private transactions offer a balance of privacy and efficiency. They offer an efficient and moderately private alternative for crypto transfers, particularly useful in scenarios like cross-chain swaps."}),s.jsx("div",{className:"mt-10",children:"Here's a concise overview:"}),s.jsx("div",{className:"title3",children:"Intermediate Privacy"}),s.jsx("ul",{children:s.jsx("li",{children:"These transactions are not directly traceable with a single transaction hash, providing more privacy than public transactions. However, with enough technical skill and effort, the connection between sender and receiver can be traced."})}),s.jsx("div",{className:"title3",children:"Transaction Structure"}),s.jsx("ul",{children:s.jsx("li",{children:"They involve a single exchange, making them simpler than fully private transactions."})}),s.jsx("div",{className:"title3",children:"Use in Bridging"}),s.jsx("ul",{children:s.jsx("li",{children:"Commonly used for bridging (cross-chain swaps), where they facilitate efficient movement of cryptocurrencies between different blockchains."})}),s.jsx("div",{className:"title3",children:"Speed and Cost Advantages"}),s.jsx("ul",{children:s.jsx("li",{children:"Semi-private transactions are significantly faster, about 10 times quicker than private transactions. They also come with lower fees, approximately 50% less than those of private transactions."})}),s.jsx("div",{className:"title3",children:"Ideal for Efficiency and Moderate Privacy"}),s.jsx("ul",{children:s.jsx("li",{children:"These transactions strike a balance between faster transaction speeds, lower costs, and a degree of privacy, making them suitable for users who prioritize efficiency but still require some level of confidentiality."})})]})}),s.jsx(r.Z,{title:"My order is marked as 'Completed,' but I haven't received the funds?",icon:"/images/shush/qa-5.svg",content:(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:"A 'Completed' order status without fund receipt is usually due to network-related delays. Checking the transaction history through a blockchain scanner can clarify the situation. If the issue persists, our Support Team is ready to help resolve it promptly. Here’s how to proceed:"}),s.jsx("div",{className:"title3",children:"Check for Pending Transaction"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Network Congestion: Often, a spike in network gas fees during the transaction confirmation time can cause delays."}),s.jsx("li",{children:"Use Blockchain Scanners: To verify, use a blockchain scanner like Etherscan or BSCScan. Search your receiving wallet address history and check for any transactions marked as 'pending'."}),s.jsx("li",{children:"Pending Transaction Indication: If there’s a pending deposit transaction, it’s likely a temporary delay due to gas fee fluctuations and should resolve with time."})]}),s.jsx("div",{className:"title3",children:"No Pending Transaction Found"}),s.jsx("ul",{children:s.jsx("li",{children:"Contact Support: If your blockchain scanner search doesn’t show a pending deposit transaction, please reach out to our Support Team for assistance by clicking the link below."})})]})}),s.jsx(r.Z,{title:"What happens if I accidentally sent the wrong currency?",icon:"/images/shush/qa-6.svg",content:s.jsx(s.Fragment,{children:s.jsx("div",{children:"Sending the wrong currency doesn't mean your funds are lost. We can arrange for the return of your funds but please note that resolving such matters can potentially take up to 24 hours. Be assured, we are committed to ensuring the safety of your funds and resolving the issue promptly."})})}),s.jsx(r.Z,{title:"What should I do if my transaction shows 'Order Expired' after sending?",icon:"/images/shush/qa-7.svg",content:s.jsx(s.Fragment,{children:s.jsx("div",{children:"If your transaction status shows 'Order Expired,' rest assured that your funds are secure. We're committed to resolving any issues promptly and ensuring the security of your transactions at all times."})})}),s.jsx(r.Z,{title:"What is the difference between Variable and Fixed rates?",icon:"/images/shush/qa-8.svg",content:(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:"Variable rates offer flexibility and are more cost-effective but come with rate uncertainty, while fixed rates provide stability at a slightly higher cost. The choice depends on your transaction's requirements."}),s.jsx("div",{className:"mt-10",children:"Here's a concise overview:"}),s.jsx("div",{className:"title3",children:"Variable Rates"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Flexible Estimates: These rates are subject to change during the transaction due to market fluctuations and exchange slippage."}),s.jsx("li",{children:"Best for Defined Send Amounts: Ideal for transactions where the sending amount is fixed, not the receiving amount."}),s.jsx("li",{children:"Cost-Effective: Generally lower than fixed rates, making them recommended for most transactions."})]}),s.jsx("div",{className:"title3",children:"Fixed Rates"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:"Stable Pricing: Rates are locked in at the start of the transaction, unaffected by market changes during the process."}),s.jsx("li",{children:"Suitable for Precise Receiving Amounts: Recommended for transactions requiring a fixed receiving amount, like invoice payments."}),s.jsx("li",{children:"Higher Rates: Rates account for market volatility, therefore typically higher than variable rates."})]})]})}),s.jsx(r.Z,{title:"What fees are Shush Finance's fees?",icon:"/images/shush/qa-9.svg",content:(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{children:"Shush Finance’s fee structure is designed to be clear, inclusive, and cost-effective and is designed with you in mind. We do not charge direct fees, and our partnership with exchanges ensures competitive rates, often lower than going directly to the exchanges themselves. Our revenue model, based on commissions from exchanges, ensures that your rates remain unaffected."}),s.jsx("div",{className:"title2",children:"Here’s How It Works"}),s.jsx("div",{className:"title3",children:"No Direct User Fees"}),s.jsx("div",{children:"We charge no direct fees to our users."}),s.jsx("div",{className:"title3",children:"Fees by Exchange Partners"}),s.jsx("div",{children:"Fees for individual transactions are set independently by each exchange partner, based on factors such as token liquidity, market volatility, transaction slippage, and network fees."}),s.jsx("div",{className:"title3",children:"All-Inclusive Quote"}),s.jsx("div",{children:"The fee we quote is all-inclusive. This means it covers all exchange fees, network gas fees, and swap spreads."}),s.jsx("div",{className:"title3",children:"Exchange Partner Costs"}),s.jsx("div",{children:"Costs such as network gas fees and swap spreads are incurred by our exchange partners."}),s.jsx("div",{className:"title3",children:"Competitive Rates"}),s.jsx("div",{children:"Using Shush Finance will not cost you more than if you were to go directly to the exchanges. Due to our established relationships with exchange partners, you are likely to pay less in most circumstances."}),s.jsx("div",{className:"title3",children:"Commission Model"}),s.jsx("div",{children:"Shush Finance receives an industry-standard commission from the exchange for routing your transaction. Importantly, this commission does not impact the rate you pay."}),s.jsx("div",{className:"title3",children:"No Hidden Charges"}),s.jsx("div",{children:"We ensure that there are no hidden fees or additional charges beyond the all-inclusive rate provided."}),s.jsx("div",{className:"title3",children:"Transparent Fair Fees"}),s.jsx("div",{children:"Our aim is to provide you clarity on fees and ensure a highly competitive pricing model."})]})})]})]}));n()}catch(e){n(e)}})},37533:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{B_:()=>p,CK:()=>d,PQ:()=>c,S3:()=>m,X0:()=>l,ol:()=>h,qb:()=>u,u7:()=>g,wF:()=>x,wv:()=>f});var s=i(66197),a=i(57518),r=i.n(a),o=e([s]);s=(o.then?(await o)():o)[0];let c=r().div.withConfig({componentId:"sc-6659fe7d-0"})`
  width: 792px;
  margin: 100px auto 0px;
`,l=r().div.withConfig({componentId:"sc-6659fe7d-1"})`
  font-family: Gantari;
  font-size: 36px;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #afafaf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,d=r().div.withConfig({componentId:"sc-6659fe7d-2"})`
  padding: 20px 0px;
`,h=r().div.withConfig({componentId:"sc-6659fe7d-3"})`
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background-color: #2e3142;
`,p=r()(s.motion.header).withConfig({componentId:"sc-6659fe7d-4"})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #262836;
  height: 84px;
  padding: 30px;
  box-sizing: border-box;
  cursor: pointer;
`,u=r().div.withConfig({componentId:"sc-6659fe7d-5"})`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`,x=r().img.withConfig({componentId:"sc-6659fe7d-6"})`
  width: 26px;
  height: 26px;
`,f=r().div.withConfig({componentId:"sc-6659fe7d-7"})`
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  transform: rotate(-90deg);
  &:hover {
    opacity: 0.8;
  }
  &.open {
    transform: rotate(0deg);
  }
  svg {
    vertical-align: inherit;
  }
`,m=r()(s.motion.section).withConfig({componentId:"sc-6659fe7d-8"})`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;

  .title2 {
    font-size: 20px;
    font-weight: 800;
    margin-top: 10px;
  }

  .title3 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 10px;
  }

  .mt-10 {
    margin-top: 10px;
  }
`,g=r().div.withConfig({componentId:"sc-6659fe7d-9"})`
  padding: 26px 30px;
  border-top: 1px solid #373a53;
`;n()}catch(e){n(e)}})},61805:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>o});var s=i(16689),a=i(29669),r=e([a]);a=(r.then?(await r)():r)[0];let c=null;function o(e){let[t,i]=(0,s.useState)(),[n,r]=(0,s.useState)(!1),o=(0,a.e)(e=>e.getOrder),l=(0,s.useCallback)(async t=>{if(!n)try{r(!0),i(null);let n=await fetch(`/shush/api/status?id=${t}`),s=await n.json();if(r(!1),"success"===s.status){let n=s.data||{},a={...n,semi:o(s.data.houdiniId)?.semi};return i(a),e&&(c&&clearTimeout(c),c=setTimeout(()=>{l(t)},6e4)),a}}catch(e){r(!1)}},[n]);return(0,s.useEffect)(()=>{c&&clearTimeout(c)},[]),{loading:n,statusResult:t,queryStatus:l}}n()}catch(e){n(e)}})},16059:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>o});var s=i(16689),a=i(29669),r=e([a]);function o(){let[e,t]=(0,s.useState)(!1),i=(0,a.Q)(),n=(0,s.useCallback)(async()=>{if(!e){t(!0);try{let e=await fetch("/shush/order/1?_data=root"),n=await e.json(),s=n.tokens?.reduce((e,t)=>({...e,[t.id]:t}),{});i.set({networks:n.networks,tokens:s}),t(!1)}catch(e){t(!1)}}},[e]);return(0,s.useEffect)(()=>{i.tokens||n()},[]),{networks:i.networks||[],tokens:i.tokens||{},loading:e}}a=(r.then?(await r)():r)[0],n()}catch(e){n(e)}})},64392:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var s=i(97626),a=i(16689),r=i(8433),o=i(17479),c=i(81834),l=i(14300),d=i(71982),h=e([s,r,o,c,l]);function p(e,t,i){let{account:n,chainId:h,provider:p}=(0,r.Z)(),{onConnect:u}=(0,o.Z)(),{switchChain:x}=(0,c.Z)(),[f,m]=(0,a.useState)(!1),g=(0,l.Z)(),v=(0,a.useMemo)(()=>"from"===e.direction?t[e.inSymbol]:t[e.outSymbol],[e,t]),w=async()=>{let t=v.chain;if(m(!0),!n){u();return}if(t!==h){x({chainId:`0x${Number(t).toString(16)}`});return}let a=await p.getSigner(n),r=null;if(v.address){let t=new d.Contract(v.address,[{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],a),i=await t.decimals(),o=new s.default("from"===e.direction?e.inAmount:e.outAmount).mul(10**i),c=await t.balanceOf(n);if(o.gt(c)){m(!1),g.fail({title:`Insufficient ${v.displayName} Balance`});return}r=await t.transfer(e.senderAddress,o.toFixed(0))}else{let t=await p.getBalance(n),i=new s.default("from"===e.direction?e.inAmount:e.outAmount).mul(1e18);if(i.plus(1e-4).gt(t)){m(!1),g.fail({title:`Insufficient ${v.displayName} Balance`});return}r=await a.sendTransaction({to:e.senderAddress,value:i.toFixed(0)})}let o=await r.wait();1===o.status?(g.success({title:"Send successfully"}),i()):g.fail({title:"Send failed"})};return(0,a.useEffect)(()=>{f&&w()},[n,h]),{showButton:v.chain,handleInWallet:w}}[s,r,o,c,l]=h.then?(await h)():h,n()}catch(e){n(e)}})},35500:(e,t,i)=>{i.d(t,{Cr:()=>p,Hz:()=>r,MD:()=>f,PQ:()=>a,TK:()=>d,WY:()=>x,X0:()=>l,hm:()=>o,k_:()=>u,mu:()=>c});var n=i(57518),s=i.n(n);let a=s().div.withConfig({componentId:"sc-8b19e721-0"})`
  padding-top: 30px;
  width: 1244px;
  margin: 0 auto;
  position: relative;
`,r=s().div.withConfig({componentId:"sc-8b19e721-1"})`
  position: relative;
  z-index: 5;
  padding-top: 325px;
`,o=s().img.withConfig({componentId:"sc-8b19e721-2"})`
  width: 455.122px;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  transition: 0.3s;
  opacity: ${({$show:e})=>e?1:0};
`,c=s().div.withConfig({componentId:"sc-8b19e721-3"})`
  width: 792px;
  margin: 0 auto;
  position: relative;
`,l=s().div.withConfig({componentId:"sc-8b19e721-4"})`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #afafaf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,d=s().div.withConfig({componentId:"sc-8b19e721-5"})`
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
  margin-top: 9px;
  text-align: center;
`,h=s().div.withConfig({componentId:"sc-8b19e721-6"})`
  width: 360.834px;
  height: 398.334px;
  position: absolute;
  z-index: 1;
  background-image: url(/images/shush/bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
`,p=s()(h).withConfig({componentId:"sc-8b19e721-7"})`
  transform: rotate(-75deg);
  right: -52px;
  top: -200px;
`,u=s()(h).withConfig({componentId:"sc-8b19e721-8"})`
  transform: rotate(-77.957deg);
  left: -106px;
  top: 286px;
`,x=s().div.withConfig({componentId:"sc-8b19e721-9"})`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  padding: 28px 16px 12px 0px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`,f=s().div.withConfig({componentId:"sc-8b19e721-10"})`
  color: #979abe;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding-top: 40px;
  opacity: 0.5;
`}};