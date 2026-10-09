export interface Agendamento {
  id: string;
  nome_cliente: string;
  email_cliente: string;
  barbeiros: {
    nome: string;
  } | null; 
}
