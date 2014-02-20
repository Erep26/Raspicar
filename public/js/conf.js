function langChange(opt){
	socket.emit('langChange', {selLang: opt.options[opt.selectedIndex].value});
	location.reload();
}