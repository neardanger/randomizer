var Path = require('path');
var request = require('request');
var apiTems = ["2636","3920","3920_582507_583874", "4044_133012_1045881",
  "4104", "4171_4191", "4096","4125_4161","1085632_1229464",
  "4171_1015079"]

  var randomizer = function (){return (Math.floor(Math.random() * (apiTems.length - 0)) + 0)} 



    


module.exports = {

    show: function(req,res){
        var apiTemsArray = []
        for(var i = 0;i < 4; i++){
            apiTemsArray[i] = "http://api.walmartlabs.com/v1/paginated/items?format=json&category" + apiTems[randomizer()] +"&apiKey="+"9nh57qxqy5gu6sc4xtewsydr"
        }
    var data = []

    request({url: apiTemsArray[0],json:true}, function(error,response,body){
        var randomizer2 = function (){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var vapeNation =  body.items[randomizer2()]
        data.push(vapeNation)
    

     request({url: apiTemsArray[1],json:true}, function(error,response,body){
        var randomizer2 = function  (){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var vapeNation =  body.items[randomizer2()]
        data.push(vapeNation)
    

     request({url: apiTemsArray[2],json:true}, function(error,response,body){
        var randomizer2 = function (){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var vapeNation =  body.items[randomizer2()]
        data.push(vapeNation)

        res.json(data)
            })
          })
        })  
     }
  }
  
