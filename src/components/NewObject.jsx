import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const NewObject = () => {
    const token = cookies.get("TOKEN");
    const[InputText,InputTextchange]=useState("");
    const[OutputText,OutputTextchange]=useState("");
    const[validation,valchange]=useState(false);
    const [formError,setformError]= useState("");
    const navigate=useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        if (!InputText || !OutputText) {
            setformError('Please fill the form !');
          } else {
        const objdata={InputText,OutputText};
        fetch("https://staging.backend.mintapp.cl/translation-objects/",{
            method:"POST",
            headers:{
                "content-type":"application/json",
                'Authorization': `Token ${token}`,
            },
            body:JSON.stringify(objdata)
        }).then((res)=>{
            navigate('/');
        }).catch((err)=>{
            console.log(err.message)
        })
        }
    }
    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Translation Object Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>InputText</label>
                                            <input required value={InputText} onMouseDown={e=>valchange(true)} onChange={e=>InputTextchange(e.target.value)} className="form-control"></input>
                                            {!InputText && <p className="text-warning">{formError}</p>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>OutputText</label>
                                            <input value={OutputText} onMouseDown={e=>valchange(true)} onChange={e=>OutputTextchange(e.target.value)} className="form-control"></input>
                                            {!OutputText && <p className="text-warning">{formError}</p>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12 ">
                                        <div className="form-group">
                                           <button className="btn btn-success m-2" type="submit">Save</button>
                                           <Link to="/" className="btn btn-danger m-2">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default NewObject;