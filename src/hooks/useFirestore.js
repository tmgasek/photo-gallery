import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    //unsub is assigned to a function used to unsub from the collection.
    //when we want to stop listening to that collection to retrieve documents
    //we wanna do it when we unmount the imagegrid cmp.
    const unsub = projectFirestore
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    //cleanup function, unsub from collection when we no longer use it.
    return () => unsub;
  }, [collection]);

  return { docs };
};

export default useFirestore;
