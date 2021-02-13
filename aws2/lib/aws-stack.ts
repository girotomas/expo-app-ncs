let url = "https://ncs.io/music-search?q="
let https = require('https')

exports.handler = async function(event) {
  try{
    const search = url + event.body
    const promise = new Promise(function(resolve, reject) {
       https.get(search, function (resp)  {
          let data = ''; 
          resp.on('data', function(chunk){
            data += chunk;
          });
          resp.on('end', function(){
            let response = {
              statusCode: '200',
              body: JSON.stringify(data)
            };
            resolve(response);
          })
          resp.on('error', function (e){
            console.log(e)
            resolve(e)
          })
       })
    })
    return promise
  }
  catch(e){
    console.log(e)
    return JSON.stringify(e) 
  }
}