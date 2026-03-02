import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{h as m,x as q}from"./Plus-KMrbYP9B.js";import{a as H}from"./Mail-CRj6W5pB.js";import{B as r}from"./Button-CazpC4lr.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./IconoirContext-CmFnpqeW.js";import"./index-DIpMxC3j.js";import"./index-ipoFIpvr.js";import"./index-B59X7VKu.js";import"./cn-BQHNewu7.js";const ne={title:"Components/Button",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","accent","ghost","danger","outline","link"]},size:{control:"select",options:["xs","sm","md","lg","xl","icon","icon-sm","icon-lg"]},loading:{control:"boolean"},disabled:{control:"boolean"},fullWidth:{control:"boolean"}}},t={args:{children:"Button",variant:"primary",size:"md"}},n={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(r,{variant:"primary",children:"Primary"}),e.jsx(r,{variant:"secondary",children:"Secondary"}),e.jsx(r,{variant:"accent",children:"Accent"}),e.jsx(r,{variant:"ghost",children:"Ghost"}),e.jsx(r,{variant:"danger",children:"Danger"}),e.jsx(r,{variant:"outline",children:"Outline"}),e.jsx(r,{variant:"link",children:"Link"})]})},a={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(r,{size:"xs",children:"Extra Small"}),e.jsx(r,{size:"sm",children:"Small"}),e.jsx(r,{size:"md",children:"Medium"}),e.jsx(r,{size:"lg",children:"Large"}),e.jsx(r,{size:"xl",children:"Extra Large"})]})},s={render:()=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(r,{size:"icon-sm",variant:"ghost",children:e.jsx(m,{})}),e.jsx(r,{size:"icon",variant:"ghost",children:e.jsx(m,{})}),e.jsx(r,{size:"icon-lg",variant:"ghost",children:e.jsx(m,{})})]})},i={args:{children:"Send Email",leftIcon:e.jsx(H,{width:16,height:16})}},o={args:{children:"Continue",rightIcon:e.jsx(q,{width:16,height:16})}},c={args:{children:"Saving...",loading:!0}},l={args:{children:"Disabled",disabled:!0}},d={args:{children:"Full Width Button",fullWidth:!0},decorators:[T=>e.jsx("div",{className:"w-80",children:e.jsx(T,{})})]},u={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(r,{variant:"primary",disabled:!0,children:"Primary"}),e.jsx(r,{variant:"secondary",disabled:!0,children:"Secondary"}),e.jsx(r,{variant:"accent",disabled:!0,children:"Accent"}),e.jsx(r,{variant:"ghost",disabled:!0,children:"Ghost"}),e.jsx(r,{variant:"danger",disabled:!0,children:"Danger"}),e.jsx(r,{variant:"outline",disabled:!0,children:"Outline"})]})};var h,p,g;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: "Button",
    variant: "primary",
    size: "md"
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var x,v,B;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>
    </div>
}`,...(B=(v=n.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var j,f,S;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
}`,...(S=(f=a.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var b,y,z;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Button size="icon-sm" variant="ghost"><Plus /></Button>
      <Button size="icon" variant="ghost"><Plus /></Button>
      <Button size="icon-lg" variant="ghost"><Plus /></Button>
    </div>
}`,...(z=(y=s.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var w,D,A;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: "Send Email",
    leftIcon: <Mail width={16} height={16} />
  }
}`,...(A=(D=i.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var W,I,L;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: "Continue",
    rightIcon: <ArrowRight width={16} height={16} />
  }
}`,...(L=(I=o.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var N,E,P;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: "Saving...",
    loading: true
  }
}`,...(P=(E=c.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var k,O,F;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: "Disabled",
    disabled: true
  }
}`,...(F=(O=l.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var G,R,V;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: "Full Width Button",
    fullWidth: true
  },
  decorators: [Story => <div className="w-80">
        <Story />
      </div>]
}`,...(V=(R=d.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var C,M,_;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="accent" disabled>Accent</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="danger" disabled>Danger</Button>
      <Button variant="outline" disabled>Outline</Button>
    </div>
}`,...(_=(M=u.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};const ae=["Default","AllVariants","AllSizes","IconSizes","WithLeftIcon","WithRightIcon","Loading","Disabled","FullWidth","AllVariantsDisabled"];export{a as AllSizes,n as AllVariants,u as AllVariantsDisabled,t as Default,l as Disabled,d as FullWidth,s as IconSizes,c as Loading,i as WithLeftIcon,o as WithRightIcon,ae as __namedExportsOrder,ne as default};
