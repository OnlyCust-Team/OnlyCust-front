import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

function UserProfile({ userReviews = [] }) {
    const { user } = useAuth0();
    const [openModalId, setOpenModalId] = useState(null);
    
    console.log(userReviews); // Verificar reseñas del usuario
    
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
                <div className="flex flex-col items-center mt-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/10845/10845508.png" alt="Add review icon" className="w-16 h-16 mb-2" />
                    <p className="text-lg font-semibold">Add your own review! :D</p>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
