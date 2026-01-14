/*
    wap with a class cricketer that has data membeers name,age, no. of matches played. From the class cricketer, derive two classs
    bowler and batsman. The bowler class should give no. of  wickets as data memebers and the batsman classs should have no. of
    runs and and no. of centuries as data members. Use appropriate member functions in all classes to make the program meaninigful.
*/

#include <iostream>
using namespace std;

class Cricketer{
    protected:
        string name;
        int age;
        int match;

    public:
        void input(){
            cout<<"Enter name, age and no. of matches of the player: "<<endl;
            cin>> name>>age>>match;
        }

        void display(){
            cout<<"Name: "<<name<<" Age: "<<age<<" Matches: "<< match<<endl;
        }
};

class Bowler: public Cricketer{
    private:
        int wickets;

    public:
        void inputBowler(){
            input();
            cout<<"Enter the number of wickets: "<<endl;
            cin>> wickets;
        }

        void displayBowler(){
            display();
            cout<<"Wickets: "<< wickets<<endl;
        }
};

class Batsman: public Cricketer{
    private:
        int run;
        int centuries;

    public:
        void inputBat(){
            input();
            cout<<"Enter run and centuries: "<<endl;
            cin>> run>>centuries;
        }

        void displayBat(){
            display();
            cout<< "Run: "<<run<<" Centuries: "<<centuries<<endl;
        }
};

int main(){
    Bowler b;
    b.inputBowler();
    b.displayBowler();

    Batsman bm;
    bm.inputBat();
    bm.displayBat();
    
    return 0;
}