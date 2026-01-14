/*
    Write a program to overload the relational operators to compare the 
    length (in meter and centimeter) of two objects.
*/

#include <iostream>
using namespace std;

class Distance{
    int meters,centimeters;

    public:
    void input(){
        cin>>meters>>centimeters;
    }

    int toCentimeters(){
        return meters*100+centimeters;
    }

    bool operator==(Distance d){
        return toCentimeters()==d.toCentimeters();
    }

    bool operator>(Distance d){
        return toCentimeters()>d.toCentimeters();
    }

    bool operator<(Distance d){
        return toCentimeters()<d.toCentimeters();
    }
};

int main(){
    Distance d1,d2;

    cout<<"Enter the Distance 1 (meter,centimeter): "<<endl;
    d1.input();
    cout<<"Enter the Distance 2 (meter,centimeter): "<<endl;
    d2.input();

    if (d1==d2){
        cout<<"Distance 1 is equal to Distance 2"<<endl;
    }
    if (d1>d2){
        cout<<"Distance 1 is greater than Distance 2"<<endl;
    }
    if (d1<d2){
        cout<<"Distance 2 is greater than Distance 1"<<endl;
    }

    return 0;
}


