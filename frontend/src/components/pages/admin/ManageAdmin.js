import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
//antd
import { Select, List, Button, Card, Modal, Form, Input } from 'antd';
import VirtualList from 'rc-virtual-list';

// functions
import {
  listUser,
  removeUser,
  changeRole,
  updateUser,
} from "../../functions/users";
import { toast } from "react-toastify";


const ManageAdmin = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [drop, setDrop] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectRole, setSelectRole] = useState('');
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const roleData = [{
    value: 'admin',
    label: 'admin',
  }, {
    value: 'user',
    label: 'user',
  },
  {
    value: 'seller',
    label: 'seller',
  }];

  const loadData = (authtoken) => {
    //code
    listUser(authtoken)
      .then((res) => {
        //code
        // console.log(res.data)
        setData(res.data);
        setSelectData(res.data);
        //[...new Set(array)]

      })
      .catch((err) => {
        //err
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are youe sure Delete!")) {
      removeUser(user.token, id)
        .then((res) => {
          // console.log(res.data);
          toast.success(`Delete ${res.data.username} Success!`);
          loadData(user.token);

        }).catch((err) => {
          console.log(err);
          toast.error(`Delete Error!`);


        });
    }
  }
  const handleChangeRole = (value, id) => {
    let values = {
      id: id,
      role: value,
    }
    // console.log('changrole', values);
    changeRole(user.token, values)
      .then((res) => {
        // console.log(res);
        toast.success(`${res.data.username} Change Role Success!`);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });

  }

  useEffect(() => {
    //code
    loadData(user.token);
  }, []);

  const ContainerHeight = 450;
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      loadData();
    }
  }
  const onSubmit = (values) => {
    // e.preventDefault();
    const id = localStorage.getItem('updateUserID');
    // console.log(values);
    let data = {
      id: id,
      username: values.username,
      phone: values.phone,
      email: values.email,
      password: values.password,
    }
    // console.log(data);
    if (values.password !== values.confirmpassword) {
      toast.error("Password not match");
    } else {
      //code
      updateUser(user.token, id, data)
        .then((res) => {
          // console.log(res)
          setIsModalOpen(false);
          toast.success(res.data.user.username + " Update User Success!")
          loadData(user.token);
          form.resetFields()
          // localStorage.clear('updateUserID');
        }).catch(err => {
          console.log(err)
          toast.error("Update User Error!")

        })
    }
  };

  const showModal = (item) => {
    // console.log('onfill', item)
    form.setFieldsValue({
      username: item.username,
      phone: item.phone,
      email: item.email,
    });
    setIsModalOpen(true);
  };
  const handleCancel = () => {

    setIsModalOpen(false);
  };

  return (
    <div className="container max-w-[100%] max-h-[680px] bg-[#f9fafb]">
      <div className="grid grid-rows-6 grid-flow-col gap-4 justify-items-center content-center w-[100%] h-[680px]">
        <div className='row-span-1 place-self-center'>
          <h1 className='text-3xl'>MANAGEMENT USER</h1>
        </div>
        <div className="row-span-4 justify-center">
          <Card style={{ width: 900 }}>
            <List>
              <VirtualList
                data={selectData}
                className="mx-0"
                // height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                style={{
                  maxHeight: 450,
                  overflow: 'auto',
                }}
              // onScroll={onScroll}
              >
                {(item) => (
                  <List.Item key={item._id}>
                    <div className='grid grid-cols-12 grap-2 justify-items-center content-center'>
                      <div className="col-span-2">{item.username}</div>
                      <div className="col-span-3">{item.email}</div>
                      <div className="col-span-2">
                        {user.email === item.email || item.email === 'admin@gmail.com'
                          ? <Select
                            defaultValue={item.role}
                            disabled={true}
                            style={{
                              width: 90,
                            }}
                            options={roleData}
                          />
                          : <Select
                            defaultValue={item.role}
                            disabled={false}
                            style={{
                              width: 90,
                            }}
                            options={roleData}
                            onSelect={(value) => handleChangeRole(value, item._id)}
                          />
                        }
                      </div>
                      <div className="col-span-1">{moment(item.createdAt).locale("th").format("ll")}</div>
                      <div className="col-span-1">{moment(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow()}</div>
                      <div className="col-span-3 justify-self-end">
                        {item.email === "admin@gmail.com" && (<></>)}
                        {user.email === item.email && (
                          <Button
                            className="rounded-full bg-[#fbbf24] text-white justify-self-center mx-1"
                            htmlType="button"
                            onClick={() => {
                              showModal(item);
                              localStorage.setItem('updateUserID', item._id);
                            }}
                          ><i className="fa-solid fa-marker"></i></Button>
                        )}
                        {!(user.email === item.email || item.email === "admin@gmail.com") && (
                          <>
                            <Button
                              className="rounded-full bg-[#fbbf24] text-white justify-self-center mx-1"
                              htmlType="button"
                              onClick={() => {
                                showModal(item);
                                localStorage.setItem('updateUserID', item._id);
                              }}
                            ><i className="fa-solid fa-marker"></i></Button>
                            {/* <Button
                              className="rounded-full bg-[#dc2626] text-white justify-self-center mx-1"
                              htmlType="button"
                              onClick={() => handleRemove(item._id)}
                            ><i className="fa-solid fa-trash"></i></Button> */}
                          </>
                        )}
                      </div>
                    </div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Card>
          <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
            <b><h1 className="text-xl text-center mb-5">Update User</h1></b>
            <Form
              layout="vertical"
              form={form}
              name="control-hooks"
              onFinish={onSubmit}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone!',
                  },
                ]}
              >
                < Input
                  className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                />

              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone!',
                  },
                  {
                    pattern: /^06\d{8}|09\d{8}|08\d{8}/g,
                    message: 'Invalid phone number format start must 09,08,06 and must have 10 numbers',
                  },
                ]}
              >
                < Input
                  className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                />

              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                < Input
                  className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                />

              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,10}$/,
                    message: 'Password must be a minimum of 6 and maximum 10 characters including number, Upper, Lower And one special characterd'
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                />
              </Form.Item>
              <Form.Item
                label="Confirmpassword"
                name="confirmpassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                />
              </Form.Item>

              <Form.Item
              >
                <Button
                  type="primary"
                  className="rounded-full bg-[#1BA8E7] justify-self-center"
                  htmlType="submit"
                >

                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div></div>
      </div>

    </div>
  )
}

export default ManageAdmin

