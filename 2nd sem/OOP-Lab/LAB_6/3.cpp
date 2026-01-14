// wap to overload the airthematic operator(+), relational operator (<=), and stream operator(>>) to operate on the objects of the class
// 'Time' having hr, min and sec as its data members.

#include <iostream>
using namespace std;

class Time{
    int hr,min,sec;

    public:

    /*
    friend void operator>>(istream &, Time);    // normal call ko lagi

    friend istream & operator>>(istream &, Time);    // chaining call ko lagi
    */

    friend istream & operator>>(istream &, Time &);

    void operator +(Time &t2){
        Time t;
        t.hr= hr+t2.hr;
        t.min= min+t2.min;
        t.sec= sec+t2.sec;
        cout<<"The sum of 2 time is: "<<t.hr<<"hr "<<t.min<<"min "<<t.sec<<"sec "<<endl;
    }

    bool operator<=( Time& t)  {
        if (hr < t.hr){
            return true;
        }
        else if (hr == t.hr && min < t.min){
            return true;
        }
        else if (hr == t.hr && min == t.min && sec <= t.sec){
            return true;
        }
        else{
            return false;
        }
    }

};

istream & operator>>(istream &input, Time &t){
    cout<<"Enter time(hr,min,sec): ";
    input >>t.hr>>t.min>>t.sec;
    return input;
}

int main(){
    Time t1,t2;
    cin>>t1>>t2;     // cin pahilla janxa, t1 paxi janxa
                    // friend function matra use grna milxa for cin and cout
    t1+t2;

    if (t1 <= t2) {
        cout << "t1 is less than or equal to t2" << endl;
    } 
    else {
        cout << "t1 is greater than t2" << endl;
    }

    return 0;
}