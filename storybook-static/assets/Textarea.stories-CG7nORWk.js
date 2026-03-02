import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as F}from"./index-oxIuDU2I.js";import{c as x}from"./cn-BQHNewu7.js";import"./_commonjsHelpers-CqkleIqs.js";const a=F.forwardRef(({className:r,label:s,error:t,hint:m,id:R,..._},q)=>{const p=R||(s==null?void 0:s.toLowerCase().replace(/\s+/g,"-")),u=e.jsx("textarea",{ref:q,id:p,"aria-invalid":!!t,className:x("min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none resize-y","border-[var(--neutral-200)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)]","focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20","disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--neutral-50)]",t&&"border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20",r),..._});return!s&&!t&&!m?u:e.jsxs("div",{className:"w-full",children:[s&&e.jsx("label",{htmlFor:p,className:"block text-sm font-medium text-[var(--neutral-700)] mb-1.5",children:s}),u,(t||m)&&e.jsx("p",{className:x("mt-1.5 text-xs",t?"text-[var(--error)]":"text-[var(--neutral-500)]"),children:t||m})]})});a.displayName="Textarea";a.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{label:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""}}};const z={title:"Components/Textarea",component:a,tags:["autodocs"],argTypes:{label:{control:"text"},error:{control:"text"},hint:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"}}},o={args:{placeholder:"Enter your message..."},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},l={args:{label:"Notes",placeholder:"Add notes about this lead..."},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},d={args:{label:"Description",placeholder:"Describe the property...",hint:"Maximum 500 characters"},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},i={args:{label:"Notes",defaultValue:"x",error:"Notes must be at least 10 characters"},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},n={args:{label:"Comments",defaultValue:"This field is read-only",disabled:!0},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-80",children:[e.jsx(a,{label:"Default",placeholder:"Enter text..."}),e.jsx(a,{label:"With Hint",placeholder:"Enter text...",hint:"Helper text"}),e.jsx(a,{label:"With Error",defaultValue:"bad",error:"Field is invalid"}),e.jsx(a,{label:"Disabled",defaultValue:"Read only",disabled:!0})]})};var b,h,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter your message..."
  },
  decorators: [Story => <div className="w-80"><Story /></div>]
}`,...(v=(h=o.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var f,g,y;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: "Notes",
    placeholder: "Add notes about this lead..."
  },
  decorators: [Story => <div className="w-80"><Story /></div>]
}`,...(y=(g=l.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var N,j,w;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: "Description",
    placeholder: "Describe the property...",
    hint: "Maximum 500 characters"
  },
  decorators: [Story => <div className="w-80"><Story /></div>]
}`,...(w=(j=d.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var S,E,T;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: "Notes",
    defaultValue: "x",
    error: "Notes must be at least 10 characters"
  },
  decorators: [Story => <div className="w-80"><Story /></div>]
}`,...(T=(E=i.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var D,W,V;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: "Comments",
    defaultValue: "This field is read-only",
    disabled: true
  },
  decorators: [Story => <div className="w-80"><Story /></div>]
}`,...(V=(W=n.parameters)==null?void 0:W.docs)==null?void 0:V.source}}};var H,A,C;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-80">
      <Textarea label="Default" placeholder="Enter text..." />
      <Textarea label="With Hint" placeholder="Enter text..." hint="Helper text" />
      <Textarea label="With Error" defaultValue="bad" error="Field is invalid" />
      <Textarea label="Disabled" defaultValue="Read only" disabled />
    </div>
}`,...(C=(A=c.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};const O=["Default","WithLabel","WithHint","WithError","Disabled","AllStates"];export{c as AllStates,o as Default,n as Disabled,i as WithError,d as WithHint,l as WithLabel,O as __namedExportsOrder,z as default};
