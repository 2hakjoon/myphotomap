/*global kakao*/

import { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchBar } from "../../component/organisms/SearchBar";
import { SearchList } from "../../component/organisms/SearchList";
import { getPhoto } from "../../firebase/fireBaseStorage";

const Div = styled.div` 
    width: 100vw;
    height: 100vh;
    .label{
    }
    .myMark{
        width: ${props => 1000/(props.size*2)}px;
        height: ${props => 1000/(props.size*2)}px;
        background-color: none;
        border-radius : 47%;
    }
`;

const SearchBarWrapper = styled.div`
    width : 500px;
    height: fit-content;
    position: absolute;
    z-index: 3;
`
const FlexWrapper = styled.div`
    width : 100%;
    display: flex;

`

const SearchEnBtn = styled.div`
    height: 50px;
    width: 50px;
    position: absolute;
    left: 0px;
    top:0px;
    z-index: 2;
    background-color: gray;
`


export let Lat = ""
export let Lng = ""

let pointing;

let map;
export const KakaoMap = ({modalOpen, albums, target}) => {
    
    let markers = [];
    const [imgSize, setImgSize] = useState(9);
    const [searchVal, setSearchVal] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchEn, setSearchEn] = useState(false);

    const clickevent = (e) => {
        pointing = e.target.id
        const type = e.target.id.split(" ")[0];
        const id = e.target.id.split(" ")[1];
        console.log(e.target.id)
        if(type === "infoWindow"){
            modalOpen("upload");
        }
        else if(type === "background"){
            modalOpen(false);
        }
        else if(type === "myMark"){
            console.log("???")
            markers.map((val)=> val.close());
            target(id);
            marker.setMap(null)
            modalOpen("view");
        }
        else{
            console.log(e)
        }
    }


    const createCustomOverlay = (map, lat, lng, thumbnail, idx) => {
        var content =
        `<div class="myMark" id="myMark ${idx}" style="background-image: url(${thumbnail}); cursor:pointer; background-size: cover;"></div>`;
        
        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(lat, lng);
        
        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
        });
        customOverlay.setMap(map);
    }

    const addPhotoPin = async (map) => {
        albums.map(async (album, idx)=>{
            if(album.lat && album.lng && album.photos){
                console.log(album.photos[0])
                const res = await getPhoto(album.photos[0])
                console.log(res)

                createCustomOverlay(map, album.lat, album.lng, res, idx)
            }
        })
        
    }



    const SearchMap = () =>{
        var ps = new kakao.maps.services.Places(); 
        const place = searchVal
        ps.keywordSearch(place, placesSearchCB);
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(data, pagination)
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                //displayPlaces(data);
        
                // 페이지 번호를 표출합니다
                //displayPagination(pagination);
                setSearchResult([].concat(data))
        
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        
                alert('검색 결과가 존재하지 않습니다.');
                return;
        
            } else if (status === kakao.maps.services.Status.ERROR) {
        
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
        
            }
        }
    }

   
let panToPoint = (Lat,Lng) =>{
    console.log(Lat, Lng)
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(Lat, Lng);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
};
let marker = new kakao.maps.Marker({})
    useEffect(() => {
        window.addEventListener("click", clickevent);

        marker = new kakao.maps.Marker({})

        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(36.05024101738942, 127.52311227218215 ), // 지도의 중심좌표
                level: 13, // 지도의 확대 레벨
            };
            // 지도를 생성합니다
        map = new kakao.maps.Map(mapContainer, mapOption);

        addPhotoPin(map)

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다

        // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'zoom_changed', function() {        
            
            // 지도의 현재 레벨을 얻어옵니다
            setImgSize(map.getLevel());
            //console.log(`현재 지도 레벨은 ${imgSize} 입니다`);
            
        });

        //좌표 표시
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            markers.map((val)=> val.close());
            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng;
            
            Lat = latlng.getLat();
            Lng = latlng.getLng();
            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            
            //console.log(message)
            
            marker.setPosition(latlng);
            marker.setMap(map);
            
            var iwContent = `<div id="infoWindow" style="width:150px;text-align:center;padding:6px 0;"}>사진 저장</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwPosition = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()); //인포윈도우 표시 위치입니다
            
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                position : iwPosition, 
                content : iwContent
            });
            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            infowindow.open(map, marker); 
            markers.push(infowindow)
        });

       return() => {
        window.removeEventListener("click", clickevent);
       }
    },[]);

    return(
        <>
            <SearchEnBtn onClick={e=>setSearchEn(prev=>!prev)}>검색!</SearchEnBtn>
            {searchEn &&
                <SearchBarWrapper>
                        <FlexWrapper>
                            <SearchBar value={searchVal} setValue={setSearchVal} search={SearchMap}/>
                            <button onClick={e=>setSearchEn(prev=>!prev)}>닫기</button>
                        </FlexWrapper>
                        {searchResult.length > 0 ? <SearchList data= {searchResult} panToPoint={panToPoint}/> : null}
                </SearchBarWrapper>
            }
            <Div id={"map"} size={imgSize}></Div>
        </>
    );
};
