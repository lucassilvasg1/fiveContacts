import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Usuario } from 'src/app/models/usuario/usuario';
import { StorageService } from 'src/app/services/storage.service';
import { Contato } from 'src/app/models/contato/contato';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  myContacts: Contact[];
  myContactsFilter: Contact[];
  lista: Usuario[];

  constructor(private modalController: ModalController,
    private contacts: Contacts,
    private callNumber: CallNumber,
    private service: StorageService,
    public toastController: ToastController) { }

  ngOnInit() { }

  loadContacts() {
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    };

    this.contacts.find(['*'], options).then((contacts: Contact[]) => {
      this.myContacts = contacts;
      this.myContactsFilter = this.myContacts;

    });
  }


  async favorite(contact: Contact) {
    let logado: Usuario = JSON.parse(window.localStorage.usuario_logado);

    let contato: Contato = new Contato();
    contato.nome = contact.name.givenName;
    contato.telefone = contact.phoneNumbers[0].value;

    if (logado.listaContatos.length > 5) {
      const toast = await this.toastController.create({
        message: 'Você já tem 5 usuários favoritados.',
        duration: 2000
      });
      toast.present();
    }
    else {
      logado.listaContatos.push(contato);
      const toast = await this.toastController.create({
        message: 'Contato favoritado.',
        duration: 2000
      });
      toast.present();
    }

    window.localStorage.usuario_logado = JSON.stringify(logado);
    this.service.getObject('LISTA_USUARIOS').then(async data => {
      this.lista = data;
      if (this.lista != null && this.lista.find(x => x.email == logado.email) != null) {
        let i = this.lista.findIndex(x => x.email == logado.email);
        this.lista[i] = logado;
        this.service.setObject('LISTA_USUARIOS', this.lista);
      }

    });

  }

  async getItens(e) {
    this.myContactsFilter = this.myContacts;
    let val: String = e.target.value;
    if (val && val.trim() != '') {
      this.myContactsFilter = this.myContactsFilter.filter((item) => {
        if (item != null && item.name != null && item.name.givenName != null && item.name.givenName != '') {
          let val2: String = item.name.givenName;
          return (val2.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        return false;
      });

    }
    else {
      this.myContactsFilter = this.myContacts;
    }

  }
}
