
import CategoryDetails from '../../modules/Categories/Components/CategoryDetails/CategoryDetails';
import UpdateCategory from '../../modules/Categories/Components/UpdateCategory/UpdateCategory';
import ModalConfirmDelete from '../ModalConfirmDelete'
import { format } from 'date-fns';

export default function CategoryTable({ categoriesList, deleteCategory, getAllCategories }) {


    // const [modalShow, setModalShow] = useState(false);



    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'MM/dd/yyyy HH:mm');
    };

    return (
        <table className="table custom-table">
            <thead>
                <tr className='text-center'>
                    <th className='row-thead' >ID</th>
                    <th className='row-thead'>Name</th>
                    <th className='row-thead'>Creation Date</th>
                    <th className='row-thead'>Modification Date</th>
                    <th className='row-thead'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categoriesList.map((category, index) => (
                    <tr key={category.id} className='text-center'>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{category.id}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{category.name}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{formatDateTime(category.creationDate)}</td>
                        <td className={index % 2 === 0 ? 'even-row' : 'odd-row'}>{formatDateTime(category.modificationDate)}</td>
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
                                        <CategoryDetails category={category} />
                                    </li>
                                    <li>
                                        <UpdateCategory category={category} getAllCategories={getAllCategories} />

                                    </li>
                                    <li>
                                        <ModalConfirmDelete deleteAction={() => { deleteCategory(category.id) }} tag="Category" />
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
