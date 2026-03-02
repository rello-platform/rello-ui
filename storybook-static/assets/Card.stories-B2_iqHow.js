import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as v}from"./Button-CazpC4lr.js";import{r as i}from"./index-oxIuDU2I.js";import{c}from"./cn-BQHNewu7.js";import"./index-DIpMxC3j.js";import"./index-ipoFIpvr.js";import"./index-B59X7VKu.js";import"./_commonjsHelpers-CqkleIqs.js";const t=i.forwardRef(({className:a,variant:r="default",padding:n="md",hoverable:V=!1,clickable:q=!1,...P},E)=>{const W={none:"",sm:"p-4",md:"p-5",lg:"p-6"},O={default:"bg-[var(--card-background)] border border-[var(--card-border)] shadow-sm",elevated:"bg-[var(--card-background)] shadow-md",outlined:"bg-transparent border border-[var(--neutral-200)]"};return e.jsx("div",{ref:E,className:c("rounded-[var(--radius-lg)]",O[r],W[n],V&&"transition-shadow duration-200 hover:shadow-md",q&&"cursor-pointer",a),...P})});t.displayName="Card";const s=i.forwardRef(({className:a,...r},n)=>e.jsx("div",{ref:n,className:c("flex flex-col gap-1.5 pb-4",a),...r}));s.displayName="CardHeader";const d=i.forwardRef(({className:a,...r},n)=>e.jsx("h3",{ref:n,className:c("text-lg font-semibold leading-none text-[var(--foreground)]",a),...r}));d.displayName="CardTitle";const o=i.forwardRef(({className:a,...r},n)=>e.jsx("p",{ref:n,className:c("text-sm text-[var(--neutral-500)]",a),...r}));o.displayName="CardDescription";const l=i.forwardRef(({className:a,...r},n)=>e.jsx("div",{ref:n,className:c("",a),...r}));l.displayName="CardContent";const f=i.forwardRef(({className:a,...r},n)=>e.jsx("div",{ref:n,className:c("flex items-center pt-4 border-t border-[var(--card-border)]",a),...r}));f.displayName="CardFooter";t.__docgenInfo={description:"",methods:[],displayName:"Card",props:{variant:{required:!1,tsType:{name:"union",raw:'"default" | "elevated" | "outlined"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"elevated"'},{name:"literal",value:'"outlined"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},padding:{required:!1,tsType:{name:"union",raw:'"none" | "sm" | "md" | "lg"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},hoverable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},clickable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};s.__docgenInfo={description:"",methods:[],displayName:"CardHeader"};d.__docgenInfo={description:"",methods:[],displayName:"CardTitle"};o.__docgenInfo={description:"",methods:[],displayName:"CardDescription"};l.__docgenInfo={description:"",methods:[],displayName:"CardContent"};f.__docgenInfo={description:"",methods:[],displayName:"CardFooter"};const Y={title:"Components/Card",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","outlined"]},padding:{control:"select",options:["none","sm","md","lg"]},hoverable:{control:"boolean"},clickable:{control:"boolean"}}},m={render:a=>e.jsxs(t,{...a,className:"w-80",children:[e.jsxs(s,{children:[e.jsx(d,{children:"Card Title"}),e.jsx(o,{children:"Card description with supporting text."})]}),e.jsx(l,{children:e.jsx("p",{className:"text-sm text-[var(--neutral-600)]",children:"This is the card content area. It can contain any elements."})}),e.jsxs(f,{className:"justify-end gap-2",children:[e.jsx(v,{variant:"ghost",size:"sm",children:"Cancel"}),e.jsx(v,{size:"sm",children:"Save"})]})]}),args:{variant:"default",padding:"md"}},p={render:()=>e.jsx("div",{className:"flex flex-wrap gap-4",children:["default","elevated","outlined"].map(a=>e.jsxs(t,{variant:a,className:"w-64",children:[e.jsxs(s,{children:[e.jsx(d,{className:"text-base capitalize",children:a}),e.jsxs(o,{children:['variant="',a,'"']})]}),e.jsx(l,{children:e.jsx("p",{className:"text-sm text-[var(--neutral-500)]",children:"Card content goes here."})})]},a))})},u={render:()=>e.jsx("div",{className:"flex flex-wrap gap-4",children:["none","sm","md","lg"].map(a=>e.jsx(t,{padding:a,className:"w-56",children:e.jsxs("div",{className:"bg-[var(--brand-primary-light)] p-2 rounded text-center text-sm",children:['padding="',a,'"']})},a))})},C={render:()=>e.jsxs(t,{hoverable:!0,className:"w-80",children:[e.jsxs(s,{children:[e.jsx(d,{children:"Hoverable Card"}),e.jsx(o,{children:"Hover to see shadow elevation change."})]}),e.jsx(l,{children:e.jsx("p",{className:"text-sm text-[var(--neutral-500)]",children:"This card transitions its shadow on hover."})})]})},x={render:()=>e.jsxs(t,{hoverable:!0,clickable:!0,className:"w-80",onClick:()=>alert("Card clicked!"),children:[e.jsxs(s,{children:[e.jsx(d,{children:"Clickable Card"}),e.jsx(o,{children:"Click to trigger an action."})]}),e.jsx(l,{children:e.jsx("p",{className:"text-sm text-[var(--neutral-500)]",children:"Shows pointer cursor on hover."})})]})},h={render:()=>e.jsxs(t,{className:"w-96",children:[e.jsxs(s,{children:[e.jsx(d,{children:"Confirm Action"}),e.jsx(o,{children:"Are you sure you want to proceed?"})]}),e.jsx(l,{children:e.jsx("p",{className:"text-sm text-[var(--neutral-600)]",children:"This action cannot be undone. Please review before confirming."})}),e.jsxs(f,{className:"justify-between",children:[e.jsx(v,{variant:"ghost",size:"sm",children:"Cancel"}),e.jsx(v,{variant:"danger",size:"sm",children:"Delete"})]})]})};var g,j,N;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description with supporting text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-600)]">
          This is the card content area. It can contain any elements.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>,
  args: {
    variant: "default",
    padding: "md"
  }
}`,...(N=(j=m.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var b,w,y;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      {(["default", "elevated", "outlined"] as const).map(variant => <Card key={variant} variant={variant} className="w-64">
          <CardHeader>
            <CardTitle className="text-base capitalize">{variant}</CardTitle>
            <CardDescription>variant="{variant}"</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--neutral-500)]">Card content goes here.</p>
          </CardContent>
        </Card>)}
    </div>
}`,...(y=(w=p.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var T,H,k;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      {(["none", "sm", "md", "lg"] as const).map(padding => <Card key={padding} padding={padding} className="w-56">
          <div className="bg-[var(--brand-primary-light)] p-2 rounded text-center text-sm">
            padding="{padding}"
          </div>
        </Card>)}
    </div>
}`,...(k=(H=u.parameters)==null?void 0:H.docs)==null?void 0:k.source}}};var D,_,S;C.parameters={...C.parameters,docs:{...(D=C.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Card hoverable className="w-80">
      <CardHeader>
        <CardTitle>Hoverable Card</CardTitle>
        <CardDescription>Hover to see shadow elevation change.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-500)]">This card transitions its shadow on hover.</p>
      </CardContent>
    </Card>
}`,...(S=(_=C.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};var z,A,B;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Card hoverable clickable className="w-80" onClick={() => alert("Card clicked!")}>
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>Click to trigger an action.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-500)]">Shows pointer cursor on hover.</p>
      </CardContent>
    </Card>
}`,...(B=(A=x.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var F,I,R;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Card className="w-96">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-600)]">
          This action cannot be undone. Please review before confirming.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="danger" size="sm">Delete</Button>
      </CardFooter>
    </Card>
}`,...(R=(I=h.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};const Z=["Default","AllVariants","AllPaddings","Hoverable","Clickable","WithFooterActions"];export{u as AllPaddings,p as AllVariants,x as Clickable,m as Default,C as Hoverable,h as WithFooterActions,Z as __namedExportsOrder,Y as default};
