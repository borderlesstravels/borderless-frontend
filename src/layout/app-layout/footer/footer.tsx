import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DownloadAppstoreFooter,
  DownloadPlaystoreFooter,
  LogoGold,
} from "../../../assets/images";
import { Path } from "../../../navigations/routes";
import "./footer.scss";

function Footer(props: any) {
  useEffect(() => {}, [props]);

  return (
    <div className="footer">
      <div className="footer-bg"></div>
      <div className="footer-content row holder-1100">
        <div className="col-lg-5 col-md-6">
          <div className="imh max250">
            <img src={LogoGold} alt="" />
          </div>
          <div className="spread-info max200 mt-2">
            <a href="">
              <div className="icon">
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
              </div>
            </a>
            <a href="">
              <div className="icon icon-orange">
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </div>
            </a>
            <a href="">
              <div className="icon">
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </div>
            </a>
          </div>
          <p className="cool-footer-text">
            Seamless booking, <br />
            boundless adventures
          </p>
          <div className="info-grid max250">
            <div className="imh clickable-btn">
              <img src={DownloadPlaystoreFooter} alt="" />
            </div>
            <div className="imh clickable-btn">
              <img src={DownloadAppstoreFooter} alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-6">
          <div className="row pt-5">
            <div className="col-lg-4 content-column">
              <h6>Company</h6>
              <p>
                <Link to={`/${Path.about}`}>About</Link>
              </p>
              <p>
                <Link to={`/${Path.careers}`}>Careers</Link>
              </p>
              <p>
                <Link to={`/${Path.partners}`}>Partners</Link>
              </p>
              <p>
                <Link to={`/${Path.privacyPolicy}`}>Privacy Policy</Link>
              </p>
            </div>
            <div className="col-lg-4 content-column">
              <h6>Contact</h6>
              <p>
                <Link to={`/${Path.help}`}>Help</Link>
              </p>
              <p>
                <Link to={`/${Path.contact}`}>Contact</Link>
              </p>
              <p>
                <Link to={`/${Path.faq}`}>FAQ</Link>
              </p>
            </div>
            <div className="col-lg-4 content-column">
              <h6>More</h6>
              <p>
                <Link to={`/${Path.offers}/${Path.skyRewards}`}>
                  Sky Rewards
                </Link>
              </p>
              <p>
                <Link to={`/${Path.offers}/${Path.skyflexPay}`}>
                  Skyflex Pay
                </Link>
              </p>
              <p>
                <Link to={`/${Path.offers}/${Path.travelOnCredit}`}>
                  Travel on Credit
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="holder-1100 spread-info foot">
        <p>Copyright, Borderless 2023. All rights reserved.</p>
        <Link to={`/${Path.terms}`}>
          <p>Terms & Conditions</p>
        </Link>
      </div>
    </div>
  );
}
export default Footer;
