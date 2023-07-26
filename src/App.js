import './App.css';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default function App() {
  const [messageFromAndroid, setMessageFromAndroid] = useState('Hello React!');
  const dataSend = document.getElementById("data_button");

  useEffect(() => {
    const eventFromAndroid = async (event) => {
      setMessageFromAndroid(event.detail.data);

      let type = event.detail.data.split("@@")[0];
      let type2 = event.detail.data.split("@@")[1];

      if ((type != 'yes') && (type != 'no')) {
        var uri = event.detail.data.split("@@")[0];
        var decode = decodeURIComponent(uri);
        var totalText = 'data:image/jpeg;base64,' + decode;

        document.getElementById("upload").style.display = 'none';
        document.getElementById("face-image").setAttribute('src', totalText);
        document.getElementById("content").style.display = 'block';

        window.android.showToastMessage("넘어감");
      } else {
        if (type2 != "" && type2 != "no link") {
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

    const buttonClickHandler = () => {
      if (window.android) {
        const predict_result = document.getElementById('label-container').innerText;
        const predict_model = document.getElementById('predict-model').innerText;

        window.android.showToastMessage(predict_result, predict_model);

        customAlert("데이터 전송 완료");
      } else {
        customAlert("데이터 전송 실패");
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

    dataSend.addEventListener('click', buttonClickHandler);
    window.addEventListener('javascriptFunction', eventFromAndroid);

    if (window.android) {
      window.android.callJavaScriptFunction();
    }

    return () => {
      dataSend.removeEventListener('click', buttonClickHandler);
      window.removeEventListener('javascriptFunction', eventFromAndroid);
    }
  }, []);
}