window.addEventListener("load", function(){    
            
    function jsonBase64ForObjectUrl(json){
        var url = "";
        try {
            json = JSON.parse(json);
            //console.dir(json);
            var str = "";
            for (var i = 0, j = json["data"].length; i < j; i++) {
                str += atob(json["data"][i]);
            }        
            var binary = (function fixBinary(bin) {
                var length = bin.length;
                var buf = new ArrayBuffer(length);
                var arr = new Uint8Array(buf);
                for (var i = 0; i < length; i++) {
                    arr[i] = bin.charCodeAt(i);
                }
                return buf;
            })(str);
            url = URL.createObjectURL(new Blob([binary], {type: json["type"], endings: 'native'}));
            json = "";
        } catch (error) {
            console.warn(error);
        }    
        return url;
    }

    var data = new FormData();
    data.append('img', 1);
    var ajax = AJAX();
    ajax.method = 'POST';
    ajax.action = './php/server.php';
    ajax.params = data;
    ajax.success = function(response){
        var img = document.querySelector("img");
        img.src = jsonBase64ForObjectUrl(response);
    };
    ajax.execute();

});