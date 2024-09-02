import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sortChanged = new EventEmitter<string>();

  sortOption: string = 'recent';
  isLoggedIn: boolean = false;
  userName: string = '';
  userEmail: string = '';
  showGallery: boolean = true;

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    let jwt = localStorage.getItem('tkn');
    if(jwt){
      this.getCredentials(jwt);
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
    
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: environment.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    this.renderGoogleButton();
  }

  renderGoogleButton() {
    if (!this.isLoggedIn) {
      setTimeout(() => {
        const googleButton = document.getElementById("google-button");
        if (googleButton) {
          // @ts-ignore
          google.accounts.id.renderButton(
            googleButton,
            { theme: "outline", size: "large", width: "100%" }
          );
          // @ts-ignore
          google.accounts.id.prompt((notification: PromptMomentNotification) => { });
        }
      }, 0);
    } else {

    }
  }

  handleCredentialResponse(response: any) {
    localStorage.setItem('tkn', response.credential);
    this.getCredentials(response.credential);
    this.isLoggedIn = true;
  }

  onSortChange(sortOption: string) {
    this.sortChanged.emit(sortOption);
  }

  onLogout() {
    // Clear session and user info
    localStorage.removeItem('tkn');
    this.cookieService.deleteAll();
    this.isLoggedIn = false;
    this.userName = '';
    this.userEmail = '';

    setTimeout(() => {
      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }, 0);
  }

  getCredentials(jwt: string){
    const decodedToken: any = jwtDecode(jwt);
    this.userName = decodedToken.name;
    this.userEmail = decodedToken.email;
  }
}
