import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as s,L as a}from"./Checkbox-zaacohcA.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DaH4uQ64.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DIpMxC3j.js";import"./index-ipoFIpvr.js";import"./cn-BQHNewu7.js";import"./index-BS0giPdN.js";import"./index-Dlnm4PWD.js";import"./index-CqNMWf9U.js";import"./index-D9S3RbfD.js";import"./Check-Bzn3sMl_.js";import"./IconoirContext-CmFnpqeW.js";const O={title:"Components/Checkbox",component:s,tags:["autodocs"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"}}},i={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{id:"terms"}),e.jsx(a,{htmlFor:"terms",children:"Accept terms and conditions"})]})},t={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{id:"checked",defaultChecked:!0}),e.jsx(a,{htmlFor:"checked",children:"Checked by default"})]})},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{id:"disabled-unchecked",disabled:!0}),e.jsx(a,{htmlFor:"disabled-unchecked",className:"opacity-50",children:"Disabled unchecked"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{id:"disabled-checked",disabled:!0,defaultChecked:!0}),e.jsx(a,{htmlFor:"disabled-checked",className:"opacity-50",children:"Disabled checked"})]})]})},r={name:"Form Group",render:()=>e.jsxs("fieldset",{className:"flex flex-col gap-3",children:[e.jsx("legend",{className:"text-sm font-medium text-[var(--neutral-700)] mb-2",children:"Notification Preferences"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{id:"email-notif",defaultChecked:!0}),e.jsx(a,{htmlFor:"email-notif",children:"Email notifications"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{id:"sms-notif"}),e.jsx(a,{htmlFor:"sms-notif",children:"SMS notifications"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{id:"push-notif",defaultChecked:!0}),e.jsx(a,{htmlFor:"push-notif",children:"Push notifications"})]})]})};var d,l,n;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
}`,...(n=(l=i.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var o,m,h;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checked by default</Label>
    </div>
}`,...(h=(m=t.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var p,f,x;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" className="opacity-50">Disabled unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="opacity-50">Disabled checked</Label>
      </div>
    </div>
}`,...(x=(f=c.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var u,b,k;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Form Group",
  render: () => <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-[var(--neutral-700)] mb-2">Notification Preferences</legend>
      <div className="flex items-center gap-2">
        <Checkbox id="email-notif" defaultChecked />
        <Label htmlFor="email-notif">Email notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="sms-notif" />
        <Label htmlFor="sms-notif">SMS notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="push-notif" defaultChecked />
        <Label htmlFor="push-notif">Push notifications</Label>
      </div>
    </fieldset>
}`,...(k=(b=r.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};const R=["Default","Checked","Disabled","FormGroup"];export{t as Checked,i as Default,c as Disabled,r as FormGroup,R as __namedExportsOrder,O as default};
