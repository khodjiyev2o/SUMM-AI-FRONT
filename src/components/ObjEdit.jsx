import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { RingLoader } from 'react-spinners';
const cookies = new Cookies();
const ObjEdit = () => {
    const { objid } = useParams();
    const token = cookies.get("TOKEN");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch("https://staging.backend.mintapp.cl/translation-objects/" + objid,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },
          }).then((res) => {
            return res.json();
        }).then((resp) => { 
            setLoading(false);
            idchange(resp.id);
            InputTextchange(resp.InputText);
            OutputTextchange(resp.OutputText);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    const [id, idchange] = useState("");
    const [InputText,InputTextchange] = useState("");
    const [OutputText,OutputTextchange] = useState("");
    const [validation,valchange] = useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={InputText,OutputText};
      
      fetch("https://staging.backend.mintapp.cl/translation-objects/" +`${objid}/`,{
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        body:JSON.stringify(empdata)
      }).then((res)=>{
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>
            {loading && (
                        <div className="loader" style={{position: 'relative',position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',}}>
                            <RingLoader color={'#123abc'} loading={loading} />
                        </div>
                        ) }
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Employee Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>InputText</label>
                                        <input required value={InputText} onMouseDown={e=>valchange(true)} onChange={e=>InputTextchange(e.target.value)} className="form-control"></input>
                                    {InputText.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>OutputText</label>
                                        <input value={OutputText} onChange={e=>OutputTextchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success m-2" type="submit ">Save</button>
                                       <Link to="/" className="btn btn-danger">Back</Link>
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
 
export default ObjEdit;