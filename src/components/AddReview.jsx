import { useState } from 'react';
import axios from 'axios';

const AddReview = () => {
    const [product, setProduct] = useState('');
    const [review, setReview] = useState('');
    const [store, setStore] = useState('');
    const [price, setPrice] = useState('');
    const [stars, setStars] = useState(3);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product', product);
        formData.append('review', review);
        formData.append('store', store);
        formData.append('price', price);
        formData.append('stars', stars);
        if (image) formData.append('images', image);

        try {
            const response = await axios.post('http://localhost:3001/addReview', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error adding review: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Product name"
                required
                className="input input-bordered w-full"
            />
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review"
                className="textarea textarea-bordered w-full"
            ></textarea>
            <input
                type="text"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                placeholder="Store name"
                required
                className="input input-bordered w-full"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
                className="input input-bordered w-full"
            />
            <div className="rating">
                <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value={1}
                    onChange={() => setStars(1)}
                />
                <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value={2}
                    onChange={() => setStars(2)}
                />
                <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value={3}
                    onChange={() => setStars(3)}
                />
                <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value={4}
                    onChange={() => setStars(4)}
                />
                <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value={5}
                    onChange={() => setStars(5)}
                />
            </div>
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="file-input file-input-bordered w-full"
            />

            <button type="submit" className="btn btn-primary w-full">
                Submit Review
            </button>

            {message && <p className="text-center mt-2">{message}</p>}
        </form>
    );
};

export default AddReview;
