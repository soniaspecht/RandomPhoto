import { useState } from 'react';
import Botoncito from './components/botoncito';
import './App.css';

function App() {
  const [url, setUrl] = useState("");

  // Servirá para la acción de cargar
  const [load, isLoading] = useState(false);

  // Para actualizar la imagen y la acción de cargar
  const updatePhoto = async (randomImgUrl) => {
    // La rueda de cargar comenzará
    isLoading(true);
    // Se intenta convertir la imagen 
    try {
      // Se obtiene la imagen , se tranforma en datos binarios y luego a b64
      const res = await fetch(randomImgUrl);
      const binary = await res.blob();
      const reader = new FileReader();
      // Se actualiza la imagen y se quitar la rueda de cargar
      reader.onloadend = () => {
        setUrl(reader.result);
        isLoading(false);
      };
      reader.readAsDataURL(binary);
    } catch {
      // Si no funciona, se pone la imagen direcatmanete y se elimina la rueda de cargar
      setUrl(randomImgUrl);
      isLoading(false);
    }
  };
 

  return (
    <div className="app">

      <div className="imageContainer">
        <img
          className="randomImg"
          src={url || `https://picsum.photos/1200/800?blur=1&random=${Math.floor(Math.random()*1e6)}`}
          alt="Random"
          // Para ocultar o mostrar el simbolo de cargar
          style={{ visibility: load ? 'hidden' : 'visible' }}
        />
        {load && <div className="loadSymbol"></div>}
      </div>

      <div className="buttonContainer">
        <Botoncito
          emoji="👤"
          // La url por defecto es de thispersondoesnotexist.com
          randomImgFunction={async () => "https://thispersondoesnotexist.com/#nonce=" + Math.floor(Math.random()*1e10)}
          onRandomImgFetch={updatePhoto}
        />

        
        <Botoncito
          emoji="🌿"
          randomImgFunction={async () => {
            return `https://picsum.photos/seed/${Math.floor(Math.random()*1e9)}/1200/800`;
          }}
          onRandomImgFetch={updatePhoto}
        />

        <Botoncito
          emoji="🦊"
          randomImgFunction={async () => {
            const res = await fetch('https://randomfox.ca/floof/');
            const data = await res.json();
            return data.image;
          }}
          onRandomImgFetch={updatePhoto}
        />

        <Botoncito
          emoji="🐶"
          randomImgFunction={async () => {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            return data.message;
          }}
          onRandomImgFetch={updatePhoto}
        />

        <Botoncito
          emoji="🐱"
          randomImgFunction={async () => {
            const isGif = Math.random() < 0.5;
            return "https://cataas.com/cat" + (isGif ? "/gif" : "") + "#nonce=" + Math.floor(Math.random()*1e10); // Nonce usado para no tirar de caché de la imagen
          }}
          onRandomImgFetch={updatePhoto}
        />

        <Botoncito
          emoji="🐻"
          randomImgFunction={async () => {
            return "https://placebear.com/200/300#nonce=" + Math.floor(Math.random()*1e10); // Nonce usado para no tirar de caché de la imagen
          }}
          onRandomImgFetch={updatePhoto}
        />

      </div>
    </div>
  );
}

export default App;
