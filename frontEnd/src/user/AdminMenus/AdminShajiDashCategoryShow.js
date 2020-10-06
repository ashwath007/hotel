import React,{useEffect,useState} from 'react'
import MenuBase from './MenuBase'
import { getallCategory,deleteCategory } from './help/AddCategory'
import { Link } from 'react-router-dom';

export default function AdminShajiDashCategoryShow() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        getallCategory().then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
              setCategories(data);
            }
          });
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    const deleteThisCate = cateId => {
        deleteCategory(cateId).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            fetchCategories();
          }
        });
      };
      
    return (
        <MenuBase>
                    <div className="container">
                
                        {categories.map((cate,i)=>{
                            return(
<div className="card mb-4 shadow rounded" key={i}>
  <div className="card-body">   
    <h5 className="card-title">{cate.name}</h5>
  <Link to={`/admin/shaji/dashboard/category/edit/${cate._id}`}>
    <button className="btn btn-success rounded">Edit</button>

  </Link>

    <button onClick={()=>{deleteThisCate(cate._id)}} className="btn btn-danger rounded ml-4">Delete</button>



  </div>
</div>

                            )
                        })}
                    



 
                    </div>
        </MenuBase>
    )
}
