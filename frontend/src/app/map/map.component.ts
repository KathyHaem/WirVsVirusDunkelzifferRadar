declare var require: any;

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import MapModule from 'highcharts/modules/map';

import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

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
      series: [],
      drilldown:  {
          series: []
      }    
    };

    constructor() { 
      let stage = 0;
      let id = '';
      let data = [];
      let drilldown = [];
      for(let i = 0; i < 10; i++) {
        let s = (stage * 10 + i).toString();
        data.push({'value': i, 'drilldown': s, 'id': s});

        let drilldownData = [];
        for(let j = 0; j < 10; j++) {
          let t = i.toString() + j.toString();
          drilldownData.push({'id': t, 'value': i*10 + j, 'drilldown': t});
        }

        let mapData = require(`src/assets/${s}.geo.json`);
        drilldown.push({ id: s,
        type: 'map',
        mapData: mapData,
        data: drilldownData,
        joinBy: 'id' });

        for(let j = 0; j < 10; j++) {
          let t = i.toString() + j.toString();
          mapData = require(`src/assets/${t}.geo.json`);
          drilldown.push({ id: t,
          type: 'map',
          mapData: mapData,
          data: [{'id': t, 'value': i*10 + j}],
          joinBy: 'id' });
        }
      }

      this.chartMap.series.push({
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
        type: 'map',
        data: data, 
        joinBy: 'id'
      });

      this.chartMap.drilldown.series = drilldown;
    }

    ngOnInit(): void {

      Highcharts.mapChart('container', this.chartMap);
    }
}

