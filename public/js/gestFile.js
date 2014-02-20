
var path;
var editor;

window.onload = function()
{
	goRoot();

	$('#tema').change(function(){
		editor.setOption("theme", $(this).find('option:selected').text());
	});

	$('#modo').change(function(){
		editor.setOption("mode", $(this).find('option:selected').text());
   		CodeMirror.autoLoadMode(editor, $(this).find('option:selected').text());
	});
}

function getListFiles(pth)
{
	socket.emit('gestFiles', {'path': pth});
}

function saveChanges()
{
	socket.emit('saveFile', {'file': $('#fileTitle').text(), 'cont': editor.getValue()});
	notify("success", textos[0]);
}

function rename(name)
{
	 bootbox.prompt(textos[1] + name, function(result) {
		if (result == "") {
			notify("danger", textos[2]);
		}
		else if(result != null){
			var strPath = getStrPath();
			socket.emit('renombra', {'path': strPath,'oldName': name, 'newName': result});
		}
	});
}

function newFile(){
	bootbox.prompt(textos[3], function(result) {
		if (result == "") {
			notify("danger", textos[4]);
		}
		else if(result != null){
			var strPath = getStrPath();
			socket.emit("newFile", {'path': strPath,'name': result});
		}
	});
}

function newDir(){
	bootbox.prompt(textos[5], function(result) {
		if (result == "") {
			notify("danger", textos[6]);
		}
		else if(result != null){
			var strPath = getStrPath();
			socket.emit("newDir", {'path': strPath,'name': result});
		}
	});
}

function removeFileDir(name){
	var strPath = getStrPath();
	socket.emit('borra', {'path': strPath,'rmName': name});
	notify('success', textos[7]);
}

socket.on('fileList', function(n){
	$(".getArxius").remove();
	n.jsonFile.forEach(function(elm){
		var tipo = (elm.type=="directory")?"fa-folder-open":"fa-file";
		$("#llista").append("<div class='getArxius row selArxiu col-xs-11'>"+
								"<a onclick=\"clickFile('"+elm.name+"','"+elm.type+"');\" class='col-xs-2'>"+
									"<span style='cursor: pointer;' class='fa " + tipo + "'>" + elm.name + "</span>"+
								"</a>"+
								"<div class='col-xs-1 pull-right'>"+
									"<a class='fa fa-pencil-square-o' onclick='rename(\""+elm.name+"\");'></a>"+
									"<a class='fa fa-trash-o' onclick='removeFileDir(\""+elm.name+"\");'></a>"+
								"</div>"+
							"</div>");
	//console.log(elm);
	});
	if(path.length > 0)
	for(var i = 0; i < path.length; i++)
			if(i == path.length-1)
				$('#divFiles ol').append("<li class='getArxius active'>" + path[i] + "</li>");
			else
				$('#divFiles ol').append("<li style='cursor: pointer;' class='getArxius'><a onclick=\"linkdir('"+ i +"');\">" + path[i] + "</a></li>");
	else $('#divFiles ol').append("<li class='getArxius active'>/</li>");
	$('#divFiles ol').scrollLeft(-999999999999);
});

socket.on('error', function(e){
	notify('danger', textos[e.err]);
});

socket.on('txtFile', function(n){
	//alert(n.f);
	$('.modal-body').empty();
	console.log(n.f);
	if(n.f != "error")
	{
		$('.modal-body').append("<textarea id='code'></textarea>")
		
		$('#code').text(n.f);
		
		$('#miModal').modal({
			backdrop: false,
			keyboard: false,
			show: true,
			remote: false
		});

		CodeMirror.modeURL = "./codemirror/mode/%N.js";
		editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	        lineNumbers: true,
	        matchBrackets: true,
	        theme: $('#tema').find('option:selected').text()
	    });
	}
	else notify("danger", textos[9]);
});

function linkdir(n){
	var lastLink = path[n];
	path.splice(n, path.length);
	//console.log(path);
	clickFile(lastLink, "directory");
}

function goRoot()
{
	path = new Array();
	getListFiles('/');
	//$('#divFiles ol').append("<li class='getArxius'></li>");
}

function getStrPath(){
	var strPath='';
		for(var i = 0; i < path.length; i++)
			strPath+=path[i]+'/';
	return strPath;
}

function clickFile(n, t)
{
	if(t == "directory")//directorio
	{
		path.push(n)
		var strPath = getStrPath();
		getListFiles(strPath);
	}
	else//archivos
	{
		var strPath = getStrPath()+n;
		console.log(strPath);
		socket.emit('openFile', {'f': strPath});
		$('#fileTitle').text('/'+strPath);
	}
	//alert("/"+n)
}

