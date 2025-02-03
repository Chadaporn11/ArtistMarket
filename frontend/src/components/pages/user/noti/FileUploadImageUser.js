import React from 'react'
import Resize from 'react-image-file-resizer';
import { useSelector } from "react-redux";
import axios from "axios";

//antd
import { Avatar, Badge, Spin, Image } from 'antd';


const FileUploadImageUser = ({ values, setValues, loading, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    // console.log('file:', values);
    const handleChangeFile = (e) => {
        const files = e.target.files;
        if (files) {
            setLoading(true);
            let allfileUpload = values.images; //[]

            for (let i = 0; i < files.length; i++) {
                //console.log(files[i]);
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios.post(process.env.APIURL+"/api/images-user",
                            {
                                image: uri,
                            },
                            {
                                headers: {
                                    authtoken: user.token,
                                },

                            }).then((res) => {
                                setLoading(false);
                                allfileUpload.push(res.data);
                                // console.log('allfileUpload in data:', allfileUpload);
                                setValues({ ...values, images: allfileUpload });
                            }).catch((err) => {
                                setLoading(false);
                                console.log(err);
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleRemove = (public_id) => {
        // console.log(public_id)
        setLoading(true);
        //#1
        //const img = values.images
        //#2
        const { images } = values;
        axios.post(process.env.APIURL+"/api/removeimages-user",
            {
                public_id
            }, {
            headers: {
                authtoken: user.token
            }
        }).then((res) => {
            setLoading(false);
            let filterImages = images.filter((item) => {
                return item.public_id !== public_id
            })
            setValues({ ...values, images: filterImages });

        }).catch((err) => {
            setLoading(false);
            console.log(err);
        });

    }

    return (
        <>
            <br />
            {
                values.images && values.images.map((item) =>
                    <div className="flex justify-center">

                        <Image
                            width='70%'
                            className="object-cover rounded-xl"
                            src={item.url}
                        >

                        </Image >
                        <Badge
                            className='relative flex justify-end w-auto h-auto z-40'
                            onClick={() => handleRemove(item.public_id)}
                        >
                            <div className='flex justify-center absolute -top-3 -right-2 p-1 rounded-full bg-[#f87171] opacity-90 shadow-md w-[30px] h-[30px] hover:-translate-y-2'>
                                {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                <i className="fa-solid fa-circle-xmark text-white text-md  pt-1"></i>
                            </div>
                        </Badge>

                    </div >
                )
            }
            <div className='flex flex-row justify-center'>
                {loading && (<Spin className='mr-3' />)}
                <p className='mb-2'>Upload Images</p>
            </div>
            <div className='flex flex-row justify-center'>
                <div className='bg-[#f9fafb] rounded-md border border-gray-300 w-[120px] h-[30px]'>
                    <label className='text-center ml-3'>
                        Choose File...
                        <input
                            onChange={handleChangeFile}
                            type="file"
                            hidden
                            multiple
                            accept="image/png, image/jpeg"
                            name="file"
                        />
                    </label>
                </div>
            </div>

            <br />
        </>
    )
}

export default FileUploadImageUser