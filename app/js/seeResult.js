var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

var source = document.querySelector("iframe");
source.src = "https://en.wikipedia.org/?curid=" + id;
document.title = decodeURI(url.searchParams.get("title")) + " on s-net";
/* const http = require('http');
 var options = {
    host: 'en.wikipedia.org',
    path:  `/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&titles=${id}`,
}
var request = http.request(options, (res) => {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log(data);

    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();*/