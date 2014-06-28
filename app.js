var express      = require("express"),
    app      	 = express(),
    http         = require("http"),
    server       = http.createServer(app),
    mongoose     = require('mongoose');
    
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});    

app.get('/', function(req, res) {
	res.send('Hola mundillo !!!');
});

mongoose.connect('mongodb://localhost/miMongoDB', function(err, res) {
	if (err) {
		console.log('ERROR conectando con BBDD ' + err);
	} else {
		console.log('He conectado con la BBDD');
	}
});

// app.get('/todos',                   modeloTodos.buscarTodas);
// app.get('/todos/:id',               modeloTodos.buscarPorId);
// app.get('/todos/buscar/:criterios', modeloTodos.buscarPorCriterios);
// app.post('/todos/crear',            modeloTodos.crear);
// app.put('/todos/actualizar/:id',    modeloTodos.actualizar);
// app.delete('/todos/borrar/:id',     modeloTodos.borrar);
var rutasTodos = require('./rutas/todo.js')(app, mongoose);

server.listen(3000, function() {
	console.log('Servidor escuchando en http://localhost:3000');
});
