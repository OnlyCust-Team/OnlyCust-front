import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const createSlug = (name) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    };
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3001/review");
        const data = await response.json();
        const productsWithSlug = data.map((product) => ({
          ...product,
          slug: createSlug(product.name),
        }));

        const foundProduct = productsWithSlug.find((item) => item.slug === slug);

        setProduct(foundProduct);

        console.log(foundProduct)
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchProduct();
  }, [slug]);

  if (!product) {
    return <p>Product not found</p>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return (
      <div className="text-yellow-500 text-lg">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={`full-${i}`}>&#9733;</span>
          ))}
        {Array(5 - fullStars)
          .fill()
          .map((_, i) => (
            <span key={`empty-${i}`}>&#9734;</span>
          ))}
      </div>
    );
  };

  const timeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now - reviewDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Hace ${diffDays} días`;
  };

  return (
    <div className="flex p-4">
      <div className="w-1/4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded"
        />
        <div className="mt-2 flex items-center">
          <p className="mr-2 font-bold text-lg">{product.brand}</p>
          <button className="bg-blue-200 text-blue-800 px-6 py-0.5 rounded-full">
            {product.gama}
          </button>
        </div>
        <div className="mt-2 flex items-center">
          {renderStars(
            product.reviews.reduce((acc, review) => acc + review.stars, 0) /
            product.reviews.length
          )}
          <p className="ml-2">({product.reviews.length} reviews)</p>
        </div>
      </div>
      <div className="flex-1 ml-4 ">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <div className="grid grid-cols-2 gap-4 ">
          {product.reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-xl p-4 border-2 border-gray-950">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">
                  {timeAgo(review.created_at)}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="font-bold">{review.username}</p>
                  <div>{renderStars(review.stars)}</div>
                </div>
                <p className="flex-1 mx-4 max-h-40 overflow-y-auto ">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
