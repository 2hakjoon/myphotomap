import styled from "styled-components"



const Wrapper = styled.div`
width: 100%;
height: 93vh;
overflow: auto;
`
const SearchReults  = styled.ul`
width: 100%;
height: fit-content;
`
const SearchItem = styled.li`
width: 100%;
height : 100px;
background-color: white;
`



export const SearchList = ({data})=> {
    console.log(data)
    return(
        <Wrapper>
            <SearchReults>
                {data.map((val,idx)=> {
                    return <SearchItem key={val.id}>
                        {val.address_name}
                        </SearchItem>
                })}
            </SearchReults>
        </Wrapper>
    )

}