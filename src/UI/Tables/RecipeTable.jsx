import { useNavigate } from 'react-router-dom'
import { BASEIMG_URL } from '../../Constants/END_POINTS.JS'
import RecipesDetails from '../../modules/Recipes/Components/RecipesDetails/RecipesDetails'
import ModalConfirmDelete from '../ModalConfirmDelete'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

export default function RecipeTable({ recipesList, deleteRecipe, addToFav }) {

    const navigate = useNavigate()
    const { loginData } = useContext(AuthContext)
    const { roles } = loginData;
    const person = roles[0]
    console.log(person);

    const handleUpdateRecipe = (recipe) => {
        navigate("/dashboard/recipestData", { state: { operationType: "update", recipe } });
    }
    return (
        <table className="table custom-table r ">
            <thead>
                <tr className='text-center '>
                    <th className='row-thead' >Item Name</th>
                    <th className='row-thead'>Image</th>
                    <th className='row-thead'>Price</th>
                    <th className='row-thead'>Description</th>
                    <th className='row-thead'>tag</th>
                    <th className='row-thead'>Category</th>
                    <th className='row-thead'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {recipesList.map((recipe, index) => (
                    <tr key={recipe.id} className='text-center'>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{recipe.name}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            {recipe.imagePath ? (
                                <img src={`${BASEIMG_URL}/${recipe.imagePath}`} className="img-list" alt="" />
                            ) : (
                                <span>No Image Available</span>
                            )}

                        </td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{recipe.price}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{recipe.description}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{recipe.tag.name}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            {recipe.category.map(cat => cat.name).join(', ')}
                        </td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <div className="dropdown">
                                <button
                                    className="btn boder-0"
                                    type="button"

                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>

                                </button>
                                <ul className="dropdown-menu" >
                                    <li>
                                        <RecipesDetails recipe={recipe} />
                                    </li>
                                    {person == "Admin" ? (
                                        <>
                                            <li>
                                                <button className="dropdown-item" onClick={() => { handleUpdateRecipe(recipe) }} >
                                                    <i className="fa fa-edit me-2" aria-hidden="true"></i> Edit
                                                </button>
                                            </li>
                                            <li>
                                                <ModalConfirmDelete deleteAction={() => { deleteRecipe(recipe.id) }} tag="Recipe" />
                                            </li>
                                        </>
                                    ) : (<li>
                                        <button className="dropdown-item" onClick={() => { addToFav(recipe.id) }} >
                                            <i className="fa fa-heart me-2" aria-hidden="true"></i> Add To Favorite
                                        </button>
                                    </li>)}

                                </ul>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}
