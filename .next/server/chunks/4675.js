"use strict";exports.id=4675,exports.ids=[4675],exports.modules={57192:(i,e,t)=>{t.a(i,async(i,n)=>{try{t.d(e,{Z:()=>s});var o=t(20997),a=t(39332),d=t(16689),r=t(8789),p=i([r]);r=(p.then?(await p)():p)[0];let l=o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"5",height:"8",viewBox:"0 0 5 8",fill:"none",children:o.jsx("path",{opacity:"0.5",d:"M1 1L4 4L1 7",stroke:"white",strokeLinecap:"round"})}),s=(0,d.memo)(({style:i,navs:e})=>{let t=(0,a.useRouter)();return o.jsx(r.P,{style:i,children:e.map((i,n)=>(0,o.jsxs)(r.Y,{$active:n===e.length-1,$disabled:!i.path,onClick:()=>{n!==e.length-1&&i.path&&t.push(i.path)},whileHover:{color:n!==e.length-1&&i.path?"#ebf479":n===e.length-1?"#fff":"rgba(255, 255, 255, 0.5)"},children:[i.name,n!==e.length-1&&l]},i.path||n))})});n()}catch(i){n(i)}})},8789:(i,e,t)=>{t.a(i,async(i,n)=>{try{t.d(e,{P:()=>p,Y:()=>l});var o=t(66197),a=t(57518),d=t.n(a),r=i([o]);o=(r.then?(await r)():r)[0];let p=d().div.withConfig({componentId:"sc-166c72-0"})`
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 9px;
  align-items: center;
`,l=d()(o.motion.div).withConfig({componentId:"sc-166c72-1"})`
  display: flex;
  gap: 9px;
  align-items: center;
  transition: 0.3s;
  color: ${({$active:i})=>i?"#fff":"rgba(255, 255, 255, 0.5)"};
  cursor: ${({$disabled:i})=>i?"default":"pointer"};
`;n()}catch(i){n(i)}})},1929:(i,e,t)=>{t.a(i,async(i,n)=>{try{t.d(e,{Z:()=>c});var o=t(20997),a=t(39332),d=t(16689),r=t(9741),p=t(27240),l=t(43617),s=i([r]);r=(s.then?(await s)():s)[0];let c=(0,d.memo)(i=>{let{name:e,description:t,route:n,logo:s,category_ids:c,id:h,bp:x}=i,f=(0,a.useRouter)(),{categories:g}=(0,p.Z)(),{open:m}=(0,r.Z)(),w=(0,d.useMemo)(()=>{let i=[];return("string"==typeof c?[c]:c).forEach(e=>{let t=g[e];t&&i.push({id:t.id,name:t.name})}),i},[g]);return o.jsx(l.C5,{children:(0,o.jsxs)(l.FO,{children:[o.jsx(l.Ni,{src:s}),(0,o.jsxs)(l.xT,{children:[o.jsx(l.eb,{children:o.jsx(l.Ic,{children:e})}),o.jsx(l.lq,{children:t}),o.jsx(l.pT,{children:w.map(i=>o.jsx(l.mV,{className:i.name,children:i.name},i.id))})]}),(0,o.jsxs)(l.Tt,{children:[o.jsx(l.QQ,{"data-bp":x?.detail,onClick:()=>{f.push(`/dapps-details?dapp_id=${h}`)},children:"Detail"}),o.jsx(l.QQ,{"data-bp":x?.dapp,onClick:()=>{m({dapp:i,from:"alldapps"})},children:"dApp"})]})]})})});n()}catch(i){n(i)}})},2865:(i,e,t)=>{t.a(i,async(i,n)=>{try{t.d(e,{Z:()=>l});var o=t(20997),a=t(16689),d=t(1929),r=t(43617),p=i([d]);d=(p.then?(await p)():p)[0];let l=(0,a.memo)(({dapps:i,bp:e})=>o.jsx(r.SA,{children:i.map(i=>o.jsx(d.Z,{...i,bp:e},i.id))}));n()}catch(i){n(i)}})},43617:(i,e,t)=>{t.d(e,{C5:()=>d,FO:()=>m,Ic:()=>s,Ni:()=>r,QQ:()=>g,SA:()=>a,Tt:()=>f,eb:()=>l,lq:()=>c,mV:()=>x,pT:()=>h,xT:()=>p});var n=t(57518),o=t.n(n);let a=o().div.withConfig({componentId:"sc-4bd1f3aa-0"})`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 30px;
  margin-top: 30px;
`,d=o().div.withConfig({componentId:"sc-4bd1f3aa-1"})`
  padding: 16px 14px 0px;
  border-radius: 20px;
  transition: 0.5s;
  box-sizing: border-box;
  width: calc(33.333333333% - 20px);
  &:hover {
    background: #21232a;
  }

  @media (max-width: 1640px) {
    width: calc(50% - 16px);
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`,r=o().img.withConfig({componentId:"sc-4bd1f3aa-2"})`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  margin-right: 16px;
`,p=o().div.withConfig({componentId:"sc-4bd1f3aa-3"})`
  margin-right: 6px;
  width: calc(100% - 172px);
`,l=o().div.withConfig({componentId:"sc-4bd1f3aa-4"})`
  display: flex;
  align-items: center;
  gap: 7px;
`,s=o().div.withConfig({componentId:"sc-4bd1f3aa-5"})`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;o().div.withConfig({componentId:"sc-4bd1f3aa-6"})`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #ffdd4d;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;let c=o().div.withConfig({componentId:"sc-4bd1f3aa-7"})`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,h=o().div.withConfig({componentId:"sc-4bd1f3aa-8"})`
  display: flex;
  gap: 6px;
  margin-top: 9px;
`,x=o().div.withConfig({componentId:"sc-4bd1f3aa-9"})`
  border-radius: 30px;
  padding: 0px 8px;
  height: 20px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 400;

  &.dexs {
    color: #acfced;
  }
  &.bridge {
    color: #e3e99d;
  }
  &.liquidity {
    color: #aad6ff;
  }
`,f=o().div.withConfig({componentId:"sc-4bd1f3aa-10"})`
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-shrink: 0;
`,g=o().button.withConfig({componentId:"sc-4bd1f3aa-11"})`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.5);
  width: 78px;
  height: 26px;
  flex-shrink: 0;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &:hover {
    background: #ebf479;
    color: #000;
  }
  &:active {
    opacity: 0.8;
  }
`,m=o().div.withConfig({componentId:"sc-4bd1f3aa-12"})`
  display: flex;
  border-bottom: 1px solid #26282f;
  padding-bottom: 33px;
  height: 100%;
  box-sizing: border-box;
`},52225:(i,e,t)=>{t.a(i,async(i,n)=>{try{t.d(e,{Z:()=>s});var o=t(20997),a=t(16689),d=t(1718),r=t(59397),p=t(29107),l=i([d,r]);[d,r]=l.then?(await l)():l;let s=(0,a.memo)(({chainId:i,bp:e})=>{let[{},t]=(0,d.useSetChain)(),{check:n}=(0,r.Z)({isNeedAk:!1});return(0,o.jsxs)(p.O,{onClick:()=>{n(()=>{t({chainId:`0x${i.toString(16)}`})})},"data-bp":e,children:[o.jsx("div",{children:"Add to MetaMask"}),o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"7",height:"7",viewBox:"0 0 7 7",fill:"none",children:o.jsx("path",{d:"M0.646447 5.64645C0.451184 5.84171 0.451184 6.15829 0.646447 6.35355C0.841709 6.54882 1.15829 6.54882 1.35355 6.35355L0.646447 5.64645ZM6.5 1C6.5 0.723857 6.27614 0.5 6 0.5L1.5 0.5C1.22386 0.5 1 0.723857 1 1C1 1.27614 1.22386 1.5 1.5 1.5L5.5 1.5L5.5 5.5C5.5 5.77614 5.72386 6 6 6C6.27614 6 6.5 5.77614 6.5 5.5L6.5 1ZM1.35355 6.35355L6.35355 1.35355L5.64645 0.646446L0.646447 5.64645L1.35355 6.35355Z",fill:"#979ABE"})})]})});n()}catch(i){n(i)}})},29107:(i,e,t)=>{t.d(e,{O:()=>a});var n=t(57518),o=t.n(n);let a=o().div.withConfig({componentId:"sc-88266c76-0"})`
  width: 135px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: rgba(22, 24, 29, 0.5);
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 9px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`}};