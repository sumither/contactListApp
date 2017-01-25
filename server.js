var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
  db.contactlist.find(function(err,doc){
    res.json(doc);
  });
});


app.post('/contactlist',function(req,res){
  db.contactlist.insert(req.body,function(err,doc){
    res.json(doc);
  });
});

app.delete('/contactlist/:id',function(req,res){
  db.contactlist.remove({_id:mongojs.ObjectId(req.params.id)},function(err,doc){
    res.json(doc);
  });
});

app.get('/contactlist/:id',function(req,res){
  db.contactlist.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,doc){
    res.json(doc);
  });
});

app.put('/contactlist/:id',function(req,res){
  db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(req.params.id)},
                                update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
                                new:true},function(err,doc){
    res.json(doc);
  });
});

app.listen(3000);
console.log('server running on port 3000');
