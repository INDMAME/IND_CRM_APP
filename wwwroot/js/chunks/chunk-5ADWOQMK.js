import{a as B,c as L}from"./chunk-I32JWJZW.js";import{b as g}from"./chunk-RNLUE6RG.js";var r=g(B()),b=g(L()),h=(c,d,s)=>Math.min(s,Math.max(d,c)),T=({route:c,ariaLabel:d,size:s=76,right:R=24,bottom:k=24,color:m="#00296b",shadowOpacity:w=.16,plusThickness:p=4,plusLength:v=28,onClick:x})=>{let C=(0,r.useRef)(null),y=(0,r.useRef)(null),$=(0,r.useCallback)(()=>{let o=h(w,0,.5),e=h(p,2,8),t=h(v,16,40),n=48,f=n-e/2,u=n-t/2,a=n-t/2,i=n-e/2;return`
      <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fabShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="-4" dy="10" stdDeviation="6" flood-color="#000" flood-opacity="${o}"/>
          </filter>
        </defs>

        <g filter="url(#fabShadow)">
          <circle cx="48" cy="48" r="34" fill="${m}"/>
        </g>

        <g fill="#fff">
          <rect x="${f}" y="${u}" width="${e}" height="${t}" rx="1"/>
          <rect x="${a}" y="${i}" width="${t}" height="${e}" rx="1"/>
        </g>
      </svg>
    `.trim()},[m,w,v,p]),l=(0,r.useCallback)(()=>{let o=y.current;if(!o)return;let e=o.getContext("2d");if(!e)return;let t=Math.max(40,s),n=window.devicePixelRatio||1;o.width=Math.round(t*n),o.height=Math.round(t*n),o.style.width=`${t}px`,o.style.height=`${t}px`,e.setTransform(n,0,0,n,0,0);let f=$(),u=new Blob([f],{type:"image/svg+xml"}),a=URL.createObjectURL(u),i=new Image;i.decoding="async",i.onload=()=>{e.clearRect(0,0,t,t),e.drawImage(i,0,0,t,t),URL.revokeObjectURL(a)},i.onerror=()=>{URL.revokeObjectURL(a)},i.src=a},[$,s]);(0,r.useEffect)(()=>(l(),window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)),[l]);let M=()=>{if(typeof x=="function"){x();return}!c||typeof window>"u"||(window.location.href=c)};return(0,b.jsx)("button",{ref:C,type:"button","aria-label":d,className:"fixed z-2000 rounded-md p-0 border-0 bg-transparent transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4",style:{width:`${s}px`,height:`${s}px`,right:`${R}px`,bottom:`${k}px`,WebkitTapHighlightColor:"transparent"},onClick:M,children:(0,b.jsx)("canvas",{ref:y,className:"block rounded-md"})})},E=T;export{E as a};
//# sourceMappingURL=chunk-5ADWOQMK.js.map
