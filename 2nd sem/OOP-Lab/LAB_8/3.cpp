/*
    Wap with four classes student, test, sport and result. Assume necessary data members and member functions yourself.
    To calculate the total marks and percentage scored by a student.
*/

#include <iostream>
using namespace std;

class Student{
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

class Test: public Student{
    protected:
        float maths;
        float eng;

    public:
        void input(){
            Student::input();
            cout<<"Enter the  marks in maths: "<<endl;
            cin>> maths;
            cout<<"Enter the  marks in english: "<<endl;
            cin>> eng;
        }
        void display(){
            cout<<"Maths Marks: "<<maths<<endl;
            cout<<"English Marks: "<<eng<<endl;
        }
};

class Sport{
    protected:
        float score;

    public:
        void input(){
            cout<<"Enter the score in sports: "<<endl;
            cin>> score;
        }
        void display(){
            cout<<"Score in sports: "<<score<<endl;
        }
};

class Result: public Test,public Sport{
    private:
        float total;
        float percentage;
    
    public:
        void input(){
            Test::input();
            Sport::input();
        }
        void display(){
            calculation();
            Test::display();
            Sport::display();
            cout<<"Total: "<<total<<endl;
            cout<<"Percentage: "<<percentage<<"%"<<endl;
        }
        void calculation(){
            total = Test::maths+Test::eng+Sport::score;
            percentage=(total/300)*100;
        }
};

int main(){
    Result r;
    r.input();
    r.display();

    return 0;
}