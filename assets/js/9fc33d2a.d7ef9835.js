"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[294],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(n),u=o,f=m["".concat(l,".").concat(u)]||m[u]||d[u]||a;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2898:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],s={sidebar_position:2},l="Create a Model",c={unversionedId:"CRUDStories/create-a-model",id:"CRUDStories/create-a-model",isDocsHomePage:!1,title:"Create a Model",description:"You can think of models as collections in MongoDB or tables in SQL. They are at a high level the major data points, for example users books comments",source:"@site/docs/CRUDStories/create-a-model.md",sourceDirName:"CRUDStories",slug:"/CRUDStories/create-a-model",permalink:"/usac/docs/CRUDStories/create-a-model",editUrl:"https://github.com/mikerudge/user-stories-as-code/edit/main/website/docs/CRUDStories/create-a-model.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Creating the CRUD Generator",permalink:"/usac/docs/CRUDStories/create-a-generator"},next:{title:"Create a Permission",permalink:"/usac/docs/CRUDStories/create-a-permission"}},p=[{value:"Permissions",id:"permissions",children:[],level:2}],d={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-a-model"},"Create a Model"),(0,a.kt)("p",null,"You can think of models as collections in MongoDB or tables in SQL. They are at a high level the major data points, for example ",(0,a.kt)("inlineCode",{parentName:"p"},"users")," ",(0,a.kt)("inlineCode",{parentName:"p"},"books")," ",(0,a.kt)("inlineCode",{parentName:"p"},"comments")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"const booksModel = new Model({ name: 'Book' });\n")),(0,a.kt)("h2",{id:"permissions"},"Permissions"),(0,a.kt)("p",null,"Each model needs to know the ",(0,a.kt)("inlineCode",{parentName:"p"},"permissions")," to understand what stories to generate. The permissions are checked when generating the story, for example, if a ",(0,a.kt)("inlineCode",{parentName:"p"},"reader")," userType has a permission to ",(0,a.kt)("inlineCode",{parentName:"p"},"read")," the ",(0,a.kt)("inlineCode",{parentName:"p"},"book")," model, then the user story generated might be something like"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"As a reader, I want to be able to list books, so I can find a book easily")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"As a reader, I want to be able to see a single book")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"As a reader, I want to be able to link directly to a single book"))),(0,a.kt)("p",null,"You can add permissions directly to the model like below."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"const permission = new Permission({ userType: admin, actions: ['all'] });\nconst userModel = new Model({ name: 'User' }).addPermission(permission);\n")),(0,a.kt)("p",null,"Or if you add a user type with default permissions it can use those. For example adding an ",(0,a.kt)("inlineCode",{parentName:"p"},"admin")," user which always has the same permissions."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"const admin = new UserType({ name: 'Admin' }).addPermissions({\n  actions: ['all'],\n});\n\nconst userModel = new Model({ name: 'User' }).addUserType(admin);\n")),(0,a.kt)("p",null,"Check out the next section to see examples of permissions"))}m.isMDXComponent=!0}}]);