import styled from "styled-components";
import { ImageUploadModal } from "./component/organisms/ImageUploadModal";
import { KakaoMap } from "./component/organisms/KakaoMap/KakaoMap";
import { connectDB, FB_dbTest } from "./firebase/fieBaseDB";
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


function App() {
 
  const provider = connectAuth();
  FB_login(provider);

  const db = connectDB();
  const click = () => {
    FB_dbTest(db);
  }

  connectStorage();

  

  return(
    <Container>
      <ImageUploadModal/>
      <KakaoMap />
      <Button onClick={click}/>

    </Container>
  )
}

export default App;
