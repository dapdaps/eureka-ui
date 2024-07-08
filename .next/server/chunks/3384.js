"use strict";exports.id=3384,exports.ids=[3384],exports.modules={44945:(e,t,i)=>{i.d(t,{PQ:()=>a,Vs:()=>o,X0:()=>r});var n=i(57518),s=i.n(n);let a=s().div.withConfig({componentId:"sc-f5620229-0"})`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`,r=s().div.withConfig({componentId:"sc-f5620229-1"})`
  color: #fff;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`,o=s().div.withConfig({componentId:"sc-f5620229-2"})`
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>e-1}px;
  background-image: url(/images/quest/coin.png);
  background-size: 100%;
  background-repeat: no-repeat;
`},30120:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var s=i(20997),a=i(66197),r=i(16689),o=i(6234),c=i(24405),d=i(24268),l=i(69416),g=e([a,c]);[a,c]=g.then?(await g)():g;let p=(0,r.memo)(({loading:e,list:t,page:i,info:n,maxPage:r,handlePageChange:g,userLoading:p,handleRefresh:h,userInfo:x,totalReward:m,myRank:f})=>s.jsx(a.AnimatePresence,{mode:"wait",children:s.jsx(a.motion.div,{...o.nC,children:(0,s.jsxs)(l.PQ,{children:[x.address&&s.jsx(l.cp,{children:d.L.map(e=>(0,s.jsxs)(l.ji,{$width:e.width,$gap:e.gap,$align:e.align,children:["rank"===e.key&&`#${f}`,"user"===e.key&&s.jsx(c.n5,{user:x.address,avatar:x.avatar}),"pts"===e.key&&s.jsx(c.LD,{pts:m})]},e.key))}),s.jsx(c.ZP,{list:t,maxPage:r,page:i,handlePageChange:g,loading:e})]})})}));n()}catch(e){n(e)}})},69416:(e,t,i)=>{i.d(t,{PQ:()=>r,cp:()=>o,ji:()=>a.ji});var n=i(57518),s=i.n(n),a=i(83044);let r=s().div.withConfig({componentId:"sc-49538654-0"})`
  width: 1244px;
  margin: 27px auto;
  border-radius: 32px;
  border: 1px solid #32353f;
  background: #21232a;
  padding: 40px 0px;
`;s().div.withConfig({componentId:"sc-49538654-1"})`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`,s().div.withConfig({componentId:"sc-49538654-2"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 22px 0px 49px;
`,s().div.withConfig({componentId:"sc-49538654-3"})`
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
`;let o=s().div.withConfig({componentId:"sc-49538654-4"})`
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
`;s().span.withConfig({componentId:"sc-49538654-5"})`
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
`},24268:(e,t,i)=>{i.d(t,{L:()=>n,M:()=>s});let n=[{label:"Rank",width:20,key:"rank",gap:10},{label:"Address",width:60,key:"user",align:"left",gap:9},{label:"PTS",width:20,key:"pts",align:"right",gap:6}],s={1:["#FFEE98","#E9AE45"],2:["#D8E7FF","#85628A"],3:["#E7BA9A","#805F48"]}},24405:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{LD:()=>h,ZP:()=>x,n5:()=>p});var s=i(20997),a=i(16689),r=i(63658),o=i(21004),c=i(24268),d=i(83044),l=e([o]);o=(l.then?(await l)():l)[0];let g=({rank:e})=>(0,s.jsxs)(s.Fragment,{children:[s.jsx(d.Pl,{children:e<4&&(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25",height:"25",viewBox:"0 0 25 25",fill:"none",children:[s.jsx("path",{d:"M20.6407 15.1593C21.6627 17.5953 22.6468 20.0472 23.5925 22.5139C23.3842 22.7102 23.3333 22.8241 23.2305 22.8639C23.1815 22.8823 23.1273 22.8807 23.0795 22.8593L18.4388 20.7852L16.3842 24.4796C16.3406 24.5578 16.2753 24.6217 16.1961 24.6636C16.117 24.7054 16.0274 24.7234 15.9382 24.7154C15.8491 24.7073 15.7641 24.6736 15.6937 24.6183C15.6233 24.563 15.5705 24.4884 15.5416 24.4037L13.6842 18.9352C16.6657 19.1222 18.9833 17.8639 20.6407 15.1593ZM4.36844 15.1C5.97955 17.8537 8.29529 19.1315 11.3157 18.9352L9.45825 24.4037C9.42935 24.4884 9.37651 24.563 9.30611 24.6183C9.23571 24.6736 9.15079 24.7073 9.06162 24.7154C8.97245 24.7234 8.88287 24.7054 8.80371 24.6636C8.72456 24.6217 8.65924 24.5578 8.61566 24.4796L6.56011 20.7852L1.9277 22.8565C1.8773 22.879 1.82006 22.8806 1.76844 22.8611C1.66011 22.8204 1.60548 22.7 1.40918 22.5019C2.21844 20.3565 3.20455 17.8889 4.36844 15.1ZM12.3194 0C17.0944 0 20.9666 3.9287 20.9666 8.77407C20.9666 13.6204 17.0944 17.5481 12.3184 17.5481C7.54344 17.5481 3.67214 13.6204 3.67214 8.77407C3.67214 3.9287 7.54344 0 12.3194 0ZM11.9462 3.55556L11.9027 3.62685L10.5805 6.34537L7.60918 6.78333C7.53096 6.79476 7.45697 6.82601 7.39426 6.87413C7.33155 6.92225 7.2822 6.98562 7.25092 7.05821C7.21963 7.13081 7.20746 7.2102 7.21555 7.28883C7.22364 7.36746 7.25173 7.44271 7.29714 7.50741L7.35177 7.5713L9.50548 9.70093L8.99899 12.7009C8.9857 12.7793 8.99278 12.8597 9.01956 12.9345C9.04634 13.0093 9.09192 13.0759 9.15191 13.128C9.2119 13.1801 9.28428 13.2158 9.36209 13.2319C9.43991 13.2479 9.52053 13.2436 9.59622 13.2194L9.67307 13.187L12.3194 11.7759L14.9657 13.187C15.0357 13.2243 15.1141 13.243 15.1935 13.2413C15.2728 13.2395 15.3504 13.2174 15.4187 13.1771C15.487 13.1367 15.5438 13.0795 15.5837 13.0109C15.6235 12.9422 15.6451 12.8645 15.6462 12.7852L15.6397 12.7019L15.1323 9.70185L17.287 7.5713C17.3433 7.51581 17.3845 7.44683 17.4066 7.37091C17.4287 7.29499 17.431 7.21468 17.4133 7.13762C17.3955 7.06056 17.3584 6.98933 17.3053 6.93072C17.2522 6.8721 17.185 6.82806 17.1101 6.80278L17.0286 6.78426L14.0583 6.34537L12.7351 3.62685C12.7002 3.55529 12.6474 3.49395 12.5818 3.44876C12.5162 3.40357 12.4401 3.37606 12.3608 3.36889C12.2814 3.36172 12.2016 3.37514 12.129 3.40784C12.0564 3.44054 11.9934 3.49141 11.9462 3.55556Z",fill:`url(#paint0_linear_928_6455_${e})`}),s.jsx("defs",{children:(0,s.jsxs)("linearGradient",{id:`paint0_linear_928_6455_${e}`,x1:"12.5008",y1:"0",x2:"12.5008",y2:"24.7172",gradientUnits:"userSpaceOnUse",children:[s.jsx("stop",{stopColor:c.M[e][0]}),s.jsx("stop",{offset:"1",stopColor:c.M[e][1]})]})})]})}),s.jsx("span",{children:e})]}),p=({user:e,avatar:t})=>(0,s.jsxs)(s.Fragment,{children:[s.jsx(d.vu,{src:t}),s.jsx("span",{children:e})]}),h=({pts:e})=>(0,s.jsxs)(s.Fragment,{children:[s.jsx(d.Vs,{$size:21}),s.jsx("span",{children:(0,o.EO)(e,1)})]}),x=(0,a.memo)(({list:e,maxPage:t,page:i,handlePageChange:n,loading:a})=>(0,s.jsxs)(d.PQ,{children:[s.jsx(d.eb,{children:c.L.map(e=>s.jsx(d.qj,{$width:e.width,$align:e.align,children:e.label},e.key))}),a?s.jsx(d.u,{children:s.jsx(r.Z,{size:60})}):e.length>0?(0,s.jsxs)(s.Fragment,{children:[s.jsx(d.vc,{children:e.map(e=>s.jsx(d.N0,{children:c.L.map(t=>(0,s.jsxs)(d.ji,{$width:t.width,$gap:t.gap,$align:t.align,children:["rank"===t.key&&s.jsx(g,{rank:e.rank}),"user"===t.key&&s.jsx(p,{user:e.account.address,avatar:e.account.avatar}),"pts"===t.key&&s.jsx(h,{pts:e.reward})]},t.key))},e.rank))}),(0,s.jsxs)(d._3,{children:[(0,s.jsxs)(d.SG,{children:["Page ",i," of ",t]}),(0,s.jsxs)(d.fL,{children:[s.jsx(d.UA,{$disabled:1===i,onClick:()=>{i>1&&n(-1)},children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:s.jsx("path",{d:"M9 1L2 8L9 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})})}),s.jsx(d.UA,{$disabled:i===t,onClick:()=>{t>i&&n(1)},children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"16",viewBox:"0 0 10 16",fill:"none",children:s.jsx("path",{d:"M1 1L8 8L1 15",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})})})]})]})]}):s.jsx(d.HY,{children:"No Data"})]}));n()}catch(e){n(e)}})},83044:(e,t,i)=>{i.d(t,{HY:()=>a.HY,N0:()=>c,PQ:()=>o,Pl:()=>h,SG:()=>f,UA:()=>w,Vs:()=>r.Vs,_3:()=>m,eb:()=>g,fL:()=>u,ji:()=>d,qj:()=>l,u:()=>a.u,vc:()=>p,vu:()=>x});var n=i(57518),s=i.n(n),a=i(4655),r=i(44945);let o=s().div.withConfig({componentId:"sc-c27fbb06-0"})`
  padding-top: 20px;
`,c=s().div.withConfig({componentId:"sc-c27fbb06-1"})`
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
`,d=s().div.withConfig({componentId:"sc-c27fbb06-2"})`
  display: flex;
  align-items: center;
  gap: ${({$gap:e})=>e+"px"};
  width: ${({$width:e})=>e+"%"};
  justify-content: ${({$align:e})=>"left"===e?"flex-start":"right"===e?"flex-end":e};
`,l=s().div.withConfig({componentId:"sc-c27fbb06-3"})`
  width: ${({$width:e})=>e+"%"};
  text-align: ${({$align:e})=>e};
`,g=s().div.withConfig({componentId:"sc-c27fbb06-4"})`
  display: flex;
  align-items: center;
  padding-left: 62px;
  padding-right: 80px;
  color: #979abe;
  font-size: 18px;
  font-weight: 400;
  height: 55px;
`,p=s().div.withConfig({componentId:"sc-c27fbb06-5"})``,h=s().div.withConfig({componentId:"sc-c27fbb06-6"})`
  width: 25px;
  height: 25px;
  margin-top: -7px;
`,x=s().img.withConfig({componentId:"sc-c27fbb06-7"})`
  width: 26px;
  height: 26px;
`,m=s().div.withConfig({componentId:"sc-c27fbb06-8"})`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 80px;
  gap: 22px;
  margin-top: 20px;
`,f=s().div.withConfig({componentId:"sc-c27fbb06-9"})`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
`,u=s().div.withConfig({componentId:"sc-c27fbb06-10"})`
  display: flex;
  align-items: center;
  gap: 10px;
`,w=s().div.withConfig({componentId:"sc-c27fbb06-11"})`
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
`},98599:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>b});var s=i(20997),a=i(1718),r=i(48982),o=i(11163),c=i(16689),d=i(55054),l=i(63658),g=i(42501),p=i(49775),h=i(4669),x=i(78579),m=i(27416),f=i(83812),u=i(52067),w=e([a,p,m,u]);[a,p,m,u]=w.then?(await w)():w;let b=(0,c.memo)(({from:e,inviteCode:t,platform:i})=>{console.log("from:",e,"inviteCode:",t);let{copy:n}=(0,p.Z)(),[{wallet:w,connecting:b},j,C]=(0,a.useConnectWallet)();(0,o.useRouter)();let[y,k]=(0,c.useState)(""),[v,_]=(0,c.useState)(!1),[S,$]=(0,c.useState)("success"),[I,L]=(0,c.useState)("uncheck"),[z,P]=(0,c.useState)([]),[A,U]=(0,c.useState)([]),[E,N]=(0,c.useState)(0),[T,D]=(0,c.useState)(0),[Z,R]=(0,c.useState)({}),[q,F]=(0,c.useState)(!1),W=()=>{window.sessionStorage.setItem(x.Ve,"{}"),(0,d.uj)(""),(0,r.deleteCookie)("AUTHED_ACCOUNT"),(0,r.deleteCookie)("BNS_NAME")},M=async()=>{w&&await C(w),W()};async function Q(){let e=await (0,x.U2)(`${g.h}/api/activity/check_account?category=${i}`);if(0!==e.code)return;let t=e.data.is_activity?"new":"old";L(t)}async function B(){let e=await (0,x.jo)(`${g.h}/api/invite/check-address/${y}`,i);0===e.code&&e.data.is_activated&&V()}async function H(){let e=await (0,x.U2)(`${g.h}/api/invite/check-address/${y}`);0===e.code&&(e.data.is_activated?V():O())}async function O(){let e=await (0,x.v_)(`${g.h}/api/invite/activate`,{address:y});e.data.is_success&&V()}async function V(){await (0,d.hP)(y),(0,r.setCookie)("AUTHED_ACCOUNT",y),Q()}async function Y(){let e=await (0,x.U2)(`${g.h}/api/activity/quest_list?category=${i}`);if(R({}),0!==e.code)return;let{advanced_quests:t,basic_quests:n}=e.data;P(t),U(n)}async function G(e){let t=await (0,x.v_)(`${g.h}/api/activity/claim`,{quest_id:e});return 0===t.code}(0,c.useEffect)(()=>{w&&k(w.accounts[0].address)},[w]);let J=()=>{R({rotate:360}),D(e=>e+1)},K=async e=>{if("completed"===e.status&&!e.is_claimed&&!q){F(!0);try{let t=await G(e.id);F(!1),t&&(_(!0),$("success"),N(e.reward),J())}catch(e){F(!1)}}};(0,c.useEffect)(()=>{"uncheck"!==I&&("new"===I&&Y(),"old"===I&&(_(!0),$("fail")))},[I,T]),(0,c.useEffect)(()=>{y&&("bg"===e&&B(),"bgUser"===e&&H())},[y]);let X=location.origin;return(0,s.jsxs)(u.W2,{children:[(0,s.jsxs)(u.jL,{className:i,children:[(0,s.jsxs)(u.TR,{children:[s.jsx(u.Ei,{src:"/images/marketing/dap-logo.svg"}),s.jsx(u.Ei,{src:"/images/marketing/X.svg"}),s.jsx(u.Ei,{src:f.y.get(i),style:"namlongdao"===i?{maxWidth:100}:{}})]}),s.jsx(u.p2,{children:"Ready to Claim Your Exclusive Rewards?"}),s.jsx(u.p2,{children:"Just complete a few simple quests!"})]}),(0,s.jsxs)(u.xu,{children:[s.jsx(u.t,{children:s.jsx(u.fm,{src:"/images/marketing/cap.svg"})}),s.jsx(u.Dx,{children:"Join Now to Win DapDap PTS"}),(0,s.jsxs)(u.h8,{children:["Step 1",Array.isArray(A)&&A.length&&A[0].is_claimed?s.jsx(u.wC,{src:"/images/marketing/done.svg"}):s.jsx(u.wC,{src:"/images/marketing/fresh.svg",onClick:J,animate:Z,transition:Z?.rotate?{ease:"linear",duration:.8,repeat:1/0}:{}})]}),w?s.jsx(u.zx,{onClick:M,children:"Disconnect"}):s.jsx(u.zx,{onClick:()=>{j()},children:"Connect wallet"}),A?.length?A.map(e=>(0,s.jsxs)("div",{children:[s.jsx(u.h8,{children:"Step 2"}),s.jsx(u.zx,{className:"completed"!==e.status?"blur":"",onClick:t=>K(e),children:q?s.jsx(l.Z,{size:16}):e.is_claimed?"Reward Already Claimed":(0,s.jsxs)(s.Fragment,{children:["Claim your",s.jsx(u.sN,{src:"/images/marketing/coin.svg"})," ",e.reward," PTS"]})})]},e.id)):(0,s.jsxs)(s.Fragment,{children:[s.jsx(u.h8,{children:"Step 2"}),(0,s.jsxs)(u.zx,{className:"blur",children:["Claim your",s.jsx(u.sN,{src:"/images/marketing/coin.svg"})," 200 PTS"]})]}),s.jsx(u.h8,{children:"Step 3"}),(0,s.jsxs)(u.CR,{className:A[0]?.status!=="completed"?"blur":"gradient",children:["Want additional PTS?",s.jsx("br",{}),"Head to our desktop site",s.jsx(u.Ak,{onClick:()=>{n(`${X}`)},children:s.jsx(u.TI,{src:"/images/marketing/copy.svg"})})]})]}),s.jsx(u.qK,{children:(0,s.jsxs)(u.P9,{onClick:h.l,children:["Ready to Ignite the Spark?",s.jsx(u.Ux,{src:"/images/marketing/star.png"})]})}),s.jsx(m.u_,{type:S,open:v,onClose:()=>_(!1),reward:E})]})});n()}catch(e){n(e)}})},83391:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>S});var s=i(20997),a=i(1718),r=i(48982),o=i(11163),c=i(16689),d=i(55054),l=i(42501),g=i(59397),p=i(49775),h=i(46545),x=i(79240),m=i(4669),f=i(78579),u=i(12302),w=i(72912),b=i(27416),j=i(30120),C=i(83812),y=i(13777),k=i(92357),v=e([a,g,p,h,x,u,b,j,k]);[a,g,p,h,x,u,b,j,k]=v.then?(await v)():v;let _={discord_role:"/images/marketing/join.svg",twitter_retweet:"/images/marketing/retweet.svg",twitter_follow:"/images/marketing/follow.svg",twitter_like:"/images/marketing/like.svg"},S=(0,c.memo)(({from:e,inviteCode:t,platform:i})=>{let{check:n}=(0,g.Z)({isNeedAk:!0,isQuiet:!0}),{loading:v,list:S,page:$,info:I,maxPage:L,handlePageChange:z,handleRefresh:P}=(0,y.Z)(i),{copy:A}=(0,p.Z)(),[{wallet:U,connecting:E},N,T]=(0,a.useConnectWallet)();(0,o.useRouter)();let[D,Z]=(0,c.useState)("Quests"),[R,q]=(0,c.useState)(""),[F,W]=(0,c.useState)(!1),[M,Q]=(0,c.useState)("success"),B=(0,w.Z)(),[H,O]=(0,c.useState)(!1),[V,Y]=(0,c.useState)("uncheck"),[G,J]=(0,c.useState)([]),[K,X]=(0,c.useState)([]),[ee,et]=(0,c.useState)(0),[ei,en]=(0,c.useState)(0),[es,ea]=(0,c.useState)(0),[er,eo]=(0,c.useState)(0),[ec,ed]=(0,c.useState)(),{userInfo:el,queryUserInfo:eg}=(0,h.Z)(),{info:ep,queryUserReward:eh}=(0,x.Z)(),[ex,em]=(0,c.useState)(!1),[ef,eu]=(0,c.useState)({height:0}),[ew,eb]=(0,c.useState)(0),[ej,eC]=(0,c.useState)(0),[ey,ek]=(0,c.useState)(0),[ev,e_]=(0,c.useState)([]),[eS,e$]=(0,c.useState)(!1),[eI,eL]=(0,c.useState)([!1,!1,!1,!1]),[ez,eP]=(0,c.useState)(!1),eA=`${window.location.origin}${window.location.pathname}`;console.log("redirectUri: ",eA);let{loading:eU,type:eE,handleBind:eN}=(0,u.Z)({onSuccess:()=>{eo(Date.now()),eg()},redirect_uri:eA});async function eT(){let e=await (0,f.U2)(`${l.h}/api/activity/check_account?category=${i}`);if(0!==e.code)return;let t=e.data.is_activity?"new":"old";Y(t)}async function eD(){let e=await (0,f.jo)(`${l.h}/api/invite/check-address/${R}`,i);0===e.code&&e.data.is_activated&&eq()}async function eZ(){let e=await (0,f.U2)(`${l.h}/api/invite/check-address/${R}`);0===e.code&&(e.data.is_activated?eq():eR())}async function eR(){let e=await (0,f.v_)(`${l.h}/api/invite/activate`,{address:R});e.data.is_success&&eq()}async function eq(){await (0,d.hP)(R),(0,r.setCookie)("AUTHED_ACCOUNT",R),eT()}async function eF(){let e=await (0,f.U2)(`${l.h}/api/activity/quest_list?category=${i}`);if(e$(!1),eL([!1,!1,!1,!1]),0!==e.code)return;let{advanced_quests:t,basic_quests:n}=e.data;J(t),X(n)}async function eW(){let e=await (0,f.U2)(`${l.h}/api/invite/list`);if(0===e.code)return e.data}async function eM(){let e=await (0,f.U2)(`${l.h}/api/activity/reward?category=${i}`);0===e.code&&(e$(!1),eL([!1,!1,!1,!1]),ek(e.data?.reward||0),en(e.data?.rank||0))}async function eQ(e){await (0,f.U2)(`${l.h}/api/activity/check_quest?quest_id=${e}`)}(0,c.useEffect)(()=>{U&&q(U.accounts[0].address)},[U]);let eB=async()=>{let e=await eW();eb(e?.data?.length),eC(e?.invite_reward)};async function eH(e){let t=await (0,f.v_)(`${l.h}/api/activity/claim`,{quest_id:e});return 0===t.code}let eO=()=>{ea(e=>e+1),eo(Date.now())},eV=async e=>{if(R&&"completed"===e.status&&!e.is_claimed&&!ex){em(!0);try{let t=await eH(e.id);em(!1),t&&(W(!0),Q("success"),et(e.reward),eh(),eO())}catch(e){em(!1)}}};(0,c.useEffect)(()=>{eF(),"uncheck"!==V&&"old"===V&&(W(!0),Q("fail"))},[V,es]),(0,c.useEffect)(()=>{"new"===V&&O(!1),"old"!==V&&"uncheck"!==V&&R||O(!0)},[V,R]),(0,c.useEffect)(()=>{R&&(eo(Date.now()),"bg"===e&&eD(),"bgUser"===e&&eZ())},[R]),(0,c.useEffect)(()=>{H||n(()=>{eM(),eB()})},[er,H]);let eY=e=>{if(!H){if(e.category.startsWith("twitter")&&el.twitter?.is_bind&&sessionStorage.setItem("_clicked_twitter_"+e.id,"1"),e.category.startsWith("twitter")&&!el.twitter?.is_bind){let e=`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${B.twitter_client_id}&redirect_uri=${eA}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;console.log("openSource path:",e,eA),sessionStorage.setItem("_auth_type","twitter"),window.open(e,"_blank");return}if(e.category.startsWith("discord")&&!el.discord?.is_bind){let e=`https://discord.com/oauth2/authorize?client_id=${B.discord_client_id}&response_type=code&redirect_uri=${eA}&scope=identify`;sessionStorage.setItem("_auth_type","discord"),window.open(e,"_blank");return}window.open(e.source,"_blank","width=850,height=550")}},eG=async(e,t)=>{eL(t=>{let i=[...t];return i[e]=!i[e],i}),await eQ(t),eO()};return location.origin,(0,s.jsxs)(k.W2,{children:[(0,s.jsxs)(k.jL,{className:i,children:[(0,s.jsxs)(k.TR,{children:[s.jsx(k.Rm,{src:"/images/marketing/dap-logo.svg"}),s.jsx(k.ie,{src:"/images/marketing/X.svg"}),s.jsx(k.Af,{src:C.y.get(i),style:"namlongdao"===i?{width:180}:{}})]}),s.jsx(k.p2,{children:"Ready to Claim Your Exclusive Rewards?Just complete a few simple quests!"}),(0,s.jsxs)(k.hJ,{className:i,children:[(0,s.jsxs)(k.h2,{children:[s.jsx(k.eU,{children:"Your PTS"}),(0,s.jsxs)(k.FG,{children:[s.jsx(k.AP,{src:"/images/marketing/coin.svg"}),ey]})]}),s.jsx(k.LT,{src:"/images/marketing/coin.svg"})]})]}),s.jsx(k.Aw,{children:s.jsx(b.mQ,{current:D,onChange:e=>{Z(e)}})}),"Quests"===D&&(0,s.jsxs)(k.xu,{children:[s.jsx(k.pu,{children:"Complete the following quests to earn points"}),s.jsx(k.Dx,{children:"Basic"}),s.jsx(k.Tr,{children:"Complete wallet connections to unlock more quests."}),s.jsx(k.h8,{children:R?K.map(e=>e.is_claimed?s.jsx(k.zx,{id:e.id,children:"Reward Already Claimed"}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(k.zx,{id:e.id,onClick:t=>eV(e),children:["Claim your",s.jsx(k.sN,{src:"/images/marketing/coin.svg"})," ",e.reward," PTS"]}),s.jsx(k.wC,{className:eS?"spin":"",src:"/images/marketing/fresh.svg",onClick:()=>{e$(!0),eO()}})]})):(0,s.jsxs)(k.zx,{onClick:()=>{N()},children:["Connect wallet ",s.jsx(k.sN,{src:"/images/marketing/coin.svg"})," 200 PTS"]})}),(0,s.jsxs)(k.Dx,{children:["Advanced",(0,s.jsxs)(k.DK,{children:[s.jsx(k.sN,{src:"/images/marketing/coin.svg"})," +"," ",G?.filter(e=>e.is_claimed).length*100," PTS"]})]}),s.jsx(k.S1,{className:H?"blur":"",children:G?.length?G.map((e,t)=>(0,s.jsxs)(k.Zb,{children:[(0,s.jsxs)(k.s7,{onClick:t=>eY(e),children:[s.jsx(k._K,{src:_[e.category]}),(0,s.jsxs)("div",{children:[s.jsx(k.ll,{children:e.name}),(0,s.jsxs)(k.Vp,{children:[s.jsx(k.sN,{src:"/images/marketing/coin.svg"}),"+",e.reward," PTS"]})]})]}),(0,s.jsxs)(k.JN,{children:["completed"===e.status?s.jsx(k.Oc,{src:"/images/marketing/done.svg"}):s.jsx(k.wC,{className:eI[t]?"spin":"",src:"/images/marketing/fresh.svg",onClick:async i=>{if(i.stopPropagation(),!H){if(e.category.startsWith("twitter")){let i=sessionStorage.getItem("_clicked_twitter_"+e.id);i&&eG(t,e.id)}else eG(t,e.id)}}}),e.is_claimed?null:s.jsx(k.Os,{disabled:"completed"!==e.status,onClick:t=>eV(e),children:"Claim"})]})]},e.id)):null})]}),"Leaderboard"===D&&s.jsx(j.Z,{loading:v,list:S,page:$,info:I,maxPage:L,handlePageChange:z,userInfo:el,userRewardInfo:ep,totalReward:ey,myRank:ei,handleRefresh:()=>{P(),eo(Date.now()),eh()}}),(0,s.jsxs)(k.qK,{children:[s.jsx(k.P9,{children:"Ready to Ignite the Spark?"}),s.jsx(k.Ux,{src:"/images/marketing/star.png"})]}),s.jsx(k.rU,{onClick:m.l,children:"For more quests and more rewards, visit DapDap"}),s.jsx(b.MP,{type:M,open:F,onClose:()=>W(!1),reward:ee})]})});n()}catch(e){n(e)}})},52067:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Ak:()=>_,CR:()=>j,Dx:()=>f,Ei:()=>g,P9:()=>y,TI:()=>S,TR:()=>l,Ux:()=>k,W2:()=>c,fm:()=>m,h8:()=>u,jL:()=>d,p2:()=>p,qK:()=>C,sN:()=>w,t:()=>x,wC:()=>v,xu:()=>h,zx:()=>b});var s=i(66197),a=i(57518),r=i.n(a),o=e([s]);s=(o.then?(await o)():o)[0];let c=r().div.withConfig({componentId:"sc-bd335985-0"})`
  /* background-color: #212633; */
`,d=r().div.withConfig({componentId:"sc-bd335985-1"})`
  height: 120px;
  padding-top: 20px;
  margin-bottom: 40px;

  background-size: cover;
  background-repeat: no-repeat;
  &.bitget {
    background-image: url('/images/marketing/banner-bg.png');
  }
  &.coin68 {
    background-image: url('/images/marketing/banner-coin68.png');
  }
  &.namlongdao {
    background-image: url('/images/marketing/banner-coin68.png');
  }
`,l=r().div.withConfig({componentId:"sc-bd335985-2"})`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
  height: 32px;
`,g=r().img.withConfig({componentId:"sc-bd335985-3"})`
  max-width: 120px;
`,p=r().div.withConfig({componentId:"sc-bd335985-4"})`
  font-size: 14px;
  color: #b1b4d6;
  text-align: center;
`,h=r().div.withConfig({componentId:"sc-bd335985-5"})`
  margin: 0 14px;
  padding: 0 20px;
  border-radius: 10px;
  background-image: linear-gradient(to bottom, rgba(33, 38, 51, 1), rgba(27, 30, 39, 0));
`,x=r().div.withConfig({componentId:"sc-bd335985-6"})`
  display: flex;
  justify-content: center;
`,m=r().img.withConfig({componentId:"sc-bd335985-7"})`
  width: 98px;
  height: 88px;
  margin: -24px auto;
`,f=r().div.withConfig({componentId:"sc-bd335985-8"})`
  margin: 50px 0 50px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background-image: linear-gradient(to right, #bec3ff, #f4ff62);
  -webkit-background-clip: text;
  color: transparent;
`,u=r().div.withConfig({componentId:"sc-bd335985-9"})`
  color: #979abe;
  font-size: 16px;
  font-weight: 500;
  margin: 40px 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,w=r().img.withConfig({componentId:"sc-bd335985-10"})`
  width: 20px;
  margin: 0 5px;
`,b=r().div.withConfig({componentId:"sc-bd335985-11"})`
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(rgba(238, 243, 191, 1), rgba(233, 244, 86, 1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #14162b;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
`,j=r().div.withConfig({componentId:"sc-bd335985-12"})`
  position: relative;
  background-color: rgba(44, 46, 62, 1);
  border-radius: 10px;
  height: 50px;
  color: white;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  padding-top: 5px;

  &.blur {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
  &.gradient {
    border: 2px solid transparent;
    border-radius: 10px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #222, #222),
      linear-gradient(90deg, rgba(27, 190, 202, 1), rgba(235, 244, 121, 1), rgba(112, 39, 233, 1));
  }
`,C=r().div.withConfig({componentId:"sc-bd335985-13"})`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`,y=r().span.withConfig({componentId:"sc-bd335985-14"})`
  font-size: 14px;
  color: rgba(151, 154, 190, 1);
  font-weight: 500;
  justify-content: center;
  border-bottom: 1px solid #979abe;
`,k=r().img.withConfig({componentId:"sc-bd335985-15"})`
  width: 14px;
  height: 14px;
  margin-left: 4px;
`,v=r()(s.motion.img).withConfig({componentId:"sc-bd335985-16"})`
  width: 18px;
  height: 18px;
`;r().img.withConfig({componentId:"sc-bd335985-17"})`
  width: 18px;
  height: 18px;
`;let _=r().div.withConfig({componentId:"sc-bd335985-18"})`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`,S=r().img.withConfig({componentId:"sc-bd335985-19"})`
  width: 18px;
`;n()}catch(e){n(e)}})}};