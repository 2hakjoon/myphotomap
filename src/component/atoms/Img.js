import styled from "styled-components"



const SImg = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
`


export const Img = ({src}) => {
    return <SImg  src={src}/>
}