import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { getaCategory, updateCategory } from './help/AddCategory';
import MenuBase from './MenuBase'

export default function AdminShajiDashCategoryEdit({ match }) {
    const [values, setvalues] = useState({
        updatedCategoryStatus:"",
        name:"Category",
        error:"",
        success:false,
        cateID:""
    })
    const {updatedCategoryStatus,name,error,success,cateID} = values;
    const onHandle = name => event => {
        setvalues({...values,[name]:event.target.value})
  }
  useEffect(() => {
    onLoad(match.params.cateId);
  }, []);
const onLoad = cateId => {
    getaCategory(cateId).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          
            console.log("++",data);
            setvalues({...values,name:data.name,cateID:data._id,updatedCategoryStatus:data})
        }
      });

}
const goMenu = () => {
    if(success){
      
      return (
        <div className="container">
         <Link to="/admin/shaji/dashboard/menu">
         <button className="btn btn-warning btn-block rounded">
            Menu
          </button></Link> 
        </div>
      )
        
      
    }
}
const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      <h4>{success} created successfully</h4>
    </div>
  );
    const onUpdate = event => {
        event.preventDefault();
        updateCategory(match.params.cateId,values).then(data => {
            if(data.error){
                setvalues({ ...values, error: data.error ,success:false});
                console.log(data.error);
            }
            else{
                console.log(">>>",data);

                setvalues({...values,updatedCategoryStatus:data,success:true})
            }
        })
        
        };
        
    return (
            <MenuBase>
                <div className="container">
                    {successMessage()}
                
                <form action="" className="">

<div class="form-group">
    <label >Edit Category {name}</label>
<input onChange={onHandle("name")} type="text" name="name" value={name} class="form-control" id="exampleFormControlInput1" placeholder="Eg Indian,Chinese"/>
</div>
<button onClick={onUpdate} className="btn btn-info btn-block rounded cen">
Create
</button>
</form>
<br/>
{goMenu()}
                </div>
                
            </MenuBase>
    )
}
