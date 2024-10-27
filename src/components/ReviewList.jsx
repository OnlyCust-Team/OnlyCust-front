import { useEffect, useState } from 'react';
import Filters from './Filters';

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

                {reviews.map((review) =>
                (
                    <div key={review._id} className="card bg-base-100 shadow-xl" onClick={() => document.getElementById('my_modal_1').showModal()}>
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
                            <dialog id="my_modal_1" className="modal flex">
                                <div className="modal-box">
                                    {review.images && (
                                        <>
                                            <div className="carousel w-full">
                                                <div id="item1" className="carousel-item w-full">
                                                    <img src={review.images} alt={review.product} className="w-full h-auto" />
                                                </div>
                                                <div id="item2" className="carousel-item w-full">
                                                    <img
                                                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                                                        className="w-full" />
                                                </div>
                                                <div id="item3" className="carousel-item w-full">
                                                    <img
                                                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                                                        className="w-full" />
                                                </div>
                                                <div id="item4" className="carousel-item w-full">
                                                    <img
                                                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                                                        className="w-full" />
                                                </div>
                                            </div>
                                            <div className="flex w-full justify-center gap-2 py-2">
                                                <a href="#item1" className="btn btn-xs">1</a>
                                                <a href="#item2" className="btn btn-xs">2</a>
                                                <a href="#item3" className="btn btn-xs">3</a>
                                                <a href="#item4" className="btn btn-xs">4</a>
                                            </div>
                                            {/* <img src={review.images} alt={review.product} className="w-full h-auto" /> */}
                                        </>
                                    )}
                                </div>
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
                                    </div>
                                    <p className="py-4">{review.review}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet imperdiet quam. Morbi non pharetra metus, ac venenatis ante. Nam finibus magna eu fringilla porttitor. Etiam vitae laoreet tellus. Proin a rutrum ex, eu tempus dolor. Proin blandit tempus metus nec suscipit. Phasellus ipsum tortor, sodales non vestibulum et, rutrum vel diam. In turpis sem, tempor vitae magna nec, luctus dapibus sapien. Maecenas a tellus a urna congue tempus.

                                        Etiam auctor ante malesuada elit bibendum, sed facilisis nunc rhoncus. Proin dolor turpis, condimentum ut arcu sit amet, volutpat rhoncus erat. In viverra magna a metus gravida vehicula. Quisque eu odio eu nunc tincidunt finibus nec id lorem. Suspendisse potenti. Duis rutrum ligula interdum orci luctus, a placerat mi pharetra. Praesent eu lacus vestibulum, placerat dolor at, ullamcorper arcu.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet imperdiet quam. Morbi non pharetra metus, ac venenatis ante. Nam finibus magna eu fringilla porttitor. Etiam vitae laoreet tellus. Proin a rutrum ex, eu tempus dolor. Proin blandit tempus metus nec suscipit. Phasellus ipsum tortor, sodales non vestibulum et, rutrum vel diam. In turpis sem, tempor vitae magna nec, luctus dapibus sapien. Maecenas a tellus a urna congue tempus.

                                        Etiam auctor ante malesuada elit bibendum, sed facilisis nunc rhoncus. Proin dolor turpis, condimentum ut arcu sit amet, volutpat rhoncus erat. In viverra magna a metus gravida vehicula. Quisque eu odio eu nunc tincidunt finibus nec id lorem. Suspendisse potenti. Duis rutrum ligula interdum orci luctus, a placerat mi pharetra. Praesent eu lacus vestibulum, placerat dolor at, ullamcorper arcu.</p>

                                    <div className="modal-action">
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReviewList;