import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{b as oe,r as u}from"./index-oxIuDU2I.js";import{c as le}from"./index-DPky3QY3.js";import{u as ie}from"./index-ClNQsJSf.js";import{u as z}from"./index-Dlnm4PWD.js";import{P as L}from"./index-DaH4uQ64.js";import{c as _}from"./cn-BQHNewu7.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DIpMxC3j.js";import"./index-ipoFIpvr.js";var w={exports:{}},F={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R;function ce(){if(R)return F;R=1;var e=oe();function r(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var s=typeof Object.is=="function"?Object.is:r,o=e.useState,l=e.useEffect,t=e.useLayoutEffect,f=e.useDebugValue;function c(n,i){var g=i(),N=o({inst:{value:g,getSnapshot:i}}),p=N[0].inst,E=N[1];return t(function(){p.value=g,p.getSnapshot=i,d(p)&&E({inst:p})},[n,g,i]),l(function(){return d(p)&&E({inst:p}),n(function(){d(p)&&E({inst:p})})},[n]),f(g),g}function d(n){var i=n.getSnapshot;n=n.value;try{var g=i();return!s(n,g)}catch{return!0}}function x(n,i){return i()}var A=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?x:c;return F.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:A,F}var C;function de(){return C||(C=1,w.exports=ce()),w.exports}var ue=de();function me(){return ue.useSyncExternalStore(ve,()=>!0,()=>!1)}function ve(){return()=>{}}var I="Avatar",[pe]=le(I),[fe,X]=pe(I),Y=u.forwardRef((e,r)=>{const{__scopeAvatar:s,...o}=e,[l,t]=u.useState("idle");return a.jsx(fe,{scope:s,imageLoadingStatus:l,onImageLoadingStatusChange:t,children:a.jsx(L.span,{...o,ref:r})})});Y.displayName=I;var Z="AvatarImage",ee=u.forwardRef((e,r)=>{const{__scopeAvatar:s,src:o,onLoadingStatusChange:l=()=>{},...t}=e,f=X(Z,s),c=xe(o,t),d=ie(x=>{l(x),f.onImageLoadingStatusChange(x)});return z(()=>{c!=="idle"&&d(c)},[c,d]),c==="loaded"?a.jsx(L.img,{...t,ref:r,src:o}):null});ee.displayName=Z;var ae="AvatarFallback",re=u.forwardRef((e,r)=>{const{__scopeAvatar:s,delayMs:o,...l}=e,t=X(ae,s),[f,c]=u.useState(o===void 0);return u.useEffect(()=>{if(o!==void 0){const d=window.setTimeout(()=>c(!0),o);return()=>window.clearTimeout(d)}},[o]),f&&t.imageLoadingStatus!=="loaded"?a.jsx(L.span,{...l,ref:r}):null});re.displayName=ae;function $(e,r){return e?r?(e.src!==r&&(e.src=r),e.complete&&e.naturalWidth>0?"loaded":"loading"):"error":"idle"}function xe(e,{referrerPolicy:r,crossOrigin:s}){const o=me(),l=u.useRef(null),t=o?(l.current||(l.current=new window.Image),l.current):null,[f,c]=u.useState(()=>$(t,e));return z(()=>{c($(t,e))},[t,e]),z(()=>{const d=n=>()=>{c(n)};if(!t)return;const x=d("loaded"),A=d("error");return t.addEventListener("load",x),t.addEventListener("error",A),r&&(t.referrerPolicy=r),typeof s=="string"&&(t.crossOrigin=s),()=>{t.removeEventListener("load",x),t.removeEventListener("error",A)}},[t,s,r]),f}var te=Y,se=ee,ne=re;const m=u.forwardRef(({className:e,size:r="md",...s},o)=>{const l={xs:"size-6",sm:"size-8",md:"size-10",lg:"size-12",xl:"size-16"};return a.jsx(te,{ref:o,className:_("relative flex shrink-0 overflow-hidden rounded-full",l[r],e),...s})});m.displayName=te.displayName;const h=u.forwardRef(({className:e,...r},s)=>a.jsx(se,{ref:s,className:_("aspect-square size-full",e),...r}));h.displayName=se.displayName;const v=u.forwardRef(({className:e,...r},s)=>a.jsx(ne,{ref:s,className:_("flex size-full items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--neutral-600)] text-sm font-medium",e),...r}));v.displayName=ne.displayName;m.__docgenInfo={description:"",methods:[],props:{size:{required:!1,tsType:{name:"union",raw:'"xs" | "sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}}}};h.__docgenInfo={description:"",methods:[]};v.__docgenInfo={description:"",methods:[]};const ze={title:"Components/Avatar",component:m,tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]}}},S={render:e=>a.jsxs(m,{...e,children:[a.jsx(h,{src:"https://i.pravatar.cc/150?u=sarah",alt:"Sarah Johnson"}),a.jsx(v,{children:"SJ"})]}),args:{size:"md"}},j={render:()=>a.jsx("div",{className:"flex items-center gap-3",children:["xs","sm","md","lg","xl"].map(e=>a.jsxs("div",{className:"flex flex-col items-center gap-1",children:[a.jsxs(m,{size:e,children:[a.jsx(h,{src:`https://i.pravatar.cc/150?u=${e}`,alt:e}),a.jsx(v,{children:"AB"})]}),a.jsx("span",{className:"text-xs text-[var(--neutral-500)]",children:e})]},e))})},y={render:()=>a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsx(m,{children:a.jsx(v,{children:"SK"})}),a.jsx(m,{children:a.jsx(v,{children:"MJ"})}),a.jsx(m,{children:a.jsx(v,{children:"ED"})})]})},b={render:()=>a.jsx("div",{className:"flex items-center gap-3",children:["xs","sm","md","lg","xl"].map(e=>a.jsx(m,{size:e,children:a.jsx(v,{children:"KS"})},e))})},k={name:"Avatar Group",render:()=>a.jsxs("div",{className:"flex -space-x-2",children:[["sarah","mike","emily","david"].map(e=>a.jsxs(m,{className:"ring-2 ring-white",children:[a.jsx(h,{src:`https://i.pravatar.cc/150?u=${e}`,alt:e}),a.jsx(v,{children:e[0].toUpperCase()})]},e)),a.jsx(m,{className:"ring-2 ring-white",children:a.jsx(v,{className:"text-xs",children:"+3"})})]})};var q,M,D;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Johnson" />
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>,
  args: {
    size: "md"
  }
}`,...(D=(M=S.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var G,J,K;j.parameters={...j.parameters,docs:{...(G=j.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <div key={size} className="flex flex-col items-center gap-1">
          <Avatar size={size}>
            <AvatarImage src={\`https://i.pravatar.cc/150?u=\${size}\`} alt={size} />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <span className="text-xs text-[var(--neutral-500)]">{size}</span>
        </div>)}
    </div>
}`,...(K=(J=j.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var P,T,U;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>ED</AvatarFallback>
      </Avatar>
    </div>
}`,...(U=(T=y.parameters)==null?void 0:T.docs)==null?void 0:U.source}}};var V,B,W;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Avatar key={size} size={size}>
          <AvatarFallback>KS</AvatarFallback>
        </Avatar>)}
    </div>
}`,...(W=(B=b.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var H,O,Q;k.parameters={...k.parameters,docs:{...(H=k.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: "Avatar Group",
  render: () => <div className="flex -space-x-2">
      {["sarah", "mike", "emily", "david"].map(name => <Avatar key={name} className="ring-2 ring-white">
          <AvatarImage src={\`https://i.pravatar.cc/150?u=\${name}\`} alt={name} />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>)}
      <Avatar className="ring-2 ring-white">
        <AvatarFallback className="text-xs">+3</AvatarFallback>
      </Avatar>
    </div>
}`,...(Q=(O=k.parameters)==null?void 0:O.docs)==null?void 0:Q.source}}};const Le=["Default","AllSizes","WithFallback","FallbackSizes","Group"];export{j as AllSizes,S as Default,b as FallbackSizes,k as Group,y as WithFallback,Le as __namedExportsOrder,ze as default};
