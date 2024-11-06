import { useState } from 'react';
import PropTypes from 'prop-types';

function ReviewList({ products }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <section className="flex-1 p-4">
            <div className="form-control mb-4">
                <input
                    type="text"
                    placeholder="Search by product"
                    className="input input-bordered w-24 md:w-auto sticky top-0"
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid grid-cols-1 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="card bg-base-100 shadow-xl" onClick={()=>document.getElementById(`my_modal_${product._id}`).showModal()}>
                        <div className="card-body">
                            <h2 className="card-title">{product.productName}</h2>
                            {/* imagen temporal hasta que se haga el carousel */}
                            <img src={product.productImage} alt={product.productName} className="mb-4" />
                            <div className="review-item">
                                <p>{product.review}</p>
                                <div className="flex justify-between mt-4">
                                    <div className="text-sm">
                                        <span className="font-bold">Store:</span> {product.productBrand}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold">Price:</span> ${product.productPrice.toFixed(2)}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold">Stars:</span> {'⭐'.repeat(product.stars)}
                                    </div>
                                </div>
                                <div className="text-sm mt-2">
                                    <span className="font-bold">Reviewed by:</span> {product.username}
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold">Created at:</span> {new Date(product.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <dialog id={`my_modal_${product._id}`} className="modal flex">
                            <div className="modal-box">
                                {/* carousel?*/}
                            </div>
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">{product.productName}</h3>
                                <div className="flex justify-between mt-4">
                                    <div className="text-sm">
                                        <span className="font-bold">Store:</span> {product.productBrand}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold">Price:</span> ${product.productPrice.toFixed(2)}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold">Stars:</span> {'⭐'.repeat(product.stars)}
                                    </div>
                                </div>
                                <p className="py-4">{product.review}</p>
                                <div className="text-sm">
                                    <span className="font-bold">Reviewed by:</span> {product.username}
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold">Created at:</span> {new Date(product.created_at).toLocaleString()}
                                </div>
                            </div>
                        </dialog>
                    </div>
                ))}
            </div>
        </section>
    );
}

ReviewList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            productName: PropTypes.string.isRequired,
            productImage: PropTypes.string.isRequired,
            productBrand: PropTypes.string.isRequired,
            productPrice: PropTypes.number.isRequired,
            stars: PropTypes.number.isRequired,
            review: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ReviewList;