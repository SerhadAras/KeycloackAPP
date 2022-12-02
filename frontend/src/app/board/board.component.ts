import { Component, OnInit } from '@angular/core';
import { ScrumboardService, Story } from '../services/scrumboard.service';
import { State } from './state';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private service: ScrumboardService) { }

  stories: Story[] = []

  get Todo() {
    return this.stories.filter(story => story.state == State.Todo).sort(value => { return value.priority ? -1 : 1 })
  }

  getStyle(priority: boolean) {
    if (priority)
      return "is-danger"
    else
      return "is-success"
  }

  get InProgress() {
    return this.stories.filter(story => story.state == State.InProgess).sort(value => { return value.priority ? -1 : 1 })
  }

  get Done() {
    return this.stories.filter(story => story.state == State.Done)
  }
  async changeState(id: number, state: number) {
    console.log(this.Todo)
    this.stories = await this.service.Stories;
    let newStory = this.stories.find(story => story.id == id)
    if (newStory) {
      newStory.state = state;
      this.service.Update(id, newStory);
    }
  }
  async ngOnInit() {
    this.stories = await this.service.Stories;
  }

  async Delete(id: number) {
    await this.service.Delete(id);
    this.stories = await this.service.Stories;
  }


}
