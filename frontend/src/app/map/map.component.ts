declare var require: any;

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import MapModule from 'highcharts/modules/map';

import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

const germany = require('src/assets/plz-1stellig.geo.json');
const filtered0 = require('src/assets/filtered-0.geo.json');
const filtered1 = require('src/assets/filtered-1.geo.json');
const filtered2 = require('src/assets/filtered-2.geo.json');
const filtered3 = require('src/assets/filtered-3.geo.json');
const filtered4 = require('src/assets/filtered-4.geo.json');
const filtered5 = require('src/assets/filtered-5.geo.json');
const filtered6 = require('src/assets/filtered-6.geo.json');
const filtered7 = require('src/assets/filtered-7.geo.json');
const filtered8 = require('src/assets/filtered-8.geo.json');
const filtered9 = require('src/assets/filtered-9.geo.json');
MapModule(Highcharts);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

    filter(id: string) {
      const regions = germany.features;
      const filteredData = [];
      regions.forEach(element => {
        console.log("2");
        if(element.properties['id'] == id)
          filteredData.push(element);
      });
      
      return filteredData;
    };

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
        type: 'map',
        data: [
          { 'name' : '0',
            'value': 123,
            'drilldown': '0',
            'id': '0'},
          { 'name' : '1',
            'value': 123,
            'drilldown': '1',
            'id': '1'},
          { 'name' : '2',
            'value': 123,
            'drilldown': '2',
            'id': '2'},
          { 'name' : '3',
            'value': 123,
            'drilldown': '3',
            'id': '3'},
          { 'name' : '4',
            'value': 123,
            'drilldown': '4',
            'id': '4'},
          { 'name' : '5',
            'value': 123,
            'drilldown': '5',
            'id': '5'},
          { 'name' : '6',
            'value': 123,
            'drilldown': '6',
            'id': '6'},
          { 'name' : '7',
            'value': 123,
            'drilldown': '7',
            'id': '7'},
          { 'name' : '8',
            'value': 123,
            'drilldown': '8',
            'id': '8'},
          { 'name' : '9',
            'value': 123,
            'drilldown': '9',
            'id': '9'}
        ], joinBy: 'id'
      }],
      drilldown:  {
          series: [
            { id: '0',
              type: 'map',
              mapData: filtered0,
              data: [
                {'name': '0', 'id': '0', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '1',
              type: 'map',
              mapData: filtered1,
              data: [
                {'name': '1', 'id': '1', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '2',
              type: 'map',
              mapData: filtered2,
              data: [
                {'name': '2', 'id': '2', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '3',
              type: 'map',
              mapData: filtered3,
              data: [
                {'name': '3', 'id': '3', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '4',
              type: 'map',
              mapData: filtered4,
              data: [
                {'name': '4', 'id': '4', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '5',
              mapData: filtered5,
              type: 'map',
              data: [
                {'name': '5', 'id': '5', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '6',
              mapData: filtered6,
              type: 'map',
              data: [
                {'name': '6', 'id': '6', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '7',
              mapData: filtered7,
              type: 'map',
              data: [
                {'name': '7', 'id': '7', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '8',
              mapData: filtered8,
              type: 'map',
              data: [
                {'name': '8', 'id': '8', 'value': 222}
              ],
              joinBy: 'id' },
              { id: '9',
              mapData: filtered9,
              type: 'map',
              data: [
                {'name': '9', 'id': '9', 'value': 222}
              ],
              joinBy: 'id' }
          ]
      }
      
    };

    constructor() { }

    ngOnInit(): void {
      Highcharts.mapChart('container', this.chartMap);
    }
}

