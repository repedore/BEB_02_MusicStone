import React from "react";
import YJ from "../img/YJ.png";
import CY from "../img/CY.png";
import UH from "../img/UH.png";
import CR from "../img/CR.png";

export function Main() {
  return (
    <div id="mainpage">
      <div>
        <div>
          <img className="memberimg" src={YJ} alt="member" />
          <span className="membername">YJ</span>
        </div>
        <div>
          <img className="memberimg" src={CY} alt="member" />
          <span className="membername">CY</span>
        </div>
        <div>
          <img className="memberimg" src={UH} alt="member" />
          <span className="membername">UH</span>
        </div>
        <div>
          <img className="memberimg" src={CR} alt="member" />
          <span className="membername">CR</span>
        </div>
      </div>
    </div>
  );
}
