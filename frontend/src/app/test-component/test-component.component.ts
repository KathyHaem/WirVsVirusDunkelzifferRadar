import {Component, Inject, OnInit} from '@angular/core';
import {TestService} from '@wirvsvirus/api-client';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(private testService: TestService) { }

  ngOnInit(): void {
  }

  private helloWorld(): string
  {
    let testString = "";
    this.testService.appHelloWorld().toPromise().then((tests) => {
      tests.forEach((test) => testString.concat(testString, test.testId.toString()));
    });
    return testString;
  }

}
