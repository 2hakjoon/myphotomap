import { useEffect, useState } from "react";
import styled from "styled-components";
import { Img } from "../component/atoms/Img";
import { getPhoto } from "../firebase/fireBaseStorage";




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

const ImgContainer = styled.div`
    padding:10px;
    width: 70%; 
    height: 80%;
    display: flex;
    align-items: center;

`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    font-size: 100px;
    font-weight: 600;
    color: lightgray;
    cursor: pointer;
`




const getImgsFromStorage = async (setPhotos, photos) => {
    setPhotos([].concat([]))
    photos.map(async(photo)=>{
        const res = await getPhoto(photo)
        setPhotos(prev=>prev.concat(res))
    })
}

const leftClick = (setPhotoIndex) => {
    setPhotoIndex(prev => {
        if(prev===0){
            return prev;
        }
        else{
            return prev - 1
        }
    })
}


const rightClick = (setPhotoIndex, length) => {
    setPhotoIndex(prev => {
        if(prev===length-1){
            return prev;
        }
        else{
            return prev + 1
        }
    })
}


export const ShowPhoto = ({album}) => {

    
    const [photos, setPhotos] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(()=>{
        getImgsFromStorage(setPhotos, album.photos);
        console.log(photos)
    },[])


    return(
        <Wrapper id={"background"}>
            <ImgContainer>
            <Arrow onClick={e=>leftClick(setPhotoIndex)}>{"<"}</Arrow>
                {photos && photos.map((photo, idx) => {
                    if(photoIndex === idx){
                        return <Img key={idx} src={photo}/>
                    }
                })}
                <Arrow onClick={e=>rightClick(setPhotoIndex, photos.length)}>{">"}</Arrow>
            </ImgContainer>

        </Wrapper>
    )


}