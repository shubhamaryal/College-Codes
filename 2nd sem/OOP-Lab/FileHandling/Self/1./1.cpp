/* wap in cpp to write the characters entered by the user until the user presses enter key */

#include <iostream>
#include <fstream>

using namespace std;

int main(){
    char ch;

    ofstream file;
    file.open("1.text",ios::out);

    cout<<"Write the characters: "<<endl;

    while ((ch=cin.get())!='\n'){
        file.put(ch);
    }

    file.close();

    cout<<"File written!"<<endl;

    return 0;
}