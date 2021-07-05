import { useState, useEffect } from 'react';
import {
  projectFirestore,
  projectStorage,
  timestamp,
} from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');

    //uploads file to the reference. async fn.
    //can attach listener to it to fire functions when certain events happen.
    //when state_changed event changes, we will fire a fn (second arg).
    //we geta snapshot obj, snapshot in time of the upload at that moment in time.
    //probably we'll fire it a few times during the put.
    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        //on error
        setError(err);
      },
      async () => {
        //on finish
        const url = await storageRef.getDownloadURL();
        //will save this in the database
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);
  return { progress, url, error };
};

export default useStorage;
