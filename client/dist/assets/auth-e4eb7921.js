import{a}from"./redux-toolkit.esm-bd1b15e7.js";const o={user:JSON.parse(window==null?void 0:window.localStorage.getItem("user"))??{}};a({name:"user",initialState:o,reducers:{login(e,r){e.user=r.payload.user},logout(e){e.user=null,localStorage==null||localStorage.removeItem("user"),localStorage.clear()}}});
