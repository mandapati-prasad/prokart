import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";


const useFetchDocument = (collection, itemId) => {
 const[item,setItem] = useState(null)

  const getDocument = async () => {
    const docRef = doc(db, collection, itemId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      setItem({id:itemId,...docSnap.data()})
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { item };
};

export default useFetchDocument;
