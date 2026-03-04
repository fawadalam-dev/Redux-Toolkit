import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "./features/todoSlice";
import { useEffect } from "react";
import axios from "axios";


function App() {
  const [newproductsform, setNewproductsform] = useState({
    id: "",
    name: "",
    price: 0,
    imageURL: "",
    des: "",
  });

  const handlenewproductformChange = (e) => {
    setNewproductsform({ ...newproductsform, [e.target.id]: e.target.value });
  }



  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");



  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo("");
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      fetchproducts(); // Refetch after delete
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const [products, setProducts] = useState([]);

  const fetchproducts = async () => {
    try {
      const apiRes = await axios.get("http://localhost:8000/products")
      const products = apiRes.data;
      setProducts(products);
      console.log(products);
    } catch (err) {
      console.error("something went wrong:");
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);


  async function saveproduct(e) {
    e.preventDefault();
    try {
      const apiRes = await axios.post("http://localhost:8000/products", {
        name: newproductsform.name,
        price: newproductsform.price,
        imageURL: newproductsform.imageURL,
        des: newproductsform.des
      })
      alert("product added successfully");
      fetchproducts(); // Refetch products after adding
    } catch (err) {
      console.error("something went wrong:");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 drop-shadow-lg">
          ToDo App with Redux Toolkit & Products
        </h1>
      <div className="products space-y-4 mb-8">
        {products.map((pr) => (
          <div key={pr.id} className="product-item flex justify-between items-center p-4 bg-white rounded-lg shadow-md border">
            <div className="flex items-center space-x-4">
              {pr.imageURL ? (
                <img src={pr.imageURL} alt={pr.name} className="w-16 h-16 object-cover rounded" />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">No Image</div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{pr.name}</h2>
                <p className="text-gray-800 font-bold">${pr.price}</p>
                <p className="text-gray-700 text-sm">{pr.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteProduct(pr.id)}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <form className="flex flex-col gap-6 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input 
              type="text" 
              placeholder="Enter product name" 
              id="name" 
              onChange={handlenewproductformChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input 
              type="number" 
              placeholder="Enter price" 
              id="price" 
              onChange={handlenewproductformChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
            />
          </div>
          <div>
            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input 
              type="text" 
              placeholder="Enter image URL" 
              id="imageURL" 
              onChange={handlenewproductformChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
            />
          </div>
          <div>
            <label htmlFor="des" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              name="des" 
              id="des" 
              rows={4} 
              placeholder="Enter product description"
              onChange={handlenewproductformChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all resize-none"
            ></textarea>
          </div>
          <button 
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:scale-105"
            onClick={saveproduct}
          >
            Add Product
          </button>
        </form>
      </div>
      <form
        onSubmit={handleAddTodo}
        className="flex gap-3 mb-8 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200"
      >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a new todo..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105"
        >
          Add Todo
        </button>
      </form>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl">
          ToDo List ({todos.length})
        </h2>

        <div className="divide-y divide-gray-200">
          {todos.map((todoItem) => (
            <div
              key={todoItem.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-800 flex-1 font-medium">{todoItem.text}</span>
              <button
                onClick={() => handleDeleteTodo(todoItem.id)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
