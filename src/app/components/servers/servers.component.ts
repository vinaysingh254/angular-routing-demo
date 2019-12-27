import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: { id: number, name: string, status: string }[] = [];

  constructor(private serverService: ServerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(Math.random());
    this.servers = this.serverService.getServers();
  }

  onReload() {
    this.router.navigate(['/servers'], { relativeTo: this.route });
  }

}
