// =====================================================================
// Módulo genérico de tratamiento de las operaciones REST
// Recibe comoo parámetro un modelo de mongoose del siguiente estilo y
// que determina la colección de datos y su esquema.

//   var modelo = mongoose.model('seriestv', esquemaSeries);
//   var REST   = require('./REST.js')(modelo);		
// =====================================================================


module.exports = function(modelo) {

	// GET devuelve una array con todos los elementos de la colección
	buscarTodas = function(req, res) {
		modelo.find({}, function(err, datos) {
			if (err) {
				console.log('ERROR en buscarTodas: ' + err);
			};
			res.send(datos);
		});
	};

	// GET devuelve el elemento cuyo "_id" coincide con el parámetro "id".
	buscarPorId = function(req, res) {
		modelo.findById(req.params.id, function(err, datos) {
			if (err) {
				console.log('ERROR en buscarProId: ' + err);
			}
			res.send(datos);
		});
	};

	// GET devuelve una array con todos los elementos de la colección
	// que complan los criterios recibidos como parámetros,
	buscarPorCriterios = function(req, res) {
		modelo.find(JSON.parse(req.params.criterios), function(err, datos) {
			if (err) {
				console.log('ERROR en buscarPorCriterios: ' + err);
			};
			res.send(datos);
		});
	};

	// POST insertamos un elemento con los valores del JSON recibido en el cuerpo 
	// de la petición. Como es una función genérica, el nombre de la propiedad
	// recibida debe coincidir con el de la propiedad en el esquema.
	crear = function(req, res) {
		// Analizamos tanto las propiedades existentes en el esquema, como las 
		// recibidas en el JSON del cuerpo para simular una operación similar
		// a la siguiente:
		//
		//    var elementoNuevo = new modelo({
		//		     titulo:   req.body.titulo,
		//		     anyo:     req.body.anyo,
		//		     genero:   req.body.genero  
		//		  });

		// Creamos un objeto vacio de tipo mongoose.model.
		var elementoNuevo = new modelo();

		// Añadimos al objeto anterior, las propiedades de modelo recibido como
		// parámetro en el módulo que tengan un valor asignado en el JSON del
		// cuerpo de la petición.
		for (key in modelo.schema.paths) {
			if ((modelo.schema.paths.hasOwnProperty(key)) && req.body.hasOwnProperty(key)) {
				elementoNuevo[key] = req.body[key];
			};
		};	
		elementoNuevo.save(function(err) {
			if(err) {
				console.log('ERROR en crear: ' + err);
			}
		});

		res.send(elementoNuevo);
	};


	// PUT modificamos un elemento  cuyo "_id" coincide con el parámetro "id"
	// con los valores del JSON recibido en el cuerpo de la petición.
	// Como es una función genérica, el nombre de la propiedad
	// recibida debe coincidir con el de la propiedad en el esquema.
	actualizar = function(req, res) {
		modelo.findById(req.params.id, function(err, datos) {

			// Añadimos al objeto anterior, las propiedades de modelo recibido como
			// parámetro en el módulo que tengan un valor asignado en el JSON del
			// cuerpo de la petición.
			for (key in modelo.schema.paths) {
				if ((modelo.schema.paths.hasOwnProperty(key)) && req.body.hasOwnProperty(key)) {
					datos[key] = req.body[key];
				};
			};	

			datos.save(function(err) {
				if(err) {
					console.log('ERROR en actualizar: ' + err);
				}
			});

			res.send(datos);
		});
	};

	// DELETE, borramos elemento cuyo "_id" coincide con el parámetro "id".
	borrar = function(req, res) {
		modelo.findById(req.params.id, function(err, datos) {
			datos.remove(function(err) {
				if(err) {
					console.log('Serie borrada ' + datos);
				}
			});

			res.send(datos);
		});
	};
		
	// Exportamos las funciones para que después sean accesibles desde el exterior.
	//    var REST = require('./REST.js')(modelo);
	//    ...
	//    REST.buscarTodas;
	// Los nombres con los que se exportan no tiene por que ser necesariamente iguales.		
	return {
		buscarTodas:        buscarTodas,
		buscarPorId:        buscarPorId,
		buscarPorCriterios: buscarPorCriterios,
		crear: 		        crear,
		actualizar:         actualizar,
		borrar:             borrar,
	};	
};
