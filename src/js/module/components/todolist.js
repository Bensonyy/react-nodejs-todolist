/**
 * React-Node-todo-list组件
 * @authors Binson (yongbingzhang@Ctrip.com)
 * @date    2016-04-06 20:03:11
 * @version v1.0
 */

class AddBtn extends React.Component {
  handlerAddData(e){
    let value = this.refs.addValue.value.trim();
    if (!value) {
      alert('请输入值！')
      return;
    }
    $.post('/add',{value:value},function(data){
      if (data) {
        this.props.onAddData(data);
        this.refs.addValue.value='';
      }
    }.bind(this));
    e.preventDefault();
  }
  render(){
    return (
      <div className="row">
         <div className="input-group">
           <input type="text" name="post" ref="addValue" className="form-control" placeholder="请输入内容…"/>
           <span className="input-group-btn">
             <button className="btn btn-success" type="submit" data-type="add_btn" onClick={this.handlerAddData.bind(this)}> 新 增 </button>
           </span>
         </div>
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
    let target = e.target,data,preValue,id,
        ref = this.refs.rowInput,
        value = target.value;
    id = this.state.data._id;
    preValue = this.state.data.value;
    data = {
      id:id,
      value:value,
      preValue:preValue
    };
    $.post('/update',data,function(data){
      if (data) {
        this.props.onAddRow(data);
        ref.setAttribute('disabled',true);
      }
    }.bind(this));
    e.preventDefault();
  }
  handlerUpdate(e){
    let target = e.target,
        ref = this.refs.rowInput;
    ref.removeAttribute('disabled');
  }
  handlerDel(e){
    let target = e.target,
        id = target.getAttribute('data-id'),
        value = this.refs.rowInput.value;
    $.get('/del',{id:id,value:value},function(json){
      if(json.success){
        this.props.onAddRow(null,id);
      }
    }.bind(this));
  }
  render(){
    let data = this.state.data;
    return (
      <div className="row">
        <div className="input-group">
          <input type="text" className="form-control" ref="rowInput" defaultValue={data.value} onBlur={this.handleOnChange.bind(this)} disabled/>
          <span className="input-group-btn">
            <button className="btn btn-info" type="button" data-type="update_btn" data-id={data._id} onClick={this.handlerUpdate.bind(this)}> 修改 </button>
            <button className="btn btn-danger" type="button" data-type="del_btn" data-id={data._id} onClick={this.handlerDel.bind(this)}> 删 除 </button>
          </span>
        </div>
      </div>
    );
  }
}

class ToDoList extends React.Component{
    constructor(props){
      super(props);
      const data = this.props.data || [];
      this.state = {data:JSON.parse(data).data};
    }
    handlerData(data){
      const newData = this.state.data.concat(data.data);
      this.setState({data:newData});
    }
    handlerRowData(data,id){
      let newArr = this.state.data;

      if (data && !id) {
        let _data = data.data[0],
            id = _data._id,
            index = this.indexOfValue(id);
        newArr[index].value = _data.value;
      }

      if (id) {
        let index = this.indexOfValue(id);
        newArr.splice(index,1);
      }

      this.setState({data:newArr});
    }
    indexOfValue(id){
      let index = -1, data = this.state.data;
      data.forEach(function(item,i){
        if (item._id === id) {
          index = i;
        }
      });
      return index;
    }
    render(){
      let list=[];
      this.state.data.forEach(function(item){
        list.push(<AddRow data={item} key={item._id} onAddRow = {this.handlerRowData.bind(this)}/>)
      }.bind(this));
      return (
        <div>
          <AddBtn onAddData = {this.handlerData.bind(this)}/>
          {list}
        </div>
      )
  }
}

export default ToDoList;
