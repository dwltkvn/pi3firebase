const fetch = require('node-fetch');

const API_ENDPOINT = (name) => "https://pokeapi.co/api/v2/pokemon/"+name;

const lambda = async (event, context) => {
  return fetch( API_ENDPOINT(event.queryStringParameters.pokemon) )
            .then( response => response.json() )
            .then( data => ({  statusCode:200,
                              body:`id=${data.id} + name=${data.name}` }))
            .catch( error => ({statusCode:422, body:String(error)}));

};

const PERI_ENDPOINT = "https://api.periscope.tv/api/v2/getUserPublic?user_id=1xNjaLNBMqKbd";

const lambda2 = async (event, context) => {
  return fetch( PERI_ENDPOINT )
            .then( response => response.json() )
            .then( data => ({  statusCode:200,
                              body:`${data.user.id}` }))
            .catch( error => ({statusCode:422, body:String(error)}));
};

//lambda( {queryStringParameters:{pokemon:'pikachu'}}).then(data => console.log(data));
lambda2().then(data => console.log(data));


exports.handler = lambda2;