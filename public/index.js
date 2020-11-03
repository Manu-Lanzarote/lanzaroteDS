//Crea una página web que en la ruta “localhost:3000/” muestre todas las inmersiones

//La ruta que nos manda todas las inmersiones ya la tengo creada en el servidor, (Se encuentra en el index.js del servidor):
//Ruta que devuelve todo el objeto inmersiones
// app.get("/inmersiones", function (req, res) {
//     res.send(inmersiones);
//   });

//Para pedir al servidor/al back/ a la parte API que nos traiga algo usamos un fetch
fetch("/inmersiones")
  .then(function cogerRespuesta(respuesta) {
    return respuesta.json();
  })
  .then(function cogerDatos(datos) {
    console.log(datos);
    // let inmersiones = "";
    // for (let i = 0; i < datos.length; i++) {
    //   inmersiones += `
    //     <h1>${datos.inmersiones[i]}</h1>
    //     `;
    // }
    // document.getElementById("div1").innerHTML = inmersiones;
  });
