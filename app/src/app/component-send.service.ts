import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentSendService {
  comp:any[]=[];
  onComponentClicked = new EventEmitter<any[]>();

  sendComponentDetails(comp:any[]) {
    this.onComponentClicked.emit(comp);
  }
}
