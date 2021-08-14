import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {
  id;
  user;
  constructor(private router:Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/login'],{ queryParams: {invitedBy: this.id}});
  }
}
