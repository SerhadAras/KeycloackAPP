import { Component, OnInit } from '@angular/core';
import { Point, ScrumboardService } from '../services/scrumboard.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  constructor(private service: ScrumboardService) { }

  error = false
  story: any;
  selectedPoint: number = 0.5;
  showNotification = false;
  points: Point[] = []
  style = ""

  async CreateBoard(title: string, priority: boolean) {
    try {
      this.story = (await this.service.Post(title, this.selectedPoint, !priority));
      this.error = true
    } catch (error) {
      this.error = false
    }
    this.selectedPoint = 0.5;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 4000)
  }

  checkDanger(bool: boolean) {
    if (this.selectedPoint == 13 && !bool)
      return this.style = "is-danger";
    else
      return this.style = "";
  }
  async ngOnInit() {
    this.service.Points.subscribe(points => { this.points = points });
  }
}
