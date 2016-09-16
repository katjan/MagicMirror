var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function updateTime() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var hour = addZero(today.getHours());
    var minute = addZero(today.getMinutes());
    document.getElementById('time').innerHTML = hour + ":" + minute;
    document.getElementById('date').innerHTML = day + " " + months[month] + " " + year;
    setInterval(updateTime, 1000);
}

updateTime();
