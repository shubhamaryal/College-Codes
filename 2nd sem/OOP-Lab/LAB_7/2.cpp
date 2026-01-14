// wap to read height of a person in feet and inches and convert it into cm by using suitable conversion method.
// hint: 1ft= 12inch, 1inch = 2.54cm

/*  JPT 

#include <iostream>
using namespace std;

class Height{
    float f,i,c;

public:
    Height(float feet, float inch){
        f=feet;
        c=0;

        i=f*12+inch ;
        c=i*2.54;
    }

    void display(){
        cout<<c<<"cm";
    }
};

int main(){
    float feet,inch;
    cout<<"Enter the height(ft,inch): ";
    cin>> feet>>inch;

    Height h(feet,inch);

    cout<< "The height in cm: ";
    h.display();

    return 0;
}

*/

#include <iostream>
using namespace std;

class Height{
    int feet , inch;

public:
    void input(){
        cout<<"enter the height (feet, inch): ";
        cin>>feet>>inch;
    }

    operator float(){
        inch=feet*12+inch;
        float res= inch*2.54;
        return res;
    }
};

int main(){
    Height h;

    float cm;
    h.input();
    cm=h;
    cout<<"The height in cm is: "<<cm;

    return 0;
}