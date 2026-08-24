#include <iostream>

using namespace std;

int main() {
    char operacao;
    double num1, num2, resultado;

    cout << "Escolha a operacao (+, -, *, /): ";
    cin >> operacao;

    cout << "Digite o primeiro numero: ";
    cin >> num1;

    cout << "Digite o segundo numero: ";
    cin >> num2;

    switch(operacao) {
        case '+':
            resultado = num1 + num2;
            cout << "Resultado: " << resultado << endl;
            break;
        case '-':
            resultado = num1 - num2;
            cout << "Resultado: " << resultado << endl;
            break;
        case '*':
            resultado = num1 * num2;
            cout << "Resultado: " << resultado << endl;
            break;
        case '/':
            if(num2 != 0) {
                resultado = num1 / num2;
                cout << "Resultado: " << resultado << endl;
            } else {
                cout << "Erro: Divisao por zero!" << endl;
            }
            break;
        default:
            cout << "Operacao invalida!" << endl;
    }

    return 0;
}

