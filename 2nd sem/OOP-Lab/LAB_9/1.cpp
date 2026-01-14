/*
    Create a function templates to find the sum of two integers and two float values.
*/

#include <iostream>
using namespace std;

template <class T>
T sum(T a,T b){
    T res;
    res = a+b;
    return res;
}

int main(){
    int integer1,integer2;
    cout<<"Enter two number(int): "<<endl;
    cin>>integer1>>integer2;
    cout<<"The sum of integers is: "<<sum(integer1,integer2) <<endl;

    float float1,float2;
    cout<<"Enter two numbers(float): "<<endl;
    cin>> float1>>float2;
    cout<<"The sum of two float values is: "<< sum(float1,float2)<<endl;
    
    return 0;
}