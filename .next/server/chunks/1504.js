"use strict";exports.id=1504,exports.ids=[1504],exports.modules={14283:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>g});var s=i(20997),a=i(16689),o=i(63658),c=i(32245),r=i(67032),d=i(39278),l=i(19328),p=i(11163),x=e([r,l]);[r,l]=x.then?(await x)():x;let h=({campaign:e,categories:t,campaignsContainerClassName:i})=>{let{like:n,handleLike:a}=(0,r.Z)(e.id,"quest_campaign");return s.jsx(l.uY,{children:s.jsx(l.GC,{children:(0,s.jsxs)(l.D,{children:[(0,s.jsxs)(l.eb,{children:[(0,s.jsxs)(l.SD,{style:{width:900},children:[s.jsx(l.X0,{children:e.name}),s.jsx(l.yG,{children:e.description})]}),(0,s.jsxs)(l.F8,{children:[e.start_time>Date.now()&&s.jsx("div",{children:"Upcoming"}),e.start_time>Date.now()?s.jsx(d.Z,{color:["DapDapXLi","DapDapTwitterSpace"].includes(i)?"black":"white",endTime:Number(e.start_time)}):s.jsx(d.Z,{color:["DapDapXLi","DapDapTwitterSpace"].includes(i)?"black":"white",endTime:Number(e.end_time)})]})]}),(0,s.jsxs)(l.e2,{children:[s.jsx(l.SD,{style:{marginBottom:13,display:"flex"},children:(0,s.jsxs)(l.w5,{style:{padding:"0px 10px 0px 6px"},children:[s.jsx(l.Vs,{$size:20}),(0,s.jsxs)("span",{style:{color:"#EBF479"},children:["Extra ",e.reward," PTS"]})]})}),s.jsx(l.SD,{style:{marginBottom:13,display:"flex"},children:(0,s.jsxs)(l.w5,{children:[(0,s.jsxs)("span",{children:[e.quests.total," Quests:"]}),e.quests.total_category.sort((e,t)=>e.quest_category_id-t.quest_category_id).map(({total:e,quest_category_id:i})=>(0,s.jsxs)("span",{style:{color:`var(--${t[i]?.name}-color`},children:[e," #",t[i]?.name]},i))]})}),s.jsx(l.SD,{style:{display:"flex"},children:(0,s.jsxs)(l.w5,{children:[(0,c.fD)(e.start_time,e.end_time)," UTC"]})})]})]})})})},g=(0,a.memo)(({onLoad:e,loading:t,campaigns:i,categoryLoading:n,categories:c})=>{let r=(0,p.useRouter)();(0,a.useEffect)(()=>{!t&&i.length&&e(i[0].id)},[t,i]);let d="string"==typeof r.query.campaignName?r.query.campaignName.replace(/\s/g,"").split(".")[0]:"";return s.jsx(l.ts,{className:d,children:t||n?s.jsx(l.u,{children:s.jsx(o.Z,{size:30})}):i.map(e=>s.jsx(h,{campaignsContainerClassName:d,campaign:e,categories:c},e.id))})});n()}catch(e){n(e)}})},19328:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{D:()=>x,F8:()=>w,GC:()=>p,SD:()=>m,Vs:()=>c.Vs,X0:()=>c.X0,e2:()=>f,eb:()=>h,ts:()=>j,u:()=>d,uY:()=>l,w5:()=>u,yG:()=>g});var s=i(66197),a=i(57518),o=i.n(a),c=i(44945),r=e([s]);s=(r.then?(await r)():r)[0];let d=o().div.withConfig({componentId:"sc-6a4b365-0"})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`,l=o().div.withConfig({componentId:"sc-6a4b365-1"})`
  background: radial-gradient(100% 100% at 0% 0%, #AE92FF 0%, #6D2DF3 100%);
  /* height: 254px; */
`,p=o().div.withConfig({componentId:"sc-6a4b365-2"})`
  padding: 30px 30px 26px;
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  /* padding-bottom: 100px; */
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`,x=o().div.withConfig({componentId:"sc-6a4b365-3"})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`,h=o().div.withConfig({componentId:"sc-6a4b365-4"})`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;o()(s.motion.div).withConfig({componentId:"sc-6a4b365-5"})`
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
`;let g=o().div.withConfig({componentId:"sc-6a4b365-6"})`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
`,f=o().div.withConfig({componentId:"sc-6a4b365-7"})`
  margin-top: 18px;
`,m=o().div.withConfig({componentId:"sc-6a4b365-8"})`
`,u=o().div.withConfig({componentId:"sc-6a4b365-9"})`
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
`;o().div.withConfig({componentId:"sc-6a4b365-10"})`
  display: flex;
  align-items: center;
  gap: 9px;
  align-self: flex-end;
`,o().div.withConfig({componentId:"sc-6a4b365-11"})`
  display: flex;
  align-items: center;
  gap: -6px;
`,o().div.withConfig({componentId:"sc-6a4b365-12"})`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;let w=o().div.withConfig({componentId:"sc-6a4b365-13"})`
  display: flex;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  gap: 20px;
`,j=o().div.withConfig({componentId:"sc-6a4b365-14"})`

  &.DapDapXLi {
    ${l} {
      background: url('/images/quest/second_bg.png') center no-repeat;
      background-size: cover;
    }
    ${c.X0} {
      color: #000;
    }
    ${g} {
      color: #000;
    }
  }
  &.DapDapXStargate {
    ${l} {
      background: url('/images/quest/first_bg.png') center no-repeat;
      background-size: cover;
    }
  }
  &.DapDapXBitget {
    ${l} {
      background: url('/images/quest/four_bg.png') center no-repeat;
      background-size: cover;
    }
  }
  &.DapDapTwitterSpace {
    ${l} {
      background: url('/images/quest/third_bg.png') center no-repeat;
      background-size: cover;
    }
    ${c.X0} {
      color: #000;
    }
    ${g} {
      color: #000;
    }
  }
  
  
`;n()}catch(e){n(e)}})},10782:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var s=i(20997),a=i(16689),o=i(63658),c=i(63858),r=i(34675),d=i(63880),l=e([r,d]);[r,d]=l.then?(await l)():l;let p=(0,a.memo)(({loading:e,quests:t})=>{let i=(0,a.useMemo)(()=>{if(!t||!t.length)return 0;let e=0,i=0;return(t.forEach(t=>{i++,t.action_completed>=t.total_action&&e++}),0===i)?0:Math.ceil(e/i*100)},[t]);return(0,s.jsxs)(d.PQ,{children:[(0,s.jsxs)(d.eb,{children:[s.jsx(d.X0,{children:"Quests"}),(0,s.jsxs)(d.rX,{children:[(0,s.jsxs)(d.Fv,{children:[s.jsx("span",{children:"You've achieved"}),(0,s.jsxs)("span",{style:{fontWeight:"700"},children:[" ",i||0,"%"]})]}),s.jsx(c.Z,{size:8,value:i||0})]})]}),e?s.jsx(d.u,{children:s.jsx(o.Z,{size:60})}):s.jsx(d.uy,{children:t.sort((e,t)=>e-t).map(e=>e?s.jsx(r.Z,{quest:e},e.id+Math.random()):s.jsx("div",{},Date.now()))})]})});n()}catch(e){n(e)}})},63880:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Fv:()=>x,PQ:()=>d,X0:()=>o.X0,eb:()=>l,rX:()=>p,u:()=>c.u,uy:()=>h});var s=i(57518),a=i.n(s),o=i(44945),c=i(19328),r=e([c]);c=(r.then?(await r)():r)[0];let d=a().div.withConfig({componentId:"sc-4f705153-0"})`
  margin-top: 45px;
`,l=a().div.withConfig({componentId:"sc-4f705153-1"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;a().div.withConfig({componentId:"sc-4f705153-2"})`
  font-size: 20px;
  font-weight: 700;
  line-height: 120%;
  margin-top: 20px;
`;let p=a().div.withConfig({componentId:"sc-4f705153-3"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 244px;
`,x=a().div.withConfig({componentId:"sc-4f705153-4"})`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,h=a().div.withConfig({componentId:"sc-4f705153-5"})`
  margin-top: 14px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;n()}catch(e){n(e)}})},39278:(e,t,i)=>{i.d(t,{Z:()=>h});var n=i(20997),s=i(16689),a=i(52504),o=i(32245),c=i(57518),r=i.n(c);let d=r().div.withConfig({componentId:"sc-ac397889-0"})`
  display: flex;
  flex-direction: column;
`,l=r().div.withConfig({componentId:"sc-ac397889-1"})`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`,p=r().div.withConfig({componentId:"sc-ac397889-2"})`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  width: 50px;
`,x=r().div.withConfig({componentId:"sc-ac397889-3"})`
  display: flex;
  gap: 6px;
  &.black {
    ${l}, 
    ${p} {
      color: #000;
    }
  }
`,h=(0,s.memo)(({endTime:e,color:t})=>{let[i,c]=(0,s.useState)(!1),{secondsRemaining:r}=(0,a.Z)(e/1e3),h=(0,o.$z)(r);return(0,s.useEffect)(()=>{c(!0)},[]),i?(0,n.jsxs)(x,{className:t,children:[(0,n.jsxs)(d,{children:[n.jsx(l,{children:(0,o.B0)(h.days)}),n.jsx(p,{children:"Days"})]}),n.jsx(d,{children:n.jsx(l,{children:":"})}),(0,n.jsxs)(d,{children:[n.jsx(l,{children:(0,o.B0)(h.hours)}),n.jsx(p,{children:"Hours"})]}),n.jsx(d,{children:n.jsx(l,{children:":"})}),(0,n.jsxs)(d,{children:[n.jsx(l,{children:(0,o.B0)(h.minutes)}),n.jsx(p,{children:"Mins"})]}),n.jsx(d,{children:n.jsx(l,{children:":"})}),(0,n.jsxs)(d,{children:[n.jsx(l,{children:(0,o.B0)(h.seconds)}),n.jsx(p,{children:"sec"})]})]}):n.jsx("div",{})})},67032:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>l});var s=i(16689),a=i(59397),o=i(42501),c=i(14300),r=i(78579),d=e([a,c]);function l(e,t){let[i,n]=(0,s.useState)(!1),[d,l]=(0,s.useState)(!1),p=(0,c.Z)(),{check:x}=(0,a.Z)({isNeedAk:!0,isQuiet:!0}),h=(0,s.useCallback)(async()=>{if(!d)try{let i=await (0,r.U2)(`${o.h}/api/user/favorite?id=${e}&category=${t}`),s=i.data?.favorite;n(s),l(!1)}catch(e){l(!1)}},[d,e,t]),g=(0,s.useCallback)(async i=>{if(d)return;l(!0);let s=p.loading({title:"Pending..."});try{let a=await (0,r.v_)(`${o.h}/api/user/favorite`,{id:e,category:t,favorite:i});if(0!==a.code)throw Error(a.msg);p.dismiss(s),p.success({title:`${i?"Favourited":"Unfavourited"} successfully`}),n(i),l(!1)}catch(e){l(!1),p.dismiss(s),p.fail({title:`${i?"Favourited":"Unfavourited"} failed`})}},[e,t]);return(0,s.useEffect)(()=>{e&&t&&x(()=>{h()})},[e,t]),{like:i,loading:d,handleLike:e=>{x(()=>{g(e)},!1)}}}[a,c]=d.then?(await d)():d,n()}catch(e){n(e)}})}};