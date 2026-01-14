/*
    Create a function template to find largest among two integer, characters and float
*/

#include <iostream>
using namespace std;

template <class T>
T large(T a,T b){
    T res;
    return (a>b)? a :b;
}

int main(){
    int integer1,integer2;
    cout<<"Enter two number(int): "<<endl;
    cin>>integer1>>integer2;
    cout<<large(integer1,integer2)<<" is larger"<<endl;

    float float1,float2;
    cout<<"Enter two numbers(float): "<<endl;
    cin>> float1>>float2;
    cout<<large(float1,float2)<<" is larger"<<endl;

    char char1, char2;
    cout<<"Enter two characters(string): "<<endl;
    cin>> char1>>char2;
    cout<<large(char1,char2)<<" is larger"<<endl; /* char compare ascii value bata hunxa, > < haru ley kam grxa */

    return 0;
}