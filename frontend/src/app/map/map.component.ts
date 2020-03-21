declare var require: any;

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import MapModule from 'highcharts/modules/map';

const germany = require('src/assets/plz-1stellig.geo.json');

MapModule(Highcharts);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

    // Initiate the chart
    chartMap: Highcharts.Options = {
      chart: {
        map: germany
      },
      title: {
        text: 'Deutschland'
      },
      colorAxis: {
        min: 0
      },
      series: [{
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        allAreas: false,
        data: [
          ['1', 23],
          ['2', 50],
          ['3', 67],
          ['4', 432],
          ['5', 500],
          ['6', 200],
          ['7', 250],
          ['8', 270],
          ['9', 760],
          ['0', 710],
        ]
      } as Highcharts.SeriesMapOptions]
    };

    constructor() { }

    ngOnInit(): void {
      Highcharts.mapChart('container', this.chartMap);
    }
}

