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


	$('#up').click(function(){
		socket.emit('up');
	});
	$("#down").click(function(){
		socket.emit('down')
	});
	$("#left" ).click(function(){
		socket.emit('left')
	});
	$("#right").click(function(){
		socket.emit('right')
	});
	
}