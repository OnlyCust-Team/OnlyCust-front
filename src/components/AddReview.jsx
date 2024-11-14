import { useState } from "react";

const AddReview = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [gama, setGama] = useState("");
  const [price, setPrice] = useState("");
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      name,
      brand,
      gama,
      price,
      stars,
      review,
      username,
      image: image ? URL.createObjectURL(image) : null,
    };

    try {
      const response = await fetch("/src/sample.json");
      const reviews = await response.json();

      reviews.push(newReview);

      alert("Review added successfully");
      setName("");
      setBrand("");
      setGama("");
      setPrice("");
      setStars(0);
      setImages(null);
      setReview("");
      setUsername("");
    } catch (error) {
      alert("Error writing file: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="input input-bordered w-full max-w-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Brand"
          className="input input-bordered w-full max-w-xs"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Gama"
          className="input input-bordered w-full max-w-xs"
          value={gama}
          onChange={(e) => setGama(e.target.value)}
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
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Imagen</span>
          </div>
          <input
            type="text"
            placeholder="Img Url"
            className="input input-bordered w-full max-w-xs"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
