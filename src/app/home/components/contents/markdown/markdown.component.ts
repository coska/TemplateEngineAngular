import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Content } from '@app/core/models/content';
import { Location } from '@angular/common';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {

  @Input() content: Content = null;

  constructor(private _location: Location) { }


  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }
}
