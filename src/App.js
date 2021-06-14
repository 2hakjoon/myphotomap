import styled from "styled-components";
import { KakaoMap } from "./component/mocules/KakaoMap";
import { connectDB, FB_dbTest } from "./firebase/fieBaseDB";
import { FB_login, connectAuth, getEmail } from "./firebase/fireBaseAuth";


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

const click = () => {
 
  FB_dbTest();
}

localStorage.removeItem("TOKEN");


function App() {
 
  connectAuth();
  FB_login();

  connectDB();
  

  return(
    <Container>

      <KakaoMap />
      <Button onClick={click}/>
    </Container>
  )
}

export default App;
