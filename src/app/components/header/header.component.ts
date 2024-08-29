import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "1083503518625-e8b4i8mmuvrv5f8u4b2a2dqgj56g7v6r.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { });
  }

  async handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    console.log(response);
  }

  @Output() sortChanged = new EventEmitter<string>();
  sortOption: string = 'recent';

  onSortChange() {
    this.sortChanged.emit(this.sortOption);
  }
}
