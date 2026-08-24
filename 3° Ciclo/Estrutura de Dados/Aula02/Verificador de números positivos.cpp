#include <iostream>
using namespace std;

int main(){
	setlocale (LC_ALL, "Portuguese");
	int numero;
	cout<<"Digite um número: ";
	cin>>numero;

	if (numero>=1){
		cout<<"O número é positivo"<<endl;		
	} else if (numero<0){
		cout<<"O número é negativo"<<endl;
	} else {
		cout<<"O número é 0"<<endl;
	}
	
	return 0;
}
