import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gama: "Alta",
    brand: "",
    price: 0,
    image: "",
    review: "",
    stars: 1
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productUrl = "http://localhost:3001/addProduct";
    const reviewUrl = "http://localhost:3001/addReview";

    const productData = {
      name: formData.name,
      gama: formData.gama,
      brand: formData.brand,
      price: formData.price,
      image: formData.image,
      created_at: new Date().toISOString()
    };

    const reviewData = {
      productName: formData.name,
      username: user.email,
      review: formData.review,
      stars: formData.stars ,
      created_at: new Date().toISOString()
    };

    try {
      // Enviar datos del producto
      const productResponse = await fetch(productUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      if (!productResponse.ok) {
        throw new Error("Error al enviar el producto");
      }

      const productResult = await productResponse.json();
      console.log("Producto enviado con éxito:", productResult);

      // Enviar datos de la reseña
      const reviewResponse = await fetch(reviewUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
      });

      if (!reviewResponse.ok) {
        throw new Error("Error al enviar la reseña");
      }

      const reviewResult = await reviewResponse.json();
      console.log("Reseña enviada con éxito:", reviewResult);

      // Mostrar mensaje de éxito
      setSuccessMessage("Producto y reseña enviados con éxito!");

      // Redirigir a la página del producto después de 2 segundos
      setTimeout(() => {
        navigate(`/${formData.name}`);
      }, 2000);

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
      <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-gray-400">Nombre del producto</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
        <label className="block text-gray-400">Gama</label>
          <select
            name="gama"
            value={formData.gama}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div>
        <label className="block text-gray-400">Marca</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
             className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
        <label className="block text-gray-400">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
        <label className="block text-gray-400">URL de la imagen</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
        <label className="block text-gray-400">Calificación</label>
          <select
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>
        <div>
        <label className="block text-gray-400">Reseña completa</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-3/4 mx-auto mt-4"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}  

export default ProductForm;
