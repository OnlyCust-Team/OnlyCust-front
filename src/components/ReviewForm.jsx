
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function ReviewForm({ product }) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    review: "",
    stars: 1
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3001/addReview";

    const dataToSend = {
      productName: product.name,
      username: user.email,
      review: reviewData.review,
      stars: reviewData.stars ,
      created_at: new Date().toISOString()
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error("Error al enviar la reseña");
      }

      const data = await response.json();
      console.log("Reseña enviada con éxito:", data);

      // Mostrar mensaje de éxito
      setSuccessMessage("Reseña enviada con éxito!");

      // Redirigir a la página del producto después de 2 segundos
      setTimeout(() => {
        navigate(`/${product.slug}`);
      }, 2000);

    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md max-w-md mx-auto">
      {successMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
        <label className="block text-gray-400">Reseña Completa</label>
          <textarea
            name="review"
            value={reviewData.review}
            onChange={handleChange}
             className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
                   <div className="mb-4">
                   <label className="block text-gray-400">Calificación</label>
          <select
            name="stars"
            value={reviewData.stars }
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button type="submit"  className="btn btn-primary w-3/4 mx-auto mt-4">
          Enviar
        </button>
      </form>
    </div>
  );
}
export default ReviewForm;
