import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { TAGS_URLS, CATEGORIES_URLS, RECIPES_URLS } from '../../../../Constants/END_POINTS.JS';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const RecipesData = () => {
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const location = useLocation();
    const { operationType, recipe } = location.state || {};

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

    useEffect(() => {
        if (operationType === "update" && recipe) {
            // fill inputs with recipe data
            setValue('name', recipe.name);
            setValue('price', recipe.price);
            setValue('description', recipe.description);
            setValue('tagId', recipe.tagId);
            setValue('categoriesIds', recipe.categoriesIds);
            setUploadedFileName(recipe.imageName);

            setIsUpdating(true);
        }
    }, [operationType, recipe, setValue]);

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
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", Number(price));
        formData.append("description", description);
        formData.append("tagId", tagId);
        formData.append("categoriesIds", categoriesIds);

        if (recipeImage) {
            formData.append("recipeImage", recipeImage);
        }

        if (isUpdating && recipe.id) {
            formData.append("id", recipe.id);
        }

        return formData;
    };

    const onSubmit = async (data) => {
        const recipesData = appendFormData(data);

        try {
            if (isUpdating) {
                const response = await axios.put(`${RECIPES_URLS.updateRecipe(recipe.id)}`, recipesData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
                toast.success("Recipe updated successfully!");
            } else {
                const response = await axios.post(RECIPES_URLS.addNewRecipe, recipesData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
                toast.success(response.data.message);
            }

            navigate("/dashboard/recipestList");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <main>
            <div className='d-flex justify-content-between m-4 align-items-center p-5 rounded-5' style={{ background: "#F0FFEF" }}>
                <div>
                    <h2 className='m-1 fw-bold'>
                        {isUpdating ? 'Edit' : 'Fill the'} <span className='text-success'>Recipes </span>!
                    </h2>
                    <p className='ms-1'>You can now {isUpdating ? 'update' : 'fill'} the meal easily using the table and form.<br /> Click here and {isUpdating ? 'update' : 'fill'} it with the table!</p>
                </div>
                <div>
                    <button className='btn btn-success px-5 btn-Fill-Recipes' onClick={() => { navigate("/dashboard/recipestList") }} >
                        Fill Recipes <i className="fa-solid fa-arrow-right mx-2"></i>
                    </button>
                </div>
            </div>

            <div className='mt-4'>
                <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
                    {/* Recipe Name Input */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Recipe Name"
                                {...register("name", { required: "Name is required" })}
                            />
                        </div>
                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>

                    {/* Tag Select Input */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <Form.Select aria-label="Select Tag"
                                {...register("tagId", { required: "Tag is required" })}
                            >
                                <option value="">Tag</option>
                                {tags.map((tag, index) => (
                                    <option key={index} value={tag.id}>{tag.name}</option>
                                ))}
                            </Form.Select>
                        </div>
                        {errors.tagId && <span className="text-danger">{errors.tagId.message}</span>}
                    </div>

                    {/* Price Input */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Price"
                                {...register("price", { required: "Price is required" })}
                            />
                            <span className="input-group-text border-0">EGY</span>
                        </div>
                        {errors.price && <span className="text-danger">{errors.price.message}</span>}
                    </div>

                    {/* Category Select Input */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <Form.Select aria-label="Select Category"
                                {...register("categoriesIds", { required: "Category is required" })}
                            >
                                <option value="">Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Select>
                        </div>
                        {errors.categoriesIds && <span className="text-danger">{errors.categoriesIds.message}</span>}
                    </div>

                    {/* Description Input */}
                    <div className='mb-3'>
                        <div className='input-group'>
                            <Form.Control as="textarea" placeholder='Description' style={{ backgroundColor: "#F7F7F7" }} rows={4}
                                {...register("description", { required: "Description is required" })}
                            />
                        </div>
                        {errors.description && <span className="text-danger">{errors.description.message}</span>}
                    </div>

                    {/* Image Upload */}
                    <div className='mb-3'>
                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the files here...</p>
                            ) : (
                                <div>
                                    <p className='fs-3'><i className="fa-solid fa-cloud-arrow-up fs-1 text-success mx-2"></i></p>
                                    <span className='fw-bold fs-6'>Drag & Drop or <span className='text-success'>Choose an Image</span> to Upload</span>
                                    {uploadedFileName && <p className='text-success'>Selected file: {uploadedFileName}</p>}
                                </div>
                            )}
                        </div>
                        {errors.recipeImage && <span className="text-danger">{errors.recipeImage.message}</span>}
                    </div>

                    <div className='d-flex justify-content-end my-4'>
                        <button className='btn-cancel me-4' type="button" onClick={() => navigate("/dashboard/recipestList")}>Cancel</button>
                        <button className='btn-save ms-3' type='submit' disabled={isSubmitting}>
                            {isSubmitting ? <ClipLoader size={15} color={"#fff"} /> : isUpdating ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default RecipesData;
