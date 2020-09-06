import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { Usuario } from './models/usuario/usuario';
import { PagesService } from './services/pages.service';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private router: Router,
    private pagesService: PagesService,
    private service: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Get Menus For Side Menu
      this.appPages = this.pagesService.getPages();
      this.menuController.enable(true); // Make Sidemenu disable

      if (window.localStorage != null) {
        let logado: Usuario = JSON.parse(window.localStorage.usuario_logado);
        if (logado != null && logado.manter) {
          this.router.navigate(['/home']);
        }
      }

    });


  }

  // Signout Button
  signout() {
    this.router.navigate(['/onbroading']);
    window.localStorage.removeItem('usuario_logado');
    this.menuController.enable(false); // Make Sidemenu disable
  }
}
