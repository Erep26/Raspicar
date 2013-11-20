window.onload = function()
{
	var context = document.getElementById('canvasCamera').getContext('2d');

	//socket.emit('camera');
	socket.on('getImg', function(n){
		var img = new Image();
		img.src = n.img;
		context.drawImage(img, 0,0);

		//calculo fps
		var fps = fpscal();
		console.log(fps);
		$('#fps').text("fps: " + fps);
	});
	
}