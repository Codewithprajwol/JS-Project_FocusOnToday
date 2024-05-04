// const inputfield=document.querySelector('.all-selections');

// const circleCheck=document.querySelectorAll('.checkbox-circle');

// circleCheck.forEach((circle)=>{
//     circle.addEventListener('click',(e)=>{
//    inputfield.classList.toggle('completed');
//     })
// })
// const circleCheck = document.querySelectorAll('.checkbox-circle');
// // const svgage=document.querySelector('.svg-savage')

// circleCheck.forEach((circle) => {
//     circle.addEventListener('click', (e) => {

//         e.target.parentElement.classList.toggle('completed');
//     });
// });

const circleCheck = document.querySelectorAll('.checkbox-circle');

circleCheck.forEach((circle) => {
    circle.addEventListener('click', (e) => {
        // Check if the clicked element is the circle or SVG inside it
        if (e.target.classList.contains('checkbox-circle') || e.target.classList.contains('.svg-savag')) {
            // Toggle the 'completed' class on the parent element of the clicked circle
            e.target.parentElement.classList.toggle('completed');
        }
    });
});
