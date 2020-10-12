import React,{useEffect,useState} from 'react'
import {allFleet,deleteFleet} from "../fleethelp/fleetapi"
import { Link, Redirect } from 'react-router-dom';

export default function EditFleets() {
    const [fleets, setFleets] = useState([])
    const [redirect, setredirect] = useState(false)
    const onLoad = () => {
        allFleet().then(res =>{
            console.log(res[0])
            setFleets(res)

        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
     onLoad()
    }, [])
    const fleetsCard = () => {
        if(fleets){
            return (
                <div class="card">
      <h5 class="card-header">Featured</h5>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.{JSON.stringify(fleets)}</p>
        <a href="#" class="btn btn-primary">Save Edit</a>
      </div>
    </div>
            )
        }
        
    }
    const isRedirect = () => {
        if(redirect){
            return  <Redirect to="/admin/shaji/dashboard/menu"/>
        }
    }
    const deleteFleets = (fid) => {
        deleteFleet(fid).then((res)=>{
            console.log(res)
            if(res.error){
                console.log(res.error)
            }
            setredirect(true)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <div className="text-center mt-5">
            <h3>Edit Fleets</h3>
        {isRedirect()}
            </div>
            <div className="container mt-5">
                <div className="mt-5">
                    {Object.keys(fleets).map((F,I)=>{
                        return(
                            <div className="mb-4">
                                <div class="card">
      <h5 class="card-header">Name: {fleets[F].name}</h5>
      <div class="card-body">
        <h5 class="card-title">Phone: {fleets[F].phone}</h5>
        <h5 class="card-title">Password: {fleets[F].fid}</h5>

        <p class="card-text">Press edit if you have to edit the delivery account</p>
        <div className="row text-center" style={{backgroundColor:'#487EB0'}}>
            <div className="col-6">
            <a href={`/admin/shaji/dashboard/fleets/editfleets/${fleets[F]._id}`} class="btn btn-warning">Edit</a>

            </div>
            <div className="col-6">
                <button onClick={()=>{deleteFleets(fleets[F]._id)}} className="btn btn-info">
                                Delete
                </button>
                </div>
        </div>
      

      </div>
    </div>
                           
                                </div>
                         

                        )
                    })}
                {/* {fleetsCard()} */}

                </div>
                <div className="text-center mt-5 mb-5">
                    <Link to="/admin/shaji/dashboard/menu">
                        <button className="btn btn-info rounded">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
