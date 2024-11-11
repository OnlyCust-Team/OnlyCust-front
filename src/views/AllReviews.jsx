import { useLocation } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ReviewForm from "../components/ReviewForm";

function AllReviews() {
  const location = useLocation();
  const state = location.state || {};
  const { action, product } = state;

  return (
    <div className="p-4">
      {action === "newProduct" ? (
        <ProductForm />
      ) : (
        <ReviewForm product={product} />
      )}
    </div>
  );
}

export default AllReviews;
