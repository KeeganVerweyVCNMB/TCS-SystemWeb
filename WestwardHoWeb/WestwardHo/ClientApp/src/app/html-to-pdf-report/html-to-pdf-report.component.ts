import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { ChartOptions, ChartType } from 'chart.js';
import * as Chart from 'chart.js';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-html-to-pdf-report',
  templateUrl: './html-to-pdf-report.component.html',
  styleUrls: ['./html-to-pdf-report.component.scss'],
})
export class HtmlToPDFReportComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  isDownloading: boolean = false;

  noWater: boolean = false;
  noComplaints: boolean = false;

  complaints: Array<any> = [];
  complaintsList: Array<any> = [];

  water: Array<any> = [];
  waterList: Array<any> = [];
  waterListUnit: Array<any> = [];
  userID: string = "";

  chartDataUnit: Array<any> = [];
  chartDataUsage: Array<any> = [];
  chartDataColors: Array<any> = [];

  barTitle = 'Water Bar Chart';
  barCanvas: any;
  xBar: any;

  lineTitle = 'Water Line Graph';
  lineCanvas: any;
  xLine: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('userID');

    this.getComplaint();
  }

  convertToPDF() {
    this.isDownloading = true;
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210;
        var pageHeight = 285;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 1;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save('user-report.pdf');
        this.isDownloading = false;
      }); 
  }

  getComplaint() {
    this.isLoading = true;
    this.systemService.getComplaintsByLoggedInUserID(this.userID).then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.complaints = results;
        this.complaintsList = results;
        this.noComplaints = false;
      }
      else {
        this.noComplaints = true;
      }
      this.getWater();
    });
  }

  getWater() {
    this.isLoading = false;
    this.systemService.getWaterByLoggedInUserID(this.userID).then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.water = results;
        this.waterList = results;

        for (var i = 0; i < results.length; i++) {
          this.chartDataUnit.push("Unit " + results[i].unit);
          this.chartDataUsage.push(results[i].usage);
          this.chartDataColors.push('#2a7280');
        }

        this.noWater = false;
      }
      else {
        this.noWater = true;
      }
      this.barCanvas = document.getElementById('barChart');
      this.xBar = this.barCanvas.getContext('2d');

      let barChart = new Chart(this.xBar, {
        type: 'bar',
        data: {
          labels: this.chartDataUnit,
          datasets: [{
            label: 'Water Usage / Unit Bar Graph',
            data: this.chartDataUsage,
            backgroundColor: this.chartDataColors,
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

      this.lineCanvas = document.getElementById('lineChart');
      this.xLine = this.lineCanvas.getContext('2d');

      let lineChart = new Chart(this.xLine, {
        type: 'line',
        data: {
          labels: this.chartDataUnit,
          datasets: [{
            label: 'Water Usage / Unit Line Graph',
            data: this.chartDataUsage,
            backgroundColor: this.chartDataColors,
            pointBackgroundColor: this.chartDataColors,
            fill: false,
            borderColor: '#2a7280',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
  }
}
