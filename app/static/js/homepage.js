var navLinks = document.getElementById("navLinks");

document.getElementById('contacto').addEventListener('click',function(){
    console.log("CLICK");
    document.querySelector('.bgModal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click',function(){
    document.querySelector('.bgModal').style.display = 'none';
});

function showMenu(){
    navLinks.style.right = "0";

}

function hideMenu(){
    navLinks.style.right = "-200px";
    
}