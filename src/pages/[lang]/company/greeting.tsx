import {useTranslation} from "react-i18next";
// import greeting_images from "@/assets/images/contents/company/greeting_images.png";

const GreetingPage = () => {
  const {t} = useTranslation();

  return (<div className="greeting-wrap">
    <section>
      <div className="hgroup-wrap">
        <h2 className="f48-700-140">
          {t("greeting.welcome")}
        </h2>
      </div>
    </section>
    <section>
      {/* 20250602 : 현업 요청 이미지 영역 주석 */}
      {/* <div className="img-wrap">
        <img
          src={greeting_images}
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className="txt-wrap">
        <div className="tit f40-700-130">
          {t("greeting.marketLeader1")} <br className="pc-show"/>
          {t("greeting.marketLeader2")} {/*<br className="mo-show"/>*/}
          {t("greeting.marketLeader3")} <br className="pc-show"/>
          {t("greeting.marketLeader4")}
        </div>
        <div className="desc-wrap">
          <p>
            {t("greeting.companyMission")}
          </p>
          <br/>
          <p>
            {t("greeting.hello")}
          </p>
          <br/>
          <p>
            {t("greeting.globalPartnership")}
          </p>
          <br/>
          <p>
            {t("greeting.planet")}
          </p>
          <br/>
          <p>
            {t("greeting.futureCommitment")}
          </p>
          <br/>
          <p>
            {t("greeting.happy")}
          </p>
          <br />
          <p>
            {t("greeting.thankYou")}
          </p>
          <div className="sign-wrap">
            <p>
              {t("greeting.ceoTitle")}
            </p>
            {/* <p className="name">
              {t("greeting.ceoName")}
            </p> */}
          </div>
        </div>
      </div>
    </section>
  </div>);
};

export default GreetingPage;
