var ob = new Date();
var hours = ob.getHours();

if (hours > 12) {
    var hour = hours - 12;
} else {
    hour = hours;
}

grab("#time").innerHTML = hour + ":" + ob.getMinutes();
grab("#date").innerHTML = ("0" + ob.getDate()).slice(-2) + " - " + ("0" + (ob.getMonth() + 1)).slice(-2);