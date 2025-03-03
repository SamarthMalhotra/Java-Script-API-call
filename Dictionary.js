let url= "https://api.dictionaryapi.dev/api/v2/entries/en/";
let button=document.querySelector(".btn");
let inp=document.querySelector("#word");
let audiotag=document.querySelector(".hide");
let source=document.querySelector("source");
button.addEventListener("click",async ()=>{
   audiotag.setAttribute("class","hide");
    let word=inp.value;
    let message=await search(word);
    if(message!=null){
    let voice=message.phonetics[0].audio;
    audioFun(voice);
    Arr=message.meanings;
    if(Arr.length>0){
    for(value of Arr){
      print(value.definitions);
    }}
    }else{
     err();
    }
  });
function audioFun(voice){
  if(voice){
    audiotag.setAttribute("class","unhide");
    audiotag.setAttribute("src",voice);
  }
  else{
    audiotag.setAttribute("class","hide");
  }
}
function print(definitions){
  list=document.querySelector("#list");
  list.innerHTML="";
  for(def of definitions){
    litem =document.createElement("li");
    litem.innerText=def.definition;
    list.appendChild(litem);
  }}
function err(){
 list=document.querySelector("#list");
 list.innerHTML="";
 mes=document.createElement("li").innerText="Result is not found";
 list.append(mes);
}
async function search(value)
{  try{
    res= await axios.get(url+value);
    return res.data[0];
  }catch(e){
    console.error(e);
    return null;
  }
}