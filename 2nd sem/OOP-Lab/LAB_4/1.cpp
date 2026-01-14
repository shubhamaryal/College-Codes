//create a class time with data member day, hours, minutes, and seconds. Initialize all the data members using a constructor. 
//WAP to add two time objects using necessary member function and display the result.

#include <iostream>
using namespace std;

class Time{
    int day, hrs, min, sec; 

    public:
    Time(){}
    
    Time(int a, int b, int c, int d){
        day=a;
        hrs=b;
        min=c;
        sec=d;
    }

    Time add_time(Time t){
        Time result;

        result.day=day+t.day;
        result.hrs=hrs+t.hrs;
        result.min=min+t.min;
        result.sec=sec+t.sec;

        if (result.sec >= 60) {
            result.min = result.min+ result.sec / 60;
            result.sec = result.sec%60; 
        }

        if (result.min >= 60) {
            result.hrs += result.min / 60;
            result.min =result.min % 60;
        }

        if (result.hrs >= 24) {
            result.day += result.hrs / 24;
            result.hrs =result.hrs% 24;
        }

        return result;
    }

    void display(){
        cout << day << " days, " << hrs << " hours, "<< min << " minutes, " << sec << " seconds" << endl;
    }
};

int main(){
    Time t1(10,20,30,40),t2(10,20,30,40),t3;
    t3 = t2.add_time(t1);
    t3.display();
    
    return 0;
}