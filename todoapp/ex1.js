var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')

var Cat = mongoose.model('Cat', {name:String});

var kitty = new Cat({name: '나비'});
kitty.save(function (err) {
  if(err){
    console.log('err', err)
  }else {
    console.log('저장 성공!!!')
  }
});