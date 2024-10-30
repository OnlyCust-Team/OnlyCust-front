import { useState } from 'react';

function ReviewList({ reviews }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredReviews = reviews.filter(review =>
        review.product.toLowerCase().includes(searchText.toLowerCase())
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
                {filteredReviews.map((review) => (
                    <div key={review._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body" onClick={() => document.getElementById(`my_modal_${review._id}`).showModal()}>
                            <h2 className="card-title">{review.product}</h2>
                            <p>{review.review}</p>
                            <div className="flex justify-between mt-4">
                                <div className="text-sm">
                                    <span className="font-bold">Store:</span> {review.store}
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold">Price:</span> ${review.price.toFixed(2)}
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold">Stars:</span> {'⭐'.repeat(review.stars)}
                                </div>
                            </div>
                        </div>
                        <dialog id={`my_modal_${review._id}`} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">{review.product}</h3>
                                <div className="flex justify-between mt-4">
                                    <div className="text-sm">
                                        <span className="font-bold">Store:</span> {review.store}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold">Price:</span> ${review.price.toFixed(2)}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold">Stars:</span> {'⭐'.repeat(review.stars)}
                                    </div>
                                    {/* <div className="carousel w-full">
                                        {/* {review.images.map((image, index) => (
                                            <div key={index} className="carousel-item">
                                                <img
                                                    src={image}
                                                    alt={`Review ${index}`}
                                                    className="w-full"
                                                />
                                            </div>
                                        ))} */}
                                </div>
                                <p className="py-4">{review.review}</p>
                            </div>
                        </dialog>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReviewList;
