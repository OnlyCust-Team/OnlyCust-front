import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Product() {
  const { slug } = useParams();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0(); // Añadir isAuthenticated aquí
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const createSlug = (name) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    };
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3001/review");
        const data = await response.json();
        const productsWithSlug = data.map((product) => ({
          ...product,
          slug: createSlug(product.name),
        }));

        const foundProduct = productsWithSlug.find(
          (item) => item.slug === slug
        );

        setProduct(foundProduct);

        console.log(foundProduct);
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

  const handleAddReviewClick = () => {
    if (isAuthenticated) {
      navigate("/allreviews", { state: { action: "addReview", product } });
    } else {
      alert("Para añadir una review, por favor inicia sesión.");
      loginWithRedirect();
    }
  };

  return (
    <div className="flex p-4 mt-4">
      <div className="w-1/4 p-2 bg-white border rounded border-silver">
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
      <div className="flex-1 ml-4 border bg-gray-800 mx-4  p-4 rounded">
        {" "}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Reviews</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-4 p-4"
            onClick={handleAddReviewClick}
          >
            Añadir tu review
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {product.reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-white border rounded border-silver p-4"
            >
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">
                  {timeAgo(review.created_at)}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-bold">{review.username}</p>
                <p className="flex-1 mx-4">{review.review}</p>
                <div>{renderStars(review.stars)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
