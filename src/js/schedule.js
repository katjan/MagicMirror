function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function updateSchedule() {
    $.ajax({
        url: "http://localhost:2000/api/v1/schedule",
        type: "GET",
        dataType: "text",
        success: function(data){
            json_data = JSON.parse(data)
            var elems = document.createElement('div');
            elems.className = "scheduleEntries";
            var sorted_data = json_data.sort(function(a,b){
                aStr = new Date(a['start']['dateTime'] || a['start']['date']);
                bStr = new Date(b['start']['dateTime'] || b['start']['date']);
                if (aStr == "Invalid Date") {
                    return 1;
                } else if (bStr == "Invalid Date") {
                    return -1;
                }
                if (typeof aStr == "String" || typeof bStr == "String") {
                    return bStr.localeCompare(aStr);
                } else {
                    return aStr - bStr;
                }
            });
            for (var i = 0; i < Math.min(10,sorted_data.length); i++) {

                var row = document.createElement('div');
                row.className = "scheduleRow";
                var left = document.createElement('div');
                left.className = "scheduleEntryLeft";
                var right = document.createElement('div');
                right.className = "scheduleEntryRight";
                var left_text = document.createTextNode(sorted_data[i]['summary']);
                var time = new Date(sorted_data[i]['start']['dateTime'] || sorted_data[i]['start']['date']);
                var hour = addZero(time.getHours());
                var minute = addZero(time.getMinutes());
                var right_text = document.createTextNode(hour + ":" + minute);
                var left_fade = document.createElement('div');
                left_fade.className = "fade";
                left.appendChild(left_fade);
                left.appendChild(left_text);
                right.appendChild(right_text);
                row.appendChild(left);
                row.appendChild(right);

                var today = new Date();
                var year = today.getFullYear();
                var month = today.getMonth();
                var day = today.getDate();
                if (year == time.getFullYear() && month==time.getMonth() && day == time.getDate()) {
                    elems.appendChild(row);
                }
            }
            var elem = document.getElementById('schedule');
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
            elem.appendChild(elems);
        }
    });
}

updateSchedule();
setInterval(updateSchedule, 60000);
