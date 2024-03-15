import { Component } from '@angular/core';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this.drawWeeklySaleChart();
    this.drawSaleChart();
    this.drawProfitChart();
    this.drawProductChart();
    this.customerSatisficationChart();
    this.saleTargetChart();
  }

  drawWeeklySaleChart() {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('weekly-sale-chart');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart: any = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    xRenderer.grid.template.setAll({
      location: 1,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'country',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
    });

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'country',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    series.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });

    // Set data
    let data = [
      {
        country: 'Mon',
        value: 2,
      },
      {
        country: 'Tue',
        value: 1,
      },
      {
        country: 'Wed',
        value: 3,
      },
      {
        country: 'Thurs',
        value: 5,
      },
      {
        country: 'Fri',
        value: 9,
      },
      {
        country: 'Sat',
        value: 1,
      },
      {
        country: 'Sun',
        value: 3,
      },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }

  drawSaleChart() {
    let root = am5.Root.new('sale-chart');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      })
    );
    cursor.lineY.set('visible', false);

    // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      am5.time.add(date, 'day', 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
          pan: 'zoom',
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {
          pan: 'zoom',
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
        fill: am5.color('#bdd0ee'),
      })
    );

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 4,
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 2,
          fill: series.get('fill'),
        }),
      });
    });

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set(
    //   'scrollbarX',
    //   am5.Scrollbar.new(root, {
    //     orientation: 'horizontal',
    //   })
    // );

    let data = generateDatas(5);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }

  drawProfitChart() {
    let root = am5.Root.new('profit-chart');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      })
    );
    cursor.lineY.set('visible', false);

    // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      am5.time.add(date, 'day', 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
          pan: 'zoom',
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {
          pan: 'zoom',
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
        fill: am5.color('#9bebd0'),
      })
    );

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 4,
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 2,
          fill: series.get('fill'),
        }),
      });
    });

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set(
    //   'scrollbarX',
    //   am5.Scrollbar.new(root, {
    //     orientation: 'horizontal',
    //   })
    // );

    let data = generateDatas(5);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }

  drawProductChart() {
    let root = am5.Root.new('product-chart');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        endAngle: 270,
      })
    );

    series.states.create('hidden', {
      endAngle: -90,
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
      {
        category: 'a',
        value: 501.9,
      },
      {
        category: 'b',
        value: 301.9,
      },
      {
        category: 'c',
        value: 201.1,
      },
      {
        category: 'd',
        value: 165.8,
      },
      {
        category: 'e',
        value: 139.9,
      },
      {
        category: 'f',
        value: 128.3,
      },
      {
        category: 'g',
        value: 99,
      },
    ]);

    series.appear(1000, 100);
  }

  customerSatisficationChart() {
    let root = am5.Root.new('customerSatisficationChart');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    );

    chart.get('colors').set('step', 3);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value1',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueX}: {valueY}\n{previousDate}: {value2}',
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    series.get('tooltip').get('background').set('fillOpacity', 0.5);

    let series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series 2',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value2',
        valueXField: 'date',
      })
    );
    series2.strokes.template.setAll({
      strokeDasharray: [2, 2],
      strokeWidth: 2,
    });

    // Set date fields
    // https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
    root.dateFormatter.setAll({
      dateFormat: 'yyyy-MM-dd',
      dateFields: ['valueX'],
    });

    // Set data
    let data = [
      {
        date: new Date(2019, 5, 12).getTime(),
        value1: 50,
        value2: 48,
        previousDate: new Date(2019, 5, 5),
      },
      {
        date: new Date(2019, 6, 13).getTime(),
        value1: 53,
        value2: 51,
        previousDate: '2019-05-06',
      },
      {
        date: new Date(2019, 7, 14).getTime(),
        value1: 56,
        value2: 58,
        previousDate: '2019-05-07',
      },
    ];

    series.data.setAll(data);
    series2.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
  }

  saleTargetChart() {
    /* Chart code */
    // Define data for each year
    let chartData = {
      '1995': [
        { sector: 'a', size: 6 },
        { sector: 'b', size: 6 },
        { sector: 'c', size: 2 },
        { sector: 'd', size: 2 },
        { sector: 'e', size: 5 },
        { sector: 'f', size: 6 },
        { sector: 'g', size: 3 },
        { sector: 'g', size: 5 },
      ],
    };

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('sale-target');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: 100,
        layout: root.verticalLayout,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'size',
        categoryField: 'sector',
      })
    );

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
      { sector: 'Agriculture', size: 6.6 },
      { sector: 'Mining and Quarrying', size: 0.6 },
      { sector: 'Manufacturing', size: 23.2 },
      { sector: 'Electricity and Water', size: 2.2 },
      { sector: 'Construction', size: 4.5 },
      { sector: 'Trade (Wholesale, Retail, Motor)', size: 14.6 },
      { sector: 'Transport and Communication', size: 9.3 },
      { sector: 'Finance, real estate and business services', size: 22.5 },
    ]);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    // Add label
    let label = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x000000),
        fontSize: 50,
      })
    );

    // Animate chart data
    let currentYear = 1995;
    function getCurrentData() {
      let data = chartData[currentYear];
      currentYear++;
      if (currentYear > 2014) currentYear = 1995;
      return data;
    }

    function loop() {
      label.set('text', currentYear as any);
      let data = getCurrentData();
      for (var i = 0; i < data.length; i++) {
        series.data.setIndex(i, data[i]);
      }
      chart.setTimeout(loop, 4000);
    }

    loop();
  }
}
