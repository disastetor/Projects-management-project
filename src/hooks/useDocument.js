/* Hook to retrive real time data from documents (for example
    if someone add a comment to a project or something similar) */

import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //Real time data for document
  useEffect(() => {
    //Take the reference of the document
    const ref = projectFirestore.collection(collection).doc(id);

    //use onSnapshot method to get real time updates
    //it is stored in the unsubscribe const because of the cleanup function we need to call to unsubscribe
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        //Check if there is data on the document we are gonna look
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        }else{
            setError('This document does not exist')
        }
      },
      (error) => {
        //Handle error
        console.log(error.message);
        setError("Failed to get document");
      }
    );

    //unmount the function
    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
