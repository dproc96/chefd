(this.webpackJsonpchefd=this.webpackJsonpchefd||[]).push([[0],{10:function(e,t){e.exports={darkRed:"#B3191B",red:"#FF0A0E",yellow:"#FFFD35",blue:"#1D8ACC",darkBlue:"#1075B3"}},35:function(e,t,a){e.exports=a(64)},45:function(e,t,a){},46:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(31),s=a.n(i),l=a(16),o=a(32),c=a(1),p=a(2),d=a(4),h=a(3),u=a(5),g=a(14),m=a(12),b=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(g.b,{style:{margin:"15px",padding:"5px",fontSize:14,borderRadius:"5px"},onClick:this.props.handleLink,to:this.props.isLoggedIn?"#":"/login"},this.props.isLoggedIn?"Log Out":"Log In/Sign Up")}}]),t}(r.a.Component),f=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{fontFamily:"'Lobster', cursive",color:"#eeeeee",display:"flex",alignItems:"center",margin:"0px 20px"}},r.a.createElement("h3",{style:{fontFamily:"'Lobster', cursive",margin:"0px 10px",fontSize:"20px",letterSpacing:"1px"}},"Chef'd Meal Planner"),r.a.createElement("img",{alt:"Logo",style:{width:30},src:"/images/chefd-logo.png"}))}}]),t}(r.a.Component),O=a(10),y=a.n(O),v=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e={gridArea:"toolbar",backgroundColor:y.a.darkRed,zIndex:2,borderBottom:"1px #777777 solid",display:"flex",alignItems:"center",justifyContent:"space-between"};return r.a.createElement("div",{style:e},r.a.createElement(f,null),this.props.isLoggedIn&&r.a.createElement("h3",null,"Hello ",this.props.firstName,"!"),r.a.createElement(b,this.props))}}]),t}(r.a.Component),j=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(){a.props.handleLink(a.props.path)},a}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e={margin:"15px",fontSize:18,display:"block"};return this.props.active&&(e.fontWeight="700"),r.a.createElement(g.b,{style:e,onClick:this.handleClick,to:this.props.path},this.props.active&&"| ",this.props.name)}}]),t}(r.a.Component),E=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t={gridArea:"sidebar",backgroundColor:y.a.darkBlue,boxShadow:"2px 2px 5px 5px rgba(0,0,0,0.3)",zIndex:1,padding:"10px"};return r.a.createElement("div",{style:t},this.props.navLinks.map((function(t){return r.a.createElement(j,Object.assign({active:e.props.location===t.path,handleLink:e.props.handleLink},t))})))}}]),t}(r.a.Component),k=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{gridArea:"content"}},this.props.children)}}]),t}(r.a.Component),C=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e={backgroundColor:y.a.blue,gridArea:"footer",zIndex:2,display:"flex",alignItems:"center",justifyContent:"center",fontStyle:"oblique"};return r.a.createElement("div",{style:e},r.a.createElement("p",null,"External recipes are scraped from Serious Eats"))}}]),t}(r.a.Component),x=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:this.props.cardStyle},r.a.createElement("h2",null,"Log In"),r.a.createElement("input",{onChange:this.props.handleInputChange,name:"login--email",placeholder:"Email Address..."}),r.a.createElement("input",{onChange:this.props.handleInputChange,name:"login--password",placeholder:"Password..."}),r.a.createElement("button",{onClick:this.props.handleLogIn},"Submit"))}}]),t}(r.a.Component),S=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:this.props.cardStyle},r.a.createElement("h2",null,"Sign Up"),r.a.createElement("input",{onChange:this.props.handleInputChange,name:"signup--email",placeholder:"Email Address..."}),r.a.createElement("input",{onChange:this.props.handleInputChange,name:"signup--name",placeholder:"First Name..."}),r.a.createElement("input",{type:"password",onChange:this.props.handleInputChange,name:"signup--password",placeholder:"Password..."}),r.a.createElement("input",{type:"password",onChange:this.props.handleInputChange,name:"signup--password-reenter",placeholder:"Re-Enter Password..."}),r.a.createElement("button",{onClick:this.props.handleSignUp},"Submit"))}}]),t}(r.a.Component),D=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e={width:400,padding:20,height:"max-content",backgroundColor:y.a.blue,margin:"30px 0px",borderRadius:"15px",textAlign:"center",boxShadow:"2px 2px 3px 3px rgba(0,0,0,0.3)"};return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},r.a.createElement(x,Object.assign({cardStyle:e},this.props)),r.a.createElement(S,Object.assign({cardStyle:e},this.props)))}}]),t}(r.a.Component),w=(a(45),function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e={backgroundColor:y.a.blue};return this.props.recipe?r.a.createElement("div",{onDragEnd:this.props.handleDragEnd,onDragEnter:this.props.handleDragOver,onDragStart:this.props.handleDragCardStart,id:this.props.value,draggable:!0,style:e,className:"RecipeCard"},r.a.createElement("h4",null,this.props.day,' -- "',this.props.recipe.title,'"'),r.a.createElement("img",{onDragEnter:this.props.handleDragOver,id:this.props.value,draggable:!1,src:this.props.recipe.image,alt:this.props.recipe.title}),r.a.createElement("div",null,r.a.createElement("p",null,"You are missing ingredients")),r.a.createElement("div",null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:this.props.recipe.url},r.a.createElement("button",null,"Read More")),r.a.createElement("button",{onClick:this.props.handleReshuffle,value:this.props.value},"Reshuffle"),r.a.createElement("button",null,"Choose Yourself!"),r.a.createElement("button",{onClick:this.props.handleBlockDay,value:this.props.value},"Block Off Day"))):r.a.createElement("div",{onDragEnd:this.props.handleDragEnd,onDragOver:this.props.handleDragOver,onDragStart:this.props.handleDragCardStart,id:this.props.value,draggable:!0,style:e,className:"RecipeCard"},r.a.createElement("h4",null,this.props.day," -- You have blocked off this day"),r.a.createElement("button",{onClick:this.props.handleReshuffle,value:this.props.value},"Unblock"))}}]),t}(n.Component)),L=(a(46),function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return r.a.createElement("div",{className:"RecipeCardList"},this.props.recipes&&this.props.recipes.map((function(a,n){return r.a.createElement(w,{handleDragEnd:e.props.handleDragEnd,handleDragOver:e.props.handleDragOver,handleDragCardStart:e.props.handleDragCardStart,day:t[n],handleBlockDay:e.props.handleBlockDay,handleReshuffle:e.props.handleReshuffle,value:n,recipe:a,key:n})})))}}]),t}(n.Component)),I=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(L,this.props))}}]),t}(r.a.Component),R=a(20),B=a.n(R),A=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).navLinks=[{path:"/",name:"Plan your week"},{path:"/pantry",name:"Edit your pantry"},{path:"/account",name:"My Account"}],e.getSevenMeals=function(){B.a.get(window.location.origin+"/api/recipes/week").then((function(t){e.setState({recipes:t.data})})).catch((function(e){console.log(e)}))},e.handleInputChange=function(t){var a=t.target,n=a.name,r=a.value;e.setState(Object(o.a)({},n,r))},e.handleReshuffle=function(t){var a=t.target.value,n=Object(l.a)(e.state.recipes);B.a.get(window.location.origin+"/api/recipes/one").then((function(t){n[a]=t.data,e.setState({recipes:n})})).catch((function(e){console.log(e)}))},e.handleBlockDay=function(t){var a=t.target.value,n=Object(l.a)(e.state.recipes);n[a]=null,e.setState({recipes:n})},e.handleDragCardStart=function(t){console.log(t.target.id),e.setState({dragging:t.target.id,draggedOver:t.target.id})},e.handleDragOver=function(t){if(e.state.dragging){t.target.id?(console.log(t.target.id),e.setState({draggedOver:t.target.id})):e.setState({draggedOver:e.state.dragging});var a=Object(l.a)(e.state.recipes),n=e.state.dragging,r=e.state.draggedOver,i=a[n];a[n]=a[r],a[r]=i,e.setState({recipes:a,dragging:r})}},e.handleDragEnd=function(t){e.setState({dragging:null,draggedOver:null})},e.handleLogIn=function(){var t={email:e.state["login--email"],password:e.state["login--password"]};t.email&&t.email.match(/.+@.+\..+/)&&t.password},e.handleSignUp=function(){var t={email:e.state["signup--email"],name:e.state["signup--name"],password:e.state["signup--password"],passwordReenter:e.state["signup--password-reenter"]};t.email&&t.email.match(/.+@.+\..+/)&&t.password&&t.name&&(t.password,t.passwordReenter)},e.handleLink=function(t){e.setState({location:t})},e.state={isLoggedIn:!1,firstName:null,location:window.location.pathname},e.getSevenMeals(),e}return Object(u.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(g.a,null,r.a.createElement("div",{style:{display:"grid",gridTemplateRows:"50px 1fr 60px",gridTemplateColumns:"300px 1fr",gridTemplateAreas:"\n                'toolbar toolbar'\n                'sidebar content'\n                'footer footer'\n            ",minHeight:"100vh"}},r.a.createElement(v,{handleLink:this.handleLink,isLoggedIn:this.state.isLoggedIn,firstName:this.state.firstName}),r.a.createElement(E,{handleLink:this.handleLink,location:this.state.location,navLinks:this.navLinks}),r.a.createElement(k,null,r.a.createElement(m.a,{exact:!0,path:"/"},r.a.createElement(I,{handleDragEnd:this.handleDragEnd,handleDragOver:this.handleDragOver,handleDragCardStart:this.handleDragCardStart,handleBlockDay:this.handleBlockDay,handleReshuffle:this.handleReshuffle,recipes:this.state.recipes})),r.a.createElement(m.a,{exact:!0,path:"/login"},r.a.createElement(D,{handleInputChange:this.handleInputChange,handleLogIn:this.handleLogIn}))),r.a.createElement(C,null)))}}]),t}(r.a.Component);s.a.render(r.a.createElement(A,null),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.9833bfce.chunk.js.map