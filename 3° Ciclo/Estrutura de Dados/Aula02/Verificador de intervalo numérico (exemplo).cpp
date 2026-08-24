#include <iostream>
using namespace std;

int main(){
	setlocale (LC_ALL, "Portuguese");
	int numero;
	cout<<"Digite um número: ";
	cin>>numero;
	
	if(numero>=10 && numero<=20){
		cout<<"O número está no intervalo de 10 a 20."<<endl;
	} else {
		cout<<"O número está fora do intervalo de 10 a 20."<<endl;
	}
	
	return 0;
}
