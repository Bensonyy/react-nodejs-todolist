/**
 * React-Node-todo-list组件
 * @authors Binson (yongbingzhang@Ctrip.com)
 * @date    2016-04-06 20:03:11
 * @version v1.0
 */

import ToDoList from './todolist';

const data = document.getElementById('list_data').value;

ReactDOM.render(
  <ToDoList data={data}/>,
  document.getElementById('main')
);
