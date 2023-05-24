
let close_open = document.getElementById("close-open")
let nav_links = document.querySelector(".nav-links");
let social_links = document.querySelector(".social-links");

close_open.addEventListener("click" , ()=>{
    if(close_open.classList.contains("fa-bars")){
        close_open.setAttribute("class" , "fa-solid fa-xmark");
        nav_links.style.display = "block"
        social_links.style.display = "flex"
    }else if(close_open.classList.contains("fa-xmark")){
        close_open.setAttribute("class" , "fa-solid fa-bars");
        nav_links.style.display = "none"
        social_links.style.display = "none"
    
    }
})



















