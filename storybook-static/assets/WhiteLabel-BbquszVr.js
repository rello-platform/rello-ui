import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as t}from"./index-_tug67E6.js";import{M as o}from"./index-Bmj2ENLM.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-9ZIlm8zY.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function a(r){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...t(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Foundations/White Label"}),`
`,n.jsx(e.h1,{id:"white-label-theming",children:"White-Label Theming"}),`
`,n.jsx(e.p,{children:"Every Rello platform app supports full white-label customization. Tenants (MLOs and Brokers) can override brand colors, and the entire UI adapts automatically."}),`
`,n.jsx(e.h2,{id:"how-it-works",children:"How It Works"}),`
`,n.jsx(e.p,{children:"All brand-aware components reference CSS custom properties rather than hardcoded colors:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`/* Default Rello branding */
:root {
  --brand-primary: #3B5998;
  --brand-accent: #C9785D;
  --brand-primary-light: rgba(59, 89, 152, 0.15);
  --brand-accent-light: rgba(201, 120, 93, 0.15);
}
`})}),`
`,n.jsx(e.h2,{id:"overriding-for-a-tenant",children:"Overriding for a Tenant"}),`
`,n.jsx(e.p,{children:"To apply a tenant's branding, override these four variables:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`:root {
  --brand-primary: #1a73e8;
  --brand-accent: #e8453a;
  --brand-primary-light: rgba(26, 115, 232, 0.15);
  --brand-accent-light: rgba(232, 69, 58, 0.15);
}
`})}),`
`,n.jsx(e.p,{children:"Every button, badge, focus ring, icon container, and branded element updates automatically."}),`
`,n.jsx(e.h2,{id:"what-changes-vs-what-stays",children:"What Changes vs. What Stays"}),`
`,n.jsx(e.p,{children:`| Element | Customizable? | Notes |
|---------|:---:|-------|
| Primary color | Yes | Buttons, links, focus rings, active states |
| Accent color | Yes | Secondary actions, highlights |
| Pipeline stage colors | No | Hot/Qualified/Engaged/Warming/Cold are universal |
| Status colors | No | Success/Warning/Error/Info are universal |
| Neutral palette | No | Grays remain constant for consistency |
| Typography | No | Font families and scale are fixed |
| Spacing & radius | No | Layout tokens are fixed |`}),`
`,n.jsx(e.h2,{id:"subscriber-branding-hierarchy",children:"Subscriber Branding Hierarchy"}),`
`,n.jsx(e.p,{children:`| Element | MLO Sets | Broker Sets |
|---------|:---:|:---:|
| Primary Logo | Yes | Yes |
| Primary Color | Yes | Yes |
| Accent Color | Yes | Yes |
| Company Name | Yes | Yes |
| Contact Info | Yes | Yes |`}),`
`,n.jsx(e.h3,{id:"broker-agent-sub-branding",children:"Broker Agent Sub-Branding"}),`
`,n.jsx(e.p,{children:"Brokers can optionally enable agent-level personalization, where individual agents get their own photo and contact info displayed alongside the brokerage brand."}),`
`,n.jsx(e.h2,{id:"integration",children:"Integration"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// In your app's BrandingProvider or layout
useEffect(() => {
  if (tenant.colorPrimary) {
    document.documentElement.style.setProperty("--brand-primary", tenant.colorPrimary);
    // Compute the light variant
    const rgb = hexToRgb(tenant.colorPrimary);
    document.documentElement.style.setProperty(
      "--brand-primary-light",
      \`rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, 0.15)\`
    );
  }
}, [tenant]);
`})})]})}function b(r={}){const{wrapper:e}={...t(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(a,{...r})}):a(r)}export{b as default};
