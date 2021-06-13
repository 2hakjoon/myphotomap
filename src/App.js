import styled from "styled-components";
import { KakaoMap } from "./component/mocules/KakaoMap";
import { FB_login, connectAuth } from "./firebase/fireBaseAuth";

const Container = styled.div`


`

function App() {
    
  connectAuth();
  FB_login();
  return(
    <Container>

      <KakaoMap />
    </Container>
  )
}

export default App;
