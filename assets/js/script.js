//Day will show at the top of the page (moment and changing the DOM) 

//Checks current hour vs time displayed on screen in the time blocks

//Function for saving entered task into local storage


$(document).ready(function() {

    document.querySelector('#currentDay').textContent = moment().format('MMM DD, YYYY');
    
    var timeSlots = $('#time-block');
    var timeArray = ['9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm']

    function buildTimeBlocks(){
        timeArray.forEach(function (i) {
            var userVals = localStorage.getItem(i);
            var rowEl = $("<div>").addClass("row");

            let timeEl = $("<label>").addClass("hour col-12 col-lg-2").val(i).text(i).attr("type", "label");
            let calInput = $("<input>").addClass("col-12 col-lg-8").attr("type", "text").val(userVals);
            let button = $("<button>").addClass("saveBtn col-12 col-lg-2").text("save").attr("type", "button");

            button.click(function (i) {
                let userInput = calInput.val();
                let curTime = timeEl.val();
                localStorage.setItem(curTime, userInput);
                calInput.text(userInput);
            })

            rowEl.append(timeEl).append(calInput).append(button);
            timeSlots.append(rowEl);
            colorChanger(timeEl, calInput);
        })
    }

    function colorChanger(timeEl, calInput) {

        let currentTime = moment().hours();
        let calTime = parseInt(timeEl.val().split(" ")[0]);
        
        if (calTime < 6) {
            calTime = calTime + 12;
        }
        
        if (calTime < currentTime) {
            calInput.addClass("past");
        }
        else if (calTime === currentTime) {
            calInput.addClass("present");
        }
        else {
            calInput.addClass("future");
        }
    }

    buildTimeBlocks();
})
