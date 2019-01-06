import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState, selectAppState } from '@app/store/app.states';
import { Content, Section } from '@app/core/models';
import { GetContent, GetSection } from '@app/store/actions/app.action';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  uriMap: any;
  content: Content;

  getState: Observable<any>;
  getStateSub: any;
  routeSub: any;

  container: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private _location: Location) {
    this.getState = this.store.select(selectAppState);

    this.getStateSub = this.getState.subscribe(({ uriMap, content }) => {
      // console.log({uriMap, content});
      this.content = content;
      this.uriMap = uriMap;
    });
  }

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(route => {
      console.log({ route });
      const { ppgid, pgid, postid } = route;
      const content = this.content;
      const id = ppgid && pgid ? `${ppgid}/${pgid}` : '';

      this.container = content.layout || '';

      console.log({ id, hit: this.uriMap[id] });

      // if (postid) {
      //   this.container = 'page';
      // } else
      if (this.uriMap && this.uriMap[id] !== undefined) {
        const { layout } = this.uriMap[id];
        if (layout === 'page' || (layout === 'section' && postid)) {
          this.container = 'page';
        } else {
          this.container = 'section';
        }
      } else {
        // console.log('getmain')
        // this.store.dispatch(
        //   new GetContent({ path: 'page/main', layout: 'page', doctype: 'html', id: 'main', body: '' })
        // );
        // TODO 404 not found
        console.log('404 not found');
      }

      console.log('container!!!:', this.container);
    });
  }

  ngOnDestroy() {
    if (this.getStateSub) {
      this.getStateSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
