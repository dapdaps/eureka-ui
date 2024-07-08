"use strict";(()=>{var e={};e.id=7758,e.ids=[7758,2888],e.modules={13870:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.r(t),i.d(t,{config:()=>u,default:()=>p,getServerSideProps:()=>x,getStaticPaths:()=>g,getStaticProps:()=>h,reportWebVitals:()=>f,routeModule:()=>j,unstable_getServerProps:()=>C,unstable_getServerSideProps:()=>v,unstable_getStaticParams:()=>w,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>m});var r=i(87093),s=i(35244),a=i(1323),o=i(65211),c=i(64807),l=i(7567),d=e([c,l]);[c,l]=d.then?(await d)():d;let p=(0,a.l)(l,"default"),h=(0,a.l)(l,"getStaticProps"),g=(0,a.l)(l,"getStaticPaths"),x=(0,a.l)(l,"getServerSideProps"),u=(0,a.l)(l,"config"),f=(0,a.l)(l,"reportWebVitals"),m=(0,a.l)(l,"unstable_getStaticProps"),b=(0,a.l)(l,"unstable_getStaticPaths"),w=(0,a.l)(l,"unstable_getStaticParams"),C=(0,a.l)(l,"unstable_getServerProps"),v=(0,a.l)(l,"unstable_getServerSideProps"),j=new r.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/super-bridge",pathname:"/super-bridge",bundlePath:"",filename:""},components:{App:c.default,Document:o.default},userland:l});n()}catch(e){n(e)}})},25089:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var r=i(16689),s=i(8433),a=i(71982),o=i(17473),c=i(84379),l=i(7632),d=e([s]);s=(d.then?(await d)():d)[0];let h={11155111:"https://rpc2.sepolia.org",421614:"https://public.stackup.sh/api/v1/node/arbitrum-sepolia"};function p(e){let[t,i]=(0,r.useState)(!1),[n,d]=(0,r.useState)({}),p=(0,r.useRef)(),g=(0,r.useRef)(0),{account:x}=(0,s.Z)(),u=(0,r.useCallback)(async()=>{if(x&&e&&e.length)try{i(!0);let t=e[0].chainId,n=t?h[t]?h[t]:o.Z[t]?.rpcUrls[g.current]:"";if(p.current=t,d({}),!n)throw"No rpcUrl";let r=new a.providers.JsonRpcProvider(n),s=!1,u=e.filter(e=>(e.isNative&&(s=!0),!e.isNative&&e.address)),f=u.map(e=>({address:e.address,name:"balanceOf",params:[x]})),m=l.Z[e[0].chainId],b=[(0,c.A)({abi:[{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],options:{},calls:f,multicallAddress:m,provider:r})];s&&b.push(r.getBalance(x));let[w,C]=await Promise.all(b),v={};s&&C&&(v.native=a.utils.formatUnits(C,18));for(let e=0;e<w.length;e++){let t=u[e];v[t.address]=a.utils.formatUnits(w[e]?.[0]||0,t.decimals)}e.length&&e[0].chainId===p.current&&(d(v),i(!1))}catch(e){console.log(e),g.current<2?(g.current+=1,u()):(i(!1),d({}))}},[e,x]);return(0,r.useEffect)(()=>{u()},[e,x]),{loading:t,balances:n,queryBalance:u,currentChainId:p.current}}n()}catch(e){n(e)}})},7632:(e,t,i)=>{i.d(t,{Z:()=>n});let n={42161:"0x99D73e5d83148FA2b41248059061f91703Cf0516",43114:"0x072aD7f291AED59E7C4974EbdcF73B79DAC89051",8453:"0xcA11bde05977b3631167028862bE2a173976CA11",56:"0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",100:"0xAbd2FE441318a73414e3fa93297D3Bdb036CB2Fa",59144:"0xcA11bde05977b3631167028862bE2a173976CA11",5e3:"0xcA11bde05977b3631167028862bE2a173976CA11",10:"0xD9bfE9979e9CA4b2fe84bA5d4Cf963bBcB376974",137:"0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",324:"0x1ADC6Ac76c6d35cED013cA0513919f7f53586fAf",169:"0xE4f7776c753aF46D2aa23e3348d17548C86DC47D",1088:"0xc39aBB6c4451089dE48Cffb013c39d3110530e5C",534352:"0xcA11bde05977b3631167028862bE2a173976CA11",1101:"0xcA11bde05977b3631167028862bE2a173976CA11",81457:"0xcA11bde05977b3631167028862bE2a173976CA11",34443:"0xcA11bde05977b3631167028862bE2a173976CA11",1:"0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",11155111:"0xcA11bde05977b3631167028862bE2a173976CA11",421614:"0xcA11bde05977b3631167028862bE2a173976CA11"}},67618:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>l});var r=i(71982),s=i(16689),a=i(17473),o=i(8433),c=e([o]);o=(c.then?(await c)():c)[0];let d={11155111:"https://ethereum-sepolia-rpc.publicnode.com",421614:"https://endpoints.omniatech.io/v1/arbitrum/sepolia/public"};function l({currency:e,updater:t,isNative:i,isPure:n}){let[c,l]=(0,s.useState)(),[p,h]=(0,s.useState)(!1),{account:g,chainId:x}=(0,o.Z)();return(0,s.useEffect)(()=>{if(!e&&!i)return;let t=e?.chainId||x;if(!t||!a.Z||!a.Z[t]&&!d[t]){console.error("Invalid _chainId or chains is undefined");return}let s=x?d[t]?d[t]:a.Z[t]?.rpcUrls[0]:"",o=async()=>{if(e&&s&&g&&e.address){h(!0);try{let t=new r.providers.JsonRpcProvider(s),i=new r.Contract(e.address,[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}],t),a=await i.balanceOf(g);l(n?a.toString():r.utils.formatUnits(a.toString(),e.decimals).toString()),h(!1)}catch(e){h(!1)}}},c=async()=>{if(s&&g){h(!0),l("0");try{let t=new r.providers.JsonRpcProvider(s),i=await t.getBalance(g);l(n?i.toString():r.utils.formatUnits(i.toString(),e?.decimals).toString()),h(!1)}catch(e){h(!1)}}};(e?.address||e?.isNative||i)&&g&&(e?.address&&!e?.isNative?o():c())},[e,g,t,x]),{balance:c,loading:p}}n()}catch(e){n(e)}})},7567:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.r(t),i.d(t,{default:()=>v});var r=i(20997),s=i(11163),a=i(16689),o=i(57518),c=i.n(o),l=i(70361),d=i(63530),p=i(32412),h=i(17473),g=i(51571),x=e([l,d,g]);[l,d,g]=x.then?(await x)():x;let u=c().div.withConfig({componentId:"sc-db408f9b-0"})`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 80px;
`,f=c().div.withConfig({componentId:"sc-db408f9b-1"})`
  width: 414px;
`,m=c().div.withConfig({componentId:"sc-db408f9b-2"})`
  margin-top: 20px;
`,b=[1,42161,10,8453,81457,5e3,324,59144,169,34443,1088,534352,1101,137,56,43114,100],w=Object.values(h.Z);w.sort((e,t)=>b.indexOf(e.chainId)-b.indexOf(t.chainId));let C=()=>{(0,s.useRouter)();let[e,t]=(0,a.useState)(1);return(0,r.jsxs)(u,{children:[r.jsx(l.Z,{chainList:w,onTransactionUpdate:()=>{t(e+1)}}),(0,r.jsxs)(f,{children:[r.jsx(d.Z,{updater:e}),r.jsx(m,{}),r.jsx(p.Z,{})]})]})};C.getInitialProps=async()=>({}),C.getLayout=g.wQ;let v=C;n()}catch(e){n(e)}})},84379:(e,t,i)=>{i.d(t,{A:()=>r});var n=i(71982);let r=async({abi:e,calls:t,options:i,multicallAddress:r,provider:s})=>{let{requireSuccess:a=!0,...o}=i||{},c=new n.Contract(r,[{inputs:[{internalType:"bool",name:"requireSuccess",type:"bool"},{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"tryAggregate",outputs:[{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"}],s),l=new n.utils.Interface(e),d=t.map(e=>({target:e.address.toLowerCase(),callData:l.encodeFunctionData(e.name,e.params)})),p=await c?.callStatic.tryAggregate(a,d,o),h=p?.map((e,i)=>{let[n,r]=e;return n&&0!==Number(r)?l.decodeFunctionResult(t[i].name,r):null});return h}},49032:(e,t,i)=>{i.d(t,{Z:()=>p});var n=i(20997),r=i(16689),s=i(57518),a=i.n(s),o=i(56358),c=i(8389);let l=a().div.withConfig({componentId:"sc-f1817213-0"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        color: #fff;
    }
    .select-wapper {
        position: relative;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        color: #fff;
        .trigger {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            border-radius: 8px;
            border: 1px solid rgba(55, 58, 83, 1);
            height: 36px;
            padding: 0 10px;
            gap: 10px;
            white-space: nowrap;
            width: 140px;
        }
        .layer {
            position: absolute;
            top: 37px;
            left: 0;
            right: 0;
            padding: 5px 0;
            border-radius: 8px;
            background-color: rgba(46, 49, 66, 1);
            white-space: nowrap;
            .layer-item {
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                padding: 0 10px;
                &:hover {
                    background-color: rgba(36, 38, 52, 1);
                }
            }
        }
    }
`,d=[{key:1,name:"Cheapest"},{key:2,name:"Fastest"}];function p({onClose:e,routeSortType:t,onSortTypeChange:i}){let[s,a]=(0,r.useState)(!1),[p,h]=(0,r.useState)(d),[g,x]=(0,r.useState)(d[0]),u=(0,r.useRef)(null),f=(0,r.useCallback)(e=>{let t=u.current?.contains(e.target);t||a(!1)},[]);return(0,r.useEffect)(()=>(document.addEventListener("click",f,!1),()=>{document.removeEventListener("click",f)}),[]),(0,r.useEffect)(()=>{let e=p.find(e=>e.key===t);x(e)},[t,p]),n.jsx(c.Z,{title:"Setting",top:"19%",onClose:e,children:(0,n.jsxs)(l,{children:[n.jsx("div",{className:"title",children:"Preference for Route"}),(0,n.jsxs)("div",{className:"select-wapper",ref:u,children:[(0,n.jsxs)("div",{className:"trigger",onClick:()=>{a(!0)},children:[n.jsx("div",{children:g.name}),n.jsx("div",{children:n.jsx(o.K,{})})]}),s&&n.jsx("div",{className:"layer",children:p.map(e=>(0,n.jsxs)("div",{onClick:()=>{i(e.key),a(!1)},className:"layer-item",children:[n.jsx("div",{children:e.name}),t===e.key&&n.jsx("div",{children:n.jsx("svg",{width:"13",height:"10",viewBox:"0 0 13 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M1 4L5 8L12 1",stroke:"#EBF479","stroke-width":"2","stroke-linecap":"round"})})})]},e.key))})]})]})})}},70361:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>A});var r=i(20997),s=i(16689),a=i(57518),o=i.n(a),c=i(37478),l=i(63043),d=i(97626),p=i(11163),h=i(43847),g=i(42188),x=i(67618),u=i(8433),f=i(14300),m=i(41045),b=i(21004),w=i(76073),C=i(55564),v=i(16420),j=i(41953),y=i(49032),k=i(40358),N=i(71838),I=i(75380),S=i(83781),Z=i(19217),T=e([d,g,x,u,f,m,b,w,v,j,k,N,I,S,Z,l]);[d,g,x,u,f,m,b,w,v,j,k,N,I,S,Z,l]=T.then?(await T)():T;let L=o().div.withConfig({componentId:"sc-fd6df378-0"})`
  color: #ffffff;
  width: 800px;
  min-height: 523px;
  border-radius: 16px;
  border: 1px solid rgba(55, 58, 83, 1);
  background: rgba(38, 40, 54, 1);
  padding: 26px 60px;
`,E=o().div.withConfig({componentId:"sc-fd6df378-1"})`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(46, 49, 66, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  &:hover {
    border: 1px solid rgba(235, 244, 121, .3);
  }
`,B=o().div.withConfig({componentId:"sc-fd6df378-2"})`
  height: ${({height:e=12})=>`${e}px`};
`,z=o().div.withConfig({componentId:"sc-fd6df378-3"})`
  position: relative;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .arrow {
    position: absolute;
    width: 34px;
    height: 34px;
    border: 4px solid rgba(38, 40, 54, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(46, 49, 66, 1);
  }
`;function A({chainList:e,onTransactionUpdate:t}){let[i,n]=(0,s.useState)(!1),[a,o]=(0,s.useState)(!1),[T,A]=(0,s.useState)(!1),{account:$,chainId:D,provider:M}=(0,u.Z)(),[R,F]=(0,s.useState)(e[0]),[P,V]=(0,s.useState)(e[1]),[_,q]=(0,s.useState)(),[O,H]=(0,s.useState)(),[U,G]=(0,s.useState)(""),[J,W]=(0,s.useState)(1),[K,Q]=(0,s.useState)(""),[Y,X]=(0,s.useState)(null),[ee,et]=(0,s.useState)(Date.now()),[ei,en]=(0,s.useState)(1),[er,es]=(0,s.useState)(!1),[ea,eo]=(0,s.useState)("Bridge"),[ec,el]=(0,s.useState)(!1),[ed,ep]=(0,s.useState)(!1),eh=(0,p.useRouter)(),eg=(0,l.Z)(U,{wait:500}),{addAction:ex}=(0,m.Z)("dapp"),{fail:eu,success:ef}=(0,f.Z)(),[em,eb]=(0,s.useState)(null),{routes:ew,loading:eC}=(0,S.Z)(em,ee),{balance:ev}=(0,x.Z)({currency:_,updater:1,isNative:R?.nativeCurrency.symbol===_?.symbol,isPure:!1}),{isSupported:ej}=(0,Z.Bq)({fromChain:R,fromToken:_,toChain:P});return(0,s.useEffect)(()=>{if(!R||!P||!_||!O||!$||!eg||0>=Number(eg)||R===P&&_===O)return;Q(""),X(null);let e=Date.now();et(e),eb({fromChainId:R?.chainId.toString(),toChainId:P?.chainId.toString(),fromToken:{address:_?.address,symbol:_?.symbol,decimals:_?.decimals},toToken:{address:O?.address,symbol:O?.symbol,decimals:O?.decimals},fromAddress:$,destAddress:$,amount:new d.default(eg).mul(10**_?.decimals),identification:e,exclude:["official"]})},[R,P,_,O,$,eg]),(0,s.useEffect)(()=>{if(!R||!P||!_||!O||!$||!eg||0>=Number(eg)){es(!0),eo("Bridge");return}if(ev&&Number(eg)>Number(ev)){es(!0),eo("Insufficient balance");return}if(!ew?.length){es(!0),eo("No route");return}es(!1),eo("Bridge")},[R,P,_,O,$,eg,ev,ew]),(0,s.useEffect)(()=>{if(Y&&O){let e=new d.default(Y.receiveAmount).div(10**O.decimals).toNumber();Q((0,b.Pn)(e))}else Q("")},[Y,O]),(0,s.useEffect)(()=>{if(eh?.query){let{fromChainId:t,toChainId:i,fromToken:n,toToken:r}=eh.query;if(t){let i=e.filter(e=>e.chainId===Number(t));if(i&&i.length&&F(i[0]),n){let e=h.Z[Number(t)],i=e.filter(e=>e.symbol===n);i&&i.length&&q(i[0])}}if(i){let t=e.filter(e=>e.chainId===Number(i));if(t&&t.length&&V(t[0]),r){let e=h.Z[Number(i)],t=e.filter(e=>e.symbol===r);t&&t.length&&H(t[0])}}}},[e,eh]),(0,r.jsxs)(L,{children:[r.jsx(C.Z,{title:"Super Bridge",subTitle:"Transfer assets between Ethereum and EVM L2s.",renderAction:()=>r.jsx(E,{onClick:()=>{n(!0)},children:r.jsx("svg",{width:"16",height:"18",viewBox:"0 0 16 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M7.17184 0.222355C7.42364 0.0766877 7.70926 0 8 0C8.29074 0 8.57637 0.0766877 8.82816 0.222355L15.1718 3.89274C15.4236 4.03841 15.6327 4.24792 15.7781 4.50021C15.9235 4.75251 16 5.0387 16 5.33003V12.67C16 12.9613 15.9235 13.2475 15.7781 13.4998C15.6327 13.7521 15.4236 13.9616 15.1718 14.1073L8.82816 17.7776C8.57637 17.9233 8.29074 18 8 18C7.70926 18 7.42364 17.9233 7.17184 17.7776L0.828158 14.1073C0.576372 13.9616 0.367286 13.7521 0.221915 13.4998C0.0765431 13.2475 7.38473e-06 12.9613 0 12.67V5.33003C7.38473e-06 5.0387 0.0765431 4.75251 0.221915 4.50021C0.367286 4.24792 0.576372 4.03841 0.828158 3.89274L7.17184 0.222355ZM8 1.65964L1.65632 5.33003V12.67L8 16.3404L14.3437 12.67V5.33003L8 1.65964ZM8 5.68064C8.87856 5.68064 9.72115 6.03035 10.3424 6.65286C10.9636 7.27536 11.3126 8.11965 11.3126 9C11.3126 9.88035 10.9636 10.7246 10.3424 11.3471C9.72115 11.9696 8.87856 12.3194 8 12.3194C7.12144 12.3194 6.27886 11.9696 5.65762 11.3471C5.03638 10.7246 4.68737 9.88035 4.68737 9C4.68737 8.11965 5.03638 7.27536 5.65762 6.65286C6.27886 6.03035 7.12144 5.68064 8 5.68064ZM8 7.34032C7.78249 7.34032 7.56711 7.38325 7.36616 7.46665C7.1652 7.55006 6.98261 7.67231 6.82881 7.82643C6.67501 7.98054 6.553 8.16351 6.46977 8.36487C6.38653 8.56623 6.34369 8.78205 6.34369 9C6.34369 9.21795 6.38653 9.43377 6.46977 9.63513C6.553 9.8365 6.67501 10.0195 6.82881 10.1736C6.98261 10.3277 7.1652 10.4499 7.36616 10.5333C7.56711 10.6168 7.78249 10.6597 8 10.6597C8.43928 10.6597 8.86057 10.4848 9.17119 10.1736C9.48181 9.86232 9.65631 9.44018 9.65631 9C9.65631 8.55983 9.48181 8.13768 9.17119 7.82643C8.86057 7.51518 8.43928 7.34032 8 7.34032Z",fill:"#979ABE"})})})}),r.jsx(w.Z,{onChainChange:e=>{F(e)},onTokenChange:e=>{q(e)},onAmountChange:e=>{G(e)},updateBanlance:J,currentChain:R,currentToken:_,chainToken:h.Z,title:"From",needGas:!1,amount:U,address:(0,b.y9)($),chainList:e}),r.jsx(z,{onClick:()=>{let[e,t]=[R,P],[i,n]=[_,O];F(t),V(e),q(n),H(i)},children:r.jsx("div",{className:"arrow",children:r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6",stroke:"white","stroke-width":"2","stroke-linecap":"round"})})})}),r.jsx(w.Z,{onChainChange:e=>{V(e)},onTokenChange:e=>{H(e)},inputDisabled:!0,updateBanlance:J,needGas:ej,currentChain:P,currentToken:O,chainToken:h.Z,amount:K,onGasTrigger:()=>{el(!0)},title:"To",address:(0,b.y9)($),chainList:e}),O&&ew?.length&&r.jsx(v.Z,{fromChain:R,routeSortType:ei,onRouteSelected:e=>{X(e)},toToken:O,routes:ew}),r.jsx(B,{height:20}),r.jsx(j.Z,{isLoading:eC,text:ea,fromChain:R,onClick:()=>{Y&&o(!0)},disabled:er}),i&&r.jsx(y.Z,{onSortTypeChange:e=>{en(e)},routeSortType:ei,onClose:()=>{n(!1)}}),a&&r.jsx(k.Z,{fromChain:R,toChain:P,fromToken:_,toToken:O,amount:eg,reciveAmount:K,toAddress:$,route:Y,onClose:()=>{o(!1)},isLoading:ed,onClick:async()=>{if(Y&&!ed){ep(!0);try{let e=await (0,c.execute)(Y,M?.getSigner());if(!e)return;let i={hash:e,link:(0,c.getChainScan)(R.chainId),duration:Y.duration,fromChainId:R.chainId,fromChainName:R.chainName,fromChainLogo:R.icon,fromTokenLogo:_?.icon,fromAmount:eg,fromTokenSymbol:_?.symbol,toChainId:P.chainId,toChainName:P.chainName,toChainLogo:P.icon,toTokenLogo:O?.icon,toAmout:K,toTokenSymbol:O?.symbol,time:Date.now(),tool:Y.bridgeName,bridgeType:Y.bridgeType,fromAddress:$,toAddress:$,status:3};(0,g.jh)(i),ex({type:"Bridge",fromChainId:R.chainId,toChainId:P.chainId,token:_,amount:eg,template:"super bridge",add:!1,status:1,transactionHash:e,extra_data:i}),ef({title:"Transaction success",text:""}),A(!0),o(!1),W(J+1),t&&t()}catch(e){console.log(e.title,e.message,e),eu({title:"Transaction failed",text:(0,b.Id)(e)})}ep(!1)}}}),T&&r.jsx(N.Z,{fromChain:R,toChain:P,fromToken:_,toToken:O,amount:eg,reciveAmount:K,toAddress:$,route:Y,onClose:()=>{A(!1)},onTransactionClick:()=>{},isLoading:ed,onClick:async()=>{A(!1)}}),ec&&r.jsx(I.Z,{fromChain:R,fromToken:_,toChain:P,toAddress:$,maxBalance:ev,onClick:()=>{console.log(11)},onClose:()=>{el(!1)}})]})}n()}catch(e){n(e)}})},75380:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>m});var r=i(20997),s=i(57518),a=i.n(s),o=i(63043),c=i(8433),l=i(37346),d=i(21004),p=i(19217),h=i(41953),g=i(8389),x=i(16689),u=i(97626),f=e([c,l,d,p,h,u,o]);[c,l,d,p,h,u,o]=f.then?(await f)():f;let b=a().div.withConfig({componentId:"sc-2464a9b1-0"})`
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: rgba(255, 255, 255, 1);
    margin-top: 20px;
`,w=a().div.withConfig({componentId:"sc-2464a9b1-1"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    .refuel-title {

    }
    .transter-detail {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`,Range=a().input.withConfig({componentId:"sc-2464a9b1-2"})`
    width: 100%;
    -webkit-appearance: none; /* 去掉底部的 track 默认样式，就是整个灰条 */
    background: transparent; 
    &::-webkit-slider-thumb {
        /* -webkit-appearance: none; */
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 2px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: rgba(235, 244, 121, 1);
        cursor: pointer;
        margin-top: -4px; 
    }
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;
        box-shadow: none;
        background: #3071a9;
        border-radius: 8px;
        border: none;
        background: linear-gradient(to right, 
            rgba(235, 244, 121, 1) 0%, 
            rgba(235, 244, 121, 1) ${({max:e,value:t})=>t/e*100+"%"},
            #eee ${({max:e,value:t})=>t/e*100+"%"}, #eee); 
    }
    
`;a().div.withConfig({componentId:"sc-2464a9b1-3"})`
    height: 60px;
    line-height: 60px;
    background-color: rgba(235, 244, 121, 1);
    border-radius: 10px;
    text-align: center;
    color: rgba(55, 58, 83, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    margin-top: 10px;
    &.disbaled {
        opacity: .3;
        cursor: default;
    }
`;let C=a().div.withConfig({componentId:"sc-2464a9b1-4"})`
    height: 20px;
`,v=a().input.withConfig({componentId:"sc-2464a9b1-5"})`
    width: 100px;
    height: 35px;
    background-color: rgba(27, 30, 39, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    color: #fff;
    padding: 0 10px;
`;function m({onClick:e,onClose:t,fromChain:i,fromToken:n,toAddress:s,toChain:a,maxBalance:f}){let{account:m,chainId:j,provider:y}=(0,c.Z)(),k=(0,l.O)(e=>e.price),[N,I]=(0,x.useState)("0"),[S,Z]=(0,x.useState)(0),[T,A]=(0,x.useState)(1),[L,E]=(0,x.useState)(200),[B,z]=(0,x.useState)(!1),$=(0,o.Z)(N,{wait:100}),{receive:D,deposit:M,isLoading:R}=(0,p.Wr)({fromChain:i,toChain:a,fromToken:n,value:$}),F=(0,x.useCallback)(async()=>{if(n){let e=new u.default($).mul(10**n?.decimals).toString();await M(n.address,m,e,y?.getSigner()),t()}},[n,i,$]);return(0,x.useEffect)(()=>{if(k&&n&&k[n.symbol]){let e=200/Number(k[n.symbol]),t=e/200;E(e),Z(t),A(t)}},[k,n]),(0,x.useEffect)(()=>{if("0"===D||!f||Number($)>=Number(f)){z(!0);return}z(!1)},[D,f,$]),(0,r.jsxs)(g.Z,{title:"Refuel Gas Token",onClose:()=>{R||t()},children:[(0,r.jsxs)(b,{children:["Transfer ",n?.symbol," for ",a?.nativeCurrency.symbol," to cover gas fee on Base."]}),(0,r.jsxs)(w,{children:[r.jsx("div",{children:"Refuel Amount:"}),(0,r.jsxs)("div",{className:"transter-detail",children:[r.jsx(v,{value:N,onChange:e=>{Number(e.target.value)>Number(L)?I(L.toString()):I(e.target.value)}}),n?.symbol,r.jsx("svg",{width:"8",height:"10",viewBox:"0 0 8 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z",fill:"#979ABE"})}),(0,r.jsxs)("div",{children:[(0,d._2)(D)," ",a?.nativeCurrency.symbol]})]})]}),r.jsx(C,{}),r.jsx(Range,{type:"range",onChange:e=>{I(e.target.value)},min:S,max:L,step:T,value:N,className:"custom-slider"}),r.jsx(C,{}),r.jsx(h.Z,{isLoading:R,disabled:B,text:"Confirm",fromChain:i,onClick:F,defaultText:"Confirm"})]})}n()}catch(e){n(e)}})},58616:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(20997),r=i(16689);function s({src:e,cls:t}){let i=(0,r.useRef)(),s=(0,r.useRef)(0);return n.jsx("img",{ref:i,src:e,className:t,onError:t=>{s.current>=3||(i.current.src=e,s.current+=1)}})}},43909:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>h});var r=i(20997),s=i(57518),a=i.n(s),o=i(21004),c=i(37346),l=i(63658),d=i(58616),p=e([o,c]);[o,c]=p.then?(await p)():p;let g=a().div.withConfig({componentId:"sc-62c87498-0"})`
    display: flex;
    height: 54px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;
    &:hover, &.active{
        background-color: rgba(151, 154, 190, .1);
    }
    .left {
        display: flex;
        align-items: center;
        
        .img-wapper {
            position: relative;
            width: 26px;
            height: 26px;
            .token-icon {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
            .chain-icon {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 10px;
                height: 10px;
            }
        }
        .token-name {
            font-size: 14px;
            font-weight: 600;
            line-height: 16.8px;
            margin-left: 10px;
        }
    }
    .right {
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: #fff;
        text-align: right;
        .r-price {
            color: rgba(151, 154, 190, 1);
            margin-top: 3px;
        }
    }
`;function h({token:e,chain:t,isSelected:i,loading:n,balances:s,onTokenChange:a}){let p=(0,c.O)(e=>e.price),h=e.isNative?"native":e.address;return(0,r.jsxs)(g,{className:i?"active":"",onClick:()=>{a(e)},children:[(0,r.jsxs)("div",{className:"left",children:[(0,r.jsxs)("div",{className:"img-wapper",children:[r.jsx(d.Z,{cls:"token-icon",src:e.icon}),r.jsx(d.Z,{cls:"chain-icon",src:t.icon})]}),r.jsx("div",{className:"token-name",children:e.symbol})]}),r.jsx("div",{className:"right",children:n?r.jsx(l.Z,{size:12}):(0,r.jsxs)("div",{children:[r.jsx("div",{children:(0,o._2)(s[h])}),(0,r.jsxs)("div",{className:"r-price",children:["$",(0,o._2)(Number(p[e.symbol])*s[h],2)]})]})})]})}n()}catch(e){n(e)}})},73425:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>j});var r=i(20997),s=i(16689),a=i(57518),o=i.n(a),c=i(63043),l=i(25089),d=i(58616),p=i(8389),h=i(43909),g=e([l,h,c]);[l,h,c]=g.then?(await g)():g;let x=o().div.withConfig({componentId:"sc-d0dcd460-0"})`
    display: flex;
    max-height: 500px;
`,u=o().div.withConfig({componentId:"sc-d0dcd460-1"})`
    width: 85px;
    border-right: 1px solid rgba(55, 58, 83, 1);
    padding: 20px 0 20px 0;
    max-height: 100%;
    min-height: 100px;
    
    .chain-tip {
        position: absolute;
        left: 0;
        top: 0;
        height: 50px;
        line-height: 50px;
        left: 70px;
        display: flex;
        align-items: center;
        z-index: 12;
        background-color: rgba(49, 51, 70, 1);
        border-radius: 0 12px 12px 0;
        border: 1px solid rgba(55, 58, 83, 1);
        border-left: 0;
        padding: 0 17px 0 10px;
        box-shadow: 10px 0px 15px 2px rgba(0, 0, 0, .3);
    }

    .chain-list {
        height: calc(100% - 20px);
        overflow-y: auto;
        padding-left: 20px;
        /* overflow-x: hidden; */
        margin-top: 5px;
        .chain {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            border: 1px solid rgba(55, 58, 83, 1);
            cursor: pointer;
            margin-top: 8px;
            position: relative;
            .img {
                width: 32px;
                height: 32px;
                margin: 9px 0 0 9px;
            }
            &.active {
                border: 1px solid rgba(252, 196, 44, 1);
                background-color: rgba(252, 196, 44, 0.1);
            }
            .detail {
                display: none;
            }
            &:hover {
               /* .detail {
                    display: block;
                    height: 100%;
                    line-height: 50px;
                    background-color: red;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 500px;
               } */
               background-color: rgba(49, 51, 70, 1);
               
               border-radius: 12px 0 0 12px;
               border: 1px solid rgba(55, 58, 83, 1);
               border-right: 0;
               box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, .3);
            }
        }
    }
    
`,f=o().div.withConfig({componentId:"sc-d0dcd460-2"})`
    flex: 1;
    .ctg-wapper {
        height: calc(100% - 120px);
        overflow: auto;
    }
    
`,m=o().div.withConfig({componentId:"sc-d0dcd460-3"})`
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    color: rgba(255, 255, 255, 1);
`,b=o().div.withConfig({componentId:"sc-d0dcd460-4"})`
    padding: 20px;
    .input-wapper {
        height: 36px;
        display: flex;
        align-items: center;
        border: 1px solid rgba(55, 58, 83, 1);
        border-radius: 8px;
        background-color: rgba(27, 30, 39, 1);
        padding: 0 10px;
        margin-top: 10px;
        .icon {

        }
        .input {
            color: #fff;
            flex: 1;
            margin-left: 5px;
            font-size: 14px;
            &::placeholder {
                color: rgba(255, 255, 255, .2);
            }
        }
    }
`,w=o().div.withConfig({componentId:"sc-d0dcd460-5"})`
    /* height: calc(100% - 120px);
    overflow: auto; */
`,C=o().div.withConfig({componentId:"sc-d0dcd460-6"})`
    .cur-chian {
        display: flex;
        align-items: center;
        color: #fff;
        gap: 10px;
        font-size: 14px;
        font-weight: 600;
        padding-left: 20px;
        margin-top: 10px;
        &.cc-selected {
            justify-content: space-between;
            padding-right: 10px;
        }
        &.can-click-chain {
            cursor: pointer;
        }
        .img {
            width: 32px;
            height: 32px;
        }
        .chain-selected {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
    .ct-title {
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: rgba(151, 154, 190, 1);
        padding: 10px 20px;
    }
`,v=(0,s.forwardRef)(function({chain:e,chainToken:t,currentToken:i,groupId:n,searchTxt:s,filterChain:a,searchAll:o,onChainChange:c,onTokenChange:p,onClose:g,onTempChainChange:x},u){let f=o&&a&&a.length?a[0].chainId:e.chainId,m=o&&a&&a.length?a[0]:e,{loading:b,balances:v,currentChainId:j}=(0,l.Z)(t[f]);return(0,r.jsxs)(C,{children:[(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"ct-title",id:`${n}-${e.chainId}`,children:"Chain"}),(0,r.jsxs)("div",{className:"cur-chian cc-selected",style:{marginTop:0},children:[(0,r.jsxs)("div",{className:"chain-selected",children:[r.jsx(d.Z,{cls:"img",src:e.icon}),r.jsx("div",{children:e.chainName})]}),r.jsx("div",{style:{justifySelf:"end"},children:r.jsx("svg",{width:"13",height:"11",viewBox:"0 0 13 11",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M1 4.80952L4.78125 9L12 1",stroke:"#EBF479","stroke-width":"2","stroke-linecap":"round"})})})]}),a?.map(t=>{if(t.chainId!==e.chainId)return r.jsxs("div",{onClick:()=>{x(t)},className:"cur-chian can-click-chain",children:[r.jsx(d.Z,{cls:"img",src:t.icon}),r.jsx("div",{children:t.chainName})]},t.chainId)}),r.jsx("div",{className:"ct-title",style:{paddingBottom:0,paddingTop:20},children:"Token"})]}),r.jsx(w,{children:t[f]&&t[f].sort((e,t)=>{if(0===Object.keys(v).length)return 0;let i=e.isNative?"native":e.address,n=t.isNative?"native":t.address,r=Number(v[i]||0),s=Number(v[n]||0);return s-r}).map(e=>r.jsx(h.Z,{isSelected:i?.symbol===e.symbol&&!o,token:e,loading:b,balances:v,chain:m,onTokenChange:e=>{c(m),p(e),g&&g()}},e.symbol+e.address))},f)]})}),j=(0,s.memo)(function({onClose:e,chainList:t,chainToken:i,currentChain:n,currentToken:a,onChainChange:o,onTokenChange:l}){let[h,g]=(0,s.useState)(n),[w,C]=(0,s.useState)(""),[j,y]=(0,s.useState)([]),[k,N]=(0,s.useState)(null),[I,S]=(0,s.useState)(0),[Z,T]=(0,s.useState)(Date.now()+""),[A,L]=(0,s.useState)(),[E,B]=(0,s.useState)([]),[z,$]=(0,s.useState)(!1),D=(0,s.useRef)(),M=(0,c.Z)(w,{wait:500});return(0,s.useEffect)(()=>{if(t){let e=t.map(e=>e),i=e.splice(0,3),n=e.sort((e,t)=>e.chainName.localeCompare(t.chainName)),r=i.concat(n);y(r)}},[t]),(0,s.useEffect)(()=>{if(M){let e=M.trim().toLowerCase(),n={},[r,s]=e.split(":");if(r&&s){let e=t.filter(e=>e.chainName.toLowerCase().indexOf(r)>-1);e&&e.length&&e.forEach(t=>{let r=i[t.chainId],a=r.filter(e=>e.symbol.toLowerCase().indexOf(s)>-1||e.address.toLowerCase()===s);a&&a.length&&(n[t.chainId]=a,$(!0),B(e))})}else{let r=t.filter(t=>t.chainName.toLowerCase().indexOf(e)>-1);B(r),Object.keys(i).forEach(t=>{let r=i[t],s=r.filter(t=>t.symbol.toLowerCase().indexOf(e)>-1||t.address.toLowerCase()===e);s&&s.length>0&&(n[t]=s)}),$(!1)}L(n)}else L(i),B([]),$(!1)},[t,M,i]),(0,s.useEffect)(()=>{n&&Z&&setTimeout(()=>{let e=document.getElementById(`${Z}-${n.chainId}`);e&&e.scrollIntoView()},500)},[Z,n]),r.jsx(p.Z,{ref:D,paddingSize:0,onClose:e,children:(0,r.jsxs)(x,{children:[(0,r.jsxs)(u,{children:[r.jsx(m,{style:{paddingLeft:20},children:"Chain"}),k&&r.jsx("div",{style:{top:I},className:"chain-tip",children:r.jsx("div",{children:k.chainName})}),r.jsx("div",{className:"chain-list",onScroll:()=>{N(null)},children:j?.map(e=>r.jsx("div",{id:`${Z}-${e.chainId}-p`,onClick:()=>{g(e);let t=document.getElementById(`${Z}-${e.chainId}`);t&&t.scrollIntoView()},onMouseEnter:t=>{N(e);let i=t.target;"DIV"!==i.tagName.toUpperCase()&&(i=i.parentNode);let n=D.current.getBoundingClientRect(),r=i.getBoundingClientRect(),s=r.top-n.top;S(s-1)},onMouseLeave:()=>{N(null)},className:`chain ${h?.chainId===e.chainId?"active":""}`,children:r.jsx(d.Z,{cls:"img",src:e.icon})},e.chainId))})]}),(0,r.jsxs)(f,{children:[(0,r.jsxs)(b,{children:[r.jsx(m,{children:"Select a token"}),(0,r.jsxs)("div",{className:"input-wapper",children:[r.jsx("div",{className:"icon",children:(0,r.jsxs)("svg",{width:"21",height:"15",viewBox:"0 0 21 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("circle",{cx:"7.01829",cy:"7.01829",r:"6.01829",stroke:"#3D4159","stroke-width":"2"}),r.jsx("rect",{x:"14.9141",y:"9.64978",width:"6.141",height:"2.63186",rx:"1.31593",transform:"rotate(30 14.9141 9.64978)",fill:"#3D4159"})]})}),r.jsx("input",{onChange:e=>{C(e.target.value)},value:w,className:"input",placeholder:"e.g. ethereum:eth"})]})]}),r.jsx("div",{className:"ctg-wapper",children:j.map(t=>t.chainId!==h?.chainId?null:r.jsx(v,{chain:t,searchAll:z,chainToken:A,currentToken:a,groupId:Z,filterChain:E,onChainChange:o,onTempChainChange:e=>{g(e),setTimeout(()=>{let t=document.getElementById(`${Z}-${e.chainId}-p`);t&&t.scrollIntoView({behavior:"smooth"})},40),C("")},onTokenChange:l,onClose:e,searchTxt:M},t.chainId))})]})]})})});n()}catch(e){n(e)}})},76073:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>f});var r=i(20997),s=i(57518),a=i.n(s),o=i(16689),c=i(67618),l=i(42080),d=i(37346),p=i(21004),h=i(63658),g=i(56358),x=i(73425),u=e([c,l,d,p,x]);[c,l,d,p,x]=u.then?(await u)():u;let m=a().div.withConfig({componentId:"sc-33ece495-0"})`
    min-height: 145px;
    border-radius: 12px;
    border: 1px solid rgba(55, 58, 83, 1);
    transition: all .3s;
    /* background-color: ${e=>e?"rgba(46, 49, 66, 1)":"red"}; */
`,b=a().div.withConfig({componentId:"sc-33ece495-1"})`
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid rgba(55, 58, 83, 1);
`,w=a().div.withConfig({componentId:"sc-33ece495-2"})`
    display: flex;
    align-items: center;
`,C=a().div.withConfig({componentId:"sc-33ece495-3"})`
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    width: 30px;
`,v=a().div.withConfig({componentId:"sc-33ece495-4"})`
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(46, 49, 66, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    margin-left: 15px;
    gap: 10px;
    padding: 0 5px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        border: 1px solid rgba(235, 244, 121, .3);
    }
`,j=a().img.withConfig({componentId:"sc-33ece495-5"})`
    width: 22px;
    height: 22px;
`,y=a().div.withConfig({componentId:"sc-33ece495-6"})`
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    color: #fff;
`,k=a().div.withConfig({componentId:"sc-33ece495-7"})`
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: rgba(151, 154, 190, 1);
`,N=a().div.withConfig({componentId:"sc-33ece495-8"})`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 16px;
`,I=a().div.withConfig({componentId:"sc-33ece495-9"})`
    flex: 1;
`,S=a().input.withConfig({componentId:"sc-33ece495-10"})`
    width: 100%;
    display: block;
    color: rgba(255, 255, 255, 1);
    font-size: 26px;
    font-weight: 500;
    line-height: 31.2px;
    &::placeholder {
        color: rgba(151, 154, 190, 1);
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`,Z=a().div.withConfig({componentId:"sc-33ece495-11"})`
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    margin-top: 10px;
    padding-left: 3px;
`,T=a().div.withConfig({componentId:"sc-33ece495-12"})`
    
`,A=a().div.withConfig({componentId:"sc-33ece495-13"})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 10px;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid rgba(55, 58, 83, 1);
    background-color: rgba(46, 49, 66, 1);
    cursor: pointer;
    transition: all .3s;
    width: 160px;
    margin: 0 0 0 auto;
    &:hover {
        border: 1px solid rgba(235, 244, 121, .3);
    }
`,L=a().div.withConfig({componentId:"sc-33ece495-14"})`
    position: relative;
    width: 22px;
    height: 22px;
    .token {
       display: block;
       width: 100%;
       height: 100%;
       border-radius: 100%;
    }
    .chain {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
    }
`,E=a().div.withConfig({componentId:"sc-33ece495-15"})`
    color: #fff;
`,B=a().div.withConfig({componentId:"sc-33ece495-16"})`
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 10px;
`,z=a().div.withConfig({componentId:"sc-33ece495-17"})`
    border: 1px solid rgba(235, 244, 121, 1);
    border-radius: 1000px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(235, 244, 121, 1);
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    margin-right: 20px;
    padding: 5px 10px;
    cursor: pointer;
`,$=a().div.withConfig({componentId:"sc-33ece495-18"})`
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    text-align: right;
    
    .num {
        text-decoration: underline;
        cursor: pointer;
    }
`;function f({title:e,address:t,chainList:i,needGas:n=!1,updateBanlance:s=1,chainToken:a,currentChain:u,currentToken:f,amount:D,inputDisabled:M=!1,onChainChange:R,onTokenChange:F,onAmountChange:P,onGasTrigger:V}){let _=(0,d.O)(e=>e.price),[q,O]=(0,o.useState)(!1),[H,U]=(0,o.useState)(!1),{balance:G,loading:J}=(0,c.Z)({currency:f,updater:s,isNative:u?.nativeCurrency.symbol===f?.symbol,isPure:!1}),{value:W}=(0,l.Z)({prices:_,amount:D,symbol:f?.symbol});return(0,r.jsxs)(m,{style:{background:H?"rgba(27, 30, 39, 1)":"rgba(46, 49, 66, 1)"},children:[(0,r.jsxs)(b,{children:[(0,r.jsxs)(w,{children:[r.jsx(C,{children:e}),(0,r.jsxs)(v,{onClick:()=>{O(!0)},children:[r.jsx(j,{src:u?.icon},u?.icon),r.jsx(y,{children:u?.chainName}),r.jsx(g.K,{})]})]}),r.jsx(k,{children:t})]}),(0,r.jsxs)(N,{children:[(0,r.jsxs)(I,{children:[r.jsx(S,{value:D,onFocus:()=>{U(!0)},onBlur:()=>{U(!1)},onChange:e=>{P&&!M&&P(e.target.value)},type:"number",disabled:M,placeholder:"0"}),r.jsx(Z,{children:W})]}),(0,r.jsxs)(T,{children:[(0,r.jsxs)(A,{onClick:()=>{O(!0)},children:[f?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(L,{children:[r.jsx("img",{className:"token",src:f?.icon}),r.jsx("img",{className:"chain",src:u?.icon})]}),r.jsx(E,{children:f?.symbol})]}):r.jsx(r.Fragment,{children:"Select a Token"}),r.jsx(g.K,{})]}),(0,r.jsxs)(B,{children:[n&&(0,r.jsxs)(z,{onClick:()=>{V&&V()},children:[r.jsx("svg",{width:"11",height:"10",viewBox:"0 0 11 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M0.564103 9.16667V0.555556C0.564103 0.408213 0.623535 0.266905 0.729324 0.162718C0.835114 0.0585316 0.978596 0 1.12821 0H6.20513C6.35474 3.45334e-09 6.49822 0.0585316 6.60401 0.162718C6.7098 0.266905 6.76923 0.408213 6.76923 0.555556V5H7.89744C8.19666 5 8.48362 5.11706 8.6952 5.32544C8.90678 5.53381 9.02564 5.81643 9.02564 6.11111V8.61111C9.02566 8.75844 9.08511 8.89972 9.19089 9.00389C9.29668 9.10806 9.44015 9.16658 9.58974 9.16658C9.73934 9.16658 9.88281 9.10806 9.98859 9.00389C10.0944 8.89972 10.1538 8.75844 10.1538 8.61111V4.44444H9.02564C8.87603 4.44444 8.73255 4.38591 8.62676 4.28173C8.52097 4.17754 8.46154 4.03623 8.46154 3.88889V1.89667L7.84723 1.29167C7.8054 1.2505 7.77232 1.20153 7.74992 1.14763C7.72752 1.09372 7.71626 1.03596 7.71678 0.977723C7.71731 0.919483 7.72962 0.86193 7.75298 0.808427C7.77635 0.754924 7.81031 0.706543 7.85287 0.666111C7.94011 0.58322 8.05681 0.537223 8.17803 0.53795C8.29926 0.538677 8.41538 0.586069 8.50159 0.67L10.8347 2.94056C10.8872 2.99208 10.9288 3.0533 10.9572 3.1207C10.9855 3.18811 11.0001 3.26037 11 3.33333V8.61111C11 9.53167 10.3851 10 9.58974 10C8.79436 10 8.17949 9.53167 8.17949 8.61111V6.11111C8.17949 6.03744 8.14977 5.96679 8.09688 5.91469C8.04398 5.8626 7.97224 5.83333 7.89744 5.83333H6.76923V9.16667H6.91026C7.02246 9.16667 7.13008 9.21056 7.20942 9.2887C7.28876 9.36685 7.33333 9.47283 7.33333 9.58333C7.33333 9.69384 7.28876 9.79982 7.20942 9.87796C7.13008 9.9561 7.02246 10 6.91026 10H0.423077C0.31087 10 0.203259 9.9561 0.123916 9.87796C0.044574 9.79982 0 9.69384 0 9.58333C0 9.47283 0.044574 9.36685 0.123916 9.2887C0.203259 9.21056 0.31087 9.16667 0.423077 9.16667H0.564103ZM1.41026 1.11111V4.16667C1.41026 4.20315 1.41755 4.23927 1.43173 4.27297C1.4459 4.30667 1.46668 4.33729 1.49287 4.36308C1.51906 4.38888 1.55015 4.40934 1.58437 4.4233C1.61859 4.43726 1.65527 4.44444 1.69231 4.44444H5.64103C5.71583 4.44444 5.78757 4.41518 5.84047 4.36308C5.89336 4.31099 5.92308 4.24034 5.92308 4.16667V1.11111C5.92308 1.07463 5.91578 1.03851 5.90161 1.00481C5.88743 0.971109 5.86666 0.940486 5.84047 0.914692C5.81428 0.888898 5.78318 0.868438 5.74896 0.854478C5.71474 0.840518 5.67807 0.833333 5.64103 0.833333H1.69231C1.65527 0.833333 1.61859 0.840518 1.58437 0.854478C1.55015 0.868438 1.51906 0.888898 1.49287 0.914692C1.46668 0.940486 1.4459 0.971109 1.43173 1.00481C1.41755 1.03851 1.41026 1.07463 1.41026 1.11111Z",fill:"#EBF479"})}),r.jsx("span",{children:"Need Gas Token"})]}),(0,r.jsxs)($,{children:[r.jsx("span",{children:"balance: "}),J?r.jsx(h.Z,{size:12}):r.jsx("span",{className:"num",onClick:()=>{P&&!M&&G&&P(G)},children:(0,p._2)(G)})]})]})]})]}),q&&r.jsx(x.Z,{currentChain:u,currentToken:f,chainToken:a,chainList:i,onClose:()=>{O(!1)},onChainChange:R,onTokenChange:F})]})}n()}catch(e){n(e)}})},32412:(e,t,i)=>{i.d(t,{Z:()=>p});var n=i(20997),r=i(57518),s=i.n(r),a=i(55564),o=i(56358);let c=s().div.withConfig({componentId:"sc-dad1522-0"})`
    background: radial-gradient(108.37% 99.81% at 2.05% 4.07%, #5929A7 0%, #1E1B33 100%), radial-gradient(39.17% 39.17% at 29.3% 60.83%, #FFF500 0%, rgba(255, 245, 0, 0) 100%) ;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    padding: 20px;
    min-height: 270px;
    position: relative;
    overflow: hidden;
`,l=s().div.withConfig({componentId:"sc-dad1522-1"})`
    display: flex;
    height: 75px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    .img {
        width: 60px;
        height: 45px;
    }
    .title-wapper {
        margin-left: 10px;
        .title {
            font-size: 18px;
            font-weight: 700;
            line-height: 21.6px;
            color: #fff;
        }
        .sub-title {
            font-size: 16px;
            font-weight: 400;
            line-height: 19.2px;
            color: rgba(255, 255, 255, 0.6);
        }
    }
    .arrow {
        height: 70%;
        flex: 1;
        text-align: right;
    }
`,d=s().div.withConfig({componentId:"sc-dad1522-2"})`
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .2);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
`;function p(){return(0,n.jsxs)(c,{children:[n.jsx(a.Z,{title:"Medal",subTitle:"You might be interested colecting the medals."}),(0,n.jsxs)(l,{children:[n.jsx("img",{className:"img",src:"https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a"}),(0,n.jsxs)("div",{className:"title-wapper",children:[n.jsx("div",{className:"title",children:"Bridger Junior Medal"}),n.jsx("div",{className:"sub-title",children:"Bridge $10.23 valued assets to get."})]}),n.jsx("div",{className:"arrow",children:n.jsx(o.o,{})})]}),n.jsx(d,{children:"New function coming soon..."})]})}},8389:(e,t,i)=>{i.d(t,{Z:()=>h});var n=i(20997),r=i(16689),s=i(57518),a=i.n(s);let o=a().div.withConfig({componentId:"sc-66747a29-0"})`
    position: fixed;
    left: 0;
    right: 0;
    top: -100px;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 50;
`,c=a().div.withConfig({componentId:"sc-66747a29-1"})`
    position: absolute;
    left: 50%;
    top: 30%;
    z-index: 51;
    transform: translate(-50%, -50%);
    min-width: 468px;
    min-height: 100px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    background-color: rgba(38, 40, 54, 1);
    padding: ${({size:e=20})=>`${e}px`};
`,l=a().div.withConfig({componentId:"sc-66747a29-2"})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        font-size: 18px;
        font-weight: 700;
        line-height: 21.6px;
        color: #fff;
    }
`,d=a().div.withConfig({componentId:"sc-66747a29-3"})`
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 20px;
`,p=a().div.withConfig({componentId:"sc-66747a29-4"})`
    padding-top: ${({size:e=20})=>`${e}px`};
`,h=(0,r.forwardRef)(function({width:e=468,height:t,onClose:i,title:r,children:s,paddingSize:a=20,top:h="30%"},g){return(0,n.jsxs)("div",{children:[n.jsx(o,{onClick:()=>{i&&i()}}),(0,n.jsxs)(c,{ref:g,size:a,style:{top:h,width:e},children:[n.jsx(d,{onClick:()=>{i&&i()},children:n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z",fill:"#979ABE"})})}),r&&n.jsx(l,{children:n.jsx("div",{className:"title",children:r})}),n.jsx(p,{size:a,children:s})]})]})})},55788:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var r=i(20997),s=i(57518),a=i.n(s),o=i(97626),c=i(37346),l=i(21004),d=e([o,c,l]);[o,c,l]=d.then?(await d)():d;let h=a().div.withConfig({componentId:"sc-a0460d24-0"})`
    /* background-color: rgba(55, 58, 83, 1); */
    min-height: 78px;
    border-radius: 10px;
    border: ${({active:e})=>`2px solid ${e?"rgba(235, 244, 121, .3)":"rgba(55, 58, 83, 1)"}`} ;
    padding: 10px 16px;
    cursor: ${({canClick:e})=>`${e?"pointer":"default"}`} ;
    .name {
        color: ${({active:e})=>e?"#fff":"rgba(151, 154, 190, 1)"} ;
    }
`,g=a().div.withConfig({componentId:"sc-a0460d24-1"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bridge-names {
        display: flex;
        align-items: center;
        gap: 10px;
        .img {
            width: 30px;
            height: 30px;
            border-radius: 100%;
        }
        .name {
            font-size: 16px;
            font-weight: 500;
        }
    }
    .tags {
        display: flex;
        align-items: center;
        gap: 10px;
        .tag {
            font-size: 10px;
            font-weight: 400;
            border-radius: 4px;
            padding: 5px;
            &.fastest {
                color: rgba(123, 144, 255, 1);
                background-color: rgba(123, 144, 255, .2);
            }
            &.best-return {
                color: rgba(106, 255, 228, 1);
                background-color: rgba(106, 255, 228, .2);
            }
        }
    }
`,x=a().div.withConfig({componentId:"sc-a0460d24-2"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    .output {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        gap: 10px;
        .title {
            color: rgba(151, 154, 190, 1);
        }
        .token-icon {
            width: 22px;
            height: 22px;
        }
        .token-amount {
            color: rgba(255, 255, 255, 1);
        }
    }
    .cost-wapper {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: rgba(151, 154, 190, 1);
        gap: 10px;
    }

`;function p({showOutputTitle:e=!0,active:t=!1,onClick:i,route:n,best:s,fast:a,fromChain:d,toToken:p}){let u=(0,c.O)(e=>e.price);return(0,r.jsxs)(h,{active:t,canClick:i,onClick:()=>{i&&i()},children:[(0,r.jsxs)(g,{children:[(0,r.jsxs)("div",{className:"bridge-names",children:[r.jsx("img",{className:"img",src:n.icon},n.icon),(0,r.jsxs)("div",{className:"name",children:[n.bridgeType,": ",n.bridgeName]})]}),(0,r.jsxs)("div",{className:"tags",children:[s===n&&r.jsx("div",{className:"tag best-return",children:"Cheapest"}),a===n&&r.jsx("div",{className:"tag fastest",children:"Fastest"})]})]}),(0,r.jsxs)(x,{children:[(0,r.jsxs)("div",{className:"output",children:[e&&r.jsx("div",{className:"title",children:"Est. output"}),r.jsx("img",{className:"token-icon",src:p.icon}),(0,r.jsxs)("div",{className:"token-amount",children:["~",(0,l._2)(n.receiveAmount?new o.default(n.receiveAmount).div(10**p.decimals).toString():"")]})]}),r.jsx("div",{className:"cost-wapper",children:(0,r.jsxs)("div",{children:["~",n.duration," min｜Fee $",(0,l._2)(1===n.feeType?u[d.nativeCurrency.symbol]*Number(n.fee):n.fee)]})})]})]})}n()}catch(e){n(e)}})},55830:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>d});var r=i(20997),s=i(57518),a=i.n(s),o=i(8389),c=i(55788),l=e([c]);c=(l.then?(await l)():l)[0];let p=a().div.withConfig({componentId:"sc-a395ef7-0"})`
    &>:not(:first-child) {
        margin-top: 10px;
    }
    height: 500px;
    overflow-y: auto;
`;function d({onClose:e,fromChain:t,routes:i,toToken:n,best:s,fast:a,routeSelected:l,onRouteSelected:d}){return r.jsx(o.Z,{title:"Bridge Route",top:"40%",onClose:e,children:r.jsx(p,{children:i?.map((e,i)=>r.jsx(c.Z,{fromChain:t,route:e,fast:a,best:s,active:l===e,toToken:n,onClick:()=>{d(e)},showOutputTitle:!1},e.bridgeType+i))})})}n()}catch(e){n(e)}})},16420:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>h});var r=i(20997),s=i(16689),a=i(57518),o=i.n(a),c=i(56358),l=i(55788),d=i(55830),p=e([l,d]);[l,d]=p.then?(await p)():p;let g=o().div.withConfig({componentId:"sc-a491980f-0"})`
    margin-top: 20px;
`,x=o().div.withConfig({componentId:"sc-a491980f-1"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        color: #fff;
    }
    .arrow {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        .route-num {
            color: rgba(151, 154, 190, 1);
            font-size: 14px;
            font-weight: 400;
            line-height: 16.8px;
            text-decoration: underline;
        }
    }
`,u=o().div.withConfig({componentId:"sc-a491980f-2"})`
    margin-top: 16px;
`;function h({routes:e,toToken:t,routeSortType:i,fromChain:n,onRouteSelected:a}){let[o,p]=(0,s.useState)(!1),[h,f]=(0,s.useState)(null),[m,b]=(0,s.useState)(null),[w,C]=(0,s.useState)(null),[v,j]=(0,s.useState)([]);return(0,s.useEffect)(()=>{let t=null,n=null;e&&e.length&&(t=e[0],n=e[0],e.forEach(e=>{Number(e.receiveAmount)>Number(t?.receiveAmount)&&(t=e),Number(e.duration)<Number(n?.duration)&&(n=e)})),b(t),C(n),1===i?(f(t),a(t)):2===i&&(f(n),a(n)),e&&0!==e.length||(f(null),a(null))},[e,i]),(0,s.useEffect)(()=>{e?(1===i?e.sort((e,t)=>Number(t.receiveAmount)-Number(e.receiveAmount)):e.sort((e,t)=>Number(e.duration)-Number(t.duration)),j(e)):j(null)},[e,i]),(0,r.jsxs)(g,{children:[(0,r.jsxs)(x,{children:[r.jsx("div",{className:"title",children:"Select Bridge Route"}),(0,r.jsxs)("div",{className:"arrow",onClick:()=>{p(!0)},children:[(0,r.jsxs)("span",{className:"route-num",children:[e?.length," Routes"]}),r.jsx(c.o,{})]})]}),r.jsx(u,{}),h&&r.jsx(l.Z,{onClick:()=>{p(!0)},fromChain:n,best:m,fast:w,toToken:t,route:h,active:!0}),o&&r.jsx(d.Z,{best:m,fast:w,toToken:t,routeSelected:h,routes:v,fromChain:n,onClose:()=>{p(!1)},onRouteSelected:e=>{f(e),a(e)}})]})}n()}catch(e){n(e)}})},40358:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>h});var r=i(20997),s=i(57518),a=i.n(s),o=i(37346),c=i(21004),l=i(63658),d=i(8389),p=e([o,c]);[o,c]=p.then?(await p)():p;let g=a().div.withConfig({componentId:"sc-b108bf64-0"})`
    background-color: rgba(55, 58, 83, 0.5);
    border-radius: 10px;
    color: #fff;
    border: 1px solid rgba(55, 58, 83, 1);
    padding: 20px;
    margin-top: 10px;
`,x=a().div.withConfig({componentId:"sc-b108bf64-1"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .chain-token {
        .chain {
            font-size: 16px;
            font-weight: 400;
            line-height: 19.2px;
        }
        .token {
            display: flex;
            align-items: center;
            margin-top: 5px;
            gap: 10px;
            .icon-wapper {
                position: relative;
                width: 22px;
                height: 22px;
                .token-img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
                .chain-img {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 10px;
                    height: 10px;
                }
            }
            .amount {
                font-size: 16px;
                font-weight: 500;
                line-height: 19.2px;
            }
        }
    }
`,u=a().div.withConfig({componentId:"sc-b108bf64-2"})`
    .title {
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        color: #fff;
    }
    .address {
        font-size: 14px;
        font-weight: 500;
        line-height: 16.8px;
        color: rgba(151, 154, 190, 1);
        margin-top: 10px;
    }
`,f=a().div.withConfig({componentId:"sc-b108bf64-3"})`
    .fee-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &:not(:first-child) {
        margin-top: 5px;
    }
`,m=a().div.withConfig({componentId:"sc-b108bf64-4"})`
    height: 60px;
    line-height: 60px;
    background-color: rgba(235, 244, 121, 1);
    border-radius: 10px;
    text-align: center;
    color: rgba(55, 58, 83, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    margin-top: 10px;
    &.disbaled {
        opacity: .3;
        cursor: default;
    }
`;function h({onClick:e,onClose:t,fromChain:i,toChain:n,fromToken:s,toToken:a,amount:p,toAddress:h,route:b,reciveAmount:w,isLoading:C}){let v=(0,o.O)(e=>e.price);return(0,r.jsxs)(d.Z,{title:"Confirm Transaction",onClose:()=>{C||t()},children:[r.jsx(g,{children:(0,r.jsxs)(x,{children:[(0,r.jsxs)("div",{className:"chain-token",children:[r.jsx("div",{className:"chain",children:i?.chainName}),(0,r.jsxs)("div",{className:"token",children:[(0,r.jsxs)("div",{className:"icon-wapper",children:[r.jsx("img",{className:"token-img",src:s?.icon}),r.jsx("img",{className:"chain-img",src:i?.icon})]}),(0,r.jsxs)("div",{className:"amount",children:[p&&(0,c._2)(p)," ",s?.symbol]})]})]}),r.jsx("div",{children:r.jsx("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M11.8536 4.35355C12.0488 4.15829 12.0488 3.84171 11.8536 3.64645L8.67157 0.464466C8.47631 0.269204 8.15973 0.269204 7.96447 0.464466C7.7692 0.659728 7.7692 0.976311 7.96447 1.17157L10.7929 4L7.96447 6.82843C7.7692 7.02369 7.7692 7.34027 7.96447 7.53553C8.15973 7.7308 8.47631 7.7308 8.67157 7.53553L11.8536 4.35355ZM0 4.5H11.5V3.5H0V4.5Z",fill:"white"})})}),(0,r.jsxs)("div",{className:"chain-token",children:[r.jsx("div",{className:"chain",children:n?.chainName}),(0,r.jsxs)("div",{className:"token",children:[(0,r.jsxs)("div",{className:"icon-wapper",children:[r.jsx("img",{className:"token-img",src:a?.icon}),r.jsx("img",{className:"chain-img",src:n?.icon})]}),(0,r.jsxs)("div",{className:"amount",children:[w&&(0,c._2)(w)," ",a?.symbol]})]})]})]})}),r.jsx(g,{children:(0,r.jsxs)(u,{children:[r.jsx("div",{className:"title",children:"Recipient Address"}),r.jsx("div",{className:"address",children:h})]})}),(0,r.jsxs)(g,{children:[r.jsx(f,{children:(0,r.jsxs)("div",{className:"fee-line",children:[r.jsx("div",{children:"Bridge Fee"}),(0,r.jsxs)("div",{children:["$",b&&i&&(0,c._2)(b?.feeType===1?v[i?.nativeCurrency.symbol]*Number(b.fee):b?.fee)]})]})}),r.jsx(f,{children:(0,r.jsxs)("div",{className:"fee-line",children:[r.jsx("div",{children:"Gas Fee"}),(0,r.jsxs)("div",{children:["$",b&&i&&(0,c._2)(b?.gasType===1?v[i?.nativeCurrency.symbol]*Number(b.gas):b?.gas)]})]})})]}),C?(0,r.jsxs)(m,{disabled:!0,children:[" ",r.jsx(l.Z,{size:20})," Sending"]}):r.jsx(m,{onClick:e,children:"Confirm"})]})}n()}catch(e){n(e)}})},71838:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>h});var r=i(20997),s=i(57518),a=i.n(s),o=i(11163),c=i(37346),l=i(21004),d=i(8389),p=e([c,l]);[c,l]=p.then?(await p)():p;let g=a().div.withConfig({componentId:"sc-52e31ed0-0"})`
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
    padding-top: 60px;
    text-align: center;
`,x=a().div.withConfig({componentId:"sc-52e31ed0-1"})`
    font-size: 16px;
    font-weight: 300;
    line-height: 19.2px;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`,u=a().div.withConfig({componentId:"sc-52e31ed0-2"})`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: center;
    margin-top: 25px;
    color: rgba(151, 154, 190, 1);
    .transactions {
        color: rgba(235, 244, 121, 1);
        cursor: pointer;
    }
`,f=a().div.withConfig({componentId:"sc-52e31ed0-3"})`
    height: 60px;
    line-height: 60px;
    background-color: rgba(235, 244, 121, 1);
    border-radius: 10px;
    text-align: center;
    color: rgba(55, 58, 83, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    margin-top: 40px;
    &.disbaled {
        opacity: .3;
        cursor: default;
    }
`;function h({onClick:e,onClose:t,fromChain:i,toChain:n,fromToken:s,toToken:a,amount:p,toAddress:h,route:m,reciveAmount:b,isLoading:w,onTransactionClick:C}){(0,c.O)(e=>e.price);let v=(0,o.useRouter)();return(0,r.jsxs)(d.Z,{onClose:()=>{t()},children:[r.jsx(g,{children:"Bridged Successfully!"}),(0,r.jsxs)(x,{children:[(0,r.jsxs)("div",{children:[(0,l._2)(p)," ",s?.symbol," on ",i?.chainName]}),r.jsx("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M11.8536 4.35355C12.0488 4.15829 12.0488 3.84171 11.8536 3.64645L8.67157 0.464466C8.47631 0.269204 8.15973 0.269204 7.96447 0.464466C7.7692 0.659728 7.7692 0.976311 7.96447 1.17157L10.7929 4L7.96447 6.82843C7.7692 7.02369 7.7692 7.34027 7.96447 7.53553C8.15973 7.7308 8.47631 7.7308 8.67157 7.53553L11.8536 4.35355ZM0 4.5H11.5V3.5H0V4.5Z",fill:"white"})}),(0,r.jsxs)("div",{children:[(0,l._2)(b)," ",a?.symbol," on ",n?.chainName]})]}),(0,r.jsxs)(u,{children:["Transaction completed. You can view it on ",r.jsx("span",{className:"transactions",onClick:()=>{v.push("/super-bridge/transaction")},children:"My Transactions "}),"page."]}),r.jsx(f,{onClick:e,children:"+ New Transfer"})]})}n()}catch(e){n(e)}})},41953:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>h});var r=i(20997),s=i(57518),a=i.n(s),o=i(17479),c=i(8433),l=i(63658),d=i(1718),p=e([o,c,d]);[o,c,d]=p.then?(await p)():p;let g=a().div.withConfig({componentId:"sc-1915e5a-0"})`
    height: 60px;
    line-height: 60px;
    background-color: rgba(235, 244, 121, 1);
    border-radius: 10px;
    text-align: center;
    color: rgba(55, 58, 83, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    &.disbaled {
        opacity: .3;
        cursor: default;
    }
`;function h({isLoading:e,disabled:t,onClick:i,text:n,fromChain:s,defaultText:a="Bridge"}){let{onConnect:p}=(0,o.Z)(),{account:h,chainId:x,provider:u}=(0,c.Z)(),[{settingChain:f,connectedChain:m},b]=(0,d.useSetChain)();return h?e?(0,r.jsxs)(g,{children:[r.jsx(l.Z,{size:16})," ",a]}):t?r.jsx(g,{className:"disbaled",children:n}):x!==s?.chainId?r.jsx(g,{onClick:()=>{b({chainId:`0x${s?.chainId?.toString(16)}`})},children:"Switch Chain"}):r.jsx(g,{onClick:i,children:a}):r.jsx(g,{onClick:()=>{p()},children:"Connect Wallet"})}n()}catch(e){n(e)}})},42080:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>o});var r=i(16689),s=i(21004),a=e([s]);function o({prices:e,amount:t,symbol:i}){let[n,a]=(0,r.useState)("$~");return(0,r.useEffect)(()=>{if(e&&t&&i&&e[i]){let n=Number(t)*Number(e[i]);a(`$${(0,s._2)(n,2)}`)}else a("$~")},[e,t,i]),{value:n}}s=(a.then?(await a)():a)[0],n()}catch(e){n(e)}})},83781:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>c});var r=i(16689),s=i(37478),a=i(8433),o=e([a]);function c(e,t){let[i,n]=(0,r.useState)(null),[o,c]=(0,r.useState)(!1),{chainId:l,provider:d}=(0,a.Z)(),p=(0,r.useRef)(t);async function h(){if(!e){n(null);return}c(!0),n(null);let t=[],i=!1;setTimeout(()=>{i||(i=!0,c(!1))},3e4);let r=await (0,s.getQuote)(e,d?.getSigner(),function(e){i||e.identification!==p.current||(t.push(e),n([...t]))});r&&r.length&&r[0].identification===p.current&&n(r),c(!1)}return(0,r.useEffect)(()=>{h()},[e]),(0,r.useEffect)(()=>{p.current=t},[t]),{routes:i,loading:o}}a=(o.then?(await o)():o)[0],n()}catch(e){n(e)}})},71982:e=>{e.exports=require("ethers")},93908:e=>{e.exports=require("lodash/debounce")},11341:e=>{e.exports=require("lodash/maxBy")},62785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},40968:e=>{e.exports=require("next/head")},16689:e=>{e.exports=require("react")},66405:e=>{e.exports=require("react-dom")},6175:e=>{e.exports=require("react-singleton-hook")},20997:e=>{e.exports=require("react/jsx-runtime")},57518:e=>{e.exports=require("styled-components")},37478:e=>{e.exports=require("super-bridge-sdk")},74924:e=>{e.exports=import("@web3-onboard/bitget")},79363:e=>{e.exports=import("@web3-onboard/injected-wallets")},1718:e=>{e.exports=import("@web3-onboard/react")},75907:e=>{e.exports=import("@web3-onboard/walletconnect")},97626:e=>{e.exports=import("big.js")},66197:e=>{e.exports=import("framer-motion")},54275:e=>{e.exports=import("react-loading-skeleton")},3590:e=>{e.exports=import("react-toastify")},72184:e=>{e.exports=import("swiper/modules")},53015:e=>{e.exports=import("swiper/react")},71395:e=>{e.exports=import("tslib")},46555:e=>{e.exports=import("uuid")},69890:e=>{e.exports=import("zustand")},43602:e=>{e.exports=import("zustand/middleware")},6113:e=>{e.exports=require("crypto")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},59796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),n=t.X(0,[8428,8640,6859,8165,1664,4807,556,1571,1427,1061,9217,4800],()=>i(13870));module.exports=n})();