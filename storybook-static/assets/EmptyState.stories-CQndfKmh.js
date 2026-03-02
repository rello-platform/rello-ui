import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{w as b,a as S}from"./UserPlus-GqDctpan.js";import{S as A}from"./Search-DZ0XC69L.js";import{c as C}from"./cn-BQHNewu7.js";import{B as k}from"./Button-CazpC4lr.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./IconoirContext-CmFnpqeW.js";import"./index-DIpMxC3j.js";import"./index-ipoFIpvr.js";import"./index-B59X7VKu.js";function N({icon:o,title:j,description:n,action:s,className:w}){return e.jsxs("div",{className:C("flex flex-col items-center justify-center py-12 px-4 text-center",w),children:[o&&e.jsx("div",{className:"size-16 rounded-full bg-[var(--neutral-100)] flex items-center justify-center mb-4",children:e.jsx("div",{className:"text-[var(--neutral-400)]",children:o})}),e.jsx("h3",{className:"text-lg font-semibold text-[var(--foreground)] mb-1",children:j}),n&&e.jsx("p",{className:"text-sm text-[var(--neutral-500)] max-w-sm mb-4",children:n}),s&&e.jsx(k,{onClick:s.onClick,children:s.label})]})}N.__docgenInfo={description:"",methods:[],displayName:"EmptyState",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},title:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},action:{required:!1,tsType:{name:"signature",type:"object",raw:"{ label: string; onClick: () => void }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const z={title:"Components/EmptyState",component:N,tags:["autodocs"]},t={args:{title:"No results found",description:"Try adjusting your search or filter criteria."}},r={args:{icon:e.jsx(A,{width:24,height:24}),title:"No leads found",description:"We couldn't find any leads matching your search."}},a={args:{icon:e.jsx(S,{width:24,height:24}),title:"No contacts yet",description:"Get started by adding your first contact.",action:{label:"Add Contact",onClick:()=>alert("Add contact!")}}},i={name:"Archived Empty State",args:{icon:e.jsx(b,{width:24,height:24}),title:"No archived leads",description:"Leads you archive will appear here for future reference."}};var c,d,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    title: "No results found",
    description: "Try adjusting your search or filter criteria."
  }
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,p,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    icon: <Search width={24} height={24} />,
    title: "No leads found",
    description: "We couldn't find any leads matching your search."
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,f,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    icon: <UserPlus width={24} height={24} />,
    title: "No contacts yet",
    description: "Get started by adding your first contact.",
    action: {
      label: "Add Contact",
      onClick: () => alert("Add contact!")
    }
  }
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,x,v;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Archived Empty State",
  args: {
    icon: <Archive width={24} height={24} />,
    title: "No archived leads",
    description: "Leads you archive will appear here for future reference."
  }
}`,...(v=(x=i.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const O=["Default","WithIcon","WithAction","ArchivedState"];export{i as ArchivedState,t as Default,a as WithAction,r as WithIcon,O as __namedExportsOrder,z as default};
