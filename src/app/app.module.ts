import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ServersComponent} from './components/servers/servers.component';
import {EditServerComponent} from './components/servers/edit-server/edit-server.component';
import {ServerComponent} from './components/servers/server/server.component';
import {UsersComponent} from './components/users/users.component';
import {UserComponent} from './components/users/user/user.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ServerService} from "./services/server.service";
import {AuthService} from "./shared/auth-service";
import {AuthGuard} from "./shared/guards/auth-guard";
import {CanDeactivateGuard} from "./components/servers/can-deactivate-guard.service";
import {ErrorPageComponent} from './components/error-page.component';
import {ServerResolver} from "./components/servers/server/server-resolver.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    EditServerComponent,
    ServerComponent,
    UsersComponent,
    UserComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ServerService, AuthService, AuthGuard, CanDeactivateGuard, ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
