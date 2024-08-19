import Header from '../../../Shared/Components/Header/Header';
import Image from "../../../../assets/images/head1.png";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CATEGORIES_URLS } from '../../../../Constants/END_POINTS.JS';
import PreLoader from '../../../Shared/Components/Spinner/PreLoader';
import NoData from '../../../Shared/Components/NoDate/NoData';
import { toast } from 'react-toastify';
import CategoryTable from '../../../../UI/Tables/CategoryTable';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import AddCategory from '../AddCategory/AddCategory';
import PaginationComponent from '../../../Shared/Components/Pagination/PaginationComponent';

export default function CategoriesList() {
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 5;

    const getAllCategories = async (pageNumber = 1, search = '') => {
        setLoading(true);
        try {
            const response = await axios.get(CATEGORIES_URLS.getCategories, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    name: search,
                },
            });

            setCategoriesList(response.data.data);
            setTotalPages(response.data.totalNumberOfPages);
        } catch (error) {
            console.error("Error fetching categories:", error);

        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(CATEGORIES_URLS.delete(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            toast.success("Category deleted successfully!");
            getAllCategories(currentPage, searchTerm);
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category. Please try again.");
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

    useEffect(() => {
        getAllCategories(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    return (
        <div className='m-3'>
            <Header image={Image} title={"Categories Item"} paragraph={"You can now add your items that any user can order from the Application, and you can edit"} />
            <div className='d-flex m-4 justify-content-between'>
                <div>
                    <h4 className='m-0 fw-bold'>Categories Table Details</h4>
                    <span className='text-muted'>You can check all details</span>
                </div>
                <div>

                    <Button variant="success" onClick={() => setModalShow(true)} className='btn-AddNewItem'>
                        Add New Category
                    </Button>

                    <AddCategory
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        getAllCategories={getAllCategories}
                    />
                </div>
            </div>

            <InputGroup className="mb-3">
                <span className="input-group-text border-0" id="basic-addon1">
                    <i className="fa-solid fa-magnifying-glass h-75 pt-1"></i>
                </span>
                <FormControl
                    placeholder="Search Categories"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </InputGroup>

            <div className="table-container">
                {loading && currentPage === 1 && searchTerm === '' ? (
                    <div className="text-center"><PreLoader /></div>
                ) : categoriesList.length === 0 ? (
                    <div className="text-center"><NoData /></div>
                ) : (
                    <>
                        <CategoryTable categoriesList={categoriesList} deleteCategory={deleteCategory} getAllCategories={getAllCategories} />
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
