window.addEventListener("load", function(event) {
    console.log("bro");
    function success(response) {
        console.log(response);

        let pageForm = document.getElementById("page-form");

        if (response.success) {
            pageForm.classList.add('hidden');
            document.getElementById("page-thanks").classList.remove('hidden');
            console.log("Things went ok. Submission successful.");
        } else {
            pageForm.classList.add('hidden');
            document.getElementById("page-error").classList.remove('hidden');
            document.getElementById("error-message").innerHTML = response.error || "Something went wrong.";
            console.log("Error: " + response.error);
        }
    }

    function querySelectorToArr(query) {
        let date_arr = [];

        for (let time of query) {
            date_arr.push(parseInt(time.value));
        }

        return date_arr;
    }

    let form = this.document.getElementById("valentine-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // variables storing all the band member's info
        let name = document.getElementById("name").value;
        let macid = document.getElementById("macid").value;
        let instrument = document.getElementById("instrument").value;

        // puts all the available times in an array respective to their date
        let monday_times = querySelectorToArr(document.querySelectorAll("input[name='monday']:checked"));   // from stack overflow & w3schools
        let tuesday_times = querySelectorToArr(document.querySelectorAll("input[name='tuesday']:checked"));
        let wednesday_times = querySelectorToArr(document.querySelectorAll("input[name='wednesday']:checked"));
        let thursday_times = querySelectorToArr(document.querySelectorAll("input[name='thursday']:checked"));
        let friday_times = querySelectorToArr(document.querySelectorAll("input[name='friday']:checked"));

        let all_times = [monday_times, tuesday_times, wednesday_times, thursday_times, friday_times];

        console.log(name, macid, instrument);

        console.log(all_times);

        // stringifying and encoding so that the nested array structure is preserved
        let all_times_str = JSON.stringify(all_times);
        let encoded_all_times = encodeURIComponent(all_times_str);

        // let url = `server/add_band_member.php?name=${name}&macid=${macid}&instrument=${instrument}&alltimes=${encoded_all_times}`;

        // fetch(url)
        //     .then(response => response.json())
        //     .then(success);
        
    });



});