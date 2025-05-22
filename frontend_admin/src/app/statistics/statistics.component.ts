import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';

@Component({
    selector: 'app-statistics',
    imports: [MatCardModule, MatChipsModule, MatIconModule, DoughnutChartComponent],
    templateUrl: './statistics.component.html',
    styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {}
