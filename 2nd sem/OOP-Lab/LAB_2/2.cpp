/*
    wap to implement a class employee having the following member........
*/

#include<iostream>
using namespace std;
class Employee{
    int emp_id;
    string name;
    string address;
    int salary;
    string department;

    public:
    void input(int b){
        cout<<"Enter the id, name, address, saalary, department of the employee["<<b+1<<"]"<<endl;
        cin>>emp_id>>name>>address>>salary>>department;
    }
    void display(int a){
        if (salary>55000){
            cout<<"the data of the employee["<< a+1 <<"] is: "<<emp_id<<"\t"<<name<<"\t"<<address<<"\t"<<salary<<"\t"<<department<<endl;
        }
    }
};

int main(){
    Employee e[5];
    for (int i=0;i<5;i++){
        e[i].input(i);
    }
    for (int i=0;i<5;i++){
        e[i].display(i);
    }
    return 0;
}