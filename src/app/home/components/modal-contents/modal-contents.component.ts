import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Renderer3 } from '@angular/core/src/render3/renderer';

@Component({
  selector: 'app-modal-contents',
  templateUrl: './modal-contents.component.html',
  styleUrls: ['./modal-contents.component.css']
})
export class ModalContentsComponent implements OnInit {

  show = true;

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {
    this.routeSub = route.params.subscribe(route => {
      this.show = true;
      this.renderer.addClass(document.body, 'modal-open');
    });
  }

  ngOnInit() { }

  close() {
    this.show = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }
}
