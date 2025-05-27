import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { ProjectService } from '../services/projects.service';
import { Project } from '../models/projects.model';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatIconModule, DoughnutChartComponent, LineChartComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {

  showLineChart = false;
  selectedKey: string = 'users';

  projects: Project[] = [];

  // ✅ Technology stats for the chart
  techLabels: string[] = [];
  techCounts: number[] = [];

  doughnutChartDataObject: any = {
    labels: [],
    datasets: [{ data: [] }]
  };

  lineChartLabels: string[] = [];
  lineChartCounts: number[] = [];

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.computeTechnologyUsage();
        this.groupProjectsBy('month'); // 👈 default
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
      }
    });
  }


  toggleLineChart(key: string): void {
    if (this.selectedKey === key && this.showLineChart) {
      this.showLineChart = false;
    } else {
      this.selectedKey = key;
      this.showLineChart = true;
    }
  }

  // ✅ Count tech usage
 computeTechnologyUsage(): void {
  const usageMap = new Map<string, number>();

    for (const project of this.projects) {
      for (const tech of project.technologies) {
        const count = usageMap.get(tech.name) ?? 0;
        usageMap.set(tech.name, count + 1);
      }
    }

    const labels = Array.from(usageMap.keys());
    const counts = Array.from(usageMap.values());

    this.doughnutChartDataObject = {
      labels,
      datasets: [{ data: counts }]
    };

    this.cdr.detectChanges(); // Force update

  }

  groupProjectsBy(period: 'day' | 'week' | 'month'): void {
    const countsMap = new Map<string, number>();

    for (const project of this.projects) {
      const date = new Date(project.createdAt);
      let key = '';

      if (period === 'day') {
        key = date.toISOString().split('T')[0]; // "2025-05-21"
      } else if (period === 'week') {
        const year = date.getFullYear();
        const week = this.getWeekNumber(date);
        key = `${year}-W${week.toString().padStart(2, '0')}`;
      } else if (period === 'month') {
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // "2025-05"
      }

      const count = countsMap.get(key) ?? 0;
      countsMap.set(key, count + 1);
    }

    const sortedKeys = Array.from(countsMap.keys()).sort(); // Chronological order
    this.lineChartLabels = sortedKeys;
    this.lineChartCounts = sortedKeys.map(k => countsMap.get(k)!);
  }

  // Helper for week number
  getWeekNumber(date: Date): number {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((+date - +firstJan) / 86400000);
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
  }
}
