function updateTrafic() {
    $.ajax({
        url: "http://localhost:2000/api/v1/sl",
        type: "GET",
        dataType: "text",
        success: function(data){
            json_data = JSON.parse(data)
            var elems = document.createElement('div');
            elems.className = "traficEntries";
            json_data = json_data.sort(function(a,b){
                aStr = "" + a['JourneyDirection'];
                bStr = "" + b['JourneyDirection'];
                return bStr.localeCompare(aStr);
                /*if (aStr === bStr) {
                    return a['DisplayTime'].localeCompare(b['DisplayTime']);
                } else {
                    return aStr.localeCompare(bStr);
                }*/
            });
            json_data.forEach(function(entry){
                var row = document.createElement('div');
                row.className = "traficRow";
                var left = document.createElement('div');
                left.className = "traficEntryLeft";
                var right = document.createElement('div');
                right.className = "traficEntryRight";
                var left_text = document.createTextNode(entry['LineNumber'] + " " + entry['Destination']);
                var right_text = document.createTextNode(entry['DisplayTime']);
                var left_fade = document.createElement('div');
                left_fade.className = "fade";
                left.appendChild(left_text);
                left.appendChild(left_fade);
                right.appendChild(right_text);
                row.appendChild(left);
                row.appendChild(right);

                elems.appendChild(row);
            });
            var elem = document.getElementById('trafic')
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
            elem.appendChild(elems);
        }
    });
}

updateTrafic();
setInterval(updateTrafic, 10000);
