import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { CATEGORIES_URLS } from '../../../../Constants/END_POINTS.JS';
import { toast } from 'react-toastify';

function UpdateCategory({ category, getAllCategories }) {
    const [modalShow, setModalShow] = useState(false);
    const { name, id } = category;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
        // reset,
        setValue,
    } = useForm();




    useEffect(() => {
        setFocus("name")
    }, [setFocus]);

    useEffect(() => {
        setValue("name", name)
    }, [name, id]);



    const onSubmit = async (data) => {


        try {
            let response = await axios.put(
                CATEGORIES_URLS.updateCategory(id),
                data,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            // console.log(response);
            await setModalShow(false)
            await getAllCategories()

            toast.success("Category updated successfully!");


        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    return (
        <>

            <button className="dropdown-item" onClick={() => setModalShow(true)}>
                <i className="fa fa-edit me-2" aria-hidden="true"></i> Edit
            </button>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='border-0 d-flex justify-content-between align-content-center py-3 m-4'>

                    <div>
                        <h5 className='fw-bold '>Update Category</h5>

                    </div>
                    <div className=' d-flex justify-content-end '>
                        <button className=' btn btn-model d-flex justify-content-center align-items-center ' onClick={() => setModalShow(false)}    >
                            <i className='fa-solid fa-close  '></i>
                        </button>
                    </div>


                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3 mx-4 mt-5' >
                            <div className="input-group  ">
                                <input type="text" className="form-control fw-semibold" placeholder="Category Name " aria-label="Email" aria-describedby="basic-addon1"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}

                                />
                            </div>
                            {errors.name && (
                                <span className="text-danger ">{errors?.name?.message}</span>
                            )}
                        </div>
                        <hr className='mt-4 mb-1' />


                        <div className='d-flex justify-content-end mx-4  mt-4 ' >

                            <Button className='btn-addCategory' disabled={isSubmitting} type='submit'>
                                {isSubmitting ? <ClipLoader size={15} color={"#fff"} /> : 'Update'}

                            </Button>
                        </div>

                    </form>.
                </Modal.Body>

            </Modal>
        </>
    );
}

export default UpdateCategory;