module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	
	var esquemaSeries = new Schema({
		titulo: 	{ type: String },
		anyo:		{ type: Number },
		genero:		{ type: String, enum: ['Drama', 'Terror', 'Comedia'] }
	});

	var modelo = mongoose.model('seriestv', esquemaSeries);

    var REST = require('./REST.js')(modelo);		
	return {
		buscarTodas: REST.buscarTodas,
		buscarPorId: REST.buscarPorId,
		crear: 		 REST.crear,
		actualizar:  REST.actualizar,
		borrar:      REST.borrar,
	};	
};
