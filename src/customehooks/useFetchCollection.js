import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, orderBy("date", "desc"));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.code);
    }
  };

  useEffect(() => {
    getAllProducts();
  },[]);

  return { data, isLoading };
};

export default useFetchCollection;
