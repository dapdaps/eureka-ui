"use strict";(()=>{var e={};e.id=7725,e.ids=[7725,2888],e.modules={71269:(e,t,i)=>{i.d(t,{Z:()=>n});let n={src:"/_next/static/media/bg.e589f07f.svg",height:206,width:44,blurWidth:0,blurHeight:0}},43116:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.r(t),i.d(t,{config:()=>m,default:()=>p,getServerSideProps:()=>g,getStaticPaths:()=>h,getStaticProps:()=>x,reportWebVitals:()=>f,routeModule:()=>j,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>w,unstable_getStaticParams:()=>C,unstable_getStaticPaths:()=>u,unstable_getStaticProps:()=>b});var a=i(87093),s=i(35244),r=i(1323),o=i(65211),d=i(64807),c=i(59732),l=e([d,c]);[d,c]=l.then?(await l)():l;let p=(0,r.l)(c,"default"),x=(0,r.l)(c,"getStaticProps"),h=(0,r.l)(c,"getStaticPaths"),g=(0,r.l)(c,"getServerSideProps"),m=(0,r.l)(c,"config"),f=(0,r.l)(c,"reportWebVitals"),b=(0,r.l)(c,"unstable_getStaticProps"),u=(0,r.l)(c,"unstable_getStaticPaths"),C=(0,r.l)(c,"unstable_getStaticParams"),v=(0,r.l)(c,"unstable_getServerProps"),w=(0,r.l)(c,"unstable_getServerSideProps"),j=new a.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/gas-station",pathname:"/gas-station",bundlePath:"",filename:""},components:{App:d.default,Document:o.default},userland:c});n()}catch(e){n(e)}})},25089:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var a=i(16689),s=i(8433),r=i(71982),o=i(17473),d=i(84379),c=i(7632),l=e([s]);s=(l.then?(await l)():l)[0];let x={11155111:"https://rpc2.sepolia.org",421614:"https://public.stackup.sh/api/v1/node/arbitrum-sepolia"};function p(e){let[t,i]=(0,a.useState)(!1),[n,l]=(0,a.useState)({}),p=(0,a.useRef)(),h=(0,a.useRef)(0),{account:g}=(0,s.Z)(),m=(0,a.useCallback)(async()=>{if(g&&e&&e.length)try{i(!0);let t=e[0].chainId,n=t?x[t]?x[t]:o.Z[t]?.rpcUrls[h.current]:"";if(p.current=t,l({}),!n)throw"No rpcUrl";let a=new r.providers.JsonRpcProvider(n),s=!1,m=e.filter(e=>(e.isNative&&(s=!0),!e.isNative&&e.address)),f=m.map(e=>({address:e.address,name:"balanceOf",params:[g]})),b=c.Z[e[0].chainId],u=[(0,d.A)({abi:[{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],options:{},calls:f,multicallAddress:b,provider:a})];s&&u.push(a.getBalance(g));let[C,v]=await Promise.all(u),w={};s&&v&&(w.native=r.utils.formatUnits(v,18));for(let e=0;e<C.length;e++){let t=m[e];w[t.address]=r.utils.formatUnits(C[e]?.[0]||0,t.decimals)}e.length&&e[0].chainId===p.current&&(l(w),i(!1))}catch(e){console.log(e),h.current<2?(h.current+=1,m()):(i(!1),l({}))}},[e,g]);return(0,a.useEffect)(()=>{m()},[e,g]),{loading:t,balances:n,queryBalance:m,currentChainId:p.current}}n()}catch(e){n(e)}})},7632:(e,t,i)=>{i.d(t,{Z:()=>n});let n={42161:"0x99D73e5d83148FA2b41248059061f91703Cf0516",43114:"0x072aD7f291AED59E7C4974EbdcF73B79DAC89051",8453:"0xcA11bde05977b3631167028862bE2a173976CA11",56:"0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",100:"0xAbd2FE441318a73414e3fa93297D3Bdb036CB2Fa",59144:"0xcA11bde05977b3631167028862bE2a173976CA11",5e3:"0xcA11bde05977b3631167028862bE2a173976CA11",10:"0xD9bfE9979e9CA4b2fe84bA5d4Cf963bBcB376974",137:"0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",324:"0x1ADC6Ac76c6d35cED013cA0513919f7f53586fAf",169:"0xE4f7776c753aF46D2aa23e3348d17548C86DC47D",1088:"0xc39aBB6c4451089dE48Cffb013c39d3110530e5C",534352:"0xcA11bde05977b3631167028862bE2a173976CA11",1101:"0xcA11bde05977b3631167028862bE2a173976CA11",81457:"0xcA11bde05977b3631167028862bE2a173976CA11",34443:"0xcA11bde05977b3631167028862bE2a173976CA11",1:"0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",11155111:"0xcA11bde05977b3631167028862bE2a173976CA11",421614:"0xcA11bde05977b3631167028862bE2a173976CA11"}},59732:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.r(t),i.d(t,{default:()=>u});var a=i(20997),s=i(11163),r=i(57518),o=i.n(r),d=i(17473),c=i(51571),l=i(53461),p=e([c,l]);[c,l]=p.then?(await p)():p;let x=o().div.withConfig({componentId:"sc-c7f9e0b2-0"})`
  padding-top: 80px;
`;o().div.withConfig({componentId:"sc-c7f9e0b2-1"})`
  width: 414px;
`,o().div.withConfig({componentId:"sc-c7f9e0b2-2"})`
  margin-top: 20px;
`;let h=o().div.withConfig({componentId:"sc-c7f9e0b2-3"})`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.66px;
  gap: 10px;
`,g=[1,42161,10,8453,81457,5e3,324,59144,169,34443,1088,534352,1101,137,56,43114,100],m=Object.values(d.Z);m.sort((e,t)=>g.indexOf(e.chainId)-g.indexOf(t.chainId));let f=[{chainId:11155111,chainName:"Sepolia",nativeCurrency:{name:"ETH",symbol:"ETH",decimals:18},rpcUrls:["https://ethereum-sepolia-rpc.publicnode.com"],blockExplorers:"https://sepolia.etherscan.io",icon:"https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg"},{chainId:421614,chainName:"Arbitrum Sepolia",nativeCurrency:{name:"ETH",symbol:"ETH",decimals:18},rpcUrls:["https://endpoints.omniatech.io/v1/arbitrum/sepolia/public"],blockExplorers:"https://basescan.org",icon:"https://assets.dapdap.net/images/bafkreiajyg2iof2wygtgromy6a2yfl2fqavfy235k7afc4frr7xnljvu2a.svg"}];m.unshift(f[1]),m.unshift(f[0]);let b=()=>((0,s.useRouter)(),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:["⛽",a.jsx("span",{children:"Gas Station"})]}),a.jsx(l.Z,{chainList:m})]}));b.getInitialProps=async()=>({}),b.getLayout=c.wQ;let u=b;n()}catch(e){n(e)}})},84379:(e,t,i)=>{i.d(t,{A:()=>a});var n=i(71982);let a=async({abi:e,calls:t,options:i,multicallAddress:a,provider:s})=>{let{requireSuccess:r=!0,...o}=i||{},d=new n.Contract(a,[{inputs:[{internalType:"bool",name:"requireSuccess",type:"bool"},{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"tryAggregate",outputs:[{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"}],s),c=new n.utils.Interface(e),l=t.map(e=>({target:e.address.toLowerCase(),callData:c.encodeFunctionData(e.name,e.params)})),p=await d?.callStatic.tryAggregate(r,l,o),x=p?.map((e,i)=>{let[n,a]=e;return n&&0!==Number(a)?c.decodeFunctionResult(t[i].name,a):null});return x}},48141:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(20997),a=i(57518),s=i.n(a);let r=s().div.withConfig({componentId:"sc-9b5cf2e0-0"})`
    
`,o=s().div.withConfig({componentId:"sc-9b5cf2e0-1"})`
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
`,d=s().div.withConfig({componentId:"sc-9b5cf2e0-2"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-top: 10px;
    .amount-item {
        flex: 1;
        height: 44px;
        border: 1px solid rgba(55, 58, 83, 1);
        border-radius: 6px;
        background: linear-gradient(180deg, #4C5273 0%, #292D41 100%);
        text-align: center;
        line-height: 44px;
        color: #fff;
        font-family: Jura;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all .3s;
        &.active {
            border: 1px solid rgba(235, 244, 121, 1);
            background: linear-gradient(180deg, #292D41 0%, #4C5273 100%);
        }
    }
`,c=[10,20,50,100,200];function l({value:e,onChange:t}){return(0,n.jsxs)(r,{children:[n.jsx(o,{children:"Amount"}),n.jsx(d,{children:c.map(i=>(0,n.jsxs)("div",{onClick:()=>{t(i)},className:`${e===i?"active":""} amount-item`,children:["$",i]},i))})]})}},30254:(e,t,i)=>{i.d(t,{Z:()=>u});var n=i(20997),a=i(16689),s=i(57518),r=i.n(s);let o=r().div.withConfig({componentId:"sc-784e3b80-0"})`
    display: flex;
    align-items: center;
`,d=r().div.withConfig({componentId:"sc-784e3b80-1"})`
    flex: 1;
    position: relative;
    .title {
        color: rgba(151, 154, 190, 1);
        font-size: 14px;
        font-weight: 500;
        line-height: 16.56px;
    }
    .trigger {
        height: 48px;
        margin-top: 10px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        &.left {
            background: url(${"/_next/static/media/left.675b1665.svg"}) no-repeat 0 0;
            background-size: 100% 100%;
            padding-right: 20px;
        }
        &.right {
            background: url(${"/_next/static/media/right.45c01635.svg"}) no-repeat 0 0;
            background-size: 100% 100%;
            padding-left: 25px;
        }
        .chain-name {
            display: flex;
            align-items: center;
            .alt {
                width: 28px;
                height: 28px;
                border-radius: 8px;
                background-color: rgba(94, 97, 126, 1);
                overflow: hidden;
                
            }
            .chain-img {
                width: 28px;
                height: 28px;
                border-radius: 8px;
            }
            .name {
                margin-left: 10px;
                color: rgba(151, 154, 190, 1);
            }
            .select-name {
                margin-left: 10px;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
`,c=r().div.withConfig({componentId:"sc-784e3b80-2"})`
    width: 100%;
    position: absolute;
    left: 0;
    top: 102%;
    background: #2E3142;
    border-radius: 12px;
    padding: 12px 0;
    z-index: 21;
    max-height: 500px;
    overflow: auto;
`,l=r().div.withConfig({componentId:"sc-784e3b80-3"})`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    height: 42px;
    padding: 0 12px;
    justify-content: space-between;
    &:hover {
        background: #676d93;
    }
    .names-group {
        display: flex;
        align-items: center;
    }
`,p=r().img.withConfig({componentId:"sc-784e3b80-4"})`
    width: 26px;
    height: 26px;
    border-radius: 8px;
`,x=r().div.withConfig({componentId:"sc-784e3b80-5"})`
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: #fff;
    margin-left: 7px;
`,h=()=>n.jsx("svg",{width:"12",height:"7",viewBox:"0 0 12 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M1 1L6 5L11 1",stroke:"#979ABE","stroke-width":"2","stroke-linecap":"round"})}),g=()=>n.jsx("svg",{width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M1 4.11111L5.28571 8L13 1",stroke:"#EBF479","stroke-width":"2","stroke-linecap":"round"})}),m=()=>(0,n.jsxs)("div",{className:"chain-name",children:[n.jsx("div",{className:"alt"}),n.jsx("div",{className:"name",children:"Select"})]}),f=({chain:e})=>(0,n.jsxs)("div",{className:"chain-name",children:[n.jsx("img",{src:e.icon,className:"chain-img"}),n.jsx("div",{className:"select-name ",children:e.chainName})]}),b=({cls:e,paddingLeft:t,title:i,chainList:s,onChainChange:r,chain:o})=>{let[b,u]=(0,a.useState)(!1),C=(0,a.useRef)(null),v=(0,a.useCallback)(e=>{let t=C.current?.contains(e.target);t||u(!1)},[]);return(0,a.useEffect)(()=>(document.addEventListener("click",v,!1),()=>{document.removeEventListener("click",v)}),[]),(0,n.jsxs)(d,{ref:C,children:[n.jsx("div",{className:"title",style:{paddingLeft:t},children:i}),(0,n.jsxs)("div",{className:`trigger ${e}`,onClick:()=>{u(!0)},children:[o?n.jsx(f,{chain:o}):n.jsx(m,{}),n.jsx(h,{})]}),b?n.jsx(c,{onClick:e=>{e.stopPropagation()},children:s.map(e=>(0,n.jsxs)(l,{onClick:()=>{r(e),u(!1)},children:[(0,n.jsxs)("div",{className:"names-group",children:[n.jsx(p,{src:e.icon}),n.jsx(x,{children:e.chainName})]}),e===o&&n.jsx(g,{})]},e.chainId))}):null]})};function u({chainList:e,fromChain:t,toChain:i,onFromChainChange:a,onToChainChange:s}){return(0,n.jsxs)(o,{children:[n.jsx(b,{paddingLeft:0,chainList:e,onChainChange:a,chain:t,cls:"left",title:"Source Chain"}),n.jsx(b,{paddingLeft:25,chainList:e,onChainChange:s,chain:i,cls:"right",title:"Destination Chain"})]})}},21096:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(20997),a=i(57518),s=i.n(a);let r=s().div.withConfig({componentId:"sc-5abb0625-0"})`
    
`,o=s().div.withConfig({componentId:"sc-5abb0625-1"})`
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 50px;
    background-color: rgba(46, 49, 66, 1);
    padding: 5px 10px;
    width: 220px;
    .plus {
        width: 17px;
        height: 17px;
        border-radius: 17px;
        background-color: rgba(235, 244, 121, 1);
        text-align: center;
        line-height: 17px;
        color: #000;
    }
    .text {

    }
`;function d({}){return n.jsx(r,{children:(0,n.jsxs)(o,{children:[n.jsx("div",{className:"plus",children:"+"}),n.jsx("div",{className:"text",children:"Add Destination Address"})]})})}},91345:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>c});var a=i(20997),s=i(57518),r=i.n(s),o=i(21004),d=e([o]);o=(d.then?(await d)():d)[0];let l=r().div.withConfig({componentId:"sc-c55e7503-0"})`
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 12px;
    padding: 12px;
    min-height: 135px;
`,p=r().div.withConfig({componentId:"sc-c55e7503-1"})`
    display: flex;
    justify-content: space-between;
    align-items: start;
    font-weight: 500;
    line-height: 16.56px;
    font-size: 14px;
    .title {
        color: rgba(151, 154, 190, 1);
    }
    .amount-wapper {
        text-align: right;
        .amount {
            color: #fff;
        }
        .price {
            color: rgba(151, 154, 190, 1);
        }
    }
    &:not(:first-child) {
        margin-top: 10px;
    }
`;function c({receive:e,loading:t,toChain:i,receivePrice:n}){return(0,a.jsxs)(l,{children:[(0,a.jsxs)(p,{children:[a.jsx("div",{className:"title",children:"Receiving Amount"}),(0,a.jsxs)("div",{className:"amount-wapper ",children:[(0,a.jsxs)("div",{className:"amount",children:[(0,o._2)(e)," ",i?.nativeCurrency.symbol]}),(0,a.jsxs)("div",{className:"price",children:["(~$",(0,o._2)(n,2),")"]})]})]}),(0,a.jsxs)(p,{children:[a.jsx("div",{className:"title",children:"Total Fee"}),(0,a.jsxs)("div",{className:"amount-wapper ",children:[a.jsx("div",{className:"amount",children:"0.0045 ETH"}),a.jsx("div",{className:"price",children:"(~$18.16)"})]})]})]})}n()}catch(e){n(e)}})},24441:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>x});var a=i(20997),s=i(57518),r=i.n(s),o=i(1718),d=i(17479),c=i(8433),l=i(63658),p=e([o,d,c]);[o,d,c]=p.then?(await p)():p;let h=r().div.withConfig({componentId:"sc-835e1a60-0"})`
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: rgba(0, 0, 0, 1);
    font-size: 16px;
    border-radius: 10px;
    background-color: rgba(235, 244, 121, 1);
    cursor: pointer;
    margin-top: 40px;
`;function x({disabled:e,loading:t,fromChain:i,onClick:n}){let{account:s,chainId:r,provider:p}=(0,c.Z)(),{onConnect:x}=(0,d.Z)(),[{settingChain:g,connectedChain:m},f]=(0,o.useSetChain)();return s?t?(0,a.jsxs)(h,{children:[a.jsx(l.Z,{size:16})," Send"]}):i&&r!==i?.chainId?a.jsx(h,{onClick:()=>{f({chainId:`0x${i?.chainId?.toString(16)}`})},children:"Switch Chain"}):e?a.jsx(h,{style:{opacity:.3},children:"Send"}):a.jsx(h,{onClick:n,children:"Send"}):a.jsx(h,{onClick:()=>{x()},children:"Connect Wallet"})}n()}catch(e){n(e)}})},51208:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>h});var a=i(20997),s=i(57518),r=i.n(s),o=i(21004),d=i(49775),c=i(8389),l=e([o,d]);[o,d]=l.then?(await l)():l,r().div.withConfig({componentId:"sc-ede7d6c5-0"})`
    
`;let g=r().div.withConfig({componentId:"sc-ede7d6c5-1"})`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding-top: 50px;
    .gas-chain {
        width: 32px;
        height: 32px;
        border-radius: 8px;
    }
    .gas-line {
        width: 37px;
        height: 0;
        border-top: 1px solid rgba(94, 97, 126, 1);
    }
    .gas-text {
        font-size: 26px;
        font-weight: 700;
        line-height: 30.76px;
        color: #fff;
    }
`,m=r().div.withConfig({componentId:"sc-ede7d6c5-2"})`
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
    text-align: center;
    color: rgba(151, 154, 190, 1);
`,f=r().div.withConfig({componentId:"sc-ede7d6c5-3"})`
    padding: 50px 20px 30px;
    .des-address {
        font-size: 16px;
        font-weight: 500;
        line-height: 18.93px;
        color: rgba(151, 154, 190, 1);
        padding-left: 20px;
    }
    .address-content {
        border-radius: 12px;
        border: 1px solid rgba(55, 58, 83, 1);
        background: rgba(46, 49, 66, 1);
        padding: 20px;
        color: #fff;
        margin-top: 10px;
        .address-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            .account-wapper {
                display: flex;
                align-items: center;
                gap: 5px;
                .dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 5px;
                    background-color: rgba(102, 196, 87, 1);
                }
                .copy {
                    cursor: pointer;
                }
            }
            .amount-wapper {

            }
        }
    }
`,b=r().div.withConfig({componentId:"sc-ede7d6c5-4"})`
    height: 120px;
    background-color: rgba(24, 25, 36, 1);
    border-radius: 0 0 16px 16px;
`,u=r().div.withConfig({componentId:"sc-ede7d6c5-5"})`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 20px;
    .circle-line {
        height: 0;
        width: 130px;
        border-top: 1px solid rgba(94, 97, 126, 1);
    }
`,C=r().div.withConfig({componentId:"sc-ede7d6c5-6"})`
    display: flex;
    align-items: center;
    margin-top: 10px;
    .text {
        flex: 1;
        text-align: center;
        color: #fff;
        &.disabled {
            color: rgba(94, 97, 126, 1);
        }
    }
`,v=r().div.withConfig({componentId:"sc-ede7d6c5-7"})`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: 1px solid ${({disabled:e})=>e?"rgba(94, 97, 126, 1)":"rgba(235, 244, 121, 1)"};
    background: radial-gradient(at 50% 50%, ${({disabled:e})=>e?"rgba(94, 97, 126, 1)":"rgba(235, 244, 121, 1)"} 0% 60%, #000 60% 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
`;function p({disabled:e,text:t,isLast:i}){return(0,a.jsxs)(a.Fragment,{children:[a.jsx(v,{className:"circle",disabled:e,children:t}),!i&&a.jsx("div",{className:"circle-line"})]})}function x({disabled:e,text:t}){return a.jsx("div",{className:`text ${e?"disabled":""}`,children:t})}let w=[({disabled:e})=>a.jsx(p,{isLast:!1,text:"↑",disabled:e}),({disabled:e})=>a.jsx(p,{isLast:!1,text:"L",disabled:e}),({disabled:e})=>a.jsx(p,{isLast:!0,text:"✓",disabled:e})],j=[({disabled:e})=>a.jsx(x,{text:"Waiting for transac",disabled:e}),({disabled:e})=>a.jsx(x,{text:"Processing",disabled:e}),({disabled:e})=>a.jsx(x,{text:"Success",disabled:e})];function h({fromChain:e,toChain:t,payPrice:i,pay:n,onClose:s,fromToken:r,address:l,step:p=0,disabled:x}){let{copy:h}=(0,d.Z)();return(0,a.jsxs)(c.Z,{onClose:()=>{x||s()},width:596,paddingSize:0,children:[(0,a.jsxs)(g,{children:[a.jsx("img",{src:e?.icon,className:"gas-chain"}),a.jsx("div",{className:"gas-line"}),(0,a.jsxs)("div",{className:"gas-text",children:[(0,o._2)(n,4)," ",r?.symbol]}),a.jsx("div",{className:"gas-line"}),a.jsx("img",{src:t?.icon,className:"gas-chain"})]}),(0,a.jsxs)(m,{children:["(~$",(0,o._2)(i,2),")"]}),(0,a.jsxs)(f,{children:[a.jsx("div",{className:"des-address",children:"Destination Address"}),a.jsx("div",{className:"address-content",children:(0,a.jsxs)("div",{className:"address-item",children:[(0,a.jsxs)("div",{className:"account-wapper",children:[a.jsx("div",{children:l}),a.jsx("div",{className:"dot"}),a.jsx("div",{className:"copy",onClick:()=>{h(l)},children:a.jsx("svg",{width:"10",height:"10",viewBox:"0 0 10 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{d:"M3.55263 0H9.07895C9.32323 3.27158e-09 9.5575 0.0970392 9.73023 0.26977C9.90296 0.442501 10 0.676774 10 0.921053V6.44737C10 6.69165 9.90296 6.92592 9.73023 7.09865C9.5575 7.27138 9.32323 7.36842 9.07895 7.36842H3.55263C3.30835 7.36842 3.07408 7.27138 2.90135 7.09865C2.72862 6.92592 2.63158 6.69165 2.63158 6.44737V0.921053C2.63158 0.676774 2.72862 0.442501 2.90135 0.26977C3.07408 0.0970392 3.30835 0 3.55263 0ZM3.55263 0.789474C3.51773 0.789474 3.48427 0.803337 3.45959 0.828012C3.43492 0.852688 3.42105 0.886156 3.42105 0.921053V6.44737C3.42105 6.46465 3.42446 6.48176 3.43107 6.49772C3.43768 6.51369 3.44737 6.52819 3.45959 6.54041C3.47181 6.55263 3.48632 6.56232 3.50228 6.56893C3.51824 6.57554 3.53535 6.57895 3.55263 6.57895H9.07895C9.11384 6.57895 9.14731 6.56508 9.17199 6.54041C9.19666 6.51573 9.21053 6.48226 9.21053 6.44737V0.921053C9.21053 0.886156 9.19666 0.852688 9.17199 0.828012C9.14731 0.803337 9.11384 0.789474 9.07895 0.789474H3.55263ZM6.57895 8.1579C6.57895 8.0532 6.62054 7.9528 6.69456 7.87877C6.76859 7.80475 6.86899 7.76316 6.97368 7.76316C7.07837 7.76316 7.17878 7.80475 7.25281 7.87877C7.32683 7.9528 7.36842 8.0532 7.36842 8.1579V9.07895C7.36842 9.32323 7.27138 9.5575 7.09865 9.73023C6.92592 9.90296 6.69165 10 6.44737 10H0.921053C0.676774 10 0.442501 9.90296 0.26977 9.73023C0.0970392 9.5575 3.27158e-09 9.32323 0 9.07895V3.55263C0 3.30835 0.0970392 3.07408 0.26977 2.90135C0.442501 2.72862 0.676774 2.63158 0.921053 2.63158H1.84211C1.9468 2.63158 2.0472 2.67317 2.12123 2.7472C2.19525 2.82122 2.23684 2.92163 2.23684 3.02632C2.23684 3.13101 2.19525 3.23141 2.12123 3.30544C2.0472 3.37946 1.9468 3.42105 1.84211 3.42105H0.921053C0.886156 3.42105 0.852688 3.43492 0.828012 3.45959C0.803337 3.48427 0.789474 3.51773 0.789474 3.55263V9.07895C0.789474 9.11384 0.803337 9.14731 0.828012 9.17199C0.852688 9.19666 0.886156 9.21053 0.921053 9.21053H6.44737C6.48226 9.21053 6.51573 9.19666 6.54041 9.17199C6.56508 9.14731 6.57895 9.11384 6.57895 9.07895V8.1579Z",fill:"#979ABE"})})})]}),(0,a.jsxs)("div",{className:"amount-wapper",children:[(0,o._2)(n,4)," ",r?.symbol]})]})})]}),(0,a.jsxs)(b,{children:[a.jsx(u,{children:w.map((e,t)=>a.jsx(e,{disabled:p<t},t))}),a.jsx(C,{children:j.map((e,t)=>a.jsx(e,{disabled:p<t},t))})]})]})}n()}catch(e){n(e)}})},2016:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>p});var a=i(20997),s=i(57518),r=i.n(s),o=i(11163),d=i(21004),c=i(24441),l=e([d,c]);[d,c]=l.then?(await l)():l;let x=r().div.withConfig({componentId:"sc-c50db3bf-0"})`
    position: absolute;
    left: 100%;
    top: 50px;
`,h=r().div.withConfig({componentId:"sc-c50db3bf-1"})`
    width: 8px;
    height: 286px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 0 9999px 9999px 0;
    background: rgba(37, 40, 56, 1);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
`,g=r().div.withConfig({componentId:"sc-c50db3bf-2"})`
    width: 206px;
    height: 264px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 0 8px 8px 0;
    background: rgba(46, 49, 66, 1);
    margin-top: 11px;
    padding: 30px 20px;
    .total-wapper {
        height: 100px;
        border-radius: 10px;
        border: 1px solid rgba(55, 58, 83, 1);
        background: linear-gradient(180deg, #0C0E1A 0%, #262836 100%);
        font-size: 16px;
        font-weight: 500;
        line-height: 18.93px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px 0;
        .total {
            color: rgba(151, 154, 190, 1);
        }
        .amount {
            color: #fff;
        }
        .dollar {
            color: rgba(151, 154, 190, 1);
        }
    }
`,m=r().div.withConfig({componentId:"sc-c50db3bf-3"})`
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
    text-align: center;
    color: rgba(151, 154, 190, 1);
    margin-top: 10px;
    cursor: pointer;
`;function p({disabled:e,payPrice:t,pay:i,token:n,loading:s,fromChain:r,onClick:l}){let p=(0,o.useRouter)();return(0,a.jsxs)(x,{children:[a.jsx(h,{}),(0,a.jsxs)(g,{children:[(0,a.jsxs)("div",{className:"total-wapper",children:[a.jsx("div",{className:"total",children:"Total"}),(0,a.jsxs)("div",{className:"amount",children:[i?(0,d._2)(i,4):"-"," ",n?.symbol]}),(0,a.jsxs)("div",{className:"dollar",children:["(~$",t?(0,d._2)(t,2):"-",")"]})]}),a.jsx(c.Z,{disabled:e,loading:s,fromChain:r,onClick:l}),a.jsx(m,{onClick:()=>{p.push("/gas-station/transaction")},children:"Records"})]})]})}n()}catch(e){n(e)}})},45029:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>l});var a=i(20997),s=i(57518),r=i.n(s),o=i(21004),d=i(71269),c=e([o]);o=(c.then?(await c)():c)[0];let p=r().div.withConfig({componentId:"sc-e9657c49-0"})`
    flex: 1;
    cursor: pointer;
    .panel {
        height: 217px;
        border: 1px solid rgba(55, 58, 83, 1);
        background-color: rgba(46, 49, 66, 1);
        border-radius: 10px;
        padding: 10px 0;
        transition: all .3s;
        .token-desc {
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            line-height: 14.2px;
            text-align: center;
        }
        .bg {
            border: 1px solid rgba(55, 58, 83, 1);
            background-color: rgba(46, 49, 66, 1);
            border-radius: 10px; 
            background: linear-gradient(180deg, #0C0E1A 0%, #262836 100%);
            height: 154px;
            margin: 10px;
        }
        .token-bg {
            width: 40px;
            height: 206px;
            background: url(${d.Z.src}) no-repeat 0 0;
            background-size: 100% 100%;
            margin: 10px auto 0;
            text-align: center;
            transition: all .3s;
            .token-icon {
                width: 30px;
                height: 30px;
                border-radius: 30px;
                margin: 65px auto 0;
            }
        }
    }
`,x={ETH:"linear-gradient(180deg, #627EEA 0%, #262836 100%)",USDC:"linear-gradient(180deg, #4596EE 0%, #262836 100%)",USDT:"linear-gradient(180deg, #3DBB94 0%, #262836 100%)"};function l({token:e,balance:t,onTokenChoose:i,active:n}){return a.jsx(p,{onClick:()=>{t&&i&&i(e)},children:(0,a.jsxs)("div",{className:"panel",style:{background:n?x[e.symbol]:"rgba(46, 49, 66, 1)"},children:[(0,a.jsxs)("div",{className:"token-desc",children:[a.jsx("div",{children:t?(0,o._2)(t):"-"}),a.jsx("div",{children:e.symbol})]}),a.jsx("div",{className:"bg",children:a.jsx("div",{className:"token-bg",style:{marginTop:n?0:10},children:a.jsx("img",{className:"token-icon",src:e.icon})})})]})})}n()}catch(e){n(e)}})},21625:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>l});var a=i(20997),s=i(16689),r=i(57518),o=i.n(r),d=i(45029),c=e([d]);d=(c.then?(await c)():c)[0];let p=o().div.withConfig({componentId:"sc-83f1788c-0"})`

`,x=o().div.withConfig({componentId:"sc-83f1788c-1"})`
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
`,h=o().div.withConfig({componentId:"sc-83f1788c-2"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
`;function l({tokenList:e,balances:t,chainTokenList:i,selectedToken:n,onTokenChoose:r}){let[o,c]=(0,s.useState)({});return(0,s.useEffect)(()=>{if(i&&i.length&&t){let n={};e.forEach(e=>{let a=i.filter(t=>t.symbol===e.symbol);if(a&&a.length){let e=a[0];if(e.isNative){n[e.symbol]=t.native;return}n[e.symbol]=t[e.address]}}),c(n)}else c({})},[i,t,e]),(0,a.jsxs)(p,{children:[a.jsx(x,{children:"Source Token"}),a.jsx(h,{children:e.map(e=>a.jsx(d.Z,{active:n?.symbol===e.symbol,balance:o[e.symbol],token:e,onTokenChoose:r},e.symbol))})]})}n()}catch(e){n(e)}})},53461:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.d(t,{Z:()=>k});var a=i(20997),s=i(16689),r=i(57518),o=i.n(r),d=i(63043),c=i(19217),l=i(25089),p=i(37346),x=i(43847),h=i(8433),g=i(30254),m=i(21625),f=i(48141),b=i(21096),u=i(91345),C=i(2016),v=i(51208),w=i(97626),j=e([c,l,p,h,m,u,C,v,w,d]);[c,l,p,h,m,u,C,v,w,d]=j.then?(await j)():j;let I=o().div.withConfig({componentId:"sc-1d090aa9-0"})`
    width: 440px;
    min-height: 200px;
    margin: 20px auto;
    font-family: Jura;

`,N=o().div.withConfig({componentId:"sc-1d090aa9-1"})`
    width: 408px;
    background-color: rgba(46, 49, 66, 1);
    margin: 0 auto;
    border-radius: 16px 16px 0 0;
    border: 1px solid rgba(55, 58, 83, 1);
    padding: 10px;
`,S=o().div.withConfig({componentId:"sc-1d090aa9-2"})`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(29, 31, 43, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    padding: 4px;
    .item {
        cursor: pointer;
        flex: 1;
        height: 42px;
        color: rgba(151, 154, 190, 1);
        line-height: 42px;
        text-align: center;
        svg {
            margin-left: 5px;
        }
        &.active {
            background-color: rgba(55, 57, 77, 1);
            border-radius: 16px;
            color: #fff;
        }
    }
`,E=o().div.withConfig({componentId:"sc-1d090aa9-3"})`
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    background-color: rgba(38, 40, 54, 1);
    min-height: 730px;
    padding: 20px 36px;
    position: relative;
`;function y(){return(0,a.jsxs)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("g",{"clip-path":"url(#clip0_10869_6951)",children:a.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M2.66658 10.9888C3.65328 11.6481 4.81331 12 6 12C7.5913 12 9.11743 11.3679 10.2426 10.2426C11.3679 9.11743 12 7.5913 12 6C12 4.81331 11.6481 3.65328 10.9888 2.66658C10.3295 1.67989 9.39246 0.910851 8.2961 0.456725C7.19975 0.00259969 5.99335 -0.11622 4.82946 0.115291C3.66558 0.346802 2.59648 0.918247 1.75736 1.75736C0.918247 2.59648 0.346802 3.66558 0.115291 4.82946C-0.11622 5.99335 0.00259969 7.19975 0.456725 8.2961C0.910851 9.39246 1.67989 10.3295 2.66658 10.9888ZM3.08326 1.63479C3.94662 1.05791 4.96165 0.750003 6 0.750003C7.39239 0.750003 8.72775 1.30313 9.71231 2.28769C10.6969 3.27226 11.25 4.60762 11.25 6C11.25 7.03835 10.9421 8.05339 10.3652 8.91675C9.78834 9.7801 8.9684 10.453 8.00909 10.8504C7.04978 11.2477 5.99418 11.3517 4.97578 11.1491C3.95738 10.9466 3.02192 10.4465 2.28769 9.71231C1.55347 8.97809 1.05345 8.04263 0.85088 7.02423C0.648308 6.00583 0.752275 4.95023 1.14964 3.99091C1.547 3.0316 2.2199 2.21166 3.08326 1.63479ZM7.85991 3.91193C7.7705 3.69618 7.63487 3.50265 7.46257 3.34499C7.07534 3.02446 6.58052 2.86354 6.07882 2.89499C5.80397 2.88152 5.52926 2.92411 5.27139 3.02017C5.01352 3.11623 4.77788 3.26374 4.57882 3.45374C4.3881 3.65229 4.24011 3.88784 4.144 4.14583C4.0479 4.40383 4.00572 4.6788 4.02007 4.95374H4.92757C4.90733 4.63612 4.9902 4.32046 5.16382 4.05374C5.26418 3.9244 5.39538 3.8223 5.5454 3.75679C5.69543 3.69127 5.85949 3.66444 6.02257 3.67874C6.15892 3.66854 6.2959 3.68659 6.42495 3.73176C6.554 3.77693 6.67234 3.84824 6.77257 3.94124C6.94808 4.13738 7.03964 4.39456 7.02757 4.65749C7.02315 4.89058 6.93987 5.1153 6.79132 5.29499L6.64132 5.45999C6.25484 5.76755 5.91835 6.13313 5.64382 6.54374C5.52532 6.80346 5.46883 7.08718 5.47882 7.37249V7.52249H6.39382V7.37249C6.38935 7.16884 6.43712 6.96744 6.53257 6.78749C6.62782 6.61608 6.75513 6.46458 6.90757 6.34124C7.17091 6.12884 7.42135 5.90093 7.65757 5.65874C7.88002 5.34924 7.99345 4.97465 7.98007 4.59374C7.99034 4.36042 7.94932 4.12768 7.85991 3.91193ZM6.54777 8.37753C6.516 8.29908 6.46727 8.22863 6.40507 8.17124C6.34353 8.11348 6.27094 8.06876 6.19168 8.03976C6.11242 8.01076 6.02811 7.99808 5.94382 8.00249C5.86121 7.99865 5.77872 8.01238 5.7018 8.04276C5.62487 8.07314 5.55527 8.11948 5.49757 8.17874C5.43418 8.23394 5.38406 8.30274 5.35094 8.38C5.31783 8.45727 5.30258 8.54101 5.30632 8.62499C5.30924 8.79181 5.37706 8.95093 5.49539 9.06856C5.61372 9.18618 5.77323 9.25306 5.94007 9.25499C6.11166 9.25644 6.27756 9.19355 6.40507 9.07874C6.46495 9.01958 6.51213 8.94883 6.54373 8.87081C6.57532 8.79279 6.59067 8.70914 6.58882 8.62499C6.59356 8.54048 6.57954 8.45598 6.54777 8.37753Z",fill:"#979ABE"})}),a.jsx("defs",{children:a.jsx("clipPath",{id:"clip0_10869_6951",children:a.jsx("rect",{width:"12",height:"12",fill:"white"})})})]})}let A=[{chainId:1,name:"ETH",symbol:"ETH",icon:"https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",decimals:18,isNative:!0,address:"native"},{chainId:1,address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",name:"USDC",symbol:"USDC",icon:"https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",decimals:6},{chainId:1,address:"0xdAC17F958D2ee523a2206206994597C13D831ec7",name:"Tether USD",symbol:"USDT",icon:"https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",decimals:6}],Z=A.map(e=>e.symbol);function k({chainList:e}){let{account:t,chainId:i,provider:n}=(0,h.Z)(),[r,o]=(0,s.useState)(e[0]),[j,k]=(0,s.useState)(e[1]),[T,D]=(0,s.useState)(void 0),[z,L]=(0,s.useState)(0),[P,B]=(0,s.useState)([]),[_,q]=(0,s.useState)(),[H,$]=(0,s.useState)(!1),[F,M]=(0,s.useState)(),[R,U]=(0,s.useState)(!1),[V,O]=(0,s.useState)(0),[W,J]=(0,s.useState)({fromChain:r,toChain:j,fromToken:F,value:z}),G=(0,p.O)(e=>e.price),Q=(0,d.Z)(W,{wait:500}),{isSupported:X,supportedChainFrom:K,getStatus:Y}=(0,c.Bq)({fromChain:r,toChain:j,fromToken:F}),{receive:ee,isLoading:et,deposit:ei}=(0,c.Wr)(Q),{balances:en}=(0,l.Z)(P);return(0,s.useEffect)(()=>{if(r){let e=x.Z[r.chainId],t=e.filter(e=>Z.indexOf(e.symbol)>-1);B(t)}},[r]),(0,s.useEffect)(()=>{if(P&&_){let e=P.filter(e=>e.symbol===_.symbol);e&&e.length?M(e[0]):M(void 0)}else M(void 0)},[_,P]),(0,s.useEffect)(()=>{if(T&&F&&j&&G){let e=Number(T)/Number(G[F.symbol]);L(e)}else L(0)},[T,F,j,G]),(0,s.useEffect)(()=>{J({fromChain:r,toChain:j,fromToken:F,value:z})},[r,j,F,z]),(0,s.useEffect)(()=>{r&&j&&F&&z&&ee&&en?$(!0):$(!1)},[r,j,F,z,ee,en]),(0,a.jsxs)(I,{children:[a.jsx(N,{children:(0,a.jsxs)(S,{children:[(0,a.jsxs)("div",{className:"item active",children:["Login mode",a.jsx(y,{})]}),(0,a.jsxs)("div",{className:"item",children:["Login free mode",a.jsx(y,{})]})]})}),(0,a.jsxs)(E,{children:[a.jsx(g.Z,{onFromChainChange:e=>o(e),onToChainChange:e=>k(e),chainList:e,fromChain:r,toChain:j}),a.jsx("div",{style:{marginTop:20}}),a.jsx(m.Z,{selectedToken:_,balances:en,tokenList:A,chainTokenList:P,onTokenChoose:e=>{q(e)}}),a.jsx("div",{style:{marginTop:20}}),a.jsx(f.Z,{value:T,onChange:e=>{D(e)}}),a.jsx("div",{style:{marginTop:20}}),a.jsx(b.Z,{}),X&&ee&&T&&j&&(0,a.jsxs)("div",{children:[a.jsx("div",{style:{marginTop:20}}),a.jsx(u.Z,{receivePrice:Number(ee)*Number(G[j?.nativeCurrency.symbol]),receive:ee,loading:et,toChain:j})]}),a.jsx(C.Z,{disabled:!H,payPrice:_&&T,pay:z,token:_,loading:et,fromChain:r,onClick:async()=>{if(H&&F){U(!0),O(0);let e=await ei(F.address,t,new w.default(z).mul(10**F?.decimals).toString(),n.getSigner());O(1),await Y(K,e)}}}),R&&a.jsx(v.Z,{fromChain:r,toChain:j,fromToken:_,payPrice:_&&T,address:t,pay:z,step:V,disabled:et,onClose:()=>{U(!1)}})]})]})}n()}catch(e){n(e)}})},8389:(e,t,i)=>{i.d(t,{Z:()=>x});var n=i(20997),a=i(16689),s=i(57518),r=i.n(s);let o=r().div.withConfig({componentId:"sc-66747a29-0"})`
    position: fixed;
    left: 0;
    right: 0;
    top: -100px;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 50;
`,d=r().div.withConfig({componentId:"sc-66747a29-1"})`
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
`,c=r().div.withConfig({componentId:"sc-66747a29-2"})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        font-size: 18px;
        font-weight: 700;
        line-height: 21.6px;
        color: #fff;
    }
`,l=r().div.withConfig({componentId:"sc-66747a29-3"})`
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 20px;
`,p=r().div.withConfig({componentId:"sc-66747a29-4"})`
    padding-top: ${({size:e=20})=>`${e}px`};
`,x=(0,a.forwardRef)(function({width:e=468,height:t,onClose:i,title:a,children:s,paddingSize:r=20,top:x="30%"},h){return(0,n.jsxs)("div",{children:[n.jsx(o,{onClick:()=>{i&&i()}}),(0,n.jsxs)(d,{ref:h,size:r,style:{top:x,width:e},children:[n.jsx(l,{onClick:()=>{i&&i()},children:n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z",fill:"#979ABE"})})}),a&&n.jsx(c,{children:n.jsx("div",{className:"title",children:a})}),n.jsx(p,{size:r,children:s})]})]})})},71982:e=>{e.exports=require("ethers")},93908:e=>{e.exports=require("lodash/debounce")},11341:e=>{e.exports=require("lodash/maxBy")},62785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},40968:e=>{e.exports=require("next/head")},16689:e=>{e.exports=require("react")},66405:e=>{e.exports=require("react-dom")},6175:e=>{e.exports=require("react-singleton-hook")},20997:e=>{e.exports=require("react/jsx-runtime")},57518:e=>{e.exports=require("styled-components")},37478:e=>{e.exports=require("super-bridge-sdk")},74924:e=>{e.exports=import("@web3-onboard/bitget")},79363:e=>{e.exports=import("@web3-onboard/injected-wallets")},1718:e=>{e.exports=import("@web3-onboard/react")},75907:e=>{e.exports=import("@web3-onboard/walletconnect")},97626:e=>{e.exports=import("big.js")},66197:e=>{e.exports=import("framer-motion")},54275:e=>{e.exports=import("react-loading-skeleton")},3590:e=>{e.exports=import("react-toastify")},72184:e=>{e.exports=import("swiper/modules")},53015:e=>{e.exports=import("swiper/react")},71395:e=>{e.exports=import("tslib")},69890:e=>{e.exports=import("zustand")},43602:e=>{e.exports=import("zustand/middleware")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},59796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),n=t.X(0,[8428,8640,6859,8165,1664,4807,556,1571,1427,1061,9217],()=>i(43116));module.exports=n})();