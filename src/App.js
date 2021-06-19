import styled from "styled-components";
import { KakaoMap } from "./component/mocules/KakaoMap";
import { connectDB, FB_dbTest } from "./firebase/fieBaseDB";
import { FB_login, connectAuth, getEmail } from "./firebase/fireBaseAuth";
import { connectStorage, uploadPhoto } from "./firebase/fireBaseStorage";


const Container = styled.div`
position: relative;
input{
  top:50px;
left:50px;
  position: absolute;
  width: 100px;
  height : 100px;
  background-color: blue;
  z-index: 99999;

}

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


const upload = (e) => {
  console.log(e.target.files[0])
  uploadPhoto(e.target.files[0])
}

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
      <KakaoMap />
      <Button onClick={click}/>
      <input type="file" onChange={upload}></input>
    </Container>
  )
}

export default App;
