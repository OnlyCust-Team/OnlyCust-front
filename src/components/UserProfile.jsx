import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

function UserProfile({ userReviews }) {
    const { user } = useAuth0();
    const [openModalId, setOpenModalId] = useState(null);
    
    console.log(userReviews); // Para verificar las reseñas del usuario
    
    const toggleModal = (reviewId) => {
        setOpenModalId(openModalId === reviewId ? null : reviewId);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p>Name: {user.name}</p>
            <img src={user.picture} alt="User profile" className="rounded-full mt-4 mb-4" />
            <h3 className="text-xl font-bold mb-4">Your Reviews</h3>
            
            {userReviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {userReviews.map((review) => (
                        <div key={review._id}>
                            {/* Tarjeta de la reseña */}
                            <div className="card bg-base-100 shadow-xl" onClick={() => toggleModal(review._id)}>
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
                                </div>
                            </div>

                            {/* Modal de la reseña */}
                            {openModalId === review._id && (
                                <dialog open className="modal flex">
                                    <div className="modal-box">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => toggleModal(review._id)}>✕</button>
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
                                        <p className="py-4">{review.review}</p>
                                    </div>
                                </dialog>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <button className="btn btn-primary mt-4">Add your own review!</button>
            )}
        </div>
    );
}

export default UserProfile;
