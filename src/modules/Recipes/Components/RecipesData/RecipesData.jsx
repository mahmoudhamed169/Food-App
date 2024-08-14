import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TAGS_URLS, CATEGORIES_URLS } from '../../../../Constants/END_POINTS.JS';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { RECIPES_URLS } from '../../../../Constants/END_POINTS.JS';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


const RecipesData = () => {
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        clearErrors,
    } = useForm();

    let navigate = useNavigate();

    const getAllTags = async () => {
        try {
            const response = await axios.get(TAGS_URLS.getTags, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            setTags(response.data);
        } catch (error) {
            console.error("Error fetching Tags:", error);
        }
    };

    const getAllCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES_URLS.getCategories, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                params: {
                    pageSize: 1000,
                    pageNumber: "",
                    name: "",
                },
            });
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getAllTags();
        getAllCategories();
    }, []);

    // Handle file drop
    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setUploadedFileName(file.name);
            setValue('recipeImage', file, { shouldValidate: true }); // Set the file in the form state
            clearErrors('recipeImage');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });


    const appendFormData = (data) => {
        const { name, price, description, tagId, categoriesIds, recipeImage } = data;

        console.log('recipeImage:', recipeImage);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", Number(price));
        formData.append("description", description);
        formData.append("tagId", tagId);
        formData.append("categoriesIds", categoriesIds);
        formData.append("recipeImage", recipeImage);
        return formData


    }

    const onSubmit = async (data) => {
        const recipesData = await appendFormData(data);
        // for (const [key, value] of recipesData.entries()) {
        //     console.log(`${key}:`, value);
        // }
        try {
            const response = await axios.post(RECIPES_URLS.addNewRecipe, recipesData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            console.log(response);
            toast.success(response.data.message);
            navigate("/dashboard/recipestList")



        } catch (error) {
            toast.error(error.response.data.message);

        }

    };

    return (
        <main>
            <div className='d-flex justify-content-between m-4 align-items-center p-5 rounded-5' style={{ background: "#F0FFEF" }}>
                <div>
                    <h2 className='m-1 fw-bold'>
                        Fill the <span className='text-success'>Recipes </span>!
                    </h2>
                    <p className='ms-1'>You can now fill the meals easily using the table and form. Click here and fill it with the table!</p>
                </div>
                <div>
                    <button className='btn btn-success px-5  btn-Fill-Recipes' onClick={() => { navigate("/dashboard/recipestList") }} >
                        Fill Recipes <i className="fa-solid fa-arrow-right mx-2"></i>
                    </button>
                </div>
            </div>

            <div className='mt-4'>
                <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Recipe Name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                        </div>
                        {errors.name && (
                            <span className="text-danger">{errors?.name?.message}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <div className="input-group">
                            <Form.Select aria-label="Select Tag"
                                {...register("tagId", {
                                    required: "Tag is required",
                                })}
                            >
                                <option value="">Tag</option>
                                {tags.map((tag, index) => (
                                    <option key={index} value={tag.id}>
                                        {tag.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        {errors.tagId && (
                            <span className="text-danger">{errors?.tagId?.message}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Price"
                                {...register("price", {
                                    required: "Price is required",
                                })}
                            />
                            <span className="input-group-text border-0">EGY</span>
                        </div>
                        {errors.price && (
                            <span className="text-danger">{errors?.price?.message}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <div className="input-group">
                            <Form.Select aria-label="Select Category"
                                {...register("categoriesIds", {
                                    required: "Category is required",
                                })}
                            >
                                <option value="">Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        {errors.categoryIds && (
                            <span className="text-danger">{errors?.categoryIds?.message}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <div className='input-group'>
                            <Form.Control as="textarea" placeholder='Description' style={{ backgroundColor: "#F7F7F7" }} rows={4}
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                        </div>
                        {errors.description && (
                            <span className="text-danger">{errors?.description?.message}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the files here...</p>
                            ) : (
                                <div>
                                    <p className='fs-3'><i className="fa-solid fa-upload"></i></p>
                                    <h6>Drag & Drop or Choose an Item Image to Upload</h6>
                                </div>
                            )}
                        </div>
                        <span className="text-muted">Uploaded file: {uploadedFileName || 'None'}</span>
                    </div>
                    {errors.recipeImage && (
                        <span className="text-danger">{errors.recipeImage.message}</span>
                    )}

                    <hr />
                    <div className='d-flex justify-content-end my-4'>
                        <button className='btn-cancel me-4' type="button" onClick={() => navigate("/dashboard/recipestList")}>Cancel</button>
                        <button className='btn-save ms-3' type='submit' disabled={isSubmitting}>
                            {isSubmitting ? <ClipLoader size={15} color={"#fff"} /> : 'Save'}

                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
};

export default RecipesData;
