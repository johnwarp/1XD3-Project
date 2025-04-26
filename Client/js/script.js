/** 
 * Team number: 27
 */

window.addEventListener('load', function () {
  function success(response) {
    if (response.success) {
      form.classList.add('hidden');
      thanks.classList.remove('hidden');
      console.log("Things went ok. Submission successful.");
    } else {
      form.classList.add('hidden');
      errorPage.classList.remove('hidden');
      document.getElementById("error-message").innerHTML = response.error || "Something went wrong.";
      console.log("Error: " + response.error);
    }
  }

  let home = document.getElementById('page-home');
  let form = document.getElementById('page-form');
  let thanks = document.getElementById('page-thanks');
  let errorPage = document.getElementById('page-error');
  let learnBtn = document.getElementById('learn-more');
  let valentineForm = document.getElementById('valentine-form');
  let songForm = document.getElementById('song-form');

  learnBtn.addEventListener('click', function () {
    home.classList.add('hidden');
    form.classList.remove('hidden');
  });

  valentineForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let insta = document.getElementById("insta").value;

    let url = `server/process_submission.php?name=${name}&email=${email}&insta=${insta}`;

    console.log("Submitting form data to: " + url);

    fetch(url)
      .then(response => response.json()) 
      .then(success) 
      .catch(error => {
        console.error("Error with fetch:", error);
        form.classList.add('hidden');
        errorPage.classList.remove('hidden');
        document.getElementById("error-message").innerHTML = "There was an error with your submission. Please try again.";
      });
  });

  songForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let date = document.getElementById("date").value;
    let timeslot = document.getElementById("timeslot").value;

    if (!date || !timeslot) {
      console.error("Date or timeslot is missing");
      return;
    }

    let url = `server/band_availability.php?date=${date}&timeslot=${timeslot}`;

    console.log("Checking availability at: " + url);

  
    fetch(url)
      .then(response => response.json()) 
      .then(success) 
      .catch(error => {
        console.error("Error with fetch:", error);
        form.classList.add('hidden');
        errorPage.classList.remove('hidden');
        document.getElementById("error-message").innerHTML = "There was an error while checking availability. Please try again.";
      });
  });
});
