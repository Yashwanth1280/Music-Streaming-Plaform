const ele=document.querySelector(".search");
// ele.addEventListener('input',()=>{
//     console.log(ele.value);
// });
const ele2=document.querySelector("#sub");
ele2.addEventListener('click',()=>{
    let data=ele.value;
    console.log(data);
});

const div1=document.querySelector(".card-search.card6");
div1.addEventListener('click',()=>{
    window.location.href = '/educationhub'; 
    
});

const div2=document.querySelector(".card-search.card9");
div2.addEventListener('click',()=>{
    window.location.href = '/instruments'; 
    
});

const div3=document.querySelector(".card-search.card2");
div3.addEventListener('click',()=>{
    window.location.href = '/podcast'; 
    
});