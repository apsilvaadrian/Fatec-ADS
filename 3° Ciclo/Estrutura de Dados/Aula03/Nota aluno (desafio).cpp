#include <iostream>

using namespace std;

int main(){
	
	setlocale (LC_ALL, "Portuguese");
	double nota;
	
	cout<<"Digite a nota do aluno: \n";
	cin>>nota;
	
	string paridade = (nota>=6) ? "aprovado":"reprovado";
	cout<< "\nO aluno foi " << paridade << endl; 
	
	/* Também pode-se fazer dessa forma no lugar do string paridade:
	if (nota>=6) {
		cout<<"O aluno foi provado";
	} else {
		cout<<"O aluno foi reprovado";
	}*/
	
	return 0;
}
