/*
    Create a class mDistance to store the values in meter and centimeter and 
    class fDistance to store values in feet and inches. Perform addition of 
    object of mDistance and object of fDistance by friend function.
*/

#include <iostream>
using namespace std;

class mDistance;
class fDistance;

class mDistance{
    int meter;
    int centimeter;

    public:
    void input(){
        cout<<"Enter the distance (meter,centimeter): ";
        cin>>meter>>centimeter;
    }

    friend void add(mDistance,fDistance);
};

class fDistance{
    int feet;
    int inches;

    public:
    void input(){
        cout<<"Enter the distance (feet,inches): ";
        cin>>feet>>inches;
    }

    friend void add(mDistance,fDistance);
};

void add(mDistance a,fDistance b){
    float total = a.centimeter + (a.meter*100) + (b.feet*12*2.54) + (b.inches*2.54);
    cout<<"The sum is: "<<total<<" cm";
}

int main(){
    mDistance m;
    fDistance f;

    m.input();
    f.input();
    add(m,f);

    return 0;
}