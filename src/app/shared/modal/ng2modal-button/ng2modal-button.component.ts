import { Ng2ModalComponent } from './../ng2modal.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'Ng2-modal-button',
  templateUrl: './ng2modal-button.component.html',
  styleUrls: ['./ng2modal-button.component.scss']
})
export class Ng2ModalButtonComponent implements OnInit {

  constructor() { }

  @Input() Modal: Ng2ModalComponent;

  ngOnInit() {
  }

  open(){
    
  }

}
