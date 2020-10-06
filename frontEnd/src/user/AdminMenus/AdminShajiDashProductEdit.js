import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { getProducts,deleteaProduct } from './help/AddCategory';
import MenuBase from './MenuBase';

const  AdminShajiDashProductEdit = () => {
    const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  const deleteAProduct = prodId => {
    deleteaProduct(prodId).then(data=>{
        if(data.error){
        setError(data.error);

        }
        else{
            loadAllProduct();
        }
    })

  }
  useEffect(() => {
    loadAllProduct();
  }, []);
    return (
        <MenuBase>
            <div className="container">
                
            {products.map((cate,i)=>{
                            return(
<div className="card mb-4 shadow rounded" key={i}>
  <div className="card-body">   
    <h5 className="card-title">{cate.name}</h5>
  <Link to={`/admin/shaji/dashboard/category/edit/${cate._id}`}>
    <button className="btn btn-success rounded">Edit</button>

  </Link>

    <button onClick={()=>{deleteAProduct(cate._id)}} className="btn btn-danger rounded ml-4">Delete</button>



  </div>
</div>

                            )
                        })}
                    



 


            </div>
        </MenuBase>
    )
}


export default AdminShajiDashProductEdit;