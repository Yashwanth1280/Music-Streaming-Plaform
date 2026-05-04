
document.addEventListener("DOMContentLoaded", function() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropdownList = dropdownMenu.querySelector(".dropdown-list");

    dropdownMenu.addEventListener("click", function(event) {
        if (dropdownList.style.display === "block") {
            dropdownList.style.display = "none";
        } else {
            dropdownList.style.display = "block";
        }
    });
    document.addEventListener("click", function(event) {
        if (!dropdownMenu.contains(event.target)) {
            dropdownList.style.display = "none";
        }
    });
});


const button1 = document.querySelector(".badge.hide");
button1.addEventListener('click', function () {
   
    window.location.href = '/'; 
});



// const button2 = document.querySelector("#art");

// button2.addEventListener('click', function () {
//     window.location.href = '/artist'; 
// });

// const button3 = document.querySelector("#mood");

// button3.addEventListener('click', function () {
//     window.location.href = '/mood'; 
// });
// const button4 = document.querySelector("#genre");

// button4.addEventListener('click', function () {
//     window.location.href = '/genre'; 
// });

const button5 = document.querySelector("#register");
button5.addEventListener('click', function () {
    window.location.href = '/register'; 
});

const button6 = document.querySelector("#play");
button6.addEventListener('click', function () {
    window.location.href = '/playlist'; 
});

const button7 = document.querySelector("#podcast");
button7.addEventListener('click', function () {
    window.location.href = '/podcast'; 
});

    const button8 = document.querySelector("#login");
button8.addEventListener('click', function () {
    window.location.href = '/login'; 
});
