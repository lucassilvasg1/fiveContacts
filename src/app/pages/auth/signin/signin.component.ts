import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/components/form/form.component';
import { Usuario } from 'src/app/models/usuario/usuario';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent extends FormComponent implements OnInit {

  objeto: Usuario;
  lista: Usuario[];

  constructor(private service: StorageService, private router: Router, public toastController: ToastController) {
    super();
  }

  ngOnInit() {
    this.objeto = new Usuario();
  }

  async submit(formulario: any) {
    if (!this.objeto.manter) {
      this.objeto.manter = false
    }
    this.service.getObject('LISTA_USUARIOS').then(async data => {
      this.lista = data;
      if (this.lista != null && this.lista.find(x => x.email == this.objeto.email && x.senha == this.objeto.senha) != null) {
        let usuario = this.lista.find(x => x.email == this.objeto.email && x.senha == this.objeto.senha);
        this.objeto.email = usuario.email;
        this.service.removeStorageValue(0, 'USUARIO_LOGADO')
        window.localStorage.removeItem('usuario_logado');
        this.objeto.listaContatos = [];
        this.service.setObject("USUARIO_LOGADO", this.objeto);
        window.localStorage.usuario_logado = JSON.stringify(this.objeto);

        this.router.navigate(['/home']);

      }
      else {
        const toast = await this.toastController.create({
          message: 'Email ou senha inválida.',
          duration: 2000
        });
        toast.present();
      }
    });;
  }

}
