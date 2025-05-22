import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
    selector: 'app-statistics',
    imports: [MatCardModule, MatChipsModule, MatIconModule, DoughnutChartComponent, LineChartComponent],
    templateUrl: './statistics.component.html',
    styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

    showLineChart = false;
    selectedKey: string = 'users'; // ✅ Default value


  toggleLineChart(key: string) {
  if (this.selectedKey === key && this.showLineChart) {
    // Same key, already shown → close chart
    this.showLineChart = false;
  } else {
    // New key or reopening chart → show with new data
    this.selectedKey = key;
    this.showLineChart = true;
  }
}

}
