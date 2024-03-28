"use client";
import { NavLinkContext } from "@/app/lib/context/LinkContext";
import { selectedPage } from "@/app/lib/util/selectedPage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Circle,
    InfoBox,
} from "@react-google-maps/api";
import { getServerSideProps } from "@/app/lib/constant/config";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 10.8227861,
    lng: 106.7823344,
};

export default function TrackingPage(): JSX.Element {
    const { stateLink, dispatchLink } = useContext(NavLinkContext);
    const { isLoaded } = useJsApiLoader({
        id: "71b0e381f4935a43",
        googleMapsApiKey: getServerSideProps().props.API_GOOGLE_MAPS as string,
    });
    const [map, setMap] = useState(null);
    const refMap = useRef(null);

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center);
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.BLOCK_END_INLINE_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.POLYLINE,
                    google.maps.drawing.OverlayType.RECTANGLE,
                ],
            },
            markerOptions: {
                icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            },
            circleOptions: {
                fillColor: "#ffff00",
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1,
            },
        });
        drawingManager.setMap(map);
        setMap(map);
    }, []);
    useEffect(() => {
        window.document.title = "Theo dõi";
        selectedPage(dispatchLink, 4);
        console.log(getServerSideProps().props.API_GOOGLE_MAPS);
    }, [dispatchLink]);

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null);
    }, []);
    const priceTag = (
        <div className="price-tag">
            <p>Giá: $2.5M</p>
            <p>Diện tích: 120m2</p>
        </div>
    );

    return isLoaded ? (
        <div className="w-full h-screen relative ">
            <GoogleMap
                onZoomChanged={() => {
                    console.log("zoom");
                }}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onUnmount={onUnmount}
                ref={refMap}
            >
                <Marker
                    position={center}
                    icon={{
                        url: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 390.723 390.723" xml:space="preserve" width="70px" height="70px" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#FFC10D;" d="M315.992,205.414h-97.034c18.941,17.907,28.703,41.762,33.616,65.034 c17.907-23.855,46.61-39.046,78.61-39.046c8.145,0,16.291,1.099,24.372,3.232C342.497,210.327,323.556,205.996,315.992,205.414z"></path> <path style="fill:#FFC10D;" d="M54.174,297.535c-17.907,0-32.517,14.61-32.517,32.517s14.61,32.517,32.517,32.517 s32.517-14.61,32.517-32.517C86.174,312.21,71.564,297.535,54.174,297.535z"></path> <path style="fill:#FFC10D;" d="M363.636,330.117c0-17.907-14.61-32.517-32.517-32.517s-32.517,14.61-32.517,32.517 s14.61,32.517,32.517,32.517S363.636,347.96,363.636,330.117z"></path> </g> <path style="fill:#56ACE0;" d="M369.067,160.42v23.273H194.004c4.331-13.576,17.325-23.273,32.517-23.273H369.067z"></path> <path style="fill:#FFFFFF;" d="M47.127,136.048v23.855c7.046-2.715,10.861-7.564,10.861-11.895 C57.988,143.677,54.174,138.764,47.127,136.048z"></path> <rect x="273.713" y="116.461" style="fill:#56ACE0;" width="94.836" height="22.238"></rect> <rect x="253.091" y="72.113" style="fill:#FFFFFF;" width="94.836" height="22.238"></rect> <rect x="273.713" y="28.218" style="fill:#56ACE0;" width="94.836" height="22.238"></rect> <g> <path style="fill:#194F82;" d="M54.174,275.879C24.372,275.879,0,300.251,0,330.053s24.372,54.174,54.174,54.174 s54.174-24.372,54.174-54.174C107.83,300.25,83.976,275.879,54.174,275.879z M54.174,362.053c-17.907,0-32.517-14.61-32.517-32.517 s14.61-32.517,32.517-32.517s32.517,14.61,32.517,32.517C86.174,347.96,71.564,362.053,54.174,362.053z"></path> <path style="fill:#194F82;" d="M331.119,275.879c-29.802,0-54.174,24.372-54.174,54.174s24.372,54.174,54.174,54.174 s54.174-24.372,54.174-54.174C385.358,300.25,360.921,275.879,331.119,275.879z M299.184,330.117 c0-17.907,14.61-32.517,32.517-32.517c17.907,0,32.517,14.61,32.517,32.517s-14.61,32.517-32.517,32.517 C313.794,362.634,299.184,347.96,299.184,330.117z"></path> <path style="fill:#194F82;" d="M379.345,72.113c5.947,0,10.861-4.848,10.861-10.861V17.358c0-5.947-4.848-10.861-10.861-10.861 H262.853c-5.947,0-10.861,4.848-10.861,10.861v33.034h-9.762c-5.947,0-10.861,4.848-10.861,10.861v43.895 c0,5.947,4.848,10.861,10.861,10.861h9.762v22.238h-25.988c-30.901,0-55.855,24.954-55.855,55.855l0,0 c0,4.331,2.715,8.663,7.046,10.279c54.174,20.04,57.988,80.743,56.889,108.929c-0.517,1.616-0.517,3.814-1.099,5.43h-81.261 c-4.848-44.994-40.081-80.743-84.558-86.691c4.848-21.657,14.093-68.267,14.61-114.36l28.186-15.192 c5.43-2.715,7.046-9.244,4.331-14.61c-2.715-5.43-9.244-7.046-14.61-4.331L66.069,101.98c-4.331,2.198-5.947,6.529-5.43,10.861 c0,0.517,0,3.814,0,5.43c-7.046-3.814-15.192-5.947-23.855-5.947c-5.947,0-10.861,4.848-10.861,10.861v49.325 c0,5.947,4.848,10.861,10.861,10.861c6.529,0,12.994-1.099,18.424-3.232c-3.232,22.756-7.564,41.762-9.762,51.459 c-14.093,1.099-27.669,5.43-39.564,12.477c-5.43,2.715-7.046,9.762-4.331,14.61c2.715,5.43,9.762,7.046,14.61,4.331 c11.378-6.529,24.372-9.762,37.947-9.762c42.279,0,76.929,34.715,76.929,76.929c0,5.947,4.848,10.861,10.861,10.861h101.883 c5.947,0,10.861-4.848,10.861-10.861c0-42.279,34.715-76.929,76.929-76.929c12.994,0,26.57,3.232,37.947,9.762 c9.244,4.848,17.907-3.814,15.709-12.477c-5.43-20.622-14.093-34.715-23.273-44.994h17.907c5.947,0,10.861-4.848,10.861-10.861 v-89.535c0-5.947-4.848-10.861-10.861-10.861h-9.762V72.048C370.166,72.113,379.345,72.113,379.345,72.113z M47.127,159.903 v-23.855c7.046,2.715,10.861,7.564,10.861,11.895C57.988,152.339,54.174,157.77,47.127,159.903z M331.119,231.467 c-32,0-60.703,15.192-78.61,39.046c-4.848-23.273-14.61-47.127-33.616-65.034h96.453c8.145,0.517,27.087,4.848,40.081,29.285 C347.927,232.501,339.265,231.467,331.119,231.467z M368.549,183.758H194.004c4.331-13.576,17.325-23.273,32.517-23.273h142.545 v23.273H368.549z M253.091,72.113h94.836v22.238h-94.836V72.113z M273.713,28.218h94.836v22.238h-94.836V28.218z M368.549,138.764 h-94.836v-22.238h94.836V138.764z"></path> </g> </g></svg>')}`,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    title="Shipper A"
                />
                <Marker
                    position={{
                        lat: 37.4220936,
                        lng: -122.083922,
                    }}
                    icon={{
                        url: `data:image/svg+xml;utf8,${encodeURIComponent('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 389.579 389.579" xml:space="preserve" width="70px" height="70px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#56ACE0;" d="M367.968,160.689v55.273H248.76V60.422h40.081c4.848,0,8.663,2.715,10.861,7.046l26.57,61.802 c5.43,12.477,17.325,20.04,30.384,20.04C363.119,149.311,367.968,154.741,367.968,160.689z"></path> <path style="fill:#FFFFFF;" d="M21.657,296.188h12.477c4.848-19.523,22.238-34.133,43.378-34.133s38.465,14.61,43.378,34.133 h136.598c4.848-19.523,22.238-34.133,43.378-34.133s38.465,14.61,43.378,34.133h24.372V238.2H21.657V296.188z"></path> <rect x="21.657" y="60.422" style="fill:#FFC10D;" width="205.964" height="156.057"></rect> <g> <path style="fill:#56ACE0;" d="M77.511,283.194c-12.477,0-22.756,10.279-22.756,22.756c0,12.477,10.279,22.756,22.756,22.756 s22.756-10.279,22.756-22.756C100.267,293.473,89.988,283.194,77.511,283.194z"></path> <path style="fill:#56ACE0;" d="M300.8,283.194c-12.477,0-22.756,10.279-22.756,22.756c0,12.477,10.279,22.756,22.756,22.756 s22.756-10.279,22.756-22.756C323.556,293.473,313.277,283.194,300.8,283.194z"></path> </g> <g> <path style="fill:#194F82;" d="M357.172,127.59c-4.848,0-8.663-2.715-10.861-7.046l-26.57-61.802 c-5.43-12.477-17.325-20.04-30.319-20.04H10.861C4.913,38.701,0,43.549,0,49.561v257.422c0,5.947,4.848,10.861,10.861,10.861 h23.273c4.848,18.941,22.238,33.034,42.796,33.034s37.947-14.093,42.796-33.034h137.632c4.848,18.941,22.238,33.034,42.796,33.034 c20.622,0,37.947-14.093,42.796-33.034h35.749c5.948,0,10.861-4.848,10.861-10.861V161.206 C390.206,142.782,375.014,127.59,357.172,127.59z M323.556,306.467c0,12.477-10.279,22.756-22.756,22.756 c-12.477,0-22.756-10.279-22.756-22.756c0-12.477,10.279-22.756,22.756-22.756C313.277,283.194,323.556,293.473,323.556,306.467z M100.267,306.467c0,12.477-10.279,22.756-22.756,22.756s-22.756-10.279-22.756-22.756c0-12.477,10.279-22.756,22.756-22.756 C89.988,283.194,100.267,293.473,100.267,306.467z M21.657,60.422H227.62v156.057H21.657V60.422z M249.277,60.422h39.564 c4.848,0,8.663,2.715,10.861,7.046l26.57,61.802c5.43,12.477,17.325,20.04,30.319,20.04c6.529,0,11.378,5.43,11.378,11.378v55.273 H248.76V60.422H249.277z M368.549,296.188h-24.372c-4.848-19.523-22.238-34.133-43.378-34.133s-38.465,14.61-43.378,34.133H120.307 c-4.848-19.523-22.238-34.133-43.378-34.133s-38.465,14.61-43.378,34.133H21.657V238.2h346.828v57.988H368.549z"></path> <path style="fill:#194F82;" d="M158.772,77.23c-4.331-4.331-10.861-4.331-15.192,0c-4.331,4.331-4.331,10.861,0,15.192l4.331,4.331 H92.638c-5.947,0-10.861,4.848-10.861,10.861c0,6.012,4.848,10.861,10.861,10.861h55.273l-4.331,4.331 c-4.331,4.331-4.331,10.861,0,15.192c4.331,4.331,10.861,4.331,15.192,0l22.756-22.756c4.331-4.331,4.331-10.861,0-15.192 L158.772,77.23z"></path> <path style="fill:#194F82;" d="M156.057,158.491h-54.691l4.331-4.331c4.331-4.331,4.331-10.861,0-15.192 c-4.331-4.331-10.861-4.331-15.192,0l-22.756,22.82c-4.331,4.331-4.331,10.861,0,15.192l22.756,22.756 c4.331,4.331,10.861,4.331,15.192,0c4.331-4.331,4.331-10.861,0-15.192l-4.331-4.331h55.273c5.947,0,10.861-4.848,10.861-10.861 C166.917,163.404,162.586,158.491,156.057,158.491z"></path> <path style="fill:#194F82;" d="M296.469,160.107h-19.523c-5.947,0-10.861,4.848-10.861,10.861c0,5.947,4.848,10.861,10.861,10.861 h19.523c5.947,0,10.861-4.848,10.861-10.861C307.265,165.02,302.416,160.107,296.469,160.107z"></path> </g> </g></svg>')}`,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    title="Shipper A"
                />
                <Marker
                    position={{
                        lat: 10.8227861,
                        lng: 106.7354544,
                    }}
                    icon={{
                        url: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 390.723 390.723" xml:space="preserve" width="70px" height="70px" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#FFC10D;" d="M315.992,205.414h-97.034c18.941,17.907,28.703,41.762,33.616,65.034 c17.907-23.855,46.61-39.046,78.61-39.046c8.145,0,16.291,1.099,24.372,3.232C342.497,210.327,323.556,205.996,315.992,205.414z"></path> <path style="fill:#FFC10D;" d="M54.174,297.535c-17.907,0-32.517,14.61-32.517,32.517s14.61,32.517,32.517,32.517 s32.517-14.61,32.517-32.517C86.174,312.21,71.564,297.535,54.174,297.535z"></path> <path style="fill:#FFC10D;" d="M363.636,330.117c0-17.907-14.61-32.517-32.517-32.517s-32.517,14.61-32.517,32.517 s14.61,32.517,32.517,32.517S363.636,347.96,363.636,330.117z"></path> </g> <path style="fill:#56ACE0;" d="M369.067,160.42v23.273H194.004c4.331-13.576,17.325-23.273,32.517-23.273H369.067z"></path> <path style="fill:#FFFFFF;" d="M47.127,136.048v23.855c7.046-2.715,10.861-7.564,10.861-11.895 C57.988,143.677,54.174,138.764,47.127,136.048z"></path> <rect x="273.713" y="116.461" style="fill:#56ACE0;" width="94.836" height="22.238"></rect> <rect x="253.091" y="72.113" style="fill:#FFFFFF;" width="94.836" height="22.238"></rect> <rect x="273.713" y="28.218" style="fill:#56ACE0;" width="94.836" height="22.238"></rect> <g> <path style="fill:#194F82;" d="M54.174,275.879C24.372,275.879,0,300.251,0,330.053s24.372,54.174,54.174,54.174 s54.174-24.372,54.174-54.174C107.83,300.25,83.976,275.879,54.174,275.879z M54.174,362.053c-17.907,0-32.517-14.61-32.517-32.517 s14.61-32.517,32.517-32.517s32.517,14.61,32.517,32.517C86.174,347.96,71.564,362.053,54.174,362.053z"></path> <path style="fill:#194F82;" d="M331.119,275.879c-29.802,0-54.174,24.372-54.174,54.174s24.372,54.174,54.174,54.174 s54.174-24.372,54.174-54.174C385.358,300.25,360.921,275.879,331.119,275.879z M299.184,330.117 c0-17.907,14.61-32.517,32.517-32.517c17.907,0,32.517,14.61,32.517,32.517s-14.61,32.517-32.517,32.517 C313.794,362.634,299.184,347.96,299.184,330.117z"></path> <path style="fill:#194F82;" d="M379.345,72.113c5.947,0,10.861-4.848,10.861-10.861V17.358c0-5.947-4.848-10.861-10.861-10.861 H262.853c-5.947,0-10.861,4.848-10.861,10.861v33.034h-9.762c-5.947,0-10.861,4.848-10.861,10.861v43.895 c0,5.947,4.848,10.861,10.861,10.861h9.762v22.238h-25.988c-30.901,0-55.855,24.954-55.855,55.855l0,0 c0,4.331,2.715,8.663,7.046,10.279c54.174,20.04,57.988,80.743,56.889,108.929c-0.517,1.616-0.517,3.814-1.099,5.43h-81.261 c-4.848-44.994-40.081-80.743-84.558-86.691c4.848-21.657,14.093-68.267,14.61-114.36l28.186-15.192 c5.43-2.715,7.046-9.244,4.331-14.61c-2.715-5.43-9.244-7.046-14.61-4.331L66.069,101.98c-4.331,2.198-5.947,6.529-5.43,10.861 c0,0.517,0,3.814,0,5.43c-7.046-3.814-15.192-5.947-23.855-5.947c-5.947,0-10.861,4.848-10.861,10.861v49.325 c0,5.947,4.848,10.861,10.861,10.861c6.529,0,12.994-1.099,18.424-3.232c-3.232,22.756-7.564,41.762-9.762,51.459 c-14.093,1.099-27.669,5.43-39.564,12.477c-5.43,2.715-7.046,9.762-4.331,14.61c2.715,5.43,9.762,7.046,14.61,4.331 c11.378-6.529,24.372-9.762,37.947-9.762c42.279,0,76.929,34.715,76.929,76.929c0,5.947,4.848,10.861,10.861,10.861h101.883 c5.947,0,10.861-4.848,10.861-10.861c0-42.279,34.715-76.929,76.929-76.929c12.994,0,26.57,3.232,37.947,9.762 c9.244,4.848,17.907-3.814,15.709-12.477c-5.43-20.622-14.093-34.715-23.273-44.994h17.907c5.947,0,10.861-4.848,10.861-10.861 v-89.535c0-5.947-4.848-10.861-10.861-10.861h-9.762V72.048C370.166,72.113,379.345,72.113,379.345,72.113z M47.127,159.903 v-23.855c7.046,2.715,10.861,7.564,10.861,11.895C57.988,152.339,54.174,157.77,47.127,159.903z M331.119,231.467 c-32,0-60.703,15.192-78.61,39.046c-4.848-23.273-14.61-47.127-33.616-65.034h96.453c8.145,0.517,27.087,4.848,40.081,29.285 C347.927,232.501,339.265,231.467,331.119,231.467z M368.549,183.758H194.004c4.331-13.576,17.325-23.273,32.517-23.273h142.545 v23.273H368.549z M253.091,72.113h94.836v22.238h-94.836V72.113z M273.713,28.218h94.836v22.238h-94.836V28.218z M368.549,138.764 h-94.836v-22.238h94.836V138.764z"></path> </g> </g></svg>')}`,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                />
                <Marker
                    position={{
                        lat: 10.8227861,
                        lng: 106.7324344,
                    }}
                    icon={{
                        url: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 390.723 390.723" xml:space="preserve" width="70px" height="70px" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#FFC10D;" d="M315.992,205.414h-97.034c18.941,17.907,28.703,41.762,33.616,65.034 c17.907-23.855,46.61-39.046,78.61-39.046c8.145,0,16.291,1.099,24.372,3.232C342.497,210.327,323.556,205.996,315.992,205.414z"></path> <path style="fill:#FFC10D;" d="M54.174,297.535c-17.907,0-32.517,14.61-32.517,32.517s14.61,32.517,32.517,32.517 s32.517-14.61,32.517-32.517C86.174,312.21,71.564,297.535,54.174,297.535z"></path> <path style="fill:#FFC10D;" d="M363.636,330.117c0-17.907-14.61-32.517-32.517-32.517s-32.517,14.61-32.517,32.517 s14.61,32.517,32.517,32.517S363.636,347.96,363.636,330.117z"></path> </g> <path style="fill:#56ACE0;" d="M369.067,160.42v23.273H194.004c4.331-13.576,17.325-23.273,32.517-23.273H369.067z"></path> <path style="fill:#FFFFFF;" d="M47.127,136.048v23.855c7.046-2.715,10.861-7.564,10.861-11.895 C57.988,143.677,54.174,138.764,47.127,136.048z"></path> <rect x="273.713" y="116.461" style="fill:#56ACE0;" width="94.836" height="22.238"></rect> <rect x="253.091" y="72.113" style="fill:#FFFFFF;" width="94.836" height="22.238"></rect> <rect x="273.713" y="28.218" style="fill:#56ACE0;" width="94.836" height="22.238"></rect> <g> <path style="fill:#194F82;" d="M54.174,275.879C24.372,275.879,0,300.251,0,330.053s24.372,54.174,54.174,54.174 s54.174-24.372,54.174-54.174C107.83,300.25,83.976,275.879,54.174,275.879z M54.174,362.053c-17.907,0-32.517-14.61-32.517-32.517 s14.61-32.517,32.517-32.517s32.517,14.61,32.517,32.517C86.174,347.96,71.564,362.053,54.174,362.053z"></path> <path style="fill:#194F82;" d="M331.119,275.879c-29.802,0-54.174,24.372-54.174,54.174s24.372,54.174,54.174,54.174 s54.174-24.372,54.174-54.174C385.358,300.25,360.921,275.879,331.119,275.879z M299.184,330.117 c0-17.907,14.61-32.517,32.517-32.517c17.907,0,32.517,14.61,32.517,32.517s-14.61,32.517-32.517,32.517 C313.794,362.634,299.184,347.96,299.184,330.117z"></path> <path style="fill:#194F82;" d="M379.345,72.113c5.947,0,10.861-4.848,10.861-10.861V17.358c0-5.947-4.848-10.861-10.861-10.861 H262.853c-5.947,0-10.861,4.848-10.861,10.861v33.034h-9.762c-5.947,0-10.861,4.848-10.861,10.861v43.895 c0,5.947,4.848,10.861,10.861,10.861h9.762v22.238h-25.988c-30.901,0-55.855,24.954-55.855,55.855l0,0 c0,4.331,2.715,8.663,7.046,10.279c54.174,20.04,57.988,80.743,56.889,108.929c-0.517,1.616-0.517,3.814-1.099,5.43h-81.261 c-4.848-44.994-40.081-80.743-84.558-86.691c4.848-21.657,14.093-68.267,14.61-114.36l28.186-15.192 c5.43-2.715,7.046-9.244,4.331-14.61c-2.715-5.43-9.244-7.046-14.61-4.331L66.069,101.98c-4.331,2.198-5.947,6.529-5.43,10.861 c0,0.517,0,3.814,0,5.43c-7.046-3.814-15.192-5.947-23.855-5.947c-5.947,0-10.861,4.848-10.861,10.861v49.325 c0,5.947,4.848,10.861,10.861,10.861c6.529,0,12.994-1.099,18.424-3.232c-3.232,22.756-7.564,41.762-9.762,51.459 c-14.093,1.099-27.669,5.43-39.564,12.477c-5.43,2.715-7.046,9.762-4.331,14.61c2.715,5.43,9.762,7.046,14.61,4.331 c11.378-6.529,24.372-9.762,37.947-9.762c42.279,0,76.929,34.715,76.929,76.929c0,5.947,4.848,10.861,10.861,10.861h101.883 c5.947,0,10.861-4.848,10.861-10.861c0-42.279,34.715-76.929,76.929-76.929c12.994,0,26.57,3.232,37.947,9.762 c9.244,4.848,17.907-3.814,15.709-12.477c-5.43-20.622-14.093-34.715-23.273-44.994h17.907c5.947,0,10.861-4.848,10.861-10.861 v-89.535c0-5.947-4.848-10.861-10.861-10.861h-9.762V72.048C370.166,72.113,379.345,72.113,379.345,72.113z M47.127,159.903 v-23.855c7.046,2.715,10.861,7.564,10.861,11.895C57.988,152.339,54.174,157.77,47.127,159.903z M331.119,231.467 c-32,0-60.703,15.192-78.61,39.046c-4.848-23.273-14.61-47.127-33.616-65.034h96.453c8.145,0.517,27.087,4.848,40.081,29.285 C347.927,232.501,339.265,231.467,331.119,231.467z M368.549,183.758H194.004c4.331-13.576,17.325-23.273,32.517-23.273h142.545 v23.273H368.549z M253.091,72.113h94.836v22.238h-94.836V72.113z M273.713,28.218h94.836v22.238h-94.836V28.218z M368.549,138.764 h-94.836v-22.238h94.836V138.764z"></path> </g> </g></svg>')}`,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                />
                <Circle
                    center={center}
                    radius={1000}
                    options={{
                        fillColor: "#37a6f0",
                        fillOpacity: 0.1,
                        strokeColor: "#37a6f0",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                    }}
                />
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
}