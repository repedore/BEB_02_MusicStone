import React from "react";
import YJ from "../img/YJ.png";
import CY from "../img/CY.png";
import UH from "../img/UH.png";
import CR from "../img/CR.png";
import musicstonelogo from "../img/musicstonelogo.png";

function Main() {
  return (
    <div id="mainpage">
      <div>
        <img className="mainimg" src={musicstonelogo} alt="profile" />
      </div>
      <div className="pagetitle">MUSIC STONE</div>
      <div id="maintext">
        <div className="text">
          기존의 중앙화된 음악 생태계에서는 노래에 대한 권리나 수익들이
          저작권자의 의지와 상관없이 음원 시장에 휩쓸리기 마련이었다.
        </div>
        <div className="text">
          물론 곡을 홍보하고 유통하는 유통사나 음원사이트들의 노력을 폄하하는
          것은 아니나 저작권자에게 10%가량의 수익이 돌아가는 현재 구조가
          합리적인가에는 의문점이 생긴다.
        </div>
        <div className="text">
          우리는 이러한 고민을 가진 사람들에게 또 하나의 활로를 열어주고 싶어 이
          프로젝트를 기획하게 되었다.
        </div>
        <div className="text">
          MusicStone은 탈중앙화된 음악스트리밍 및 음원NFT 거래 서비스로 기존
          생태계에서 벗어나 사람들끼리 직접 음원에 대한 권리를 주고받을 수
          있으며, 원한다면 해당 저작권을 분배하여 공동소유자들과 그 이익을
          함께할 수도 있다.
        </div>
        <div className="text">
          그리고 더 나아가 스트리밍을 통해 등록된 음원들이 기존의 시장을 거치지
          않고도 곡을 알릴 수 있도록 새로운 선택지를 추가해주는 것이 우리의 작은
          꿈이다.
        </div>
      </div>
    </div>
  );
}
export default Main;
