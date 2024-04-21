import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-scren',
  templateUrl: './welcome-scren.component.html',
  styleUrls: ['./welcome-scren.component.scss'],
})
export class WelcomeScrenComponent  implements OnInit {
  phoneBtnClicked = false;
  computerBtnClicked = false;
  alexaBtnClicked = false;
  loading = false;

  constructor(private router: Router) { }

  ngOnInit() {}

  setTrue(btn: string) {
    this.loading = true;
    if (btn === 'phone') {
      this.phoneBtnClicked = true;
    } else if (btn === 'computer') {
      this.computerBtnClicked = true;
    } else if (btn === 'alexa') {
      this.alexaBtnClicked = true;
    }
    setTimeout(() => {
      this.router.navigate(['/companion']);
    }, 1000);
  }
}
