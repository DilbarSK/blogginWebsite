
let textareaEl = document.getElementById("textarea");
let totalC = document.getElementById('total-character')
let remainC = document.getElementById('remaining-character')

textareaEl.addEventListener("keyup" , (e)=>{
    
    update_counter();
    
})

function update_counter(){
    totalC.innerText = `Total Character : ${textareaEl.value.length}`;
    remainC.innerText = `Remaining Character : ${ 30 - textareaEl.value.length}`
}

// =================================== show and stor data ===========================
let recordsEl = document.getElementById("records"); 
let form = document.querySelector('.form');

let data_array = [];
let records_obj = JSON.parse(localStorage.getItem("messeges"))

if(records_obj){
    data_array = records_obj ;
} 

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    
    
    let time = new Date().toDateString();
    console.log(time)
    
    let name = document.getElementById("name").value ;
    let email = document.getElementById("email").value ;
    let subject = document.getElementById("subject").value ;
    let messege = document.getElementById("textarea").value ;
    
    data_array.push({name , email, subject , messege , time})
    console.log(data_array);
    show_data();
    save_data();
    
})

show_data();

function show_data(){
    
    let statement = '';
    data_array.forEach((data , index )=>{
        statement += ` <tr>
        <td>${index + 1}</td>
        <td>${data.name}</td>
        <td>${data .email}</td>
        <td>${data .subject}</td>
        <td>${data .messege}</td>
        <td>${data .time}</td>
        </tr>`
    })
    
    recordsEl.innerHTML = statement
}
if(recordsEl.innerHTML == ""){
    recordsEl.innerHTML = `<h2> Records Are Not Found </h2>`
}

function save_data(){
    localStorage.setItem("messeges" , JSON.stringify(data_array))
}








