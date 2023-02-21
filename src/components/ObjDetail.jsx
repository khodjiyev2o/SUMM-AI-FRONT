import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ObjDetail = () => {
    const { objid } = useParams();
    const [objData, objDataChange] = useState({});
    const token = cookies.get("TOKEN");
    useEffect(() => {
        fetch("https://staging.backend.mintapp.cl/translation-objects/" + objid, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },}).then((res) => {
            return res.json();
        }).then((resp) => {
            objDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Translation Object Detail</h2>
                </div>
                <div className="card-body"></div>

                {objData &&
                    <div className="align-items-center justify-content-center">
                        <h2>The Translation object  is created by: <b>{objData.FromUser}</b></h2>
                        <h5>InputText is : {objData.InputText}</h5>
                        <h5>OutputText is : {objData.OutputText}</h5>
                        <Link className="btn btn-danger m-1" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
        </div>
    );
}

export default ObjDetail;