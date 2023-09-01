// Calculator functions
let displayValue = '';

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById('calculatorDisplay').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('calculatorDisplay').value = '';
}

function calculateResult() {
    try {
        displayValue = eval(displayValue).toString();
        document.getElementById('calculatorDisplay').value = displayValue;
    } catch (error) {
        displayValue = '';
        document.getElementById('calculatorDisplay').value = 'Error';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("leaveCalculatorForm");
    const calculateButton = document.getElementById("calculateButton");
    const resultMessage = document.getElementById("resultMessage");
    const pieChart = document.getElementById("pieChart").getContext("2d");

    calculateButton.addEventListener("click", function () {
        const input = parseInt(document.getElementById("hoursPresent").value);
        const unit = document.querySelector('input[name="unit"]:checked').value;

        // Calculate adjusted hours or days based on the selected unit
        let adjustedValue;
        if (unit === "hours") {
            adjustedValue = input;
        } else {
            adjustedValue = input * 5 / 90;
        }

        // Calculate attendance percentage
        const attendancePercentage = (adjustedValue / 450) * 100;

        // Determine the message based on the attendance percentage
        let message = "";
        if (attendancePercentage < 65) {
            message = "Detained :(";
        } else if (attendancePercentage >= 65 && attendancePercentage < 75) {
            message = "Conditional Promotion";
        } else if (attendancePercentage >= 75 && attendancePercentage < 80) {
            message = "You're doing okay, but try to attend more.";
        } else {
            message = "Great job! Keep up the good work.";
        }

        // Display the result message
        resultMessage.textContent = `Your attendance percentage is ${attendancePercentage.toFixed(2)}%. ${message}`;

       // Create a pie chart
        new Chart(pieChart, {
            type: "pie",
            data: {
            labels: ["Present", "Absent"],
            datasets: [{
                data: [(unit === "hours" ? adjustedValue : input), (unit === "hours" ? 450 - adjustedValue : 450 - input)],
                backgroundColor: ["#004225", "#960018"],
            }],
            },
        });
    });

    // Initialize Bootstrap Popover for the calculator button
    $('#calculatorButton').popover({
        content: $('#calculatorPopoverContent').html(),
        html: true,
        sanitize: false,
        title: 'Calculator',
        trigger: 'manual',
    });

    // Show the popover when the calculator button is clicked
    $('#calculatorButton').on('click', function () {
        $('#calculatorButton').popover('toggle');
    });

    // Handle closing the popover when clicking outside
    $('body').on('click', function (e) {
        if (!$('#calculatorButton').is(e.target) &&
            $('#calculatorButton').has(e.target).length === 0 &&
            $('.popover').has(e.target).length === 0) {
            $('#calculatorButton').popover('hide');
        }
    });
});
