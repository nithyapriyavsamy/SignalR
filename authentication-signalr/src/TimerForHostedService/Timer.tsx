import React, { useEffect,useState } from 'react';
import * as SignalR from '@microsoft/signalr';

const Timer = () => {

    var [time,setTime] = useState("00:00:00 ");

  useEffect(() => {
  const connection = new SignalR.HubConnectionBuilder()
  .configureLogging(SignalR.LogLevel.Trace)
  .withUrl("https://localhost:7185/timehub")
  .build();;

  const startConnection = async () => {
    try {
      await connection.start();
      console.log("Connection successful");
    } catch (err) {
      console.error("Connection failed: ", err);
    }
  };

  startConnection();

  connection.on("timeUpdate", (val:number) => {
    setTime(val.toString());
  });
  
}, []);
  

  return (
    <div>
      <label>Current Time : {time}</label>
    </div>
  );
}

export default Timer;
