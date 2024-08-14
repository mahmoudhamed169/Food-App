import { useEffect, useState } from "react";
import userImage from "../../../../assets/images/head1.png";
import Header from './../../../Shared/Components/Header/Header';
import PreLoader from "../../../Shared/Components/Spinner/PreLoader";
import NoData from "../../../Shared/Components/NoDate/NoData";
import axios from "axios";
import { BASE_USERS } from "../../../../Constants/END_POINTS.JS";
import UserTable from "../../../../UI/Tables/UserTable";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import PaginationComponent from "../../../Shared/Components/Pagination/PaginationComponent";

export default function UsersList() {
    const [loading, setLoading] = useState(true);
    const [usersList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('userName');
    const [group, setGroup] = useState("");
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(""); // Corrected state name
    const pageSize = 30;

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryNames = response.data.map(country => country.name.common).sort();
            setCountries(countryNames);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllUsers = async (pageNumber = 1, search = '', group = "", type = 'userName', country = "") => {
        try {
            const params = {
                pageSize,
                pageNumber,
                groups: group,
                country: country
            };
            if (search) {
                params[type] = search;
            }
            console.log(params);

            const response = await axios.get(BASE_USERS, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                params,
            });
            setUserList(response.data.data);
            setTotalPages(response.data.totalNumberOfPages);
        } catch (error) {
            console.error("Error fetching Users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setCurrentPage(1);
    };

    const handleGroupsChange = (e) => {
        setGroup(e.target.value);
        setCurrentPage(1);
    };

    const handleCountryChange = (e) => {
        const value = e.target.value;
        setSelectedCountry(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchCountries();
        getAllUsers(currentPage, searchTerm, group, searchType, selectedCountry);
    }, [currentPage, searchTerm, group, searchType, selectedCountry]);

    return (
        <div>
            <Header image={userImage} title={"Users List"} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} />
            <div className='m-4'>
                <h4 className='m-0 fw-bold'>Users Table Details</h4>
                <span className='text-muted'>You can check all details</span>
            </div>
            <div className="mx-3">
                <div className="row">
                    <div className="col-md-6">
                        <InputGroup className="mb-3">
                            <Form.Select value={searchType} onChange={handleSearchTypeChange} className="me-2 ">
                                <option value="userName">Search by Username</option>
                                <option value="email">Search by Email</option>
                            </Form.Select>
                            <FormControl
                                placeholder={`Search by ${searchType === 'userName' ? 'Username' : 'Email'}`}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </div>
                    <div className="col-md-3">
                        <Form.Select aria-label="Select Country" value={selectedCountry} onChange={handleCountryChange}>
                            <option value="">Country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="col-md-3">
                        <Form.Select aria-label="Select Tag" value={group} onChange={handleGroupsChange}>
                            <option value={""}>User Type</option>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                        </Form.Select>
                    </div>
                </div>
            </div>
            <div className="table-container mx-3">
                {loading && currentPage === 1 && searchTerm === '' ? (
                    <div className="text-center"><PreLoader /></div>
                ) : usersList.length === 0 ? (
                    <div className="text-center"><NoData /></div>
                ) : (
                    <>
                        <UserTable usersList={usersList} />
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
