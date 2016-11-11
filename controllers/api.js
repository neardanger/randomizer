var Path = require('path');
var request = require('request');


var products = ["2636","3920","3920_582507_583874", "4044_133012_1045881",
"3944", "4171","2637_667479", "4171_1111647", "5438_426265_1032639",
  "4104", "4171_4191", "4096","4125_4161","1085632_1229464",
  "4171_1015079"]

  var randomizer = function()
  
  {return (Math.floor(Math.random() * (products.length - 0)) + 0)} 



    


module.exports = {

    show: function(req,res){
        var productsArray = []
        for(var i = 0;i < 3; i++){
            productsArray[i] = "http://api.walmartlabs.com/v1/paginated/items?format=json&category=" + products[randomizer()] +"&apiKey=9nh57qxqy5gu6sc4xtewsydr"
        }
    var data = []

    request({url: productsArray[0],json:true}, function(error,response,body){
        var randomizer2 = function (){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var getItem =  body.items[randomizer2()]
        data.push(getItem)
    

     request({url: productsArray[1],json:true}, function(error,response,body){
        var randomizer2 = function  (){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var getItem =  body.items[randomizer2()]
        data.push(getItem)
    

     request({url: productsArray[2],json:true}, function(error,response,body){
        var randomizer2 = function (){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var getItem =  body.items[randomizer2()]
        data.push(getItem)

        res.json(data)
            })
          })
        })  
    },

    show2: function(req,res){
        var trend = []
        for(var i=0;i<2;i++){
            trend[i] = "http://api.walmartlabs.com/v1/trends?apiKey=9nh57qxqy5gu6sc4xtewsydr&format=json"
        }
        var result = []


        request({url:trend[0],json:true}, function(error,response,body){
            randomizer2 = function (){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
            var trendNation = body.items[randomizer2()]
            result.push(trendNation)

            res.json(result)
        })

        
    }
    
}

