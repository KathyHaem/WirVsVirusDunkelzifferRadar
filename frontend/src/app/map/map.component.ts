declare var require: any;

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import MapModule from 'highcharts/modules/map';

import Drilldown from 'highcharts/modules/drilldown';

Drilldown(Highcharts);

const germany = require('src/assets/germany2.geo.json');
const landDaten = require('src/assets/Daten.json');
const fallzahlen = require('src/assets/Fallzahlen.json')
let map_chart: Highcharts.Chart;
let graph_chart: Highcharts.Chart;
let bar_chart: Highcharts.Chart;
let pie_chart: Highcharts.Chart;

let drillStack = [["", "Deutschland"]];
MapModule(Highcharts);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // Initiate the chart

  drilldown_callback(e) {
    let id = e.point['id'];
    if (id.length == 2) {
      let title = landDaten[id]['name'];
      map_chart.setTitle({ text: title });
      drillStack.push([id, title]);
      let drilldownData = [];
      for (let i in landDaten[id]['Kreise']) {
        let kreis = landDaten[id]['Kreise'][i];
        let kreis_id = kreis['id']
        drilldownData.push({ 'id': kreis_id, 'value': 0, 'drilldown': kreis_id });
      }
      map_chart.addSeriesAsDrilldown(e.point, {
        id: id,
        name: 'Anzahl Infizierte',
        type: 'map',
        mapData: require(`src/assets/${id}.geo.json`),
        data: drilldownData,
        joinBy: 'id'
      });

    } else {
      let kreise = landDaten[id.substr(0, 2)]['Kreise']
      for (let i in kreise) {
        if (id == kreise[i]['id']) {
          let title = kreise[i]['name'];
          map_chart.setTitle({ text: title });
          drillStack.push([id, title]);
          break;
        }
      }
      map_chart.addSeriesAsDrilldown(e.point, {
        id: id,
        name: 'Anzahl Infizierte',
        type: 'map',
        mapData: require(`src/assets/kreise/${id}.geo.json`),
        data: [{ 'id': id, 'value': 0}],
        joinBy: 'id'
      });
    }
  }

  drillup_callback(e) {
      drillStack.pop(); 
      map_chart.setTitle({ text: drillStack[drillStack.length - 1][1] });

      let id = drillStack[drillStack.length - 1][0]
  }

  chartMap: Highcharts.Options = {
    chart: {
      map: germany,
      events: {
        drilldown: this.drilldown_callback,
        drillup: this.drillup_callback
      }
    },
    title: {
      text: 'Deutschland'
    },
    subtitle: {
      text: 'Source map: <a href="http://www.arcgis.com/home/item.html?id=ae25571c60d94ce5b7fcbf74e27c00e0">Bundesamt für Kartographie und Geodäsie, Frankfurt am Main, 2011</a>'
    },
    colorAxis: {
      min: 0
    },
    series: [],
    drilldown: {
      series: [],
      allowPointDrilldown: true,
      drillUpButton: {
        relativeTo: 'plotBox'
      }
    }
  };

  chart: Highcharts.Options = {
    title: {
      text: 'Sample Line Graph'
    },
    xAxis: {
      title: {
        text: "Time"
      }
    },
    yAxis: {
      title: {
        text: "Sample Data"
      }
    },
    series: [{
      data: [1, 2.5, 5.5, 10.0, 15.0]
    }]
  } as Highcharts.Options;

  pie: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Fallzahlen der Bundesländer"
    },
    tooltip : {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: []
  };

  bar: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: "Fallzahlen pro Bundesland"
    },
    xAxis: {},
    plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0,
          pointWidth: 20.0
      }
    },
    series: []
  }

  constructor() {
    let id = '';
    let data = [];
    let drilldown = [];
    for (let i = 1; i <= 16; i++) {
      let s = i.toString();
      if (i < 10)
        s = "0" + s;
      let value = fallzahlen[s]['infizierte']
      data.push({'value': value, 'drilldown': s, 'id': s });
    }
    this.chartMap.series.push({
      name: 'Anzahl Infizierte',
      states: {
        hover: {  
          color: '#BADA55',
        },  
      },
      dataGrouping: { enabled: false },
      allAreas: false,
      type: 'map',
      data: data,
      joinBy: 'id'
    });
    this.chartMap.drilldown.series = drilldown;


    let pieData = [];
    let total = fallzahlen['00']['infizierte'];

    for (let i = 1; i <= 16; i++) {
      let s = i.toString();
      if (i < 10)
        s = "0" + s;
      let value = fallzahlen[s]['infizierte']/total * 100;
      pieData.push({name: landDaten[s]['name'], y: value});
    }
    this.pie.series.push({
      name: 'Anzahl Infizierte',
      colorByPoint: true,
      type: 'pie',
      data: pieData});

      let barData1 = [];
      let barData2 = [];
      let barData3 = [];
      let barCat = [];
      for (let i = 1; i <= 16; i++) {
        let s = i.toString();
        if (i < 10)
          s = "0" + s;
        barData1.push(fallzahlen[s]['infizierte']);
        barData2.push(fallzahlen[s]['tode']);
        barData3.push(fallzahlen[s]['genesen']);
        barCat.push(landDaten[s]['name']);
      }
      this.bar.xAxis = { categories: barCat }
      this.bar.series.push({
        name: 'Anzahl Infizierte',
        type: 'column',
        data: barData1});
      this.bar.series.push({
        name: 'Anzahl Tode',
        type: 'column',
        data: barData2});
      this.bar.series.push({
        name: 'Anzahl Genesen',
        type: 'column',
        data: barData3});
  }

  ngOnInit(): void {
    map_chart = Highcharts.mapChart('map-container', this.chartMap);
    graph_chart = Highcharts.chart('graph-container', this.chart);
    pie_chart = Highcharts.chart('pie-container', this.pie);
    bar_chart = Highcharts.chart('bar-container', this.bar)
  }
}

