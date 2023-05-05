import { useState, useEffect, useCallback, useMemo } from "react";
import './App.css'

const Access_Key = "KtaBCaax24AOyvPr1NBTlXQ6EWqTj6hDkKZno3lxqLA";
const URL = `https://api.unsplash.com/photos/random/?client_id=${Access_Key}&count=`;
const IMG = 5;

function ImageGallery() {
  //ImageGallery se encargará de mostrar las imágenes de Unsplash.
  const [imgs, setImgs] = useState([]);
  const [loadedImgCount, setLoadedImgCount] = useState(IMG);
  //Utilizamos el hook useState para definir dos estados. El primer estado, "imgs", es un arreglo que almacenará las imágenes obtenidas de la API.
  //El segundo estado, "loadedImgCount", es un número que indica que las imágenes se han cargado actualmente.

  const fetchImg = useCallback(async () => {
    // Definimos una función "fetchImg" utilizando useCallback.
    //"fetchImg" realiza una llamada a la API de Unsplash para obtener imágenes aleatorias

    try {
      const response = await fetch(`${URL}${loadedImgCount}`);
      const data = await response.json();
      //convertimos la respuesta a formato JSON

      setImgs((prevImgs) => [...prevImgs, ...data]);
      //Actualizamos el estado "imgs" utilizando el valor anterior de "imgs" y los nuevos datos obtenidos. 

    } catch (error) {
      console.error(error);
      //Si se produce un error, se muestra un mensaje de error en la consola.
    }
  }, [loadedImgCount]);

  const memoizedFetchImg = useMemo(() => fetchImg, [fetchImg]);
  //Esto ayuda a evitar que la función se vuelva a crear cada vez que se renderiza el componente

  useEffect(() => {
    memoizedFetchImg();
  }, [memoizedFetchImg]);
  //llama a la función memoizada "memoizedFetchImg" cada vez que el componente se renderiza o "memoizedFetchImg" cambia.

  const handleLoadMore = () => {
    //handleLoadMore encargará de cargar más imágenes cuando el usuario haga clic en el botón "Mas Imagenes".

    setLoadedImgCount((prevCount) => prevCount + IMG);
  };
  //Esta función actualiza el estado "loadedImgCount" sumando el valor de "IMG".

  return (
    <div>
      {imgs.map((img) => (
        <li key={img.id}>
          <img key={img.id} src={img.urls.small} alt={img.alt_description} />
        </li>
        //contiene un mapeo del arreglo "imgs" que renderiza cada imagen como un elemento "img" con la URL y la descripción de la imagen.
      ))}
      <button onClick={handleLoadMore}>Mas Imagenes</button>
    </div>
  );
}

export default function Principal() {
  return (
    <div>
      <h1>Imagenes de Unsplash</h1>
      <ImageGallery />
    </div>
  );
}