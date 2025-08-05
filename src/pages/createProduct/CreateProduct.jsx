import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, FileInput, Select } from "flowbite-react";
import { useCreateProductMutation } from "../../features/api/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const CreateProductPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formError, setFormError] = useState(null);

  const [createProduct, { isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();

  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0].id.toString()); // Set default to first category
        }
      } catch (err) {
        setFormError("Failed to load categories. Please try again.");
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle file selection and preview
  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      setFormError("At least one image is required.");
      return;
    }
    setImageFiles(files);
    setFormError(null);

    // Generate previews
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validate inputs
    if (!title || !description || price <= 0 || !categoryId || imageFiles.length === 0) {
      setFormError("All fields are required, and price must be greater than 0.");
      return;
    }

    // Validate categoryId
    if (!categories.find((cat) => cat.id === Number(categoryId))) {
      setFormError("Selected category is invalid.");
      return;
    }

    try {
      // Upload each image file to get URLs
      const imageUrls = [];
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch(
          "https://api.escuelajs.co/api/v1/files/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload image: ${file.name}`);
        }

        const uploadResult = await uploadResponse.json();
        imageUrls.push(uploadResult.location);
      }

      const newProduct = {
        title,
        price: Number(price),
        description,
        categoryId: Number(categoryId),
        images: imageUrls,
      };

      console.log("Submitting product:", newProduct); // Debug log

      await createProduct(newProduct).unwrap();
      // Clear form after successful submission
      setTitle("");
      setPrice(0);
      setDescription("");
      setCategoryId(categories.length > 0 ? categories[0].id.toString() : "");
      setImageFiles([]);
      setPreviews([]);
      toast.success("Product created successfully!");
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.message || "Failed to create product.";
      setFormError(errorMessage);
      console.error("Error:", err);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
        <div className="relative flex items-center justify-center mb-4">
          <Button
            type="button"
            onClick={handleGoBack}
            className="absolute left-0 bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4  "
          >
            <FaArrowLeft />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-zinc-900 dark:text-white">
            Create New Product
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </Label>
              <TextInput
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Title"
                required
              />
            </div>
            <div>
              <Label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </Label>
              <TextInput
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </Label>
            <TextInput
              id="description"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                disabled={categories.length === 0}
              >
                {categories.length === 0 ? (
                  <option value="">No categories available</option>
                ) : (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              </Select>
            </div>
            <div>
              <Label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Product Images
              </Label>
              <FileInput
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageFiles}
                className="mt-1"
                helpertext="Upload one or more images (PNG, JPG, GIF)"
              />
              {previews.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {previews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {formError && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {formError}
            </div>
          )}
          <Button
            type="submit"
            disabled={isLoading || categories.length === 0}
            className={`w-full ${isLoading || categories.length === 0 ? "bg-gray-400" : "bg-blue-600"}`}
          >
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </form>

        {isSuccess && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            Product created successfully!
          </div>
        )}
        {isError && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p>Error: Failed to create product.</p>
            <p className="text-sm">Details: {JSON.stringify(error)}</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProductPage;