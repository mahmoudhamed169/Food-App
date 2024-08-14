import Header from '../../../Shared/Components/Header/Header';
import Image from "../../../../assets/images/head1.png";
import axios from 'axios';
import { RECIPES_URLS } from '../../../../Constants/END_POINTS.JS';
import { useEffect, useState } from 'react';
import PreLoader from '../../../Shared/Components/Spinner/PreLoader';
import NoData from '../../../Shared/Components/NoDate/NoData';
import { toast } from 'react-toastify';
import RecipeTable from '../../../../UI/Tables/RecipeTable';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../../Shared/Components/Pagination/PaginationComponent';
import { FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { TAGS_URLS } from '../../../../Constants/END_POINTS.JS';
import { CATEGORIES_URLS } from '../../../../Constants/END_POINTS.JS';

export default function RecipesList() {
    const [recipesList, setRecipesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTagId, setSelectedTagId] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const pageSize = 5;

    let navigate = useNavigate();

    const getAllTags = async () => {
        try {
            const response = await axios.get(TAGS_URLS.getTags, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    const getAllRecipes = async (pageNumber = 1, search = '', tagId = '', categoryId = '') => {
        setLoading(true);
        try {
            const response = await axios.get(RECIPES_URLS.getRecipes, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    name: search,
                    tagId: tagId,
                    categoryId: categoryId,
                },
            });
            setRecipesList(response.data.data);
            setTotalPages(response.data.totalNumberOfPages);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteRecipe = async (id) => {
        try {
            await axios.delete(RECIPES_URLS.delete(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            toast.success("Recipe deleted successfully!");
            getAllRecipes(currentPage, searchTerm, selectedTagId, selectedCategoryId);
        } catch (error) {
            console.error("Error deleting Recipe:", error);
            toast.error("Failed to delete Recipe. Please try again.");
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        setSelectedTagId(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategoryId(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        getAllTags();
        getAllCategories();
        getAllRecipes(currentPage, searchTerm, selectedTagId, selectedCategoryId);
    }, [currentPage, searchTerm, selectedTagId, selectedCategoryId]);

    return (
        <div>
            <Header image={Image} title={"Recipes Item"} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} />
            <div className='d-flex m-4 justify-content-between'>
                <div>
                    <h4 className='m-0 fw-bolder'>Recipe Table Details</h4>
                    <span className='text-muted'>You can check all details</span>
                </div>
                <div>
                    <button className='btn btn-AddNewItem' onClick={() => { navigate("/dashboard/recipestData") }}>Add New Item</button>
                </div>
            </div>

            <div>
                <div className="row mx-3">
                    <div className="col-md-7">
                        <InputGroup className="mb-3">
                            <span className="input-group-text border-0" id="basic-addon1">
                                <i className="fa-solid fa-magnifying-glass h-75 pt-1"></i>
                            </span>
                            <FormControl
                                placeholder="Search Recipes"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </div>
                    <div className="col-md-2">
                        <Form.Select aria-label="Select Tag" value={selectedTagId} onChange={handleTagChange}>
                            <option value="">Tag</option>
                            {tags.map((tag, index) => (
                                <option key={index} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="col-md-2">
                        <Form.Select aria-label="Select Category" value={selectedCategoryId} onChange={handleCategoryChange}>
                            <option value="">Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </div>
            </div>

            <div className="table-container mx-3">
                {loading && currentPage === 1 && searchTerm === '' ? (
                    <div className="text-center"><PreLoader /></div>
                ) : recipesList.length === 0 ? (
                    <div className="text-center"><NoData /></div>
                ) : (
                    <>
                        <RecipeTable recipesList={recipesList} deleteRecipe={deleteRecipe} />
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
