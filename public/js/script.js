window.onload = function()
{
	var ctx = document.getElementById("miCanvas").getContext('2d');
        var img = new Image();
        img.src = "http://192.168.1.40:8081/";
        //while (true) {
            ctx.drawImage("http://192.168.1.40:8081/",0,0);
        //}
        
        
}