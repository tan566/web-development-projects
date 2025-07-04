const Baseurl="https://open.er-api.com/v6/latest/"
const button=document.querySelector("button");
const dropdowns= document.querySelectorAll(".dropdown select");
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const input=document.querySelector(".amount input")
const msg=document.querySelector(".msg")


let rate=0;
for (let select of dropdowns){
    for(let code in countryList){
    let option = document.createElement("option");
    option.value = code;
    option.innerText = code;
    select.append(option);
    if(select.name==="from"&&code==="USD"){
      option.selected="selected";
    }else if(select.name==="to"&&code==="INR"){
        option.selected="selected";
    }}
    select.addEventListener("change",(evt)=>{
      
      flagupdate(evt.target);
      
    })
}
console.log("intialvalues ",fromcurr.value,tocurr.value)
function flagupdate(element) {
let currcode=element.value
let countrycode=countryList[currcode]
let image=element.parentElement.querySelector("img")
image.src=`https://flagsapi.com/${countrycode}/flat/64.png` 
}

async function getExchangerate(url){
  await fetch(url).then((res)=>{
    return res.json()
   }).then((data)=>{
    const currencyequivalent=tocurr.value
    rate= data.rates[currencyequivalent]
  })

  let amt=0;
if(input.value===""||input.value<1){
  input.value="1"
  amt=1;
}else{
  amt=input.value
}
console.log(amt)
console.log(rate)
let finalval=amt*rate;
msg.innerText=`${amt}${fromcurr.value}=${finalval}${tocurr.value}`
}

button.addEventListener("click",(evt)=>{
evt.preventDefault();
let urle=`${Baseurl}${fromcurr.value}`
getExchangerate(urle);
})



