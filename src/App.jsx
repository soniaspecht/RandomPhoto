import { useState } from 'react'
import Botoncito from './components/botoncito'
import './App.css'

function App() {
  const [url, setUrl] = useState("");

  return (
    <div className="app">
      <img
        className="randomImg"
        src={url || `https://picsum.photos/1200/800?blur=1&random=${Math.floor(Math.random()*1e6)}`}
        alt="Random"
      />

      <div className="buttonContainer">
        <Botoncito
          emoji="👤"
          // La url por defecto es de thispersondoesnotexist.com
          onRandomImgFetch={(randomImgUrl) => {
            setUrl(randomImgUrl);
          }}
        />

        <Botoncito
          emoji="🌿"
          randomImgFunction={async () => {
            return `https://picsum.photos/seed/${Math.floor(Math.random()*1e9)}/1200/800`;
          }}
          onRandomImgFetch={(randomImgUrl) => {
            setUrl(randomImgUrl);
          }}
        />

        <Botoncito
          emoji="🦊"
          randomImgFunction={async () => {
            const res = await fetch('https://randomfox.ca/floof/');
            const data = await res.json();
            return data.image;
          }}
          onRandomImgFetch={(randomImgUrl) => {
            setUrl(randomImgUrl);
          }}
        />

        <Botoncito
          emoji="🐶"
          randomImgFunction={async () => {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            return data.message;
          }}
          onRandomImgFetch={(randomImgUrl) => {
            setUrl(randomImgUrl);
          }}
        />

        <Botoncito
          emoji="🐱"
          randomImgFunction={async () => {
            const isGif = Math.random() < 0.5;
            return "https://cataas.com/cat" + (isGif ? "/gif" : "") + "#nonce=" + Math.floor(Math.random()*1e10); // Nonce usado para no tirar de caché de la imagen
          }}
          onRandomImgFetch={(randomImgUrl) => {
            setUrl(randomImgUrl);
          }}
        />

        <Botoncito
          emoji="🐻"
          randomImgFunction={async () => {
            return "https://placebear.com/200/300#nonce=" + Math.floor(Math.random()*1e10); // Nonce usado para no tirar de caché de la imagen
          }}
          onRandomImgFetch={(randomImgUrl) => {
            setUrl(randomImgUrl);
          }}
        />
      </div>
    </div>
  )
}

export default App
