import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScrumboardService {

  constructor(private _http:HttpClient) { }

  get Points():Observable<Point[]> {
    return this._http.get<Point[]>('http://localhost:3000/storypoints')
  }

  get Stories() {
    return this._http.get<Story[]>('http://localhost:3000/storyboard').toPromise()
  }
  async  Post(title:string,estimation:number,priority:boolean) {
    return this._http.post('http://localhost:3000/storyboard',{
      "title":title,
      "estimation":estimation,
      "state":0,
      "priority":priority
    }).toPromise();
  }

  async Delete(id:number){
    return this._http.delete(`http://localhost:3000/storyboard/${id}`).toPromise();
  }

  async Update(id:number, story: Story){
    return this._http.put(`http://localhost:3000/storyboard/${id}`,story).toPromise();
  }
}

export interface Point{
  value: number;
}

export interface Story {
  title: string;
  estimation: any;
  state: number;
  priority: any;
  id: number;
}