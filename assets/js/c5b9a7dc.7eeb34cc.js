"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8264],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=l(r),d=a,g=u["".concat(c,".").concat(d)]||u[d]||m[d]||o;return r?n.createElement(g,s(s({ref:t},p),{},{components:r})):n.createElement(g,s({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4470:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return p},default:function(){return u}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),s=["components"],i={},c="Create a Team Member",l={unversionedId:"getting-started/create-a-team-member",id:"getting-started/create-a-team-member",isDocsHomePage:!1,title:"Create a Team Member",description:"A team member is a member of the team (funny that!), that can be assigned to a task, a story or a project",source:"@site/docs/getting-started/create-a-team-member.md",sourceDirName:"getting-started",slug:"/getting-started/create-a-team-member",permalink:"/user-stories-as-code/docs/getting-started/create-a-team-member",editUrl:"https://github.com/mikerudge/user-stories-as-code/edit/main/website/docs/getting-started/create-a-team-member.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Create a Task",permalink:"/user-stories-as-code/docs/getting-started/create-a-task"},next:{title:"Creating the CRUD Generator",permalink:"/user-stories-as-code/docs/CRUDStories/create-a-generator"}},p=[{value:"Setting the owner of a project",id:"setting-the-owner-of-a-project",children:[],level:2},{value:"Setting the assignee of a task",id:"setting-the-assignee-of-a-task",children:[],level:2},{value:"Setting the assignee of a story",id:"setting-the-assignee-of-a-story",children:[{value:"Note:",id:"note",children:[],level:3}],level:2},{value:"Props",id:"props",children:[],level:2}],m={toc:p};function u(e){var t=e.components,r=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"create-a-team-member"},"Create a Team Member"),(0,o.kt)("p",null,"A team member is a member of the team (funny that!), that can be assigned to a ",(0,o.kt)("inlineCode",{parentName:"p"},"task"),", a ",(0,o.kt)("inlineCode",{parentName:"p"},"story")," or a ",(0,o.kt)("inlineCode",{parentName:"p"},"project")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const james = new TeamMember({ id: '123', name: 'James Brown', role: 'Developer' });\n")),(0,o.kt)("h2",{id:"setting-the-owner-of-a-project"},"Setting the owner of a project"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"new Project().setOwner(james);\n")),(0,o.kt)("h2",{id:"setting-the-assignee-of-a-task"},"Setting the assignee of a task"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"new Task().addAssignee(james);\n")),(0,o.kt)("h2",{id:"setting-the-assignee-of-a-story"},"Setting the assignee of a story"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"new Story().addAssignee(james);\n// Or set many\nnew Story().addAssignee([james, lisa]);\n")),(0,o.kt)("h3",{id:"note"},"Note:"),(0,o.kt)("p",null,"When you add stories with a team member to a project, the project will also get the team member added."),(0,o.kt)("h2",{id:"props"},"Props"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type Props = {\n  id?: string;\n  name: string;\n  role?: string;\n  avatar?: string;\n};\n")))}u.isMDXComponent=!0}}]);