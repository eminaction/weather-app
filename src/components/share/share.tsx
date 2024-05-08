import "react";
import "./share.css";
import { FacebookShare, WhatsappShare, TwitterShare } from "react-share-kit";

function Share() {
  return (
    <>
      <div className="facebook">
        <div className="social-share">
          <FacebookShare
            url={"http://localhost:5173/"}
            quote={"Checkout the Weather with Weather Wizard"}
            size={15}
          />
          <WhatsappShare url={"http://localhost:5173/"} size={15} />
          <TwitterShare url={"http://localhost:5173/"} size={15} />
        </div>
        <div className="share-title">
          <h6>SHARE WITH A FRIEND</h6>
        </div>
      </div>
    </>
  );
}

export default Share;
