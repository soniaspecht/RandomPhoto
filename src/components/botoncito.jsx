export default function Botoncito({ randomImgFunction = () => {return "https://thispersondoesnotexist.com/#nonce=" + Math.floor(Math.random()*1e10)}, emoji = "🚶‍♂️", onRandomImgFetch = (url) => {console.log(url)}}) {
    return (
      <div className="botoncito" onClick={async () => {
            const randomImgUrl = await randomImgFunction();
            await onRandomImgFetch(randomImgUrl);
        }}>
            <p className="icon">
                {emoji}
            </p>
      </div>
    )
  }