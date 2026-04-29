import './App.css';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default function App() {
  const [messageFromAndroid, setMessageFromAndroid] = useState('Hello React!');
  // const dataSend = document.getElementById("data_button");

  useEffect(() => {
    const dataSend = document.getElementById("data_button");

    const eventFromAndroid = async (event) => {
      setMessageFromAndroid(event.detail.data);

      let type = event.detail.data.split("@@")[0];
      let type2 = event.detail.data.split("@@")[1];

      if ((type !== 'yes') && (type !== 'no')) {
        var uri = event.detail.data.split("@@")[0];
        var decode = decodeURIComponent(uri);
        var totalText = 'data:image/jpeg;base64,' + decode;

        // document.getElementById("upload").style.display = 'none';
        // document.getElementById("face-image").setAttribute('src', totalText);
        // document.getElementById("content").style.display = 'block';

        // window.android.showToastMessage("넘어감");

        const image = document.getElementById("select-image");
        const uploadWrap = document.querySelector(".image-upload-wrap");
        const uploadContent = document.querySelector(".file-upload-content");

        if (!image) {
          console.error("select-image 요소를 찾지 못했습니다.");
          customAlert("이미지 표시 영역을 찾지 못했습니다.");
          return;
        }

        image.onload = async () => {
          console.log("앱 이미지 로드 완료");
          console.log("naturalWidth:", image.naturalWidth);
          console.log("naturalHeight:", image.naturalHeight);
          console.log("src length:", image.src.length);

          if (uploadWrap) uploadWrap.style.display = "none";
          if (uploadContent) uploadContent.style.display = "block";

          console.log("앱 이미지가 select-image에 반영됨. 이제 분석 버튼을 눌러 테스트하세요.");

          // if (typeof window.predict === "function") {
          //   console.log("predict 실행");
          //   await window.predict();
          // } else {
          //   console.log("predict 함수 없음");
          // }
        };

        image.onerror = () => {
          console.error("앱 이미지 로드 실패");
          customAlert("앱에서 받은 이미지를 불러오지 못했습니다.");
        };

        console.log("앱에서 받은 base64 길이:", totalText.length);
        console.log("base64 앞부분:", totalText.substring(0, 50));
        // image.src = totalText;
        image.src = totalText + "#t=" + new Date().getTime();
      } else {
        if (type2 !== "" && type2 !== "no link") {
          let type3 = type2.split("/")[4];
          //URL 변경
          //customAlert("저장된 URL 모델\n" + type2); //전체 URL을 보여주는 경우
          customAlert("저장된 URL 모델\n" + type3); //URL 뒷부분만 보여주는 경우
          document.getElementById('predict-model').innerText = "https://teachablemachine.withgoogle.com/models/" + type3 + "/";;
        } else {
          customAlert("모델을 먼저 연동해주세요!");
        }
      }
    }

    // 앱 버전
    // const buttonClickHandler = () => {
    //   if (window.android) {
    //     const predict_result = document.getElementById('label-container').innerText;
    //     const predict_model = document.getElementById('predict-model').innerText;

    //     window.android.showToastMessage(predict_result, predict_model);

    //     customAlert("데이터 전송 완료");
    //   } else {
    //     customAlert("데이터 전송 실패");
    //   }
    // };

    // 웹 버전
    const buttonClickHandler = () => {
      const predict_result = document.getElementById('label-container').innerText;
      const predict_model = document.getElementById('predict-model').innerText;

      console.log("분석 결과:", predict_result);
      console.log("사용 모델:", predict_model);

      if (window.android) {
        window.android.showToastMessage(predict_result, predict_model);
        customAlert("데이터 전송 완료");
      } else {
        console.log("PC 브라우저 테스트라 Android 전송 생략");
      }
    };

    function customAlert(getText) {
      swal({
        text: getText,
        buttons: {
          confirm: "확인",
        },
      })
    }

    // dataSend.addEventListener('click', buttonClickHandler);
    if (dataSend) {
      dataSend.addEventListener('click', buttonClickHandler);
    }
    window.addEventListener('javascriptFunction', eventFromAndroid);

    if (window.android) {
      window.android.callJavaScriptFunction();
    }

    return () => {
      // dataSend.removeEventListener('click', buttonClickHandler);
      // window.removeEventListener('javascriptFunction', eventFromAndroid);
      if (dataSend) {
        dataSend.removeEventListener('click', buttonClickHandler);
      }
      window.removeEventListener('javascriptFunction', eventFromAndroid);
    }
  }, []);

  return null;
}