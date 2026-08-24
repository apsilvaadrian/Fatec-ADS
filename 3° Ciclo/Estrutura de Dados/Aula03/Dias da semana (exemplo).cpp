#include <iostream>

using namespace std;

int main(){
	int diaSemana;
	
	setlocale (LC_ALL, "Portuguese");
	
	//Leitura do dia da semana (1-7)
	cout<< "Digite o número do dia da semana (1-7): \n";
	cin>>diaSemana;
	
	switch(diaSemana) {
		case 1:
			cout<<"Domingo"<<endl;
			break;
		case 2:
			cout<<"Segunda"<<endl;
			break;
		case 3:
			cout<<"Terça"<<endl;
			break;
		case 4:
			cout<<"Quarta"<<endl;
			break;
		case 5:
			cout<<"Quinta"<<endl;
			break;
		case 6:
			cout<<"Sexta"<<endl;
			break;			
		case 7:
			cout<<"Sábado"<<endl;
			break;
		default:
			cout<<"Dia inválido"<<endl;
			break;								
	}
	
	return 0;
}
