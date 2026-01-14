/*
    define a class named bank account to represent the following members......
*/

#include<iostream>
using namespace std;
class Bank_Account{
    int acc_num;
    string name;
    string acc_type;
    int amt;

    public:
    void input(){
        cout<<"Enter the account number, holder name, account type and account balance: "<<endl; 
        cin>>acc_num>>name>> acc_type>> amt;
    }

    void withdraw(){
        int amt1;
        cout<<"Enter the amt of withdrawn money: "; 
        cin>>amt1;
        amt=amt-amt1;
    }

    void deposit(){
        int amt2;
        cout<<"Enter the amt to deposit money: "; 
        cin>>amt2;
        amt=amt+amt2;
    }

    void display(){
        cout<<endl<<"The amount of money in the bank is: "<<amt<<endl<<endl;
    }
};

int main(){
    Bank_Account b;

    b.input ();

    int a;
    cout<< "Enter your choice: "<<endl;
    
    while (1){
        cout<< "Press 1 to Deposit amount"<<endl<< "Press 2 to Withdraw money"<<endl<<"Press 3 to check balance"<<endl<<"Press 4 to exit"<<endl;
        cin>> a;
        cout<<endl;
        if(a==4){
            break;
        }
        else{
            switch(a) {
                case 1:
                b. deposit();
                b. display(); 
                break; 
                case 2:
                b. withdraw();
                b. display(); 
                break; 
                case 3:
                b. display(); 
                break; 
                default:
                break;
            }
        }
    }
return 0;
}