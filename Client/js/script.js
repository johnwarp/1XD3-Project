/** 
Team number:27



*/
window.addEventListener('load', function () {
    let home = document.getElementById('page-home');
    let form = document.getElementById('page-form');
    let thanks = document.getElementById('page-thanks');
    let learnBtn = document.getElementById('learn-more');
    let valentineForm = document.getElementById('valentine-form');
  
    learnBtn.addEventListener('click', function () {
      home.classList.add('hidden');
      form.classList.remove('hidden');
    });
  
    valentineForm.addEventListener('submit', function (event) {
      event.preventDefault();
      form.classList.add('hidden');
      thanks.classList.remove('hidden');
    });
  });
  