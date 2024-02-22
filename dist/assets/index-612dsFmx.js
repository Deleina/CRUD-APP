(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const L="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='32'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20256'%3e%3cpath%20fill='%23F7DF1E'%20d='M0%200h256v256H0V0Z'%3e%3c/path%3e%3cpath%20d='m67.312%20213.932l19.59-11.856c3.78%206.701%207.218%2012.371%2015.465%2012.371c7.905%200%2012.89-3.092%2012.89-15.12v-81.798h24.057v82.138c0%2024.917-14.606%2036.259-35.916%2036.259c-19.245%200-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157%208.421%2011.859%2014.607%2023.715%2014.607c9.969%200%2016.325-4.984%2016.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044%2013.747-31.792%2035.228-31.792c15.294%200%2026.292%205.328%2034.196%2019.247l-18.732%2012.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046%200-11.514%204.468-11.514%2010.31c0%207.217%204.468%2010.14%2014.778%2014.608l6.014%202.577c20.45%208.765%2031.963%2017.7%2031.963%2037.804c0%2021.654-17.012%2033.51-39.867%2033.51c-22.339%200-36.774-10.654-43.819-24.574'%3e%3c/path%3e%3c/svg%3e",N="/vite.svg",T=`\r
<div class="modal-dialog">\r
    <form novalidate>\r
        <span>User</span>\r
        <input type="text" name="firstName" placeholder="First Name" />\r
        <input type="text" name="lastName" placeholder="Last Name" />\r
        <input type="number" name="balance" placeholder="Balance" />\r
\r
        <div>\r
            <input type="checkbox" id="is-active" name="isActive" checked/>\r
            <label for="is-active">is active?</label>\r
        </div>\r
\r
        <button type="submit">\r
            Save\r
        </button>\r
\r
    </form>\r
\r
</div>`;class y{constructor({id:t,isActive:a,balance:r,avatar:n,firstName:s,lastName:o,gender:m}){this.id=t,this.isActive=a,this.balance=r,this.avatar=n,this.firstName=s,this.lastName=o,this.gender=m}}const h=e=>{const{avatar:t,balance:a,first_name:r,gender:n,id:s,isActive:o,last_name:m}=e;return new y({avatar:t,balance:a,firstName:r,gender:n,id:s,isActive:o,lastName:m})},P=async e=>{const t=`http://localhost:3001/users/${e}`,r=await(await fetch(t)).json(),n=h(r);return console.log(n),n};let i,d,g={};const b=async e=>{if(i==null||i.classList.remove("hide-modal"),g={},!e)return;const t=await P(e);E(t)},E=e=>{d.querySelector('[name = "firstName"]').value=e.firstName,d.querySelector('[name = "lastName"]').value=e.lastName,d.querySelector('[name = "balance"]').value=e.balance,d.querySelector('[name = "isActive"]').checked=e.isActive,g=e},v=()=>{i==null||i.classList.add("hide-modal"),d.reset()},S=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=T,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",a=>{a.target.className==="modal-container"&&v()}),d.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(d),n={...g};for(const[s,o]of r){if(s==="balance"){n[s]=Number(o);continue}if(s==="isActive"){n[s]=o==="on";continue}n[s]=o}await t(n),v()}),e.append(i))},x=(e,t)=>{const a=document.createElement("button");a.innerText="+",a.classList.add("fab-button"),e.append(a),a.addEventListener("click",()=>{b()})},f=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`,n=(await(await fetch(t)).json()).map(s=>h(s));return console.log(n),n},c={currentpage:0,users:[]},M=async()=>{const e=await f(c.currentpage+1);e.length!==0&&(c.currentpage+=1,c.users=e)},w=async()=>{if(c.currentpage==1)return;const e=await f(c.currentpage-1);c.users=e,c.currentpage-=1},$=async e=>{let t=!1;c.users=c.users.map(a=>a.id===e.id?(t=!0,e):a),c.users.length<10&&!t&&c.users.push(e)},A=async()=>{const e=await f(c.currentpage);if(e.length===0){await w();return}c.users=e},l={loadNextPage:M,loadPreviousPage:w,onUserChanged:$,reloadPage:A,getUsers:()=>[...c.users],getCurrentPage:()=>c.currentpage},H=async e=>{const t=`http://localhost:3001/users/${e}`,r=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:r}),!0};let u;const U=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>FirtsName</th>
        <th>Lastname</th>
        <th>Active</th>
        <th>Actions</th>

    </tr>
    
    `;const a=document.createElement("tbody");return e.append(t,a),e},B=e=>{const t=e.target.closest(".select-user");if(!t)return;const a=t.getAttribute("data-id");b(a)},k=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const a=t.getAttribute("data-id");try{await H(a),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),p()}catch(r){console.log(r),alert("No se pudo eliminar")}},p=e=>{const t=l.getUsers();u||(u=U(),e.append(u),u.addEventListener("click",B),u.addEventListener("click",k));let a="";t.forEach(r=>{a+=`
        <tr>
            <td>${r.id}</td>
            <td>${r.balance}</td>
            <td>${r.firstName}</td>
            <td>${r.lastName}</td>
            <td>${r.isActive}</td>
            <td>
                
            <a herf= '#/'class="select-user" data-id="${r.id}" >Select</a>
                
            <a herf= '#/'class="delete-user" data-id="${r.id}" >Delete</a>
            </td>
        </tr>
        
        `}),u.querySelector("tbody").innerHTML=a},q=e=>{const t=document.createElement("button");t.innerHTML=" Next >";const a=document.createElement("button");a.innerHTML=" Prev >";const r=document.createElement("span");r.id="current-page",r.innerHTML=l.getCurrentPage(),e.append(a,r,t),t.addEventListener("click",async()=>{await l.loadNextPage(),r.innerText=l.getCurrentPage(),p(e)}),a.addEventListener("click",async()=>{await l.loadPreviousPage(),r.innerText=l.getCurrentPage(),p(e)})},C=e=>{const{avatar:t,balance:a,firstName:r,gender:n,id:s,isActive:o,lastName:m}=e;return{avatar:t,balance:a,first_name:r,gender:n,id:s,isActive:o,last_name:m}},j=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw"fisrt and last name required";const a=C(t);let r;return t.id?r=await D(a):r=await O(a),h(r)},O=async e=>{const r=await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({newUser:r}),r},D=async e=>{const t=`http://localhost:3001/users/${e.id}`,r=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({updatedUser:r}),r},F=async e=>{e.innerHTML="Loading...",await l.loadNextPage(),e.innerHTML="",p(e),q(e),x(e),S(e,async t=>{const a=await j(t);l.onUserChanged(a),p()})};document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${N}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${L}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title" >Hello Vite!</h1>
    <div class="card">
      
    </div>
  </div>
`;const _=document.querySelector(".card");F(_);
