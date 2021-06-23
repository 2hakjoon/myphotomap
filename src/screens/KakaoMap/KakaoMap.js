/*global kakao*/

import { useEffect, useState } from "react";
import styled from "styled-components";

const Div = styled.div` 
    width: 100vw;
    height: 100vh;
    .label{
        background-color: white;
    }
    .myMark{
        width: ${props => props.size*10}px;
        height: ${props => props.size*10}px;
        background-color: red;
    }
`;


export let Lat = ""
export let Lng = ""

export const KakaoMap = ({modalOpen}) => {
    let markers = [];
    const [imgSize, setImgSize] = useState(9);
    const clickevent = (e) => {
        if(e.target.id === "infoWindow"){
            modalOpen(true);
        }
        else if(e.target.id === "background"){
            modalOpen(false);
        }
        else{
            console.log(e)
        }
    }
    useEffect(() => {
        
        window.addEventListener("click", clickevent);

        var marker = new kakao.maps.Marker({})

        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(33.379441, 126.544072), // 지도의 중심좌표
                level: 9, // 지도의 확대 레벨
            };
        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption , kakao.maps.ControlPosition.TOPRIGHT);

        var content =
            '<div class ="label"><span class="left"></span><div class="myMark"></div><span class="right"></span></div>';

        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(33.379441, 126.544072);

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'zoom_changed', function() {        
            
            // 지도의 현재 레벨을 얻어옵니다
            setImgSize(map.getLevel());
            console.log(`현재 지도 레벨은 ${imgSize} 입니다`);
            
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
            
            console.log(message)

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
       
    },[]);

    return <Div id={"map"} size={imgSize}></Div>;
};
