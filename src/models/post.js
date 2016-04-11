/**
 * React-Node-todo-list组件
 * @authors Binson (Binson.zhang@qq.com)
 * @date    2016-04-06 20:03:11
 * @version v1.0
 */

var mongodb = require('./db');
function Post(value){
  console.log(value);
  this.value = value;
};

//存储 value 到数据库
Post.prototype.save = function(callback){

	//存入数据库的字段信息
	var post = {
		value: this.value,
		time: time()
	};

	//打开数据库
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		};

		//读取posts集合
		db.collection('posts', function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			};

			//将文档插入集合
			collection.insert(post,{safe:true},function(err){
				mongodb.close();
				if (err) {
					return callback(err); //失败返回err信息
				};
			  callback(null); //否则返回err为null
			});
		});
	});
};

//读数据列表
Post.list = function(name,callback){

	//打开数据库
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		};

		//读取posts集合
		db.collection('posts',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			};
			var ret = {};
			if (name&&name!=null) {
				ret.name = name;
			};
			collection.find(ret).sort({"_id":-1}).toArray(function(err,arr){
				mongodb.close();
				if (err) {
					return callback(err);
				};
        var data = {data:arr};
			  callback(JSON.stringify(data)); //成功返回 json
			});
		});
	});
};

//修改数据
Post.update = function(obj,callback){
  mongodb.open(function(err,db){
    if (err) {
      return callback(err);
    }

    db.collection('posts',function(err,collection){
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({value:obj.preValue},{
        value:obj.value,
        time:time()
      });
      callback(null);
    });
  });
};


//删除数据
Post.remove = function(obj,callback){
  mongodb.open(function(err,db){
    if (err) {
      return callback(err);
    }
    db.collection('posts',function(err,collection){
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //collection.remove({value:obj.value},1);
      //callback(null);
      collection.remove({
        value:obj.value
      },function(err){
        mongodb.close();
        if (err) {
          return callback(err)
        }
        callback(null);
      },1);
    });
  });
};

//时间处理
function time(){
  var date = new Date()
  		,year = date.getFullYear()
  		,month = date.getMonth()+1
  		,day =  date.getDate()
  		,minute = date.getHours() + ':' + (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());

	//时间处理
	return year+'-'+month+'-'+day+' '+minute;
};

module.exports = Post;
