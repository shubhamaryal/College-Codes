//argument and return

#include<iostream>
using namespace std;

float fun(float p,float r,float t);

int main(){
    float a,b,c;
    cout<< "Enter principle, rate, time ";
    cin >> a >> b >> c ;
    float result =  fun(a,b,c);
    cout<< "The SI is: " <<result ;
    return 0;
}

float fun(float p,float r,float t){
    return (p*t*r)/100;
}