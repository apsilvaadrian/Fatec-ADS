#include <iostream>

using namespace std;

int main(){
	
	setlocale (LC_ALL, "Portuguese");
	int numero;
	
	cout<<"Digite um número inteiro: \n";
	cin>>numero;
	
	if (numero %2 ==0) {
		cout<<"Par";
	} else {
		cout<<"Impar";
	}

	return 0;
}
