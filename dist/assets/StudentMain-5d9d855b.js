import{_ as e,u as t,v as l,o as a,g as n,b as i,w as s,H as o,x as d,F as p,a as r,I as c,h as m,J as u,j as h,y as g,z as f}from"./index-2c4a18b7.js";import{I as x}from"./IconParty-59a6dbb4.js";import{I as y}from"./IconZJU-6b5ec357.js";const k=t(),b={components:{IconParty:x,IconZJU:y},setup(){},data:()=>({isDrawerOpen:null,items:[{title:"Click Me"},{title:"Click Me"},{title:"Click Me"},{title:"Click Me 2"}]}),methods:{logoutBtnClick(){k.logout()}}},w={class:"bg-party-2",style:{height:"120px"}},v=r("div",{style:{display:"inline-block",margin:"16px 26px","vertical-align":"top","line-height":"40px",color:"white","font-weight":"550"}},[r("label",{style:{"font-size":"36px",display:"block"}},"ZJU-CST"),r("label",{style:{"font-size":"24px",display:"block"}},"智慧党建系统")],-1),C=r("div",{class:"mx-5"},[r("h1",{class:"text-h4"},"请使用桌面设备访问"),r("h1",{class:"text-h5 text-grey"},"或将移动设备横置使用")],-1);const I=e(b,[["render",function(e,t,x,y,k,b){const I=l("IconParty"),_=l("RouterView");return a(),n(p,null,[i(o,{app:"",modelValue:e.isDrawerOpen,"onUpdate:modelValue":t[1]||(t[1]=t=>e.isDrawerOpen=t),class:"bg-party-1",width:290},{prepend:s((()=>[r("div",w,[i(I,{style:{height:"70px",display:"inline-block",margin:"20px 0px 20px 14px"}}),v])])),append:s((()=>[i(c,{"content-class":"nav-menu",top:"",left:"","offset-y":"",transition:"slide-y-reverse-transition",eager:""},{activator:s((({props:e})=>[i(m,u({height:"53",theme:"navBarTheme","prepend-icon":"mdi-account",title:"个人中心"},e),null,16)])),default:s((()=>[i(h,null,{default:s((()=>[i(m,{"prepend-icon":"mdi-message-bookmark-outline",title:"消息通知",to:"/student/message"}),i(m,{"prepend-icon":"mdi-cog-outline",title:"个人设置",to:"/student/setting"}),i(m,{"prepend-icon":"mdi-exit-to-app",title:"注销",onClick:t[0]||(t[0]=e=>b.logoutBtnClick()),to:"/login"})])),_:1})])),_:1})])),default:s((()=>[i(h,{theme:"navBarTheme"},{default:s((()=>[i(m,{"prepend-icon":"mdi-home",title:"首页",to:"/student/home"}),i(m,{"prepend-icon":"mdi-account-check",title:"发展阶段",to:"/student/fzjd"}),i(m,{"prepend-icon":"mdi-calendar",title:"支部活动",to:"/student/zbhd"})])),_:1})])),_:1},8,["modelValue"]),i(d,{class:"overflow-hidden"},{default:s((()=>[i(_,{class:"d-none d-sm-block",onDrawerToggle:t[2]||(t[2]=t=>e.isDrawerOpen=!e.isDrawerOpen)}),i(g,{class:"d-flex d-sm-none flex-column fill-height",style:{height:"65%"}},{default:s((()=>[i(f,{class:"align-center"},{default:s((()=>[C])),_:1})])),_:1})])),_:1})],64)}]]);export{I as default};
