
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination className='mt-3 d-flex justify-content-center custom-pagination py-4 ' >
            <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export default PaginationComponent;


