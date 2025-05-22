import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnChanges {
@Input() datasetKey: string | null = null;

  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        max: 20, // ✅ Flatten the chart by lowering this
      },
    }
  };

  public lineChartData: any = {
    labels: [],
    datasets: []
  };

  ngOnChanges(changes: SimpleChanges): void {
  if (changes['datasetKey'] && this.datasetKey) {
    this.loadDataset(this.datasetKey);
  }
}


  loadDataset(key: string) {
    const mockDatasets: Record<string, any> = {
      users: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          { label: 'Inscrits', data: [300, 500, 800, 1245], borderColor: '#42A5F5', tension: 0.3 }
        ]
      },
      active: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
          { label: 'Actifs', data: [100, 200, 180, 250, 320], borderColor: '#66BB6A', tension: 0.3 }
        ]
      },
      growth: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          { label: 'Croissance %', data: [2, 4, 8, 12], borderColor: '#FFA726', tension: 0.3 }
        ]
      }
    };

    this.lineChartData = mockDatasets[key] || { labels: [], datasets: [] };
  }
}
