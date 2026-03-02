import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-_tug67E6.js";import{M as t}from"./index-Bmj2ENLM.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-9ZIlm8zY.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function i(r){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{title:"Getting Started/Introduction"}),`
`,n.jsx(e.h1,{id:"relloui-design-system",children:"@rello/ui Design System"}),`
`,n.jsx(e.p,{children:"The shared UI component library for the Rello platform — powering Rello, Home Ready, The Oven, Home Stretch, and future applications."}),`
`,n.jsx(e.h2,{id:"design-principles",children:"Design Principles"}),`
`,n.jsxs(e.p,{children:[`| Principle | Description |
|-----------|-------------|
| `,n.jsx(e.strong,{children:"Minimal"}),` | Only what's needed, nothing more |
| `,n.jsx(e.strong,{children:"Warm"}),` | Cool grays balanced with terracotta accents |
| `,n.jsx(e.strong,{children:"Rounded"}),` | Soft edges create approachability |
| `,n.jsx(e.strong,{children:"Spacious"}),` | Generous whitespace aids focus |
| `,n.jsx(e.strong,{children:"Brandable"})," | Full white-label support via CSS custom properties |"]}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @rello/ui
`})}),`
`,n.jsx(e.h2,{id:"setup",children:"Setup"}),`
`,n.jsx(e.p,{children:"Import the styles in your app's global CSS:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`@import "@rello/ui/styles";
`})}),`
`,n.jsx(e.p,{children:"Or import just the tokens:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`@import "@rello/ui/tokens";
`})}),`
`,n.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button, Card, Badge, Input } from "@rello/ui";

function MyPage() {
  return (
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
`})}),`
`,n.jsx(e.h2,{id:"white-label-theming",children:"White-Label Theming"}),`
`,n.jsx(e.p,{children:"Override CSS custom properties to brand the entire system:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`:root {
  --brand-primary: #1a73e8;
  --brand-accent: #e8453a;
}
`})}),`
`,n.jsx(e.p,{children:"Every component automatically picks up the new brand colors."}),`
`,n.jsx(e.h2,{id:"architecture",children:"Architecture"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Tailwind CSS v4"})," with CSS custom properties for design tokens"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"CVA"})," (class-variance-authority) for component variant management"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Radix UI"})," primitives for accessible interactive components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Iconoir"})," for consistent iconography"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"clsx + tailwind-merge"})," via ",n.jsx(e.code,{children:"cn()"})," utility for smart class composition"]}),`
`]})]})}function j(r={}){const{wrapper:e}={...s(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(i,{...r})}):i(r)}export{j as default};
