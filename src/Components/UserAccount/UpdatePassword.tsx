import { useState } from 'react'
import { Link } from 'react-router-dom'
import passImg from '../Images/Key.svg'
import HenceForthApi from '../Utils/HenceForthApi'


const UpdatePassword = () => {
    const [toggle, setToggle] = useState<boolean>(true)

    const handleToggle = () => {
        setToggle(!toggle)

    }

    const [pass, setPass] = useState({
        currentPass: "",
        newPass: "",
        confirmPass: ""
    })

    const updatePass = (e: any) => {
        setPass({
            ...pass,
            [e.target.name]: e.target.value
        })
    }

    console.log(pass.currentPass);
    console.log(pass.newPass);
    console.log(pass.confirmPass);


    const changePass = async () => {
        let res = (await HenceForthApi.Auth.changePassword({
            currentPassword: "",
            newPassword: ""
        }))
    }
    return (
        <>
            <div className="container my-5 min-frame-height overflow-scroll" style={{ height: "90vh" }}>
                <nav aria-label="breadcrumb mb-4">
                    <ol className="breadcrumb pl-0">
                        <li className="breadcrumb-item">
                            <Link to="/account" className='text-decoration-none text-black'>Account</Link>
                        </li>
                        <li aria-current="page" className="breadcrumb-item active d-flex align-items-center justify-content-center">Update Password</li>
                    </ol>
                </nav>
                <h1 className="heading-large mt-0 mb-5 text-black line-height-space">Update Password</h1>
                <div className="row justify-content-md-between">
                    <div className="col-md-7 col-lg-7">
                        <div className="border px-4 py-3 mb-4 ng-star-inserted">
                            <div className="d-flex justify-content-between">
                                <p className="fw-600 text-black mt-0">Password</p>
                                {toggle ? < button className='border-0 btn' onClick={handleToggle} >Update</button>
                                    : <button className='border-0 btn' onClick={handleToggle}>Cancel</button>}
                            </div>
                            {!toggle && <div className="">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="firstname" className="fw-600">Current password</label>
                                        <input type="password" placeholder="Enter current password"
                                            value={pass.currentPass} name="currentpassword"
                                            onClick={updatePass}
                                            className="form-control ng-untouched ng-pristine ng-invalid" />
                                        <div className="invalid-feedback d-block">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="firstname" className="fw-600">New password</label>
                                        <input type="password"
                                            value={pass.newPass} name="newpassword"
                                            onClick={updatePass} placeholder="Enter new password" className="form-control ng-untouched ng-pristine ng-invalid" />
                                        <div className="invalid-feedback d-block">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="firstname" className="fw-600">Confirm password</label>
                                        <input type="password"
                                            value={pass.confirmPass} name="confirmpassword"
                                            onClick={updatePass}
                                            placeholder="Enter confirm password" className="form-control ng-untouched ng-pristine ng-invalid" />
                                        <div className="invalid-feedback d-block">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary px-3 py-2 mt-4 position-relative d-flex align-items-center justify-content-center"> Update password </button>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <div className="border px-4 py-4 mb-4">
                            <img src={passImg} height="32px" className="mb-4" />
                            <h6 className="font-medium-bold text-black">Keeping your account secure</h6>
                            <p >We regularly review accounts to make sure they’re as secure as possible. We’ll also let you know if there’s more we can do to increase the security of your account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdatePassword