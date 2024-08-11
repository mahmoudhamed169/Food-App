
import { useEffect, useState } from "react";
import userImage from "../../../../assets/images/head1.png"
import Header from './../../../Shared/Components/Header/Header';
import PreLoader from "../../../Shared/Components/Spinner/PreLoader";
import NoData from "../../../Shared/Components/NoDate/NoData";
import axios from "axios";
import { BASE_USERS } from "../../../../Constants/END_POINTS.JS";
import ModalConfirmDelete from "../../../../UI/ModalConfirmDelete";
import { USERS_URLs } from "../../../../Constants/END_POINTS.JS";
import { toast } from "react-toastify";
import UserTable from "../../../../UI/Tables/UserTable";

export default function UsersList() {
    const [loading, setLoading] = useState(true);
    const [usersList, setUserList] = useState([])


    const getAllUsers = async () => {
        try {
            const response = await axios.get(BASE_USERS, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            console.log(response.data.data);
            setUserList(response.data.data);
        } catch (error) {
            console.error("Error fetching Users:", error);
        } finally {
            setLoading(false);
        }
    };


    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(USERS_URLs.delete(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            toast.success("User deleted successfully!")
            getAllUsers()

        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category. Please try again.");


        }

    }

    useEffect(() => {
        getAllUsers()
        return () => {

        };
    }, []);
    return (
        <div>
            <Header image={userImage} title={"Users  List "} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} />

            <div className='m-4 '>
                <h4 className='m-0 fw-bold'>Users Table Details</h4>
                <span className='text-muted'>You can check all details</span>
            </div>


            <div className="table-container">
                {loading ? (
                    <div className="text-center"><PreLoader /></div>
                ) : usersList.length === 0 ? (
                    <div className="text-center"><NoData /></div>
                ) : (

                    // <table className="table custom-table">
                    //     <thead>
                    //         <tr className='text-center'>
                    //             <th className='row-thead' >User Name</th>
                    //             <th className='row-thead'>Email</th>
                    //             <th className='row-thead'>Country</th>
                    //             <th className='row-thead'>Mobile Phone</th>
                    //             <th className='row-thead'>Creation Date</th>
                    //             <th className='row-thead'>Actions</th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         {usersList.map((user, index) => (
                    //             <tr key={user.id} className='text-center'>
                    //                 <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.userName}</td>
                    //                 <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.email}</td>
                    //                 <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.country}</td>
                    //                 <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.phoneNumber}</td>
                    //                 <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    //                     {user.creationDate}
                    //                 </td>
                    //                 <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    //                     <div className="dropdown">
                    //                         <button
                    //                             className="btn boder-0"
                    //                             type="button"

                    //                             data-bs-toggle="dropdown"
                    //                             aria-expanded="false"
                    //                         >
                    //                             <i className="fa fa-ellipsis-h" aria-hidden="true"></i>

                    //                         </button>
                    //                         <ul className="dropdown-menu" >
                    //                             <li>
                    //                                 <button className="dropdown-item">
                    //                                     <i className=" fa-regular fa-eye me-2" aria-hidden="true"></i> View
                    //                                 </button>
                    //                             </li>

                    //                             <li>
                    //                                 <ModalConfirmDelete deleteAction={() => { deleteUser(user.id) }} tag="User" />
                    //                             </li>
                    //                         </ul>
                    //                     </div>
                    //                 </td>
                    //             </tr>
                    //         ))}

                    //     </tbody>
                    // </table>
                    <UserTable usersList={usersList} deleteUser={deleteUser} />



                )}
            </div>




        </div>
    )
}
