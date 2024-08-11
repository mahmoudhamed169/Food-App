
import ModalConfirmDelete from '../ModalConfirmDelete'

export default function UserTable({ usersList, deleteUser }) {
    return (
        <table className="table custom-table">
            <thead>
                <tr className='text-center'>
                    <th className='row-thead' >User Name</th>
                    <th className='row-thead'>Email</th>
                    <th className='row-thead'>Country</th>
                    <th className='row-thead'>Mobile Phone</th>
                    <th className='row-thead'>Creation Date</th>
                    <th className='row-thead'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {usersList.map((user, index) => (
                    <tr key={user.id} className='text-center'>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.userName}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.email}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.country}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{user.phoneNumber}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            {user.creationDate}
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
                                        <button className="dropdown-item">
                                            <i className=" fa-regular fa-eye me-2" aria-hidden="true"></i> View
                                        </button>
                                    </li>

                                    <li>
                                        <ModalConfirmDelete deleteAction={() => { deleteUser(user.id) }} tag="User" />
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}
