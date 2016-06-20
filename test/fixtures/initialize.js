var ElasticSearch = require('elasticsearch');
var client = new ElasticSearch.Client({
  host: "http://localhost:9200",
  log: 'debug'
});

  var params = {
        "contacts": {
          "properties": {
            "skills": {
              "properties": {
                "skill":    { "type": "string" },
                "level":    { "type": "short"  }
              }
            }
          }
        },
        "viewedBy": {
          "properties": {
            "id": {"type": "string"},
            "fullname": {"type": "string"}
          }
        }
    };

  var paramsGmClientUsers = {
    "properties": {
      "email": {
        "type": "string",
        "index": "not_analyzed"
      }
    }
  }

 var paramsGmUsers = {
   "properties": {
     "email": {
       "type": "string",
       "index": "not_analyzed"
     }
   }
 }

 var paramsList = {
   "properties": {
     "listName": {
       "type": "string",
       "index": "not_analyzed"
     }
   }
 }

client.indices.exists({index: 'gmcontact'}, function (err, res) {

    if(res) {
    //     //delete and reset
        client.indices.delete({
          index: 'gmcontact'
        }, function (error, response) {

        client.indices.create({index: 'gmcontact'}, function (res, err) {
            client.indices.putMapping({index:"gmcontact", type:"contacts", body:params}, function (err,resp) {
              client.indices.putMapping({index:"gmcontact", type:"gmusers", body:paramsGmUsers}, function (err,resp) {
              client.indices.putMapping({index: 'gmcontact', type: "gmclientusers", body: paramsGmClientUsers}, function(errMapping, responseMapping){
              client.indices.putMapping({index: 'gmcontact', type: "csv-list", body: paramsList}, function(errMappingList, responseMappingList){
                if(errMapping) {

                console.log('error mapping: ', errMapping);
                }
                console.log('mapping for client users is defined');
                console.log('### Err ###:', err);
                client.bulk({
                    body: require('./fixture-js.json')
                }, function (err, response) {
                    console.log('The index gmcontact is ready to use');
                });
              })
              })

            });
            });
        });


        });

    } else {
        //create
        client.indices.create({index: 'gmcontact'}, function (res, err) {
            client.indices.putMapping({index:"gmcontact", type:"contacts", body:params}, function (err,resp) {
              client.indices.putMapping({index:"gmcontact", type:"gmusers", body:paramsGmUsers}, function (err,resp) {
              client.indices.putMapping({index: 'gmcontact', type: "gmclientusers", body: paramsGmClientUsers}, function(errMapping, responseMapping){
              client.indices.putMapping({index: 'gmcontact', type: "csv-list", body: paramsList}, function(errMappingList, responseMappingList){

                client.bulk({
                    body: require('./fixture-js.json')
                }, function (err, response) {
                    console.log('The index gmcontact is ready to use');
                });

              })
              })
              })

           });
       });
    }
});
