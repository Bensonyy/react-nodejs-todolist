/**
 * React-Node-todo-list组件
 * @authors Binson (yongbingzhang@Ctrip.com)
 * @date    2016-04-06 20:03:11
 * @version v1.0
 */

const express = require('express'),
      Post = require('../models/post');

/* GET home page. */

const router = (app) => {

    //首页获取数据列表
    app.get('/', (req, res) => {
      Post.list(null,(json) => {
        res.render('index', {
                    title: 'nodejs-reactjs 应用（todo-list），CURD 操作：',
                    list: json
                  },function(err,html){
                    if (err) {
                      return;
                    }
                    res.send(html);
                  });
      });
    });

    //新增一行数据
    app.post('/add',(req,res)=>{
      const post = new Post(req.body.value);
      post.save((err,data)=>{
        if (err) {
          console.log(err);
          return ;
        };
        res.json({"data":data});
      });
    });

  //更新一行数据
  app.post('/update',(req,res)=>{
    var obj = {
      id:req.body.id,
      value:req.body.value,
      preValue:req.body.preValue
    };
    Post.update(obj,(err,data)=>{
      if (err) {
        console.log(err);
        return ;
      };
      res.json({"data":data});
    });
  });

  //删除一行数据
  app.get('/del',(req,res)=>{
    var obj = {
      id:req.query.id,
      value:req.query.value
    };
    Post.remove(obj,(err)=>{
      if (err) {
        console.log(err);
        return ;
      };
      res.json({"success":1});
    });
  });

};

module.exports = router;
