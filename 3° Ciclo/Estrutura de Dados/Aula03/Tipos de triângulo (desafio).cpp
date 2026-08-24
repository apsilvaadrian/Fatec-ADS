#include <iostream>

using namespace std;

int main(){
	
	setlocale (LC_ALL, "Portuguese");
	double ladoA, ladoB, ladoC;
	
	cout<<"Insira a medida do lado A: \n";
	cin>>ladoA;
	cout<<"Insira a medida do lado B : \n";
	cin>>ladoB;
	cout<<"Insira a medida do lado C: \n";
	cin>>ladoC;
	
	if (ladoA==ladoB && ladoA==ladoC) {
		cout<<"O triângulo é equilátero";
	} else if (ladoA == ladoB || ladoA == ladoC || ladoB == ladoC) {
		cout<<"O triângulo é isóceles";
	} else {
		cout<<"O triângulo é escaleno";
	}
	
	return 0;
}
