var k=Object.defineProperty,j=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var D=(t,a,l)=>a in t?k(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l,f=(t,a)=>{for(var l in a||(a={}))O.call(a,l)&&D(t,l,a[l]);if(v)for(var l of v(a))B.call(a,l)&&D(t,l,a[l]);return t},C=(t,a)=>j(t,w(a));import{f as b,a as g,b as E,_ as I,F as T}from"./8e804c7a.js";import{v as h,q as H,h as P,o as c,c as V,e as R,w as _,F as q,z,D as A,G as y,l as s,r as G,H as L}from"./51302e18.js";const Y={__name:"index",props:C(f({},b),{defaultFormData:{type:Object},itemConfigs:{type:Array,default:()=>[]},rules:{type:Object,default:()=>({})}}),emits:[...g,...E],setup(t,{expose:a,emit:l}){const o=t,r=h(),p=H(o.defaultFormData||o.itemConfigs.reduce((e,d)=>(e[d.key]=void 0,e),{})),i=P(()=>o.formData||p),$=e=>{o.formData?l("update:formData",f(f({},o.formData),e)):Object.assign(p,e)};return a({clearValidate:(...e)=>r.value.clearValidate(...e),getFieldsValue:(...e)=>r.value.getFieldsValue(...e),resetFields:(...e)=>r.value.resetFields(...e),scrollToField:(...e)=>r.value.scrollToField(...e),validate:(...e)=>r.value.validate(...e),validateFields:(...e)=>r.value.validateFields(...e)}),(e,d)=>(c(),V("div",null,[R(s(T),y({ref_key:"$formRef",ref:r,labelWrap:!0,model:s(i),rules:t.rules,labelCol:e.labelCol,wrapperCol:e.wrapperCol},L(s(g).reduce((n,m)=>(n[m]=(...u)=>l(m,...u))&&n,{})),e.$attrs),{default:_(()=>[(c(!0),V(q,null,z(t.itemConfigs,(n,m)=>(c(),A(I,y({key:m,item:n},Object.keys(s(b)).reduce((u,F)=>Object.assign(u,{[F]:o[F]}),{}),{formData:s(i),"onUpdate:formData":$,onCancel:d[0]||(d[0]=u=>e.$emit("cancel",s(i)))}),null,16,["item","formData"]))),128)),G(e.$slots,"footer",{data:s(i)})]),_:3},16,["model","rules","labelCol","wrapperCol"])]))}};export{Y as _};
