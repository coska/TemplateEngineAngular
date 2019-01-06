import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/core/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sections-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input()
  posts: Post[];

  @Input()
  link: string;

  private router: any;
  private route: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route = route;
    this.router = router;
  }

  ngOnInit() { }

  goPost(link, postId) {
    if (this.router.url.indexOf(postId) !== -1) {
      // same url
      this.route.navigate([link, postId]);
    }
  }

}
