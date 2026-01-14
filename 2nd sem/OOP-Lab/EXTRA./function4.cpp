// no argument and no return

#include<iostream>
using namespace std;
void fun();
int main(){
    fun();
    return 0;
}
void fun(){
    float p,r,t;
    cout<<"enter principal, rate and time: ";
    cin>>p>>r>>t;
    float si=(p*t*r)/100;
    cout<<" the si is: " << si;
}