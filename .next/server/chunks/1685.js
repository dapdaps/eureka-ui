"use strict";exports.id=1685,exports.ids=[1685],exports.modules={63043:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>o});var i=t(71395),d=t(16689),s=t(22107),c=e([i,s]);[i,s]=c.then?(await c)():c;let o=function(e,a){var t=(0,i.__read)((0,d.useState)(e),2),n=t[0],c=t[1],o=(0,s.Z)(function(){c(e)},a).run;return(0,d.useEffect)(function(){o()},[e]),n};n()}catch(e){n(e)}})},9256:(e,a,t)=>{t.d(a,{Z:()=>o});var n=t(20997),i=t(16689),d=t(57518),s=t.n(d);let c=(0,i.forwardRef)(({disabled:e,fill:a="solid",href:t,icon:i,iconLeft:d,iconRight:c,label:o,loading:l,size:r="default",type:p="button",variant:b="primary",...m},u)=>{let f=t?{as:"a",href:t}:{type:p,disabled:e||l};i&&(f["aria-label"]=o);let x={primary:{outline:{background:"var(--sand1)",border:"var(--sand6)",color:"var(--violet8)",iconColor:"var(--violet9)",hover:{border:"var(--violet6)"},focus:{border:"var(--violet9)"},active:{background:"var(--violet2)",border:"var(--violet7)"}},solid:{background:"linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)",border:"var(--sand12)",color:"#02051E",iconColor:"var(--sand9)",hover:{},focus:{},active:{}}},secondary:{outline:{background:"var(--sand1)",border:"var(--sand6)",color:"var(--sand12)",iconColor:"var(--sand10)",hover:{border:"var(--sand8)"},focus:{border:"var(--violet8)"},active:{background:"var(--sand3)",border:"var(--sand8)"}},solid:{background:"var(--sand3)",border:"var(--sand6)",color:"var(--sand12)",iconColor:"var(--sand11)",hover:{background:"var(--sand4)"},focus:{border:"var(--violet8)"},active:{background:"var(--sand5)"}}}};x.primary.ghost={...x.primary.outline,border:"hsla(0, 0%, 100%, 0)",background:"hsla(0, 0%, 100%, 0)"},x.secondary.ghost={...x.secondary.outline,border:"hsla(0, 0%, 100%, 0)",background:"hsla(0, 0%, 100%, 0)"};let h={small:{font:"var(--text-xs)",gap:"6px",height:"32px",icon:"14px",paddingX:"16px"},default:{font:"var(--text-s)",gap:"8px",height:"40px",icon:"18px",paddingX:"20px"},large:{font:"var(--text-base)",gap:"8px",height:"48px",icon:"18px",paddingX:"24px"}};function g(e,t){return"default"===e?x[b][a][t]:x[b][a][e][t]||x[b][a][t]}let U=s().button.withConfig({componentId:"sc-2fe9e664-0"})`
      all: unset;
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: ${i?h[r].height:void 0};
      height: ${h[r].height};
      padding: ${i?"0":`0 ${h[r].paddingX}`};
      font: ${h[r].font};
      font-weight: 600;
      line-height: 1;
      border-radius: 10px;
      background: ${g("default","background")};
      color: ${g("default","color")};
      border: 1px solid ${g("default","border")};
      box-shadow: 0 0 0 0px var(--violet4);
      cursor: pointer;
      transition: all 200ms;
      text-decoration: none !important;

      &:hover {
        background: ${g("hover","background")};
        color: ${g("hover","color")};
        border: 1px solid ${g("hover","border")};
      }
      &:focus {
        background: ${g("focus","background")};
        color: ${g("focus","color")};
        border: 1px solid ${g("focus","border")};
        box-shadow: 0 0 0 4px var(--violet4);
      }
      &:active {
        background: ${g("active","background")};
        color: ${g("active","color")};
        border: 1px solid ${g("active","border")};
      }

      ${l&&`
        pointer-events: none;
      `}

      ${e&&`
opacity: 0.3;
background: linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%);
cursor: not-allowed;
        // border-color: var(--sand3);
        // color: var(--sand8);
        // pointer-events: none;
    
        i {
          color: var(--sand8) !important;
        }
      `}
    `,y=s().span.withConfig({componentId:"sc-2fe9e664-1"})`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: ${h[r].gap};

      i {
        font-size: ${h[r].icon};
        line-height: ${h[r].icon};
        color: ${i?void 0:g("default","iconColor")};
      }

      ${l&&`
        opacity: 0.3;
      `}
    `,V=s().span.withConfig({componentId:"sc-2fe9e664-2"})``,k=s().i.withConfig({componentId:"sc-2fe9e664-3"})`
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin: calc(${h[r].icon} * -0.5) auto 0;
      width: ${h[r].icon};
      height: ${h[r].icon};
      font-size: ${h[r].icon};
      line-height: ${h[r].icon};
      animation: spin 800ms infinite linear;

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;return n.jsx(U,{ref:u,...f,...m,children:(0,n.jsxs)(n.Fragment,{children:[l&&n.jsx(k,{className:"ph-bold ph-circle-notch"}),n.jsx(y,{children:i?n.jsx("i",{className:i}):(0,n.jsxs)(n.Fragment,{children:[d&&n.jsx("i",{className:d}),n.jsx(V,{children:o}),c&&n.jsx("i",{className:c})]})})]})})});c.displayName="BaseButton";let o=c},85627:(e,a,t)=>{t.d(a,{Z:()=>l});var n=t(20997);t(16689);var i=t(57518),d=t.n(i);let s=d().div.withConfig({componentId:"sc-b6b533e4-0"})`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`,c=d().span.withConfig({componentId:"sc-b6b533e4-1"})`
  color: rgba(151, 154, 190, 1);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`,o=d().span.withConfig({componentId:"sc-b6b533e4-2"})`
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 500;
`,l=({title:e,children:a})=>(0,n.jsxs)(s,{children:[n.jsx(c,{children:e}),n.jsx(o,{children:a})]})},23540:(e,a,t)=>{t.d(a,{Z:()=>o});var n=t(20997);t(16689);var i=t(57518),d=t.n(i);let s=d().div.withConfig({componentId:"sc-696ee8e2-0"})`
  .mask {
    background: rgba(22, 24, 29, 1);
    opacity: 0.8;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
  .base-modal {
    width: 450px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 32px;
    background: linear-gradient(0deg, #262836, #262836), linear-gradient(0deg, #373a53, #373a53);
    padding: 20px 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    .base-modal-close {
      cursor: pointer;
      svg {
        width: 14px;
        height: 14px;
      }
    }
    .base-modal-head {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-modal-title {
        font-size: 26px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
`,c=n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:n.jsx("path",{d:"M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z",fill:"#979ABE"})}),o=({title:e,children:a,onClose:t})=>(0,n.jsxs)(s,{children:[n.jsx("div",{className:"mask"}),(0,n.jsxs)("section",{className:"base-modal",children:[(0,n.jsxs)("div",{className:"base-modal-head",children:[n.jsx("span",{className:"base-modal-title",children:e}),n.jsx("b",{className:"base-modal-close",onClick:()=>t(),children:c})]}),n.jsx("div",{className:"base-modal-body",children:a})]})]})},90999:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{IX:()=>d.Z,Vp:()=>c.Z,Yd:()=>i.Z,fg:()=>o.Z,gK:()=>s.Z,ji:()=>l.Z});var i=t(9256),d=t(23540),s=t(85627),c=t(54442),o=t(48201),l=t(819),r=e([c,o,l]);[c,o,l]=r.then?(await r)():r,n()}catch(e){n(e)}})},20307:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>g});var i,d=t(20997),s=t(63043),c=t(97626),o=t(71982),l=t(16689),r=t(57518),p=t.n(r),b=t(90999),m=t(8433),u=t(41045),f=t(14300),x=e([c,b,m,u,f,s]);[c,b,m,u,f,s]=x.then?(await x)():x;let h=p().div.withConfig({componentId:"sc-a7982cf1-0"})`
  display: block;
  .bridge-btn {
    width: 130px;
  }
  .clickExecution-popup-btn {
    display: flex;
    gap: 10px;
    .popup-swap-input {
      flex-grow: 1;
      position: relative;
      input {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: transparent;
        border: 1px solid rgba(235, 244, 121, 0.2);
        padding-right: 24px;
        border-radius: 12px;
        padding: 16px 56px 16px 16px;
        color: #ffffff;
        background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
      }
      input:focus {
        outline: none;
        color: #ffffff;
        border: 1px solid rgba(235, 244, 121, 0.2);
        background: none;
      }
      span {
        font-size: 14px;
        color: rgba(151, 154, 190, 1);
        position: absolute;
        right: 12px;
        top: 14px;
      }
    }
    .popup-swap-btn {
      width: 30%;
      margin-left: 12px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 12px;
      font-size: 16px;
      color: rgba(2, 5, 30, 1);
    }

    .disabled {
      opacity: 0.5;
    }
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;!function(e){e.InsufficientBalance="InsufficientBalance",e.NeedApprove="NeedApprove",e.Bridge="Bridge"}(i||(i={}));let g=({token:e,maxInputBalance:a,updateBalance:t})=>{let{account:n,provider:i,chainId:r}=(0,m.Z)(),p=(0,f.Z)(),{addAction:x}=(0,u.Z)("all-in-one"),[g,U]=(0,l.useState)(""),y=(0,s.Z)(g,{wait:500}),[V,k]=(0,l.useState)(!1),[N,T]=(0,l.useState)(0),[Z,F]=(0,l.useState)(0),[R,w]=(0,l.useState)(0),[S,W]=(0,l.useState)("Bridge"),E=(0,l.useRef)(null),[j,z]=(0,l.useState)(""),[v,M]=(0,l.useState)("");(0,l.useEffect)(()=>{E?.current?.focus()},[]);let D="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",Q=1===r||1101===r,B=Q?"0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe":"0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7",I=1===r||5===r?"ethereum":1101===r||1442===r?"polygon":"ethereum",C=[{inputs:[{internalType:"uint32",name:"destinationNetwork",type:"uint32"},{internalType:"address",name:"destinationAddress",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address",name:"token",type:"address"},{internalType:"bool",name:"forceUpdateGlobalExitRoot",type:"bool"},{internalType:"bytes",name:"permitData",type:"bytes"}],name:"bridgeAsset",outputs:[],stateMutability:"payable",type:"function"}],Y=new o.utils.Interface(C),J=e=>{let{amount:a,token:t,network:d}=e;if("ethereum"!==d)return;let s=o.utils.parseUnits((0,c.default)(a).toString(),t.decimals),l=new o.Contract(B,C,i.getSigner());l.estimateGas.bridgeAsset(1,n,s,t.address,!0,"0x").then(e=>{console.log("gasLimit",e)}).catch(e=>{console.log("gasLimit error",e)})},G=e=>{console.log("handleBridge",e);let{amount:a,token:d,network:s,permit:l}=e,b=1===r?["Ethereum","Polygon zkEVM"]:["Polygon zkEVM","Ethereum"],m=`Bridge ${a} ${d.symbol} from ${b[0]} to ${b[1]}`,u=p?.loading({title:m}),f=o.utils.parseUnits((0,c.default)(a).toString(),d.decimals),h=Y.encodeFunctionData("bridgeAsset(uint32,address,uint256,address,bool,bytes)",["ethereum"===s?1:0,n,f,d.address,!0,"0x"]);J(e),i.getSigner().sendTransaction({to:B,data:h,value:"ETH"===d.symbol?f:"0",gasLimit:3e5}).then(e=>{console.log("tx: ",e),e.wait().then(e=>{let{transactionHash:n,status:i}=e;t(),x?.({type:"Bridge",fromChainId:r,toChainId:1===r?1101:1,token:d,amount:a,template:"native bridge",add:!0,status:i,transactionHash:n}),p?.dismiss(u),p?.success({title:"Bridge Successfully!",text:m,tx:n,chainId:r})}).catch(a=>{console.log("txerror:",a),p?.dismiss(u),p?.fail({title:"Bridge Failed!",text:m,tx:e.hash,chainId:r})})}).catch(e=>{p?.dismiss(u),p?.fail({title:"Bridge Failed!",text:e?.message?.includes("user rejected transaction")?"User rejected transaction":m})})};(0,l.useEffect)(()=>{H()},[R]);let H=async()=>{let e=await X();F(e)},X=async()=>{let a=new o.Contract(e.address,["function allowance(address owner, address spender) external view returns (uint256)"],i);try{let t=await a.allowance(n,B),i=Number(o.utils.formatUnits(t,e.decimals));return console.log("allowance: ",i),i}catch(e){return console.log("getallowanceerror: ",e),0}},O=()=>{let a={chainId:r,name:j,verifyingContract:e.address,version:"1"},t=`Permit ${y} ${e.symbol}`,d=p?.loading({title:t}),s=o.utils.parseUnits((0,c.default)(y).toString(),e.decimals);i.getSigner()._signTypedData(a,{Permit:[{name:"owner",type:"address"},{name:"spender",type:"address"},{name:"value",type:"uint256"},{name:"nonce",type:"uint256"},{name:"deadline",type:"uint256"}]},{deadline:D,nonce:v||0,owner:n,spender:B,value:s}).then(a=>{let{r:t,s:i,v:c}=o.utils.splitSignature(a),l=new o.utils.Interface([{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"value",type:"uint256"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"uint8",name:"v",type:"uint8"},{internalType:"bytes32",name:"r",type:"bytes32"},{internalType:"bytes32",name:"s",type:"bytes32"}],name:"permit",outputs:[],stateMutability:"nonpayable",type:"function"}]),r=l.encodeFunctionData("permit(address,address,uint256,uint256,uint8,bytes32,bytes32)",[n,B,s,D,c,t,i]);p?.dismiss(d),G({amount:y,token:e,network:I,permit:r})}).catch(e=>{p?.dismiss(d),p?.fail({title:"Permit Failed!",text:e?.message?.includes("user rejected transaction")?"User rejected transaction":t})})},L=()=>{let a=new o.Contract(e.address,["function approve(address spender, uint256 amount) external returns (bool)"],i.getSigner());return a.approve(B,(0,c.default)(y).times((0,c.default)(10).pow(e.decimals)).toFixed(0))},_=async()=>{k(!0);try{let e=await L(),a=await e.wait();a?.status===1&&w(e=>e+1)}catch(e){console.log("approvetxerror:",e)}finally{k(!1)}},A=()=>{"ETH"!==e.symbol&&"ethereum"===I?O():G({amount:y,token:e,network:I})};return(0,l.useEffect)(()=>{(async()=>{(0,c.default)(y||0).gt((0,c.default)(a||0))?W("InsufficientBalance"):Z>=Number(y)?W("Bridge"):W("NeedApprove")})()},[y,a,Z]),d.jsx(h,{children:(0,d.jsxs)("div",{className:"clickExecution-popup-btn",children:[(0,d.jsxs)("div",{className:"popup-swap-input",children:[d.jsx("input",{ref:E,type:"number",value:g,onChange:e=>{let a=e.target.value?Number(e.target.value):"";U(a)},maxLength:String(a).length+2,max:a,autoComplete:"off"}),d.jsx("span",{children:e?.symbol})]}),(()=>{switch(S){case"InsufficientBalance":return d.jsx(b.Yd,{className:"bridge-btn",disabled:!0,label:"Insufficient Balance",size:"large"});case"NeedApprove":return d.jsx(b.Yd,{className:"bridge-btn",onClick:_,loading:V,label:"Approve",size:"large"});case"Bridge":return d.jsx(b.Yd,{className:"bridge-btn",onClick:A,label:"Bridge",size:"large"})}})()]})})};n()}catch(e){n(e)}})},29951:(e,a,t)=>{t.d(a,{O8:()=>i,q0:()=>n});let n={"native bridge":"https://ipfs.near.social/ipfs/bafkreigawbz26l7mhfewlxwnjomos6njdkchnfnw2dnb6xtzf7j2t6jdxm","Pancake Swap":"https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4",Gamma:"https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa",QuickSwap:"https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa",Balancer:"https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m"},i=[{address:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",chainId:1101,symbol:"WETH",decimals:18,logoURI:"https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295"},{address:"0xa2036f0538221a77a3937f1379699f44945018d0",chainId:1101,symbol:"MATIC",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"},{address:"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",chainId:1101,symbol:"DAI",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508"},{address:"0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",chainId:1101,symbol:"USDC",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"},{address:"0x1E4a5963aBFD975d8c9021ce480b42188849D41d",chainId:1101,symbol:"USDT",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"},{address:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",chainId:1101,symbol:"WBTC",decimals:8,extra:!0,logoURI:"https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744"}],d={native:{chainId:1101,address:"native",decimals:18,symbol:"ETH",name:"Ether",icon:"https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq"},"0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":{chainId:1101,address:"0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",decimals:6,symbol:"USDC",name:"USD Coin",icon:"https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla"},"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":{chainId:1101,address:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",decimals:18,symbol:"WETH",name:"Wrapped Ether",icon:"https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4"},"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":{chainId:1101,address:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",decimals:8,symbol:"WBTC",name:"Wrapped BTC",icon:"https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q"},"0xa2036f0538221a77a3937f1379699f44945018d0":{chainId:1101,address:"0xa2036f0538221a77a3937f1379699f44945018d0",decimals:18,symbol:"MATIC",name:"Matic Token",icon:"https://ipfs.near.social/ipfs/bafkreih5yowurclpyrr5bwzonh76ywld22riv4mjp2scne6ye7746dcjl4"},"0x1E4a5963aBFD975d8c9021ce480b42188849D41d":{chainId:1101,address:"0x1E4a5963aBFD975d8c9021ce480b42188849D41d",decimals:6,symbol:"USDT",name:"Tether USD",icon:"https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i"},"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4":{chainId:1101,address:"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",decimals:18,symbol:"DAI",name:"Dai Stablecoin",icon:"https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu"}};d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],d["0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1"],d["0xa2036f0538221a77a3937f1379699f44945018d0"],d["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"],d["0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],d["0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1"],d["0xa2036f0538221a77a3937f1379699f44945018d0"],d["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"],d["0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],d["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"]},48201:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>f});var i=t(20997),d=t(97626);t(16689);var s=t(57518),c=t.n(s),o=t(90999),l=t(48628),r=t(20307),p=t(29951),b=e([d,o,l,r]);[d,o,l,r]=b.then?(await b)():b;let m=c().div.withConfig({componentId:"sc-9204bc30-0"})`
  margin-bottom: 20px;
  background: rgba(27, 30, 39, 1);
  border-radius: 12px;
  padding: 22px 12px 1px 12px;
`,u=c().img.withConfig({componentId:"sc-9204bc30-1"})`
  width: 20px;
  height: 20px;
`,f=({item:e,onCloseModal:a})=>{console.info("bridge-props:",e);let t=(e=>{try{let a=JSON.parse(e);if(Array.isArray(a))return a.join(" - ");return console.error("Parsed action_tokens is not an array"),"Invalid action_tokens"}catch(e){return console.error("Error parsing action_tokens:",e),"Invalid action_tokens"}})(e.action_tokens),n=p.O8.find(e=>e.symbol===t),{tokenBalance:s,isError:c,isLoading:b,update:f}=(0,l.Z)(n?.address||"native",n?.decimals||0);return(0,i.jsxs)(o.IX,{title:"Bridge",onClose:a,children:[(0,i.jsxs)(m,{children:[(0,i.jsxs)(o.gK,{title:"Dapp",children:[i.jsx(u,{src:p.q0[e.template],style:{marginRight:"5px"}}),e?.template==="native bridge"?"Native Bridge":e?.template]}),(0,i.jsxs)(o.gK,{title:"Suggestion",children:[e?.action_amount,t]}),(0,i.jsxs)(o.gK,{title:"Your balance",children:[s?(0,d.default)(s).toFixed(4,0):""," ",t]}),i.jsx(o.gK,{title:"From",children:e?.token_in_currency}),i.jsx(o.gK,{title:"To",children:e?.token_out_currency})]}),i.jsx(r.Z,{maxInputBalance:Number(s||0),token:n,updateBalance:f})]})};n()}catch(e){n(e)}})},20311:(e,a,t)=>{t.d(a,{O8:()=>i,q0:()=>n});let n={"Pancake Swap":"https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4",Gamma:"https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa",QuickSwap:"https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa",Balancer:"https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m"},i=[{address:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",chainId:1101,symbol:"WETH",decimals:18,logoURI:"https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295"},{address:"0xa2036f0538221a77a3937f1379699f44945018d0",chainId:1101,symbol:"MATIC",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"},{address:"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",chainId:1101,symbol:"DAI",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508"},{address:"0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",chainId:1101,symbol:"USDC",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"},{address:"0x1E4a5963aBFD975d8c9021ce480b42188849D41d",chainId:1101,symbol:"USDT",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"},{address:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",chainId:1101,symbol:"WBTC",decimals:8,extra:!0,logoURI:"https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744"}],d={native:{chainId:1101,address:"native",decimals:18,symbol:"ETH",name:"Ether",icon:"https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq"},"0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":{chainId:1101,address:"0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",decimals:6,symbol:"USDC",name:"USD Coin",icon:"https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla"},"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":{chainId:1101,address:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",decimals:18,symbol:"WETH",name:"Wrapped Ether",icon:"https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4"},"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":{chainId:1101,address:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",decimals:8,symbol:"WBTC",name:"Wrapped BTC",icon:"https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q"},"0xa2036f0538221a77a3937f1379699f44945018d0":{chainId:1101,address:"0xa2036f0538221a77a3937f1379699f44945018d0",decimals:18,symbol:"MATIC",name:"Matic Token",icon:"https://ipfs.near.social/ipfs/bafkreih5yowurclpyrr5bwzonh76ywld22riv4mjp2scne6ye7746dcjl4"},"0x1E4a5963aBFD975d8c9021ce480b42188849D41d":{chainId:1101,address:"0x1E4a5963aBFD975d8c9021ce480b42188849D41d",decimals:6,symbol:"USDT",name:"Tether USD",icon:"https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i"},"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4":{chainId:1101,address:"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",decimals:18,symbol:"DAI",name:"Dai Stablecoin",icon:"https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu"}};d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],d["0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1"],d["0xa2036f0538221a77a3937f1379699f44945018d0"],d["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"],d["0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],d["0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1"],d["0xa2036f0538221a77a3937f1379699f44945018d0"],d["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"],d["0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d.native,d["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],d["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],d["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"]},819:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>f});var i=t(20997),d=t(97626);t(16689);var s=t(57518),c=t.n(s),o=t(90999),l=t(48628),r=t(20311),p=t(26396),b=e([d,o,l,p]);[d,o,l,p]=b.then?(await b)():b;let m=c().div.withConfig({componentId:"sc-8a1c2bec-0"})`
  margin-bottom: 20px;
  background: rgba(27, 30, 39, 1);
  border-radius: 12px;
  padding: 22px 12px 1px 12px;
`,u=c().img.withConfig({componentId:"sc-8a1c2bec-1"})`
  width: 20px;
  height: 20px;
`,f=({item:e,onCloseModal:a})=>{let t,n,s;let c=JSON.parse(e.action_tokens),b=c[0],f=c[1],x=r.O8.find(e=>e.symbol===b),h=r.O8.find(e=>e.symbol===f);console.info("gamma props:",e);let{tokenBalance:g,update:U}=(0,l.Z)(x?.address||"",x?.decimals||0),{tokenBalance:y,update:V}=(0,l.Z)(h?.address||"",h?.decimals||0),{extra_data:k}=e;if(k){let e=JSON.parse(k);t=e.amount0,n=e.amount1,s=e.pairId}return(0,i.jsxs)(o.IX,{title:"Add Liquidity",onClose:a,children:[(0,i.jsxs)(m,{children:[(0,i.jsxs)(o.gK,{title:"Dapp",children:[i.jsx(u,{src:r.q0[e.template],style:{marginRight:"5px"}}),e.template]}),(0,i.jsxs)(o.gK,{title:"Suggestion",children:[t?(0,d.default)(t).toFixed(4,0):""," ",b," + \xa0",n?(0,d.default)(n).toFixed(4,0):""," ",f]}),(0,i.jsxs)(o.gK,{title:"Your balance",children:[g?(0,d.default)(g).toFixed(4,0):""," ",b," + \xa0",y?(0,d.default)(y).toFixed(4,0):""," ",f]}),i.jsx(o.gK,{title:"Pool",children:e.action_tokens&&"string"==typeof e.action_tokens&&(e=>{try{let a=JSON.parse(e);if(Array.isArray(a))return a.join(" - ");return console.error("Parsed action_tokens is not an array"),"Invalid action_tokens"}catch(e){return console.error("Error parsing action_tokens:",e),"Invalid action_tokens"}})(e.action_tokens)}),i.jsx(o.gK,{title:"To",children:"Polygon zkEVM"})]}),i.jsx(p.Z,{pairId:s,token0Bal:g,token1Bal:y,token0:b,token1:f,decimals0:x?.decimals||0,decimals1:h?.decimals||0})]})};n()}catch(e){n(e)}})},26396:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>U});var i=t(20997),d=t(97626),s=t(71982),c=t(16689),o=t(57518),l=t.n(o),r=t(90999),p=t(8433),b=t(41045),m=t(14300),u=e([d,r,p,b,m]);[d,r,p,b,m]=u.then?(await u)():u;let f=l().div.withConfig({componentId:"sc-5131e12d-0"})`
  display: block;
  .w-100 {
    width: 100%;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .br-10 {
    border-radius: 10px;
  }
  .input-section {
    display: flex;
    margin-bottom: 15px;
  }
  .foot-section {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .icon-plus {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #979abe;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
  }
`,x=l().div.withConfig({componentId:"sc-5131e12d-1"})`
  /* width: 70%; */
  position: relative;
  input {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: transparent;
    border: 1px solid rgba(235, 244, 121, 0.2);
    padding-right: 24px;
    border-radius: 12px;
    padding: 16px 56px 16px 16px;
    color: #ffffff;
    background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
  }
  input:focus {
    outline: none;
    color: #ffffff;
    border: 1px solid rgba(235, 244, 121, 0.2);
    background: none;
  }
  span {
    font-size: 14px;
    color: rgba(151, 154, 190, 1);
    position: absolute;
    right: 12px;
    top: 14px;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;l().span.withConfig({componentId:"sc-5131e12d-2"})`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 8px 0;
`;let h={Chef:"0x1e2d8f84605d32a2cbf302e30bfd2387badf35dd",DAI:"0xc5015b9d9161dca7e18e32f6f25c4ad850731fd4",MATIC:"0xa2036f0538221a77a3937f1379699f44945018d0","N MATIC-USDC":"0x19f4ebc0a1744b93a355c2320899276ae7f79ee5","N USDC-WBTC":"0x9783c45564232c0aff8dc550a9c247c42e8c8b98","N WETH-MATIC":"0x2f39293c9ed046822c014143fb18d5ae0479be93","N WETH-USDC":"0x04c6b11e1ffe1f1032bd62adb343c9d07767489c","N WETH-WBTC":"0x1cc4ee0cb063e9db36e51f5d67218ff1f8dbfa0f",USDC:"0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035","USDC-DAI":"0xafad6e114cfbc8a19e91b8d7d04da740a7698595",USDT:"0x1e4a5963abfd975d8c9021ce480b42188849d41d","USDT-DAI":"0xcd36b8a47a072e3e05e894b6ec89d294bec3d3ed","USDT-USDC":"0x145d55ae4848f9782efcac785a655e3e5dce1bcd","W MATIC-USDC":"0x8462e4173d63f8769f94bf7ae5bc1ac7ab5d96e3","W USDC-WBTC":"0x83de646a7125ac04950fea7e322481d4be66c71d","W WETH-MATIC":"0x5ada298913d53aa823824de69b4a6e790aed9327","W WETH-USDC":"0xfb3a24c0f289e695ceb87b32fc18a2b8bd896167","W WETH-WBTC":"0x64e78e990b2a45fad8b64b43e62a67d69a156042",WBTC:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",WETH:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",stMATIC:"0x83b874c1e09d316059d929da402dcb1a98e92082","stMATIC-MATIC":"0x9616052273a598bc04bd1ad7f7a753157c24f77e"},g="0x8480199e5d711399abb4d51bda329e064c89ad77",U=({pairId:e,token0Bal:a,token1Bal:t,token0:n,token1:o,decimals0:l,decimals1:u})=>{let{account:U,provider:y,chainId:V}=(0,p.Z)(),k=(0,m.Z)(),{addAction:N}=(0,b.Z)("all-in-one"),[T,Z]=(0,c.useState)(!1),[F,R]=(0,c.useState)(""),[w,S]=(0,c.useState)(""),[W,E]=(0,c.useState)(!0),[j,z]=(0,c.useState)(!0),[v,M]=(0,c.useState)(!1),[D,Q]=(0,c.useState)(!1),[B,I]=(0,c.useState)(!1),[C,Y]=(0,c.useState)(""),J=h[e],G=Number(F)>Number(a)||Number(w)>Number(t),H=(e,a)=>{let t=new d.default(s.utils.parseUnits(e,l).toString()),i=new d.default(s.utils.parseUnits(a,u).toString()),c=["function allowance(address, address) external view returns (uint256)"],r=new s.Contract(h[n],c,y);r.allowance(U,J).then(e=>{E(!new d.default(e.toString()).lt(t))}).catch(e=>console.log(e));let p=new s.Contract(h[o],c,y);p.allowance(U,J).then(e=>{z(!new d.default(e.toString()).lt(i))}).catch(e=>console.log(e))},X=(e,a)=>{let t;let n=new d.default(e[0].toString()),i=new d.default(e[1].toString());if(n.eq(0)&&i.eq(0))return"0";t=n.gt(i)?n.minus(i).div(new d.default(2)).plus(i):i.minus(n).div(new d.default(2)).plus(n);for(let e=a;e>0;e--){let s=t.div(new d.default(10).pow(a)).toFixed(e);if(n.div(new d.default(10).pow(a)).lte(s)&&i.div(new d.default(10).pow(a)).gte(s))return s}return"0"},O=e=>{let a=e?n:o,t=e?(0,d.default)(F).toFixed(l):(0,d.default)(w).toFixed(u),i=k?.loading({title:`Approve ${t} ${a}`});e?M(!0):Q(!0),Z(!0),Y(`Approving ${a}...`);let c=s.utils.parseUnits(t,e?l:u),r=new s.Contract(h[a],["function approve(address, uint) public"],y.getSigner());r.approve(J,c).then(e=>e.wait()).then(n=>{e?(E(!0),M(!1)):(z(!0),Q(!1)),Z(!1),Y(""),k?.dismiss(i),k?.success({title:"Approve Successfully!",text:`Approve ${t} ${a}`,tx:n.transactionHash})}).catch(e=>{I(!0),Z(!1),Y(e),M(!1),Q(!1),k?.dismiss(i),k?.fail({title:"Approve Failed!",text:e?.message?.includes("user rejected transaction")?"User rejected transaction":`Approve ${t} ${a}`})})};return(0,i.jsxs)(f,{children:[(0,i.jsxs)("div",{className:"input-section",children:[(0,i.jsxs)(x,{children:[i.jsx("input",{type:"number",value:F,onChange:e=>{let a=e.target.value;if(R(a),0===Number(a)){S(""),E(!0),z(!0);return}Z(!0),I(!1),Y("Computing deposit amount...");let t=s.utils.parseUnits(a,l).toString(),i=new s.Contract(g,["function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)"],y);i.getDepositAmount(J,h[n],t).then(e=>{let t=X(e,u);S(t),Z(!1),H(a,t)}).catch(e=>{console.info("getDepositAmountError===",e),Z(!0),I(!0),S(0),Y("Something went wrong. Please try again.")})}}),i.jsx("span",{children:n})]}),i.jsx("span",{className:"icon-plus",children:"+"}),(0,i.jsxs)(x,{children:[i.jsx("input",{type:"number",value:w,onChange:e=>{let a=e.target.value;if(S(a),0===Number(a)){R(""),E(!0),z(!0);return}Z(!0),I(!1),Y("Computing deposit amount...");let t=s.utils.parseUnits(a,u).toString(),n=new s.Contract(g,["function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)"],y);n.getDepositAmount(J,h[o],t).then(e=>{let t=X(e,l);R(t),Z(!1),H(t,a)}).catch(e=>{Z(!0),I(!0),R(0),Y("Something went wrong. Please try again.")})}}),i.jsx("span",{children:o})]})]}),i.jsx("div",{className:"foot-section",children:G?i.jsx(r.Yd,{className:"w-100",disabled:!0,label:"InSufficient Balance",size:"large"}):W&&j&&!v&&!D?i.jsx(r.Yd,{className:"w-100",disabled:T||!F||!w,onClick:()=>{let a=k?.loading({title:"Depositing..."});Z(!0),I(!1),Y("Depositing...");let t=s.utils.parseUnits(F,l),i=s.utils.parseUnits(w,u),d=new s.Contract(g,["function deposit(uint256, uint256,address,address,uint256[4] memory)  external returns (uint256)"],y.getSigner());d.deposit(t,i,U,J,[0,0,0,0]).then(e=>e.wait()).then(t=>{let{status:i,transactionHash:d}=t;N?.({type:"Liquidity",action:"Deposit",token0:n,token1:o,amount:F,template:"Gamma",status:i,add:!0,transactionHash:d,extra_data:JSON.stringify({amount0:F,amount1:w,pairId:e})}),Z(!1),k?.dismiss(a),k?.success({title:"Deposit Successfully!"})}).catch(e=>{I(!0),Z(!1),Y(e),k?.dismiss(a),k?.fail({title:"Deposit Failed!",text:e?.message?.includes("user rejected transaction")?"User rejected transaction":""})})},loading:T,label:"Deposit",size:"large"}):(0,i.jsxs)(i.Fragment,{children:[i.jsx(r.Yd,{className:"flex-grow",disabled:W||v,onClick:()=>O(!0),loading:v,label:`${W?"Approved":"Approve"} ${n}`,size:"large"}),i.jsx(r.Yd,{className:"flex-grow",disabled:j||D,onClick:()=>O(!1),loading:D,label:`${j?"Approved":"Approve"} ${o}`,size:"large"})]})})]})};n()}catch(e){n(e)}})},83211:(e,a,t)=>{t.d(a,{E0:()=>o,IZ:()=>m,Kx:()=>c,O8:()=>p,US:()=>d,nc:()=>i,q0:()=>n,tG:()=>s,v0:()=>r,zi:()=>l});let n={"Pancake Swap":"https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4",Gamma:"https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa",QuickSwap:"https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa",Balancer:"https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m"},i=[{inputs:[{internalType:"bytes",name:"path",type:"bytes"},{internalType:"uint256",name:"amountIn",type:"uint256"}],name:"quoteExactInput",outputs:[{internalType:"uint256",name:"amountOut",type:"uint256"},{internalType:"uint16[]",name:"fees",type:"uint16[]"}],stateMutability:"nonpayable",type:"function"}],d="0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D",s="0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",c=[{constant:!1,inputs:[],name:"deposit",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{internalType:"uint256",name:"wad",type:"uint256"}],name:"withdraw",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"}],o=[{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_spender",type:"address"}],name:"allowance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}],l=[{constant:!1,inputs:[{name:"_spender",type:"address"},{name:"_value",type:"uint256"}],name:"approve",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"}],r=[{inputs:[{internalType:"bytes[]",name:"data",type:"bytes[]"}],name:"multicall",outputs:[{internalType:"bytes[]",name:"results",type:"bytes[]"}],stateMutability:"payable",type:"function"},{inputs:[{components:[{internalType:"address",name:"tokenIn",type:"address"},{internalType:"address",name:"tokenOut",type:"address"},{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"uint256",name:"amountOutMinimum",type:"uint256"},{internalType:"uint160",name:"limitSqrtPrice",type:"uint160"}],internalType:"struct ISwapRouter.ExactInputSingleParams",name:"params",type:"tuple"}],name:"exactInputSingle",outputs:[{internalType:"uint256",name:"amountOut",type:"uint256"}],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"amountMinimum",type:"uint256"},{internalType:"address",name:"recipient",type:"address"}],name:"unwrapWNativeToken",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"uint256",name:"amountOutMin",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"}],name:"swapExactTokensForTokens",outputs:[{internalType:"uint256",name:"amountOut",type:"uint256"}],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"amountMinimum",type:"uint256"},{internalType:"address",name:"recipient",type:"address"}],name:"unwrapWETH9",outputs:[],stateMutability:"payable",type:"function"}],p=[{address:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",chainId:1101,symbol:"WETH",decimals:18,logoURI:"https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295"},{address:"0xa2036f0538221a77a3937f1379699f44945018d0",chainId:1101,symbol:"MATIC",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"},{address:"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",chainId:1101,symbol:"DAI",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508"},{address:"0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",chainId:1101,symbol:"USDC",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"},{address:"0x1E4a5963aBFD975d8c9021ce480b42188849D41d",chainId:1101,symbol:"USDT",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"},{address:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",chainId:1101,symbol:"WBTC",decimals:8,extra:!0,logoURI:"https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744"}],b={native:{chainId:1101,address:"native",decimals:18,symbol:"ETH",name:"Ether",icon:"https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq"},"0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":{chainId:1101,address:"0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",decimals:6,symbol:"USDC",name:"USD Coin",icon:"https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla"},"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":{chainId:1101,address:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",decimals:18,symbol:"WETH",name:"Wrapped Ether",icon:"https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4"},"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":{chainId:1101,address:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",decimals:8,symbol:"WBTC",name:"Wrapped BTC",icon:"https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q"},"0xa2036f0538221a77a3937f1379699f44945018d0":{chainId:1101,address:"0xa2036f0538221a77a3937f1379699f44945018d0",decimals:18,symbol:"MATIC",name:"Matic Token",icon:"https://ipfs.near.social/ipfs/bafkreih5yowurclpyrr5bwzonh76ywld22riv4mjp2scne6ye7746dcjl4"},"0x1E4a5963aBFD975d8c9021ce480b42188849D41d":{chainId:1101,address:"0x1E4a5963aBFD975d8c9021ce480b42188849D41d",decimals:6,symbol:"USDT",name:"Tether USD",icon:"https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i"},"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4":{chainId:1101,address:"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",decimals:18,symbol:"DAI",name:"Dai Stablecoin",icon:"https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu"}},m={QuickSwap:{name:"QuickSwap",logo:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSIjMEYxMTI2Ii8+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MTUiIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FZQUFBQnplbnIwQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQWM5U1VSQlZGZ0p4VmQ3VkZSMUh2ODRnTUJNekRBOEZIRFVPUzZ2aUN4cmEyMUJnOVhDc21RMWQ4dWpFclcyNW5iY090dXV0bjkwMnJMTzhiVFdtbVV1QitxVVlabXZ6ZGN1U0NUSHdKT3RydmtBa1dFRlNoaEJuZ01ETXpFTWV6Ky80WGU3TTQ2cGYrM3ZuUHY0ZmQvdjM3M0EvM21OdTFIOVJVVkZQOHZMeTd0MWNIRFFPand5RWtQK3NKQ1FicjFlMzF4ZVhuNW01Y3FWeDI1VTVqWHBxZlRVbVRQdkRnd01kQTBQRDQ5ZWJSRkhHdEtTNTVxQ3IwV1FsWlVWWmJQWlNnZWNReU5YVXhvTWZ2eEU3U2lOSVM5bFhFdFBVRHc5b0RlQkNpNzNEWTFXMTNlT2JpcHI4cnNJSTQ3Ry9tMVRxY3BHR1Q4V2phQTFjUGp3NFdYWjJka2ZoWWFHcXNiVm5PL0M3bVB0T05udUZMRFFFQi9PTStJUisyN1hDR1ltNlBGemZSTWFXdnZ3MnBvQ2xkZmo4YUMxdGZVcHE5VmFvZ0xIWG5TQmdFRGxuUTRYL3JDMURyL2JZVU9idzQwWkV3M2ltaFlWZ3RqeHdLTHA4VUlFbGIvMmFDcU8vNmNKVmQxbXdVTmVMam95YWRLa1lzb1dBTTB0UlBNT2hpby9QLytmMG5PYnZSOFBiVG1EQ01YTTJWWVQ0bThhRDdmSEM2ZmJnd3Y5STdndjNZelZlVmFZdzNYNDQ4UEpxS3c4aHZjT25vZDUray9SMXU5R1VZMGRjMU5OaUkwS2gwNm5nOFZpV2FSY1pRY09IR2lWZXYxUzBOYlcxcENZbUpoQ0pKVXZMcW5GbktsR21DSkQwVGZrRVlyNzNDUElTakZqeVQwSmlETkdDRG5PUVpkMy9WLy9ydHV3K1N1a3JuNE9NUkUvK01YVTdGcHhDMUlTZmJYb2REcTdsVGEyMXRUVTlKTlpUY0haczJmWFNPVU0zVzlMNjBWT3Rjb040YUY0cCtCbXJKcGpRVTFERDE1OGVhTXdJTnFVcTR1TmljZm5YMjdHS3c5TVJZNFNMU3JtUldNb1M2YkRZRERFRkJjWHJ4V015azJOQUt1VlNDSmUzdG1BNnUrY3lKNXN1TUp6aG54bDhXbU1yLzhDNjljOTdhMnZ2NkF6bVl4SS9vbEZ5aFJQUnVYOUx5L3A5cHkrTEF4WmxCNkRsMzZWcXVMeTdwOGJ6U2dJQTdTRnB3MDljNTA1eFlnYVc0OWdYREl6QVZtcFppZ1o4UnIwckl3ckZ6MXRhYnlBZ1FHWFVuZ1QwTzZKRk4xVDJlTHdTMFZMUzR2b0N0RkxTbUhNazRWWGRyb0xFd3poUWpLVlB6a3J3VHNsTmx4SHhUTG5DbElvYi96dlJVRVhIUitIYUgyb3FIYlN4TjJSSVVKKzVJc2oyRkw4RDh5OE93MHprMzZCajZ2dFNoUjh0ZUQxZW4rcE1KZUlDTWp3TTJ5L2VmK2N6aFR1SzZMTlQyVGdyVStQNHZtbHM0VWkzdGpUY2pXM1hNTGNSNTZIczdzVHViTm1ZUDZEczdCNFlaNWZkQmpSd3JlcUJNdGtpMFhVRUkya25MQ3dzSEhqT0NxcnE2c2RwQ0F4QzJhaUVtTWFVZlRVZE1ISXNCN2NYNDdHeGlhY2I3aUlubDRuek5FR3BLVmF3T0xiWEhJQ2ZRNG4rcDE5bUpnMGlnODNyY1c5cys4UXZMeVJmMG5KT1hRNDNXb2FhRUJPVGs0NlU1REVEVlBRNGZoZUZBd05ZTHR4Ylh4N0cvNjhiaitpRENheG41ak9Zak9oK1d3UHFvNmVVNVIrQlV0aUVreEdnN2d3Q3N5ZDh3eEtQbmdCankvTkZ6ejArQy96cDRoaFJoMHBpUUtNZ29LQ2FGRURNditkL2Q4TFRKZnk0SWg5N0oyVE9LRjRSK1dXZSs5RTdQUzdmSnhqZDlMMDFaNUUvOGw2UDdnMTR4NnNLRndQNitUSmFpU3kwbUtWdG02RjFDRVpoQUV5QXJxT0N3bzhSQ2duUWJzeWZLeVBMOGRnaDYvWTVOeVh6SHpTcU9IMmRyamFmSjBpY1RSaThiSS80ZkszbFJLRUIyZjR4allCMG1tL1ZrcEtNTU43dEFMeW9DRWhsZW9uV01URmZiQmx2TzEyVVFPQnVBRlhQUFo4ZGtnRloweTZDWEZSeWdHaUxEcTlkZXZXWHAweURNNUxDZzZVUzdWVnd1TkFJNEo1TC9tR0x0bEZBY3E5ZkxJMnR1Lzh3UUN6SVF4cGlRYUJaZ1NvVzBTZ3VibjVhMEt0VXhOdys2MnBhQzByRlo1cmpaQkNBNTgwclB1YlNyVkkyUTNhdGIvQ2x6N0N4SXdZT3ovc2RydU5NR0dBMiszZXpRMnRtajh2RzYyMTM2SnAyNFlySWtFYXVhUnhGMHMvRVhOZ2RLUVJ2VDJuSkZwOWVucGEvR2FIUlBUMjl1N2d1eGhFeWl4SUt6LzBlUjNISzN2MjVzejVrZzRKdCtTQU9SNGZtNkRDK01McXArY2NRdG8xTGlUWjE0NWp3SXYyTmd4MWJOZVNDSU00QTVnQzlURGk5MXR5Y3ZKU1VuNjRiYTlvbytoRXZXRHN0UStDNzRhWU9LRlE3djJram0wQ0RTRFlkdXBOUDlLbXBxYUQwNlpOZTRoQXRRc0tDd3RYY1JRVHlBR3k4TmRab0NJdWFZajBWdTRGVW5NTFZNNTZlR2JGblJvS1gvVlhWRlNzazBBMUFnUm9UMFcyeVFQNXExRjE2QnZWQU1rVTdCbW9uRFFNZjJmekIzNW5RMjF0N2RyTXpNelhwUXcxQWdUazV1YVdLaDJ4amU4c3lJcURXL0QwN3g5VkkwRjRzQlZNT2IwdjI3VUcybU9ib2RjcXB5dy9Bd2hJU1VsWlJrSytjNzM5eG5QWXMzZURhRStaRXNKWkQxUWNiYjdOcitpb09DTEpqSC90ZmxZZHc2U256T1hMbHkvaHUzYjVwVUNMNE45TlJucjZLamt5V1IvSGo5ZnBkdTA5Z3FxNmZqRjZaYy96SUtMU25Jd281VmpPUU43OXM5V3dNNVdNS2gzVHlyK3VkOVpFc0o4VC9uellHcjhiMVY3OEtRbGNwS09NNjFKMk5TSitML0NETlpnaGdRcmxuclIxZFhXdlhzOXYyVlZURU13Zy9qY3NXTEJnM3REUTBGMFJFUkdwUnFNeGxuUU9oNlBMNVhJMVJFWkcvbnZmdm4xbE4vS0gvRC93c3k4cHFET2lWUUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo=",routerAddress:"0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd",uniType:"v2",defaultCurrencies:{input:b.native,output:b["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"]},tokens:[b.native,b["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],b["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],b["0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1"],b["0xa2036f0538221a77a3937f1379699f44945018d0"],b["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"],b["0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4"]]},Balancer:{name:"Balancer",logo:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MzciIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MzciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FJQUFBRDhHTzJqQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQUtwU1VSQlZFZ043VmJQYnlsUkZOWStHd2xkVklTb1JnaUpZQ0ZJYWtNclltM0R3dHJLenJZci80Q0ZoYi9BUmlMK2hRWWJpVlJVR20wMHRCWmE0a2VGUkVoRTZuMDZ5Y3lZdWRQbjhlemVUU2E1Yys0NTMzZm5uUFBkT3lmcjlWb2tNTHJkYmlhVHFkVnFyVmFyMld4K2ZuN1Nqbks1M0dnMEdnd0dtODBXRG9mVmFqVzl4SjJBZ0QvdTcrOERnUURYVmZnOUZBclY2M1UrRGl3aXZqV2J6UXBEQ2E2SXhlSjhQczlITytWSFBEdzg4STEvdEt4V3EwS2hRSERqY3lMWGY1VWZDaFJabWt3bWZEUkNpaWdubENFU2lVaWxVc0ttV0NaVU94cU5DaFVBVUNkNFdQNkVhYnZkYmpRYWIyOXZ3K0dRWGxZb0ZIcTkzbVF5NlhRNjJraWNrQWtXaTBVdWx5c1dpNlBSQ0JCMnUvM3k4cElUMytsMHF0WHE0K01qSEs2dnI0UEJvRVFpNGZoc1hqbFpTNlZTRG9jRExVRncvZEdFRUpmTGxVNm5PWUFNQVdwcnRWcC9CTmxwRVRUeitaeW1ZUWpRQmpzQjdPQ0VzdE1FakE3T3pzNTJpTjNKWmJsY01uNDAxY2ZIeDhYRkJiT3c3d3dneURZTnk2UUlKaWpsOXZaMmJ4cWNmZkY0bkYwQVlKTGI5T25wQ2JwSG01WktKWHpaRHg4RFVGVFY3WGI3L1g2aUpzZ0ViTVRwZFByKy9zNVdHYldxMVdwVktoVzU5MW54V3dUajhiaGNMbGNxRld3ZlI0WEZZc0h1T0NxREJtZXoyV0F3Z0hPdjEzdjVIdjErMytQeDNOemNPSjNPcTZ1cjgvTnpob0txQms2Q1BRNDRCb1UxZytMUThVZ3NoYndwY2l3VzIwTzZMRXpDRklBb09NQi9JY1hKWlBMcjY0dmdkWUFKZ09nUm1Vd20yanhIRytpQ1U1VGxhUGdpczlrc1FqWFF5OGZnQU94R1E2Z0RCSXpMNngvV0dWQm9IRXJTekZHQkF5U1JTS0R4RC9rYXI5ZUxHNFY5T1c4SmpZS0dndTd1N3ZCdjhmejgvUHI2aWtzTkF6OE5IR0pzVTZsVW9vd2FqUWEvWDFDbHorZmJrdGgzQUlHQUEzVGdLM01mSEFna0ZQNmZRQ2d6dFAzb0tmb054cWxNdUNzc242SUFBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg==",routerAddress:"0xBA12222222228d8Ba445958a75a0704d566BF2C8",uniType:"v2",defaultCurrencies:{input:b.native,output:b["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"]},tokens:[b.native,b["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],b["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],b["0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1"],b["0xa2036f0538221a77a3937f1379699f44945018d0"],b["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"],b["0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4"]]},"Pancake Swap":{name:"Pancake Swap",logo:"https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4",factoryAddress:"0xFe8EC10Fe07A6a6f4A2584f8cD9FE232930eAF55",routerAddress:"0x89AE36E3B567b914a5E97E6488C6EB5b9C5d0231",uniType:"v2",defaultCurrencies:{input:b.native,output:b["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"]},tokens:[b.native,b["0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],b["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9"],b["0x1E4a5963aBFD975d8c9021ce480b42188849D41d"]]}}},54442:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>f});var i=t(20997),d=t(97626);t(16689);var s=t(57518),c=t.n(s),o=t(90999),l=t(48628),r=t(83211),p=t(67119),b=e([d,o,l,p]);[d,o,l,p]=b.then?(await b)():b;let m=c().div.withConfig({componentId:"sc-5b670b3e-0"})`
  margin-bottom: 20px;
  background: rgba(27, 30, 39, 1);
  border-radius: 12px;
  padding: 22px 12px 1px 12px;
`,u=c().img.withConfig({componentId:"sc-5b670b3e-1"})`
  width: 20px;
  height: 20px;
`,f=({item:e,onCloseModal:a})=>{console.info("swapmodal item: ",e);let t=e.action_title,n=t.match(/\b\s*([A-Za-z]+)\s*on\b/),s=n?n[1]:"",c=r.O8.find(e=>e.symbol===s);console.info("currencyCode:",s,"token:",c);let b=c?.address;"ETH"===s&&(b="native");let{tokenBalance:f,isError:x,isLoading:h,update:g}=(0,l.Z)(b||"",c?.decimals||0);return(0,i.jsxs)(o.IX,{title:"Swap",onClose:a,children:[(0,i.jsxs)(m,{children:[(0,i.jsxs)(o.gK,{title:"Dapp",children:[i.jsx(u,{src:r.q0[e.template],style:{marginRight:"5px"}}),e.template]}),(0,i.jsxs)(o.gK,{title:"Suggestion",children:[e?.action_amount," ",s]}),(0,i.jsxs)(o.gK,{title:"Your balance",children:[f?(0,d.default)(f).toFixed(4,0):""," ",s]}),i.jsx(o.gK,{title:"Swap pair",children:e.action_tokens&&"string"==typeof e.action_tokens&&(e=>{try{let a=JSON.parse(e);if(Array.isArray(a))return a.join(" - ");return console.error("Parsed action_tokens is not an array"),"Invalid action_tokens"}catch(e){return console.error("Error parsing action_tokens:",e),"Invalid action_tokens"}})(e.action_tokens)})]}),i.jsx(p.Z,{title:e.template,uniType:r.IZ[e?.template].uniType,currencyCode:s,inputCurrency:JSON.parse(e?.token_in_currency),inputCurrencyAmount:e.action_amount,maxInputBalance:Number(f||0),outputCurrency:JSON.parse(e?.token_out_currency),routerAddress:r.IZ[e?.template].routerAddress,wethAddress:r.tG,noPair:!1,token:c,updateBalance:g})]})};n()}catch(e){n(e)}})},67119:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>g});var i=t(20997),d=t(63043),s=t(97626),c=t(71982),o=t(16689),l=t(57518),r=t.n(l),p=t(90999),b=t(8433),m=t(41045),u=t(14300),f=t(83211),x=e([s,p,b,m,u,d]);[s,p,b,m,u,d]=x.then?(await x)():x;let h=r().div.withConfig({componentId:"sc-1e61abe1-0"})`
  display: block;
  .swap-btn {
    width: 130px;
  }
  .clickExecution-popup-btn {
    display: flex;
    gap: 10px;
    .popup-swap-input {
      /* width: 70%; */
      flex-grow: 1;
      position: relative;
      input {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: transparent;
        border: 1px solid rgba(235, 244, 121, 0.2);
        padding-right: 24px;
        border-radius: 12px;
        padding: 16px 56px 16px 16px;
        color: #ffffff;
        background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
      }
      input:focus {
        outline: none;
        color: #ffffff;
        border: 1px solid rgba(235, 244, 121, 0.2);
        background: none;
      }
      span {
        font-size: 14px;
        color: rgba(151, 154, 190, 1);
        position: absolute;
        right: 12px;
        top: 14px;
      }
    }
    .popup-swap-btn {
      width: 30%;
      margin-left: 12px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 12px;
      font-size: 16px;
      color: rgba(2, 5, 30, 1);
    }

    .disabled {
      opacity: 0.5;
    }
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`,g=({inputCurrency:e,outputCurrency:a,currencyCode:t,inputCurrencyAmount:n,maxInputBalance:l,routerAddress:r,wethAddress:x,title:g,uniType:U,updateBalance:y})=>{let{account:V,provider:k,chainId:N}=(0,b.Z)(),T=(0,u.Z)(),{addAction:Z}=(0,m.Z)("all-in-one"),[F,R]=(0,o.useState)(""),w=(0,d.Z)(F,{wait:1e3}),[S,W]=(0,o.useState)(!0),[E,j]=(0,o.useState)("Swap"),[z,v]=(0,o.useState)(!0),[M,D]=(0,o.useState)(!1),[Q,B]=(0,o.useState)(!1),[I,C]=(0,o.useState)(!1),[Y,J]=(0,o.useState)(),G=(0,o.useRef)(null),H=e?.address==="native"&&a?.address===x?1:e?.address===x&&a?.address==="native"?2:0;(0,o.useEffect)(()=>{G?.current?.focus()},[]),(0,o.useEffect)(()=>{(async()=>{if((0,s.default)(w||0).gt((0,s.default)(l||0)))W(!0),j("Insufficient Balance");else if(!w||0===w||isNaN(w))W(!0),j("Swap");else{let a=await X();console.log(" out: ",a),(0,s.default)(a).lt("0.00000000001")?(W(!0),j("Insufficient Liquidity")):(W(!1),j("Swap"),"native"!==e.address&&O())}})()},[w,l]);let X=async()=>{if(console.log("calc"),!e.address||!a.address||!w)return 0;if(H)return w;let t=(0,s.default)(w).mul(.995).toFixed(5),n=new c.utils.Interface(f.nc),i=["native"===e.address?x:e.address,"native"===a.address?x:a.address],d="0x"+i.map(e=>e.substring(2)).join(""),o=[d,c.utils.parseUnits(t,e.decimals)],l=n.encodeFunctionData("quoteExactInput",o);try{let e=await k.call({to:f.US,data:l}),t=n.decodeFunctionResult("quoteExactInput",e),i=t[0],d=(0,s.default)(i.toString()).div((0,s.default)(10).pow(a.decimals)).toFixed(18);return(0,s.default)(d).gt(.01)?d:(0,s.default)(d).toFixed(10)}catch(e){return console.error("CALL ERROR: ",e),0}},O=async()=>{let a=new c.Contract(e.address,f.E0,k.getSigner()),t=await a.allowance(V,r),n=!(0,s.default)(c.utils.formatUnits(t._hex,e.decimals)).lt((0,s.default)(w||0));v(n)};function L(t,n){t.wait().then(t=>{y();let{status:i,transactionHash:d}=t;if(console.log("tx res",t),Z?.({type:"Swap",inputCurrencyAmount:w,inputCurrency:e,outputCurrency:a,template:g,status:i,transactionHash:d,add:!0}),T?.dismiss(Y),1!==i)throw Error("");n?.(),T?.success({title:"Swap Successfully!",text:`Swaped ${w} ${e.symbol} to ${a.symbol}`,tx:d,chainId:N})}).catch(t=>{T?.fail({title:"Swap Failed!",text:`Swaped ${w} ${e.symbol} to ${a.symbol}`,chainId:N})})}let _=(e,a,t)=>{let n=new c.Contract(x,f.Kx,k.getSigner());1===e?n.deposit({value:c.utils.parseEther((0,s.default)(w).toFixed(18).toString())}).then(e=>{a?.(e)}).catch(e=>{t?.(e)}):n.withdraw(c.utils.parseEther((0,s.default)(w).toFixed(18).toString())).then(e=>{a?.(e)}).catch(e=>{t?.(e)})},A=t=>{console.info("onError",t),B(!1),j("Swap"),T?.dismiss(Y),T?.fail({title:"Swap Failed!",text:t?.message?.includes("user rejected transaction")?"User rejected transaction":`Swaped ${w} ${e.symbol} to ${a.symbol}`})};return i.jsx(h,{children:(0,i.jsxs)("div",{className:"clickExecution-popup-btn",children:[(0,i.jsxs)("div",{className:"popup-swap-input",children:[i.jsx("input",{ref:G,type:"number",value:F,onChange:e=>{let a=e.target.value?Number(e.target.value):"";R(a)},maxLength:String(l).length+2,max:l,autoComplete:"off",placeholder:n}),i.jsx("span",{children:t})]}),H?i.jsx(p.Yd,{className:"swap-btn",onClick:()=>{let t=T?.loading({title:`Swap ${w} ${e.symbol} to ${a.symbol}`});J(t),C(!0),_(H,e=>{L(e,()=>{C(!1)})},t=>{C(!1),T?.dismiss(Y),T?.fail({title:"Swap Failed!",text:t?.message?.includes("user rejected transaction")?"User rejected transaction":`Swaped ${w} ${e.symbol} to ${a.symbol}`})})},disabled:I,label:1===H?I?"Wrapping...":"Wrap":I?"Unwrapping...":"Unwrap",size:"large"}):z?i.jsx(p.Yd,{className:"swap-btn",onClick:()=>{if(S||Q)return!1;B(!0),j("Swapping...");let t=T?.loading({title:`Swap ${w} ${e.symbol} to ${a.symbol}`});if(J(t),"v2"===U){let t="native"===e.address?1:"native"===a.address?2:0,n=new s.default(Math.floor(Date.now()/1e3)).add(new s.default(1800)),i=new c.utils.Interface(f.v0);console.info("iface: ",i);let d=c.utils.parseUnits((0,s.default)(w).toFixed(e.decimals),e.decimals),o=[],l="native"===e.address?x:e.address,p="native"===a.address?x:a.address;if("QuickSwap"===g){let e=[{tokenIn:l,tokenOut:p,recipient:2===t?x:V,deadline:n.toFixed(),amountIn:d,amountOutMinimum:"0",limitSqrtPrice:0}],a=i.encodeFunctionData("exactInputSingle",e);o.push(a),2===t&&o.push(i.encodeFunctionData("unwrapWNativeToken",["0",V]))}if("Pancake Swap"===g){let e=i.encodeFunctionData("swapExactTokensForTokens",[d,"0",[l,x,p],V]);2===t&&o.push(i.encodeFunctionData("unwrapWETH9",["0",V])),o.push(e)}if(["QuickSwap","Pancake Swap"].includes(g)){let e=new c.Contract(r,f.v0,k.getSigner()),a={value:1===t?d:"0"};e.estimateGas.multicall(o,a).then(t=>{e.multicall(o,{...a,gasLimit:t}).then(e=>{console.info("tx: ",e),L(e,()=>{B(!1),j("Swap")})}).catch(e=>{console.info("multicall_error",e),A(e)})}).catch(e=>{console.info("estimateGas_error",e),A(e)})}if("Balancer"===g){let i=[[["0xa2036f0538221a77a3937f1379699f44945018d0","0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9","0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],"0xc951aebfa361e9d0063355b9e68f5fa4599aa3d1000100000000000000000017"],[["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9","0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4"],"0xa7f602cfaf75a566cb0ed110993ee81c27fa3f53000200000000000000000009"],[["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9","0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4","0x1E4a5963aBFD975d8c9021ce480b42188849D41d"],"0xe8ca7400eb61d5bdfc3f8f2ea99e687e0a4dbf78000100000000000000000019"],[["0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9","0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"],"0x53ddc1f1ef585b426c03674f278f8107f1524ade000200000000000000000012"]].filter(e=>e[0].includes(l)&&e[0].includes(p)).map(e=>e[1]),s="native"===e.address?"0x0000000000000000000000000000000000000000":e.address,o="native"===a.address?"0x0000000000000000000000000000000000000000":a.address,b=[s,o],m=[V,!1,V,!1],u=[{poolId:i[0],assetIn:s,assetOut:o,amount:d}],f={};for(let e=0;e<b.length;e++)f[b[e]]=e;let x=[];for(let e of u){let a=[e.poolId,f[e.assetIn],f[e.assetOut],e.amount,"0x"];x.push(a)}let h=[d,0],g=new c.Contract(r,[{inputs:[{internalType:"enum IVault.SwapKind",name:"kind",type:"uint8"},{components:[{internalType:"bytes32",name:"poolId",type:"bytes32"},{internalType:"uint256",name:"assetInIndex",type:"uint256"},{internalType:"uint256",name:"assetOutIndex",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"bytes",name:"userData",type:"bytes"}],internalType:"struct IVault.BatchSwapStep[]",name:"swaps",type:"tuple[]"},{internalType:"contract IAsset[]",name:"assets",type:"address[]"},{components:[{internalType:"address",name:"sender",type:"address"},{internalType:"bool",name:"fromInternalBalance",type:"bool"},{internalType:"address payable",name:"recipient",type:"address"},{internalType:"bool",name:"toInternalBalance",type:"bool"}],internalType:"struct IVault.FundManagement",name:"funds",type:"tuple"},{internalType:"int256[]",name:"limits",type:"int256[]"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"batchSwap",outputs:[{internalType:"int256[]",name:"assetDeltas",type:"int256[]"}],stateMutability:"payable",type:"function"}],k.getSigner()),U=[0,x,b,m,h,n.toFixed()],y={value:1===t?d:"0"};g.estimateGas.batchSwap(...U,y).then(e=>{g.batchSwap(...U,{...y,gasLimit:e}).then(e=>{L(e,()=>{B(!1),j("Swap")})}).catch(e=>{A(e)})}).catch(e=>{A(e)})}}},disabled:Q||S,label:E,size:"large"}):i.jsx(p.Yd,{className:"swap-btn",onClick:()=>{let a=T?.loading({title:`Approve ${w} ${e.symbol}`});if(M)return;D(!0);let t=new c.Contract(e.address,f.zi,k.getSigner());t.approve(r,c.utils.parseUnits((0,s.default)(w).toFixed(e.decimals).toString(),e.decimals)).then(t=>{t.wait().then(t=>{console.info("approve-success",t);let{status:n,transactionHash:i}=t;if(T?.dismiss(a),1!==n)throw Error("");v(!0),D(!1),T?.success({title:"Approve Successfully!",text:`Approved ${w} ${e.symbol}`,tx:i,chainId:N})})}).catch(t=>{console.info("approve-error",t),D(!1),T?.dismiss(a),T?.fail({title:"Approve Failed!",text:t?.message?.includes("user rejected transaction")?"User rejected transaction":`Approved ${w} ${e.symbol}`})})},disabled:M,label:M?" Approving...":" Approve",size:"large"})]})})};n()}catch(e){n(e)}})},41045:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>p});var i=t(16689),d=t(79878),s=t(282),c=t(78579),o=t(68489),l=t(8433),r=e([d,s,l]);function p(e){let{account:a,chainId:t}=(0,l.Z)(),n=(0,d._)(e=>e.chains),r=(0,s.s)(e=>e.uuid),p=(0,i.useCallback)(i=>{let d={};if(!t||!a)return;let s=n.find(e=>e.chain_id===t);if(console.info("addAction data: ",i),"Swap"===i.type&&(d={action_title:`Swap ${i.inputCurrency.symbol} on ${i.template}`,action_type:"Swap",action_tokens:JSON.stringify([`${i.inputCurrency.symbol}`,`${i.outputCurrency.symbol}`]),action_amount:i?.inputCurrencyAmount?i?.inputCurrencyAmount.toString():"",account_id:a,account_info:r,template:i.template,action_status:1===i.status?"Success":"Failed",tx_id:i.transactionHash,action_network_id:s.name,chain_id:t,action_switch:i.add?1:0,token_in_currency:i?.token_in_currency,token_out_currency:i?.token_out_currency}),"Bridge"===i.type)try{let e=n.find(e=>e.chain_id===i.fromChainId)||{name:"Ethereum Mainnet"},t=n.find(e=>e.chain_id===i.toChainId)||{name:"Ethereum Mainnet"};console.info("chains: ",e,t,s),d={action_title:`Bridge ${i.amount} ${i.token.symbol} to ${t?.name}`,action_type:"Bridge",action_tokens:JSON.stringify([`${i.token.symbol}`]),action_amount:i.amount,account_id:a,account_info:r,template:i.template,action_network_id:e?.name,action_switch:i.add?1:0,action_status:1===i.status?"Success":"Failed",tx_id:i.transactionHash,chain_id:i.fromChainId,to_chain_id:i.toChainId,extra_data:JSON.stringify(i.extra_data)},console.info("params:",d)}catch(e){console.info("bridge err",e)}"Lending"===i.type&&(d={action_type:"Lending",account_id:a,account_info:r,template:i.template,action_switch:i.add?1:0,action_status:1===i.status?"Success":"Failed",tx_id:i.transactionHash,action_network_id:s.name,chain_id:t},i.extra_data?.lending_actions?d.extra_data=JSON.stringify(i.extra_data):(d.action_title=`${i.action} ${Number(i.amount).toFixed(3)} ${i.token.symbol} on ${i.template}`,d.action_tokens=JSON.stringify([`${i.token.symbol}`]),d.action_amount=i.amount)),"Liquidity"===i.type&&(d={action_title:`${i.action} ${i?.token0+(i?.token1?"-"+i.token1:"")} on ${i.template}`,action_type:i.type,action_tokens:JSON.stringify([i?.token0??"",i?.token1??""]),action_amount:i.amount,account_id:a,action_network_id:s.name,account_info:r,template:i.template,action_status:1===i.status?"Success":"Failed",action_switch:i.add?1:0,tx_id:i.transactionHash,chain_id:t,extra_data:i.extra_data}),"Staking"===i.type&&(d={action_title:i.token?`${i.action} ${i.amount} ${i.token?.symbol} on ${i.template}`:"",action_type:"Staking",action_tokens:i.token?JSON.stringify([`${i.token.symbol}`]):"",action_amount:i.amount,account_id:a,account_info:r,template:i.template,action_switch:i.add?1:0,action_status:1===i.status?"Success":"Failed",tx_id:i.transactionHash,action_network_id:s?.name||i.action_network_id,chain_id:t,extra_data:i.extra_data}),"Yield"===i.type&&(d={action_title:`${i.action} ${i?.token0+(i?.token1?"-"+i.token1:"")} on ${i.template}`,action_type:i.type,action_tokens:JSON.stringify([i?.token0??"",i?.token1??""]),action_amount:i.amount,account_id:a,account_info:r,template:i.template,action_switch:i.add?1:0,action_status:1===i.status?"Success":"Failed",tx_id:i.transactionHash,action_network_id:s?.name||i.action_network_id,chain_id:t,extra_data:i.extra_data}),d.ss=(0,o.o)(`template=${i.template}&action_type=${i.type}&tx_hash=${i.transactionHash}&chain_id=${t}&time=${Math.ceil(Date.now()/1e3)}`),d.source=e,console.log("useAddAction params:",d),(0,c.v_)("/api/action/add",d)},[t,a]);return{addAction:p}}[d,s,l]=r.then?(await r)():r,n()}catch(e){n(e)}})},48628:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{Z:()=>o});var i=t(71982),d=t(16689),s=t(8433),c=e([s]);s=(c.then?(await c)():c)[0];let l=[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}];function o(e,a){let{account:t,provider:n,chainId:c}=(0,s.Z)(),[o,r]=(0,d.useState)(""),[p,b]=(0,d.useState)(!1),[m,u]=(0,d.useState)(!1),[f,x]=(0,d.useState)(0),h=async()=>{if(t&&e){b(!0);try{if("native"===e){let e=await n.getBalance(t);r(i.utils.formatEther(e))}else{let d=new i.Contract(e,l,n.getSigner()),s=await d.balanceOf(t);console.log("rawBalance: ",s),r(i.utils.formatUnits(s,a))}}catch(e){u(!0),console.info("useTokenBalance_ERROR",e)}finally{b(!1)}}};return(0,d.useEffect)(()=>{h()},[t,e,a,f,c]),{tokenBalance:o,isError:m,isLoading:p,update:()=>{x(e=>e+1)}}}n()}catch(e){n(e)}})},51685:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.r(a),t.d(a,{default:()=>h});var i,d=t(20997),s=t(97626),c=t(16689),o=t(57518),l=t(90999),r=t(51571),p=e([s,l,r]);[s,l,r]=p.then?(await p)():p;let b=o.styled.div.withConfig({componentId:"sc-782be572-0"})`
  position: relative;

  .delete-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px solid #7c7f96;
    width: 16px;
    height: 16px;

    .row-bar {
      width: 75%;
      height: 2px;
      background: #7c7f96;
      border-radius: 6px;
    }
  }

  .delete-icon:hover {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px solid #ff61d3;
    width: 16px;
    height: 16px;

    .row-bar {
      width: 75%;
      height: 2px;
      background: #ff61d3;
      border-radius: 6px;
    }
  }

  .quest-card-out {
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 4px; */
    width: 240px;
    border: 1px solid transparent;
    position: relative;
    cursor: pointer;
    .quest-card-inner {
      border-radius: 20px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      width: 250px;
      height: 108px;
      position: relative;
      text-decoration: none;
      color: #02051e;
      padding: 0px 12px;
      padding-top: 20px;

      .quest-card-name {
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        gap: 4px;
        white-space: nowrap;
        font-size: 13px;
        color: #000;

        .quest-card-name-icon {
          width: 20px;
          height: 20px;
          border-radius: 8px;
        }
      }

      .quest-card-info {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        line-height: 24px;
      }
      .trend-card-execute-mobile {
        display: none;
      }
    }
    .one-click-execution {
      display: none;
      position: absolute;
      margin: 0 14px;
      .click-execution-btn {
        cursor: pointer;
        display: inline-block;
        background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
        color: rgba(30, 32, 40, 1);
        white-space: nowrap;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        border-radius: 8px;
        margin-right: 12px;
        padding: 0 15px;
      }
      .click-execution-arrow {
        cursor: pointer;
        display: inline-block;
        border: 1px solid rgba(236, 244, 136, 1);
        /* background: linear-gradient(0deg, rgba(24, 26, 39, 0.8), rgba(24, 26, 39, 0.8)),
          linear-gradient(0deg, #ecf488, #ecf488); */
        background: rgba(24, 26, 39, 0.8);
        border-radius: 8px;
        width: 32px;
        height: 32px;
        text-align: center;
        align-items: center;
        line-height: 30px;
        img {
          width: 12px;
        }
      }
    }
    .one-clickExecution-masklayer {
      background: rgba(22, 24, 29, 1);
      opacity: 0.8;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
    }
    .one-clickExecution-popup {
      width: 450px;
      border: 1px solid rgba(55, 58, 83, 1);
      border-radius: 32px;
      background: linear-gradient(0deg, #262836, #262836), linear-gradient(0deg, #373a53, #373a53);
      padding: 20px 30px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 30;
      .clickExecution-popup-title {
        margin-bottom: 16px;
        h1 {
          font-size: 26px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          display: inline-block;
          margin: 0;
        }
        img {
          float: right;
          cursor: pointer;
        }
      }
      .clickExecution-popup-content {
        margin-bottom: 20px;
        background: rgba(27, 30, 39, 1);
        border-radius: 12px;
        padding: 22px 12px 1px 12px;
        .popup-content-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;
          img {
            width: 20px;
            height: 20px;
          }
          p {
            color: rgba(151, 154, 190, 1);
            font-size: 14px;
            font-weight: 500;
            margin: 0;
          }
          h1 {
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
      .clickExecution-popup-btn {
        display: flex;
        .popup-swap-input {
          width: 70%;
          position: relative;
          input {
            width: 100%;
            height: 48px;
            line-height: 48px;
            background: transparent;
            border: 1px solid rgba(235, 244, 121, 0.2);
            padding-right: 24px;
            border-radius: 12px;
            padding: 16px 56px 16px 16px;
            color: #ffffff;
            background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
          }
          input:focus {
            outline: none;
            color: #ffffff;
            border: 1px solid rgba(235, 244, 121, 0.2);
            background: none;
          }
          span {
            font-size: 14px;
            color: rgba(151, 154, 190, 1);
            position: absolute;
            right: 12px;
            top: 14px;
          }
        }
        .popup-swap-btn {
          width: 30%;
          margin-left: 12px;
          background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
          height: 48px;
          line-height: 48px;
          text-align: center;
          border-radius: 12px;
          font-size: 16px;
          color: rgba(2, 5, 30, 1);
        }
        .disabled {
          opacity: 0.5;
          cursor: not-allowed;
          width: 100%;
          background: rgb(255, 97, 211);
          color: #ffffff;
        }
      }
    }
  }
  .quest-card-out:hover {
    border: 1px solid rgba(235, 244, 121, 1);
    .one-click-execution {
      display: inline-block;
    }
    .quest-card-inner {
      background: linear-gradient(0deg, rgba(22, 24, 29, 0.8), rgba(22, 24, 29, 0.8)),
        linear-gradient(0deg, #ebf479, #ebf479);
      filter: blur(4px);
    }
  }

  .quest-card-execute-date {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #979abe;
    width: 240px;

    padding: 8px 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .quest-card-show-delete-icon {
      cursor: pointer;
    }
  }

  .quest-card-execute-date-number {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 1000;
  }

  .operation-filed {
    display: flex;
    align-items: center;
    gap: 8px;

    .sticky-top {
      cursor: pointer;
      color: #7c7f96;
      z-index: 0;
      :hover {
        color: #ebf479;
      }
    }
  }

  @media (max-width: 900px) {
    .quest-card-out {
      width: 100%;

      .quest-card-inner {
        background: rgba(55, 58, 83, 0.5);
        width: 100%;
        height: 80px;
        padding: 14px 12px;

        .quest-card-info {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          text-align: left;
        }

        .quest-card-name {
          transform: translateX(-0);
          left: 20px;
          color: rgba(151, 154, 190, 1);
          font-size: 14px;
          img {
            width: 18px;
            height: 18px;
          }
          .quest-card-name-icon {
            width: 18px;
            height: 18px;
          }
        }

        .trend-card-execute-mobile {
          display: inline-block;
          color: #979abe;
          font-size: 12px;
          position: absolute;
          right: 14px;
          bottom: 12px;
          border-bottom: 1px rgba(151, 154, 190, 1) solid;
        }
      }
    }

    .quest-card-execute-date {
      .quest-card-execute-date-number {
        display: none;
      }
      .quest-card-show-delete-icon {
        display: none;
      }
      .quest-card-show-delete-mobile {
        position: absolute;
        top: 16px;
        right: 16px;
      }
    }
    .delete-card {
      font-weight: 500;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(65, 68, 90, 1);
      padding: 28px 12px 18px 12px;
      background: linear-gradient(0deg, #1e202f, #1e202f), linear-gradient(0deg, #41445a, #41445a);
      .delete-card-mobile {
        display: block;
        color: #979abe;
        font-size: 16px;
        margin: 12px 0px;
        font-weight: 500;
        text-align: center;
      }
    }
  }
`,m={"native bridge":d.jsx("img",{className:"quest-card-name-icon",src:"https://ipfs.near.social/ipfs/bafkreigawbz26l7mhfewlxwnjomos6njdkchnfnw2dnb6xtzf7j2t6jdxm"}),"Pancake Swap":d.jsx("img",{className:"quest-card-name-icon ",src:"https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4"}),"0vix Lending":d.jsx("img",{className:"quest-card-name-icon ",src:"https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"}),"0vix":d.jsx("img",{className:"quest-card-name-icon ",src:"https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"}),Gamma:d.jsx("img",{className:"quest-card-name-icon ",src:"https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa"}),QuickSwap:d.jsx("img",{className:"quest-card-name-icon ",src:"https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa"}),Balancer:d.jsx("img",{className:"quest-card-name-icon ",src:"https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m"})},u=(0,d.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("path",{d:"M8 4L2 8.52941M8 4L14 8.52941M8 4V15",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),d.jsx("path",{d:"M1 1H15",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),f=[{address:"0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",chainId:1101,symbol:"WETH",decimals:18,logoURI:"https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295"},{address:"0xa2036f0538221a77a3937f1379699f44945018d0",chainId:1101,symbol:"MATIC",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"},{address:"0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",chainId:1101,symbol:"DAI",extra:!0,decimals:18,logoURI:"https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508"},{address:"0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",chainId:1101,symbol:"USDC",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"},{address:"0x1E4a5963aBFD975d8c9021ce480b42188849D41d",chainId:1101,symbol:"USDT",decimals:6,logoURI:"https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"},{address:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",chainId:1101,symbol:"WBTC",decimals:8,extra:!0,logoURI:"https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744"}];!function(e){e.SWAP="SWAP",e.NATIVE_BRIDGE="NATIVE_BRIDGE",e.GAMMA="GAMMA"}(i||(i={}));let x=e=>{let{isInMoreList:a,onStickyTop:t,item:n,onDelete:i}=e,[s,o]=(0,c.useState)(!1),[r,p]=(0,c.useState)(!1),[x,h]=(0,c.useState)("0"),[g,U]=(0,c.useState)(""),[y,V]=(0,c.useState)({}),[k,N]=(0,c.useState)(!1),[T,Z]=(0,c.useState)(!1),[F,R]=(0,c.useState)(!1),[w,S]=(0,c.useState)(!1),[W,E]=(0,c.useState)(),j="";if(!n)return null;let z=n.action_title.split(/\s+/),[v,M,D,Q,B,I]=z,C="bridge"===z[0].toLowerCase(),Y="swap"===z[0].toLowerCase(),J="supply"===z[0].toLowerCase(),G="borrow"===z[0].toLowerCase(),H="repay"===z[0].toLowerCase(),X="withdraw"===z[0].toLowerCase(),O="deposit"===z[0].toLowerCase(),L=X&&z?.[3]?.toLowerCase()==="gamma";C&&(j="/guessme.near/widget/ZKEVMSwap.zkevm-bridge?source=quest-card"),Y&&(j="/guessme.near/widget/ZKEVMSwap.zkevm-swap?source=quest-card"),O&&(j="/guessme.near/widget/ZKEVM.GAMMA?tab=deposit"),L&&(j="/guessme.near/widget/ZKEVM.GAMMA?tab=withdraw"),(J||X&&!L)&&(j="/bluebiu.near/widget/0vix.Lending?tab=supply"),(G||H)&&(j="/bluebiu.near/widget/0vix.Lending?tab=borrow");let _=n.action_title,A=n.action_title,q=A.match(/\b\s*([A-Za-z]+)\s*on\b/),K=q?q[1]:"",P=(e=>{let a=e.split(/\s+/),t=a.findIndex(e=>!isNaN(e)||!isNaN(e.substring(1)));return t})(n.action_title);if(P>-1){let e=n.action_title.split(/\s+/),a=n.action_title.split(/\s+/)[P];_=(0,d.jsxs)(d.Fragment,{children:[" ",e.slice(0,P).join(" ")," ",(0,d.jsxs)("span",{style:{color:"#7C7F96"},children:[a," "]})," ",e.slice(P+1,e.length).join(" ")]}),A=(0,d.jsxs)(d.Fragment,{children:[a," ",K]})}f.find(e=>e.symbol===K);let $=()=>{console.info("item.template: ",n.template),["Pancake Swap","QuickSwap","Balancer"].includes(n?.template)&&(E("SWAP"),Z(!0)),n?.template==="native bridge"&&(E("NATIVE_BRIDGE"),S(!0)),n?.template==="Gamma"&&(E("GAMMA"),R(!0))};return(0,d.jsxs)(b,{children:[(0,d.jsxs)("div",{className:"quest-card-out",children:[(0,d.jsxs)("div",{className:"quest-card-inner",style:{background:a?"#373A53":"",color:a?"white":""},children:[d.jsx("div",{className:"quest-card-info",children:_}),(0,d.jsxs)("div",{className:"quest-card-name",children:[n.template&&m[n.template]," ",n?.template==="native bridge"?"Native Bridge":n?.template]}),(0,d.jsxs)("div",{className:"trend-card-execute-mobile",children:[n.count_number," times"]})]}),(0,d.jsxs)("div",{className:"one-click-execution",children:[d.jsx("div",{className:"click-execution-btn",onClick:()=>$(),children:"One-Click Execution"}),d.jsx("a",{className:"click-execution-arrow",href:j,children:d.jsx("img",{src:"https://ipfs.near.social/ipfs/bafkreiaintqynrr22hf6vcvvqul7qfwpncvoryt5d4vk6ma4w6bum6rypi",alt:""})})]})]}),(0,d.jsxs)("div",{className:"quest-card-execute-date",children:[(0,d.jsxs)("span",{className:"quest-card-execute-date-number",children:["My Execution",d.jsx("span",{children:n.count_number})]}),(0,d.jsxs)("div",{className:"operation-filed",children:[a&&d.jsx("div",{className:"sticky-top",onClick:()=>{t()},children:u}),d.jsx("div",{className:"delete-icon",onClick:()=>{i(n.action_id)},children:d.jsx("div",{className:"row-bar"})})]})]}),T&&"SWAP"===W?d.jsx(l.Vp,{item:n,onCloseModal:()=>Z(!1)}):null,w&&"NATIVE_BRIDGE"===W?d.jsx(l.fg,{item:n,onCloseModal:()=>S(!1)}):null,F&&"GAMMA"===W?d.jsx(l.ji,{item:n,onCloseModal:()=>R(!1)}):null]})};x.getLayout=r.wQ;let h=x;n()}catch(e){n(e)}})},282:(e,a,t)=>{t.a(e,async(e,n)=>{try{t.d(a,{s:()=>o});var i=t(46555),d=t(69890),s=t(43602),c=e([i,d,s]);[i,d,s]=c.then?(await c)():c;let o=(0,d.create)((0,s.persist)((e,a)=>({uuid:(0,i.v4)()}),{name:"_uuid",version:.1,storage:(0,s.createJSONStorage)(()=>localStorage)}));n()}catch(e){n(e)}})},68489:(e,a,t)=>{t.d(a,{o:()=>s});var n=t(6113),i=t.n(n);let d="01234567890123450123456789012345",s=e=>{if(!d)return;let a=i().randomBytes(16),t=i().createCipheriv("aes-256-cbc",Buffer.from(d),a),n=t.update(e,"utf-8","base64");return n+=t.final("base64"),a.toString("base64")+n}}};