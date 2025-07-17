let changeimage = document.querySelector('.changecontent input');
let changebutton = document.querySelector('.changecontent p');
let chngemenu = document.querySelectorAll('.menu h3');
changebutton.addEventListener('click', () => {
    if (changeimage.value) {
        document.body.style.backgroundImage = `url(${changeimage.value})`;
        changeimage.value = '';
    } else {
        alert('Please enter a valid image URL');
    }
});

chngemenu.forEach((menu) => {   
    menu.addEventListener('click', () => {
        menu.style.color = '#7ab7b1';
    });
});
