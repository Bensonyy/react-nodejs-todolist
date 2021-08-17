
### 此应用的背景是：
应Leader的意思是，组内大部分后端开发人员对前端的认知还停留在document.getElementById，document.getElementByNamet等这些，让他们知道前端可以做更多，用nodejs写一个CURD让他们看看。

我索性把近期最火的技术通过这个应用跑一遍，实践做一个 todo-list，实现 CURD 操作；


## 以下是分享的关键点：
### 1.  技术架构：
    reactjs + es6 + nodejs + express + mongodb, 实现 CURD 操作；
    打包工具：gulp + webpack


### 2.  前端：
    采用 reactjs + es6 语法；
    reactjs: 性能瓶颈在DOM的操作上，reactjs在虚拟的 DOM 世界里进行交互，性能极高。

  #### 1)  组件结构（包含3个组件）:
      ToDoList                   父组件：整体数据的呈现
        --AddBtn                 子组件：页面中新增操作部分
        --AddRow                 子组件：列表呈现部分

     思路：组件在 create、update、delete 操作时通过 数据回流 更新父组件的 this.state 状态，
          状态的变化会引起组件的重新渲染呈现，此期间无需刷新页面。=>(利用差异检测，DOM Diff算法)


### 3.  后端：
    采用 nodejs + express + mongodb;
    数据的 CURD 操作;


    nodejs:  单线程 异步 事件驱动 非阻塞式 I/O 模型;


    express: express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架,提供了一系列强大特性帮助你创建各种 Web 应用:

             框架核心特性：
              1) 可以设置中间件来响应 http 请求;
              2) 定义了路由用于执行不同的 http 请求动作;
              3) 可以通过向模板传递参数来动态渲染 html 页面;


    mongodb: 是一个基于分布式文件存储的 NoSQL（非关系型数据库）的一种:

              1)  支持的数据结构非常松散，是类似 json 的 bjson 格式，因此可以存储比较复杂的数据类型;

              2)  没有关系型数据库中行和表的概念，不过有类似的文档和集合的概念;
                  文档是 MongoDB 最基本的单位，每个文档都会以唯一的 _id 标识，文档的属性为 key/value 的键值对形式;
                  文档内可以嵌套另一个文档，因此可以存储比较复杂的数据类型;
                  集合是许多文档的总和，一个数据库可以有多个集合，一个集合可以有多个文档。


#### 一次分享，一次经历，一次成长，就做个纪念吧。

#### Share date
##### 2016-04-15
