import Header from '../Shared/Components/Header/Header';
import Image from "../../assets/images/head1.png";
import Image2 from "../../assets/images/favImg.png";
import styles from './Favorites.module.css';
import axios from 'axios';
import { FAVORITES_URLS } from '../../Constants/END_POINTS.JS';
import { useEffect, useState } from 'react';
import PaginationComponent from './../Shared/Components/Pagination/PaginationComponent';
import { Card, Button, Spinner } from 'react-bootstrap';
import NoData from './../Shared/Components/NoDate/NoData';
import PreLoader from '../Shared/Components/Spinner/PreLoader';
import { toast } from 'react-toastify';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const getAllFavorites = async (pageNumber = currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get(FAVORITES_URLS.getFavorites, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    pageSize: 5,
                    pageNumber: pageNumber,

                },
            });

            console.log(response.data);
            setFavorites(response.data.data);
            setTotalPages(response.data.totalNumberOfPages);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };
    const deleteRecipe = async (id) => {
        try {
            await axios.delete(FAVORITES_URLS.deleteFavorites(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            toast.success("Recipe deleted successfully!");
            getAllFavorites(currentPage);
        } catch (error) {
            console.error("Error deleting Recipe:", error);
            toast.error("Failed to delete Recipe. Please try again.");
        }
    };


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        getAllFavorites(currentPage);
    }, [currentPage]);


    return (
        <>

            <Header
                image={Image}
                title={"Favorite Items"}
                paragraph={"You can now add your items that any user can order from the Application and you can edit."}
            />
            <div className='m-auto mt-5' style={{ width: "85%" }}>

                {loading ? (
                    <div className="text-center"><PreLoader /></div>
                ) : favorites.length > 0 ? (

                    <div className="row">
                        {favorites.map((favorite) => (
                            <div className="col-md-4 my-4" key={favorite.id}>
                                <Card style={{ width: '21rem', boxShadow: "4px 4px 4px 0px #00000040" }}>
                                    <div className={styles.imageWrapper}>
                                        <Card.Img
                                            variant="top"
                                            className='w-100'
                                            height={"170px"}
                                            src={favorite.recipe.imagePath || Image2}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = Image2;
                                            }}
                                        />
                                        <Button className={styles.favoriteBtn} onClick={() => deleteRecipe(favorite.recipe.id)}>
                                            <i className='fa-solid fa-heart'></i>
                                        </Button>
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{favorite.recipe.name}</Card.Title>
                                        <Card.Text>{favorite.recipe.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}


                    </div>
                ) : (

                    <div className="text-center">
                        <NoData />
                    </div>
                )}


                <div className='mt-5'>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={4}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
}
