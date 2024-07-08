"use strict";exports.id=4800,exports.ids=[4800],exports.modules={41045:(t,e,i)=>{i.a(t,async(t,n)=>{try{i.d(e,{Z:()=>h});var a=i(16689),s=i(79878),o=i(282),r=i(78579),c=i(68489),d=i(8433),l=t([s,o,d]);function h(t){let{account:e,chainId:i}=(0,d.Z)(),n=(0,s._)(t=>t.chains),l=(0,o.s)(t=>t.uuid),h=(0,a.useCallback)(a=>{let s={};if(!i||!e)return;let o=n.find(t=>t.chain_id===i);if(console.info("addAction data: ",a),"Swap"===a.type&&(s={action_title:`Swap ${a.inputCurrency.symbol} on ${a.template}`,action_type:"Swap",action_tokens:JSON.stringify([`${a.inputCurrency.symbol}`,`${a.outputCurrency.symbol}`]),action_amount:a?.inputCurrencyAmount?a?.inputCurrencyAmount.toString():"",account_id:e,account_info:l,template:a.template,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:o.name,chain_id:i,action_switch:a.add?1:0,token_in_currency:a?.token_in_currency,token_out_currency:a?.token_out_currency}),"Bridge"===a.type)try{let t=n.find(t=>t.chain_id===a.fromChainId)||{name:"Ethereum Mainnet"},i=n.find(t=>t.chain_id===a.toChainId)||{name:"Ethereum Mainnet"};console.info("chains: ",t,i,o),s={action_title:`Bridge ${a.amount} ${a.token.symbol} to ${i?.name}`,action_type:"Bridge",action_tokens:JSON.stringify([`${a.token.symbol}`]),action_amount:a.amount,account_id:e,account_info:l,template:a.template,action_network_id:t?.name,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,chain_id:a.fromChainId,to_chain_id:a.toChainId,extra_data:JSON.stringify(a.extra_data)},console.info("params:",s)}catch(t){console.info("bridge err",t)}"Lending"===a.type&&(s={action_type:"Lending",account_id:e,account_info:l,template:a.template,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:o.name,chain_id:i},a.extra_data?.lending_actions?s.extra_data=JSON.stringify(a.extra_data):(s.action_title=`${a.action} ${Number(a.amount).toFixed(3)} ${a.token.symbol} on ${a.template}`,s.action_tokens=JSON.stringify([`${a.token.symbol}`]),s.action_amount=a.amount)),"Liquidity"===a.type&&(s={action_title:`${a.action} ${a?.token0+(a?.token1?"-"+a.token1:"")} on ${a.template}`,action_type:a.type,action_tokens:JSON.stringify([a?.token0??"",a?.token1??""]),action_amount:a.amount,account_id:e,action_network_id:o.name,account_info:l,template:a.template,action_status:1===a.status?"Success":"Failed",action_switch:a.add?1:0,tx_id:a.transactionHash,chain_id:i,extra_data:a.extra_data}),"Staking"===a.type&&(s={action_title:a.token?`${a.action} ${a.amount} ${a.token?.symbol} on ${a.template}`:"",action_type:"Staking",action_tokens:a.token?JSON.stringify([`${a.token.symbol}`]):"",action_amount:a.amount,account_id:e,account_info:l,template:a.template,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:o?.name||a.action_network_id,chain_id:i,extra_data:a.extra_data}),"Yield"===a.type&&(s={action_title:`${a.action} ${a?.token0+(a?.token1?"-"+a.token1:"")} on ${a.template}`,action_type:a.type,action_tokens:JSON.stringify([a?.token0??"",a?.token1??""]),action_amount:a.amount,account_id:e,account_info:l,template:a.template,action_switch:a.add?1:0,action_status:1===a.status?"Success":"Failed",tx_id:a.transactionHash,action_network_id:o?.name||a.action_network_id,chain_id:i,extra_data:a.extra_data}),s.ss=(0,c.o)(`template=${a.template}&action_type=${a.type}&tx_hash=${a.transactionHash}&chain_id=${i}&time=${Math.ceil(Date.now()/1e3)}`),s.source=t,console.log("useAddAction params:",s),(0,r.v_)("/api/action/add",s)},[i,e]);return{addAction:h}}[s,o,d]=l.then?(await l)():l,n()}catch(t){n(t)}})},282:(t,e,i)=>{i.a(t,async(t,n)=>{try{i.d(e,{s:()=>c});var a=i(46555),s=i(69890),o=i(43602),r=t([a,s,o]);[a,s,o]=r.then?(await r)():r;let c=(0,s.create)((0,o.persist)((t,e)=>({uuid:(0,a.v4)()}),{name:"_uuid",version:.1,storage:(0,o.createJSONStorage)(()=>localStorage)}));n()}catch(t){n(t)}})},54146:(t,e,i)=>{i.d(e,{k:()=>n});function n(t){if(!t)return"";let e=new Date(t),i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()],n=e.getDate(),a=e.getFullYear(),s=e.getHours(),o=t=>t>=10?t:"0"+t,r=e.getMinutes();return`${i} ${n}, ${a} ${o(s%12)}:${o(r)} ${s>11?"PM":"AM"}`}},68489:(t,e,i)=>{i.d(e,{o:()=>o});var n=i(6113),a=i.n(n);let s="01234567890123450123456789012345",o=t=>{if(!s)return;let e=a().randomBytes(16),i=a().createCipheriv("aes-256-cbc",Buffer.from(s),e),n=i.update(t,"utf-8","base64");return n+=i.final("base64"),e.toString("base64")+n}},56358:(t,e,i)=>{i.d(e,{K:()=>a,o:()=>s});var n=i(20997);function a(){return n.jsx("svg",{width:"12",height:"7",viewBox:"0 0 12 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M1 1L6 5L11 1",stroke:"#979ABE","stroke-width":"2","stroke-linecap":"round"})})}function s(){return n.jsx("svg",{width:"7",height:"12",viewBox:"0 0 7 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M1 11L5 6L1 1",stroke:"#979ABE","stroke-width":"2","stroke-linecap":"round"})})}},55564:(t,e,i)=>{i.d(e,{Z:()=>d});var n=i(20997),a=i(57518),s=i.n(a);let o=s().div.withConfig({componentId:"sc-43503b82-0"})`
  font-size: 22px;
  font-weight: 700;
  line-height: 26.4px;
  color: #fff;
`,r=s().div.withConfig({componentId:"sc-43503b82-1"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 20px;
`,c=s().div.withConfig({componentId:"sc-43503b82-2"})`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  color: rgba(151, 154, 190, 1);
`;function d({title:t,subTitle:e,renderAction:i}){return(0,n.jsxs)("div",{children:[n.jsx(o,{children:t}),(0,n.jsxs)(r,{children:[n.jsx(c,{children:e}),i&&i()]})]})}},48870:(t,e,i)=>{i.a(t,async(t,n)=>{try{i.d(e,{Z:()=>p});var a=i(20997),s=i(57518),o=i.n(s),r=i(63043),c=i(21004),d=i(14300),l=i(54146),h=i(16689),x=t([c,d,r]);[c,d,r]=x.then?(await x)():x;let f=o().div.withConfig({componentId:"sc-c1f89ba0-0"})`
    background-color: rgba(38, 40, 54, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    position: absolute;
    width: 1234px;
    margin-bottom: 100px;
    height: 670px;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    z-index: 11;
`,u=o().div.withConfig({componentId:"sc-c1f89ba0-1"})`
    height: 164px;
    position: relative;
    border-bottom: 1px solid rgba(55, 58, 83, 1);
    .back {
        cursor: pointer;
        position: absolute;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: rgba(151, 154, 190, 1);
        display: flex;
        align-items: center;
        gap: 10px;
        top: 40px;
        left: 65px;
    }
    .trans-title {
        font-size: 26px;
        font-weight: 700;
        line-height: 31.2px;
        color: #fff;
        text-align: center;
        padding-top: 50px;
    }
    .trans-input-wapper {
        width: 480px;
        height: 44px;
        border-radius: 8px;
        padding: 0 10px;
        border: 1px solid rgba(55, 58, 83, 1);
        margin: 20px auto;
        display: flex;
        align-items: center;
        background-color: rgba(27, 30, 39, 1);
        gap: 10px;
        input {
            color: #fff;
            flex: 1;
        }
    }
`,g=o().div.withConfig({componentId:"sc-c1f89ba0-2"})`
    overflow: auto;
    padding: 0 66px;
    height: 500px;
    overflow: auto;
    table  {
        width: 100%;
        margin-top: 20px;
        thead {
            th {
                font-size: 14px;
                font-weight: 400;
                line-height: 16.8px;
                color: rgba(124, 127, 150, 1);
                padding: 10px 0;
            }
        }
        tbody {
            td {
                vertical-align: top;
                border-bottom: 1px solid rgba(52, 56, 56, 1);
                padding: 10px 0;
                .flex-line {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    .hash {
                        font-size: 16px;
                        color: #fff;
                    }
                    &.second {
                        margin-top: 5px;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 16.8px;
                        color: rgba(124, 127, 150, 1);
                    }
                    .icon {
                        width: 22px;
                        height: 22px;
                        border-radius: 22px;
                    }
                    .trans-chain-name {
                        color: #fff;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 19.2px;
                    }
                    .amount {
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 16.8px;
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .status-2 {
                    color: rgba(51, 197, 244, 1);
                }
                .status-3 {
                    color: rgba(111, 190, 62, 1);
                }
                .j-end {
                    /* justify-content: end; */
                }
                .hash-copy {
                    cursor: pointer;
                }
            }
        }
    }
`,m=()=>a.jsx("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{d:"M11.8536 4.35355C12.0488 4.15829 12.0488 3.84171 11.8536 3.64645L8.67157 0.464466C8.47631 0.269204 8.15973 0.269204 7.96447 0.464466C7.7692 0.659728 7.7692 0.976311 7.96447 1.17157L10.7929 4L7.96447 6.82843C7.7692 7.02369 7.7692 7.34027 7.96447 7.53553C8.15973 7.7308 8.47631 7.7308 8.67157 7.53553L11.8536 4.35355ZM0 4.5H11.5V3.5H0V4.5Z",fill:"white"})});function p({onClose:t,transactionList:e,addressOrHash:i}){let{success:n,fail:s}=(0,d.Z)(),[o,x]=(0,h.useState)(e),[p,w]=(0,h.useState)(""),C=(0,r.Z)(p,{wait:500});return(0,h.useEffect)(()=>{if(C&&e){let t=e.filter(t=>!!(t.hash.indexOf(C)>-1||t.fromAddress.indexOf(C)>-1||t.toAddress.indexOf(C)>-1));x(t)}else x(e)},[C,e]),(0,h.useEffect)(()=>{i&&w(i)},[i]),(0,a.jsxs)(f,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)("div",{className:"back",onClick:t,children:[a.jsx("svg",{width:"5",height:"8",viewBox:"0 0 5 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{d:"M4 1L1 4L4 7",stroke:"#979ABE","stroke-linecap":"round"})}),"Back"]}),a.jsx("div",{className:"trans-title",children:"My Transactions"}),(0,a.jsxs)("div",{className:"trans-input-wapper",children:[(0,a.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("circle",{cx:"8.73312",cy:"8.73311",r:"6.01829",transform:"rotate(16.6277 8.73312 8.73311)",stroke:"#979ABE","stroke-width":"2"}),a.jsx("rect",{x:"15.5457",y:"13.514",width:"6.141",height:"2.63186",rx:"1.31593",transform:"rotate(46.6277 15.5457 13.514)",fill:"#979ABE"})]}),a.jsx("input",{value:p,onChange:t=>{w(t.target.value)},placeholder:"Search by address or Tx Hash"})]})]}),a.jsx(g,{children:(0,a.jsxs)("table",{children:[a.jsx("thead",{children:(0,a.jsxs)("tr",{children:[a.jsx("th",{children:"Tx Hash"}),a.jsx("th",{children:"Bridge Direction"}),a.jsx("th",{children:"Send"}),a.jsx("th",{}),a.jsx("th",{children:"Receive"}),a.jsx("th",{children:"Status"})]})}),a.jsx("tbody",{children:o?.map(t=>a.jsxs("tr",{children:[a.jsxs("td",{children:[a.jsxs("div",{className:"flex-line",children:[a.jsx("div",{className:"hash",children:c.y9(t.hash)}),a.jsx("div",{className:"hash-copy",onClick:async()=>{try{await navigator.clipboard.writeText(t.hash),n({title:"Copy Success"})}catch(t){s({title:"Copy Fail"})}},children:a.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M4.19232 5.38462C4.19232 4.55619 4.86389 3.88462 5.69232 3.88462H11.0769C11.9054 3.88462 12.5769 4.55619 12.5769 5.38462V11C12.5769 11.8284 11.9054 12.5 11.0769 12.5H5.69232C4.86389 12.5 4.19232 11.8284 4.19232 11V5.38462ZM5.69232 4.88462C5.41618 4.88462 5.19232 5.10847 5.19232 5.38462V11C5.19232 11.2761 5.41618 11.5 5.69232 11.5H11.0769C11.3531 11.5 11.5769 11.2761 11.5769 11V5.38462C11.5769 5.10847 11.3531 4.88462 11.0769 4.88462H5.69232Z",fill:"#979ABE"}),a.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H7.38462C8.21304 0.5 8.88461 1.17157 8.88461 2V3.11538H7.88462V2C7.88462 1.72386 7.66076 1.5 7.38462 1.5H2C1.72386 1.5 1.5 1.72386 1.5 2V7.61539C1.5 7.89153 1.72386 8.11539 2 8.11539H2.84615V9.11539H2C1.17157 9.11539 0.5 8.44381 0.5 7.61539V2Z",fill:"#979ABE"})]})}),a.jsx("div",{className:"hash-copy",onClick:()=>{window.open(`${t.link}/tx/${t.hash}`)},children:a.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L8.8 13.5C9.62843 13.5 10.3 12.8284 10.3 12L10.3 9.15L9.3 9.15L9.3 12C9.3 12.2761 9.07614 12.5 8.8 12.5L2 12.5C1.72386 12.5 1.5 12.2761 1.5 12L1.5 5.2C1.5 4.92386 1.72386 4.7 2 4.7L4.85 4.7L4.85 3.7L2 3.7C1.17157 3.7 0.499999 4.37157 0.499999 5.2L0.5 12Z",fill:"#979ABE"}),a.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.5 7.50001L11.5 3.00001C11.5 2.72387 11.2762 2.50001 11 2.50001H6.50001C6.22387 2.50001 6.00001 2.72387 6.00001 3.00001C6.00001 3.27615 6.22387 3.50001 6.50001 3.50001H9.79291L5.04647 8.24645C4.85121 8.44171 4.85121 8.75829 5.04647 8.95355C5.24173 9.14881 5.55832 9.14881 5.75358 8.95355L10.5 4.20712L10.5 7.50001C10.5 7.77615 10.7239 8.00001 11 8.00001C11.2762 8.00001 11.5 7.77615 11.5 7.50001Z",fill:"#979ABE"})]})})]}),a.jsx("div",{className:"flex-line second",children:l.k(t.time)})]}),a.jsx("td",{children:a.jsxs("div",{className:"flex-line",children:[a.jsx("img",{src:t.fromChainLogo,className:"icon"}),a.jsx("div",{className:"trans-chain-name",children:t.fromChainName}),a.jsx("div",{children:a.jsx(m,{})}),a.jsx("img",{src:t.toChainLogo,className:"icon"}),a.jsx("div",{className:"trans-chain-name",children:t.toChainName})]})}),a.jsxs("td",{children:[a.jsxs("div",{className:"flex-line",children:[a.jsx("img",{src:t.fromTokenLogo,className:"icon"}),a.jsxs("div",{className:"amount",children:[c._2(t.fromAmount)," ",t.fromTokenSymbol]})]}),a.jsx("div",{className:"flex-line second",children:a.jsx("div",{children:c.y9(t.fromAddress)})})]}),a.jsx("td",{children:a.jsx(m,{})}),a.jsxs("td",{children:[a.jsxs("div",{className:"flex-line",children:[a.jsx("img",{src:t.toTokenLogo,className:"icon"}),a.jsxs("div",{className:"amount",children:[c._2(t.toAmout)," ",t.toTokenSymbol]})]}),a.jsx("div",{className:"flex-line second",children:a.jsx("div",{children:c.y9(t.toAddress)})})]}),a.jsxs("td",{children:[2===t.status&&a.jsx("div",{className:"flex-line j-end status-2",children:"Complete"}),3===t.status&&a.jsx("div",{className:"flex-line j-end status-3",children:"Processing"}),a.jsxs("div",{className:"flex-line j-end second",children:["~",t.duration,"min"]})]})]},t.hash))})]})})]})}n()}catch(t){n(t)}})},63530:(t,e,i)=>{i.a(t,async(t,n)=>{try{i.d(e,{Z:()=>g});var a=i(20997),s=i(57518),o=i.n(s),r=i(37478),c=i(11163),d=i(8433),l=i(42188),h=i(55564),x=i(56358),p=i(48870),f=i(16689),u=t([d,l,p]);[d,l,p]=u.then?(await u)():u;let m=o().div.withConfig({componentId:"sc-d46ff54b-0"})`
    background-color: rgba(38, 40, 54, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    padding: 20px;
`,w=o().div.withConfig({componentId:"sc-d46ff54b-1"})`
    display: flex;
    align-items: center;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    height: 36px;
    padding: 0 10px;
`,C=o().div.withConfig({componentId:"sc-d46ff54b-2"})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    color: #fff;
    cursor: pointer;
`,_=o().div.withConfig({componentId:"sc-d46ff54b-3"})`
    display: flex;
    align-items: center;
    gap: 10px;
`,j=o().div.withConfig({componentId:"sc-d46ff54b-4"})`
    border-left: 1px solid rgba(55, 58, 83, 1);
    height: 18px;
    margin: 0 15px;
`,v=o().div.withConfig({componentId:"sc-d46ff54b-5"})`
    height: 44px;
    background-color: rgba(27, 30, 39, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`,y=o().input.withConfig({componentId:"sc-d46ff54b-6"})`
    flex: 1;
    margin-left: 10px;
    color: #fff;
`;function g({initModalShow:t=!1,updater:e=1}){let[i,n]=(0,f.useState)(!1),[s,o]=(0,f.useState)(!1),[u,g]=(0,f.useState)([]),[b,k]=(0,f.useState)(0),[L,S]=(0,f.useState)(""),[N,$]=(0,f.useState)(""),{account:B,chainId:H,provider:A}=(0,d.Z)(),M=(0,c.useRouter)();async function I(){if(!B)return;o(!0);let t=await (0,l.fo)(),e=t.filter(t=>2!==t.status);e.forEach(t=>{(0,r.getStatus)({hash:t.hash,chainId:t.fromChainId,address:t.fromAddress,fromChainId:t.fromChainId,toChainId:t.toChainId},t.tool,A?.getSigner()).then(e=>{e?(t.status=2,(0,l.Ld)(t)):t.status=3}).catch(e=>{t.status=3})}),t.sort((t,e)=>e.time-t.time),g(t),o(!1),k(e?.length||0)}return(0,f.useEffect)(()=>{t&&n(!0)},[t]),(0,f.useEffect)(()=>{if(!B)return;I();let t=setInterval(()=>{I()},3e4);return()=>{clearInterval(t)}},[B]),(0,f.useEffect)(()=>{B&&I()},[B,e]),(0,a.jsxs)(m,{children:[a.jsx(h.Z,{title:"My transactions",subTitle:"Check real time transaction status and claim your tokens."}),(0,a.jsxs)(w,{children:[a.jsx(C,{children:(0,a.jsxs)(_,{children:[a.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M6.868 12.8004C7.65977 12.7995 8.44298 12.6366 9.16938 12.3216C9.89579 12.0066 10.55 11.5462 11.0917 10.9688C11.6335 10.3913 12.0512 9.7091 12.3193 8.96409C12.5874 8.21909 12.7001 7.42709 12.6505 6.63688C12.6008 5.84666 12.39 5.07498 12.0308 4.36936C11.6716 3.66374 11.1718 3.03913 10.5621 2.53401C9.95238 2.02889 9.24571 1.65395 8.4856 1.43229C7.72549 1.21063 6.92805 1.14695 6.1424 1.24516L5.9936 0.0547645C7.21331 -0.0987046 8.45192 0.0717428 9.58484 0.548959C10.7178 1.02617 11.705 1.79333 12.4473 2.77324C13.1896 3.75316 13.6607 4.91128 13.8133 6.1311C13.9659 7.35091 13.7946 8.5894 13.3166 9.72198C12.8385 10.8546 12.0707 11.8413 11.0902 12.5829C10.1098 13.3244 8.95133 13.7948 7.73141 13.9465C6.51149 14.0982 5.27312 13.926 4.14089 13.4471C3.53605 13.1914 2.97291 12.8529 2.46656 12.4435L1.9832 13.0643H1.9824C1.7496 13.3627 1.236 13.2035 1.1696 12.8123L0.788803 10.5803C0.777856 10.5242 0.779057 10.4664 0.792323 10.4108C0.80559 10.3552 0.830615 10.3031 0.865713 10.258C0.90081 10.2129 0.945166 10.1759 0.995792 10.1494C1.04642 10.1228 1.10214 10.1075 1.1592 10.1043L3.4176 9.9275C3.8136 9.8955 4.092 10.3547 3.86 10.6539L3.20327 11.4974C3.53468 11.7676 3.89612 12.0013 4.28148 12.1932C5.08494 12.5933 5.97042 12.8012 6.868 12.8004ZM0.1424 8.34027C0.2 8.60027 0.2616 8.84427 0.325601 9.06827L1.5272 8.72827C1.46608 8.5118 1.41139 8.29357 1.3632 8.07387C1.31833 7.86526 1.28547 7.65424 1.2648 7.44187L0.0215998 7.56187C0.0463991 7.82427 0.0872002 8.08347 0.1424 8.33787V8.34027ZM0.316 4.80427C0.139288 5.35939 0.0333843 5.93461 0.000800134 6.51627H0L1.248 6.58667C1.27461 6.10965 1.36143 5.6379 1.5064 5.18267L0.316 4.80427ZM1.9576 2.08347C1.50689 2.54127 1.12286 3.06022 0.8168 3.62507H0.8176L1.916 4.21947C2.16607 3.75786 2.47981 3.3337 2.848 2.95947L1.9576 2.08347ZM4.6448 0.392268C4.03736 0.600024 3.46193 0.891644 2.9352 1.25867L3.648 2.28347C4.07938 1.98315 4.5506 1.74458 5.048 1.57467L4.6448 0.392268ZM7.1086 2.89057C6.97357 2.75554 6.79044 2.67969 6.59948 2.67969C6.40852 2.67969 6.22539 2.75554 6.09036 2.89057C5.95534 3.0256 5.87948 3.20873 5.87948 3.39969V7.29808L8.09068 9.50848C8.1566 9.57922 8.23608 9.63596 8.3244 9.67531C8.41272 9.71467 8.50806 9.73583 8.60474 9.73753C8.70141 9.73924 8.79744 9.72145 8.88709 9.68524C8.97675 9.64903 9.05819 9.59513 9.12656 9.52676C9.19493 9.45839 9.24883 9.37695 9.28504 9.2873C9.32125 9.19765 9.33903 9.10162 9.33733 9.00494C9.33562 8.90827 9.31446 8.81293 9.27511 8.72461C9.23576 8.63629 9.17902 8.5568 9.10828 8.49088L7.31948 6.70128V3.39969C7.31948 3.20873 7.24362 3.0256 7.1086 2.89057Z",fill:"#979ABE"})}),b,"\xa0Pending"]})}),a.jsx(j,{}),(0,a.jsxs)(C,{onClick:()=>{$(L),n(!0)},children:[(0,a.jsxs)(_,{children:[(0,a.jsxs)("svg",{width:"16",height:"17",viewBox:"0 0 16 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("rect",{x:"1",y:"1",width:"14",height:"15",rx:"3",stroke:"#979ABE","stroke-width":"2"}),a.jsx("path",{d:"M5 6H11",stroke:"#979ABE","stroke-width":"2","stroke-linecap":"round"}),a.jsx("path",{d:"M5 10H9",stroke:"#979ABE","stroke-width":"2","stroke-linecap":"round"})]}),u.length,"\xa0History"]}),a.jsx("div",{children:a.jsx(x.o,{})})]})]}),(0,a.jsxs)(v,{children:[(0,a.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("circle",{cx:"8.73312",cy:"8.73311",r:"6.01829",transform:"rotate(16.6277 8.73312 8.73311)",stroke:"#979ABE","stroke-width":"2"}),a.jsx("rect",{x:"15.5457",y:"13.5139",width:"6.141",height:"2.63186",rx:"1.31593",transform:"rotate(46.6277 15.5457 13.5139)",fill:"#979ABE"})]}),a.jsx(y,{placeholder:"Search by address or Tx Hash",value:L,onChange:t=>S(t.target.value),onKeyDown:t=>{"Enter"===t.code&&($(L),n(!0),S(""))}})]}),i&&a.jsx(p.Z,{addressOrHash:N,transactionList:u,onClose:()=>{t?M.back():n(!1)}})]})}n()}catch(t){n(t)}})}};