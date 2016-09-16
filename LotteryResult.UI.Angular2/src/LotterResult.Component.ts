import { Component } from '@angular/core';
import {ApiService} from './api.Service';
import 'rxjs/Rx';
@Component({
  selector: 'lottery-app',
  providers: [ApiService],
  templateUrl: 'src/templates/_lotteryResult.html'
})
export class LotterResultComponent {
  public LotteryPrograms;
  public programChanged;
  constructor(private apiService: ApiService) {
    apiService.getLotteryPrograms().subscribe(result => {
      this.LotteryPrograms = result;

    });

    this.programChanged = ($event) => {
      console.log($event);
    }

  }

}
