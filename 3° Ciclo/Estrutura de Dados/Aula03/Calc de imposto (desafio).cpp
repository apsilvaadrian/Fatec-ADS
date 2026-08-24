#include <iostream>

using namespace std;

int main(){
	
	setlocale (LC_ALL, "Portuguese");
	double salario, imposto;
	
	cout<<"Digite o salário anual: \n";
	cin>>salario;
	
	imposto = (salario<=20000) ? 0
	: (salario<= 50000)
	? salario*0.10
	: salario*0.20;
	
	cout<< "O imposto a pagar é: R$ " <<imposto;
	
	
	

	return 0;
}
