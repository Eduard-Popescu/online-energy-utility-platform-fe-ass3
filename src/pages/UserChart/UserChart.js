import React from "react";
import SockJsClient from "react-stomp";
import { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import Header from "../../components/Header/Header";
import { Line } from "react-chartjs-2";
import "./UserChart.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

function UserChart() {
  const SOCKET_URL = 'http://localhost:8080/ws-message';
  const [time, setTime] = useState();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "#7496EB",
        borderColor: "#294FAF",
        tension: 0.4,
        fill: true,
        pointStyle: "react",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        showLine: true,
        drawBorder: false,
      },
    ],
  });

  const [energy, setEnergy] = useState([]);
  const [timestamp, setTimestamp] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8080/api/user/device-consumption/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    const minim2 = await response.json();

    const arrEnergy = [];
    const arrTime = [];
    minim2.forEach((element) => {
      const min = element.consumptionDTOS;
      
      min.forEach((elem2) => {
        var arr1 = elem2.timestamp.split(" ");
        var arr2 = arr1[0].split('-');
        setTime(arr1[1])
        const year = arr2[0]
        const month = arr2[1]
        const day = arr2[2]

        if (selectedDay.day == +day && selectedDay.month == +month && selectedDay.year == +year) {
        arrEnergy.push(elem2.energy);
        arrTime.push(arr1[1]);
        setEnergy(arrEnergy);
        setTimestamp(arrTime);
        }
      });
    });
  };

  useEffect(() => {
    setData({
      labels: timestamp ,
      datasets: [
        {
          label: "Hourly Energy Consumption",
          data: energy,
          backgroundColor: "#7496EB",
          borderColor: "#294FAF",
          tension: 0.4,
          fill: true,
          pointStyle: "react",
          pointBorderColor: "blue",
          pointBackgroundColor: "#fff",
          showLine: true,
          drawBorder: false,
        },
      ],
    });
  }, [energy, timestamp]);

  const defaultValue = {
    year: 2022,
    month: 11,
    day: 15,
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  useEffect(() => {
    fetchData();
  }, [selectedDay]);
  useEffect(() => {console.log(selectedDay)}, [selectedDay]);

  const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/handler";
  return (
    <>
      <Header></Header>
        <div className="chartContainer">
          <div className="secondContainer">
            <Line data={data} />
            <SockJsClient url= "http://localhost:8080/api/ws" topics={['/all/messages']}
            onMessage={(msg) => { 
              console.log(sessionStorage.getItem("userId"))
              if(msg.user === sessionStorage.getItem("userId")){
              console.log(msg.user)
              console.log(msg);
             window.alert(msg.message)}}}
            />
          </div>
        </div>
        <div className="absolute">
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Select a day"
            colorPrimary="#294FAF"
          />
        </div>
    </>
  );
}

export default UserChart;
