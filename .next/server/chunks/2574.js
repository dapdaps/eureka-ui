"use strict";exports.id=2574,exports.ids=[2574],exports.modules={71680:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/DapXBNS.13c92648.svg",height:48,width:372,blurWidth:0,blurHeight:0}},10514:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/bns_avatar.65d2fe05.svg",height:52,width:52,blurWidth:0,blurHeight:0}},69493:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/desktop.b8ba2a52.png",height:936,width:1578,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsElEQVR4nAGlAFr/ATsAbwHFMYj/xmRQRq3DHRI4CCPZUDYb3bELofVBLjT+AeAA3AAg/yMMg4a3mhgM8VlHCNbqFRnm4wH6BVX0D+zfAdJf0TnuGgh56PnSFgcxCx712dEGLQvf8hwc5sX9C/aEAamMnF4SCwmS0q6y69UA8BoI9wPcNSEGESgvKh0J/uNcAUB4eShDBRBhF5Ox/Gb14AhGKQ/rJDtMAUIUBuNTQIWsyjtFDHkkqU8AAAAASUVORK5CYII=",blurWidth:8,blurHeight:5}},98592:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/discount_mark.506aa797.svg",height:141,width:141,blurWidth:0,blurHeight:0}},90538:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/icon_achieved.13b5438e.svg",height:60,width:97,blurWidth:0,blurHeight:0}},86824:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/icon_hand.1db96a22.svg",height:26,width:26,blurWidth:0,blurHeight:0}},57192:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var a=n(20997),s=n(39332),r=n(16689),o=n(8789),d=e([o]);o=(d.then?(await d)():d)[0];let p=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"5",height:"8",viewBox:"0 0 5 8",fill:"none",children:a.jsx("path",{opacity:"0.5",d:"M1 1L4 4L1 7",stroke:"white",strokeLinecap:"round"})}),l=(0,r.memo)(({style:e,navs:t})=>{let n=(0,s.useRouter)();return a.jsx(o.P,{style:e,children:t.map((e,i)=>(0,a.jsxs)(o.Y,{$active:i===t.length-1,$disabled:!e.path,onClick:()=>{i!==t.length-1&&e.path&&n.push(e.path)},whileHover:{color:i!==t.length-1&&e.path?"#ebf479":i===t.length-1?"#fff":"rgba(255, 255, 255, 0.5)"},children:[e.name,i!==t.length-1&&p]},e.path||i))})});i()}catch(e){i(e)}})},8789:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{P:()=>d,Y:()=>p});var a=n(66197),s=n(57518),r=n.n(s),o=e([a]);a=(o.then?(await o)():o)[0];let d=r().div.withConfig({componentId:"sc-166c72-0"})`
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 9px;
  align-items: center;
`,p=r()(a.motion.div).withConfig({componentId:"sc-166c72-1"})`
  display: flex;
  gap: 9px;
  align-items: center;
  transition: 0.3s;
  color: ${({$active:e})=>e?"#fff":"rgba(255, 255, 255, 0.5)"};
  cursor: ${({$disabled:e})=>e?"default":"pointer"};
`;i()}catch(e){i(e)}})},70701:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{TV:()=>m,ZP:()=>u,hg:()=>c,p5:()=>x,wJ:()=>h});var a=n(71982),s=n(80441),r=n(81553),o=(n(9393),n(16689)),d=n(41045),p=n(8433),l=e([r,d,p]);[r,d,p]=l.then?(await l)():l;let h=new s.LiFi({integrator:"DapDap"}),m={},x=[];async function c(){return[]}async function y(e,t,n,i,s,r,o){let d=a.utils.parseUnits(r.toString(),n.decimals),p={fromChainId:e.chainId,fromAmount:d.toString(),fromTokenAddress:n.address?n.address:"",fromAddress:s,toChainId:t.chainId,toTokenAddress:i.address?i.address:"",toAddress:o||s},l=await h.getRoutes(p);if(l.routes&&0!==l.routes.length)return l.routes}function u(){let{account:e,provider:t}=(0,p.Z)(),[n,i]=(0,o.useState)(),{addAction:a}=(0,d.Z)("wallet/bridge"),{addAction:s}=(0,d.Z)("quick_onboarding"),r=async({chain:t,token:n,targetChain:i,targetToken:a,amount:s,destination:r})=>{if(a&&t&&i&&s)return y(t,i,n,a,e,s,r||e)},l=async({chain:n,token:i,targetChain:r,targetToken:o,amount:d,destination:p,route:l,onSuccess:c,onFail:y,actionName:u})=>{if(!t)return;let m=await t.getSigner(e);if(l){let e=localStorage.getItem("bridgeTxs")||"{}",t=JSON.parse(e),o=!1;await new Promise(async(e,p)=>{try{await h.executeRoute(m,l,{updateRouteHook:p=>{try{console.log(p);let l=p.steps[p.steps.length-1].execution?.process;if(!l)return;let y=p.steps[p.steps.length-1].estimate.executionDuration,h=l.filter(e=>"CROSS_CHAIN"===e.type)[0];if(!h)return;let m=h.txHash;if(!m)return;let x=h.txLink;l[0].startedAt;let b=l[l.length-1].doneAt;if(!(m=m||""))return;t[m]={amount:d,inputChain:n.chainName,outputChain:r.chainName,symbol:i.symbol,tx:m,txLink:x,time:Date.now(),scan:n.blockExplorers,isStargate:!1,duration:Math.ceil(y/60)+" min",status:b?"success":"processing",fromTokenUrl:p.fromToken.logoURI},localStorage.setItem("bridgeTxs",JSON.stringify(t)),o||(("quick_onboarding"===u?s:a)({type:"Bridge",fromChainId:n.chainId,toChainId:r.chainId,token:i,amount:d,template:"Lifi Bridge",add:!1,status:1,transactionHash:m}),o=!0,c(m),e(t[m]))}catch(e){console.log(e),y&&y(e)}}})}catch(e){console.log(e),p(e)}})}};return{getQouteInfo:r,swap:l,gasCost:n}}(async function(){return[]})().then(e=>{x.push(...e),r.Z.setState({chains:x}),c().then(e=>{Object.assign(m,e),r.Z.setState({tokens:m})})}),i()}catch(e){i(e)}})},7375:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var a=n(16689),s=n(46517),r=n.n(s),o=n(9393),d=n(70701),p=e([d]);d=(p.then?(await p)():p)[0];let c=r().groupBy(Object.values(o.TV),e=>e.chainId);function l(){let[e,t]=(0,a.useState)(o.TV),[n,i]=(0,a.useState)(o.p5),[s,r]=(0,a.useState)({});return(0,a.useEffect)(()=>{let e={};Object.values(o.p5).forEach(t=>{e[t.chainId]=t}),i(e)},[]),(0,a.useEffect)(()=>{t(o.TV)},[]),(0,a.useEffect)(()=>{(0,d.hg)().then(e=>{Object.assign(s,c,e),r(s)})},[]),{tokens:e,chains:n,lifiTokens:s}}i()}catch(e){i(e)}})},41045:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>c});var a=n(16689),s=n(79878),r=n(282),o=n(78579),d=n(68489),p=n(8433),l=e([s,r,p]);function c(e){let{account:t,chainId:n}=(0,p.Z)(),i=(0,s._)(e=>e.chains),l=(0,r.s)(e=>e.uuid),c=(0,a.useCallback)(a=>{let s={};if(!n||!t)return;let r=i.find(e=>e.chain_id===n);if(console.info("addAction data: ",a),"Swap"===a.type&&(s={action_title:`Swap ${a.inputCurrency.symbol} on ${a.template}`,action_type:"Swap",action_tokens:JSON.stringify([`${a.inputCurrency.symbol}`,`${a.outputCurrency.symbol}`]),action_amount:a?.inputCurrencyAmount?a?.inputCurrencyAmount.toString():"",account_id:t,account_info:l,template:a.template,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:r.name,chain_id:n,action_switch:a.add?1:0,token_in_currency:a?.token_in_currency,token_out_currency:a?.token_out_currency}),"Bridge"===a.type)try{let e=i.find(e=>e.chain_id===a.fromChainId)||{name:"Ethereum Mainnet"},n=i.find(e=>e.chain_id===a.toChainId)||{name:"Ethereum Mainnet"};console.info("chains: ",e,n,r),s={action_title:`Bridge ${a.amount} ${a.token.symbol} to ${n?.name}`,action_type:"Bridge",action_tokens:JSON.stringify([`${a.token.symbol}`]),action_amount:a.amount,account_id:t,account_info:l,template:a.template,action_network_id:e?.name,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,chain_id:a.fromChainId,to_chain_id:a.toChainId,extra_data:JSON.stringify(a.extra_data)},console.info("params:",s)}catch(e){console.info("bridge err",e)}"Lending"===a.type&&(s={action_type:"Lending",account_id:t,account_info:l,template:a.template,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:r.name,chain_id:n},a.extra_data?.lending_actions?s.extra_data=JSON.stringify(a.extra_data):(s.action_title=`${a.action} ${Number(a.amount).toFixed(3)} ${a.token.symbol} on ${a.template}`,s.action_tokens=JSON.stringify([`${a.token.symbol}`]),s.action_amount=a.amount)),"Liquidity"===a.type&&(s={action_title:`${a.action} ${a?.token0+(a?.token1?"-"+a.token1:"")} on ${a.template}`,action_type:a.type,action_tokens:JSON.stringify([a?.token0??"",a?.token1??""]),action_amount:a.amount,account_id:t,action_network_id:r.name,account_info:l,template:a.template,action_status:1===a.status?"Success":"Failed",action_switch:a.add?1:0,tx_id:a.transactionHash,chain_id:n,extra_data:a.extra_data}),"Staking"===a.type&&(s={action_title:a.token?`${a.action} ${a.amount} ${a.token?.symbol} on ${a.template}`:"",action_type:"Staking",action_tokens:a.token?JSON.stringify([`${a.token.symbol}`]):"",action_amount:a.amount,account_id:t,account_info:l,template:a.template,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:r?.name||a.action_network_id,chain_id:n,extra_data:a.extra_data}),"Yield"===a.type&&(s={action_title:`${a.action} ${a?.token0+(a?.token1?"-"+a.token1:"")} on ${a.template}`,action_type:a.type,action_tokens:JSON.stringify([a?.token0??"",a?.token1??""]),action_amount:a.amount,account_id:t,account_info:l,template:a.template,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:r?.name||a.action_network_id,chain_id:n,extra_data:a.extra_data}),s.ss=(0,d.o)(`template=${a.template}&action_type=${a.type}&tx_hash=${a.transactionHash}&chain_id=${n}&time=${Math.ceil(Date.now()/1e3)}`),s.source=e,console.log("useAddAction params:",s),(0,o.v_)("/api/action/add",s)},[n,t]);return{addAction:c}}[s,r,p]=l.then?(await l)():l,i()}catch(e){i(e)}})},81553:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>r});var a=n(69890),s=e([a]);a=(s.then?(await s)():s)[0];let r=(0,a.create)(e=>({chains:[],tokens:{},setChains:t=>e(e=>({...e,chains:t})),setTokens:t=>e(e=>({...e,tokens:t}))}));i()}catch(e){i(e)}})},282:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{s:()=>d});var a=n(46555),s=n(69890),r=n(43602),o=e([a,s,r]);[a,s,r]=o.then?(await o)():o;let d=(0,s.create)((0,r.persist)((e,t)=>({uuid:(0,a.v4)()}),{name:"_uuid",version:.1,storage:(0,r.createJSONStorage)(()=>localStorage)}));i()}catch(e){i(e)}})},68489:(e,t,n)=>{n.d(t,{o:()=>r});var i=n(6113),a=n.n(i);let s="01234567890123450123456789012345",r=e=>{if(!s)return;let t=a().randomBytes(16),n=a().createCipheriv("aes-256-cbc",Buffer.from(s),t),i=n.update(e,"utf-8","base64");return i+=n.final("base64"),t.toString("base64")+i}},43800:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(16689),a=n(42501),s=n(78579);function r(){let[e,t]=(0,i.useState)(!1),n=(0,i.useCallback)(async n=>{if(!e){t(!0);try{await (0,s.v_)(`${a.h}/api/quest/source`,{source:n}),t(!1)}catch(e){t(!1)}}},[]);return{loading:e,handleReport:n}}},92574:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>z});var a=n(20997),s=n(55054),r=n(71680),o=n(69493),d=n(98592),p=n(90538),l=n(57192),c=n(7375),y=n(8433),u=n(78579),h=n(34675),m=n(1718),x=n(59397),b=n(71982),g=n(25675),f=n.n(g),w=n(11163),v=n(16689),j=n(30533),$=n(29465),T=n(19443),C=n(30326),k=n(95320),A=n(28510),_=n(18607),S=n(24875),I=n(33879),M=n(43800),F=n(44862),E=n.n(F),B=n(92253),L=n(4962),D=n(6751),N=n(83635),Y=e([l,c,y,h,m,x,C,A,_,I,B,L,D,N]);[l,c,y,h,m,x,C,A,_,I,B,L,D,N]=Y.then?(await Y)():Y;let z=(0,v.memo)(()=>{let e=(0,w.useRouter)(),t=(0,A.Z)(),{handleReport:n}=(0,M.Z)(),{chains:i}=(0,c.Z)(),{account:g}=(0,y.Z)(),[F,Y]=(0,v.useState)(""),z=(0,I.M)(e=>e.reward),{check:G}=(0,x.Z)({isNeedAk:!0}),[R,q]=(0,v.useState)(0),[Z,O]=(0,v.useState)([]),[H,V]=(0,v.useState)({}),[W,P]=(0,v.useState)(!1),[U,Q]=(0,v.useState)({}),[J,X]=(0,v.useState)(!1),[K,ee]=(0,v.useState)(!1),{loading:et,questList:en}=(0,_.Z)("6"),[ei,ea]=(0,v.useState)(!1),[{connectedChain:es,settingChain:er},eo]=(0,m.useSetChain)(),ed=(0,v.useMemo)(()=>es?.id?i[Number(es?.id)]:null,[es?.id]),ep=(0,v.useRef)(null),el=(0,v.useMemo)(()=>en.find(e=>28===e.id),[en]),ec=async function(e){return await u.U2("https://api.basename.app/records/base/"+e)},ey=async function(){try{let e=await u.U2("https://api.basename.app/v1/names?address="+b.ethers.utils.getAddress(g)),n=[];e.map(e=>{n.push(ec(e.name))});let i=await t.read({address:"0x0363696B6D369859f5fb4994a5Ade574CD91D220",functionName:"node",args:[b.ethers.utils.getAddress(g)]}),a=await t.read({address:"0xa92659104Eb42309Ae9482F1D1AE934B9Ee51dc3",functionName:"name",args:[i]}),s=await Promise.all(n);s.forEach((t,n)=>{e[n].isPrimaryName=e[n].name==a,e[n].addresses=t.data.addresses}),O(e)}catch(e){console.log(e)}},eu=async()=>{try{let e=await (0,s.$d)();ea(e.data.discount)}catch(e){console.log(e)}},eh=async function(e){let n=E().normalize(e).split(".").join("");try{q(1);let e=await t.read({address:"0x4079d84889e0E1AC22beec60dc8e5E7b621bf55D",functionName:"available",args:[n]}),i=await u.U2("https://api.basename.app/v1/registration/"+n+"/is-name-available");e&&i?(eu(),q(2)):q(3)}catch(e){console.log(e)}try{let e=await u.U2("https://api.basename.app/v1/prices/labels/"+n);Q(e)}catch(e){console.log(e)}},em=function(e){q(0),Y(e),ep.current&&clearTimeout(ep.current),ep.current=setTimeout(()=>{e.length>0&&eh(e)},1e3)};return(0,v.useEffect)(()=>{g&&ey()},[]),(0,v.useEffect)(()=>{"string"==typeof e.query.Your_BNS_Names&&n("quest/leaderboard/DapDapXBNS?Your_BNS_Names"),"string"==typeof e.query.action64&&n("quest/leaderboard/DapDapXBNS?action64")},[e.query]),(0,a.jsxs)(S.SD,{style:{paddingBottom:120},children:[a.jsx(N.Z,{info:z}),a.jsx(S.PQ,{style:{paddingTop:30,paddingBottom:19},children:a.jsx(l.Z,{navs:[{name:"Quests",path:"/quest/leaderboard"},{name:"DapDap X BNS",path:"/quest/campaign/DapDapXBNS"}]})}),(0,a.jsxs)(S.G,{$gap:"20px",style:{background:"linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)",height:254},children:[(0,a.jsxs)(S.SD,{children:[a.jsx(S.Ld,{children:a.jsx(f(),{src:r.Z,alt:"DapXBNS"})}),(0,a.jsxs)(S.G,{children:[(0,a.jsxs)(S.G,{$direction:"column",$gap:"6px",style:{width:496},children:[a.jsx(S.qY,{$size:"36px",$weight:"700",$line:"120%",children:"One quest forthe best price!"}),a.jsx(S.qY,{$size:"20px",$line:"120%",children:"Follow the quest on the right, and you will get the best price for registering with BNS, and get DapDap PTS."})]}),a.jsx(S.Ld,{children:a.jsx(f(),{src:d.Z,alt:"discountMark"})})]})]}),el&&(0,a.jsxs)(S.SD,{style:{position:"relative"},children:[a.jsx(h.Z,{quest:el}),el.action_completed+1>el.total_action&&a.jsx(S.QL,{children:a.jsx(f(),{src:p.Z,alt:"iconAchieved"})})]})]}),a.jsx(S.Yo,{children:a.jsx(f(),{src:o.Z,width:678,height:419,alt:"desktop"})}),(0,a.jsxs)(S.G,{$direction:"column",$gap:"16px",style:{position:"relative",top:"-44px"},children:[a.jsx(S.BL,{children:"Web3 Username"}),a.jsx(S.qY,{$size:"20px",$weight:"600",children:"Web3 naming (.base) for the next billion+ users on Base"})]}),(0,a.jsxs)(S.G,{$direction:"column",$gap:"20px",children:[a.jsx(j.Z,{queryStatus:R,value:F,setValue:Y,onChange:e=>{e&&G(()=>{em(e)})},bp:"100152-001"}),R>1&&a.jsx(T.Z,{label:F,status:R,onClaim:function(){P(!0)},bp:"100152-002"})]}),Z.length>0&&a.jsx(k.Z,{bnsNames:Z,onClick:function(e){V(e),X(!0)}}),(0,a.jsxs)(S.G,{style:{marginTop:80},$direction:"column",$gap:"100px",children:[a.jsx(C.Z,{loading:et,questList:en,bp:"100152-003"}),a.jsx($.Z,{})]}),W&&a.jsx(L.Z,{priceLabel:U,discount:ei,setShowSwitchNetworkDialog:ee,currentChain:ed,setChain:eo,onClose:()=>P(!1)}),J&&a.jsx(B.Z,{bnsName:H,setShowSwitchNetworkDialog:ee,setBnsName:V,currentChain:ed,setChain:eo,onSetPrimary:function(e){X(!1),ey()},onClose:()=>X(!1)}),K&&a.jsx(D.Z,{chainId:8453,onClose:()=>ee(!1)})]})});i()}catch(e){i(e)}})},30533:(e,t,n)=>{n.d(t,{Z:()=>A});var i=n(20997),a=n(16689),s=n(20893),r=n.n(s),o=n(57518),d=n.n(o),p=n(24875);let l=d().div.withConfig({componentId:"sc-54cb9083-0"})`
  position: relative;
  em-emoji-picker {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .loading {
    transform-origin: center;
    animation: 0.5s linear infinite ${p.dx};
  }

`,c=d().div.withConfig({componentId:"sc-54cb9083-1"})`
  position: relative;
  width: 370px;
  padding: 2px;
`,y=d().div.withConfig({componentId:"sc-54cb9083-2"})`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 0;
  background: linear-gradient(to right, rgb(0, 209, 255), rgb(192, 89, 255), rgb(255, 153, 0));
  border-radius: 10px;
  filter: blur(10px);
  opacity: 0;
  transition: opacity linear 0.3s;
`,u=d().div.withConfig({componentId:"sc-54cb9083-3"})`
  background: linear-gradient(to right, rgb(0, 209, 255), rgb(192, 89, 255), rgb(255, 153, 0));
  padding: 2px;
  border-radius: 12px;
  transition: all 0.5s ease 0s;
  position: relative;
  z-index: 2;
`,h=d().div.withConfig({componentId:"sc-54cb9083-4"})`
  display: flex;
  align-items: center;
  background: #000;
  border-radius: 12px;
`,m=d().input.withConfig({componentId:"sc-54cb9083-5"})`
  outline: none;
  border: none;
  padding: 0 12px;
  flex: 1;
  height: 38px;
  background: transparent;
  color: #FBFBFB;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`,x=d().div.withConfig({componentId:"sc-54cb9083-6"})`
  color: #FFF;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`,b=d().div.withConfig({componentId:"sc-54cb9083-7"})`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #373A53;
  background: rgba(55, 58, 83, 0.20);
`;var g=n(26638),f=n(79390),w=n.n(f),v=n(46517),j=n.n(v),$=n(11163);let T=i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"13",viewBox:"0 0 14 13",fill:"none",children:i.jsx("path",{d:"M10 9.00049C10.6279 8.16474 11 7.12582 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C7.6356 11 9.08777 10.2147 10 9.00049ZM10 9.00049L13 12.0005",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})}),C=i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"15",height:"16",viewBox:"0 0 15 16",fill:"none",children:i.jsx("path",{d:"M13.9845 11.9838C11.2234 14.7449 6.74681 14.7449 3.98572 11.9838C1.22463 9.22268 1.22463 4.74607 3.98572 1.98498",stroke:"#04D1FF",strokeWidth:"2",strokeLinecap:"round"})}),k=i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:i.jsx("path",{d:"M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z",fill:"#979ABE"})}),A=(0,a.memo)(({onChange:e,queryStatus:t,bp:n})=>{let s=(0,$.useRouter)(),[o,d]=(0,a.useState)(""),[f,v]=(0,a.useState)(!1),[A,_]=(0,a.useState)(!1),S=(0,a.useRef)(null),I=function(e){let t=e.target.value,n=j().split(t,""),i=/[0-9a-zA-Z]/,a=r()(),s=n.filter(e=>i.test(e)||a.test(e));d(s.join(""))},M=function(){v(e=>!e)},F=()=>{e&&e(o)};return(0,a.useEffect)(()=>{F()},[o]),(0,a.useEffect)(()=>{S.current&&"string"==typeof s.query.click_yourname&&S.current.focus()},[S.current]),(0,i.jsxs)(l,{"data-bp":n,children:[(0,i.jsxs)(p.G,{$gap:"20px",children:[(0,i.jsxs)(c,{children:[i.jsx(u,{children:(0,i.jsxs)(h,{children:[i.jsx(p.Ld,{style:{marginLeft:15},className:1===t?"loading":"",children:1===t?C:T}),i.jsx(m,{ref:e=>S.current=e,placeholder:"yourname",value:o,onChange:e=>I(e),onBlur:()=>_(!1),onFocus:()=>_(!0)}),i.jsx(x,{style:{marginRight:12},children:".base"})]})}),i.jsx(y,{style:{opacity:A?1:0}})]}),i.jsx(b,{onClick:()=>M(),children:f?k:"\uD83D\uDE0D"})]}),f&&i.jsx(w(),{data:g,dynamicWidth:!0,theme:"dark",onEmojiSelect:function(e){d(t=>t+=e.native)}})]})})},92253:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>_});var a=n(20997),s=n(10514),r=n(8433),o=n(64692),d=n(44862),p=n.n(d),l=n(71982),c=n(46517),y=n.n(c),u=n(25675),h=n.n(u),m=n(16689),x=n(76198),b=n(28510),g=n(11414),f=e([r,b]);[r,b]=f.then?(await f)():f;let w=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:a.jsx("path",{d:"M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z",fill:"#979ABE"})}),v=(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[a.jsx("circle",{cx:"12",cy:"12",r:"12",fill:"#303142"}),a.jsx("path",{d:"M13.444 12L16.7799 8.66415C17.0307 8.41332 17.0735 8.0494 16.8756 7.85157L16.1482 7.12424C15.9503 6.92632 15.5869 6.96974 15.3356 7.22041L12.0001 10.5561L8.66433 7.22049C8.41349 6.96941 8.04957 6.92632 7.85165 7.12449L7.12431 7.8519C6.92648 8.04949 6.96931 8.4134 7.22048 8.66423L10.5563 12L7.22048 15.336C6.96973 15.5866 6.92631 15.9503 7.12431 16.1482L7.85165 16.8756C8.04957 17.0735 8.41349 17.0306 8.66433 16.7799L12.0003 13.4439L15.3357 16.7794C15.587 17.0307 15.9504 17.0735 16.1483 16.8756L16.8757 16.1482C17.0735 15.9503 17.0307 15.5866 16.78 15.3356L13.444 12Z",fill:"#979ABE"})]}),j=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"9",height:"13",viewBox:"0 0 9 13",fill:"none",children:a.jsx("path",{d:"M7.5 1L2 6.5L7.5 12",stroke:"#979ABE",strokeWidth:"2",strokeLinecap:"round"})}),$=(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[a.jsx("circle",{cx:"8",cy:"8",r:"7.5",fill:"#EBF479",stroke:"#EBF479"}),a.jsx("path",{d:"M5.56543 8.00085L7.4205 9.73998L11.1306 6.26172",stroke:"black",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),T=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:a.jsx("circle",{cx:"8",cy:"8",r:"7.5",fill:"#1E2028",stroke:"#979ABE"})}),C=a.jsx("svg",{stroke:"currentColor",fill:"none",strokeWidth:"1.5",viewBox:"0 0 24 24","aria-hidden":"true",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"})}),k=(0,a.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("circle",{cx:"11",cy:"11",r:"10.5",stroke:"#979ABE"}),a.jsx("path",{d:"M10.464 14.876V11.69H7.35V10.286H10.464V7.1H12.012V10.286H15.126V11.69H12.012V14.876H10.464Z",fill:"#979ABE"})]}),A=(0,a.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("circle",{cx:"11",cy:"11",r:"10.5",stroke:"#FFFFFF"}),a.jsx("path",{d:"M10.464 14.876V11.69H7.35V10.286H10.464V7.1H12.012V10.286H15.126V11.69H12.012V14.876H10.464Z",fill:"#FFFFFF"})]}),_=(0,m.memo)(({bnsName:e,setBnsName:t,onClose:n,currentChain:i,setChain:d,setShowSwitchNetworkDialog:c,onSetPrimary:u})=>{let{account:f}=(0,r.Z)(),_=(0,b.Z)(),[S,I]=(0,m.useState)(0),[M,F]=(0,m.useState)({}),E=(0,m.useMemo)(()=>{let t={};return Object.keys(e.addresses).forEach(n=>{let i=e.addresses[n];t[n]="string"==typeof i?[i,!1]:i}),t},[e.addresses]),B=(0,m.useMemo)(()=>x.Mo.filter(e=>"object"==typeof E[e]),[e,E]),L=(0,m.useMemo)(()=>{let e={};return Object.keys(E).forEach(t=>{"object"==typeof M[t]&&E[t]&&E[t][0]&&!E[t][1]&&(e[t]=E[t][0])}),e},[E,M]),D=(0,m.useMemo)(()=>0===Object.keys(L).length,[L]),N=function(e){let t=y().cloneDeep(M);"object"==typeof t[e]?delete t[e]:t[e]=["",!1],F(t)},Y=function(e){"object"==typeof M[e]&&(F(t=>{let n=y().cloneDeep(M);return delete n[e],n}),t(t=>{let n=y().cloneDeep(t);return delete n.addresses[e],n}))},z=function(n,i){let a=n.target.value,s=!1;if(a.length>0)try{let e=x.v1[i];o.formatsByName[e.label].decoder(a)}catch(e){s=!0}let r=y().cloneDeep(e),d=y().cloneDeep(M);r.addresses[i]=[a,s],d[i]=[a,s],t(r),F(d)},G=async function(){if(i&&"Base"!==i.chainName){c(!0);return}p().hash(e.name);try{let t=await _.write({address:"0x0363696B6D369859f5fb4994a5Ade574CD91D220",functionName:"setName",args:[e.name]});u(t)}catch(e){console.log(e)}},R=async function(){let t=[],n=new l.ethers.utils.Interface([{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"uint256",name:"coinType",type:"uint256"},{internalType:"bytes",name:"a",type:"bytes"}],name:"setAddr",outputs:[],stateMutability:"nonpayable",type:"function"}]),i=p().hash(e.name);Object.keys(L).forEach(e=>{let a=(L[e]+"").length,s=a%2==0?L[e]:L[e].slice(0,-1);t.push(n.encodeFunctionData("setAddr",[i,e,s]))}),await _.multicall({address:"0xa92659104Eb42309Ae9482F1D1AE934B9Ee51dc3",args:t})};return a.jsx(g.I2,{children:(0,a.jsxs)(g.eV,{children:[(0,a.jsxs)(g.Av,{children:[1===S?(0,a.jsxs)(g.G,{$gap:"15px",children:[a.jsx(g.Ld,{style:{cursor:"pointer"},onClick:()=>I(0),children:j}),a.jsx(g.qY,{$size:"16px",$weight:"700",children:"Add Network"})]}):2===S?a.jsx(g.qY,{$size:"20px",$weight:"700",children:"Save Chages"}):a.jsx(g.SD,{}),a.jsx(g.Ld,{style:{cursor:"pointer"},onClick:()=>n&&n(),children:w})]}),0===S&&(0,a.jsxs)(g.Hn,{style:{width:536},children:[(0,a.jsxs)(g.G,{$direction:"column",$gap:"10px",children:[a.jsx(h(),{src:s.Z,width:62,alt:"bnsAvatar"}),a.jsx(g.qY,{$size:"18px",$weight:"700",children:e.name}),a.jsx(g.Sn,{$width:"102px",$height:"26px",$background:"#2E3142",$borderRadius:"6px",onClick:G,children:a.jsx(g.qY,{$color:"#979ABE",$size:"12px",children:"Set as Primary"})})]}),(0,a.jsxs)(g.ze,{onClick:()=>I(1),style:{marginTop:23,marginBottom:30},children:[a.jsx(g.Ld,{className:"gray",children:k}),a.jsx(g.Ld,{className:"white",children:A})]}),a.jsx(g.SD,{style:{marginBottom:30,height:300,overflow:"auto"},children:a.jsx(g.G,{$direction:"column",$gap:"30px",children:B.map(e=>{let t=x.v1[e];return(0,a.jsxs)(g.G,{$direction:"column",$gap:"10px",style:{width:"100%"},children:[(0,a.jsxs)(g.G,{$justify:"flex-start",$gap:"6px",style:{width:"100%"},children:[a.jsx(h(),{src:t.icon,width:18,height:18,alt:"iconCoin"}),a.jsx(g.qY,{$size:"14px",$weight:"500",$line:"120%",children:t.label})]}),(0,a.jsxs)(g.YD,{children:[a.jsx(g.tm,{value:E[e][0],onChange:t=>z(t,e)}),a.jsx(g.Ld,{style:{cursor:"pointer"},onClick:()=>Y(e),children:v})]}),E[e][1]&&(0,a.jsxs)(g.G,{$justify:"flex-start",$gap:"6px",style:{width:"100%",color:"rgb(247, 187, 67)"},children:[a.jsx(g.Ld,{children:C}),a.jsx(g.qY,{$color:"rgb(247, 187, 67)",$size:"12px",$weight:"700",children:"Invalid address"})]})]},e)})})}),a.jsx(g.Sn,{$background:"#2E3142",disabled:D,onClick:function(){I(2)},children:a.jsx(g.qY,{$size:"16px",$weight:"700",children:"Save"})})]}),1===S&&(0,a.jsxs)(g.Hn,{style:{width:536,paddingTop:20},children:[a.jsx(g.G,{$wrap:"wrap",$gap:"10px",children:x.Mo.map(e=>{let t=x.v1[e];return(0,a.jsxs)(g.Sn,{$width:"116px",$height:"120px",$background:"#2E3142",style:{flexDirection:"column",gap:17,position:"relative"},disabled:E[e],onClick:()=>N(e),children:[a.jsx(g.UR,{children:E[e]?"added":"object"==typeof M[e]?$:T}),a.jsx(h(),{src:t.icon,width:40,height:40,alt:"coinType"}),a.jsx(g.qY,{$size:"16px",$weight:"700",children:t.label})]},e)})}),Object.keys(M).length>0?a.jsx(g.Sn,{onClick:function(){let n=y().cloneDeep(e);n.addresses=Object.assign(n.addresses,M),t(n),I(0)},$background:"#2E3142",style:{marginTop:20},children:(0,a.jsxs)(g.qY,{$size:"16px",$weight:"700",children:["Add (",Object.keys(M).length,")"]})}):a.jsx(g.Sn,{$background:"#2E3142",disabled:!0,style:{marginTop:20},children:a.jsx(g.qY,{$size:"16px",$weight:"700",children:"Add"})})]}),2===S&&(0,a.jsxs)(g.Hn,{style:{width:408,paddingTop:30},children:[(0,a.jsxs)(g.G,{$direction:"column",$gap:"28px",children:[(0,a.jsxs)(g.G,{$justify:"space-between",style:{width:"100%"},children:[a.jsx(g.qY,{$color:"#979ABE",$size:"16px",children:"Name"}),a.jsx(g.qY,{$size:"16px",children:e.name})]}),(0,a.jsxs)(g.G,{$justify:"space-between",style:{width:"100%"},children:[a.jsx(g.qY,{$color:"#979ABE",$size:"16px",children:"Action"}),a.jsx(g.qY,{$size:"16px",children:"Profile Update"})]}),(0,a.jsxs)(g.G,{$justify:"space-between",$align:"flex-start",style:{width:"100%"},children:[a.jsx(g.qY,{$color:"#979ABE",$size:"16px",children:"Update"}),a.jsx(g.G,{$direction:"column",$align:"flex-end",$gap:"16px",children:Object.keys(L).map(e=>{let t=x.v1[e];return(0,a.jsxs)(g.qY,{$size:"16px",children:[t.label,": ",y().truncate(L[e],{length:10})]},e)})})]})]}),a.jsx(g.Sn,{$height:"48px",$background:"#2E3142",style:{marginTop:30},onClick:R,children:a.jsx(g.qY,{$size:"16px",$weight:"700",children:"Confirm"})})]})]})})});i()}catch(e){i(e)}})},11414:(e,t,n)=>{n.d(t,{Av:()=>o,G:()=>s.G,Hn:()=>d,I2:()=>s.I2,Ld:()=>s.Ld,SD:()=>s.SD,Sn:()=>s.Sn,UR:()=>c,YD:()=>p,eV:()=>r,qY:()=>s.qY,tm:()=>l,ze:()=>y});var i=n(57518),a=n.n(i),s=n(24875);let r=a().div.withConfig({componentId:"sc-6abd3500-0"})`
  /* width: 412px; */
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`,o=a().div.withConfig({componentId:"sc-6abd3500-1"})`
  padding: 23px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,d=a().div.withConfig({componentId:"sc-6abd3500-2"})`
  padding: 0 20px 20px;
`;a().div.withConfig({componentId:"sc-6abd3500-3"})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 40px;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`,a().button.withConfig({componentId:"sc-6abd3500-4"})`
  outline: none;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #32364B;
`;let p=a().div.withConfig({componentId:"sc-6abd3500-5"})`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.30);
  padding-right: 12px;
`,l=a().input.withConfig({componentId:"sc-6abd3500-6"})`
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 16px 12px;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`,c=a().div.withConfig({componentId:"sc-6abd3500-7"})`
  position: absolute;
  right: 6px;
  top: 6px;
  color: #979ABE;
  text-align: center;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`,y=a().button.withConfig({componentId:"sc-6abd3500-8"})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #373A53;
  background: #2E3142;
  .gray {
    display: flex;
  }
  .white {
    display: none;
  }
  &:hover {
    background: #333649;
    .gray {
      display: none;
    }
    .white {
      display: flex;
    }
  }
`},29465:(e,t,n)=>{n.d(t,{Z:()=>b});var i=n(20997),a=n(16689),s=n(57518),r=n.n(s),o=n(24875);let d=r().div.withConfig({componentId:"sc-ea970798-0"})`
  margin-bottom: 26px;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #FFF 0%, #AFAFAF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,p=r().div.withConfig({componentId:"sc-ea970798-1"})`
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #2E3142;
`,l=r().div.withConfig({componentId:"sc-ea970798-2"})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 84px;
  background: #373A53;
`,c=r().div.withConfig({componentId:"sc-ea970798-3"})`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.active {
    transform: rotate(90deg);
  }

`,y=r().div.withConfig({componentId:"sc-ea970798-4"})`
  padding: 26px 30px 29px;
`;var u=n(86824),h=n(25675),m=n.n(h);let x=i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"14",viewBox:"0 0 10 14",fill:"none",children:i.jsx("path",{d:"M9.02391 6.21913C9.52432 6.61946 9.52432 7.38054 9.02391 7.78087L1.6247 13.7002C0.969933 14.2241 1.75986e-07 13.7579 1.65987e-07 12.9194L2.48112e-08 1.08062C1.48121e-08 0.242119 0.969932 -0.224055 1.62469 0.299756L9.02391 6.21913Z",fill:"#979ABE"})}),b=(0,a.memo)(()=>{let e=[{icon:u.Z,name:"What is BNS?",desc:"Base Name Service (BNS) is a native naming service built on Base. BNS maps human readable names like “bob.base” to crypto wallet addresses, AA addresses, decentralized webs, hashes, and metadata."}],[t,n]=(0,a.useState)(-1),s=function(e){n(t>-1?-1:e)};return(0,i.jsxs)(o.PQ,{children:[i.jsx(d,{children:"Q&A"}),i.jsx(o.G,{$direction:"column",$gap:"30px",children:e.map((e,n)=>(0,i.jsxs)(p,{children:[(0,i.jsxs)(l,{children:[(0,i.jsxs)(o.G,{$gap:"16px",children:[i.jsx(o.Ld,{children:i.jsx(m(),{src:e.icon,alt:e.name})}),i.jsx(o.qY,{$size:"20px",$weight:"700",$line:"120%",children:e.name})]}),i.jsx(c,{className:t===n?"active":"",onClick:()=>s(n),children:x})]}),t===n&&i.jsx(y,{children:i.jsx(o.qY,{$color:"#979ABE",$size:"16px",$line:"120%",children:e.desc})})]},n))})]})})},19443:(e,t,n)=>{n.d(t,{Z:()=>j});var i=n(20997),a=n(16689),s=n(25675),r=n.n(s),o=n(76198),d=n(57518),p=n.n(d),l=n(24875);let c=d.keyframes`
  0% {
    transform: translateY(0);
    opacity: 0
  }

  1% {
    transform: translateY(0);
    opacity: 1
  }

  10% {
    transform: translateY(-25px)
  }

  13% {
    transform: translateY(-25px)
  }

  15% {
    transform: translateY(-50px)
  }

  18% {
    transform: translateY(-50px)
  }

  25% {
    transform: translateY(-75px)
  }

  28% {
    transform: translateY(-75px)
  }

  35% {
    transform: translateY(-100px)
  }

  38% {
    transform: translateY(-100px)
  }

  45% {
    transform: translateY(-125px)
  }

  48% {
    transform: translateY(-125px)
  }

  55% {
    transform: translateY(-150px)
  }

  58% {
    transform: translateY(-150px)
  }

  65% {
    transform: translateY(-175px)
  }

  68% {
    transform: translateY(-175px)
  }

  75% {
    transform: translateY(-200px)
  }

  78% {
    transform: translateY(-200px)
  }

  85% {
    transform: translateY(-225px)
  }

  88% {
    transform: translateY(-225px)
  }

  95% {
    transform: translateY(-250px)
  }

  98% {
    transform: translateY(-250px);
    opacity: 1
  }

  99% {
    transform: translateY(-250px);
    opacity: 0
  }

  to {
    transform: translateY(0);
    opacity: 0
  }
`,y=p().div.withConfig({componentId:"sc-24f4499b-0"})`
`,u=p().div.withConfig({componentId:"sc-24f4499b-1"})`
  color: #FE8601;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`,h=p().div.withConfig({componentId:"sc-24f4499b-2"})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 11px 0 17px;
  background: #000;
  border-radius: 12px;
`,m=p().div.withConfig({componentId:"sc-24f4499b-3"})`
  width: 432px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(to right, rgb(245, 217, 10), rgb(255, 122, 0));
  padding: 2px;
  &.success {
    background: linear-gradient(to right, rgb(0, 255, 26), rgb(35, 254, 175));
    ${h} {
      padding: 0 3px 0 17px;
    }
    ${u} {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 79px;
      height: 38px;
      border-radius: 12px;
      background: #24E462;
      color: #1E2028;
      font-family: Gantari;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 100%; 
    }
  }
`,x=p().div.withConfig({componentId:"sc-24f4499b-4"})`
  width: 20px;
  height: 20px;
  overflow: hidden;
  position: relative;
`,b=p().div.withConfig({componentId:"sc-24f4499b-5"})`
  border-radius: 50%;
  overflow: hidden;
  font-size: 0;
`;p().div.withConfig({componentId:"sc-24f4499b-6"})`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  width: 183px;
  height: 87px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px dashed #373A53;
`,p().div.withConfig({componentId:"sc-24f4499b-7"})`
  text-shadow: 0px 0px 4px rgba(235, 244, 121, 0.50);
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  background: linear-gradient(90deg, #FFDD4D 0%, #EBF479 109.42%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;ÍÍ
`;let g=p().div.withConfig({componentId:"sc-24f4499b-8"})`
  animation-delay: 0.3s;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  animation: 10s ease 0s infinite normal none running ${c};
`,f=p().div.withConfig({componentId:"sc-24f4499b-9"})`
  
  vertical-align: baseline;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  background: linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,w=p().span.withConfig({componentId:"sc-24f4499b-10"})`
  /* text-decoration-line: underline; */
  border-bottom: 1px dashed #979ABE;
`,v=p().div.withConfig({componentId:"sc-24f4499b-11"})`
  max-width: 270px;
  overflow: auto;
  &::-webkit-scrollbar {
    display:none
  }
`,j=(0,a.memo)(({label:e,status:t,onClaim:n,bp:a})=>{let s=function(){n&&n()};return e.length>0?(0,i.jsxs)(y,{children:[e.length<3?i.jsx(l.SD,{style:{width:432,opacity:.5},children:i.jsx(l.qY,{$size:"15px",$weight:"600",children:"Minimum of 3 characters"})}):i.jsx(m,{className:2===t?"success":"",children:(0,i.jsxs)(h,{children:[(0,i.jsxs)(l.G,{$gap:"11px",children:[i.jsx(x,{children:i.jsx(g,{children:o.Pl.map((e,t)=>i.jsx(b,{children:i.jsx(r(),{src:e.icon,width:20,height:20,alt:"chain"})},t))})}),i.jsx(v,{children:i.jsx(l.qY,{style:{width:"max-content"},$size:"16px",$weight:"700",children:e})})]}),2===t?i.jsx(u,{onClick:()=>s(),"data-bp":a,children:"Claim"}):i.jsx(u,{children:"Taken"})]})}),2===t&&i.jsx(l.G,{$direction:"column",$gap:"20px",style:{marginTop:18},children:i.jsx(l.G,{$justify:"flex-end",style:{width:"100%"},children:(0,i.jsxs)(f,{children:["Get price on ",i.jsx(w,{children:"60% off"})]})})})]}):i.jsx(i.Fragment,{})})},4962:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>k});var a=n(20997),s=n(10514),r=n(8433),o=n(14300),d=n(21004),p=n(78579),l=n(43800),c=n(44862),y=n.n(c),u=n(97626),h=n(71982),m=n(25675),x=n.n(m),b=n(11163),g=n(16689),f=n(28510),w=n(37346),v=n(9564),j=e([r,o,d,u,f,w]);[r,o,d,u,f,w]=j.then?(await j)():j;let $=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:a.jsx("path",{d:"M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z",fill:"#979ABE"})}),T=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"8",viewBox:"0 0 14 8",fill:"none",children:a.jsx("path",{d:"M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5L1 3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464465C9.97631 0.269203 9.65973 0.269203 9.46447 0.464465C9.2692 0.659728 9.2692 0.97631 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5L13 4.5L13 3.5L1 3.5L1 4.5Z",fill:"white"})}),C=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:a.jsx("path",{opacity:"0.5",d:"M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),k=(0,g.memo)(({priceLabel:e,onClose:t,discount:n,setShowSwitchNetworkDialog:i,currentChain:c,setChain:m})=>{let j=(0,o.Z)(),k=(0,b.useRouter)(),A=(0,w.O)(),{account:_}=(0,r.Z)(),S=(0,f.Z)(),{handleReport:I}=(0,l.Z)(),M=A.price,[F,E]=(0,g.useState)(0),[B,L]=(0,g.useState)(1),D=(0,g.useMemo)(()=>B*e.price,[e.price,B]),N=(0,g.useMemo)(()=>.6*B*e.price,[e.price,B]),Y=(0,g.useMemo)(()=>D-(n?N:0),[D,n,N]),z=function(){L(e=>e+=1)},G=function(){B>1&&L(e=>e-=1)},R=async function(){if(c&&"Base"!==c.chainName){i(!0);return}let t=await p.v_("https://api.basename.app/v1/registration/register-request-with-signature",{toAddress:_,label:e.label,years:B,isPrimaryName:!1,promoCode:n?"dapdap60":""}),a=t.signedRegisterRequest,s=new h.ethers.utils.Interface([{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"address",name:"a",type:"address"}],name:"setAddr",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"string",name:"key",type:"string"},{internalType:"string",name:"value",type:"string"}],name:"setText",outputs:[],stateMutability:"nonpayable",type:"function"}]),r=y().hash(`${e.label}.base`),o=s.encodeFunctionData("setAddr",[r,_]),l=`files.basename.app/avatars/${r}.svg`,u=s.encodeFunctionData("setText",[r,"avatar",l]),m=[o,u];console.log("===signedRegisterRequest",JSON.stringify(a),"=====callData",JSON.stringify(m));try{E(1),await S.write({address:"0x4079d84889e0E1AC22beec60dc8e5E7b621bf55D",functionName:"registerWithSignature",args:[a,m,{value:a[7]}]}),E(2),I("quest/leaderboard/DapDapXBNS?click_yourname")}catch(e){E(0),e.reason&&j.fail({title:e.reason}),e?.code===-32603&&j.fail({title:"Not enough gas, "+(0,d._2)(.0025*B)+" needed"}),console.log("error",e)}};return(0,g.useEffect)(()=>{E(0)},[]),a.jsx(v.I2,{children:(0,a.jsxs)(v.eV,{children:[a.jsx(v.Av,{children:a.jsx(v.Ld,{style:{cursor:"pointer"},onClick:()=>t(),children:$})}),0===F||1===F?(0,a.jsxs)(v.Hn,{children:[(0,a.jsxs)(v.G,{$direction:"column",$gap:"14px",style:{marginBottom:27},children:[a.jsx(x(),{src:s.Z,width:48,alt:"bnsAvatar"}),(0,a.jsxs)(v.qY,{$size:"26px",$weight:"500",style:{maxWidth:360,textAlign:"center"},children:[e.label,".base"]})]}),(0,a.jsxs)(v.aD,{children:[a.jsx(v.Ii,{disabled:1===B,onClick:()=>G(),children:"-"}),(0,a.jsxs)(v.qY,{$size:"16px",$line:"120%",style:{flex:1,textAlign:"center"},children:[B," Year"]}),a.jsx(v.Ii,{onClick:()=>z(),children:"+"})]}),(0,a.jsxs)(v.G,{$direction:"column",$gap:"20px",style:{marginTop:19,marginBottom:15},children:[(0,a.jsxs)(v.G,{$justify:"space-between",style:{width:"100%"},children:[a.jsx(v.qY,{$size:"16px",$line:"120%",children:"Type of Payment"}),a.jsx(v.qY,{$size:"16px",$line:"120%",children:"ETH"})]}),(0,a.jsxs)(v.G,{$justify:"space-between",style:{width:"100%"},children:[(0,a.jsxs)(v.qY,{$size:"16px",$line:"120%",children:[B," year registration"]}),(0,a.jsxs)(v.qY,{$size:"16px",$line:"120%",children:["$",(0,d._2)(D,2)]})]}),n?(0,a.jsxs)(v.G,{$justify:"space-between",style:{width:"100%"},children:[(0,a.jsxs)(v.G,{$gap:"9px",children:[a.jsx(v.qY,{$size:"16px",$line:"120%",children:"DapDap Discount"}),a.jsx(v.Sn,{$width:"65px",$height:"26px",$borderRadius:"6px",$background:"linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)",$borderWidth:"0px",children:a.jsx(v.qY,{$size:"14px",$line:"120%",children:"60% off"})})]}),(0,a.jsxs)(v.qY,{$size:"16px",$line:"120%",children:["-$",(0,d._2)(N,2)]})]}):(0,a.jsxs)(v.G,{$justify:"space-between",style:{width:"100%",opacity:.5},children:[a.jsx(v.qY,{$color:"#979ABE",$size:"16px",$line:"120%",children:"DapDap Discount"}),(0,a.jsxs)(v.qY,{$color:"#979ABE",$size:"16px",$line:"120%",children:["-$",(0,d._2)(N,2)]})]}),(0,a.jsxs)(v.G,{$justify:"space-between",$align:"flex-start",style:{width:"100%"},children:[a.jsx(v.qY,{$size:"16px",$line:"120%",children:"Total"}),(0,a.jsxs)(v.G,{$direction:"column",$align:"flex-end",$gap:"5px",children:[(0,a.jsxs)(v.qY,{$size:"16px",$line:"120%",children:["$",(0,d._2)(Y,2)]}),(0,a.jsxs)(v.qY,{$color:"#979ABE",$size:"14px",$line:"120%",children:["(~",(0,u.default)(Y).div(M.ETH).toFixed(4)," ETH)"]})]})]})]}),(0,a.jsxs)(v.G,{$direction:"column",$gap:"15px",children:[n?a.jsx(v.Sn,{$background:"#373A53",$borderRadius:"12px",children:a.jsx(v.qY,{$size:"16px",$weight:"500",$line:"12px",children:"You’ve got price on 60% off"})}):a.jsx(v.Sn,{$background:"linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)",$borderRadius:"12px",$borderWidth:"0",onClick:()=>k.push("/quest/detail?id=28"),"data-bp":"1001521-001",children:(0,a.jsxs)(v.qY,{$size:"16px",$weight:"500",$line:"12px",children:["Get price on 60% off ",T]})}),0===F?a.jsx(v.Sn,{$background:n?"linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)":"#373A53",$borderWidth:n?"0":"1px",$borderRadius:"12px",onClick:R,"data-bp":"1001521-002",children:a.jsx(v.qY,{$size:"16px",$weight:"500",$line:"12px",children:"Register with ETH"})}):a.jsx(v.V$,{children:a.jsx(v.Ld,{className:"circle",children:C})})]})]}):(0,a.jsxs)(v.Hn,{children:[a.jsx(v.vQ,{children:a.jsx(v.uv,{children:a.jsx(v.BL,{children:e.label})})}),(0,a.jsxs)(v.G,{$direction:"column",$gap:"20px",style:{marginTop:35,marginBottom:45},children:[a.jsx(v.qY,{$size:"40px",$weight:"700",$line:"100%",children:"Congratulations!"}),a.jsx(v.qY,{$size:"16px",$line:"120%",children:"You’ve just got your own .base name"})]}),a.jsx(v.G,{$direction:"column",$gap:"20px",children:a.jsx(v.Sn,{$borderRadius:"12px",onClick:()=>k.push("https://www.basename.app/names"),children:a.jsx(v.qY,{$size:"16px",$weight:"500",$line:"120%",children:"Check on Basescan"})})})]})]})})});i()}catch(e){i(e)}})},9564:(e,t,n)=>{n.d(t,{Av:()=>o,BL:()=>h,G:()=>s.G,Hn:()=>d,I2:()=>s.I2,Ii:()=>l,Ld:()=>s.Ld,Sn:()=>s.Sn,V$:()=>c,aD:()=>p,eV:()=>r,qY:()=>s.qY,uv:()=>u,vQ:()=>y});var i=n(57518),a=n.n(i),s=n(24875);let r=a().div.withConfig({componentId:"sc-97dd7a1c-0"})`
  width: 412px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`,o=a().div.withConfig({componentId:"sc-97dd7a1c-1"})`
  padding: 21px 26px 18px;
  display: flex;
  justify-content: flex-end;
`,d=a().div.withConfig({componentId:"sc-97dd7a1c-2"})`
  padding: 0 26px 26px;
`,p=a().div.withConfig({componentId:"sc-97dd7a1c-3"})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 40px;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`,l=a().button.withConfig({componentId:"sc-97dd7a1c-4"})`
  outline: none;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #32364B;
  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &[disabled] {
    opacity: 0.5;
  }
`,c=a().div.withConfig({componentId:"sc-97dd7a1c-5"})`
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: "";
    position: absolute;
    border-radius: 12px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%);
    opacity: 0.3;
  }
  .circle {
    animation: 0.5s linear  infinite ${s.dx};
  }
`,y=a().div.withConfig({componentId:"sc-97dd7a1c-6"})`
  position: relative;
  height: 62px;
  padding: 0 44px;
  border-top: 1px solid rgba(151, 154, 190, 0.2);
  border-bottom: 1px solid rgba(151, 154, 190, 0.2);
  &:before, &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 96px;
    opacity: 0.2;
    background: #979ABE;
  }
  &:before {
    left: 44px;
    top: -17px;
  }
  &:after {
    right: 44px;
    top: -17px;
  }
`,u=a().div.withConfig({componentId:"sc-97dd7a1c-7"})`
  position: relative;
  border-radius: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before, &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  &:before {
    border-radius: 30px;
    background: linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%);
    filter: blur(11.800000190734863px);
  }
  &:after {
    border-radius: 30px;
    border: 4px solid #7AA1FF;
    background: #040707;
  }
`,h=a().div.withConfig({componentId:"sc-97dd7a1c-8"})`
  position: relative;
  z-index: 50;
  color: #FBFBFB;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`},30326:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var a=n(20997),s=n(63658),r=n(34675),o=n(16689),d=n(82849),p=e([r]);r=(p.then?(await p)():p)[0];let l=(0,o.memo)(({loading:e,questList:t=[],bp:n})=>(0,a.jsxs)(d.PQ,{children:[a.jsx(d.SG,{children:"Related Quests"}),e?a.jsx(d.ZY,{children:a.jsx(s.Z,{size:60})}):a.jsx(d.sl,{children:t.map(e=>a.jsx(r.Z,{quest:e,bp:n},e.id+Math.random()))})]}));i()}catch(e){i(e)}})},82849:(e,t,n)=>{n.d(t,{PQ:()=>s.PQ,SG:()=>r,ZY:()=>s.ZY,sl:()=>o});var i=n(57518),a=n.n(i),s=n(24875);let r=a().div.withConfig({componentId:"sc-c3a44d13-0"})`
  margin-bottom: 30px;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #FFF 0%, #AFAFAF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,o=a().div.withConfig({componentId:"sc-c3a44d13-1"})`
  display: flex;
  flex-wrap: wrap;
  gap: 19px;
  margin-bottom: 30px;
`},6751:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>y});var a=n(20997),s=n(7375),r=n(1718),o=n(25675),d=n.n(o),p=n(16689),l=n(73325),c=e([s,r]);[s,r]=c.then?(await c)():c;let y=(0,p.memo)(({onClose:e,chainId:t})=>{let{chains:n}=(0,s.Z)(),[{connectedChain:i,settingChain:o},c]=(0,r.useSetChain)(),y=(0,p.useMemo)(()=>n[t],[n]),u=async function(){let n=await c({chainId:`0x${Number(t).toString(16)}`});n&&e()};return(0,p.useEffect)(()=>{},[]),a.jsx(l.I2,{children:(0,a.jsxs)(l.eV,{children:[(0,a.jsxs)(l.G,{$gap:"8px",children:[a.jsx(d(),{width:26,height:26,src:y.icon,alt:"chainImage"}),a.jsx(l.qY,{$size:"18px",$weight:"500",children:y.chainName})]}),(0,a.jsxs)(l.qY,{$size:"18px",$weight:"700",style:{marginTop:17,marginBottom:22},children:["Please connect to ",y.chainName]}),a.jsx(l.Sn,{$height:"46px",$borderWidth:"0",$background:"#0038FF",$borderRadius:"8px",onClick:u,children:a.jsx(l.qY,{$size:"18px",$weight:"700",children:"Switch Network"})}),a.jsx(l.Sn,{$background:"transparent",$borderWidth:"0",onClick:e,children:a.jsx(l.qY,{$color:"#979ABE",$size:"14px",children:"Close"})})]})})});i()}catch(e){i(e)}})},73325:(e,t,n)=>{n.d(t,{G:()=>s.G,I2:()=>s.I2,Sn:()=>s.Sn,eV:()=>r,qY:()=>s.qY});var i=n(57518),a=n.n(i),s=n(24875);let r=a().div.withConfig({componentId:"sc-a39fdbc-0"})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 334px;
  padding: 36px 25px 20px;
  color: white;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`},95320:(e,t,n)=>{n.d(t,{Z:()=>b});var i=n(20997),a=n(16689),s=n(57518),r=n.n(s),o=n(24875);let d=r().div.withConfig({componentId:"sc-5069c904-0"})`
  margin-bottom: 22px;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #FFF 0%, #AFAFAF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,p=r().div.withConfig({componentId:"sc-5069c904-1"})`
  margin-top: 61px;
  width: 1245px;
  margin: 61px auto 0;
  /* height: 243px; */
  padding: 24px 20px 19px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #282A3E;
  background: #1A1C22;
`,l=r().div.withConfig({componentId:"sc-5069c904-2"})`
  position: relative;
  width: 240px;
  height: 158px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`,c=r().div.withConfig({componentId:"sc-5069c904-3"})`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 12px;
  top: 12px;
  width: 55px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.30);
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;var y=n(10514),u=n(25675),h=n.n(u),m=n(11163),x=n(76198);let b=(0,a.memo)(({bnsNames:e,onClick:t})=>{let n=(0,m.useRouter)(),s=function(e){t&&t(e)};return(0,a.useEffect)(()=>{"string"==typeof n.query.Your_BNS_Names&&window.scrollTo(0,920)},[n.query]),(0,i.jsxs)(p,{children:[(0,i.jsxs)(d,{children:["Your BNS Names (",e.length,")"]}),i.jsx(o.G,{$justify:"flex-start",$gap:"13px",$wrap:"wrap",children:e.map((e,t)=>{let n=x.Mo.filter(t=>e.addresses&&e.addresses[t]);return(0,i.jsxs)(l,{onClick:()=>s(e),children:[e.isPrimaryName&&i.jsx(c,{children:"Primary"}),i.jsx(h(),{src:y.Z,width:50,height:50,alt:"bnsAvatar"}),i.jsx(o.qY,{$size:"18px",$weight:"700",$line:"120%",children:e.name}),i.jsx(o.G,{$gap:"6px",children:n.map(e=>{let t=x.v1[e];return i.jsx(h(),{src:t.icon,width:18,height:18,alt:"coinType"},e)})})]},t)})})]})})},83635:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var a=n(20997),s=n(39332),r=n(16689),o=n(59397),d=n(40751),p=e([o]);o=(p.then?(await p)():p)[0];let l=(0,r.memo)(({info:e})=>{let t=(0,s.useRouter)(),{check:n}=(0,o.Z)({isNeedAk:!0});return(0,a.jsxs)(d.PQ,{onClick:()=>{n(()=>{t.push("/profile")})},children:[(0,a.jsxs)(d.D,{children:[a.jsx(d.ar,{children:"My PTS"}),(0,a.jsxs)(d.FY,{children:[a.jsx(d.Vs,{$size:18}),a.jsx("span",{children:e?.reward||0})]})]}),a.jsx(d.RM,{}),(0,a.jsxs)(d.D,{children:[a.jsx(d.ar,{children:"My Rank"}),(0,a.jsxs)(d.FY,{children:["#",e?.rank||0]})]})]})});i()}catch(e){i(e)}})},40751:(e,t,n)=>{n.d(t,{D:()=>o,FY:()=>p,PQ:()=>r,RM:()=>l,Vs:()=>s.Vs,ar:()=>d});var i=n(57518),a=n.n(i),s=n(44945);let r=a().div.withConfig({componentId:"sc-2ced9b9e-0"})`
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
`,o=a().div.withConfig({componentId:"sc-2ced9b9e-1"})`
  display: flex;
  flex-direction: column;
  gap: 7px;
`,d=a().div.withConfig({componentId:"sc-2ced9b9e-2"})`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`,p=a().div.withConfig({componentId:"sc-2ced9b9e-3"})`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 6px;
`,l=a().div.withConfig({componentId:"sc-2ced9b9e-4"})`
  width: 1px;
  height: 42px;
  background-color: rgba(255, 255, 255, 0.2);
`},76198:(e,t,n)=>{n.d(t,{Mo:()=>a,Pl:()=>i,v1:()=>s});let i=[{icon:"https://www.basename.app/logo/md.png"},{icon:"https://www.basename.app/assets/tokenGate/ape.svg"},{icon:"https://www.basename.app/assets/tokenGate/azk.svg"},{icon:"https://www.basename.app/assets/tokenGate/pnk.svg"},{icon:"https://www.basename.app/assets/tokenGate/intr.avif"},{icon:"https://www.basename.app/assets/tokenGate/rwrd.gif"},{icon:"https://www.basename.app/assets/tokenGate/brtb.gif"},{icon:"https://www.basename.app/assets/tokenGate/stwc.avif"},{icon:"https://www.basename.app/assets/tokenGate/mayc.svg"},{icon:"https://www.basename.app/assets/tokenGate/ocsm.gif"},{icon:"https://www.basename.app/assets/tokenGate/beanz.avif"},{icon:"https://www.basename.app/assets/tokenGate/tmic.jpeg"},{icon:"https://www.basename.app/assets/tokenGate/nakamigos.avif"},{icon:"https://www.basename.app/assets/tokenGate/dOne.gif"},{icon:"https://www.basename.app/assets/tokenGate/elem.avif"},{icon:"https://www.basename.app/assets/tokenGate/dkay.avif"},{icon:"https://www.basename.app/assets/tokenGate/penguins.avif"},{icon:"https://www.basename.app/assets/tokenGate/nera.avif"}],a=[0,60,614,3,397,966,714,501,118,52752,3030,931],s={0:{label:"BTC",icon:"https://www.basename.app/assets/edit/addresses/btc.png"},60:{label:"ETH",icon:"https://www.basename.app/assets/edit/addresses/eth.png"},614:{label:"OP",icon:"https://www.basename.app/assets/edit/addresses/op.png"},3:{label:"DOGE",icon:"https://www.basename.app/assets/edit/addresses/doge.png"},397:{label:"NEAR",icon:"https://www.basename.app/assets/edit/addresses/near.png"},966:{label:"MATIC",icon:"https://www.basename.app/assets/edit/addresses/pol.png"},714:{label:"BNB",icon:"https://www.basename.app/assets/edit/addresses/bnb.png"},501:{label:"SOL",icon:"https://www.basename.app/assets/edit/addresses/sol.png"},118:{label:"ATOM",icon:"https://www.basename.app/assets/edit/addresses/atom.webp"},52752:{label:"CELO",icon:"https://www.basename.app/assets/edit/addresses/celo.png"},3030:{label:"HBAR",icon:"https://www.basename.app/assets/edit/addresses/hbar.png"},931:{label:"RUNE",icon:"https://www.basename.app/assets/edit/addresses/rune.png"}}},28510:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>o});var a=n(71982),s=n(8433),r=e([s]);s=(r.then?(await r)():r)[0];let{JsonRpcProvider:d}=a.providers,p={"0x0363696B6D369859f5fb4994a5Ade574CD91D220":[{inputs:[{internalType:"contract ENS",name:"ensAddr",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"controller",type:"address"},{indexed:!1,internalType:"bool",name:"enabled",type:"bool"}],name:"ControllerChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"contract NameResolver",name:"resolver",type:"address"}],name:"DefaultResolverChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"addr",type:"address"},{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"}],name:"ReverseClaimed",type:"event"},{inputs:[{internalType:"address",name:"owner",type:"address"}],name:"claim",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"addr",type:"address"},{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"resolver",type:"address"}],name:"claimForAddr",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"resolver",type:"address"}],name:"claimWithResolver",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"controllers",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"defaultResolver",outputs:[{internalType:"contract NameResolver",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"ens",outputs:[{internalType:"contract ENS",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"addr",type:"address"}],name:"node",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"pure",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"controller",type:"address"},{internalType:"bool",name:"enabled",type:"bool"}],name:"setController",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"resolver",type:"address"}],name:"setDefaultResolver",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"name",type:"string"}],name:"setName",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"addr",type:"address"},{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"resolver",type:"address"},{internalType:"string",name:"name",type:"string"}],name:"setNameForAddr",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"}],"0x4079d84889e0E1AC22beec60dc8e5E7b621bf55D":[{inputs:[{internalType:"contract BaseRegistrarImplementation",name:"_base",type:"address"},{internalType:"contract ReverseRegistrar",name:"_reverseRegistrar",type:"address"},{internalType:"contract INameWrapper",name:"_nameWrapper",type:"address"},{internalType:"contract ENS",name:"_ens",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{inputs:[{internalType:"uint256",name:"duration",type:"uint256"}],name:"DurationTooShort",type:"error"},{inputs:[],name:"InsufficientValue",type:"error"},{inputs:[{internalType:"string",name:"name",type:"string"}],name:"NameNotAvailable",type:"error"},{anonymous:!1,inputs:[{indexed:!1,internalType:"string",name:"name",type:"string"},{indexed:!0,internalType:"bytes32",name:"label",type:"bytes32"},{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!1,internalType:"uint256",name:"baseCost",type:"uint256"},{indexed:!1,internalType:"uint256",name:"premium",type:"uint256"},{indexed:!1,internalType:"uint256",name:"expires",type:"uint256"}],name:"NameRegistered",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"string",name:"name",type:"string"},{indexed:!0,internalType:"bytes32",name:"label",type:"bytes32"},{indexed:!1,internalType:"uint256",name:"cost",type:"uint256"},{indexed:!1,internalType:"uint256",name:"expires",type:"uint256"}],name:"NameRenewed",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:!0,internalType:"bytes32",name:"previousAdminRole",type:"bytes32"},{indexed:!0,internalType:"bytes32",name:"newAdminRole",type:"bytes32"}],name:"RoleAdminChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:!0,internalType:"address",name:"account",type:"address"},{indexed:!0,internalType:"address",name:"sender",type:"address"}],name:"RoleGranted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:!0,internalType:"address",name:"account",type:"address"},{indexed:!0,internalType:"address",name:"sender",type:"address"}],name:"RoleRevoked",type:"event"},{inputs:[],name:"DEFAULT_ADMIN_ROLE",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[],name:"MIN_REGISTRATION_DURATION",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"REGISTER_ROLE",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[],name:"RENEW_ROLE",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"name",type:"string"}],name:"available",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"",type:"bytes32"}],name:"commitments",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getChainID",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"}],name:"getRoleAdmin",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"grantRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"hasRole",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"nameWrapper",outputs:[{internalType:"contract INameWrapper",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_token",type:"address"},{internalType:"address",name:"_to",type:"address"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"recoverFunds",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"address",name:"owner",type:"address"},{internalType:"uint256",name:"duration",type:"uint256"},{internalType:"uint256",name:"validUntil",type:"uint256"},{internalType:"address",name:"resolver",type:"address"},{internalType:"bool",name:"reverseRecord",type:"bool"},{internalType:"uint16",name:"ownerControlledFuses",type:"uint16"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct BASERegistrarController.RegisterRequest",name:"request",type:"tuple"},{internalType:"bytes[]",name:"data",type:"bytes[]"}],name:"registerWithSignature",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"uint256",name:"duration",type:"uint256"},{internalType:"uint256",name:"validUntil",type:"uint256"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct BASERegistrarController.RenewRequest",name:"request",type:"tuple"}],name:"renewWithSignature",outputs:[],stateMutability:"payable",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"renounceRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"reverseRegistrar",outputs:[{internalType:"contract ReverseRegistrar",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"revokeRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceID",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"name",type:"string"}],name:"valid",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"pure",type:"function"},{inputs:[],name:"withdraw",outputs:[],stateMutability:"nonpayable",type:"function"}],"0xa92659104Eb42309Ae9482F1D1AE934B9Ee51dc3":[{inputs:[{internalType:"contract ENS",name:"_ens",type:"address"},{internalType:"contract INameWrapper",name:"wrapperAddress",type:"address"},{internalType:"address",name:"_trustedETHController",type:"address"},{internalType:"address",name:"_trustedReverseRegistrar",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!0,internalType:"uint256",name:"contentType",type:"uint256"}],name:"ABIChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"address",name:"a",type:"address"}],name:"AddrChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"uint256",name:"coinType",type:"uint256"},{indexed:!1,internalType:"bytes",name:"newAddress",type:"bytes"}],name:"AddressChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!0,internalType:"address",name:"delegate",type:"address"},{indexed:!0,internalType:"bool",name:"approved",type:"bool"}],name:"Approved",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"bytes",name:"hash",type:"bytes"}],name:"ContenthashChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"bytes",name:"name",type:"bytes"},{indexed:!1,internalType:"uint16",name:"resource",type:"uint16"},{indexed:!1,internalType:"bytes",name:"record",type:"bytes"}],name:"DNSRecordChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"bytes",name:"name",type:"bytes"},{indexed:!1,internalType:"uint16",name:"resource",type:"uint16"}],name:"DNSRecordDeleted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"bytes",name:"lastzonehash",type:"bytes"},{indexed:!1,internalType:"bytes",name:"zonehash",type:"bytes"}],name:"DNSZonehashChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!0,internalType:"bytes4",name:"interfaceID",type:"bytes4"},{indexed:!1,internalType:"address",name:"implementer",type:"address"}],name:"InterfaceChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"string",name:"name",type:"string"}],name:"NameChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"bytes32",name:"x",type:"bytes32"},{indexed:!1,internalType:"bytes32",name:"y",type:"bytes32"}],name:"PubkeyChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!0,internalType:"string",name:"indexedKey",type:"string"},{indexed:!1,internalType:"string",name:"key",type:"string"},{indexed:!1,internalType:"string",name:"value",type:"string"}],name:"TextChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"node",type:"bytes32"},{indexed:!1,internalType:"uint64",name:"newVersion",type:"uint64"}],name:"VersionChanged",type:"event"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"uint256",name:"contentTypes",type:"uint256"}],name:"ABI",outputs:[{internalType:"uint256",name:"",type:"uint256"},{internalType:"bytes",name:"",type:"bytes"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"}],name:"addr",outputs:[{internalType:"address payable",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"uint256",name:"coinType",type:"uint256"}],name:"addr",outputs:[{internalType:"bytes",name:"",type:"bytes"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"address",name:"delegate",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"approve",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"}],name:"clearRecords",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"}],name:"contenthash",outputs:[{internalType:"bytes",name:"",type:"bytes"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes32",name:"name",type:"bytes32"},{internalType:"uint16",name:"resource",type:"uint16"}],name:"dnsRecord",outputs:[{internalType:"bytes",name:"",type:"bytes"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes32",name:"name",type:"bytes32"}],name:"hasDNSRecords",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes4",name:"interfaceID",type:"bytes4"}],name:"interfaceImplementer",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"address",name:"delegate",type:"address"}],name:"isApprovedFor",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes[]",name:"data",type:"bytes[]"}],name:"multicall",outputs:[{internalType:"bytes[]",name:"results",type:"bytes[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"nodehash",type:"bytes32"},{internalType:"bytes[]",name:"data",type:"bytes[]"}],name:"multicallWithNodeCheck",outputs:[{internalType:"bytes[]",name:"results",type:"bytes[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"}],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"}],name:"pubkey",outputs:[{internalType:"bytes32",name:"x",type:"bytes32"},{internalType:"bytes32",name:"y",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"",type:"bytes32"}],name:"recordVersions",outputs:[{internalType:"uint64",name:"",type:"uint64"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"uint256",name:"contentType",type:"uint256"},{internalType:"bytes",name:"data",type:"bytes"}],name:"setABI",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"uint256",name:"coinType",type:"uint256"},{internalType:"bytes",name:"a",type:"bytes"}],name:"setAddr",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"address",name:"a",type:"address"}],name:"setAddr",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"operator",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes",name:"hash",type:"bytes"}],name:"setContenthash",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes",name:"data",type:"bytes"}],name:"setDNSRecords",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes4",name:"interfaceID",type:"bytes4"},{internalType:"address",name:"implementer",type:"address"}],name:"setInterface",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"string",name:"newName",type:"string"}],name:"setName",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes32",name:"x",type:"bytes32"},{internalType:"bytes32",name:"y",type:"bytes32"}],name:"setPubkey",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"string",name:"key",type:"string"},{internalType:"string",name:"value",type:"string"}],name:"setText",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"bytes",name:"hash",type:"bytes"}],name:"setZonehash",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceID",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"},{internalType:"string",name:"key",type:"string"}],name:"text",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"node",type:"bytes32"}],name:"zonehash",outputs:[{internalType:"bytes",name:"",type:"bytes"}],stateMutability:"view",type:"function"}]};function o(){let{account:e,provider:t}=(0,s.Z)(),n=async function({address:e,functionName:t,args:n=[]}){let i=new d("https://mainnet.base.org",{name:"Base Mainnet",chainId:8453,ensAddress:"0xeCBaE6E54bAA669005b93342E5650d5886D54fc7"}),s=new a.Contract(e,p[e],i);try{return s[t](...n)}catch(e){return Promise.reject(e)}},i=async function({address:n,functionName:i,args:s=[]}){let r=await t.getSigner(e),o=new a.Contract(n,p[n],r);try{let e=await o[i](...s);return await e.wait()}catch(e){return Promise.reject(e)}},r=async function({address:e,args:n}){let i=new a.Contract(e,p[e],t.getSigner());try{return await i.multicall(n)}catch(e){console.log(e)}};return{read:n,write:i,multicall:r,encodeFunctionData:function({address:e,functionName:t,args:n=[]}){let i=new a.utils.Interface(p[e]);return i.encodeFunctionData(t,n)}}}i()}catch(e){i(e)}})},18607:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>c});var a=n(16689),s=n(42501),r=n(22107),o=n(8433),d=n(59397),p=n(78579),l=e([o,d,r]);function c(e){let[t,n]=(0,a.useState)([]),[i,l]=(0,a.useState)(!1),{account:c}=(0,o.Z)(),{check:y}=(0,d.Z)({isNeedAk:!0,isQuiet:!0}),u=(0,a.useCallback)(async()=>{if(!i){l(!0);try{let t=await (0,p.U2)(`${s.h}/api/quest/list?campaign_id=${e}`),i=t.data;n(i?i.sort((e,t)=>e.quest_category_id-t.quest_category_id):[]),l(!1)}catch(e){l(!1)}}},[i,e]),{run:h}=(0,r.Z)(()=>{if(!c){u();return}y(u)},{wait:t.length?800:3e3});return(0,a.useEffect)(()=>{e&&h()},[e,c]),{loading:i,questList:t}}[o,d,r]=l.then?(await l)():l,i()}catch(e){i(e)}})},24875:(e,t,n)=>{n.d(t,{BL:()=>b,Cp:()=>r,G:()=>k,HF:()=>o,I2:()=>f,Ld:()=>T,PO:()=>u,PQ:()=>v,QL:()=>x,SD:()=>w,Sn:()=>A,TB:()=>l,Uz:()=>s,YZ:()=>m,Yo:()=>$,ZC:()=>y,ZD:()=>c,ZY:()=>j,b7:()=>p,dx:()=>g,ic:()=>C,qY:()=>_,ry:()=>h,sd:()=>d});var i=n(57518),a=n.n(i);a().div.withConfig({componentId:"sc-886953d9-0"})`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 82px;
`;let s=a().button.withConfig({componentId:"sc-886953d9-1"})`
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
`,r=a().div.withConfig({componentId:"sc-886953d9-2"})`
  color: #ebf479;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`,o=a().div.withConfig({componentId:"sc-886953d9-3"})`
  margin-bottom: 24px;
  width: 306px;
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`,d=a().div.withConfig({componentId:"sc-886953d9-4"})`
  width: 700px;
  height: 388px;
`,p=a().div.withConfig({componentId:"sc-886953d9-5"})`
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
`,l=a().div.withConfig({componentId:"sc-886953d9-6"})`
  flex: 1;
  height: 4px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.15);
  &.active {
    background: #ebf479;
  }
`,c=a().button.withConfig({componentId:"sc-886953d9-7"})`
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
`,y=a().button.withConfig({componentId:"sc-886953d9-8"})`
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
`,u=a().div.withConfig({componentId:"sc-886953d9-9"})`
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
`,h=a().input.withConfig({componentId:"sc-886953d9-10"})`
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
`,m=a().div.withConfig({componentId:"sc-886953d9-11"})`
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
`,x=a().div.withConfig({componentId:"sc-886953d9-12"})`
  position: absolute;
  right: -23px;
  bottom: -20px;
`,b=a().div.withConfig({componentId:"sc-886953d9-13"})`
  font-family: Gantari;
  font-size: 52px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #afafaf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,g=i.keyframes`
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
`,f=a().div.withConfig({componentId:"sc-886953d9-14"})`
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
`,w=a().div.withConfig({componentId:"sc-886953d9-15"})`
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
  .swiper {
    overflow: hidden;
  }
`;a().div.withConfig({componentId:"sc-886953d9-16"})`
  width: 100%;
`;let v=a().div.withConfig({componentId:"sc-886953d9-17"})`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 100px;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`,j=a().div.withConfig({componentId:"sc-886953d9-18"})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`,$=a().div.withConfig({componentId:"sc-886953d9-19"})`
  display: flex;
  align-items: center;
  justify-content: center;
`,T=a().div.withConfig({componentId:"sc-886953d9-20"})`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s linear;

  &.proceed {
    transform: translate(2px, 2px);
  }
`,C=a().video.withConfig({componentId:"sc-886953d9-21"})``,k=a().div.attrs(e=>({$direction:e.$direction||"row",$wrap:e.$wrap||"wrap",$align:e.$align||"center",$justify:e.$justify||"center",$gap:e.$gap||"0px"})).withConfig({componentId:"sc-886953d9-22"})`
  display: flex;
  flex-wrap: ${e=>e.$wrap};
  flex-direction: ${e=>e.$direction};
  align-items: ${e=>e.$align};
  justify-content: ${e=>e.$justify};
  gap: ${e=>e.$gap};
`,A=a().button.attrs(e=>({$width:e.$width||"100%",$height:e.$height||"50px",$background:e.$background||"#373A53",$borderRadius:e.$borderRadius||"10px",$borderWidth:e.$borderWidth||"1px",$borderStyle:e.$borderStyle||"solid",$borderColor:e.$borderColor||"#373A53"})).withConfig({componentId:"sc-886953d9-23"})`
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
`,_=a().div.withConfig({componentId:"sc-886953d9-24"})`
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
`}};