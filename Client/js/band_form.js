window.addEventListener("load", function(event) {
    console.log("local ");
    function success(a) {

    }

    function querySelectorToArr(query) {
        let date_arr = [];

        for (let time of query) {
            date_arr.push(time.value);
        }

        return date_arr;
    }

    let form = this.document.getElementById("valentine-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let macid = document.getElementById("macid").value;
        let instrument = document.getElementById("instrument").value;

        // puts all the available times in an array respective to their date
        let monday_times = querySelectorToArr(document.querySelectorAll("input[name='monday']:checked"));   // from stack overflow & w3schools
        let tuesday_times = querySelectorToArr(document.querySelectorAll("input[name='tuesday']:checked"));
        let wednesday_times = querySelectorToArr(document.querySelectorAll("input[name='wednesday']:checked"));
        let thursday_times = querySelectorToArr(document.querySelectorAll("input[name='thursday']:checked"));
        let friday_times = querySelectorToArr(document.querySelectorAll("input[name='friday']:checked"));

        let all_times = {"monday_times": monday_times,
                        "tuesday_times": tuesday_times,
                        "wednesday_times": wednesday_times,
                        "thursday_times": thursday_times};

        let url = `server/add_band_member.php?name=${name}&macid=${macid}&instrument=${instrument}`;
    });



});