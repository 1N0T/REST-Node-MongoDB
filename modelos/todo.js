module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	
	var esquemaTodos = new Schema({
		descripcion: 	{ type: String },
		orden:			{ type: Number },
		usuario:		{ type: String },
		estado:		    { type: String, enum: ['Pendiente', 'En curso', 'Finalizada'] }
	});

	var modelo = mongoose.model('todo', esquemaTodos);

    var REST = require('./REST.js')(modelo);
    
    // Publicamos y renombramos las funciones genéricas del módulo REST.js al que hemos
    // suministrado el modelo de datos.		
	return {
		buscarTodas:        REST.buscarTodas,
		buscarPorId:        REST.buscarPorId,
		buscarPorCriterios: REST.buscarPorCriterios,
		crear: 		        REST.crear,
		actualizar:         REST.actualizar,
		borrar:             REST.borrar,
	};	
};
