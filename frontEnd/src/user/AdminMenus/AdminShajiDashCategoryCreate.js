import React,{useState} from 'react'
import { createCategory } from './help/AddCategory'
import MenuBase from './MenuBase'
import { Link, Redirect } from 'react-router-dom';

import "./MenuBase.css"
const AdminShajiDashCategoryCreate = () => {
    const [values, setvalues] = useState({
        createdCategory:"",
        name:"Category",
        error:"",
        success:false
    })
    const {createdCategory,name,error,success} = values;
    const successMessage = () => (
        <div
          className="alert alert-success mt-3"
          style={{ display: createdCategory ? "" : "none" }}
        >
          <h4>{createdCategory} created successfully</h4>
        </div>
      );
      const errorMessage = () => (
        <div
          className="alert alert-danger mt-3"
          style={{ display: error ? "" : "none" }}
        >
          <h4>{createdCategory} can't create category</h4>
        </div>
      );

      const onHandle = name => event => {
            setvalues({...values,[name]:event.target.value})
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
      const onSubmit = event => {
    event.preventDefault();

    createCategory({ name }).then(data => {
        console.log("<>>>",data.category);
        if (data.category.error) {
            setvalues({...values,error:true})
        } else {
            setvalues({...values,createdCategory:true,success:true})
        }
      });
    };
    
    return (
        <MenuBase>
<div className="container">
    {successMessage()}
    {errorMessage()}
<form action="" className="">

<div class="form-group">
<label >Create {name}</label>
<input onChange={onHandle("name")} type="text" name="name" class="form-control" id="exampleFormControlInput1" placeholder="Eg Indian,Chinese"/>
</div>
<button onClick={onSubmit} className="btn btn-info btn-block rounded cen">
Create
</button>
</form>
<br/>
{goMenu()}

</div>
           
        </MenuBase>
    )
}



export default AdminShajiDashCategoryCreate;