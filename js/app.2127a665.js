(function(){"use strict";var e={4908:function(e,t,r){var n=r(9242),i=r(3396),a=r(7139);const o={class:"transition-in"},c={class:"flex flex-col m-auto mt-[2rem] px-5 lg:flex-row lg:px-10 lg:max-w-screen-xl lg:gap-5 lg:mt-[9rem]"},s={class:"flex flex-col flex-1 justify-between text-center items-center lg:text-left lg:items-start"},l={class:"mt-5"},u={class:"hidden lg:flex"},p={class:"flex-1 mt-5"},d=(0,i._)("p",{class:"hidden md:flex lg:flex"},"Price of 30 days ago",-1);function m(e,t,r,n,m,f){const g=(0,i.up)("main-header"),v=(0,i.up)("cripto-selector"),h=(0,i.up)("date-time-picker"),y=(0,i.up)("price-holder"),b=(0,i.up)("graph-view"),x=(0,i.up)("message-balloon");return(0,i.wg)(),(0,i.iD)("div",o,[(0,i.Wm)(g),(0,i._)("div",c,[(0,i._)("section",s,[(0,i._)("div",null,[(0,i.Wm)(v,{class:"w-full mb-5","onUpdate:cripto":n.updateCripto},null,8,["onUpdate:cripto"]),(0,i.Wm)(h,{class:"w-full","onUpdate:dateTime":n.updateDateTime},null,8,["onUpdate:dateTime"])]),(0,i._)("div",l,[(0,i._)("p",u,(0,a.zw)(n.currentCripto.dateTime?`Nearest price at ${n.convertDate(new Date(n.currentCripto.dateTime))}`:"Price now"),1),(0,i.Wm)(y,{currentPrice:n.currentCripto.price},null,8,["currentPrice"])])]),(0,i._)("section",p,[d,(0,i.Wm)(b,{history:n.currentCripto.history},null,8,["history"])])]),(0,i.Wm)(x,{message:n.error},null,8,["message"])])}const f={class:"bg-amber-400"},g=(0,i._)("h1",{class:"primary-font p-2 text-3xl text-center text-neutral-600 md:p-4 md:text-6xl"}," CRIPTO_NOW ",-1),v=[g];function h(e,t,r,n,a,o){return(0,i.wg)(),(0,i.iD)("div",f,v)}var y={name:"main-header"},b=r(89);const x=(0,b.Z)(y,[["render",h]]);var w=x;const _=(0,i.uE)('<option value="" disabled selected>Choose a criptocurrency</option><option selected value="bitcoin">Bitcoin</option><option value="dacxi">DACXI</option><option value="ethereum">ETH</option><option value="cosmos">ATOM</option><option value="terra-luna">LUNA</option>',6),T=[_];function $(e,t,r,n,a,o){return(0,i.wg)(),(0,i.iD)("select",(0,i.dG)(e.$attrs,{onChange:t[0]||(t[0]=(...e)=>n.changeCripto&&n.changeCripto(...e)),class:"p-4 text-2xl text-neutral-600 cursor-pointer rounded border border-neutral-200 outline-none transition ease-in-out delay-150 hover:border-neutral-500 duration-300"}),T,16)}var D={name:"cripto-selector",setup(e,{emit:t}){function r(e){t("update:cripto",e.target.value)}return{changeCripto:r}}};const C=(0,b.Z)(D,[["render",$]]);var O=C;const k={class:"text-4xl primary-font text-red-500 sm:text-7xl md:text-7xl lg:text-8xl"};function j(e,t,r,n,o,c){return(0,i.wg)(),(0,i.iD)("span",k,(0,a.zw)(r.currentPrice.toLocaleString("pt-br",{style:"currency",currency:"BRL",maximumFractionDigits:5})),1)}var P={name:"price-holder",props:{currentPrice:{type:Number,required:!0}}};const I=(0,b.Z)(P,[["render",j]]);var S=I;function Z(e,t,r,n,o,c){const s=(0,i.up)("vue-ctk-date-time-picker");return(0,i.wg)(),(0,i.iD)("div",(0,a.vs)((0,i.F4)(e.$attrs)),[(0,i.Wm)(s,{"max-date":(new Date).toISOString(),label:"Select specific date & time",modelValue:n.dateRef,"onUpdate:modelValue":t[0]||(t[0]=e=>n.dateRef=e),"no-button-now":"",locale:"en"},null,8,["max-date","modelValue"])],16)}var M=r(4870),W=r(2349),H=r.n(W),R={name:"date-time-picker",components:{VueCtkDateTimePicker:H()},setup(e,{emit:t}){const r=(0,M.iH)();return(0,i.m0)((()=>t("update:dateTime",r.value))),{dateRef:r}}};const A=(0,b.Z)(R,[["render",Z],["__scopeId","data-v-3b70b366"]]);var L=A;const N={class:"text-white text-xl font-semibold"};function U(e,t,r,n,o,c){return(0,i.wg)(),(0,i.iD)("div",{class:(0,a.C_)(["fixed bottom-5 left-5 p-5 rounded drop-shadow-xl transition-opacity",`${n.color} ${n.active?"opacity-100":"opacity-0"}`])},[(0,i._)("span",N,(0,a.zw)(r.message.message),1)],2)}var V={name:"message-balloon",props:{message:{type:Object,default:()=>({type:"error",message:""})}},setup(e){let t=(0,M.iH)("bg-red-500"),r=(0,M.iH)(!1);return(0,i.m0)((()=>{e.message.message&&(r.value=!0),"error"===e.message.type?t.value="bg-red-500":"success"===e.message.type&&(t.value="bg-green-500"),setTimeout((()=>{r.value=!1}),5e3)})),{color:t,active:r}}};const F=(0,b.Z)(V,[["render",U]]);var q=F,z=r(6294),B=r(5140);function E(e){let t=e.getDate(),r=e.getMonth()+1,n=e.getFullYear();return t=t<=9?`0${t}`:t,r=r<=9?`0${r}`:r,`${t}/${r}/${n}`}function G(e){return e instanceof Date&&!isNaN(e)}B.kL.register(B.Dx,B.u,B.De,B.jn,B.f$,B.od,B.uw);var X=(0,i.aZ)({name:"LineChart",components:{Line:z.x1},props:{chartId:{type:String,default:"line-chart"},history:{type:Array,default:()=>[]}},setup(e){let t=(0,M.iH)({labels:[],datasets:[{label:e.name,backgroundColor:"rgb(251 191 36)",data:[]}]});(0,i.m0)((()=>{t={labels:e.history.map((([e])=>E(new Date(e)))),datasets:[{label:"Price R$",backgroundColor:"rgb(251 191 36)",borderColor:"rgb(251 191 36)",data:e.history.map((([,e])=>e))}]}}));const r={responsive:!0,maintainAspectRatio:!1};return()=>(0,i.h)(z.x1,{chartData:t,chartOptions:r,chartId:e.chartId})}}),Y=r(2482);const J=1e3,K=60*J;class Q{constructor(){(0,Y.Z)(this,"url","https://api.coingecko.com/api/v3"),(0,Y.Z)(this,"interval",void 0),(0,Y.Z)(this,"simple",{uri:`${this.url}/simple`,async current_price(e,t="brl"){if(!e)return;const r=await fetch(`${this.uri}/price?ids=${e}&vs_currencies=${t}`),n=await r.json();return n[e][t]}}),(0,Y.Z)(this,"coins",{uri:`${this.url}/coins`,async get_history(e,t=30,r="brl"){if(!e)return;const n=await fetch(`${this.uri}/${e}/market_chart?vs_currency=${r}&days=${t}&interval=daily`),i=await n.json();return i.prices},async get_history_range(e,t,r="brl"){if(!e)return;const n=t.from.getTime()/J,i=t.to.getTime()/J,a=await fetch(`${this.uri}/${e}/market_chart/range?vs_currency=${r}&from=${n}&to=${i}`),o=await a.json();return o.prices},async get_specific_time(e,t,r="brl"){if(!e||!G(t))return;const n=1440,i=new Date(t.getTime()-K*n),a=new Date(t.getTime()+K*n),o=await this.get_history_range(e,{from:i,to:a},r),c=o.reduce(((e,r)=>{const[n]=r,[i]=e;return Math.abs(i-t.getTime())>Math.abs(n-t.getTime())?r:e}));return{date:c[0],price:c[1]}}})}startInterval(e,t=10){clearInterval(this.interval),this.interval=setInterval(e,t*J)}endInterval(){clearInterval(this.interval)}}const ee=new Q;var te={name:"App",components:{MainHeader:w,CriptoSelector:O,PriceHolder:S,DateTimePicker:L,GraphView:X,MessageBalloon:q},setup(){const e=(0,M.qj)({cripto:"bitcoin",dateTime:void 0,price:0,history:[]}),t=(0,M.qj)({message:"",type:"error"});async function r(r){if(!r)return e.dateTime=void 0,i();ee.endInterval(),e.dateTime=r;const n=new Date(r);try{const t=await ee.coins.get_specific_time(e.cripto,n);t&&(e.price=t.price)}catch(a){t.message=a.message,console.error(a)}}async function n(n){if(e.cripto=n,e.dateTime)return r(e.dateTime);try{e.price=await ee.simple.current_price(n),e.history=await ee.coins.get_history(n)}catch(i){t.message=i.message,console.error(i)}}function i(){n(e.cripto),ee.startInterval((()=>n(e.cripto)))}return i(),{convertDate:E,updateCripto:n,updateDateTime:r,currentCripto:e,error:t}}};const re=(0,b.Z)(te,[["render",m]]);var ne=re;(0,n.ri)(ne).mount("#app")}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.m=e,function(){var e=[];r.O=function(t,n,i,a){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],i=e[u][1],a=e[u][2];for(var c=!0,s=0;s<n.length;s++)(!1&a||o>=a)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(c=!1,a<o&&(o=a));if(c){e.splice(u--,1);var l=i();void 0!==l&&(t=l)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,i,a]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,a,o=n[0],c=n[1],s=n[2],l=0;if(o.some((function(t){return 0!==e[t]}))){for(i in c)r.o(c,i)&&(r.m[i]=c[i]);if(s)var u=s(r)}for(t&&t(n);l<o.length;l++)a=o[l],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(u)},n=self["webpackChunkcripto_now"]=self["webpackChunkcripto_now"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(4908)}));n=r.O(n)})();
//# sourceMappingURL=app.2127a665.js.map