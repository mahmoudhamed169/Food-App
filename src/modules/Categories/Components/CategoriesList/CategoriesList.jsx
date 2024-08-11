import Header from '../../../Shared/Components/Header/Header';
import Image from "../../../../assets/images/head1.png";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CATEGORIES_URLS } from '../../../../Constants/END_POINTS.JS';
import PreLoader from '../../../Shared/Components/Spinner/PreLoader';
import NoData from '../../../Shared/Components/NoDate/NoData';
import { toast } from 'react-toastify';

import CategoryTable from '../../../../UI/Tables/CategoryTable';

export default function CategoriesList() {
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);




    const getAllCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES_URLS.getCategories, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            console.log(response.data.data);
            setCategoriesList(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };
    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(CATEGORIES_URLS.delete(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            toast.success("Category deleted successfully!")
            getAllCategories()

        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category. Please try again.");


        }

    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className='m-3'>
            <Header image={Image} title={"Categories Item"} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} />
            <div className='d-flex m-4 justify-content-between'>
                <div>
                    <h4 className='m-0 fw-bold'>Categories Table Details</h4>
                    <span className='text-muted'>You can check all details</span>
                </div>
                <div>
                    <button className='btn btn-success px-4 py-2'>Add New Category</button>
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="text-center"><PreLoader /></div>
                ) : categoriesList.length === 0 ? (
                    <div className="text-center"><NoData /></div>
                ) : (

                    <CategoryTable categoriesList={categoriesList} deleteCategory={deleteCategory} />
                )}
            </div>
        </div>
    );
}
