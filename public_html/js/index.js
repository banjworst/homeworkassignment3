
document.addEventListener("DOMContentLoaded", function() {
    // Get references to elements
    const nameInput = document.getElementById("name");
    const dayInput = document.getElementById("day");
    const timeInput = document.getElementById("time");
    const resultsDiv = document.getElementById("results");

    const scheduleBtn = document.getElementById("scheduleBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const checkBtn = document.getElementById("checkBtn");

    // Helper function to send GET request
    function sendRequest(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                resultsDiv.innerHTML = data;
            })
            .catch(error => {
                resultsDiv.innerHTML = "Error: " + error;
            });
    }

    // Schedule button click
    scheduleBtn.addEventListener("click", function() {
        const name = encodeURIComponent(nameInput.value);
        const day = encodeURIComponent(dayInput.value);
        const time = encodeURIComponent(timeInput.value);

        const url = `/schedule?name=${name}&day=${day}&time=${time}`;
        sendRequest(url);
    });

    // Cancel button click
    cancelBtn.addEventListener("click", function() {
        const name = encodeURIComponent(nameInput.value);
        const day = encodeURIComponent(dayInput.value);
        const time = encodeURIComponent(timeInput.value);

        const url = `/cancel?name=${name}&day=${day}&time=${time}`;
        sendRequest(url);
    });

    // Check Availability button click
    checkBtn.addEventListener("click", function() {
        const day = encodeURIComponent(dayInput.value);
        const time = encodeURIComponent(timeInput.value);

        const url = `/check?day=${day}&time=${time}`;
        sendRequest(url);
    });
});

