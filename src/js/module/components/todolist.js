/**
 * React-Node-todo-list组件
 * @authors Binson (yongbingzhang@Ctrip.com)
 * @date    2016-04-06 20:03:11
 * @version v1.0
 */

class AddBtn extends React.Component {
  handlerAddData(e){
    var value = this.refs.addValue.value;
    if (!value) {
      e.preventDefault();
      alert('请输入值！')
      return;
    }
    //this.props.handlerAddData(value);
    //this.refs.addValue.value='';
  }
  render(){
    return (
      <div className="row">
        <form method="post" action="/add">
           <div className="input-group">
             <input type="text" name="post" ref="addValue" className="form-control" placeholder="请输入内容…"/>
             <span className="input-group-btn">
               <button className="btn btn-success" type="submit" data-type="add_btn" onClick={this.handlerAddData.bind(this)}> 新 增 </button>
             </span>
           </div>
         </form>
       </div>
    );
  }
}

class AddRow extends React.Component{
  constructor(props){
    super(props);
    this.state={data: this.props.data};
  }
  handleOnChange(e){
    var target = e.target,data,preValue,id,
        value = target.value;
    id = this.state.data._id;
    preValue = this.state.data.value;
    data = {
      id:id,
      value:value,
      preValue:preValue
    };
    $.post('/update',data,function(data){
      if (data.success) {
        location.href = location.href;
      }
    });
  }
  handleUpdate(e){
    var target = e.target,
        ref = this.refs.rowInput;
    ref.removeAttribute('disabled');
  }
  render(){
    var data = this.state.data;
    return (
      <div className="row">
        <div className="input-group">
          <input type="text" className="form-control" ref="rowInput" defaultValue={data.value} onBlur={this.handleOnChange.bind(this)} disabled/>
          <span className="input-group-btn">
            <button className="btn btn-info" type="button" data-type="update_btn" data-id={data._id} onClick={this.handleUpdate.bind(this)}> 修改 </button>
            <button className="btn btn-danger" type="button" data-type="del_btn" data-id={data._id}> 删 除 </button>
          </span>
        </div>
      </div>
    );
  }
}

class ToDoList extends React.Component{
    constructor(props){
      super(props);
      const data = this.props.data ||{};
      this.state = {data:JSON.parse(data).data};
    }
    componentDidMount(){
      const mainBox = $('#main');
      mainBox.on('click',function(e){
        var target = e.target,
            targetType = target.getAttribute('data-type'),
            value = $(target).parent().prev().val();

        //删除文档
        if(targetType == 'del_btn'){
          var id = target.getAttribute('data-id');
          $.get('/del',{id:id,value:value},function(json){
            if(json.success){
                location.href = location.href;
            }
          });
        }

      });
    }
    render(){
      var list=[];
      this.state.data.forEach(function(item){
        list.push(<AddRow data={item} key={item._id}/>)
      });
      return (
        <div>
          <AddBtn />
          {list}
        </div>
      )
  }
}

export default ToDoList;
