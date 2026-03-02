import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as U}from"./Eye-BvP5uCR5.js";import{a as _}from"./Mail-CRj6W5pB.js";import{S as B}from"./Search-DZ0XC69L.js";import{I as a}from"./Input-CeriVJtw.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./IconoirContext-CmFnpqeW.js";import"./cn-BQHNewu7.js";const X={title:"Components/Input",component:a,tags:["autodocs"],argTypes:{label:{control:"text"},error:{control:"text"},hint:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"}}},s={args:{placeholder:"Enter text..."},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},t={args:{label:"Email Address",placeholder:"you@example.com",type:"email"},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},o={args:{label:"Username",placeholder:"johndoe",hint:"Must be at least 3 characters"},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},l={args:{label:"Email Address",placeholder:"you@example.com",defaultValue:"not-an-email",error:"Please enter a valid email address"},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},d={args:{placeholder:"Search leads...",leftIcon:e.jsx(B,{width:16,height:16})},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},n={args:{label:"Password",type:"password",placeholder:"Enter password",rightIcon:e.jsx(U,{width:16,height:16})},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},c={args:{placeholder:"you@example.com",leftIcon:e.jsx(_,{width:16,height:16})},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},i={args:{label:"Read Only",defaultValue:"Cannot edit this",disabled:!0},decorators:[r=>e.jsx("div",{className:"w-72",children:e.jsx(r,{})})]},p={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-72",children:[e.jsx(a,{label:"Default",placeholder:"Enter text..."}),e.jsx(a,{label:"With Hint",placeholder:"Enter text...",hint:"Helper text goes here"}),e.jsx(a,{label:"With Error",defaultValue:"bad input",error:"This field is invalid"}),e.jsx(a,{label:"Disabled",defaultValue:"Cannot edit",disabled:!0}),e.jsx(a,{placeholder:"With icon",leftIcon:e.jsx(B,{width:16,height:16})})]})};var h,m,u;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text..."
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var x,g,b;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email"
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(b=(g=t.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var S,f,w;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: "Username",
    placeholder: "johndoe",
    hint: "Must be at least 3 characters"
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(w=(f=o.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var v,j,y;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    defaultValue: "not-an-email",
    error: "Please enter a valid email address"
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(y=(j=l.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var I,E,N;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    placeholder: "Search leads...",
    leftIcon: <Search width={16} height={16} />
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(N=(E=d.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var W,D,V;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    rightIcon: <Eye width={16} height={16} />
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(V=(D=n.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var A,H,C;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    placeholder: "you@example.com",
    leftIcon: <Mail width={16} height={16} />
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(C=(H=c.parameters)==null?void 0:H.docs)==null?void 0:C.source}}};var R,L,P;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: "Read Only",
    defaultValue: "Cannot edit this",
    disabled: true
  },
  decorators: [Story => <div className="w-72"><Story /></div>]
}`,...(P=(L=i.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var M,O,T;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-72">
      <Input label="Default" placeholder="Enter text..." />
      <Input label="With Hint" placeholder="Enter text..." hint="Helper text goes here" />
      <Input label="With Error" defaultValue="bad input" error="This field is invalid" />
      <Input label="Disabled" defaultValue="Cannot edit" disabled />
      <Input placeholder="With icon" leftIcon={<Search width={16} height={16} />} />
    </div>
}`,...(T=(O=p.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};const Y=["Default","WithLabel","WithHint","WithError","WithLeftIcon","WithRightIcon","WithBothIcons","Disabled","AllStates"];export{p as AllStates,s as Default,i as Disabled,c as WithBothIcons,l as WithError,o as WithHint,t as WithLabel,d as WithLeftIcon,n as WithRightIcon,Y as __namedExportsOrder,X as default};
