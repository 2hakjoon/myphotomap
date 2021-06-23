import { useState } from "react"
import styled from "styled-components"
import { FB_dbUploadAlbums } from "../firebase/fieBaseDB"
import { getPhoto, uploadPhoto } from "../firebase/fireBaseStorage"
import { Img } from "../component/atoms/Img"
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
    background-color: white;
    position: absolute;
`

const ImgWrapper = styled.div`
    width: 500px;
    height: 500px;
`
let fileNameArr = [];

const imgUploadHandler = (e) => {
    console.log(e.target.files)
    const fileListArr = []
    const fileList = e.target.files;
    const fileListLength = fileList['length'];
    for(let i=0; i<fileListLength; i++){
        fileListArr.push(fileList[i])
    }
    fileListArr.map((file)=>{
        uploadPhoto(file)
        fileNameArr.push(file.name)
    })
    console.log(fileNameArr)
}



export const ImageUploadModal = () => {

    const getImgFromStorage = async () => {
        //const res = await getPhoto(filename);
        //console.log(res)
        //setImg(res)
    }

    const uploadToDB = () => {
        const data ={
            lat: Lat,
            lng: Lng,
            photos:fileNameArr
        } 
        FB_dbUploadAlbums(data);
    }

    const [img, setImg] = useState(undefined);

    return(
        <Wrapper id={"background"} >
            <Imgview>
                <input multiple="multiple" type="file" onChange={imgUploadHandler}></input>
                <button onClick={getImgFromStorage}>불러오기</button>
                <button onClick={uploadToDB}> DB 호출띠</button>
                <ImgWrapper>
                    <Img src={img}/>
                </ImgWrapper>
            </Imgview>
        </Wrapper>
    )
}