// no argument and return

#include<iostream>
using namespace std;
float fun();
int main(){
    float result=fun();
    cout<<"The si is: "<<result;
    return 0;
}
float fun(){
    float p,r,t;
    cout<<"enter principal, rate and time: ";
    cin>>p>>r>>t;
    return (p*t*r)/100;
}