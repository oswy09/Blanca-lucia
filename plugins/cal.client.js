export default defineNuxtPlugin(() => {
  const s = document.createElement('script')
  s.innerHTML = `
    (function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const ns=ar[1];api.q=api.q||[];typeof ns==="string"?(cal.ns[ns]=api)&&p(api,ar):p(cal,ar);return}p(cal,ar)};})(window,"https://app.cal.com/embed/embed.js","init");
    Cal("init",{origin:"https://cal.com"});
    Cal("ui",{"theme":"light","styles":{"branding":{"brandColor":"#2e8a93"}},"hideEventTypeDetails":false,"layout":"month_view"});
  `
  document.head.appendChild(s)
})
