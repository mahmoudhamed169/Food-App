import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { CATEGORIES_URLS } from '../../../../Constants/END_POINTS.JS';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddCategory(props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
        reset,
    } = useForm();


    useEffect(() => {
        setFocus("name")
    }, [setFocus]);

    const handleClose = () => {
        reset(); // Reset form fields and clear validation messages
        props.onHide();
    };




    const onSubmit = async (data) => {


        try {
            let response = await axios.post(
                CATEGORIES_URLS.addNewCategory,
                data,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            console.log(response);
            handleClose();
            toast.success("Category created successfully!");
            props.getAllCategories()

        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='border-0 d-flex justify-content-between align-content-center py-3 m-4'>

                <div>
                    <h5 className='fw-bold '>Add Category</h5>

                </div>
                <div className=' d-flex justify-content-end '>
                    <button className=' btn btn-model d-flex justify-content-center align-items-center ' onClick={handleClose}>
                        <i className='fa-solid fa-close  '></i>
                    </button>
                </div>


            </Modal.Header>
            <Modal.Body >
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
                            {isSubmitting ? <ClipLoader size={15} color={"#fff"} /> : 'Save'}

                        </Button>
                    </div>

                </form>
            </Modal.Body>

        </Modal >
    );
}

