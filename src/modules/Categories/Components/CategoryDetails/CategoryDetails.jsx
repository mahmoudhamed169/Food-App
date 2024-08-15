import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import recipeImg from "../../../../assets/images/caregory.jpg"

const CategoryDetails = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const { id, name, creationDate, modificationDate } = props.category
    // console.log(props.category);

    return (
        <>
            <button className="dropdown-item" onClick={() => setModalShow(true)}>
                <i className="fa-regular fa-eye me-2" aria-hidden="true"></i> View
            </button>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className=' d-flex justify-content-end mx-4 my-4 '>
                    <button className=' btn btn-model d-flex justify-content-center align-items-center ' onClick={() => setModalShow(false)}>
                        <i className='fa-solid fa-close  '></i>
                    </button>
                </div>
                <Modal.Body >
                    <div className=" container">
                        <div className="row g-6">
                            < div className="col-md-5 image-section d-flex justify-content-center align-items-center">
                                <div className="img-container">
                                    <img
                                        src={recipeImg}
                                        alt="recipeImg"
                                        className="w-100 rounded-circle  shadow-sm"
                                    />




                                </div>

                            </div>
                            <div className="col-md-7 ps-3">

                                <ul className="list-unstyled info-list">
                                    <li><strong>ID:</strong> {id}</li>
                                    <li><strong>Name:</strong> {name}</li>
                                    <li><strong>Creation Date:</strong> {new Date(creationDate).toLocaleDateString()}</li>
                                    <li><strong>Modification Date:</strong> {new Date(modificationDate).toLocaleDateString()}</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 m-2">
                    <Button variant="danger" onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default CategoryDetails;
