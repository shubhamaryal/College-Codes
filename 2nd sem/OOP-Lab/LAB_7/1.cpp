// make a class memory with data members to represent bytes, kilobytes and megatybes. Read the value of memory in bytes from the user as basic
// type and display the result in user-defined type. [Hint 1 kb=1024b , 1mb = 1024kb]

#include <iostream>
using namespace std;

class Memory{
    int b,kb,mb;

public:
    Memory(int bytes){
        b=bytes;
        kb=0;
        mb=0;

        if (b>=1024){
            kb+=b/1024;
            b=b%1024;
        }
        if (kb>=1024){
            mb+=kb/1024;
            kb=kb%1024;
        }   
    }

    void display(){
        cout<<b<<"bytes, "<<kb<<"kilobytes, "<<mb<<"megabytes.";
    }
};

int main(){
    int bytes;
    cout<<"Enter the number of bytes: ";
    cin>>bytes;

    Memory m=bytes;

    cout<<"The given bytes in proper format is: ";
    m.display();

    return 0;
}