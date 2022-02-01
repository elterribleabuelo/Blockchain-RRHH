var navLinks = document.getElementById("navLinks");
var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

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

// Javascript for image slider manual navigation
var manualNav = function(manual){
    slides.forEach((slide) => {
        slide.classList.remove('active');

        btns.forEach((btn) => {
            btn.classList.remove('active');
        });
    });
    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
}

btns.forEach((btn, i) => {
    btn.addEventListener("click",() => {
        manualNav(i);
        currentSlide = i;
    });
})

// Javascript for image slider autoplay navigation 
var repeat =  function(activeClass){
    let active = document.getElementsByClassName('active');
    let i = 1;

    var repeater = () => {
        setTimeout(function(){
            [...active].forEach((activeSlide) => {
                activeSlide.classList.remove('active');
            });
            slides[i].classList.add('active');
            btns[i].classList.add('active');
            i++;

            if(slides.length == i){
                i = 0;
            }

            if(i >= slides.length){
                return;
            }
            repeater();
        }, 10000);
    }
    repeater();
}

repeat()