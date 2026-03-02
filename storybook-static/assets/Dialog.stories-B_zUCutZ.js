import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{B as g}from"./Button-CazpC4lr.js";import{I as M}from"./Input-CeriVJtw.js";import{r as i}from"./index-oxIuDU2I.js";import{u as Re,c as N}from"./index-BS0giPdN.js";import{c as Ee,u as W}from"./index-ipoFIpvr.js";import{u as $,P as Te,h as Pe,R as we,a as Ie,F as Oe,D as Se}from"./index-BCsAAykd.js";import{P as H}from"./index-D9S3RbfD.js";import"./index-Dn0hWNo5.js";import{x as Be}from"./Xmark-D4LnlBvu.js";import{c as D}from"./cn-BQHNewu7.js";import"./index-DIpMxC3j.js";import"./index-B59X7VKu.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dlnm4PWD.js";import"./index-ClNQsJSf.js";import"./index-ChhEEol8.js";import"./IconoirContext-CmFnpqeW.js";function Fe(e,o){const n=i.createContext(o),a=s=>{const{children:l,...c}=s,d=i.useMemo(()=>c,Object.values(c));return t.jsx(n.Provider,{value:d,children:l})};a.displayName=e+"Provider";function r(s){const l=i.useContext(n);if(l)return l;if(o!==void 0)return o;throw new Error(`\`${s}\` must be used within \`${e}\``)}return[a,r]}function Ae(e,o=[]){let n=[];function a(s,l){const c=i.createContext(l),d=n.length;n=[...n,l];const u=f=>{var z;const{scope:h,children:A,...y}=f,T=((z=h==null?void 0:h[e])==null?void 0:z[d])||c,be=i.useMemo(()=>y,Object.values(y));return t.jsx(T.Provider,{value:be,children:A})};u.displayName=s+"Provider";function m(f,h){var T;const A=((T=h==null?void 0:h[e])==null?void 0:T[d])||c,y=i.useContext(A);if(y)return y;if(l!==void 0)return l;throw new Error(`\`${f}\` must be used within \`${s}\``)}return[u,m]}const r=()=>{const s=n.map(l=>i.createContext(l));return function(c){const d=(c==null?void 0:c[e])||s;return i.useMemo(()=>({[`__scope${e}`]:{...c,[e]:d}}),[c,d])}};return r.scopeName=e,[a,Me(r,...o)]}function Me(...e){const o=e[0];if(e.length===1)return o;const n=()=>{const a=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(s){const l=a.reduce((c,{useScope:d,scopeName:u})=>{const f=d(s)[`__scope${u}`];return{...c,...f}},{});return i.useMemo(()=>({[`__scope${o.scopeName}`]:l}),[l])}};return n.scopeName=o.scopeName,n}function re(e){const o=$e(e),n=i.forwardRef((a,r)=>{const{children:s,...l}=a,c=i.Children.toArray(s),d=c.find(He);if(d){const u=d.props.children,m=c.map(f=>f===d?i.Children.count(u)>1?i.Children.only(null):i.isValidElement(u)?u.props.children:null:f);return t.jsx(o,{...l,ref:r,children:i.isValidElement(u)?i.cloneElement(u,void 0,m):null})}return t.jsx(o,{...l,ref:r,children:s})});return n.displayName=`${e}.Slot`,n}function $e(e){const o=i.forwardRef((n,a)=>{const{children:r,...s}=n;if(i.isValidElement(r)){const l=ke(r),c=Le(s,r.props);return r.type!==i.Fragment&&(c.ref=a?Ee(a,l):l),i.cloneElement(r,c)}return i.Children.count(r)>1?i.Children.only(null):null});return o.displayName=`${e}.SlotClone`,o}var We=Symbol("radix.slottable");function He(e){return i.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===We}function Le(e,o){const n={...o};for(const a in o){const r=e[a],s=o[a];/^on[A-Z]/.test(a)?r&&s?n[a]=(...c)=>{const d=s(...c);return r(...c),d}:r&&(n[a]=r):a==="style"?n[a]={...r,...s}:a==="className"&&(n[a]=[r,s].filter(Boolean).join(" "))}return{...e,...n}}function ke(e){var a,r;let o=(a=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:a.get,n=o&&"isReactWarning"in o&&o.isReactWarning;return n?e.ref:(o=(r=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:r.get,n=o&&"isReactWarning"in o&&o.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Ve=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],_=Ve.reduce((e,o)=>{const n=re(`Primitive.${o}`),a=i.forwardRef((r,s)=>{const{asChild:l,...c}=r,d=l?n:o;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),t.jsx(d,{...c,ref:s})});return a.displayName=`Primitive.${o}`,{...e,[o]:a}},{}),B="Dialog",[ae]=Ae(B),[Ge,p]=ae(B),se=e=>{const{__scopeDialog:o,children:n,open:a,defaultOpen:r,onOpenChange:s,modal:l=!0}=e,c=i.useRef(null),d=i.useRef(null),[u,m]=Re({prop:a,defaultProp:r??!1,onChange:s,caller:B});return t.jsx(Ge,{scope:o,triggerRef:c,contentRef:d,contentId:$(),titleId:$(),descriptionId:$(),open:u,onOpenChange:m,onOpenToggle:i.useCallback(()=>m(f=>!f),[m]),modal:l,children:n})};se.displayName=B;var ie="DialogTrigger",le=i.forwardRef((e,o)=>{const{__scopeDialog:n,...a}=e,r=p(ie,n),s=W(o,r.triggerRef);return t.jsx(_.button,{type:"button","aria-haspopup":"dialog","aria-expanded":r.open,"aria-controls":r.contentId,"data-state":V(r.open),...a,ref:s,onClick:N(e.onClick,r.onOpenToggle)})});le.displayName=ie;var L="DialogPortal",[ze,ce]=ae(L,{forceMount:void 0}),de=e=>{const{__scopeDialog:o,forceMount:n,children:a,container:r}=e,s=p(L,o);return t.jsx(ze,{scope:o,forceMount:n,children:i.Children.map(a,l=>t.jsx(H,{present:n||s.open,children:t.jsx(Te,{asChild:!0,container:r,children:l})}))})};de.displayName=L;var S="DialogOverlay",ue=i.forwardRef((e,o)=>{const n=ce(S,e.__scopeDialog),{forceMount:a=n.forceMount,...r}=e,s=p(S,e.__scopeDialog);return s.modal?t.jsx(H,{present:a||s.open,children:t.jsx(qe,{...r,ref:o})}):null});ue.displayName=S;var Ue=re("DialogOverlay.RemoveScroll"),qe=i.forwardRef((e,o)=>{const{__scopeDialog:n,...a}=e,r=p(S,n);return t.jsx(we,{as:Ue,allowPinchZoom:!0,shards:[r.contentRef],children:t.jsx(_.div,{"data-state":V(r.open),...a,ref:o,style:{pointerEvents:"auto",...a.style}})})}),x="DialogContent",ge=i.forwardRef((e,o)=>{const n=ce(x,e.__scopeDialog),{forceMount:a=n.forceMount,...r}=e,s=p(x,e.__scopeDialog);return t.jsx(H,{present:a||s.open,children:s.modal?t.jsx(Je,{...r,ref:o}):t.jsx(Xe,{...r,ref:o})})});ge.displayName=x;var Je=i.forwardRef((e,o)=>{const n=p(x,e.__scopeDialog),a=i.useRef(null),r=W(o,n.contentRef,a);return i.useEffect(()=>{const s=a.current;if(s)return Pe(s)},[]),t.jsx(pe,{...e,ref:r,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:N(e.onCloseAutoFocus,s=>{var l;s.preventDefault(),(l=n.triggerRef.current)==null||l.focus()}),onPointerDownOutside:N(e.onPointerDownOutside,s=>{const l=s.detail.originalEvent,c=l.button===0&&l.ctrlKey===!0;(l.button===2||c)&&s.preventDefault()}),onFocusOutside:N(e.onFocusOutside,s=>s.preventDefault())})}),Xe=i.forwardRef((e,o)=>{const n=p(x,e.__scopeDialog),a=i.useRef(!1),r=i.useRef(!1);return t.jsx(pe,{...e,ref:o,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:s=>{var l,c;(l=e.onCloseAutoFocus)==null||l.call(e,s),s.defaultPrevented||(a.current||(c=n.triggerRef.current)==null||c.focus(),s.preventDefault()),a.current=!1,r.current=!1},onInteractOutside:s=>{var d,u;(d=e.onInteractOutside)==null||d.call(e,s),s.defaultPrevented||(a.current=!0,s.detail.originalEvent.type==="pointerdown"&&(r.current=!0));const l=s.target;((u=n.triggerRef.current)==null?void 0:u.contains(l))&&s.preventDefault(),s.detail.originalEvent.type==="focusin"&&r.current&&s.preventDefault()}})}),pe=i.forwardRef((e,o)=>{const{__scopeDialog:n,trapFocus:a,onOpenAutoFocus:r,onCloseAutoFocus:s,...l}=e,c=p(x,n),d=i.useRef(null),u=W(o,d);return Ie(),t.jsxs(t.Fragment,{children:[t.jsx(Oe,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:r,onUnmountAutoFocus:s,children:t.jsx(Se,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":V(c.open),...l,ref:u,onDismiss:()=>c.onOpenChange(!1)})}),t.jsxs(t.Fragment,{children:[t.jsx(Ze,{titleId:c.titleId}),t.jsx(Ye,{contentRef:d,descriptionId:c.descriptionId})]})]})}),k="DialogTitle",fe=i.forwardRef((e,o)=>{const{__scopeDialog:n,...a}=e,r=p(k,n);return t.jsx(_.h2,{id:r.titleId,...a,ref:o})});fe.displayName=k;var me="DialogDescription",he=i.forwardRef((e,o)=>{const{__scopeDialog:n,...a}=e,r=p(me,n);return t.jsx(_.p,{id:r.descriptionId,...a,ref:o})});he.displayName=me;var De="DialogClose",xe=i.forwardRef((e,o)=>{const{__scopeDialog:n,...a}=e,r=p(De,n);return t.jsx(_.button,{type:"button",...a,ref:o,onClick:N(e.onClick,()=>r.onOpenChange(!1))})});xe.displayName=De;function V(e){return e?"open":"closed"}var ve="DialogTitleWarning",[yt,Ce]=Fe(ve,{contentName:x,titleName:k,docsSlug:"dialog"}),Ze=({titleId:e})=>{const o=Ce(ve),n=`\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;return i.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Ke="DialogDescriptionWarning",Ye=({contentRef:e,descriptionId:o})=>{const a=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Ce(Ke).contentName}}.`;return i.useEffect(()=>{var s;const r=(s=e.current)==null?void 0:s.getAttribute("aria-describedby");o&&r&&(document.getElementById(o)||console.warn(a))},[a,e,o]),null},Qe=se,et=le,tt=de,je=ue,ye=ge,Ne=fe,_e=he,ot=xe;const b=Qe,F=et,nt=tt,G=i.forwardRef(({className:e,...o},n)=>t.jsx(je,{ref:n,className:D("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...o}));G.displayName=je.displayName;const v=i.forwardRef(({className:e,children:o,showCloseButton:n=!0,...a},r)=>t.jsxs(nt,{children:[t.jsx(G,{}),t.jsxs(ye,{ref:r,className:D("fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none","bg-[var(--card-background)] border-[var(--card-border)]","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95","max-w-[calc(100%-2rem)] sm:max-w-lg",e),...a,children:[o,n&&t.jsxs(ot,{className:D("absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4"),children:[t.jsx(Be,{className:"size-4"}),t.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));v.displayName=ye.displayName;const R=({className:e,...o})=>t.jsx("div",{className:D("flex flex-col gap-2 text-center sm:text-left",e),...o}),E=({className:e,...o})=>t.jsx("div",{className:D("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",e),...o}),C=i.forwardRef(({className:e,...o},n)=>t.jsx(Ne,{ref:n,className:D("text-lg leading-none font-semibold text-[var(--foreground)]",e),...o}));C.displayName=Ne.displayName;const j=i.forwardRef(({className:e,...o},n)=>t.jsx(_e,{ref:n,className:D("text-sm text-[var(--neutral-500)]",e),...o}));j.displayName=_e.displayName;v.__docgenInfo={description:"",methods:[],props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};j.__docgenInfo={description:"",methods:[]};E.__docgenInfo={description:"",methods:[],displayName:"DialogFooter"};R.__docgenInfo={description:"",methods:[],displayName:"DialogHeader"};G.__docgenInfo={description:"",methods:[]};C.__docgenInfo={description:"",methods:[]};const Nt={title:"Components/Dialog",component:b,tags:["autodocs"]},P={render:()=>t.jsxs(b,{children:[t.jsx(F,{asChild:!0,children:t.jsx(g,{children:"Open Dialog"})}),t.jsxs(v,{children:[t.jsxs(R,{children:[t.jsx(C,{children:"Dialog Title"}),t.jsx(j,{children:"This is a description of the dialog content and purpose."})]}),t.jsx("p",{className:"text-sm text-[var(--neutral-600)]",children:"Dialog body content goes here."}),t.jsxs(E,{children:[t.jsx(g,{variant:"ghost",children:"Cancel"}),t.jsx(g,{children:"Confirm"})]})]})]})},w={name:"Delete Confirmation",render:()=>t.jsxs(b,{children:[t.jsx(F,{asChild:!0,children:t.jsx(g,{variant:"danger",children:"Delete Lead"})}),t.jsxs(v,{children:[t.jsxs(R,{children:[t.jsx(C,{children:"Delete Lead"}),t.jsx(j,{children:"Are you sure you want to delete this lead? This action cannot be undone."})]}),t.jsxs(E,{children:[t.jsx(g,{variant:"ghost",children:"Cancel"}),t.jsx(g,{variant:"danger",children:"Delete"})]})]})]})},I={name:"With Form Content",render:()=>t.jsxs(b,{children:[t.jsx(F,{asChild:!0,children:t.jsx(g,{children:"Add Contact"})}),t.jsxs(v,{children:[t.jsxs(R,{children:[t.jsx(C,{children:"Add New Contact"}),t.jsx(j,{children:"Enter the contact details below."})]}),t.jsxs("div",{className:"flex flex-col gap-3",children:[t.jsx(M,{label:"Full Name",placeholder:"John Doe"}),t.jsx(M,{label:"Email",type:"email",placeholder:"john@example.com"}),t.jsx(M,{label:"Phone",type:"tel",placeholder:"(555) 123-4567"})]}),t.jsxs(E,{children:[t.jsx(g,{variant:"ghost",children:"Cancel"}),t.jsx(g,{children:"Save Contact"})]})]})]})},O={name:"Without Close Button",render:()=>t.jsxs(b,{children:[t.jsx(F,{asChild:!0,children:t.jsx(g,{variant:"outline",children:"Open"})}),t.jsxs(v,{showCloseButton:!1,children:[t.jsxs(R,{children:[t.jsx(C,{children:"No Close Button"}),t.jsx(j,{children:"This dialog hides the X button. Use the footer actions to dismiss."})]}),t.jsx(E,{children:t.jsx(g,{variant:"ghost",children:"Dismiss"})})]})]})};var U,q,J;P.parameters={...P.parameters,docs:{...(U=P.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content and purpose.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-[var(--neutral-600)]">
          Dialog body content goes here.
        </p>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(J=(q=P.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var X,Z,K;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Delete Confirmation",
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger">Delete Lead</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Lead</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this lead? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(K=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:K.source}}};var Y,Q,ee;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "With Form Content",
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Add Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Enter the contact details below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save Contact</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(ee=(Q=I.parameters)==null?void 0:Q.docs)==null?void 0:ee.source}}};var te,oe,ne;O.parameters={...O.parameters,docs:{...(te=O.parameters)==null?void 0:te.docs,source:{originalSource:`{
  name: "Without Close Button",
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog hides the X button. Use the footer actions to dismiss.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Dismiss</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(ne=(oe=O.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};const _t=["Default","DeleteConfirmation","WithForm","NoCloseButton"];export{P as Default,w as DeleteConfirmation,O as NoCloseButton,I as WithForm,_t as __namedExportsOrder,Nt as default};
