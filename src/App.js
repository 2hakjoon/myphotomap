import { useEffect, useState } from "react";
import styled from "styled-components";
import { ImageUploadModal } from "./screens/ImageUploadModal";
import { KakaoMap } from "./screens/KakaoMap/KakaoMap";
import { connectDB, FB_dbGetAlbums } from "./firebase/fieBaseDB";
import { FB_login, connectAuth, getEmail } from "./firebase/fireBaseAuth";
import { connectStorage, uploadPhoto } from "./firebase/fireBaseStorage";


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


const init = async() => {
 connectAuth();
 FB_login();

 connectDB();
 connectStorage();
  
  //const data = await FB_dbGetAlbums();
  //console.log(data)
}

function App() {
  
  const [uploadModal, setUploadModal] = useState(false);
  const [userAlbum, setUserAlbum] = useState({});
  
  const click = () => {
  }
  useEffect(()=>{
    init()
  },[])

  return(
    <Container>
      {uploadModal ? <ImageUploadModal /> : null}
      <KakaoMap modalOpen={setUploadModal} />
      <Button onClick={click}/>
    </Container>
  )
}

export default App;
