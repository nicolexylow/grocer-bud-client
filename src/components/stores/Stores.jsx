import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../config/firebase'
import { GoogleMap, LoadScript, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api'

const containerStyle = {
    width: '80%',
    height: '500px'
};
  
const center = {
    lat: -33.865143,
    lng: 151.209900
};

let position = {
    lat: 0,
    lng: 0
}

const Stores = () => {
    const [activeMarker, setActiveMarker] = useState(null);

    const markers = [
        {
            name: 'Woolworths Sydney Metcentre', 
            lat: -33.864258366246546,
            lng: 151.20675894917298
        }, 
        {
            name: 'Coles World Square', 
            lat: -33.87677145418483,
            lng: 151.20702695951303
        },
        {
            name: 'Ultimo Supermarket', 
            lat: -33.877025607158494,
            lng: 151.1981971222393
        },
        {
            name: 'Maloneys Grocer', 
            lat: -33.88601414120464,
            lng: 151.21383120668486
        },
        {
            name: 'Coles Broadway',
            lat: -33.881621273486296,
            lng: 151.1932522656968
        },
        {
            name: 'Milsons Point Supermarket',
            lat: -33.84518954506443,
            lng: 151.21232803659882
        }, 
        {
            name: 'Friendly Grocer & Liquor Store',
            lat: -33.87164561978309, 
            lng: 151.21904638777576
        }
    ];


    const setPosition = (lat, lng) => {
        position = {
            lat: lat,
            lng: lng
        }
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD8ndHvcaGNP42biLT_mY6zxMREoK_Nnko"
    })

    const handleClick = (marker) => {
        if (marker === activeMarker) {
            return
        }
        setActiveMarker(marker);
    }


    return isLoaded ? (
        <div>
            <NavBar />
            <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '30px'}}>Grocery stores in Sydney</h1>

            <div className='d-flex justify-content-center'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                    >

                        {markers.map((marker, i) => {
                            setPosition(marker.lat, marker.lng)
                            return <Marker position={position} onClick={() => handleClick(i)}>
                                {activeMarker === i ? (
                                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    <div>{marker.name}</div>
                                    </InfoWindow>
                                ) : null}
                            </Marker>
                        })}

                        
                        { /* Child components, such as markers, info windows, etc. */ }
                        <></>
                    </GoogleMap>
            </div>
        </div>
    ) : <></>
    
}

export default Stores

