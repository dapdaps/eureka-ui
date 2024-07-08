"use strict";exports.id=9929,exports.ids=[9929],exports.modules={14003:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/arrow.9f23fa1d.svg",height:14,width:17,blurWidth:0,blurHeight:0}},75465:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/point-1.888f15e4.svg",height:14,width:16,blurWidth:0,blurHeight:0}},78087:(e,t,n)=>{n.d(t,{Z:()=>i});let i={src:"/_next/static/media/point-2.5ef336dc.svg",height:14,width:14,blurWidth:0,blurHeight:0}},21771:(e,t,n)=>{n.d(t,{$:()=>s});var i=n(20997),a=n(57518),r=n.n(a);let o=r().span.withConfig({componentId:"sc-898cc217-0"})`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 12px;
  animation: spin 1200ms infinite linear;

  i {
    color: currentColor;
    font-size: 16px;
    line-height: 16px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;function s(){return i.jsx(o,{children:i.jsx("i",{className:"ph ph-spinner"})})}},42124:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(20997);n(16689);var a=n(57518),r=n.n(a);let o=r()("div").withConfig({componentId:"sc-503bee29-0"})`
  background-color: #37cd83;
  padding: 8px 0;
`,Text=r()("div").withConfig({componentId:"sc-503bee29-1"})`
  color: var(--slate-dark-1);
  margin-left: 24px;
`,s=r().span.withConfig({componentId:"sc-503bee29-2"})`
  text-decoration: underline;
  color: var(--blue-light-1);
  font-weight: 700;
  cursor: pointer;
`;function d({handleExitOnboarding:e}){return i.jsx(o,{className:"d-flex align-center justify-content-center",children:(0,i.jsxs)(Text,{children:["Welcome to the ",i.jsx("b",{children:"Onboarding flow"}),". You can exit anytime by\xa0",i.jsx(s,{onClick:e,children:"clicking here"})]})})}},56669:(e,t,n)=>{n.d(t,{Z:()=>p});var i=n(20997),a=n(25675),r=n.n(a);n(16689);var o=n(57518),s=n.n(o);let d={src:"/_next/static/media/vs_code_icon.095c4857.svg",height:24,width:25,blurWidth:0,blurHeight:0},l=s()("div").withConfig({componentId:"sc-26afe510-0"})`
  background-color: var(--slate-dark-3);
  padding: 8px 0;
`,Text=s()("div").withConfig({componentId:"sc-26afe510-1"})`
  color: var(--slate-dark-11);
  margin-left: 24px;
`,c=s()("a").withConfig({componentId:"sc-26afe510-2"})`
  text-decoration: underline;
  color: var(--blue-light-9);
  font-weight: 600;
`;function p({accountId:e}){let t=`vscode:extension/near-protocol.near-discovery-ide${e?`?account_id=${e}`:""}`;return(0,i.jsxs)(l,{className:"d-flex align-center justify-content-center",children:[i.jsx(r(),{src:d,alt:"VS Code"}),(0,i.jsxs)(Text,{children:["Prefer to work locally?\xa0",i.jsx(c,{href:t,target:"_blank",rel:"noopener noreferrer",children:"Download our VSCode Extension."})]})]})}},16532:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(20997);function a({forkFile:e,refs:t,disable:n}){return i.jsx("div",{className:"me-2",children:i.jsx("div",{ref:t.step1,children:i.jsx("button",{disabled:n.forkButton,className:"btn btn-outline-primary",onClick:e,children:"Fork"})})})}n(16689)},78806:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(20997),a=n(11163);function r({currentStep:e,refs:t,disable:n}){let r=(0,a.useRouter)();return i.jsx("div",{ref:t.step10,style:{height:"38px"},children:i.jsx("button",{className:"btn btn-primary",disabled:10!==e||n.onboardingPublishButton,onClick:()=>{r.push("/signup")},children:"Publish"})})}n(16689)},71471:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>s});var a=n(20997),r=n(40017),o=e([r]);function s({widgetName:e,path:t,code:n,metadata:i,disable:o,handleCommit:s,refs:d}){return a.jsx("div",{ref:d.step10,style:{height:"38px"},children:a.jsx(r.f,{className:"btn btn-primary",disabled:!e||o.publishButton,onCommit:s,data:{[t?.type]:{[e]:{"":n,metadata:i}}},children:"Publish"})})}r=(o.then?(await o)():o)[0],i()}catch(e){i(e)}})},22446:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>s});var a=n(20997),r=n(40017),o=e([r]);function s({widgetName:e,path:t,code:n,metadata:i,disable:o,handleCommit:s}){return a.jsx(r.f,{className:"btn btn-primary",disabled:!e||o.publishDraftAsMainButton,onCommit:s,data:{[t?.type]:{[e]:{"":n,metadata:i,branch:{draft:null}}}},children:"Publish"})}r=(o.then?(await o)():o)[0],i()}catch(e){i(e)}})},48199:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(20997);n(16689);var a=n(32542);function r({widgetName:e,setShowModal:t,disable:n}){return i.jsx("button",{className:"btn btn-outline-primary me-2",disabled:!e||n.saveDraftButton,onClick:()=>t(a.Qi.SaveDraftModal),children:"Save Version"})}},17326:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(20997);n(16689);var a=n(57518),r=n.n(a);let o=r().div.withConfig({componentId:"sc-a490d071-0"})`
  position: absolute;
  z-index: 95;
  width: 100%;
  height: 100%;
  background: #fff;
  display: none;
  top: 40px;

  h4 {
    color: #1b1b18;
    font-weight: 700;
  }

  @media only screen and (max-width: 1024px) {
    .mobile {
      ${""}
    }
  }
`,s=({onboarding:e})=>i.jsx(i.Fragment,{children:e&&i.jsx(o,{children:i.jsx("div",{className:"d-flex min-vh-100 ",children:(0,i.jsxs)("div",{className:"container-fluid mt-5",style:{width:"500px"},children:[i.jsx("h4",{children:"Oops...We're gonna need a bigger screen."}),i.jsx("br",{}),"Please visit the onboarding flow from a larger screen."]})})})})},25169:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(20997);n(16689);var a=n(39306),r=n.n(a),o=n(32542);function s({onHide:e,showModal:t,setShowModal:n,createFile:a}){let s=e=>{a(e),n()};return(0,i.jsxs)(r(),{centered:!0,scrollable:!0,show:t===o.Qi.AddModal,onHide:e,children:[i.jsx(r().Header,{closeButton:!0,children:i.jsx(r().Title,{children:"Add a Component or Module"})}),(0,i.jsxs)(r().Body,{children:[i.jsx("div",{className:"text-secondary mb-3",children:"Open existing components or modules, or create your own."}),(0,i.jsxs)("div",{className:"text-center w-100",children:[i.jsx("button",{className:"btn btn-outline-success px-0 w-100 mb-2",onClick:()=>n(o.Qi.OpenModal),children:"Open Component"}),"or",i.jsx("button",{className:"btn btn-success px-0 w-100 my-2",onClick:()=>s(o.jD.Widget),children:"Create New Component"})]}),!o.it&&(0,i.jsxs)(i.Fragment,{children:[i.jsx("div",{className:"w-100 text-center text-secondary mb-2",children:"or"}),(0,i.jsxs)("div",{className:"btn-group w-100",role:"group","aria-label":"Basic example",children:[i.jsx("button",{className:"btn btn-outline-primary w-50 mr-5",onClick:()=>n(o.Qi.OpenModuleModal),children:"Open Module"}),i.jsx("button",{className:"btn btn-primary w-50",onClick:()=>s(o.jD.Module),children:"Create New Module"})]})]})]})]})}},26294:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(20997),a=n(16689),r=n(39306),o=n.n(r),s=n(32542);function d({onHide:e,onConfirm:t,showModal:n}){let[r,d]=(0,a.useState)("");return(0,i.jsxs)(o(),{centered:!0,scrollable:!0,show:n===s.Qi.OpenModal,onHide:e,children:[i.jsx(o().Header,{closeButton:!0,children:i.jsx(o().Title,{children:"Open a Component"})}),(0,i.jsxs)(o().Body,{children:[(0,i.jsxs)("label",{htmlFor:"widget-src-input",className:"form-label text-secondary",children:["Widget name ",i.jsx("span",{className:"text-muted",children:"(or path)"})]}),i.jsx("input",{className:"form-control",id:"widget-src-input",type:"text",value:r,onChange:e=>{d(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g,""))}})]}),(0,i.jsxs)(o().Footer,{children:[i.jsx("button",{className:"btn btn-success",disabled:!r,onClick:()=>{t(r,s.jD.Widget),d(""),e()},children:"Open"}),i.jsx("button",{className:"btn btn-secondary",onClick:e,children:"Cancel"})]})]})}},47787:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(20997),a=n(16689),r=n(39306),o=n.n(r),s=n(32542);function d({onHide:e,onConfirm:t,showModal:n}){let[r,d]=(0,a.useState)("");return(0,i.jsxs)(o(),{centered:!0,scrollable:!0,show:n===s.Qi.OpenModuleModal,onHide:e,children:[i.jsx(o().Header,{closeButton:!0,children:i.jsx(o().Title,{children:"Open a Module"})}),(0,i.jsxs)(o().Body,{children:[(0,i.jsxs)("label",{htmlFor:"widget-src-input",className:"form-label text-secondary",children:["Module name ",i.jsx("span",{className:"text-muted",children:"(or path)"})]}),i.jsx("input",{className:"form-control",id:"widget-src-input",type:"text",value:r,onChange:e=>{d(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-\/]/g,""))}})]}),(0,i.jsxs)(o().Footer,{children:[i.jsx("button",{className:"btn btn-primary",disabled:!r,onClick:()=>{t(r,s.jD.Module),d(""),e()},children:"Open"}),i.jsx("button",{className:"btn btn-secondary",onClick:e,children:"Cancel"})]})]})}},64409:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(20997),a=n(16689),r=n(39306),o=n.n(r),s=n(32542);function d({showModal:e,name:t,onRename:n,onHide:r}){let[d,l]=(0,a.useState)(t);return(0,i.jsxs)(o(),{centered:!0,scrollable:!0,show:e===s.Qi.RenameModal,onHide:r,children:[i.jsx(o().Header,{closeButton:!0,children:i.jsx(o().Title,{children:"Rename Component"})}),(0,i.jsxs)(o().Body,{children:[i.jsx("label",{htmlFor:"rename-input",className:"form-label text-secondary",children:"New name"}),i.jsx("input",{className:"form-control",id:"rename-input",type:"text",value:d,onChange:e=>{l(e.target.value.replaceAll(/[^a-zA-Z0-9_.\-]/g,""))}})]}),(0,i.jsxs)(o().Footer,{children:[i.jsx("button",{className:"btn btn-success",disabled:!d,onClick:()=>{n(d),r()},children:"Confirm"}),i.jsx("button",{className:"btn btn-secondary",onClick:r,children:"Cancel"})]})]})}},37763:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{s:()=>p});var a=n(20997),r=n(16689),o=n(39306),s=n.n(o),d=n(40017),l=n(32542),c=e([d]);d=(c.then?(await c)():c)[0];let p=({showModal:e,onHide:t,widgetPath:n,widgetName:i,type:o,metadata:c,handleCommit:p,path:h,filesObject:m})=>{let[g,u]=(0,r.useState)(""),x=m[JSON.stringify(h)]?.codeVisible;return(0,a.jsxs)(s(),{centered:!0,scrollable:!0,show:e===l.Qi.SaveDraftModal,onHide:t,children:[a.jsx(s().Header,{closeButton:!0,children:a.jsx(s().Title,{children:"Save to Version History"})}),a.jsx(s().Body,{children:(0,a.jsxs)("div",{children:[a.jsx("div",{className:"text-secondary mb-4",children:"Save and commit your changes to the on-chain version history. Give your version a description what changed. Then save to the on-chain version history."}),a.jsx("label",{htmlFor:"rename-input",className:"form-label text-secondary",children:"Describe what changed"}),a.jsx("input",{className:"form-control",id:"widget-src-input",type:"text",value:g,onChange:e=>u(e.target.value)})]})}),(0,a.jsxs)(s().Footer,{children:[a.jsx(d.f,{className:"btn btn-primary",onCommit:t,data:{post:{commit:{text:g,type:"md",keys:[n+"/branch/draft"]}},[o]:{[i]:{branch:{draft:{"":x,metadata:c}}}}},handleCommit:p,children:"Save"}),a.jsx("button",{className:"btn btn-secondary",onClick:()=>{u(""),t()},children:"Cancel"})]})]})};i()}catch(e){i(e)}})},83037:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>p});var a=n(20997);n(16689);var r=n(25169),o=n(26294),s=n(47787),d=n(64409),l=n(37763),c=e([l]);l=(c.then?(await c)():c)[0];let p=({setShowModal:e,jpath:t,path:n,renameFile:i,near:c,widgetPath:p,widgetName:h,showModal:m,createFile:g,loadAndOpenFile:u,handleCommit:x,filesObject:b})=>(0,a.jsxs)(a.Fragment,{children:[a.jsx(d.Z,{showModal:m,name:n?.name,onRename:i,onHide:e},`rename-modal-${t}`),a.jsx(o.Z,{showModal:m,onConfirm:u,onHide:e}),a.jsx(s.Z,{showModal:m,onConfirm:u,onHide:e}),a.jsx(r.Z,{onHide:e,showModal:m,setShowModal:e,createFile:g}),a.jsx(l.s,{showModal:m,onHide:e,near:c,widgetPath:p,widgetName:h,type:n?.type,handleCommit:x,path:n,filesObject:b})]});i()}catch(e){i(e)}})},92013:(e,t,n)=>{n.d(t,{Z:()=>m});var i=n(20997);n(16689);var a=n(62540),r=n.n(a),o=n(32542);function s({setShowModal:e,disable:t}){return i.jsx("button",{disabled:t.openCreateButton,className:"btn btn-success",onClick:()=>e(o.Qi.AddModal),style:{fontSize:"20px",height:"40px",lineHeight:"38px",paddingTop:"0",marginTop:"0"},children:i.jsx("i",{className:"bi bi-plus"})})}function d({setShowModal:e,disable:t}){return i.jsx("button",{disabled:t.openCreateButton,className:"btn btn-outline-success ms-2",style:{height:"40px"},onClick:()=>e(o.Qi.RenameModal),children:i.jsx("i",{className:"bi bi-pen"})})}var l=n(57518),c=n.n(l);let p=c().div.withConfig({componentId:"sc-1c88cab2-0"})`
  border-radius: 0.375rem;
  display: flex;
  color: #11181c;
  height: 40px;
  margin: 0 8px 8px 0;

  &&& > a {
    border: 1px solid #e5e5e5;
    background: #fff;
    color: #11181c;
    padding-left: 6px;
    padding-right: 6px;

    .close {
      opacity: 0;
    }
  }

  &&& > a:hover {
    border: 1px solid #6c757d;

    .close {
      opacity: 1;
    }
  }
  &&& > a.active {
    border: 1px solid #6c757d;

    .close {
      opacity: 1;
    }
  }

  .draft {
    height: 24px;
    width: 50px;
    line-height: 24px;
    text-align: center;
    font-weight: bold;
    color: #ad5700;
    font-size: 12px;
    border-radius: 50px;
    background-color: #ffecbc;
    margin-left: 8px;
  }

  .dot {
    background: #fff;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin: 7px 8px 0 4px;
  }

  .dot-red {
    background: #f45858;
  }

  .close {
    width: 28px;
    height: 28px;
    margin-top: -3px;
    margin-left: 4px;
  }
`;function h({file:e,closeFile:t,disable:n}){let a=JSON.stringify({type:e.type,name:e.name}),o=e?.name?.split("/")[0],s=!e.savedOnChain||e.changesMade;return i.jsx("div",{style:{position:"relative"},children:i.jsx("div",{className:n.fileTab?"onboardingDisable":"",children:i.jsx(r().Item,{children:i.jsx(p,{children:(0,i.jsxs)(r().Link,{className:"text-decoration-none d-flex",eventKey:a,children:[(0,i.jsxs)("div",{className:"d-flex",children:[i.jsx("div",{className:`dot ${s?"dot-red":""}`}),i.jsx("div",{children:o}),e.isDraft&&i.jsx("div",{className:"draft",children:"Draft"})]}),i.jsx("button",{className:"close btn btn-lg border-0 py-0 px-1 ms-1 rounded-circle btn-outline-secondary",onClick:n=>{n.preventDefault(),n.stopPropagation(),t({type:e.type,name:e.name})},children:i.jsx("i",{className:"bi bi-x"})})]})})})})})}function m({filesObject:e,jpath:t,changeFile:n,setShowModal:a,closeFile:o,disable:l,onboarding:c}){let p=e=>!c||["Onboarding.Starter","Onboarding.Starter-fork"].includes(e.name);return(0,i.jsxs)(r(),{variant:"pills mb-2 mt-2",activeKey:t,onSelect:e=>n(JSON.parse(e)),children:[Object.keys(e)?.map(n=>p(e[n])&&i.jsx(h,{file:e[n],closeFile:o,jpath:t,disable:l},n)),(0,i.jsxs)(r().Item,{className:"me-1",children:[i.jsx(s,{setShowModal:a,disable:l}),i.jsx(d,{setShowModal:a,disable:l})]})]})}},25281:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>m});var a=n(20997);n(16689);var r=n(62540),o=n.n(r),s=n(16532),d=n(78806),l=n(71471),c=n(22446),p=n(48199),h=e([l,c]);[l,c]=h.then?(await h)():h;let m=({jpath:e,widgetName:t,setShowModal:n,forkFile:i,near:r,path:h,metadata:m,isDraft:g,refs:u,onboarding:x,currentStep:b,requestSignIn:f,disable:j,handleCommit:w,accountId:v,filesObject:y})=>{let N=y[JSON.stringify(h)]?.codeVisible;return a.jsx(o(),{variant:"pills mb-2 mt-2 ms-auto",activeKey:e,children:(0,a.jsxs)(o().Item,{className:"d-flex",children:[a.jsx("div",{children:a.jsx(p.Z,{widgetName:t,setShowModal:n,disable:j})}),a.jsx("div",{children:a.jsx(s.Z,{forkFile:i,refs:u,disable:j})}),g?a.jsx(c.Z,{widgetName:t,near:r,path:h,code:N,metadata:m,ref:u,disable:j,handleCommit:w}):x&&!v?a.jsx(d.Z,{currentStep:b,refs:u,requestSignIn:f,disable:j}):a.jsx(l.Z,{widgetName:t,near:r,path:h,code:N,metadata:m,disable:j,handleCommit:w,refs:u})]})})};i()}catch(e){i(e)}})},59759:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>d});var a=n(20997);n(16689);var r=n(92013),o=n(25281),s=e([o]);o=(s.then?(await s)():s)[0];let d=({jpath:e,forkFile:t,filesObject:n,widgetName:i,near:s,path:d,metadata:l,closeFile:c,setShowModal:p,isDraft:h,changeFile:m,refs:g,onboarding:u,currentStep:x,requestSignIn:b,disable:f,handleCommit:j,accountId:w})=>a.jsx(a.Fragment,{children:(0,a.jsxs)("div",{className:"w-100 d-flex ",style:{flexWrap:"nowrap"},children:[a.jsx("div",{className:"d-flex",style:{flexWrap:"wrap"},children:a.jsx(r.Z,{filesObject:n,jpath:e,changeFile:m,setShowModal:p,closeFile:c,disable:f,onboarding:u})}),a.jsx("div",{className:"d-flex ms-auto",style:{minWidth:"280px",flexWrap:"wrap"},children:a.jsx(o.Z,{jpath:e,widgetName:i,setShowModal:p,forkFile:t,near:s,path:d,metadata:l,isDraft:h,refs:g,onboarding:u,currentStep:x,requestSignIn:b,disable:f,handleCommit:j,accountId:w,filesObject:n})})]})});i()}catch(e){i(e)}})},37287:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(20997),a=n(72607),r=n.n(a);function o({widgetPath:e,disable:t}){return i.jsx("a",{disabled:t.openInNewTabButton,className:"btn me-2 btn-outline-secondary",style:{height:"38px"},href:`#/${e}`,target:"_blank",rel:"noopener noreferrer",children:"Open Component"})}function s({refs:e,handleRender:t,disable:n}){return i.jsx("div",{ref:e.step9,children:i.jsx("div",{ref:e.step4,children:i.jsx("button",{disabled:n.renderPreviewButton,className:"btn btn-outline-success",onClick:t,children:"Render Preview"})})})}n(16689);var d=n(32542);let l=({layout:e,path:t,accountId:n,tab:a,widgetPath:l,setTab:c,setLayoutState:p,refs:h,handleRender:m,disable:g})=>{let u=e=>{let t=e.target.value;t===d.Ar.Split&&a===d.OK.Widget&&c(d.OK.Editor),x(t)},x=e=>{r().set(d.qD,e),p(e)};return i.jsx(i.Fragment,{children:(0,i.jsxs)("div",{className:"ms-auto d-flex",style:{height:"38px",display:"flex",marginBottom:"12px",justifyContent:"end"},children:[(d.OK.Widget===a||e===d.Ar.Split)&&i.jsx("div",{className:"d-flex justify-content-end me-2",children:i.jsx(s,{refs:h,handleRender:m,disable:g})}),t?.type==="widget"&&n&&i.jsx(o,{widgetPath:l,disable:g}),(0,i.jsxs)("div",{className:"btn-group",role:"group","aria-label":"Layout selection",children:[i.jsx("input",{disabled:g.changeViewButton,type:"radio",className:"btn-check",name:"layout-radio",id:"layout-tabs",autoComplete:"off",checked:e===d.Ar.Tabs,onChange:u,value:d.Ar.Tabs,title:"Set layout to Tabs mode"}),i.jsx("label",{className:"btn btn-outline-secondary",htmlFor:"layout-tabs",children:i.jsx("i",{className:"bi bi-square"})}),i.jsx("input",{disabled:g.changeViewButton,type:"radio",className:"btn-check",name:"layout-radio",id:"layout-split",autoComplete:"off",checked:e===d.Ar.Split,value:d.Ar.Split,title:"Set layout to Split mode",onChange:u}),i.jsx("label",{className:"btn btn-outline-secondary",htmlFor:"layout-split",children:i.jsx("i",{className:"bi bi-layout-split"})})]})]})})}},45669:(e,t,n)=>{n.d(t,{Z:()=>I});var i=n(20997),a=n(25675),r=n.n(a),o=n(11163),s=n(16689),d=n(57518),l=n.n(d),c=n(32542),p=n(95452);let h={src:"/_next/static/media/arrow-small.009f15ba.svg",height:12,width:14,blurWidth:0,blurHeight:0};var m=n(14003);let g={src:"/_next/static/media/onboarding-1.a413c12b.svg",height:49,width:48,blurWidth:0,blurHeight:0},u={src:"/_next/static/media/onboarding-2.8d1c50e1.svg",height:49,width:48,blurWidth:0,blurHeight:0},x={src:"/_next/static/media/onboarding-3.777b37d9.svg",height:49,width:48,blurWidth:0,blurHeight:0};var b=n(75465),f=n(78087);let j=l().div.withConfig({componentId:"sc-bf348a35-0"})`
  z-index: 1000;
`,w=l().h6.withConfig({componentId:"sc-bf348a35-1"})`
  color: #706f6c;
`,v=l().h4.withConfig({componentId:"sc-bf348a35-2"})`
  color: #1b1b18;
  font-weight: 700;
`,y=l().div.withConfig({componentId:"sc-bf348a35-3"})`
  border: 1px solid #e3e3e0;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  margin-right: 10px;
  color: #706f6c;
  font-size: 12px;

  img {
    margin: -4px 4px 0 0;
  }
`,N=l().div.withConfig({componentId:"sc-bf348a35-4"})`
  margin-top: 30px;
`,C=l().div.withConfig({componentId:"sc-bf348a35-5"})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
  }

  .desc {
    padding-top: 4px;
    font-weight: 450;
    font-size: 14px;
    line-height: 150%;
    color: #706f6c;
  }

  .img {
    margin-right: 24px;
  }
`,k=l().button.withConfig({componentId:"sc-bf348a35-6"})`
  margin-top: 60px;
  width: 100%;
  height: 48px;
  background: #63e3a4;
  border: 0.5px solid #37cd83;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  text-align: center;

  :hover {
    opacity: 0.9;
  }
`,S=l().button.withConfig({componentId:"sc-bf348a35-7"})`
  all: unset;
  margin-top: 20px;
  width: 100%;
  height: 48px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #706f6c;

  :hover {
    color: #000;
  }
`;function O({handleNext:e}){let t=(0,o.useRouter)();return i.jsx(j,{children:i.jsx("div",{className:"d-flex min-vh-100 ",children:(0,i.jsxs)("div",{className:"container-fluid mt-5",style:{width:"500px"},children:[i.jsx(w,{children:"Getting Started"}),i.jsx(v,{children:"Build with Open Web Components"}),(0,i.jsxs)("div",{className:"d-flex",children:[(0,i.jsxs)(y,{children:[i.jsx(r(),{src:b.Z,alt:""})," Beginner Friendly"]}),(0,i.jsxs)(y,{children:[i.jsx(r(),{src:f.Z,alt:""})," 5 min"]})]}),i.jsx(N,{children:"We’ll guide you through a basic development workflow to fork, modify, and compose with open web components."}),(0,i.jsxs)(C,{children:[i.jsx("div",{className:"img",children:i.jsx(r(),{src:g,alt:""})}),(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Develop with the NEAR Sandbox "}),i.jsx("div",{className:"desc",children:"Inspect components, compose applications, and preview your changes in real time."})]})]}),(0,i.jsxs)(C,{children:[i.jsx("div",{className:"img",children:i.jsx(r(),{src:u,alt:""})}),(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Compose with Components"}),i.jsx("div",{className:"desc",children:"Discover components built by the community and embed them within your project."})]})]}),(0,i.jsxs)(C,{children:[i.jsx("div",{className:"img",children:i.jsx(r(),{src:x,alt:""})}),(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Publish Your First Components On-Chain "}),i.jsx("div",{className:"desc",children:"Build a contribution graph, deploy it on chain, and connect with thousands of other builders on BOS!"})]})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)(k,{onClick:e,children:["Get Started ",i.jsx(r(),{src:m.Z,alt:""})]}),i.jsx(S,{onClick:()=>{t.push("/signup")},children:"Skip and Create an Account"})]})]})})})}let P=l().div.withConfig({componentId:"sc-c049e867-0"})``,A=l().div.withConfig({componentId:"sc-c049e867-1"})`
  width: 300px;

  position: absolute;
  z-index: 90;

  background: #161615;
  border-radius: 12px;
  padding: 20px 14px;

  .title {
    color: #ededec;
    line-height: 150%;
    font-weight: 600;
  }

  .desc {
    color: #a1a09a;
    font-size: 14px;
    line-height: 150%;
    margin-top: 12px;
  }

  .closeIcon {
    position: absolute;
    font-size: 26px;
    top: 0px;
    right: 6px;
    color: #999;
    cursor: pointer;
    border-radius: 100%;

    &:hover {
      color: #fff;
    }
  }

  .buttons {
    display: flex;
    margin-top: 24px;

    .right {
      margin-left: auto;
    }
    .left {
      button {
        padding-right: 16px;
        background: transparent;
        color: #999;
      }
    }

    button {
      height: 36px;
      line-height: 32px;
      padding: 0 12px;
      background: #ffffff;
      border-radius: 50px;
      font-size: 12px;
      color: #1b1b18;
      border: 0px;

      :hover {
        opacity: 0.9;
      }

      img {
        margin: -2px 4px 0;

        &.revert {
          transform: rotate(180deg);
        }
      }
    }
  }
`,I=({onboarding:e,refs:t,setCurrentStep:n,currentStep:a,refEditor:d,refSearch:l,setLayoutState:m,cache:g,near:u,closeFile:x,setDisable:b,selectFile:f})=>{let[j,w]=(0,s.useState)({}),[v,y]=(0,s.useState)({x:0,y:0}),N=(0,o.useRouter)();zE("webWidget","hide");let C=(0,s.useCallback)(()=>{w(()=>Object.keys(p.cp).reduce((e,n)=>({...e,[n]:{x:t[n].current?.offsetLeft,y:t[n].current?.offsetTop}}),{}))},[t]);(0,s.useEffect)(()=>{C()},[a,C]),(0,s.useEffect)(()=>{window.addEventListener("resize",C)},[C]);let k=(0,s.useCallback)(e=>b(t=>({...t,[e]:!1})),[b]),S=(0,s.useCallback)(()=>b(p.Zp),[b]);(0,s.useEffect)(()=>{Object.keys(p.cp).map(e=>{t[e].current&&(t[e].current.className="")}),![2,3,8].includes(a)&&t[`step${a}`]?.current&&(t[`step${a}`].current.className="glow")},[a,t]),(0,s.useEffect)(()=>{e&&(m(c.Ar.Split),1===a&&f(p.qE.starter),a>1&&f(p.qE.starterFork),1===a?k("forkButton"):4===a?k("renderPreviewButton"):6===a?k("search"):7===a?k("search"):9===a?k("renderPreviewButton"):10===a?(k("onboardingPublishButton"),k("publishButton")):S(),2===a||3===a||8===a?y({x:d.current.offsetWidth-70,y:-16}):6===a?y({x:l.current.offsetWidth-600,y:0}):7===a?y({x:l.current.offsetWidth-400,y:48}):y({x:0,y:0}))},[a,g,u,e,m,f,k,S,x,d,l]);let I=()=>Z(a+1),M=()=>Z(a-1),Z=e=>{n(e),localStorage.setItem(p._F,JSON.stringify({step:e}))},W=()=>{Z(0),N.push("/sandbox")};return i.jsx(P,{children:e&&(0,i.jsxs)(i.Fragment,{children:[!a&&i.jsx(O,{handleNext:I}),Object.keys(p.cp).map(e=>{if(!j[e])return i.jsx(i.Fragment,{});let t=j[e].y+p.cp[e].tooltipAdjust.y+v.y,n=j[e].x+p.cp[e].tooltipAdjust.x+v.x,o=p.cp[e];return e===`step${a}`&&(0,i.jsxs)(A,{style:{top:t,left:n},children:[i.jsx("div",{children:o.component}),(0,i.jsxs)("div",{className:"buttons",children:[i.jsx("div",{className:"left",children:(0,i.jsxs)("button",{onClick:M,children:[i.jsx(r(),{src:h,className:"revert",alt:""}),"Back"]})}),(0,i.jsxs)("div",{className:"right",children:[o.button&&(0,i.jsxs)("button",{onClick:I,children:[o.button," ",i.jsx(r(),{src:h,alt:""})]}),10===a&&(0,i.jsxs)("button",{onClick:W,children:["Finish onboarding ",i.jsx(r(),{src:h,alt:""})]})]})]}),i.jsx("div",{className:"closeIcon",title:"Exit Onboarding flow",onClick:W,children:i.jsx("i",{className:"bi bi-x"})})]})})]})})}},78662:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>d});var a=n(20997);n(16689);var r=n(48097),o=n(32542),s=e([r]);r=(s.then?(await s)():s)[0];let d=({tab:e,layout:t,renderCode:n,jpath:i,parsedWidgetProps:s,isModule:d,widgets:l})=>a.jsx("div",{className:`${e===o.OK.Widget||t===o.Ar.Split&&e!==o.OK.Metadata?"":"visually-hidden"}`,children:a.jsx("div",{style:{},children:a.jsx("div",{className:"container",style:e===o.OK.Widget?{border:"1px solid #ced4da",appearance:"none",borderRadius:"0.375rem",height:"70vh",maxWidth:"100%",padding:"20px"}:{padding:"20px",border:"1px solid #ced4da",appearance:"none",borderRadius:"0.375rem",height:"70vh"},children:a.jsx("div",{className:"h-100 row",children:a.jsx("div",{className:"d-inline-block position-relative overflow-auto h-100",children:n?a.jsx("div",{style:{padding:0,margin:0},children:a.jsx(r.n,{src:l.wrapper,props:{children:a.jsx(r.n,{code:n,props:s},`preview-${i}`)}},l.wrapper)}):!d&&a.jsx("div",{style:{padding:0,margin:0,display:"flex",alignItems:"center",justifyContent:"center"}})})})})})});i()}catch(e){i(e)}})},7465:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var a=n(20997),r=n(16689),o=n(48097),s=n(32542),d=e([o]);o=(d.then?(await d)():d)[0];let l=({tab:e,jpath:t,widgets:n,metadata:i,accountId:d,widgetName:l})=>a.jsx("div",{className:`${e===s.OK.Metadata?"":"visually-hidden"}`,children:a.jsx("div",{className:"container",style:{marginTop:"50px"},children:a.jsx("div",{className:"row",children:a.jsx("div",{className:"d-inline-block position-relative overflow-hidden",children:a.jsx(o.n,{src:n.widgetMetadata,props:(0,r.useMemo)(()=>({metadata:i,accountId:d,widgetName:l}),[i,d,l])},`metadata-${t}`)})})})});i()}catch(e){i(e)}})},16584:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{p:()=>T});var a=n(20997),r=n(72607),o=n.n(r),s=n(11163),d=n(48643),l=n(9284),c=n.n(l),p=n(16689),h=n(41314),m=n(86938),g=n(4179),u=n(60303),x=n(21771),b=n(42124),f=n(56669),j=n(2039),w=n(17326),v=n(83037),y=n(59759),N=n(37287),C=n(45669),k=n(78662),S=n(7465),O=n(65273),P=n(8835),A=n(44433),I=n(11652),M=n(26615),Z=n(32542),W=n(1104),E=n(95452),B=n(31738),D=n(93151),F=e([d,m,g,u,v,y,k,S,O,A]);[d,m,g,u,v,y,k,S,O,A]=F.then?(await F)():F;let T=({onboarding:e=!1})=>{let t=(0,u.b)(e=>e.near),n=(0,u.b)(e=>e.cache),i=(0,m.t)(e=>e.accountId),r=(0,m.t)(e=>e.logOut),l=(0,m.t)(e=>e.requestSignIn),F=(0,s.useRouter)(),T=(0,h.t)(),z={checkComponentPath:T.tosCheck,contentComponentPath:T.tosContent},[H,$]=(0,p.useState)(!1),[K,L]=(0,p.useState)({}),[R,U]=(0,p.useState)(void 0),[V,q]=(0,p.useState)(void 0),[J,_]=(0,p.useState)(),[G,Q]=(0,p.useState)(o().get(Z.F7)||"{}"),[Y,X]=(0,p.useState)({}),[ee,et]=(0,p.useState)(null),[en,ei]=(0,p.useState)(void 0),[ea,er]=(0,p.useState)(null),[eo,es]=(0,p.useState)(Z.OK.Editor),[ed,el]=(0,p.useState)(o().get(Z.qD)||Z.Ar.Tabs),[ec,ep]=(0,p.useState)(null),[eh,em]=(0,p.useState)(0),[eg,eu]=(0,p.useState)({}),ex=R?.name?.split("/")[0],eb=`${i}/${R?.type}/${R?.name}`,ef=JSON.stringify(R),{isDraft:ej}=K[ef]||{},ew=Object.keys(K)?.length,ev=R?.type==="module",ey=ed===Z.Ar.Split?"col-lg-6":"",eN=!!t&&!!n,eC=(0,g.q)(e=>e.setSrc),ek=(0,p.useCallback)(e=>{let t=(0,W.UW)(e),i=(0,W.vA)(e);n.asyncLocalStorageGet(Z.TH,{path:t,type:Z.Z1.Code}).then(({code:e}={})=>{L(t=>({...t,[i]:{...t[i],codeLocalStorage:e,codeVisible:e||t[i].codeVisible}}))})},[n]),eS=(0,p.useCallback)(e=>{if(!e.src)return;let i=(0,W.vA)(e),a=`${e.src}/**`,r=()=>{let o=n.socialGet(t,a,!1,void 0,void 0,r);if(o&&e.new){let{codeMain:t,codeDraft:a,isDraft:r}=(0,W.th)(o),s=(0,W.UW)(e),d=a||t;(0,W.Ix)(s,a||t,n);let l={codeMain:t,codeDraft:a,isDraft:r,savedOnChain:!0,new:!1,codeLocalStorage:d,codeVisible:d};L(e=>({...e,[i]:{...e[i],...l,changesMade:(0,W.cV)(t,a,d)}}))}};r()},[n,t]),eO=(0,p.useCallback)(e=>{let t={...K,[(0,W.vA)(e)]:e};L(t),(0,W.Wi)(t,(0,W.UW)(e),n)},[n,K]),eP=(0,p.useCallback)((t,n)=>{let a=e&&"near",r=(0,W.Ip)(t,a||i,n),o=(0,W.y3)(n,t),s={...Z.QK,...o,src:r,codeMain:"",codeDraft:"",codeLocalStorage:"",isDraft:!1,changesMade:!1,savedOnChain:!1,new:!0};eO(s),_(null),eA(o),eS(s)},[i,eO,eS,e]);(0,p.useEffect)(()=>{ec&&!e&&(eP(ec,ec.split("/")[1]),ep(null),F.replace("/sandbox"))},[ec,eP,e,F]);let eA=e=>{U((0,W.UW)(e)),q((0,W.UW)(e)),ei(void 0)},eI=(0,p.useCallback)(e=>{Object.values(e).map(e=>{ek(e)})},[ek]),eM=(0,p.useCallback)(e=>{Object.values(e).map(e=>{eS(e)})},[eS]),eZ=(0,p.useCallback)(()=>{eC(null),n.asyncLocalStorageGet(Z.TH,{type:Z.Z1.Files}).then(({files:t,lastPath:n}={})=>{let i,a;if(e&&1===eh?(i=E.qE.starter,a=(0,W.lI)([E.qE.starter])):e&&eh>1?(i=E.qE.starterFork,a=(0,W.lI)([E.qE.starter,E.qE.starterFork])):(i=n,a=(0,W.lI)(t)),L(a),eA(a[(0,W.vA)(i)]),eI(a),eM(a),e)return;let{componentSrc:r}=F.query;Array.isArray(F.query.componentSrc)&&ep(r.join("/"))})},[n,eh,eI,eM,e,F.query,eC]),eW=(e,t)=>{(0,W.Ix)(e,t,n);let i=JSON.stringify(e);L(e=>({...e,[i]:{...e[i],codeLocalStorage:t,codeVisible:t,changesMade:(0,W.cV)(e[i].codeMain,e[i].codeDraft,t)}}))},eE=e=>{let t=JSON.stringify(e),i={...K};delete i[t],L(i);let a=!Object.keys(i).length;if(a){(0,W.Wi)(i,void 0,n);return}if(t!==JSON.stringify(V)){(0,W.Wi)(i,V,n);return}if(t===JSON.stringify(V)){let e=Object.values(i)[0],t=(0,W.UW)(e);eA(t),_(null),(0,W.Wi)(i,t,n)}},eB=e=>{let t=(0,W.V4)(e),i=Object.values(K).map(e=>({type:e.type,name:e.name})),a={...Z.QK,type:e,name:(0,W.dF)(e,i).name,codeMain:"",codeDraft:"",codeLocalStorage:t,codeVisible:t,isDraft:!1,changesMade:!0,savedOnChain:!1,new:!1},r=(0,W.UW)(a);eO(a),(0,W.Ix)(r,t,n),_(null),eA(r)},eD=()=>{eP(V.name,Z.jD.Widget)},eF=(0,E.lj)(),eT=(0,p.useRef)(),ez=(0,p.useRef)();return((0,p.useEffect)(()=>{em((0,E.dn)().step)},[]),(0,p.useEffect)(()=>{eu(e?E.Zp:{})},[e]),(0,p.useEffect)(()=>{let t=F.asPath.split("/");e&&"start"===t[2]&&(em(0),F.replace("/onboarding"))},[F,e]),(0,p.useEffect)(()=>{o().set(Z.F7,G);try{let e=JSON.parse(G);X(e),et(null)}catch(e){X({}),et(e.message)}},[G]),(0,p.useEffect)(()=>{n&&t&&eZ()},[n,eZ,t]),eN)?a.jsx(j.Z,{children:(0,a.jsxs)("div",{children:[a.jsx(w.Z,{onboarding:e}),e&&a.jsx(C.Z,{onboarding:e,refs:eF,setCurrentStep:em,currentStep:eh,reloadFile:()=>{let e=E.qE.starter;eA(e),$(!1),eP("near/widget/Onboarding.Starter",Z.jD.Widget)},refEditor:eT,refSearch:ez,setLayoutState:el,cache:n,near:t,closeFile:eE,setDisable:eu,selectFile:eA}),e&&!eh||(0,a.jsxs)(a.Fragment,{children:[a.jsx(D.Z,{mainLoader:H}),a.jsx(v.Z,{setShowModal:er,jpath:ef,path:R,renameFile:e=>{let t=(0,W.q9)(R.type,e),i=(0,W.vA)(t);L(a=>{let r={...a,[i]:{...a[ef],name:e}};return delete r[ef],(0,W.Wi)(r,t,n),r}),eA(t),_(null)},near:t,widgetPath:eb,widgetName:ex,showModal:ea,createFile:eB,loadAndOpenFile:eP,handleCommit:eD,filesObject:K}),e||a.jsx(B.Z,{setShowModal:er,createFile:eB,showEditor:ew,setCurrentStep:em}),(0,a.jsxs)("div",{className:"",children:[e||a.jsx(f.Z,{}),e&&a.jsx(b.Z,{handleExitOnboarding:()=>{em(0),F.replace("/sandbox")}}),(0,a.jsxs)("div",{className:"container-fluid mt-1",style:{position:"relative"},children:[a.jsx(O.Z,{widgets:T,tos:z,logOut:r,loadAndOpenFile:eP,refs:eF,refSearch:ez,disable:eg}),a.jsx(y.Z,{setShowModal:er,jpath:ef,forkFile:()=>{let t=(0,Z.n0)(ex),i=(0,W.q9)(Z.jD.Widget,t),a=K[JSON.stringify(R)],r={...a,...i,codeDraft:"",isDraft:!1,changesMade:!0,savedOnChain:!1,new:!1,loading:!1};if(eO(r),(0,W.Ix)(i,r.codeLocalStorage,n),_(null),eA(i),e&&1===eh){let e=eh+1;em(e),localStorage.setItem(E._F,JSON.stringify({step:e}))}},filesObject:K,widgetName:ex,near:t,path:R,metadata:en,closeFile:eE,isDraft:ej,changeFile:e=>{K[JSON.stringify(e)]&&(_(null),eA(e),(0,W.Wi)(K,e,n))},refs:eF,onboarding:e,currentStep:eh,requestSignIn:l,disable:eg,handleCommit:eD,accountId:i}),a.jsx("div",{className:"d-flex align-content-start",children:(0,a.jsxs)("div",{className:"flex-grow-1",children:[a.jsx("div",{className:"row",children:(0,a.jsxs)("div",{style:{display:"flex"},children:[a.jsx(M.Z,{isModule:ev,tab:eo,setTab:es,widgets:T,layout:ed,setRenderCode:_,disable:eg,filesObject:K,path:R}),a.jsx(N.Z,{layout:ed,path:R,accountId:i,tab:eo,widgetPath:eb,setTab:es,setLayoutState:el,refs:eF,handleRender:()=>{_(K[JSON.stringify(R)]?.codeVisible),ed===Z.Ar.Tabs&&es(Z.OK.Widget),e&&(4===eh&&(em(5),localStorage.setItem(E._F,JSON.stringify({step:5}))),9===eh&&(em(10),localStorage.setItem(E._F,JSON.stringify({step:10}))))},disable:eg})]})}),(0,a.jsxs)("div",{className:"row",children:[(0,a.jsxs)("div",{className:ey,children:[a.jsx(P.Z,{tab:eo,widgetPath:eb,changeCode:eW,path:R,reformat:(e,t)=>{try{let n=d.default.format(t,{parser:"babel",plugins:[c()]});eW(e,n)}catch(e){console.log(e)}},refs:eF,refEditor:eT,filesObject:K}),a.jsx(I.Z,{tab:eo,widgetProps:G,setWidgetProps:Q,propsError:ee}),a.jsx(A.Z,{tab:eo,widgets:T,jpath:ef,widgetPath:eb,setMetadata:ei})]}),a.jsx("div",{className:ey,children:(0,a.jsxs)("div",{className:"row",children:[a.jsx(k.Z,{tab:eo,layout:ed,renderCode:J,jpath:ef,parsedWidgetProps:Y,isModule:ev,widgets:T}),a.jsx(S.Z,{tab:eo,layoutClass:ey,jpath:ef,widgets:T,metadata:en,accountId:i,widgetName:ex})]})})]})]})})]})]})]})]})}):a.jsx(x.$,{})};i()}catch(e){i(e)}})},65273:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>h});var a=n(20997);n(16689);var r=n(74165),o=n.n(r),s=n(4013),d=n.n(s),l=n(48097),c=n(32542),p=e([l]);l=(p.then?(await p)():p)[0];let h=({widgets:e,tos:t,logOut:n,loadAndOpenFile:i,refs:r,refSearch:s,disable:p})=>a.jsx(a.Fragment,{children:e.editorComponentSearch&&a.jsx("div",{ref:s,style:{position:"relative"},children:a.jsx("div",{className:p.search?"onboardingDisable":"",children:a.jsx("div",{style:{width:"100%",minHeight:"48px"},children:a.jsx("div",{ref:r.step5,children:a.jsx("div",{ref:r.step6,children:a.jsx("div",{ref:r.step7,style:{marginTop:"10px"},children:a.jsx(l.n,{src:t.checkComponentPath,props:{logOut:n,tosName:t.contentComponentPath,targetComponent:e.editorComponentSearch,targetProps:()=>({extraButtons:({widgetName:e,widgetPath:t,onHide:n})=>a.jsx(o(),{placement:"auto",overlay:a.jsx(d(),{children:`Open "${e}" component in the editor`}),children:a.jsx("button",{className:"btn btn-outline-primary",onClick:e=>{e.preventDefault(),i(t,c.jD.Widget),n&&n()},children:"Open"})})})}})})})})})})})});i()}catch(e){i(e)}})},8835:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(20997),a=n(12587),r=n.n(a);n(16689);var o=n(32542);let s=({tab:e,widgetPath:t,changeCode:n,path:a,reformat:s,refs:d,refEditor:l,filesObject:c})=>{let p=JSON.stringify(a),h=c[p]?.codeVisible;return i.jsx("div",{className:`${e===o.OK.Editor?"":"visually-hidden"}`,ref:l,children:i.jsx("div",{ref:d.step3,children:i.jsx("div",{ref:d.step2,children:(0,i.jsxs)("div",{ref:d.step8,children:[i.jsx("div",{className:"form-control mb-3",style:{height:"70vh",borderTopLeftRadius:"0px"},children:i.jsx(r(),{value:h,path:t,defaultLanguage:"javascript",onChange:e=>n(a,e),wrapperProps:{onBlur:()=>s(a,h)}})}),i.jsx("div",{className:"mb-3 d-flex gap-2 flex-wrap"})]})})})})}},44433:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{Z:()=>l});var a=n(20997),r=n(16689),o=n(48097),s=n(32542),d=e([o]);o=(d.then?(await d)():d)[0];let l=({tab:e,widgets:t,jpath:n,widgetPath:i,setMetadata:d})=>a.jsx("div",{className:`${e===s.OK.Metadata&&t.widgetMetadataEditor?"":"visually-hidden"}`,children:a.jsx("div",{className:"mb-3",style:{paddingTop:"20px",padding:"20px",border:"1px solid rgb(206, 212, 218)",appearance:"none",borderRadius:"0.375rem",height:"70vh",overflow:"auto"},children:a.jsx(o.n,{src:t.widgetMetadataEditor,props:(0,r.useMemo)(()=>({widgetPath:i,onChange:d}),[d,i])},`metadata-editor-${n}`)})});i()}catch(e){i(e)}})},11652:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(20997),a=n(12587),r=n.n(a),o=n(16689),s=n(32542);let d=({tab:e,widgetProps:t,setWidgetProps:n,propsError:a})=>{let d=(0,o.useCallback)(e=>{try{let t=JSON.stringify(JSON.parse(e),null,2);n(t)}catch(e){console.log(e)}},[n]);return(0,i.jsxs)("div",{className:`${e===s.OK.Props?"":"visually-hidden"}`,children:[i.jsx("div",{className:"form-control",style:{height:"70vh"},children:i.jsx(r(),{value:t,defaultLanguage:"json",onChange:e=>n(e),wrapperProps:{onBlur:()=>d(t)}})}),i.jsx("div",{className:" mb-3",children:"^^ Props for debugging (in JSON)"}),a&&i.jsx("pre",{className:"alert alert-danger",children:a})]})}},26615:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(20997);n(16689);var a=n(57518),r=n.n(a),o=n(32542);let s=r().button.withConfig({componentId:"sc-522fc76f-0"})`
  &.active {
    isolation: isolate;
  }
`,d=({isModule:e,tab:t,setTab:n,widgets:a,layout:r,setRenderCode:d,filesObject:l,path:c})=>{let p=l[JSON.stringify(c)]?.codeVisible;return i.jsx("div",{style:{display:"flex"},children:(0,i.jsxs)("ul",{className:"nav nav-tabs",style:{borderBottom:"0px",marginTop:"9px"},children:[e&&i.jsx("li",{className:"nav-item",children:i.jsx(s,{className:`nav-link ${t===o.OK.Editor?"active":"text-secondary"}`,"aria-current":"page",onClick:()=>n(o.OK.Editor),children:"Module"})}),e||(0,i.jsxs)(i.Fragment,{children:[i.jsx("li",{className:"nav-item",children:i.jsx(s,{className:`nav-link ${t===o.OK.Editor?"active":"text-secondary"}`,"aria-current":"page",onClick:()=>n(o.OK.Editor),children:"Component"})}),i.jsx("li",{className:"nav-item",children:i.jsx(s,{className:`nav-link ${t===o.OK.Props?"active":"text-secondary"}`,"aria-current":"page",onClick:()=>n(o.OK.Props),children:"Props"})}),a.widgetMetadataEditor&&i.jsx("li",{className:"nav-item",children:i.jsx(s,{className:`nav-link ${t===o.OK.Metadata?"active":"text-secondary"}`,"aria-current":"page",onClick:()=>n(o.OK.Metadata),children:"Metadata"})}),r===o.Ar.Tabs&&i.jsx("li",{className:"nav-item",children:i.jsx(s,{className:`nav-link ${t===o.OK.Widget?"active":"text-secondary"}`,"aria-current":"page",onClick:()=>{d(p),n(o.OK.Widget)},children:"Component Preview"})})]})]})})}},93151:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(20997);function a({mainLoader:e}){return e&&i.jsx("div",{style:{width:"100%",height:"100%",position:"absolute",top:"0px",background:"#fff",zIndex:"1000"}})}n(16689)},31738:(e,t,n)=>{n.d(t,{Z:()=>b});var i=n(20997),a=n(25675),r=n.n(a),o=n(11163);n(16689);var s=n(57518),d=n.n(s),l=n(14003),c=n(75465),p=n(78087),h=n(32542);let m=d().button.withConfig({componentId:"sc-9f9b615d-0"})`
  margin-top: 20px;
  width: 100%;
  height: 48px;
  background: #63e3a4;
  border: 0.5px solid #37cd83;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  text-align: center;

  :hover {
    opacity: 0.9;
  }

  &.outlined {
    background: #fff;
    border: 0.5px solid #37cd83;
  }
`,g=d().h4.withConfig({componentId:"sc-9f9b615d-1"})`
  color: #1b1b18;
  font-weight: 700;

  &.second {
    margin-top: 80px;
  }
`,u=d().div.withConfig({componentId:"sc-9f9b615d-2"})`
  border: 1px solid #e3e3e0;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  margin-right: 10px;
  color: #706f6c;
  font-size: 12px;

  img {
    margin: -4px 4px 0 0;
  }
`,x=d().div.withConfig({componentId:"sc-9f9b615d-3"})`
  margin-top: 10px;
`,b=({setShowModal:e,createFile:t,showEditor:n})=>{let a=(0,o.useRouter)(),s=n=>{t(n),e()};return n?null:i.jsx("div",{className:"d-flex justify-content-center min-vh-100",children:(0,i.jsxs)("div",{className:"container-fluid mt-5",style:{width:"500px"},children:[i.jsx(g,{children:"Follow our getting started guided tutorial"}),(0,i.jsxs)("div",{className:"d-flex",children:[(0,i.jsxs)(u,{children:[i.jsx(r(),{src:c.Z,alt:""})," Beginner Friendly"]}),(0,i.jsxs)(u,{children:[i.jsx(r(),{src:p.Z,alt:""})," 5 min"]})]}),i.jsx(x,{children:"We’ll guide you through a basic development workflow to fork, modify, and compose with open web components."}),(0,i.jsxs)(m,{onClick:()=>{a.push("/onboarding/start")},children:["Get Started ",i.jsx(r(),{src:l.Z,alt:""})]}),i.jsx(g,{className:"second",children:"Welcome to the Component Sandbox!"}),i.jsx("p",{className:"text-secondary",children:"Use this sandbox to create, inspect, modify, and compose components to create new experiences on NEAR."}),i.jsx(m,{className:"outlined",onClick:()=>e(h.Qi.OpenModal),children:"Open Component"}),i.jsx(m,{onClick:()=>s(h.jD.Widget),children:"Create New Component"})]})})}},2039:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(57518),a=n.n(i);let r=a().div.withConfig({componentId:"sc-d454cad6-0"})`
  position: relative;

  .glow {
    -webkit-animation: glowing 1000ms infinite;
    -moz-animation: glowing 1000ms infinite;
    -o-animation: glowing 1000ms infinite;
    animation: glowing 1000ms infinite;

    border-radius: 6px;

    @-webkit-keyframes glowing {
      0% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 3px #0d6efd;
      }
      50% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 15px #0d6efd;
      }
      100% {
        border-color: #0d6efd;
        -webkit-box-shadow: 0 0 3px #0d6efd;
      }
    }
    @keyframes glowing {
      0% {
        border-color: #0d6efd;
        box-shadow: 0 0 3px #0d6efd;
      }
      50% {
        border-color: #0d6efd;
        box-shadow: 0 0 15px #0d6efd;
      }
      100% {
        border-color: #0d6efd;
        box-shadow: 0 0 3px #0d6efd;
      }
    }
  }

  .onboardingDisable {
    &::before {
      border: 10px;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
      background: white;
      opacity: 0.5;
    }
  }
`},40660:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{p:()=>a.p});var a=n(16584),r=e([a]);a=(r.then?(await r)():r)[0],i()}catch(e){i(e)}})},32542:(e,t,n)=>{n.d(t,{Ar:()=>g,Ce:()=>s,F7:()=>o,OK:()=>m,QK:()=>x,Qi:()=>u,TH:()=>p,Z1:()=>h,iW:()=>d,it:()=>i,jD:()=>c,n0:()=>l,qD:()=>r});let i=!0,a="social.near:v01:",r=a+"editorLayout:",o=a+"widgetProps:",s="return <div>Hello World</div>;",d="function square(number) {\n  return number * number;\n}\n",l=e=>`${e}-fork`,c={Widget:"widget",Module:"module"},p={page:"editor"},h={Code:"code",Files:"files"},m={Editor:"Editor",Props:"Props",Metadata:"Metadata",Widget:"Widget"},g={Tabs:"Tabs",Split:"Split"},u={RenameModal:"RenameModal",OpenModal:"OpenModal",OpenModuleModal:"OpenModuleModal",AddModal:"AddModal",CreateModal:"CreateModal",SaveDraftModal:"SaveDraftModal"},x={codeMain:"",codeDraft:"",codeLocalStorage:"",isDraft:!1,changesMade:!1,savedOnChain:void 0,new:!0,loading:!1}},1104:(e,t,n)=>{n.d(t,{Ip:()=>o,Ix:()=>p,UW:()=>m,V4:()=>s,Wi:()=>c,cV:()=>d,dF:()=>r,lI:()=>u,q9:()=>h,th:()=>l,vA:()=>g,y3:()=>a});var i=n(32542);let a=(e,t)=>{let n=t.indexOf("/")>=0?t.split("/").slice(2).join("/"):t;return{type:e,name:n}},r=(e,t)=>{for(let n=0;;n++){let i=`Untitled-${n}`,r=a(e,i);if(!t?.find(e=>e.name===i))return r}},o=(e,t,n)=>e.indexOf("/")>=0?e:`${t}/${n.toLocaleLowerCase()}/${e}`,s=e=>e===i.jD.Module?i.iW:i.Ce,d=(e,t,n)=>t?t!=n:e?e!==n:!!n,l=e=>{let t=e?.[""],n=e?.branch?.draft?.[""]||"";return{codeMain:t,codeDraft:n,isDraft:!n&&!t||!!n}},c=(e,t,n)=>{let a=Object.values(e).map(e=>({type:e.type||i.jD.Widget,name:e.name,src:e.src}));n.localStorageSet(i.TH,{type:i.Z1.Files},{files:a,lastPath:t})},p=(e,t,n)=>{n.localStorageSet(i.TH,{path:e,type:i.Z1.Code},{code:t,time:Date.now()})},h=(e,t)=>({type:e,name:t}),m=(e={})=>({type:e.type,name:e.name}),g=(e={})=>JSON.stringify(m(e)),u=(e=[])=>e.reduce((e,t)=>({...e,[g(t)]:{...t,...i.QK}}),{})},95452:(e,t,n)=>{n.d(t,{_F:()=>w,lj:()=>y,dn:()=>N,qE:()=>f,Zp:()=>j,cp:()=>v});var i=n(20997),a=n(16689),r=n(68887),o=n.n(r),s=n(25675),d=n.n(s),l=n(57518),c=n.n(l);let p={src:"/_next/static/media/copy.4c2f35b5.svg",height:15,width:12,blurWidth:0,blurHeight:0},h=c().div.withConfig({componentId:"sc-ab44d15b-0"})`
  .buttons {
    width: 100%;
    margin-top: 0px;

    button {
      text-align: center;
      width: 100%;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      background: #ffffff;
      border-radius: 50px;
      font-size: 12px;
      color: #1b1b18;

      :hover {
        opacity: 0.9;
      }

      img {
        margin: -2px 4px 0;

        &.revert {
          transform: rotate(180deg);
        }
      }
    }
  }
`,m=c().div.withConfig({componentId:"sc-ab44d15b-1"})`
  padding: 16px;
  margin: 20px 0;
  background: #353431;
  border-radius: 6px;

  color: #a1a09a;
  font-family: Menlo, Monaco, ' Courier New ', monospace;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;

  pre {
    margin: 0px;
    padding: 0px;
  }
`,g=`<Widget
  src="near/widget
    /Onboarding.ComponentCard"
  props={{ accountId }}
/>`,u=c().div.withConfig({componentId:"sc-95cbb73a-0"})`
  .buttons {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 10px;

    button {
      text-align: center;
      width: 100%;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      background: #ffffff;
      border-radius: 50px;
      font-size: 12px;
      color: #1b1b18;

      :hover {
        opacity: 0.9;
      }

      img {
        margin: -2px 4px 0;

        &.revert {
          transform: rotate(180deg);
        }
      }
    }
  }
`,x=c().div.withConfig({componentId:"sc-95cbb73a-1"})`
  padding: 16px;
  margin: 20px 0;
  background: #353431;
  border-radius: 6px;
  color: #a1a09a;
  font-family: Menlo, Monaco, ' Courier New ', monospace;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;

  pre {
    margin: 0px;
    padding: 0px;
  }
`,b="Onboarding.ComponentCollection",f={starter:{type:"widget",name:"Onboarding.Starter",src:"near/widget/Onboarding.Starter"},starterFork:{type:"widget",name:"Onboarding.Starter-fork",src:"near/widget/Onboarding.Starter-fork"}},j={search:!0,fileTab:!0,openCreateButton:!0,renameButton:!0,publishDraftAsMainButton:!0,onboardingPublishButton:!0,publishButton:!0,saveDraftButton:!0,forkButton:!0,renderPreviewButton:!0,openInNewTabButton:!0,changeViewButton:!0},w="onboarding-v0",v={step1:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Fork your first component"}),i.jsx("div",{className:"desc",children:"In the Sandbox, you’re able to fork, experiment, and build new components and applications with NEAR, all in the browser. Get started by forking your first component."})]})},{}),button:"",tooltipAdjust:{x:-306,y:50}},step2:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Easy as that, let’s add some code"}),(0,i.jsxs)("div",{className:"desc",children:["Code published on NEAR is open source by default. This means you can inspect, modify, and compose with every component you see.",i.jsx("br",{}),i.jsx("br",{}),"Next, we’ll modify your component using the sandbox editor."]})]})},{}),button:"Continue",tooltipAdjust:{x:40,y:100}},step3:{component:i.jsx(function(){return(0,i.jsxs)(h,{children:[i.jsx("div",{className:"title",children:"Edit your first Component"}),(0,i.jsxs)("div",{className:"desc",children:["The following code snippet gets the total number of contributions you have made to the NEAR blockchain.",i.jsx("br",{}),i.jsx("br",{}),"Copy the snippet and replace the placeholder code on line 4 to display your total contributions."]}),i.jsx(m,{children:i.jsx("pre",{children:g})}),i.jsx("div",{className:"buttons",children:(0,i.jsxs)("button",{onClick:()=>o()('<Widget src="near/widget/Onboarding.ComponentCard" props={{ accountId }} />'),children:[i.jsx(d(),{src:p})," Copy to Clipboard"]})})]})},{}),button:"Confirm Paste",tooltipAdjust:{x:40,y:100}},step4:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Preview Your Changes Live"}),i.jsx("div",{className:"desc",children:"Once you’ve modified your component, refresh your render preview to see the changes live right beside the editor."})]})},{}),button:"",tooltipAdjust:{x:-306,y:50}},step5:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Great Start! Now let’s add a component built by the community."}),i.jsx("div",{className:"desc",children:"Your component now displays your total contributions, but we need a way to visualize your contributions over time."})]})},{}),button:"Discover Components",tooltipAdjust:{x:12,y:100}},step6:{component:i.jsx(function(){return(0,i.jsxs)(u,{children:[i.jsx("div",{className:"title",children:"Search for Community Components "}),(0,i.jsxs)("div",{className:"desc",children:["You can search the platform at any point for community components to inspire new experiences, or to use in your own projects.",i.jsx("br",{}),i.jsx("br",{}),"In the search bar, type or paste in:",i.jsx(x,{children:b}),i.jsx("div",{className:"buttons",children:(0,i.jsxs)("button",{onClick:()=>o()(b),children:[i.jsx(d(),{src:p})," Copy to Clipboard"]})}),"to search for this component."]})]})},{}),button:"Confirm Searched",tooltipAdjust:{x:0,y:100}},step7:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Embedding Components"}),(0,i.jsxs)("div",{className:"desc",children:["Components you find can be embedded by copying their embed code, and pasting it in your component file.",i.jsx("br",{}),i.jsx("br",{}),"Copy the embed code for “near/widget/ComponentCollection”, and replace the placeholder code on line 6."]})]})},{}),button:"Confirm Embed",tooltipAdjust:{x:0,y:100}},step8:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Paste the embed code and preview your changes"}),i.jsx("div",{className:"desc",children:"Paste the embedded code on line 6 and review the changes by clicking “Render Preview”"})]})},{}),button:"Confirm Code Paste",tooltipAdjust:{x:40,y:100}},step9:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Preview your changes live!"}),i.jsx("div",{className:"desc",children:`Once you've modified your component, refresh your render preview to see the changes live right beside the
        editor.`})]})},{}),button:"",tooltipAdjust:{x:-306,y:50}},step10:{component:i.jsx(function(){return(0,i.jsxs)("div",{children:[i.jsx("div",{className:"title",children:"Awesome Job! Now let’s publish your first component."}),i.jsx("div",{className:"desc",children:"Your component is complete! Click “Publish” to publish it with a NEAR account, and to see your contributions reflected in your graph."})]})},{}),button:"",tooltipAdjust:{x:-306,y:50}}},y=()=>Object.keys(v).reduce((e,t)=>({...e,[t]:(0,a.useRef)()}),{}),N=()=>JSON.parse(localStorage.getItem(w))||{step:0}},40017:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{f:()=>d});var a=n(20997),r=n(60303),o=n(21771),s=e([r]);function d(e){let{near:t,CommitButton:n}=(0,r.b)();return t&&n?a.jsx(n,{near:t,...e}):a.jsx(o.$,{})}r=(s.then?(await s)():s)[0],i()}catch(e){i(e)}})},48097:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{n:()=>c});var a=n(20997),r=n(14300),o=n(60608),s=n(60303),d=n(21771),l=e([r,o,s]);function c(e){let{EthersProvider:t,ethersContext:n,Widget:i}=(0,s.b)(),l=(0,o.B)(),c=(0,r.Z)();return t&&l.hasResolved?a.jsx(t,{value:n,children:a.jsx(i,{config:{redirectMap:l.redirectMap},src:e.src,props:{toast:c,...e.props}})}):a.jsx(d.$,{})}[r,o,s]=l.then?(await l)():l,i()}catch(e){i(e)}})},41314:(e,t,n)=>{n.d(t,{t:()=>r});let i={testnet:{bosDirectory:"one.testnet/widget/BOSDirectory",componentSummary:"discom.testnet/widget/ComponentSummary",componentsPage:"discom.testnet/widget/ComponentsPage",default:"discom.testnet/widget/ActivityPage",digButton:"discom.testnet/widget/DIG.Button",editorComponentSearch:"one.testnet/widget/Editor.ComponentSearch",horizon:{homePage:"nearhorizon.near/widget/HomePage",appPage:"nearhorizon.near/widget/Index"},image:"eugenethedream/widget/Image",nearOrg:{ecosystemCommunityPage:"discom.testnet/widget/NearOrg.Ecosystem.CommunityPage",ecosystemGetFundingPage:"discom.testnet/widget/NearOrg.Ecosystem.GetFundingPage",ecosystemOverviewPage:"discom.testnet/widget/NearOrg.Ecosystem.OverviewPage",ecosystemWorkAndEarnPage:"discom.testnet/widget/NearOrg.Ecosystem.WorkAndEarnPage",footer:"discom.testnet/widget/NearOrg.Footer",homePage:"discom.testnet/widget/NearOrg.HomePage",learningLinks:"discom.testnet/widget/NearOrg.LearningLinks",usePage:"discom.testnet/widget/NearOrg.UsePage"},notificationButton:"discom.testnet/widget/NotificationButton",notificationsPage:"discom.testnet/widget/NotificationsPage",peoplePage:"discom.testnet/widget/PeoplePage",profileImage:"eugenethedream/widget/ProfileImage",profileInlineBlock:"eugenethedream/widget/Profile.InlineBlock",profileName:"eugenethedream/widget/ProfileName",profilePage:"discom.testnet/widget/ProfilePage",search:{indexPage:"discom.testnet/widget/Search.IndexPage",typeAheadDropdown:"discom.testnet/widget/Search.TypeAheadDropdown"},tosCheck:"discom.testnet/widget/TosCheck",tosContent:"discom.testnet/widget/TosContent",viewSource:"eugenethedream/widget/WidgetSource",widgetMetadata:"eugenethedream/widget/WidgetMetadata",widgetMetadataEditor:"discom.testnet/widget/WidgetMetadataEditor",wrapper:"discom.testnet/widget/DIG.Theme",near:"juaner.near/widget/ref-home",warmUp:"guessme.near/widget/ZKEVMWarmUp.warm-up","polygon-zkevm":"bluebiu.near/widget/ZKEVM-all-in-one",tabNavigation:"ref-admin.near/widget/TabNavigation",base:"bluebiu.near/widget/Base.All-in-one",mantle:"bluebiu.near/widget/Mantle.All-in-one",allChains:"bluebiu.near/widget/AllChains.AllChainsPage",arbitrum:"bluebiu.near/widget/Arbitrum.All-in-one",bsc:"bluebiu.near/widget/Bsc.All-in-one",linea:"bluebiu.near/widget/Linea.All-in-one",polygon:"bluebiu.near/widget/Polygon.All-in-one",metis:"bluebiu.near/widget/Metis.All-in-one",gnosis:"bluebiu.near/widget/Gnosis.All-in-one",zkSync:"bluebiu.near/widget/zkSync.All-in-one",avalanche:"bluebiu.near/widget/Avalanche.All-in-one",optimism:"bluebiu.near/widget/Optimism.All-in-one",uniswap:"dapdapbos.near/widget/Uniswap.Swap.Dex"},mainnet:{bosDirectory:"onboarder.near/widget/BOSDirectory",componentSummary:"near/widget/ComponentSummary",componentsPage:"near/widget/ComponentsPage",default:"near/widget/ActivityPage",digButton:"near/widget/DIG.Button",editorComponentSearch:"mob.near/widget/Editor.ComponentSearch",horizon:{homePage:"nearhorizon.near/widget/HomePage",appPage:"nearhorizon.near/widget/Index"},image:"mob.near/widget/Image",nearOrg:{ecosystemCommunityPage:"near/widget/NearOrg.Ecosystem.CommunityPage",ecosystemGetFundingPage:"near/widget/NearOrg.Ecosystem.GetFundingPage",ecosystemOverviewPage:"near/widget/NearOrg.Ecosystem.OverviewPage",ecosystemWorkAndEarnPage:"near/widget/NearOrg.Ecosystem.WorkAndEarnPage",footer:"near/widget/NearOrg.Footer",homePage:"near/widget/NearOrg.HomePage",learningLinks:"near/widget/NearOrg.LearningLinks",usePage:"near/widget/NearOrg.UsePage"},notificationButton:"near/widget/NotificationButton",notificationsPage:"near/widget/NotificationsPage",peoplePage:"near/widget/PeoplePage",profileImage:"mob.near/widget/ProfileImage",profileInlineBlock:"mob.near/widget/Profile.InlineBlock",profileName:"patrick.near/widget/ProfileName",profilePage:"near/widget/ProfilePage",search:{indexPage:"near/widget/Search.IndexPage",typeAheadDropdown:"near/widget/Search.TypeAheadDropdown"},tosCheck:"near/widget/TosCheck",tosContent:"adminalpha.near/widget/TosContent",viewSource:"mob.near/widget/WidgetSource",widgetMetadata:"mob.near/widget/WidgetMetadata",widgetMetadataEditor:"near/widget/WidgetMetadataEditor",wrapper:"near/widget/DIG.Theme",near:"juaner.near/widget/ref-home",warmUp:"guessme.near/widget/ZKEVMWarmUp.warm-up","polygon-zkevm":"bluebiu.near/widget/ZKEVM-all-in-one",tabNavigation:"ref-admin.near/widget/TabNavigation",base:"bluebiu.near/widget/Base.All-in-one",mantle:"bluebiu.near/widget/Mantle.All-in-one",allChains:"bluebiu.near/widget/AllChains.AllChainsPage",arbitrum:"bluebiu.near/widget/Arbitrum.All-in-one",bsc:"bluebiu.near/widget/Bsc.All-in-one",linea:"bluebiu.near/widget/Linea.All-in-one",polygon:"bluebiu.near/widget/Polygon.All-in-one",metis:"bluebiu.near/widget/Metis.All-in-one",gnosis:"bluebiu.near/widget/Gnosis.All-in-one",zkSync:"bluebiu.near/widget/zkSync.All-in-one",avalanche:"bluebiu.near/widget/Avalanche.All-in-one",optimism:"bluebiu.near/widget/Optimism.All-in-one",manta:"bluebiu.near/widget/All-in-one",uniswap:"dapdapbos.near/widget/Uniswap.Swap.Dex"}};var a=n(65752);function r(){let e=i[a.$9];if(!e)throw Error(`useBosComponents(): unimplemented NetworkId "${a.$9}". Add values to "data/bos-components.ts"`);return e}},49929:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.r(t),n.d(t,{default:()=>l});var a=n(20997),r=n(40660),o=n(51571),s=e([r,o]);[r,o]=s.then?(await s)():s;let d=()=>a.jsx(r.p,{});d.getLayout=o.wQ;let l=d;i()}catch(e){i(e)}})},4179:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{q:()=>o});var a=n(69890),r=e([a]);a=(r.then?(await r)():r)[0];let o=(0,a.create)(e=>({src:null,setSrc:t=>e(()=>({src:t}))}));i()}catch(e){i(e)}})},60303:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.d(t,{b:()=>o});var a=n(69890),r=e([a]);a=(r.then?(await r)():r)[0];let o=(0,a.create)(e=>({cache:null,CommitButton:null,ethersContext:null,EthersProvider:null,Widget:null,near:null,set:t=>e(()=>({...t}))}));i()}catch(e){i(e)}})},65752:(e,t,n)=>{n.d(t,{$9:()=>i,L5:()=>a,mB:()=>r});let i=process.env.NEXT_PUBLIC_NETWORK_ID||"mainnet",a={mainnet:{networkId:"mainnet",viewAccountId:"near",nodeUrl:"https://rpc.mainnet.near.org",walletUrl:"https://wallet.near.org",helperUrl:"https://helper.mainnet.near.org",fastAuth:{mpcRecoveryUrl:"https://mpc-recovery-leader-mainnet-cg7nolnlpa-ue.a.run.app",authHelperUrl:"https://api.kitwallet.app",accountIdSuffix:"near",firebase:{apiKey:"AIzaSyDhxTQVeoWdnbpYTocBAABbLULGf6H5khQ",authDomain:"near-fastauth-prod.firebaseapp.com",projectId:"near-fastauth-prod",storageBucket:"near-fastauth-prod.appspot.com",messagingSenderId:"829449955812",appId:"1:829449955812:web:532436aa35572be60abff1",measurementId:"G-T2PPJ8QRYY"}}},testnet:{networkId:"testnet",viewAccountId:"testnet",nodeUrl:"https://rpc.testnet.near.org",walletUrl:"https://wallet.testnet.near.org",helperUrl:"https://helper.testnet.near.org",fastAuth:{mpcRecoveryUrl:"https://mpc-recovery-7tk2cmmtcq-ue.a.run.app",authHelperUrl:"https://testnet-api.kitwallet.app",accountIdSuffix:"testnet",firebase:{apiKey:"AIzaSyDAh6lSSkEbpRekkGYdDM5jazV6IQnIZFU",authDomain:"pagoda-oboarding-dev.firebaseapp.com",projectId:"pagoda-oboarding-dev",storageBucket:"pagoda-oboarding-dev.appspot.com",messagingSenderId:"116526963563",appId:"1:116526963563:web:053cb0c425bf514007ca2e",measurementId:"G-HF2NBGE60S"}}}}[i],r="testnet"===i?"v1.social08.testnet":"social.near"}};