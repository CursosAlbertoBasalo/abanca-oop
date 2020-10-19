// LÓGICA DE NEGOCIO

const cuentaIBAN = 'ES123456789';
let saldo = 0;
const movimientos = [];

function ingresar(cantidad: number, fecha: Date) {
  saldo += cantidad;
  movimientos.push(['ingreso', cantidad, fecha]);
}

// GESTIÓN DE INTERFACE HTML

function alClickEnIngresar() {
  const cantidad = +obtenerValor('#cantidad');
  ingresar(cantidad, new Date());
  actualizarHTML();
}

function actualizarValor(id: string, valor: string) {
  const elemento: HTMLElement = document.getElementById(id);
  elemento.textContent = valor;
}

function agregarElementos(id: string, movimientos: any[]) {
  const elemento: HTMLElement = document.getElementById(id);
  elemento.innerHTML = '';
  const fragment = document.createDocumentFragment();
  movimientos.forEach(function (movimiento) {
    const li = document.createElement('li');
    li.textContent =
      movimiento[0] + ': ' + movimiento[1] + '€ el ' + new Date(movimiento[2]).toLocaleDateString();
    fragment.appendChild(li);
  });
  elemento.appendChild(fragment);
}

function obtenerValor(id: string): string {
  const elemento = document.querySelector<HTMLInputElement>(id);
  return elemento.value;
}

function responderAEventos() {
  document.getElementById('botonIngresar').addEventListener('click', alClickEnIngresar);
}

function actualizarHTML() {
  actualizarValor('iban', cuentaIBAN);
  actualizarValor('saldo', saldo.toLocaleString());
  agregarElementos('movimientos', movimientos);
}

// INICIO DE PROGRAMA

main();

function main() {
  responderAEventos();
  actualizarHTML();
}
