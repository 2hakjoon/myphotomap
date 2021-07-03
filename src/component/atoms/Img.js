import styled from "styled-components"



const SImg = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${props => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x : 50%;
    background-position-y : 50%;
`


export const Img = ({src}) => {
    return <SImg  src={src}/>
}