import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as a}from"./index-_tug67E6.js";import{M as d}from"./index-Bmj2ENLM.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-9ZIlm8zY.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function r({token:s,value:n}){return e.jsxs("div",{className:"flex items-center gap-4 py-2",children:[e.jsx("div",{className:"w-24 text-xs font-mono text-[var(--muted-foreground)]",children:s}),e.jsx("div",{className:"w-12 text-xs text-right text-[var(--muted-foreground)]",children:n}),e.jsx("div",{className:"h-4 rounded bg-[var(--brand-primary)]",style:{width:n}})]})}function t({token:s,value:n}){return e.jsxs("div",{className:"flex items-center gap-4 py-2",children:[e.jsx("div",{className:"w-24 text-xs font-mono text-[var(--muted-foreground)]",children:s}),e.jsx("div",{className:"w-12 text-xs text-right text-[var(--muted-foreground)]",children:n}),e.jsx("div",{className:"size-12 border-2 border-[var(--brand-primary)] bg-[var(--brand-primary-light)]",style:{borderRadius:n}})]})}function o({token:s,value:n}){return e.jsxs("div",{className:"flex items-center gap-4 py-3",children:[e.jsx("div",{className:"w-24 text-xs font-mono text-[var(--muted-foreground)]",children:s}),e.jsx("div",{className:"size-16 rounded-lg bg-white",style:{boxShadow:n}})]})}r.__docgenInfo={description:"",methods:[],displayName:"SpacingItem",props:{token:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""}}};t.__docgenInfo={description:"",methods:[],displayName:"RadiusItem",props:{token:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""}}};o.__docgenInfo={description:"",methods:[],displayName:"ShadowItem",props:{token:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""}}};function i(s){const n={code:"code",h1:"h1",h2:"h2",p:"p",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Foundations/Spacing & Layout"}),`
`,e.jsx(n.h1,{id:"spacing-radius--shadows",children:"Spacing, Radius & Shadows"}),`
`,e.jsx(n.h2,{id:"spacing-scale",children:"Spacing Scale"}),`
`,e.jsx(n.p,{children:"Based on a 4px/8px grid system."}),`
`,e.jsx(r,{token:"--space-1",value:"4px"}),`
`,e.jsx(r,{token:"--space-2",value:"8px"}),`
`,e.jsx(r,{token:"--space-3",value:"12px"}),`
`,e.jsx(r,{token:"--space-4",value:"16px"}),`
`,e.jsx(r,{token:"--space-5",value:"20px"}),`
`,e.jsx(r,{token:"--space-6",value:"24px"}),`
`,e.jsx(r,{token:"--space-8",value:"32px"}),`
`,e.jsx(r,{token:"--space-10",value:"40px"}),`
`,e.jsx(r,{token:"--space-12",value:"48px"}),`
`,e.jsx(n.h2,{id:"border-radius",children:"Border Radius"}),`
`,e.jsx(n.p,{children:"Soft, rounded edges are core to Rello's visual identity."}),`
`,e.jsx(t,{token:"--radius-xs",value:"4px"}),`
`,e.jsx(t,{token:"--radius-sm",value:"6px"}),`
`,e.jsx(t,{token:"--radius-md",value:"8px"}),`
`,e.jsx(t,{token:"--radius-lg",value:"12px"}),`
`,e.jsx(t,{token:"--radius-xl",value:"16px"}),`
`,e.jsx(t,{token:"--radius-full",value:"9999px"}),`
`,e.jsx(n.h2,{id:"shadows",children:"Shadows"}),`
`,e.jsx(n.p,{children:"Elevation system for depth and layering."}),`
`,e.jsx(o,{token:"--shadow-xs",value:"0 1px 2px rgba(0,0,0,0.04)"}),`
`,e.jsx(o,{token:"--shadow-sm",value:"0 1px 2px rgba(0,0,0,0.05)"}),`
`,e.jsx(o,{token:"--shadow-md",value:"0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)"}),`
`,e.jsx(o,{token:"--shadow-lg",value:"0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)"}),`
`,e.jsx(o,{token:"--shadow-xl",value:"0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"}),`
`,e.jsx(n.h2,{id:"transitions",children:"Transitions"}),`
`,e.jsxs(n.p,{children:[`| Token | Duration | Use |
|-------|----------|-----|
| `,e.jsx(n.code,{children:"--transition-fast"}),` | 150ms | Micro-interactions (hover, toggle) |
| `,e.jsx(n.code,{children:"--transition-normal"}),` | 200ms | Standard transitions |
| `,e.jsx(n.code,{children:"--transition-slow"})," | 300ms | Complex animations (modals, drawers) |"]}),`
`,e.jsx(n.h2,{id:"z-index-scale",children:"Z-Index Scale"}),`
`,e.jsxs(n.p,{children:[`| Token | Value | Use |
|-------|-------|-----|
| `,e.jsx(n.code,{children:"--z-dropdown"}),` | 10 | Dropdown menus |
| `,e.jsx(n.code,{children:"--z-sticky"}),` | 20 | Sticky headers |
| `,e.jsx(n.code,{children:"--z-fixed"}),` | 30 | Fixed elements |
| `,e.jsx(n.code,{children:"--z-overlay"}),` | 40 | Overlays |
| `,e.jsx(n.code,{children:"--z-modal"}),` | 50 | Modals, dialogs |
| `,e.jsx(n.code,{children:"--z-popover"}),` | 60 | Popovers |
| `,e.jsx(n.code,{children:"--z-tooltip"})," | 70 | Tooltips |"]}),`
`,e.jsx(n.h2,{id:"responsive-breakpoints",children:"Responsive Breakpoints"}),`
`,e.jsx(n.p,{children:`| Name | Width | Target |
|------|-------|--------|
| Mobile | < 640px | Phones |
| Tablet | 640px - 1024px | Tablets |
| Desktop | 1024px - 1440px | Laptops |
| Wide | > 1440px | Large monitors |`})]})}function k(s={}){const{wrapper:n}={...a(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{k as default};
