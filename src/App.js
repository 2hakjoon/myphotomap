import { useEffect, useState } from "react";
import styled from "styled-components";
import { ImageModal } from "./screens/ImageModal";
import { KakaoMap } from "./screens/KakaoMap/KakaoMap";
import { connectDB, FB_dbGetAlbums } from "./firebase/fieBaseDB";
import { FB_login, connectAuth, getEmail } from "./firebase/fireBaseAuth";
import { connectStorage, uploadPhoto } from "./firebase/fireBaseStorage";
import { ShowPhoto } from "./screens/ShowPhoto";


const Container = styled.div`
position: relative;
 
`
const Button = styled.div`
  top:0px;
  left:0px;
  position: absolute;
  width: 100px;
  height : 100px;
  background-color: red;
  z-index: 99999;
`

localStorage.removeItem("TOKEN");


const init = async(setEmail) => {
 await connectAuth();
 await FB_login(setEmail);
 await connectDB();
 await connectStorage();

}

const getAlbum = async (setUserAlbum) => {
  const data = await FB_dbGetAlbums();
  //console.log(data)
  let arrData=[];
  for(let val in data){
    arrData.push(data[val])
  }
  setUserAlbum(null)
  console.log(arrData)
  setUserAlbum([].concat(arrData))
}

function App() {
  const [email, setEmail] = useState(undefined);
  const [modalType, setModalType] = useState(false);
  const [userAlbum, setUserAlbum] = useState(null);
  const [checkSave, setCheckSave] = useState(false);
  const [selectedId, setSelectedId] = useState();
  console.log(selectedId)

  useEffect(()=>{
    console.log("!")
    if(!email){
      init(setEmail)
    }
    else if(email && userAlbum){
      getAlbum(setUserAlbum)
    }
    else{
      getAlbum(setUserAlbum)
    }
  },[email, checkSave])

  return(
    <Container>
      {modalType === "upload" ? <ImageModal check={setCheckSave} modal={setModalType} /> : null}
      {modalType === "view" ? <ShowPhoto modal={setModalType}  album={userAlbum[selectedId]}/> : null}
      {userAlbum && <KakaoMap modalOpen={setModalType} albums={userAlbum} target={setSelectedId}/>}
    </Container>
  )
}

export default App;
