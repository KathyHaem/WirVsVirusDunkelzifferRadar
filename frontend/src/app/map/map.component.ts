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

    chart: Highcharts.Options = {
      title: {
        text: 'Line Graph'
      },
      xAxis: {
        title: {
          text: "Time"
        }
      },
      yAxis: {
        title: {
          text: "Infected"
        }
      },
      series :[{ 
        data: [1, 2.5, 5.5, 10.0, 15.0]
      }]
      } as Highcharts.Options;

    chart2: Highcharts.Options = {
        title: {
          text: 'Line Graph 2'
        },
        xAxis: {
          title: {
            text: "Time"
          }
        },
        yAxis: {
          title: {
            text: "Cumul. Infected"
          }
        },
        series :[{ 
          data: [3.5, 10.0, 20.0, 35.0, 50.0]
        }]
        } as Highcharts.Options;

    pie: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: "Pie Chart"
      },
      series: [{ 
        name: 'Pies',
        colorByPoint: true,
        type: 'pie',
        data: [
        {
          name: 'Pie 1',
          y: 50.0
        },
        {
          name: 'Pie 2',
          y: 25.0
        },
        {
          name: 'Pie 3',
          y: 13.0
        },
        {
          name: 'Pie 4',
          y: 12.0
        }]
    }
    ]
    };

    bar: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: "Column Chart"
      },
      xAxis: {
        categories: [ '01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '11.03', '12.03', '13.03', '14.03',]
      },
      series: [{
        name: 'Deaths',
        type: 'column',
        data: [5, 10, 15, 30, 60, 120, 240, 300, 330, 100, 150, 400, 450, 450]
      }]
    }

    updateCharts(id) {

    }

    constructor() { 
      let id = '';
      let data = [];
      let drilldown = [];
      for(let i = 1; i <= 16; i++) {
        let s = i.toString();
        if(i < 10)
          s = "0" + s;
        data.push({name: s, 'value': i, 'drilldown': s, 'id': s});
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
      let c = Highcharts.mapChart('map-container', this.chartMap);

      Highcharts.chart('graph1-container', this.chart);

      Highcharts.chart('graph2-container', this.chart);

      Highcharts.chart('pie-container', this.pie);

      Highcharts.chart('bar-container', this.bar)
    }
}

