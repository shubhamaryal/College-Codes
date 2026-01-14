#include <iostream>
#include <fstream>
using namespace std;

int main(){
    char ch;

    fstream file1,file2;
    file1.open("first.text" ,ios::in);
    file2.open("second.text",ios::out);

    while(1){
        ch=file1.get();
        if(file1.eof()==1){
            break;
        }
        if (ch>='a' && ch<='z'){
        ch-=32;
        }
        file2.put(ch);
    }

    file1.close();
    file2.close();

    return 0;
}
