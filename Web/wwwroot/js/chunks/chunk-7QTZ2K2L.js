var o=n=>String(n||"").trim().toUpperCase(),d=(n,t)=>{if(!t)return null;for(let e of n)if(o(e.companyId)===t)return e;return null},s=(n,t,e)=>{let l=o(n),c=o(e),a=Array.isArray(t)?t.filter(i=>o(i.companyId)):[],r=d(a,l);return r?r.companyId:(d(a,c)||a.find(i=>i.isDefault===!0)||a[0]||null)?.companyId||""};export{s as a};
//# sourceMappingURL=chunk-7QTZ2K2L.js.map
