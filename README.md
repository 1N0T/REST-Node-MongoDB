![logo](https://raw.github.com/1N0T/images/master/global/1N0T.png)
#Api REST básica sobre Node.js y MongoDB.

Este es un ejemplo muy básico de uso de **Node.js** y **MongoDB** para crear un api **REST** que nos permita realizar 
operaciones **CRUD** sobre colecciones utilizando peticiones **HTTP**.

Seguramente existen miles de ejemplos similares, y no creo que éste aporte nada nuevo, sobre todo si tenemos en cuenta
que no soy un experto, ni de **Node.ja**, ni de **MongoDB**. Pero tal vez por eso, pueda resultar de ayuda como primer contacto.

Para probarlo, asegurate de que:
* Tienes instalado MongoDB y Node.js,
* MongoDB esté en ejecución.
* Desde el directorio raiz del proyecto ejecuta **node app.js**

Para ejecutar los diferentes métodos del api **REST** (GET, POST, PUT y DELETE), podemos utilizar algún plug-in de los que existen para los distintos navegadores, o podemos recurrir a la línea de comandos como se muestra a continuación.

```
curl -X POST -i -H "Content-type: application/json" http://localhost:3000/todos/crear -d '
    {
        "descripcion": "Documentar proyecto",
        "usuario":"1N0T",
        "oreden":1,
        "estado":"En curso"
    }
    '
```
El pograma **curl** está instalado por defecto en la mayoría de distribuciones linux y existen versiones también para windows.
