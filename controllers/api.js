var path = require('path'),
    request = require('request'),
    apiList = ["5438","91083_1212910","91083_3947","91083_5941050","91083_1074769","5427","5427_86323",
    "1085666","1085666_133225","1085666_1007221","1085666_1007039","3920","3944","3920_582361_583910",
    "1094765_133224_1068647","2636","4171_56125","4171_14521","1105910","3944_3951","3944_542371","3944_4527",
    "3944_3947","3944_133251"
    ]
    

    var randomizer = function(){
        return (Math.floor(Math.random() * (apiList.length - 0)))
    }
    


module.exports = {

    show: function(req,res){
        var apiList = []
        for(i=0;i<3;i++){
            apiList[i] = "http://api.walmartlabs.com/v1/paginated/items?format=json&category" + apiList[randomizer()] +  "&apiKey=" + "9nh57qxqy5gu6sc4xtewsydr"
        }
    var result = []

    request({url: apiList[0],json:true}, function(error,response,body){
        var randomizer2 = function(){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var vapeNation =  body.items[randomizer2()]
        result.push(vapeNation)
    

     request({url: apiList[1],json:true}, function(error,response,body){
        var randomizer2 = function(){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var vapeNation =  body.items[randomizer2()]
        result.push(vapeNation)
    

     request({url: apiList[2],json:true}, function(error,response,body){
        var randomizer2 = function(){return (Math.floor(Math.random() * (body.items.length - 0)) + 0)}
        var vapeNation =  body.items[randomizer2()]
        result.push(vapeNation)
    res.json(result)
            })
          })
        })  
     }
  }
