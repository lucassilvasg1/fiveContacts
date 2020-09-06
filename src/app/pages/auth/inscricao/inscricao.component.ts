import { Usuario } from './../../../models/usuario/usuario';
import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../../components/form/form.component';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss'],
})
export class InscricaoComponent extends FormComponent implements OnInit {

  constructor(private service: StorageService, private router: Router, public toastController: ToastController) {
    super();
  }
  objeto: Usuario;
  lista: Usuario[];

  ngOnInit() {
    this.objeto = new Usuario();
  }

  submit(formulario: any) {

    this.service.getObject('LISTA_USUARIOS').then(async data => {
      this.lista = data;
      if (this.lista != null && this.lista.find(x => x.email == this.objeto.email) != null) {
        const toast = await this.toastController.create({
          message: 'Já existe usuário cadastrado com esse email.',
          duration: 2000
        });
        toast.present();
      }
      else {
        this.service.setObject(this.objeto, 'LISTA_USUARIOS');
        this.router.navigate(['/landing']);
      }
    });;

  }

}
