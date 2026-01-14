// write a class represnting the distance in feet and inches and overload ++ and -- operators to increment and decrement distance.

// return_type operator symbol(arg_list);
// function's syntax while operator overloading 

// friend fun banayo vne chai argument dinu prxa ani member funcation vye obj bata call hunxa so prdaina argument

// pre ma normal nai hunxa, post ma chai "++(int)" hunxa, last ma chai int add hunxa

#include <iostream>
using namespace std;

class Distance{
    int feet, inch;

    public:
    void input(){
        cout<<"Enter feet and inch: ";
        cin>> feet>> inch;
    }

    void display(){
        cout <<" the new feet and inch is: "<<feet<<"ft and "<<inch<<"inch"<<endl;
    }

    void operator ++(){ 
        feet +=1;
        inch +=1;
        if (inch>=12){
            feet = feet+ (inch/12);
            inch = inch%12;
        }
    }

    friend void operator --(Distance &,int);
};

void operator --(Distance &d1, int){
    d1.feet-=1;
    d1.inch -=1;
    if (d1.inch<0){
        d1.feet-=1;
        d1.inch+=12;
    }
}

int main(){
    Distance d;
    d.input();
    ++d;
    d.display();
    d--;
    d.display();
    return 0;
}