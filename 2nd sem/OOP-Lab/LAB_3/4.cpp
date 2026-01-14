/*
    create a new class named city that will havve two member variables CityNmae (char[50]) and DistFromKtm (float). 
    Add member function to set and retrive the CityName and DistFromKtm seperately. Add new function ADdDistance that 
    takes two arguments of class city and return the sum of DistFromKtm of two Arguments. In the main, initialize three 
    city objects. Set the first and second city to be pokhara and Dhangadi. Display the sum of DistFromKtm of pokhara 
    and Dhangadi
*/

#include <iostream>
using namespace std;

class City{
    char CityName[50];
    float DistFromKtm;

    public:
    void inputCity(){
        cout<<"Enter the name of city: "<<endl;
        cin>>CityName;
    }

    void inputDistance(){
        cout<<"Enter the distance: "<<endl;
        cin>> DistFromKtm;
    }

    float AddDistance(City c){
        float add = DistFromKtm+c.DistFromKtm;
        return add;
    }
};

int main(){
    City c1,c2;
    c1.inputCity();
    c1.inputDistance();
    c2.inputCity();
    c2.inputDistance();

    float sum = c1.AddDistance(c2);

    cout<<"The total distance is: "<<sum;

    return 0;
}