const express = require("express");
const app = express();

let busyo ='';
let nname ='';
let bukken ='';
let sagyou ='';
let ninku ='';

app.use(express.urlencoded({extended:true}));

const port = process.env.PORT||5000;

app.listen(port,()=>{
    console.log('Listening on ${port}');
});

app.get("/",(req,res)=>{
 res.sendFile(__dirname+"/index.html");

});

app.post("/",(req,res)=>{

  busyo = req.body.busyoname;
  nname = req.body.nname;
  bukken = req.body.bukkenname;
  sagyou = req.body.sagyouname;
  ninku = req.body.ninku;
  

  'use strict';
  const { KintoneRestAPIClient } = require('@kintone/rest-api-client');

  const APIToken = process.env.APIToken;

  
  
  const client = new KintoneRestAPIClient({
    baseUrl: 'https://as8o1urb84vz.cybozu.com',
    auth: {
      apiToken:APIToken
    }
  });
  
  const appId = 10; // target appID
  const recordId = 1;
  
  const params = {
    app: appId,
    id: recordId
  };
  
  // レコードの取得
  client.record.getRecord(params).then((resp) => {
    console.log(resp.record.テーブル);
    //console.log(resp.record.テーブル.value[0].value.部署名.value);
  }).catch((err) => {
    console.log(err);
  });
  
  //レコードの追加
  client.record.addRecord({
      app: appId,
      record: {
        物件名: {
          value: bukken       
        },
        "テーブル": {
            "value": [
              {
                "value": {
                  "部署名": {
                    "value": busyo
                  }
                }
              }
            ]
          }
      }
    })   
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });   


    res.send("入力が完了しました");

});