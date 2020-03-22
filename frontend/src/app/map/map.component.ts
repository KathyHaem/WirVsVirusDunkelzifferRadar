declare var require: any;

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import MapModule from 'highcharts/modules/map';

import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);


const germany = require('src/assets/germany2.geo.json');
const landDaten = require('src/assets/Daten.json');
let drillStack = ["Deutschland"];
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
        map: germany,
        events: {
           drilldown(e) { 
             let id = e.point['id'];
             if(id.length == 2) { 
                let title = landDaten[id]['name']
                this.setTitle({text: title });
                drillStack.push(title);
                let drilldownData = [];
                for(let i in landDaten[id]['Kreise']) {
                    let kreis = landDaten[id]['Kreise'][i];
                    let kreis_id = kreis['id']
                    drilldownData.push({'id': kreis_id, 'value': Math.floor(Math.random() * 100), 'drilldown': kreis_id, 'name': kreis['name']});
                }
                this.addSeriesAsDrilldown(e.point,{ id: id,
                  type: 'map',
                  mapData: require(`src/assets/${id}.geo.json`),
                  data: drilldownData,
                  joinBy: 'id' });
              } else {
                let kreise = landDaten[id.substr(0, 2)]['Kreise']
                for(let i in kreise) {
                  if(id == kreise[i]['id']) {
                    let title = kreise[i]['name'];
                    this.setTitle({text: title });
                    drillStack.push(title);
                    break;
                  }
                }
                this.addSeriesAsDrilldown(e.point,{ id: id,
                  type: 'map',
                  mapData: require(`src/assets/kreise/${id}.geo.json`),
                  data: [{'id': id, 'value': Math.floor(Math.random() * 100), 'name': id}],
                  joinBy: 'id' });
              }
          },
          drillup(e) { 
            let t = drillStack.pop(); this.setTitle({text: drillStack[drillStack.length - 1]});
          }
        }
      },
      title: {
        text: 'Deutschland'
      },
      colorAxis: {
        min: 0
      },
      series: [],
      drilldown:  {
          series: [],
          allowPointDrilldown: true
      }    
    };

    constructor() { 
      let id = '';
      let data = [];
      let drilldown = [];
      for(let i = 1; i <= 16; i++) {
        let s = i.toString();
        if(i < 10)
          s = "0" + s;
        data.push({name: s, 'value': i, 'drilldown': s, 'id': s});

        // let drilldownData = [];
        // for(let j = 0; j < 10; j++) {
        //   let t = i.toString() + j.toString();
        //   drilldownData.push({'id': t, 'value': i*10 + j, 'drilldown': t, 'name': t});
        // }

        // let mapData = require(`src/assets/${s}.geo.json`);
        // drilldown.push({ id: s,
        // type: 'map',
        // mapData: mapData,
        // data: [drilldownData],
        // joinBy: 'id' });

        // for(let j = 0; j < 10; j++) {
        //   let t = i.toString() + j.toString();
        //   mapData = require(`src/assets/${t}.geo.json`);
        //   drilldown.push({ id: t,
        //   type: 'map',
        //   mapData: mapData,
        //   data: [{'id': t, 'value': i*10 + j, 'name': t}],
        //   joinBy: 'id' });
        // }
      }
      this.chartMap.series.push({
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataGrouping: { enabled: false },
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

