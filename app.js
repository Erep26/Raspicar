/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs-extra');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/control', routes.control);
app.get('/files', routes.files);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    var socket = require('socket.io').listen(server, {log: false});
    socket.on('connection',function(io){
    
        /*io.on('camera', function(){
            var fps = 1000/60;//24fps;
            var tipo = "jpg";
            setInterval(function(){
    
                var exec = require('child_process').exec;
                exec('./../vc/bin/raspistill -n -o image.jpg', function callback(error, stdout, stderr){});
    
    
    
    
                fs.readFile('./image.jpg', function(err, img){
                    if(!err)
                    {
                        var base64Image = img.toString('base64');
                        io.emit('getImg', {'img': "data:image/"+tipo+";base64," + base64Image})
                    }
                    //console.log(base64Image);
                });
            },fps);
        });*/

        function readDirs(path){
            var jsonFile = new Array();
            var thisPath = './files/' + path;
    
            fs.readdirSync(thisPath).forEach(function(file){
                    var tipo = (fs.lstatSync(thisPath+file).isDirectory())?"directory":"file";
                    var info = {
                        name: file,
                        type: tipo
                    }
                    jsonFile.push(info);
            });
            //console.log(jsonFile);
            io.emit('fileList',{'jsonFile': jsonFile});
        }
        function someErrors(str)
        {
            io.emit('error', {'err': str});
        }
    
    	io.on('gestFiles', function(e){readDirs(e.path)});

        io.on('openFile', function(e){

            var mmm = require('mmmagic'),
            Magic = mmm.Magic;

            var magic = new Magic(mmm.MAGIC_MIME_ENCODING);
            magic.detectFile('./files/'+e.f, function(err, result) {
                var fil = 'error';
                if (result!='binary') fil = fs.readFileSync('./files/'+e.f,'utf8');
                io.emit('txtFile', {'f': fil});
            });
        });

        io.on('saveFile', function(e){
            fs.writeFileSync('./files/'+e.file, e.cont);
        });

        io.on('renombra', function(e){
            var oldName = './files/'+e.path+e.oldName;
            var newName = './files/'+e.path+e.newName
            if(!fs.existsSync(newName))
            {
                fs.renameSync(oldName, newName);
                readDirs(e.path);
            }
            else
            {
                var tipo = (fs.lstatSync(newName).isDirectory())?"directorio":"archivo";
                someErrors("Ya existe un " + tipo + " con este nombre");
            } 
        });

        io.on('borra', function(e){
            var rm = './files/' + e.path + e.rmName;
            fs.deleteSync(rm);
            readDirs(e.path);
        });

        io.on('newFile', function(e){
            var name = './files/'+e.path+e.name;
            if(!fs.existsSync(name))
            {
                fs.writeFileSync(name, "//"+e.name);
                readDirs(e.path);
            }
            else someErrors("Ya existe un archivo con este nombre");
        });

        io.on('newDir', function(e){
            var name = './files/'+e.path+e.name;
            if(!fs.existsSync(name))
            {
                fs.mkdirSync(name);
                readDirs(e.path);
            }
            else someErrors("Ya existe un directorio con este nombre");
        });

    });
});