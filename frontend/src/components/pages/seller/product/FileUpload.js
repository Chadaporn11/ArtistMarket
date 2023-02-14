import React from 'react'
import Resize from 'react-image-file-resizer';
import { useSelector } from "react-redux";
import axios from "axios";

//antd
import { Avatar, Badge, Space } from 'antd';


const FileUpload = ({ values, setValues, loading, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    console.log('file:', values);
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
                        axios.post("http://localhost:4200/api/images-seller",
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
                                console.log('allfileUpload in data:', allfileUpload);
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
        console.log(public_id)
        setLoading(true);
        //#1
        //const img = values.images
        //#2
        const { images } = values;
        axios.post("http://localhost:4200/api/removeimages-seller",
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
                    <span className="avatar-item">
                        <Badge
                            onClick={() => handleRemove(item.public_id)}
                            style={{ cursor: 'pointer' }}
                            count="x">
                            <Avatar
                                className='m-3'
                                src={item.url}
                                shape="square"
                                size={250} />
                        </Badge>
                    </span>
                )
            }
            <p className='mb-1'>Product Images</p>
            <div className='bg-[#f9fafb] rounded-md border border-gray-300 w-[120px] h-[30px]'>
                <label className='text-center ml-3'>
                    Choose File...
                    <input
                        onChange={handleChangeFile}
                        type="file"
                        hidden
                        multiple
                        accept='images/*'
                        name="file"
                    />
                </label>
            </div>
            <br />
        </>
    )
}

export default FileUpload