import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { RingLoader } from 'react-spinners';
const cookies = new Cookies();

const TransListing = () => {
    const token = cookies.get("TOKEN");
    const [empdata, empdatachange] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/translation-objects/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/translation-objects/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://staging.backend.mintapp.cl/translation-objects/" + id, {
                method: "DELETE", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                  },
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
            
        }
    }




    useEffect(() => {
        setLoading(true);
        fetch("https://staging.backend.mintapp.cl/translation-objects", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          }).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => setLoading(false));
    }, [])
    return (
        <div className="container">

            <div className="card">
                <div className="card-title text-center mt-5">
                    <h2>Translation Objects Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn d-flex flex-row-reverse">
                        <Link to="/create" className="btn btn-success p-2 m-2">New Object</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-primary text-white">
                            <tr>
                                <td>ID</td>
                                <td>InputText</td>
                                <td>OutputText</td>
                                <td>FromUser</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                        {loading && (
                        <div className="loader" style={{position: 'relative',position: 'absolute',top: '150%',left: '50%',transform: 'translate(-50%, -50%)',}}>
                            <RingLoader color={'#123abc'} loading={loading} />
                        </div>
                        ) }
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.InputText}</td>
                                        <td>{item.OutputText}</td>
                                        <td>{item.FromUser}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success m-1">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary m-1">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TransListing;
