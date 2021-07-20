$(document).ready(function () {
    document.querySelector('#currentDay').textContent = moment().format('MMM DD, YYYY');
    var timeSlots = $('#time-block');
    var timeArray = ['9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm'];

    function createTimeBlocks() {
       
        timeArray.forEach(function (i) {
            var task = localStorage.getItem(i);
            var rowEl = $("<div>").addClass("row");

            // Creates element in current row
            let timeEl = $("<label>").addClass("hour col-12 col-lg-2").val(i).text(i).attr("type", "label");
            let input = $("<input>").addClass("col-12 col-lg-8").attr("type", "text").val(task);
            let button = $("<button>").addClass("saveBtn col-12 col-lg-2").text("save").attr("type", "button");

            //After the button is clicked, task will be saved to local storage
            button.click(function (i) {
                let myInput = input.val();
                let hour = timeEl.val();
                localStorage.setItem(hour, myInput);
                input.text(myInput);
            })

            rowEl.append(timeEl).append(input).append(button);
            timeSlots.append(rowEl);
            timeBlockColor(timeEl, input);
        })
    }

    // Color codes timeblocks. Past = Grey, Present = Transparent, Future = Gold
    function timeBlockColor(timeEl, input) {
        let currentTime = moment().hours();
        let ourTime = parseInt(timeEl.val().split(" ")[0]);
        
        // Current time will be displayed in military time. Make ourTime military time, by adding 12 to any values less than 6
        if (ourTime < 6) {
            ourTime = ourTime + 12;
        }
        
        if (ourTime < currentTime) {
            input.addClass("past");
        }
        else if (ourTime === currentTime) {
            input.addClass("present");
        }
        else {
            input.addClass("future");
        }
    }

    createTimeBlocks();
})
