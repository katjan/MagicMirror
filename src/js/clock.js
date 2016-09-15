var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function updateTime() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    document.getElementById('time').innerHTML = hour + ":" + minute;
    document.getElementById('date').innerHTML = day + " " + months[month] + " " + year;
    setInterval(updateTime, 1000);
}

updateTime();
