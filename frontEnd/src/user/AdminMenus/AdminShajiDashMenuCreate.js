import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { createaProduct, getallCategory } from './help/AddCategory'
import MenuBase from './MenuBase'


const AdminShajiDashMenuCreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

  const preload = () => {
    getallCategory().then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct( formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const goMenu = () => {
    if(createdProduct){
      
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
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post food pic</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Dish Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="text"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
        {/* <select 
         onChange={handleChange("stock")}
         type="text"
         className="form-control"
         placeholder="Stock"
         value={stock}
        >
      <option>Veg</option>
       <option>Non-Veg</option>
           </select> */}
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <MenuBase>
      <div className="container">
        {goMenu()}
        {successMessage()}
      {createProductForm()}
        
      </div>
    </MenuBase>
  );
};

//     const [values, setValues] = useState({
//         name:"",
//         formData:"",
//         price:"",
//         type:"",
//         category:"",
//         loading:false,
//         error:"",
//         categories:[],
//         success:false,
//         createdProduct:false
//     })

//     const {
//       name,
//       description,
//       price,
//       stock,
//       type,
//       categories,
//       category,
//       loading,
//       error,
//       success,
//       createdProduct,
//       getaRedirect,
//       formData
//     } = values;
//     const handleChange = name => event => {
//       const value = name === "photo" ? event.target.files[0] : event.target.value;
//       formData.set(name, value);
//       setValues({ ...values, [name]: value });
//     };
//     const createProductForm = () => (
//       <form>
//         <span>Post photo</span>
//         <div className="form-group">
//           <label className="btn btn-block btn-success">
//             <input
//               onChange={handleChange("photo")}
//               type="file"
//               name="photo"
//               accept="image"
//               placeholder="choose a file"
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <input
//             onChange={handleChange("name")}
//             name="photo"
//             className="form-control"
//             placeholder="Name"
//             value={name}
//           />
//         </div>
//         <div className="form-group">
//           <textarea
//             onChange={handleChange("description")}
//             name="photo"
//             className="form-control"
//             placeholder="Description"
//             value={description}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             onChange={handleChange("price")}
//             type="number"
//             className="form-control"
//             placeholder="Price"
//             value={price}
//           />
//         </div>
//         <div className="form-group">
//           <select
//             onChange={handleChange("category")}
//             className="form-control"
//             placeholder="Category"
//           >
//             <option>Select</option>
//             {categories &&
//               categories.map((cate, index) => (
//                 <option key={index} value={cate._id}>
//                   {cate.name}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <input
//             onChange={handleChange("stock")}
//             type="number"
//             className="form-control"
//             placeholder="Stock"
//             value={stock}
//           />
//         </div>
  
//         <button
//           type="submit"
//           onClick={onSubmit}
//           className="btn btn-outline-success mb-3"
//         >
//           Create Product
//         </button>
//       </form>
//     );
//     const successMessage = () => (
//         <div
//           className="alert alert-success mt-3"
//           style={{ display: createdProduct ? "" : "none" }}
//         >
//           <h4>{createdProduct} created successfully</h4>
//         </div>
//       );

//       const preloadCategories = () => {
//         getallCategory().then(data => {
//           if (data.error) {
//             setValues({ ...values, error: data.error });
//           } else {
//             setValues({
//               categories: data,
//               formData: new FormData() 
//             });
//           }
//         });
//       };

//       useEffect(() => {
//         preloadCategories()
//       }, [])


//       const onSubmit = event => {
//         event.preventDefault();
//         setValues({ ...values, error: "", loading: true });
//         createaProduct( formData).then(data => {
//           if (data.error) {
//             setValues({ ...values, error: data.error });
//           } else {
//             console.log(data);
//             setValues({
//               ...values,
//               name: "",
//               description: "",
//               price: "",
//               photo: "",
//               stock: "",
//               loading: false,
//               createdProduct: data.name
//             });
//           }
//         });
//       };



//     return (
//             <MenuBase>
//                 <div className="container">
//                 <form>
//                 <div class="form-group">
//                 <label>Name</label>
//                 <input type="text" onChange={handleChange("name")} className="form-control" id="exampleFormControlInput1" placeholder="Food name"/>
//                     </div>
//                     <span>Food pic</span>
//       <div className="form-group">
//         <label className="btn btn-block btn-success">
//           <input
//             onChange={handleChange("photo")}
//             type="file"
//             name="photo"
//             accept="image"
//             placeholder="choose a file"
//           />
//         </label>
//       </div>

//       <div class="form-group">
//     <label>Price in (INR)</label>
//     <input value={price} onChange={handleChange("price")} placeholder="Enter price per Item"  type="number" class="form-control"/>
//   </div>
//   <div class="form-group">
//     <label for="exampleFormControlSelect1">Type</label>
//     <select value={type} onChange={handleChange("type")} className="form-control" id="exampleFormControlSelect1">
//       <option>Veg</option>
//       <option>Non-Veg</option>
      
//     </select>
//   </div>

//   <div className="form-group">
//         <select
//           onChange={handleChange("category")}
//           className="form-control"
//           placeholder="Category"
//           value={category}
//         >
//           <option>Category</option>
//           {categories &&
//             categories.map((cate, index) => (
//               <option key={index} value={cate._id}>
//                 {cate.name}
//               </option>
//             ))}
//         </select>
//       </div>
//       <br/>
//       <button onClick={onSubmit} className="btn btn-warning btn-block rounded">
//         Create Menu 
//       </button>
  
//                 </form>
//                 </div>
                
//             </MenuBase>
//     )
// }



export default AdminShajiDashMenuCreate;