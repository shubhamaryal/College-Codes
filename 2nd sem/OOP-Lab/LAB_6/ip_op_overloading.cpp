// overloading << and >> operator i.e input outout overloading garyeko

/* 
    friend istream/ostream &operator >>/<< (istream&, class_name&);

    istream/ostream &operator >>/<< (istream &abc, class_name &xyz);
*/

#include <iostream>
using namespace std;

class Time {
    int hr;
    int min;
    int sec;

public:
    friend istream &operator>>(istream &, Time &); 
    friend ostream &operator<<(ostream &, Time &); 
};

istream &operator>>(istream &input, Time &t) {
    cout << "Enter time(hr, min, sec): ";
    input >> t.hr >> t.min >> t.sec;
    return input;
}

ostream &operator<<(ostream &output, Time &t) {
    output << "Time is: " << t.hr << " hr " << t.min << " min " << t.sec << " sec";
    return output;
}

int main() {
    Time t;
    cin >> t; 
    cout << t; 

    return 0;
}

