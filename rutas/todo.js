module.exports = function(app, mongoose) {
    var modeloTodos  = require('../modelos/todo.js')(mongoose);  // un módulo para cada esquema

	app.get('/todos',                   modeloTodos.buscarTodas);
	app.get('/todos/:id',               modeloTodos.buscarPorId);
	app.get('/todos/buscar/:criterios', modeloTodos.buscarPorCriterios);
	app.post('/todos/crear', 	        modeloTodos.crear);
	app.put('/todos/actualizar/:id',    modeloTodos.actualizar);
	app.delete('/todos/borrar/:id',     modeloTodos.borrar);
};
