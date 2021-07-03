import styled from "styled-components"



const Wrapper = styled.div`
    width: 100%;
    height: fit-content;
`


const FlexWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    top : 0px;
    left: 0px;
`

const Sinput = styled.input`
    width: 100%;
    height: 50px;
`
const SButton = styled.button`
    width: 10%;
    height : 50px;
`



export const SearchBar = ({value, setValue, search}) => {
    return(
        <FlexWrapper>
            <Sinput value={value} onChange={e=>setValue(e.target.value)} />
            <SButton onClick={search}/>
        </FlexWrapper>

    )

}