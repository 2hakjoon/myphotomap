import { useEffect, useState } from "react"
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
    width: 90vw;
    height: 80vh;
    border-radius: 10px;
    background-color: white;
    position: absolute;
    padding : 50px;
`

const ImgWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow: auto;
`

const ImgBlock = styled.div`
    height : 95%;
    min-width: 500px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const CloseBtn = styled.div`
    width: 20px;
    height: 20px;
    position: right;
`

const ToolBar = styled.div`
    width: 100%;
    height: 40px;
    input{
        color: transparent;
    }
`


let fileNameArr = [];

const imgUploadHandler = (e, setImg) => {
    //console.log(e.target.files)
    fileNameArr=[];
    const fileListArr = []
    const fileList = e.target.files;
    const fileListLength = fileList['length'];
    const objImg = []
    for(let i=0; i<fileListLength; i++){
        fileListArr.push(fileList[i])
        objImg.push(URL.createObjectURL(fileList[i]))
    }
    setImg(prev=>[].concat(objImg))
    fileListArr.map((file)=>{
        uploadPhoto(file)
        fileNameArr.push(file.name)
    })
    //console.log(fileNameArr)
    e.target.value="";
}


const deleteImg = (e, setImg) => {
    setImg(prev => {
        const newArr = prev;
        newArr.splice(Number(e.target.id), 1);
        return ([].concat(newArr))
    })
    fileNameArr.splice(Number(e.target.id), 1);
    console.log(fileNameArr)
}





export const ImageModal = ({check, modal}) => {
    //console.log(album)

    const [img, setImg] = useState([]);

   
    const uploadToDB = async () => {
        if(fileNameArr.length!==0){
            try{
                const data ={
                    lat: Lat,
                    lng: Lng,
                    photos:fileNameArr
                } 
                await FB_dbUploadAlbums(data);
                await modal(false)
                check(prev=>!prev)
            }
            catch(err){
                console.log(err)
            }
            
        }
        else{
            window.alert("사진을 업로드해주세요")
        }
    }


    //console.log(img)
    return(
        <Wrapper id={"background"} >
            <Imgview>
                <ToolBar>
                    <input multiple="multiple" type="file" accept="image/gif, image/jpeg, image/png" onChange={(e)=>imgUploadHandler(e, setImg)}></input>
                    <button onClick={uploadToDB}>저장하기</button>
                </ToolBar>
                <ImgWrapper>
                {img ? <>
                    {img.map((val, idx)=>{
                        return(
                            <ImgBlock key={idx}>
                                <CloseBtn id={idx} onClick={e=>deleteImg(e, setImg)}>X</CloseBtn>
                                <Img src={val}/>
                            </ImgBlock>
                            )
                    })}
                    </>:null
                }
                </ImgWrapper>
            </Imgview>
        </Wrapper>
    )
}