import { Routes } from '@angular/router';
import { StudentsComponent } from './studentscomponent/students.component';
import { EditComponent } from './editcomponent/edit.component';
import { AddComponent } from './addcomponent/add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'add', component: AddComponent }
];