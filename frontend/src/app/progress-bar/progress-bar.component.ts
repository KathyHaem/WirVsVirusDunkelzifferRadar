import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @Input() public progressValue: number;
  @Input() public type: string;

  constructor() { }

  ngOnInit(): void {
    this.type = this.type ? this.type : ""
  }

}
