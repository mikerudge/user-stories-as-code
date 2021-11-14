"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[905],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=u(r),f=o,d=m["".concat(s,".").concat(f)]||m[f]||l[f]||a;return r?n.createElement(d,i(i({ref:t},p),{},{components:r})):n.createElement(d,i({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7140:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return p},default:function(){return m}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],c={},s="Formats",u={unversionedId:"outputs/intro",id:"outputs/intro",isDocsHomePage:!1,title:"Formats",description:"JSON",source:"@site/docs/outputs/intro.md",sourceDirName:"outputs",slug:"/outputs/intro",permalink:"/usac/docs/outputs/intro",editUrl:"https://github.com/mikerudge/user-stories-as-code/edit/main/website/docs/outputs/intro.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Full Example",permalink:"/usac/docs/CRUDStories/full-example"}},p=[{value:"JSON",id:"json",children:[],level:2},{value:"CSV (coming soon)",id:"csv-coming-soon",children:[],level:2},{value:"3rd Party Transformers (coming soon)",id:"3rd-party-transformers-coming-soon",children:[],level:2}],l={toc:p};function m(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"formats"},"Formats"),(0,a.kt)("h2",{id:"json"},"JSON"),(0,a.kt)("p",null,"Once you have finished adding everything you need to the project, you can simply call ",(0,a.kt)("inlineCode",{parentName:"p"},"output()")," method on the project to convert everything to plain ol JSON."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"const project = new Project({...}).output()\n")),(0,a.kt)("p",null,"In fact all the classes in this project has an ",(0,a.kt)("inlineCode",{parentName:"p"},"output()")," method to convert them to JSON."),(0,a.kt)("h2",{id:"csv-coming-soon"},"CSV (coming soon)"),(0,a.kt)("p",null,"Exporting to CSV will be the next priority"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'const project = new Project({...}).output("csv")\n')),(0,a.kt)("h2",{id:"3rd-party-transformers-coming-soon"},"3rd Party Transformers (coming soon)"),(0,a.kt)("p",null,"Not started this yet, but had the idea of a suite of transformers that can take the project and correctly transform the data, then output the new data. For Example a Jira transformer might look something like..."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"\nconst project = new Project({...})\n\n//  A Jira transformer example\nnew JiraTransformer({project, options})\n\n// A Google Sheets transformer\nnew GoogleSheetsTransformer({project, options})\n\n")))}m.isMDXComponent=!0}}]);