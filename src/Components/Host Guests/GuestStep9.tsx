import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HenceForthApi from "../Utils/HenceForthApi";
import selfieImg from '../Images/taking_selfie.svg'
import backArrow from '../Images/chevron-left-primary.svg'
import Spinner from "../Spinner/Spinner";

type props = {
    steps: any,
    setSteps: any
    value: number
}

export default function GuestStep9(props: props) {
    const { steps, setSteps, value } = props

    HenceForthApi.setToken(localStorage.getItem("token"))
    const match = useMatch('/create-guest/step9/:id')
    const navigate = useNavigate()

    const [userImg, setUserImg] = useState<string>('')
    const [loader, setLoader] = useState<boolean>(false)


    const list = async () => {
        try {
            let res = (await HenceForthApi.Auth.Listid(match?.params.id)).data
            setSteps(res?.attributes?.publicData?.stepsCompleted)
            setUserImg(res?.attributes?.publicData?.host_image)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        list()
        // eslint-disable-next-line 
    }, [])

    const handleSubmit = async (e: any) => {
        let file = e.target.files[0]
        try {
            let res = (await HenceForthApi.Auth.Uploadimage("file", file))
            await uploadImg(res.filename)
            await list()
        } catch (error) {
            console.log(error);

        }

    }

    const uploadImg = async (url: string) => {
        const list = {
            publicData: {
                image: url,
            }
        }
        try {
            let res = (await HenceForthApi.Auth.updateUserProfile(list))
        } catch (error) {
            console.log(error);

        }
    }


    const nextPage = async (navigation: string) => {
        const list = {
            id: match?.params?.id,
            publicData: {
                host_image: userImg,
                stepsCompleted: [...steps, 9]
            }
        }
        if (userImg) {
            setLoader(true)
            let res = await HenceForthApi.Auth.Updatedlisting(list)
            setLoader(false)
            {
                navigation === 'Next' ?
                    navigate(`/create-guest/checkin-and-checkout/${match?.params.id}`)
                    :
                    navigate(`/create-guest/last-step/${match?.params.id}`)
            }
        } else {
            toast.warn('upload Profile Image')
        }
    }

    useEffect(() => {
        { value && nextPage('Last') }
    }, [value])



    return (
        <>
            <div >
                <ToastContainer />
                <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "60%" }}>
                    </div>
                </div>
                <div className="row mx-0 h-100">
                    <div className="col-md-6 py-5 px-md-0 frame-height overflow-y-auto">
                        <div className="col-lg-8 col-md-11 px-md-0 mx-auto">
                            <h3 className="heading-big pb-4">Profile picture</h3>
                            {loader && <p>Feching Image....</p>}
                            <div >

                                <div className="d-flex mb-3 align-items-start">
                                    <div className="h-101 mr-4 position-relative">

                                        <img className="rounded-circle img-fluid profile-img"
                                            src={`${HenceForthApi.API_FILE_ROOT_SMALL}${userImg}`}
                                        />
                                    </div>

                                    <div className="d-flex flex-column align-items-start">
                                        <p className="mt-1">Add your photo so other users can see who they are communicating with</p>
                                        <label htmlFor="file">
                                            {/* <i className="bi bi-image-fill ms-2 h3"> */}
                                            <span className="h3 ms-1 btn-primary p-2 rounded-2">Change Photo</span>
                                            {/* </i> */}
                                        </label>

                                        <input type="file" id="file" onChange={handleSubmit} className="d-none" />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between border-top mt-5">
                                    <button type="button" className="btn btn-transparent font-regular my-3 px-0" >
                                        <img src={backArrow} className="pr-1" /> Back </button>
                                    <button type="button" className="btn btn-primary my-3 px-3 position-relative d-flex align-items-center justify-content-center"
                                        onClick={() => nextPage('Next')}
                                        disabled={loader}> {!loader ? "Next" : <Spinner />} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center px-md-0 d-none d-md-block">
                        <div className="py-5 h-100 d-flex align-items-center bg-light justify-content-center">
                            <img src={selfieImg} alt="" width="250px" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}