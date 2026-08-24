#include <iostream>
using namespace std;

int main(){
	setlocale (LC_ALL, "Portuguese");
	int idade;
	cout<<"Digite sua idade: ";
	cin>>idade;
	
	if(idade<18) {
		cout<<"Voce é menor de idade."<<endl;
	} else {
		cout<<"Voce e maior de idade."<<endl;
	}
	
	return 0;
	
}
