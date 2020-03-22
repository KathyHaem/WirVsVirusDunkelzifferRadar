import {Component, Inject, OnInit} from '@angular/core';
import { TestService } from "../../api";

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(private testService: TestService) { }

  public testString: string = "";

  ngOnInit(): void {
    this.testService.appHelloWorld().toPromise().then((response) => {
      this.testString = response.toString();
    });
  }
}
