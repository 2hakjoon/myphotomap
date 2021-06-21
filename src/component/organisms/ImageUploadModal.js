import { useState } from "react"
import styled from "styled-components"
import { FB_dbUploadAlbums } from "../../firebase/fieBaseDB"
import { getPhoto, uploadPhoto } from "../../firebase/fireBaseStorage"
import { Img } from "../atoms/Img"
import { Lat, Lng } from "./KakaoMap/KakaoMap"



const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color : rgba(125,125,125, 0.5);
    position : absolute;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
`


const Imgview = styled.div`
    width: 70vw;
    height: 70vh;
    background-color: red;
    position: absolute;
`

const ImgWrapper = styled.div`
    width: 500px;
    height: 500px;
`
let filename = "";

const imgUploadHandler = (e) => {
    console.log(e.target.files[0])
    uploadPhoto(e.target.files[0])
    filename = e.target.files[0].name;
}



export const ImageUploadModal = () => {

    const getImgFromStorage = async () => {
        const res = await getPhoto(filename);
        console.log(res)
        setImg(res)
    }

    const uploadToDB = () => {
        const data ={
            lat: Lat,
            lng: Lng,
            photos:["KakaoTalk_20210603_231522292.jpg","KakaoTalk_20210603_231522292.jpg"]
        } 
        FB_dbUploadAlbums(data);
    }

    const [img, setImg] = useState(undefined);

    return(
        <Wrapper id={"background"} >
            <Imgview>
                <input type="file" onChange={imgUploadHandler}></input>
                <button onClick={getImgFromStorage}>불러오기</button>
                <button onClick={uploadToDB}> DB 호출띠</button>
                <ImgWrapper>
                    <Img src={img}/>
                </ImgWrapper>
            </Imgview>
        </Wrapper>
    )
}