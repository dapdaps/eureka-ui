"use strict";(()=>{var e={};e.id=2164,e.ids=[2164,2888,660],e.modules={1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},47260:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{config:()=>S,default:()=>c,getServerSideProps:()=>P,getStaticPaths:()=>m,getStaticProps:()=>d,reportWebVitals:()=>g,routeModule:()=>A,unstable_getServerProps:()=>b,unstable_getServerSideProps:()=>v,unstable_getStaticParams:()=>_,unstable_getStaticPaths:()=>f,unstable_getStaticProps:()=>x});var o=r(87093),a=r(35244),l=r(1323),n=r(65211),i=r(64807),u=r(82562),p=e([i]);i=(p.then?(await p)():p)[0];let c=(0,l.l)(u,"default"),d=(0,l.l)(u,"getStaticProps"),m=(0,l.l)(u,"getStaticPaths"),P=(0,l.l)(u,"getServerSideProps"),S=(0,l.l)(u,"config"),g=(0,l.l)(u,"reportWebVitals"),x=(0,l.l)(u,"unstable_getStaticProps"),f=(0,l.l)(u,"unstable_getStaticPaths"),_=(0,l.l)(u,"unstable_getStaticParams"),b=(0,l.l)(u,"unstable_getServerProps"),v=(0,l.l)(u,"unstable_getServerSideProps"),A=new o.PagesRouteModule({definition:{kind:a.x.PAGES,page:"/sitemap.xml",pathname:"/sitemap.xml",bundlePath:"",filename:""},components:{App:i.default,Document:n.default},userland:u});s()}catch(e){s(e)}})},65211:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});var s=r(20997),o=r(56859),a=r.n(o),l=r(57518);class n extends a(){static async getInitialProps(e){let t=new l.ServerStyleSheet,r=e.renderPage;try{e.renderPage=()=>r({enhanceApp:e=>r=>t.collectStyles(s.jsx(e,{...r}))});let o=await a().getInitialProps(e);return{...o,styles:[o.styles,t.getStyleElement()]}}finally{t.seal()}}}},82562:(e,t,r)=>{function s({res:e}){let t=`
    <xml version="1.0" encoding="UTF-8">
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/near/widget/NearOrg.HomePage</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/use</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/learn</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/ecosystem</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
    </urlset>
    </xml>
   `;return e.setHeader("Content-Type","text/xml"),e.write(t),e.end(),{props:{}}}r.r(t),r.d(t,{default:()=>o,getServerSideProps:()=>s});let o=function(){}},35244:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},71982:e=>{e.exports=require("ethers")},93908:e=>{e.exports=require("lodash/debounce")},62785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},40968:e=>{e.exports=require("next/head")},16689:e=>{e.exports=require("react")},66405:e=>{e.exports=require("react-dom")},20997:e=>{e.exports=require("react/jsx-runtime")},57518:e=>{e.exports=require("styled-components")},1718:e=>{e.exports=import("@web3-onboard/react")},54275:e=>{e.exports=import("react-loading-skeleton")},3590:e=>{e.exports=import("react-toastify")},71395:e=>{e.exports=import("tslib")},69890:e=>{e.exports=import("zustand")},43602:e=>{e.exports=import("zustand/middleware")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},59796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[8428,8640,6859,4807],()=>r(47260));module.exports=s})();