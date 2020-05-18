import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild("barChart") barCanvas;
  @ViewChild("doughnutCanvas") doughnutCanvas;
  @ViewChild("h") h;


  
  dataList=[];
  cdata:any;
  total=[];
  dayData=[]=new Array();
  monthData=[]=new Array();

  constructor(public http: HttpClient) {
    this.callData();
    this.callDayData();
  }
 

  ionViewDidEnter(){
    this.callDayData();
    this.callData();
  }

  DayBtn(){

    this.callDayData();
    this.createBarChart(this.dayData);
    this.createPie(this.dayData);
 

  
  }
  MonthBtn(){

   this.callData();
   this.createBarChart(this.monthData);
    this.createPie(this.monthData);
  

  
  }
 
  async callDayData(){
    this.dayData=[];
    this.monthData=[];
    this.http.get('https://fetch.betaplanets.com/wp-json/mobileapi/v1/ordermetrics?vendor_id=7&range=day')
    .subscribe(res=>{
        console.log("Res :",res['response']);
        this.cdata=res['response'];
        console.log("C Data Day",this.cdata['gross_sale']);
        this.dayData.push(this.cdata['gross_sale']);
        this.dayData.push(this.cdata['earing']);
        this.doughnutCanvas.datasets.data=this.dayData;
        this.barCanvas.datasets.data=this.dayData;
    });
  }

  callData(){
    this.monthData=[];
    this.dayData=[];
    this.http.get('https://fetch.betaplanets.com/wp-json/mobileapi/v1/ordermetrics?vendor_id=7&range=month')
    .subscribe(res=>{
        console.log("Res :",res['response']);
        this.cdata=res['response'];
        console.log("C Data Month",this.cdata['gross_sale']);
        this.monthData.push(this.cdata['gross_sale']);
        this.monthData.push(this.cdata['earing']);
      this.doughnutCanvas.datasets.data=this.monthData;
      this.barCanvas.datasets.data=this.monthData;

    });
  }

  createPie(data){
    

    this.doughnutCanvas = new Chart(this.doughnutCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: ["Gross Sales", "Earning"],
        datasets: [
          {
            label: "# of Sales",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)"
         
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384"]
          }
        ]
      }
    });
  }

  createBarChart(data){
    

    this.barCanvas = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Gross Sales", "Earning"],
        datasets: [
          {
            label: "# of Sales",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

  }
}
