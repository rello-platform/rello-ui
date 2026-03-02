import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./index-oxIuDU2I.js";import{c as U}from"./index-DPky3QY3.js";import{P as T}from"./index-DaH4uQ64.js";import{c as h}from"./cn-BQHNewu7.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DIpMxC3j.js";import"./index-ipoFIpvr.js";var g="Progress",N=100,[B]=U(g),[H,J]=B(g),C=f.forwardRef((e,r)=>{const{__scopeProgress:i,value:t=null,max:s,getValueLabel:x=K,...X}=e;(s||s===0)&&!w(s)&&console.error(Q(`${s}`,"Progress"));const l=w(s)?s:N;t!==null&&!P(t,l)&&console.error(W(`${t}`,"Progress"));const n=P(t,l)?t:null,F=v(n)?x(n,l):void 0;return a.jsx(H,{scope:i,value:n,max:l,children:a.jsx(T.div,{"aria-valuemax":l,"aria-valuemin":0,"aria-valuenow":v(n)?n:void 0,"aria-valuetext":F,role:"progressbar","data-state":q(n,l),"data-value":n??void 0,"data-max":l,...X,ref:r})})});C.displayName=g;var O="ProgressIndicator",k=f.forwardRef((e,r)=>{const{__scopeProgress:i,...t}=e,s=J(O,i);return a.jsx(T.div,{"data-state":q(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...t,ref:r})});k.displayName=O;function K(e,r){return`${Math.round(e/r*100)}%`}function q(e,r){return e==null?"indeterminate":e===r?"complete":"loading"}function v(e){return typeof e=="number"}function w(e){return v(e)&&!isNaN(e)&&e>0}function P(e,r){return v(e)&&!isNaN(e)&&e<=r&&e>=0}function Q(e,r){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${r}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${N}\`.`}function W(e,r){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${r}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${N} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var G=C,Y=k;const Z={default:"bg-[var(--brand-primary)]",success:"bg-[var(--success)]",warning:"bg-[var(--warning)]",error:"bg-[var(--error)]",hot:"bg-[var(--hot)]",cold:"bg-[var(--cold)]"},ee={sm:"h-1.5",md:"h-2",lg:"h-3"},o=f.forwardRef(({className:e,value:r,variant:i="default",size:t="md",...s},x)=>a.jsx(G,{ref:x,className:h("relative w-full overflow-hidden rounded-full bg-[var(--neutral-100)]",ee[t],e),...s,children:a.jsx(Y,{className:h("h-full w-full flex-1 transition-all duration-300 ease-in-out rounded-full",Z[i]),style:{transform:`translateX(-${100-(r||0)}%)`}})}));o.displayName=G.displayName;o.__docgenInfo={description:"",methods:[],props:{variant:{required:!1,tsType:{name:"union",raw:'"default" | "success" | "warning" | "error" | "hot" | "cold"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'},{name:"literal",value:'"hot"'},{name:"literal",value:'"cold"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}}}};const me={title:"Components/Progress",component:o,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","success","warning","error","hot","cold"]},size:{control:"select",options:["sm","md","lg"]},value:{control:{type:"range",min:0,max:100,step:5}}}},c={args:{value:60},decorators:[e=>a.jsx("div",{className:"w-64",children:a.jsx(e,{})})]},d={render:()=>a.jsx("div",{className:"flex flex-col gap-4 w-64",children:["default","success","warning","error","hot","cold"].map(e=>a.jsxs("div",{className:"flex flex-col gap-1",children:[a.jsx("span",{className:"text-xs text-[var(--neutral-500)] capitalize",children:e}),a.jsx(o,{variant:e,value:65})]},e))})},m={render:()=>a.jsx("div",{className:"flex flex-col gap-4 w-64",children:["sm","md","lg"].map(e=>a.jsxs("div",{className:"flex flex-col gap-1",children:[a.jsxs("span",{className:"text-xs text-[var(--neutral-500)]",children:['size="',e,'"']}),a.jsx(o,{size:e,value:50})]},e))})},u={name:"Progress Values",render:()=>a.jsx("div",{className:"flex flex-col gap-3 w-64",children:[0,25,50,75,100].map(e=>a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsxs("span",{className:"text-xs text-[var(--neutral-500)] w-8 text-right",children:[e,"%"]}),a.jsx(o,{value:e,className:"flex-1"})]},e))})},p={name:"Lead Score Example",render:()=>a.jsxs("div",{className:"flex flex-col gap-2 w-72",children:[a.jsxs("div",{className:"flex justify-between",children:[a.jsx("span",{className:"text-sm font-medium text-[var(--foreground)]",children:"Lead Score"}),a.jsx("span",{className:"text-sm font-medium text-[var(--hot)]",children:"85/100"})]}),a.jsx(o,{variant:"hot",value:85,size:"lg"})]})};var j,b,y;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    value: 60
  },
  decorators: [Story => <div className="w-64"><Story /></div>]
}`,...(y=(b=c.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var S,z,V;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      {(["default", "success", "warning", "error", "hot", "cold"] as const).map(variant => <div key={variant} className="flex flex-col gap-1">
          <span className="text-xs text-[var(--neutral-500)] capitalize">{variant}</span>
          <Progress variant={variant} value={65} />
        </div>)}
    </div>
}`,...(V=(z=d.parameters)==null?void 0:z.docs)==null?void 0:V.source}}};var E,_,$;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      {(["sm", "md", "lg"] as const).map(size => <div key={size} className="flex flex-col gap-1">
          <span className="text-xs text-[var(--neutral-500)]">size="{size}"</span>
          <Progress size={size} value={50} />
        </div>)}
    </div>
}`,...($=(_=m.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var I,L,A;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Progress Values",
  render: () => <div className="flex flex-col gap-3 w-64">
      {[0, 25, 50, 75, 100].map(val => <div key={val} className="flex items-center gap-3">
          <span className="text-xs text-[var(--neutral-500)] w-8 text-right">{val}%</span>
          <Progress value={val} className="flex-1" />
        </div>)}
    </div>
}`,...(A=(L=u.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var R,D,M;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Lead Score Example",
  render: () => <div className="flex flex-col gap-2 w-72">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-[var(--foreground)]">Lead Score</span>
        <span className="text-sm font-medium text-[var(--hot)]">85/100</span>
      </div>
      <Progress variant="hot" value={85} size="lg" />
    </div>
}`,...(M=(D=p.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};const ue=["Default","AllVariants","AllSizes","ProgressValues","LeadScore"];export{m as AllSizes,d as AllVariants,c as Default,p as LeadScore,u as ProgressValues,ue as __namedExportsOrder,me as default};
