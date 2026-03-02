import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as T}from"./cn-BQHNewu7.js";import{B as l}from"./Button-CazpC4lr.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DIpMxC3j.js";import"./index-ipoFIpvr.js";import"./index-B59X7VKu.js";const q={xs:"size-3 border-[1.5px]",sm:"size-4 border-2",md:"size-6 border-2",lg:"size-8 border-2",xl:"size-12 border-3"};function a({size:r="md",className:P}){return e.jsx("div",{className:T("animate-spin rounded-full border-[var(--neutral-300)] border-t-[var(--brand-primary)]",q[r],P)})}function _({message:r}){return e.jsxs("div",{className:"flex items-center justify-center gap-2 py-8",children:[e.jsx(a,{size:"sm"}),r&&e.jsx("span",{className:"text-sm text-[var(--neutral-500)]",children:r})]})}function w({message:r="Loading..."}){return e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[400px]",children:[e.jsx(a,{size:"lg"}),e.jsx("p",{className:"mt-4 text-[var(--neutral-500)] font-medium",children:r})]})}function C({message:r}){return e.jsxs("div",{className:"flex flex-col items-center justify-center py-12",children:[e.jsx(a,{size:"md"}),r&&e.jsx("p",{className:"mt-3 text-sm text-[var(--neutral-500)]",children:r})]})}a.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{required:!1,tsType:{name:"union",raw:'"xs" | "sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};_.__docgenInfo={description:"",methods:[],displayName:"InlineLoading",props:{message:{required:!1,tsType:{name:"string"},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"PageLoader",props:{message:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Loading..."',computed:!1}}}};C.__docgenInfo={description:"",methods:[],displayName:"CardLoader",props:{message:{required:!1,tsType:{name:"string"},description:""}}};const G={title:"Components/Spinner",component:a,tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]}}},s={args:{size:"md"}},n={render:()=>e.jsx("div",{className:"flex items-center gap-4",children:["xs","sm","md","lg","xl"].map(r=>e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{size:r}),e.jsx("span",{className:"text-xs text-[var(--neutral-500)]",children:r})]},r))})},d={name:"Inline Loading",render:()=>e.jsx("div",{className:"w-80 border border-[var(--neutral-100)] rounded-lg",children:e.jsx(_,{message:"Loading leads..."})})},o={name:"Card Loader",render:()=>e.jsx("div",{className:"w-80 border border-[var(--neutral-100)] rounded-lg",children:e.jsx(C,{message:"Fetching data..."})})},t={name:"Page Loader",render:()=>e.jsx("div",{className:"w-full h-96 border border-[var(--neutral-100)] rounded-lg overflow-hidden",children:e.jsx(w,{message:"Loading dashboard..."})})},i={name:"Button Spinner",render:()=>e.jsxs("div",{className:"flex gap-3",children:[e.jsx(l,{loading:!0,children:"Saving..."}),e.jsx(l,{variant:"accent",loading:!0,children:"Processing..."})]})};var m,c,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    size: "md"
  }
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,g,x;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-xs text-[var(--neutral-500)]">{size}</span>
        </div>)}
    </div>
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var v,f,h;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Inline Loading",
  render: () => <div className="w-80 border border-[var(--neutral-100)] rounded-lg">
      <InlineLoading message="Loading leads..." />
    </div>
}`,...(h=(f=d.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var j,L,N;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Card Loader",
  render: () => <div className="w-80 border border-[var(--neutral-100)] rounded-lg">
      <CardLoader message="Fetching data..." />
    </div>
}`,...(N=(L=o.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var y,b,S;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Page Loader",
  render: () => <div className="w-full h-96 border border-[var(--neutral-100)] rounded-lg overflow-hidden">
      <PageLoader message="Loading dashboard..." />
    </div>
}`,...(S=(b=t.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var z,I,B;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "Button Spinner",
  render: () => <div className="flex gap-3">
      <Button loading>Saving...</Button>
      <Button variant="accent" loading>Processing...</Button>
    </div>
}`,...(B=(I=i.parameters)==null?void 0:I.docs)==null?void 0:B.source}}};const H=["Default","AllSizes","InlineLoadingStory","CardLoaderStory","PageLoaderStory","InButton"];export{n as AllSizes,o as CardLoaderStory,s as Default,i as InButton,d as InlineLoadingStory,t as PageLoaderStory,H as __namedExportsOrder,G as default};
