#include <iostream>
using namespace std;

#define MAXSIZE 10

class Stack {
private:
    int array[MAXSIZE];
    int top;

public:
    Stack() {
        top = -1;
    }

    void push(int num) {
        if (top >= MAXSIZE - 1) {
            cout << "The Stack is full";
        }
        else {
            array[++top] = num;
        }
    }
    void pop() {
        if (top == -1) {
            cout << "Stack is empty";
        }
        else {
            top--;
        }
    }
    void display() {
        for (int i = 0; i <= top; i++) {
            cout << array[i] << " ";
        }
    }
};

int main() {
    Stack a;
    a.push(5);
    a.push(4);
    a.push(5);
    a.push(8);
    a.push(9);
    a.display();

    return 0;
}