/*
    Create class named id, assess, board and then create classes named result that calculates the finals marks of the student
    which is composed of 20% of the assessment mark and 80% of the board exam mark and should display the final result
*/ 

#include <iostream>
using namespace std;

class Id{
    protected:
        string name;
        int roll;

    public:
        void input(){
            cout<<"Enter name: "<<endl;
            cin>>name;
            cout<<"Enter roll.no.: "<<endl;
            cin>>roll;
        }
        void display(){
            cout<<"Name: "<<name<<endl;
            cout<<"Roll.no.:"<<roll<<endl;
        }
};

class Assess{
    protected:
        float marks;

    public:
        void input(){
            cout<<"Enter the assessment marks: "<<endl;
            cin>> marks;
        }
        void display(){
            cout<<"Assessment Marks: "<<marks<<endl;
        }
};

class Board{
    protected:
        float marks;

    public:
        void input(){
            cout<<"Enter the board marks: "<<endl;
            cin>> marks;
        }
        void display(){
            cout<<"Board Marks: "<<marks<<endl;
        }
};

class Result : public Id, public Assess, public Board{
    private:
        float finalMarks;

    public:
        void input(){
            Id::input();
            Assess::input();
            Board::input();
        }
        void display(){
            Id::display();
            Assess::display();
            Board::display();
            cout<<"Final Marks: "<<finalMarks<<endl;
        }
        void calculate(){
            finalMarks= 0.2*Assess::marks+0.8*Board::marks;
        }
};

int main(){
    Result r;
    r.input();
    r.calculate();
    r.display();

    return 0;
}