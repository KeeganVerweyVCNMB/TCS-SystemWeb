import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { ChartOptions, ChartType } from 'chart.js';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-view-water',
  templateUrl: './view-water.component.html',
  styleUrls: ['./view-water.component.scss'],
})
export class ViewWaterComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  water: Array<any> = [];
  waterList: Array<any> = [];
  waterListUnit: Array<any> = [];

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
    private dataService: DataService) { }

  ngOnInit() {
    this.getWater();
  }

  getWater() {
    this.isLoading = true;
    this.systemService.getWater().then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.water = results;
        this.waterList = results;

        for (var i = 0; i < results.length; i++) {
          this.chartDataUnit.push("Unit " + results[i].unit);
          this.chartDataUsage.push(results[i].usage);
          this.chartDataColors.push('#2a7280');
        }
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
    this.isLoading = false;
  }    
}
