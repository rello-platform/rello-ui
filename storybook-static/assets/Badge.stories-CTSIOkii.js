import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as A,a as I,L as C}from"./WarningTriangle-BeYZSLnk.js";import{B as a}from"./Badge-CHaqV_Id.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./IconoirContext-CmFnpqeW.js";import"./index-B59X7VKu.js";import"./cn-BQHNewu7.js";const O={title:"Components/Badge",component:a,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","primary","accent","success","warning","error","info","hot","qualified","engaged","warming","cold"]},size:{control:"select",options:["xs","sm","md","lg"]},dot:{control:"boolean"}}},r={args:{children:"Badge",variant:"default",size:"md"}},n={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"primary",children:"Primary"}),e.jsx(a,{variant:"accent",children:"Accent"}),e.jsx(a,{variant:"success",children:"Success"}),e.jsx(a,{variant:"warning",children:"Warning"}),e.jsx(a,{variant:"error",children:"Error"}),e.jsx(a,{variant:"info",children:"Info"})]})},s={name:"Pipeline Stages",render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"hot",children:"Hot"}),e.jsx(a,{variant:"qualified",children:"Qualified"}),e.jsx(a,{variant:"engaged",children:"Engaged"}),e.jsx(a,{variant:"warming",children:"Warming"}),e.jsx(a,{variant:"cold",children:"Cold"})]})},i={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(a,{size:"xs",children:"Extra Small"}),e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"})]})},t={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"success",dot:!0,children:"Active"}),e.jsx(a,{variant:"warning",dot:!0,children:"Pending"}),e.jsx(a,{variant:"error",dot:!0,children:"Overdue"}),e.jsx(a,{variant:"cold",dot:!0,children:"Inactive"})]})},d={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"hot",icon:e.jsx(A,{width:12,height:12}),children:"Hot Lead"}),e.jsx(a,{variant:"success",icon:e.jsx(I,{width:12,height:12}),children:"Verified"}),e.jsx(a,{variant:"warning",icon:e.jsx(C,{width:12,height:12}),children:"Needs Review"})]})},c={name:"Pipeline with Dot Indicators",render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"hot",dot:!0,size:"sm",children:"Hot"}),e.jsx("span",{className:"text-sm text-[var(--neutral-500)]",children:"— Ready to close, immediate follow-up"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"qualified",dot:!0,size:"sm",children:"Qualified"}),e.jsx("span",{className:"text-sm text-[var(--neutral-500)]",children:"— Meets criteria, active conversations"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"engaged",dot:!0,size:"sm",children:"Engaged"}),e.jsx("span",{className:"text-sm text-[var(--neutral-500)]",children:"— Responding, needs nurturing"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"warming",dot:!0,size:"sm",children:"Warming"}),e.jsx("span",{className:"text-sm text-[var(--neutral-500)]",children:"— Early interest, building rapport"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"cold",dot:!0,size:"sm",children:"Cold"}),e.jsx("span",{className:"text-sm text-[var(--neutral-500)]",children:"— No recent activity, re-engagement needed"})]})]})};var l,o,g;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: "Badge",
    variant: "default",
    size: "md"
  }
}`,...(g=(o=r.parameters)==null?void 0:o.docs)==null?void 0:g.source}}};var m,p,x;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
}`,...(x=(p=n.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var v,u,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Pipeline Stages",
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="hot">Hot</Badge>
      <Badge variant="qualified">Qualified</Badge>
      <Badge variant="engaged">Engaged</Badge>
      <Badge variant="warming">Warming</Badge>
      <Badge variant="cold">Cold</Badge>
    </div>
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var f,B,j;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
}`,...(j=(B=i.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var N,w,z;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Overdue</Badge>
      <Badge variant="cold" dot>Inactive</Badge>
    </div>
}`,...(z=(w=t.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var S,W,y;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="hot" icon={<FireFlame width={12} height={12} />}>Hot Lead</Badge>
      <Badge variant="success" icon={<CheckCircle width={12} height={12} />}>Verified</Badge>
      <Badge variant="warning" icon={<WarningTriangle width={12} height={12} />}>Needs Review</Badge>
    </div>
}`,...(y=(W=d.parameters)==null?void 0:W.docs)==null?void 0:y.source}}};var E,P,D;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Pipeline with Dot Indicators",
  render: () => <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="hot" dot size="sm">Hot</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Ready to close, immediate follow-up</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="qualified" dot size="sm">Qualified</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Meets criteria, active conversations</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="engaged" dot size="sm">Engaged</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Responding, needs nurturing</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="warming" dot size="sm">Warming</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Early interest, building rapport</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="cold" dot size="sm">Cold</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— No recent activity, re-engagement needed</span>
      </div>
    </div>
}`,...(D=(P=c.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};const F=["Default","AllVariants","PipelineStages","AllSizes","WithDot","WithIcon","PipelineStagesWithDot"];export{i as AllSizes,n as AllVariants,r as Default,s as PipelineStages,c as PipelineStagesWithDot,t as WithDot,d as WithIcon,F as __namedExportsOrder,O as default};
