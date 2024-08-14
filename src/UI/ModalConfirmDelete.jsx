import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noData from '../assets/images/nodata.png'

function ModalConfirmDelete({ deleteAction, tag }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <button className="dropdown-item" onClick={handleShow}>
                <i className="fa fa-trash  me-2" aria-hidden="true"></i> Delete
            </button>

            <Modal show={show} onHide={handleClose} >


                <div className=' d-flex justify-content-end mx-4 mt-4 '>
                    <button className=' btn btn-model d-flex justify-content-center align-items-center ' onClick={handleClose}>
                        <i className='fa-solid fa-close  '></i>
                    </button>
                </div>
                <Modal.Body>
                    <div className='text-center '>
                        <img src={noData} alt="" />
                        <h6 className=" fw-bold mt-2">{`Delete This ${tag} ?`}</h6>
                        <p className="text-muted">
                            are you sure you want to delete this item ? if you are sure just <br /> click on delete it
                        </p>

                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <div className='my-3'>
                        <Button variant="danger"
                            onClick={async () => {
                                await deleteAction()
                                handleClose()
                            }}>
                            {`Delete this ${tag}`}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmDelete;