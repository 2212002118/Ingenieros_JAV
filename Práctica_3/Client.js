//const fetch = require('node-fetch');
const apiKey = '853ac98bcc4f4278931004f32452d494';
const country = 'us';
//Se establece el end point de News API
const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;


//iniciamos con la captura de las noticias
obtenerNoticias();


//funcion para obtener noticias

async function obtenerNoticias(){
    try{
        //Realizamos una solicitud, response, al servicio
        //Guardaremos el objeto response en la constante reponse
        const response = await fetch(url);
        const data = await response.json();
        //response.status = 200
        if(data.status == 'ok'){
            MostrarNoticias(data.articles);
        }

    }catch(error){
        console.error('Error en la solicitud', error)
    }
}
function MostrarNoticias(articulos){
    articulos.forEach((articulo, index) => {
        const formatoDeArticle = `
    Noticia ${index + 1}:
    \tTítulo: ${articulo.title}
    \tDescripción: ${articulo.description}
    \tFuente: ${articulo.source.name}
    \tPublicado: ${articulo.publishedAt}
    \tEnlace: ${articulo.url}
    `;
        console.log(formatoDeArticle);
      });
}
