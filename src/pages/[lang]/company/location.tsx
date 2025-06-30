import { FC, useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import envConfig from "@/env-config.ts";

// interface Params {
//   lang?: string;
//   [key: string]: string | undefined;
// }

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markerPosition: google.maps.LatLngLiteral;
  markerTitle: string;
}

const Map: FC<MapProps> = ({ center, zoom, markerPosition, markerTitle }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (ref.current && !map && window.google) {
      const mapInstance = new google.maps.Map(ref.current, {
        center,
        zoom,
        mapId: "LOCATION_PAGE_MAP",
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
        content: `<div style="padding: 8px;"><strong>${markerTitle}</strong></div>`,
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

const LocationPage: FC = () => {
  const { t } = useTranslation();
  // const params = useParams<Params>();
  // const currentLang = params?.lang && ["ko", "en", "zh", "ja"].includes(params.lang) ? params.lang : "ko";
  const googleMapApiKey = `${envConfig.GOOGLE_MAP_API_KEY}`;
  const defaultCenter = { lat: 37.484196, lng: 126.876376 };
  const markerPosition = defaultCenter;
  const markerTitle = t("location.headOfficeTitle");

  // Wrapper의 render 함수에서 로딩 상태 관리
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <div>LOADING</div>;
      case Status.FAILURE:
        return <div>FAILURE</div>;
      case Status.SUCCESS:
        return <></>;
    }
  };

  return (
    <div className="location-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">{t("location.title")}</h2>
        </div>
      </section>
      <section>
        <div className="map-wrap">
          <Wrapper
            apiKey={googleMapApiKey}
            libraries={["marker"]}
            render={render}
          >
            <Map
              center={defaultCenter}
              zoom={16}
              markerPosition={markerPosition}
              markerTitle={markerTitle}
            />
          </Wrapper>
        </div>
        <div className="map-info">
          <div className="info-tit">
            <h3 className="f40-700-130">{t("location.headOfficeTitle")}</h3>
          </div>
          <ul className="info-wrap">
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-place"></i>
                {t("location.addressLabel")}
              </div>
              <div className="desc">
                <p>{t("location.headOfficeAddress")}</p>
              </div>
            </li>
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-call"></i>
                {t("location.phoneLabel")}
              </div>
              <div className="desc">
                <Link to="tel:+82269252033" aria-label="대표번호로 전화 걸기">
                  <span>02-6925-2033</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-email"></i>
                {t("location.emailLabel")}
              </div>
              <div className="desc">
                <p>cube@cuberefund.com</p>
              </div>
            </li>
            <li>
              <div className="tit f24-700-160">
                <i className="ico ico-fax"></i>
                {t("location.faxLabel")}
              </div>
              <div className="desc">
                <p>02-2038-2193</p>
              </div>
            </li>
          </ul>
        </div>
        {/* <ul className="go-link-wrap">
          <li>
            <p className="link-tit f20-700-140">{t("location.salesOfficeTitle")}</p>
            <p className="link-desc f16-400-160">
              {t("location.salesOfficeAddress")}
            </p>
            <a href="https://maps.app.goo.gl/ZWLzdHzFB9tNSQcz5" target="_blank" className="link-btn">
              <span className="f18-500-160">{t("location.viewMap")}</span>
              <i className="ico ico-top-right-arrow"></i>
            </a>
          </li>
          <li>
            <p className="link-tit f20-700-140">{t("location.refundInfoTitle")}</p>
            <p className="link-desc f16-400-160">{t("location.refundLocationDowntown")} / {t("location.refundLocationDeparture")}</p>
            <Link to={`/${currentLang}/traveler/announcement`} className="link-btn">
              <span className="f18-500-160">{t("location.learnMore")}</span>
              <i className="ico ico-top-right-arrow"></i>
            </Link>
          </li>
        </ul> */}
      </section>
    </div>
  );
};

export default LocationPage;
