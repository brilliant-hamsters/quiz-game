import { useState } from "react";
import { Button } from "../Button";
import styles from './Maps.module.scss'


export const Maps = () => {
  const [currentPosition, setPosition] = useState({
    latitude: localStorage.getItem('latitude'),
    longitude: localStorage.getItem('longitude')
  })

  const yourPosition = () => {

    const success = (pos) => {
      if(!localStorage.getItem('coord') && pos.coords) {
        setPosition(pos.coords);
        localStorage.setItem('latitude', pos.coords.latitude,)
        localStorage.setItem('longitude', pos.coords.longitude,)
      }
    };
      
    const error = (err: { code: number; message: string; }) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
      
    navigator.geolocation.getCurrentPosition(success, error)
  }

  return (
        <div className={styles.root}>
          <iframe
            src={`
                https://yandex.ru/map-widget/v1/?ll=43.895058%2C56.325173
                &mode=poi
                &poi%5Bpoint%5D=
                ${currentPosition.longitude}
                %2C${currentPosition.latitude}
                &z=13`
              }
            width="450"
            height="300"
            frameBorder={1}
            allowFullScreen={true}
            style={{ position: 'relative' }} 
          />
          <Button 
              classButton={"widthButton"} 
              buttonName={""} 
              disabled={false} 
              onClick={yourPosition}
              >
              Узнать свое местоположение
          </Button>
        </div>
  )
}
