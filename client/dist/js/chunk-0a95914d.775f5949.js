(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a95914d"],{"0f62":function(t,a,e){t.exports=e.p+"img/user.1c311ad0.svg"},"3c1a":function(t,a,e){t.exports=e.p+"img/lock.b3a1f668.svg"},c881:function(t,a,e){"use strict";var n=e("faca"),s=e.n(n);s.a},c998:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"parent-container"},[n("div",{staticClass:"login-container"},[n("img",{attrs:{src:e("8fd0"),alt:"Student Login",id:"stu-img"}}),n("h2",[t._v("Student Login")]),n("div",{staticClass:"input-container"},[n("img",{attrs:{src:e("0f62"),alt:"Email"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",name:"email",id:"email",placeholder:"NUS email ID"},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value)}}})]),n("div",{staticClass:"input-container"},[n("img",{attrs:{src:e("3c1a"),alt:"Password"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",name:"password",id:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value)}}})]),n("button",{on:{click:function(a){return t.login()}}},[t._v("Login")]),n("div",{staticClass:"register"},[n("p",[t._v("Don't have an account yet?")]),n("router-link",{attrs:{to:"/register/student"}},[n("p",[t._v("Create an account")])])],1)])])},s=[],i=e("5530"),o=e("2f62"),r={name:"StudentLogin",data:function(){return{email:"",password:""}},methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])("students",["loginStudent"])),{},{login:function(){var t=this,a=this.email,e=this.password;this.loginStudent({email:a,password:e}).then((function(){t.$router.go(0)})).then((function(){t.$router.push("/")})).catch((function(t){return console.log(t)}))}})},c=r,u=(e("c881"),e("2877")),l=Object(u["a"])(c,n,s,!1,null,"b8ae9d0a",null);a["default"]=l.exports},faca:function(t,a,e){}}]);
//# sourceMappingURL=chunk-0a95914d.775f5949.js.map