using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;

public class WSVoiceRecording : MonoBehaviour
{

    private WebSocket ws_;

    private void Awake()
    {
        //connect 
        ws_ = new WebSocket("ws://192.168.0.103:12002");

        //On catch message event
        ws_.OnMessage += (sender, e) =>
        {
            Debug.Log(e.Data); // 認識結果
            

        };
        ws_.Connect();
    }

    private void OnApplicationQuit()
    {

        ws_.Close();
    }

}
