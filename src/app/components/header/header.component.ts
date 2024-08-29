import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private cookieService: CookieService
    ){}

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "1083503518625-e8b4i8mmuvrv5f8u4b2a2dqgj56g7v6r.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    if (!this.isLoggedIn) {
      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    }
  }

  handleCredentialResponse(response: any) {
    // Guardar el token JWT en localStorage
    localStorage.setItem('tkn', response.credential);
    // Decodificar el token JWT para obtener la información del usuario
    const decodedToken: any = jwtDecode(response.credential);
    this.userName = decodedToken.name;
    this.userEmail = decodedToken.email;

    // Marcar que el usuario ha iniciado sesión y ocultar el botón
    this.isLoggedIn = true;
  }

  onSortChange() {
    this.sortChanged.emit(this.sortOption);
  }

  onLogout() {
    // Clear session and user info
    localStorage.removeItem('tkn');
    this.cookieService.deleteAll();
    this.isLoggedIn = false;
    this.userName = '';
    this.userEmail = '';

    // Re-render the Google Sign-In button
    setTimeout(() => {
      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }, 0);
  }
}
