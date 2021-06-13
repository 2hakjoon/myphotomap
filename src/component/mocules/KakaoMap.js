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

let isLoaded = false;

export const KakaoMap = () => {

    const [imgSize, setImgSize] = useState(9);
    useEffect(() => {
        if (!isLoaded) {
            isLoaded = true;
            var mapContainer = document.getElementById("map"), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(33.379441, 126.544072), // 지도의 중심좌표
                    level: 9, // 지도의 확대 레벨
                };
            // 지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);

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
        }
    });

    return <Div id={"map"} size={imgSize}></Div>;
};
