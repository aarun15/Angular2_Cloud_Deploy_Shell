import {Component,ChangeDetectorRef,Inject,ElementRef, ViewChild,ViewEncapsulation, enableProdMode, Host, forwardRef} from '@angular/core';
import { Router }      from '@angular/router';


enableProdMode();
@Component({
  selector   : 'app',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None, 
})
export class AppComponent {



constructor( public _router: Router,public changeRef: ChangeDetectorRef) {
       

    }




}