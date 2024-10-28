import { useState } from 'react';

const AddReview = () => {
    const [product, setProduct] = useState('');
    const [review, setReview] = useState('');
    const [store, setStore] = useState('');
    const [price, setPrice] = useState('');
    const [stars, setStars] = useState(0);
    const [images, setImages] = useState(null);

    const handleImageChange = (e) => {
        setImages(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product', product);
        formData.append('review', review);
        formData.append('store', store);
        formData.append('price', price);
        formData.append('stars', stars);
        if (images) {
            formData.append('images', images);
        }

        try {
            const response = await fetch('http://localhost:3001/addReview', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setProduct('');
                setReview('');
                setStore('');
                setPrice('');
                setStars(0);
                setImages(null);
            } else {
                throw new Error(data.message || 'Error creating review');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    className="input input-bordered w-full max-w-xs"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Review"
                    className="input input-bordered w-full max-w-xs"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Store Name"
                    className="input input-bordered w-full max-w-xs"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    required
                />
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Imagen</span>
                    </div>
                    <input
                        type="file"
                        className="file-input w-full max-w-xs"
                        onChange={handleImageChange}
                    />
                </label>

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
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full max-w-xs"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;