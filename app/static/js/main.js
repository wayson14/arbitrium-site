const bigA = document.querySelector('#bigAContainer');

const postsButton = document.querySelector('#posts')
const aboutButton = document.querySelector('#about')
const documentsButton = document.querySelector('#documents')
const moreButton = document.querySelector('#more')

// bigA.addEventListener('click', (event) => {
//     event.preventDefault();
    
// })

// postsButton.addEventListener('click', (event)=>{
//     event.preventDefault();
    
// })


//sticky navbar section
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("bottomNavRow");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}