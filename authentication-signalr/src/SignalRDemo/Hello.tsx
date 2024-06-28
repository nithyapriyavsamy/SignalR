import React, { useEffect, useState } from 'react';
import * as SignalR from '@microsoft/signalr';
import ApiService from '../API Service/ApiService';

const Hello = () => {
  var apiService = ApiService();
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
      .configureLogging(SignalR.LogLevel.Trace)
      .withAutomaticReconnect()
      .withUrl("https://localhost:7185/signalhub", {
        accessTokenFactory: () => localStorage.getItem("token") ?? ""
      })
      .build();

    setConnection(newConnection);

    newConnection.on("greet", (val) => {
      alert(val);
    });

    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("Connection successful");
      } catch (err) {
        console.error("Connection failed: ", err);
      }
    };

    startConnection();

    return () => {
      newConnection.off("greet");
      newConnection.stop().then(() => console.log("Connection stopped"));
    };
  }, []);

  const sayHello = () => {
    if (connection) {
      connection.invoke("SayHello")
        .catch((err: any) => console.error("Invocation failed: ", err));
    }
  };

  const Test = () => {
    var token = localStorage.getItem("token");
    if (token) {
      console.log(token);
    }
    apiService.TestApiService(token)
      .then(data => {
        alert(data);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  return (
    <div>
      <button onClick={sayHello}>Hai</button>
      <button onClick={Test}>Test</button>
    </div>
  );
};

export default Hello;

