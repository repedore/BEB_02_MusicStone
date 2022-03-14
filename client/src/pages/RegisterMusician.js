import { React, useState } from "react";
import axios from "axios";

function RegisterMusician({ account }) {
  const [email, setEmail] = useState("");
  const [musician, setMusician] = useState("");
  //   const [Kmusician, setKMusician] = useState("");
  //   const [Emusician, setEMusician] = useState("");
  const onChangeMusician = (e) => {
    setMusician(e.target.value);
  };
  //   const onChangeKMusician = (e) => {
  //     setKMusician(e.target.value);
  //   };
  //   const onChangeEMusician = (e) => {
  //     setEMusician(e.target.value);
  //   };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const saveMusician = async () => {
    if (musician && email && account) {
      await axios
        .post("http://localhost:3000/user/register", {
          musician,
          account,
          email,
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        });
    } else if (!account) alert("지갑을 연결해주세요.");
    else if (!musician || !email) {
      alert("정보를 입력해주세요.");
    }
  };
  return (
    <div>
      <div id="registerpage">
        <div>
          <input
            id="musicianinput"
            type="text"
            placeholder="뮤지션의 이름을 알려주세요."
            onChange={onChangeMusician}
          ></input>
        </div>
        {/* <div>
          <input
            id="musicianinput"
            type="text"
            placeholder="뮤지션의 영어 이름을 알려주세요."
            onChange={onChangeEMusician}
          ></input>
        </div> */}
        <div>
          <input
            id="emailinput"
            type="text"
            placeholder="이메일을 알려주세요."
            onChange={onChangeEmail}
          ></input>
        </div>
        <div>
          <button id="editbtn" onClick={saveMusician}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterMusician;
