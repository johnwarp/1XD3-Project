/** 
Team number:27



*/
window.addEventListener('load', function () {
  function success(a) {
    if (a === "ok") {
      form.classList.add('hidden');
      thanks.classList.remove('hidden');
      console.log("things went ok");
    } else if (a === "duplicate") {
      form.classList.add('hidden');
      errorPage.classList.remove('hidden');
      document.getElementById("error-message").innerHTML = "Error: duplicate entry (TODO: make this error specifically more graceful)";
    } else if (a === "bad") {
      form.classList.add('hidden');
      errorPage.classList.remove('hidden');
      document.getElementById("error-message").innerHTML = "Something went wrong";
      console.log("things did not go ok");
    }

  }

  let home = document.getElementById('page-home');
  let form = document.getElementById('page-form');
  let thanks = document.getElementById('page-thanks');
  let errorPage = document.getElementById('page-error');
  let learnBtn = document.getElementById('learn-more');
  let valentineForm = document.getElementById('valentine-form');

  learnBtn.addEventListener('click', function () {
    home.classList.add('hidden');
    form.classList.remove('hidden');
  });

  valentineForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // executes the server stuff
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let time = document.getElementById("time").value;
    let insta = document.getElementById("insta").value;
    let msg2 = document.getElementById("msg2").value;
    let msg3 = document.getElementById("msg3").value;

    let url = "server/process_submission.php?name=" + name + "&email=" + email + "&time=" +
      time + "&insta=" + insta + "&msg2=" + msg2 + "&msg3=" + msg3;

    console.log(url); // debug

    // do the fetch
    fetch(url)
      .then(response => response.json()) // calls the json function instead of text
      .then(success)
    
    // code hiding and showing the thanks page is now in the function success
  });
});
