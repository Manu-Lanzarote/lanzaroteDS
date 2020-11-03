const express = require("express");
const app = express();
const inmersiones = require("./inmersiones");
//Para subir objetos con app.post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Para usar la carpeta public en la parte FRONT
app.use(express.static("public"));

//Ruta que devuelve todo el objeto inmersiones
app.get("/inmersiones", function (req, res) {
  res.send(inmersiones);
});

//Ruta qe devuelve solo las inmersiones de Puerto del Carmen
app.get("/puertoDelCarmen", function (req, res) {
  //console.log(inmersiones.puertoDelCarmen);
  res.send(inmersiones.puertoDelCarmen);
});

//Ruta que devuelve las inmersiones de la zona de buceo seleccionada por parámetro. Si la zona no existe devuelve un mnsaje de error.
app.get("/zona/:zona", function (req, res) {
  let zona = req.params.zona;
  //console.log(inmersiones[zona]);
  if (inmersiones[zona] !== undefined) {
    res.send(inmersiones[zona]);
  } else {
    res.send({ mensaje: "Esta zona de buceo no existe" });
  }
});

//Crea una ruta post que añada una nueva inmersion a una zona. Para ello tengo tengo que crear un objeto con los datos de la inmersión que subiré al array de la zona correspondiente con un push.
//PRIMERO!!! Añadir las lineas app.use(express.urlencoded({ extended: false })) y app.use(express.json()); en la cabecera.

app.post("/nueva-inmersion", function (req, res) {
  //Con esta línea accedo a la zona de buceo donde quiero añadir la inmersión
  let zona = req.body.zona;

  //Y aquí creo el objeto que subiré al array de la zona correspondiente
  let inmersion = {
    lugar: req.body.lugar,
    nombre: req.body.nombre,
    nivel: req.body.nivel,
    profundidad_Maxima: req.body.profundidad_Maxima,
  };

  console.log(zona);
  console.log(inmersiones[zona]);

  //Primero compruebo con un iz si la zona enviada por el cliente existe, si existe subo el objeto al array
  //inmersionas[zona] con un push y muestro todas las inmersiones.
  //Si no existe muestro un mensaje de error.
  if (inmersiones[zona] !== undefined) {
    //Subo el objeto con un push
    inmersiones[zona].push(inmersion);
    //Devuelvo el objeto completo
    res.send(inmersiones);
  } else {
    res.send({ mensaje: "La zona no existe" });
    //Mando el mensaje de error dentro de un objeto para que no de error cuando hago el fetch. (Postman no devuelve el error, pero el fetch sí)
  }
  //Pruebo en postman enviando por body la zona y el objeto para ver si funciona
});

app.listen(3000);
