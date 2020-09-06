import { Contato } from '../contato/contato';

export class Usuario {
    nome: string;
    email: string;
    senha: string;
    manter: boolean;
    listaContatos: Contato[];
}