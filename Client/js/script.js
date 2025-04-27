window.addEventListener('load', function () {
  function success(response) {
    if (response.success) {
      form.classList.add('hidden');
      thanks.classList.remove('hidden');
      console.log("Things went ok. Submission successful.");
    } else {
      form.classLisSt.add('hidden');
      errorPage.classList.remove('hidden');
      document.getElementById("error-message").innerHTML = response.error || "Something went wrong.";
      console.log("Error: " + response.error);
    }
  }

  function hideAllPages() {
    home.classList.add('hidden');
    form.classList.add('hidden');
    thanks.classList.add('hidden');
    errorPage.classList.add('hidden');
    about.classList.add('hidden');
  }
  
  let home = document.getElementById('page-home');
  let form = document.getElementById('page-form');
  let thanks = document.getElementById('page-thanks');
  let errorPage = document.getElementById('page-error');
  let learnBtn = document.getElementById('learn-more');
  let valentineForm = document.getElementById('valentine-form');
  let nextStepBtn = document.getElementById('next-step');
  let basicInfo = document.getElementById('basic-info');
  let songRequest = document.getElementById('song-request');
  let aboutBtn = document.getElementById('nav-about');
  let about = document.getElementById('page-about');


  const bgm = document.getElementById('bgm');
  document.body.addEventListener('click', function () {
    bgm.play();
  });
  const audioPlayer = new Audio(); 
  function playCardMusic(songFile) {
    bgm.pause();

    
    fetch(songFile)
      .then(response => response.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        audioPlayer.src = objectURL;
        audioPlayer.play();
      })
      .catch(error => {
        console.error("Error loading audio:", error);
      });
  }

  
  document.getElementById('card-pink').addEventListener('mouseenter', function () {
    playCardMusic('audio/pink.mp3');
  });

  document.getElementById('card-red').addEventListener('mouseenter', function () {
    playCardMusic('audio/red.mp3');
  });

  document.getElementById('card-purple').addEventListener('mouseenter', function () {
    playCardMusic('audio/purple.mp3');
  });

  document.getElementById('card-blue').addEventListener('mouseenter', function () {
    playCardMusic('audio/blue.mp3');
  });

  ['card-pink', 'card-red', 'card-purple', 'card-blue'].forEach(id => {
    document.getElementById(id).addEventListener('mouseleave', function () {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      bgm.play();
    });
  });

  // about us
  aboutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    hideAllPages();
    about.classList.remove('hidden');
  });
  //learn more
  learnBtn.addEventListener('click', function () {
    home.classList.add('hidden');
    form.classList.remove('hidden');
  });

  nextStepBtn.addEventListener('click', function () {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let insta = document.getElementById("insta").value.trim();
    let errorDiv = document.getElementById("basic-info-error");
  
    if (!name || !email || !insta) {
      errorDiv.innerHTML = "💌 Please fill out Name, Email, and Instagram before continuing.";
      errorDiv.style.color = "red"; // (optional) style it red
      return;
    }
  
    // If all filled, clear the error
    errorDiv.innerHTML = "";
  
    basicInfo.classList.add('hidden');
    songRequest.classList.remove('hidden');
  });
  
  

  valentineForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let insta = document.getElementById("insta").value;
    let date = document.getElementById("date").value;
    let timeslot = document.getElementById("timeslot").value;
  
    if (!date || !timeslot) {
      console.error("Date or timeslot is missing");
      return;
    }
  
    let checkAvailabilityUrl = `server/band_availability.php?date=${date}&timeslot=${timeslot}`;
  
    fetch(checkAvailabilityUrl)
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          form.classList.add('hidden');
          errorPage.classList.remove('hidden');
          document.getElementById("error-message").innerHTML = data.error || "Unable to check band availability.";
          return;
        }
  
        if (data.num_members < 1) {
          alert("Sorry, the band is not available at that time. Please choose another slot.");
          return;
        }
  
        // Proceed with form submission
        let submitUrl = `server/process_submission.php?name=${name}&email=${email}&insta=${insta}`;
        console.log("Submitting form data to: " + submitUrl);
  
        fetch(submitUrl)
          .then(response => response.json())
          .then(success)
          .catch(error => {
            console.error("Error with fetch:", error);
            form.classList.add('hidden');
            errorPage.classList.remove('hidden');
            document.getElementById("error-message").innerHTML = "There was an error with your submission. Please try again.";
          });
  
      })
      .catch(error => {
        console.error("Error checking band availability:", error);
        form.classList.add('hidden');
        errorPage.classList.remove('hidden');
        document.getElementById("error-message").innerHTML = "There was an error checking availability.";
      });
  });
  


  
});
