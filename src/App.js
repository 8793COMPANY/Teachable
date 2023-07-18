import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
//import * as buffer from 'buffer';

//window.Buffer = buffer.Buffer;

export default function App() {
  const [messageFromAndroid, setMessageFromAndroid] = useState('Hello Vite + React!');

  //const title = document.getElementById("title");
  const dataSend = document.getElementById("data_button");

  // const imageUploadWrap = document.getElementsByClassName(".image-upload-wrap");
  // const fileUploadImage = document.getElementsByClassName("file-upload-image");
  // const fileUploadContent = document.getElementsByClassName("file-upload-content");
  // const image_box = document.getElementById('face-image');
  // let base64Image;

  useEffect(() => {
    const eventFromAndroid = async (event) => {
      setMessageFromAndroid(event.detail.data);
      //window.android.showToastMessage(event.detail.data);
      if ((event.detail.data != 'yes') && (event.detail.data != 'no')) {
        //readURL(this);
        //document.getElementById("face-image").onchange = event.detail.data;
        //document.getElementById("test").onchange = "readURL(event.detail.data);";
        //document.getElementById("check").readURL(event.detail.data);
        //document.querySelector("face-image").src = event.detail.data;
        //base64Image = event.detail.data.replace()
        var uri = event.detail.data;
        var decode = decodeURIComponent(uri);
        //var totalText = 'data:image/png;base64,' + decode;
        var totalText = 'data:image/jpeg;base64,' + decode;

        document.getElementById("upload").style.display = 'none';
        document.getElementById("face-image").setAttribute('src', totalText);
        document.getElementById("content").style.display = 'block';
        //title.innerText = "ok";

        window.android.showToastMessage("넘어감");

        //title.innerText = "완료";

        // $('.image-upload-wrap').hide();
        //   $('.file-upload-image').attr('src', e.target.result);
        //   $('.file-upload-content').show();
        //   $('.image-title').html(input.files[0].name);
      } else {
        //title.innerText = event.detail.data;
      }
    }

    // predict.onclick = function (value) {
    //   alert("value")
    // }

    const buttonClickHandler = () => {
      //alert(document.getElementById('label-container').innerText);
      if (window.android) {
        window.android.showToastMessage(document.getElementById('label-container').innerText);
        //alert("전송 완료");
      } else {
        alert("전송 실패");
      }
    };

    dataSend.addEventListener('click', buttonClickHandler);
    window.addEventListener('javascriptFunction', eventFromAndroid);

    if (window.android) {
      //window.android.showToastMessage("Hello Native Callback");
      window.android.callJavaScriptFunction();
    }

    return () => {
      window.removeEventListener('javascriptFunction', eventFromAndroid);
      dataSend.removeEventListener('click', buttonClickHandler);
    }

    //window.testImage = new CustomEvent("TestImage");

    // const nativeEventCallback = (event) => {
    //   alert('event receive from Native');

    //   window.android.showToastMessage(event.data.detail);
    // };

    //window.addEventListener("TestImage", nativeEventCallback);
    // window.addEventListener("TestImage", function testString(params) {
    //   window.android.showToastMessage(params.data.detail);
    // });

    // window.onerror = HandleError;

    // function HandleError(message, url, line) {
    //   var str = "An error has occurred in this dialog." + ""
    //     + "Error: " + line + "," + message;
    //   window.android.showToastMessage(str);
    //   return true;
    // } // Error 발생시 수행

    // const eventFromAndroid = async (event) => {
    //   //base64Image = Buffer.from(event.detail.data).toString();
    //   window.android.showToastMessage("실행됨");
    //   //window.android.showToastMessage(base64Image);

    //   // 이미지 파일 가져오기
    //   if (event.detail.data.indexOf("code_id:") != -1) {
    //     base64Image = event.detail.data.split(":")[1];

    //     window.android.showToastMessage("넘어가라");
    //   } else {
    //     window.android.showToastMessage("안넘어감");
    //   }
    // }

    // window.addEventListener('javascriptFunction', eventFromAndroid);

    // if (window.android) {
    //   window.android.showToastMessage("Hello Native Bye");
    //   //window.android.callJavaScriptFunction();
    //   //window.android.takePicture();
    //   window.android.getImage();
    // }

    // return () => {
    //   window.removeEventListener('javascriptFunction', eventFromAndroid);
    //   window.removeEventListener("TestImage", nativeEventCallback);
    // };
  }, []);
}