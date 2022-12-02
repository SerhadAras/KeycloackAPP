import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BoardComponent } from './board/board.component';
import { CreateStoryComponent } from './create-story/create-story.component';

const routes: Routes = [
  { path: 'summary', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateStoryComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'summary', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'create', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
