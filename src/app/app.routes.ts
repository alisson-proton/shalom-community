import { Routes } from '@angular/router';
import { Feed } from './components/feed/feed';
import { MembersFeed } from './components/members-feed/members-feed';
import { AdminPanel } from './components/admin-panel/admin-panel';

export const routes: Routes = [
  { path: '', component: Feed },
  { path: 'members', component: MembersFeed },
  { path: 'admin', component: AdminPanel },
  { path: '**', redirectTo: '' }
];
