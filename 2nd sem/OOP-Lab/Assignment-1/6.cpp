/*
    Write a program to display N number of characters by using default 
    arguments for both parameters. Assume that the function takes two 
    arguments one character to be printed and other numbers of characters 
    to be printed.
*/

#include <iostream>
using namespace std;

void print(char ch='*',int count=10) {
    for (int i=0;i<count;i++){
        cout<<ch;
    }
}

int main(){
    print();
    return 0;
}
