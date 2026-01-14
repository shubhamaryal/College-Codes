//argument and no return

#include<iostream>
using namespace std;
void fun(float p,float r,float t);
int main(){
    float a,b,c;
    cout<< "Enter principle, rate, time ";
    cin >> a >> b >> c ;
    fun(a,b,c);
    return 0;
}
void fun(float p,float r,float t){
    float si=(p*t*r)/100;
    cout<<" the si is: " << si;
}