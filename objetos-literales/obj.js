let cliente1 = {
    nombre: 'John',
    deposito: 0,
    imprimir: function () {
        document.write(this.nombre + '<br>');
        document.write(this.deposito + '<br>');
    },
    depositar: function (monto) {
        this.deposito += monto;
    },
    extraer: function (monto) {
        this.deposito -= monto;
    }
};

cliente1.imprimir();
cliente1.depositar(10000);
document.write('Estado luego de depositar 10000 pesos </br>');
cliente1.imprimir();
cliente1.extraer(2000);
document.write('Estado luego de extraer 2000 pesos </br>');
cliente1.imprimir();





