import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent {
  public doughnutChartLabels: string[] = ['Frontend', 'Backend', 'DevOps', 'Design'];
  public doughnutChartData: number[] = [30, 25, 15, 30];
  public doughnutChartType: ChartType = 'doughnut';

  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 👈 disable legend
      },
    },
  };
}
