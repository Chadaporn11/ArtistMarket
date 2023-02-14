import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
//antd
import { Input, Button, Card, List } from 'antd';
import VirtualList from 'rc-virtual-list';

//function
import {
    createCategory,
    listCategory,
    deleteCategory,
    editCategory,
} from '../../functions/category';

//menu
import MenubarAdmin from '../../layouts/MenubarAdmin';
import Menubar from '../../layouts/Menubar';

const EditType = {
    id: "",
    name: "",
}

const Category = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState({
        name: '',
    })
    const [editvalues, setEditValues] = useState(EditType)
    const [category, setCategory] = useState([]);
    const [statusEdit, setStatusEdit] = useState(false);

    console.log('editvalues', editvalues)
    const handleEdit = (item) => {
        console.log(item)
        setEditValues({
            id: item._id,
            name: item.name,
        })
        setStatusEdit(true)

    }
    const handleChangeCategory = (e) => {

        if (statusEdit) {
            const name = e.target.id;
            const { value } = e.target;
            setEditValues({ ...editvalues, [name]: value })
        } else {
            setValues({ ...values, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values.name)
        console.log(editvalues)
        const { id, name } = editvalues;
        if (statusEdit) {
            editCategory(user.token, id, { name })
                .then((res) => {
                    console.log(res)
                    loadData();
                    toast.success("Edit Data " + res.data.name + " Success!");
                    clearForm();
                }).catch((err) => {
                    console.log(err.response.data);
                    toast.error('Error Edit data!')
                })

        } else {
            createCategory(user.token, values)
                .then((res) => {
                    console.log(res)
                    loadData();
                    toast.success("Insert Data " + res.data.name + " Success!");
                    clearForm();
                }).catch((err) => {
                    console.log(err.response.data);
                    toast.error('Error insert data!')
                })

        }


    }

    const handleRemove = (id) => {
        deleteCategory(user.token, id)
            .then((res) => {
                console.log(res)
                loadData(user.token);
                toast.success("Remove Data " + res.data.name + " Success!");

            }).catch((err) => {
                console.log(err.response.data);
                toast.error('Error delete data!')
            })
    }

    const loadData = () => {
        listCategory()
            .then((res) => {
                setCategory(res.data)
            }).catch((err) => {
                console.log(err.response.data);
            })
    }
    console.log('data:', category)


    useEffect(() => {
        loadData();

    }, [])

    const clearForm = () => {
        setEditValues(EditType)
        setValues({
            name: '',
        })
        setStatusEdit(false)
    }

    const ContainerHeight = 300;
    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            loadData();
        }
    }

    return (
        <div className="container max-w-[100%] max-h-[680px] bg-[#f9fafb]">
            <div className="grid grid-rows-6 grid-flow-col gap-4 justify-items-center content-center w-[100%] h-[680px]">
                <div className='row-span-1 place-self-center'>
                    <h1 className='text-3xl'>CATEGORY</h1>
                </div>
                <div className="row-span-1 justify-center place-self-center">
                    <div class="flex flex-row">
                        <div className='mx-5'>
                            {statusEdit && editvalues !== null
                                ? <label><b>update category :</b></label>
                                : <label><b>create category :</b></label>
                            }
                        </div>
                        <div className='mx-5 w-[300px]'>
                            {statusEdit && editvalues !== null
                                ? (<>
                                    <Input type="text"
                                        id="name"
                                        name="name"
                                        value={editvalues.name}
                                        onChange={handleChangeCategory}
                                        className='form-control' />
                                </>)
                                : (<>
                                    <Input type="text"
                                        id="name"
                                        name="name"
                                        placeholder="category..."
                                        value={values.name}
                                        onChange={handleChangeCategory}
                                        className='form-control' />
                                </>)
                            }
                        </div>
                        <div className='mx-1'>
                            <Button
                                type="primary"
                                className="rounded-full bg-[#1BA8E7] justify-self-center"
                                htmlType="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                        <div className='mx-1'>
                            <Button
                                className="rounded-full bg-[#dc2626] text-white justify-self-center"
                                htmlType="button"
                                onClick={() => setStatusEdit(false)} >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="row-span-3 justify-center place-self-center">
                    <Card style={{ width: 800 }}>
                        <List>
                            <VirtualList
                                data={category}
                                height={ContainerHeight}
                                itemHeight={47}
                                itemKey="email"
                                onScroll={onScroll}
                            >
                                {(item) => (
                                    <List.Item key={item._id}>
                                        <List.Item.Meta
                                            title={item.name}
                                        />
                                        <Button
                                            className="rounded-full bg-[#dc2626] text-white justify-self-center mx-1"
                                            htmlType="button"
                                            onClick={() => handleRemove(item._id)}
                                        >x</Button>
                                        <Button
                                            className="rounded-full bg-[#fbbf24] text-white justify-self-center mx-1"
                                            htmlType="button"
                                            onClick={() => handleEdit(item)}
                                        >Edit</Button>
                                    </List.Item>
                                )}
                            </VirtualList>
                        </List>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default Category;

