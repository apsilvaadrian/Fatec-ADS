#include <iostream>

using namespace std;

int main(){
	
	setlocale (LC_ALL, "Portuguese");
	int numero;
	
	cout<<"Digite um número: \n";
	cin>>numero;
	
	string paridade = (numero % 2 == 0) ? "par" : "impar";
	cout<<"O número " << numero << " é " << paridade << endl;
	
	return 0;
}
