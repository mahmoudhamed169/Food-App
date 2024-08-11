
import Header from '../../../Shared/Components/Header/Header'
import Image from "../../../../assets/images/head1.png"
import axios from 'axios';
import { RECIPES_URLS } from '../../../../Constants/END_POINTS.JS';
import { useEffect, useState } from 'react';
import PreLoader from '../../../Shared/Components/Spinner/PreLoader';
import NoData from '../../../Shared/Components/NoDate/NoData';


import { toast } from 'react-toastify';
import RecipeTable from '../../../../UI/Tables/RecipeTable';

export default function RecipesList() {
    const [recipesList, setRecipesList] = useState([])
    const [loading, setLoading] = useState(true);

    const getAllRecipes = async () => {
        try {
            const response = await axios.get(RECIPES_URLS.getRecipes, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            console.log(response.data.data);
            setRecipesList(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteRecipe = async (id) => {
        try {
            const response = await axios.delete(RECIPES_URLS.delete(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            toast.success("Recipe deleted successfully!")
            getAllRecipes()

        } catch (error) {
            console.error("Error deleting Recipe:", error);
            toast.error("Failed to delete Recipe. Please try again.");


        }

    }

    useEffect(() => {
        getAllRecipes()
        return () => {

        };
    }, []);
    return (
        <div>
            <Header image={Image} title={"Recipes Item"} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} />
            <div className='d-flex m-4 justify-content-between'>
                <div>
                    <h4 className='m-0 fw-bolder'>Recipe Table Details</h4>
                    <span className='text-muted'>You can check all details</span>
                </div>
                <div>
                    <button className='btn btn-success px-4 py-2'>Add New Item  </button>
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="text-center"><PreLoader /></div>
                ) : recipesList.length === 0 ? (
                    <div className="text-center"><NoData /></div>
                ) : (

                    <RecipeTable recipesList={recipesList} deleteRecipe={deleteRecipe} />
                )}
            </div>








        </div>
    )
}
