import React, { useEffect, useState } from "react";
import styles from "./AddProducts.module.scss";
import Card from "../../card/Card";
import { db, storage } from "../../../firebase/config";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { selectProducts } from "../../../redux/slice/productSlice";
import { useSelector } from "react-redux";

const category = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: "",
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const [isid,setIsid] = useState(id)
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsid(id);
  })

  useEffect(() => {
    setProduct(detectForm(id, initialState, productEdit));
  },[isid]);

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(product.imageURL !== productEdit.imageURL){
      const productRef = ref(storage,productEdit.imageURL);
      deleteObject(productRef)
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        date: productEdit.date,
        editedAt:Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("product edited successfully")
      navigate("/admin/products")
    } catch (error) {
      setIsLoading(false);
      toast.error(error.code);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    const storageRef = ref(storage, `Prokartimg/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          console.log(product);
          toast.success("image uploaded successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(product);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        date: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("product uploaded successfully");
      // navigate("/admin/products")
    } catch (error) {
      setIsLoading(false);
      toast.error(error.code);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
        <Card className={styles.card}>
          <form action="" onSubmit={detectForm(id, addProduct, editProduct)}>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              placeholder="Product name"
              name="name"
              id="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="image">Product image</label>
            <Card className={styles.group}>
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `uploading${Math.floor(uploadProgress)}%`
                    : "uploaded"}
                </div>
              </div>

              <input
                type="file"
                placeholder="Product Image"
                accept="image/*"
                name="ImageURL"
                id="image"
                // required
                // value={product.imageURL}
                onChange={(e) => handleImgChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  placeholder="image URL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Product Price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="category">Product Category</label>
            <select
              name="category"
              id="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value="" defaultValue disabled>
                -- Choose Produt Category --
              </option>
              {category.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="company">Company/Brand:</label>
            <input
              type="text"
              placeholder="Product Compan"
              name="brand"
              id="company"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="desc">Product Description:</label>
            <textarea
              name="desc"
              id="desc"
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
              required
            ></textarea>

            <button type="submit" className="--btn --btn-red">
              {detectForm(id, "Add", "Edit")} Product
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
