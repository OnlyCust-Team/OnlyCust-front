import { useEffect, useState } from 'react';

function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getReviews = async () => {
        const res = await fetch(`http://localhost:3001/review`);
        const data = await res.json();
        setReviews(data)
    }
    useEffect(() => {
        if (!isLoading) {
            getReviews();
        }
    }, [isLoading]);

    return (
        <section className="flex-1 p-4">
            <div className="form-control">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto sticky top-0"
                />
            </div>
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
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
                            {/* {review.images && (
                                <figure className="mt-4">
                                    <img src={review.images} alt={review.product} className="w-full h-auto" />
                                </figure>
                            )} */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReviewList;