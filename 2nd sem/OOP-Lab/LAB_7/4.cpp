/*
    wap to convert degree celsius to degree fahrenheit using class to class
        hint: (f-32)*(5/9) = c
*/

#include <iostream>
using namespace std;

class Celcius{
    float cel;

public:
    void input(){
        cout<<"Enter the temperature: ";
        cin>> cel;
    }

    float get(){
        return cel;
    }
};

class Fahrenheit{
    float fah;

public:
    Fahrenheit (Celcius c1){
        float a ;
        a = c1.get();
        fah = ((9/float(5))*a)+32;
    }

    void display(){
        cout<< "the converted temperature is: "<< fah;
    }
};

int main(){
    Celcius c;
    c.input();

    Fahrenheit f=c;
    f.display();

    return 0;
}