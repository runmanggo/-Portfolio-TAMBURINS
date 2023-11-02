import React from "react";
import classes from "./footer.module.css";

import { Link } from "react-router-dom";

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:cs@tamburins.com";
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.footer__info}>
        주)아이아이컴바인드 | 사업자등록번호: 119-86-38589 | 대표자: 김한국 |
        <Link href="#" onClick={handleEmailClick}>
          cs@tamburins.com
        </Link>
      </div>
      <div className={classes.footer__info}>
        개인정보 보호 책임자: 정태호 | 호스팅 서비스 사업자: Aws |
        통신판매업신고: 제 2014-서울마포-1050 호 (
        <Link
          href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1198638589"
          target="_blank"
          rel="noopener noreferrer"
          className="n-footer__underline"
        >
          사업자정보확인&nbsp;
        </Link>
        ) |
        <Link
          to="https://www.tamburins.com/legals/privacy-policy.php"
          target="_blank"
          rel="noopener noreferrer"
          className="n-footer__underline"
        >
          &nbsp;개인정보처리방침 |&nbsp;
        </Link>
        <Link
          href="https://www.tamburins.com/legals/terms-and-conditions.php"
          target="_blank"
          rel="noopener noreferrer"
          className="n-footer__underline"
        >
          &nbsp;이용약관
        </Link>
      </div>
      <div className={classes.footer__info}>
        고객님의 안전한 현금자산 거래를 위하여 하나은행과 채무지급보증계약을
        체결하여 보장해드리고 있습니다.
      </div>
      <div className={classes.footer__info}>
        <span>© 탬버린즈</span>
        <span> 대한민국</span>
      </div>
    </footer>
  );
};

export default Footer;
