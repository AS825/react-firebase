import { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { Auth } from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const { handleSubmit, register, reset } = useForm();
  const [fileUpload, setFileUpload] = useState();

  // Update
  const [updatedTitle, setUpdatedTitle] = useState();

  const moviesCollectionRef = collection(db, "movies");

  const onSubmit = async (data) => {
    try {
      const userId = auth?.currentUser?.uid;
      const docRef = await addDoc(moviesCollectionRef, {
        ...data,
        userId: userId,
      });
      console.log("Document written with ID: ", docRef.id);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  // console.log(movieList);

  const uploadFile = async() => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Firebase Tutorial</h1>
      <Auth />

      <div className="movie-creator">
        <h2>Movie Creator</h2>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Movie title.."
            type="text"
            {...register("title")} // Register the input field with the "title" name
          />
          <input
            placeholder="Release date"
            type="number"
            {...register("releaseDate")} // Register the input field with the "releaseDate" name
          />
          <label>
            Received an Oscar
            <input type="checkbox" {...register("receivedAnOscar")} />{" "}
            {/* Register the checkbox field with the "receivedAnOscar" name */}
          </label>
          <button type="submit">Submit Movie</button>
        </form>
      </div>

      <div className="Movies">
        <h3>MovieList</h3>
        {movieList?.map((movie, index) => (
          <div className="movie-card" key={index}>
            <p> Title: {movie.title}</p>
            <p> Releasedate: {movie.releaseDate}</p>
            <p>
              Received an Oscar: {movie.receivedAnOscar == true ? "yes" : "no"}
            </p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <div className="update">
              <input
                type="text"
                placeholder="new title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}>
                Update Title
              </button>
            </div>
          </div>
        ))}
         <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}> Upload File </button>
      </div>
      </div>
    </>
  );
}

export default App;
