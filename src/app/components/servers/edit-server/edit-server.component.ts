import {Component, OnInit} from '@angular/core';
import {ServerService} from 'src/app/services/server.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CanComponentDeactivate} from "../can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName: string;
  serverStatus: string;
  allowEdit = false;
  changedSaved = false;

  constructor(private serverService: ServerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.queryParams);
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serverService.getServer(+params['id']);
        }
      );
    console.log(this.route.snapshot.fragment);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serverService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changedSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): (Observable<boolean> | Promise<boolean> | boolean) {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name
      || this.serverStatus !== this.server.status)
      && !this.changedSaved) {
      return confirm('do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
