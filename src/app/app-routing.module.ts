import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ServersComponent} from './components/servers/servers.component';
import {UsersComponent} from './components/users/users.component';
import {UserComponent} from './components/users/user/user.component';
import {EditServerComponent} from './components/servers/edit-server/edit-server.component';
import {ServerComponent} from './components/servers/server/server.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from "./shared/guards/auth-guard";
import {CanDeactivateGuard} from "./components/servers/can-deactivate-guard.service";
import {ErrorPageComponent} from "./components/error-page.component";
import {ServerResolver} from "./components/servers/server/server-resolver.service";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}]
  },
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'page not found!'}},
  {path: '**', redirectTo: '/not-found'},

];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
