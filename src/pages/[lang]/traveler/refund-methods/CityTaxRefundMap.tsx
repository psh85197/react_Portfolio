import { FC, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import envConfig from "@/env-config.ts";
import ico_address from "@/assets/images/icon/ico_address.png";
import {useTranslation} from "react-i18next";
interface CityTaxRefundMapPageProps {
  latitude?: number;
  longitude?: number;
  title?: string;
}
interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom: number;
  markerPosition?: google.maps.LatLngLiteral;
  markerTitle?: string;
}

const Map: FC<MapProps> = ({ center, zoom, markerPosition, markerTitle }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (ref.current && !map && window.google) {
      const mapInstance = new google.maps.Map(ref.current, {
        center,
        zoom,
        mapId: "CITY_TAX_REFUND_MAP",
      });
      setMap(mapInstance);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map && markerPosition && window.google) {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: markerPosition,
        title: markerTitle,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${markerTitle || "위치"}</strong></div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      return () => {
        marker.map = null;
      };
    }
  }, [map, markerPosition, markerTitle]);

  return <div ref={ref} style={{ width: "100%", height: "500px" }} />;
};

const CityTaxRefundMapPage: FC<CityTaxRefundMapPageProps> = ({ latitude, longitude, title }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const defaultCenter = { lat: 37.484196, lng: 126.876376 };
  const isValidLatLng = (lat?: number, lng?: number): boolean => {
    return (
      lat !== undefined &&
      lng !== undefined &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  };
  const isValid = isValidLatLng(latitude, longitude);
  const center = isValid ? { lat: latitude!, lng: longitude! } : defaultCenter;
  const markerPosition = isValid ? { lat: latitude!, lng: longitude! } : defaultCenter;
  const markerTitle = title || "위치";
  const [showError, setShowError] = useState(false);
  const googleMapApiKey = `${envConfig.GOOGLE_MAP_API_KEY}`;

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <>로딩중...</>;
      case Status.FAILURE:
        return <>에러 발생</>;
      case Status.SUCCESS:
        return <></>;
    }
  };
  useEffect(() => {
    if (open) {
      setShowError(!isValid);
    }
  }, [open, isValid]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn" >
          {t("refundLocationGuide.inCityRefundSection.viewOnMap")}
          <img
            src={ico_address}
            className="ico-refund"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{t("refundLocationGuide.viewLocationTitle")}</DialogTitle>
        </DialogHeader>
        <Wrapper
          apiKey={googleMapApiKey}
          libraries={["marker"]}
          render={render}
        >
          {showError ? (
            <div>
              잘못된 위치입니다.
            </div>
            ):(
            <Map
                center={center}
                zoom={16}
                markerPosition={markerPosition}
                markerTitle={markerTitle}
              />
            )}
        </Wrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CityTaxRefundMapPage;