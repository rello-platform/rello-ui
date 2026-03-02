import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-oxIuDU2I.js";import{x as D,a as F}from"./NavArrowRight-xSQtgKnX.js";import{c as o}from"./cn-BQHNewu7.js";import"./_commonjsHelpers-CqkleIqs.js";import"./IconoirContext-CmFnpqeW.js";function s({page:e,totalPages:t,total:_,onPageChange:p,className:k,showTotal:m=!0}){if(t<=1)return null;const n=[1];e>3&&n.push("...");for(let r=Math.max(2,e-1);r<=Math.min(t-1,e+1);r++)n.includes(r)||n.push(r);return e<t-2&&n.push("..."),t>1&&!n.includes(t)&&n.push(t),a.jsxs("div",{className:o("flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-[var(--neutral-100)]",k),children:[m&&a.jsxs("p",{className:"text-sm text-[var(--neutral-500)]",children:["Showing page ",e," of ",t," (",_," total)"]}),a.jsxs("div",{className:o("flex items-center gap-1",!m&&"mx-auto"),children:[a.jsx("button",{onClick:()=>p(e-1),disabled:e===1,className:o("p-2 rounded-lg transition-colors",e===1?"text-[var(--neutral-300)] cursor-not-allowed":"text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"),children:a.jsx(D,{width:16,height:16})}),n.map((r,E)=>r==="..."?a.jsx("span",{className:"px-2 text-[var(--neutral-400)]",children:"..."},`ellipsis-${E}`):a.jsx("button",{onClick:()=>p(r),className:o("min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-colors",r===e?"bg-[var(--brand-primary)] text-white":"text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"),children:r},r)),a.jsx("button",{onClick:()=>p(e+1),disabled:e===t,className:o("p-2 rounded-lg transition-colors",e===t?"text-[var(--neutral-300)] cursor-not-allowed":"text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"),children:a.jsx(F,{width:16,height:16})})]})]})}s.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{page:{required:!0,tsType:{name:"number"},description:""},totalPages:{required:!0,tsType:{name:"number"},description:""},total:{required:!0,tsType:{name:"number"},description:""},onPageChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},showTotal:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const z={title:"Components/Pagination",component:s,tags:["autodocs"]},u={render:()=>{const[e,t]=i.useState(1);return a.jsx(s,{page:e,totalPages:10,total:95,onPageChange:t})}},c={render:()=>{const[e,t]=i.useState(5);return a.jsx(s,{page:e,totalPages:10,total:95,onPageChange:t})}},l={render:()=>{const[e,t]=i.useState(1);return a.jsx(s,{page:e,totalPages:3,total:28,onPageChange:t})}},g={render:()=>{const[e,t]=i.useState(1);return a.jsx(s,{page:e,totalPages:8,total:76,onPageChange:t,showTotal:!1})}},d={render:()=>{const[e,t]=i.useState(15);return a.jsx(s,{page:e,totalPages:50,total:498,onPageChange:t})}};var P,h,x;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} total={95} onPageChange={setPage} />;
  }
}`,...(x=(h=u.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var f,b,v;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination page={page} totalPages={10} total={95} onPageChange={setPage} />;
  }
}`,...(v=(b=c.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var j,S,w;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={3} total={28} onPageChange={setPage} />;
  }
}`,...(w=(S=l.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var y,C,T;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={8} total={76} onPageChange={setPage} showTotal={false} />;
  }
}`,...(T=(C=g.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var N,q,M;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(15);
    return <Pagination page={page} totalPages={50} total={498} onPageChange={setPage} />;
  }
}`,...(M=(q=d.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};const A=["Default","MiddlePage","FewPages","WithoutTotal","ManyPages"];export{u as Default,l as FewPages,d as ManyPages,c as MiddlePage,g as WithoutTotal,A as __namedExportsOrder,z as default};
