/**
 *  Implementation of Queue using array 
 * (i) both pointer (head/tail=0) vary
 */

#include <iostream>
using namespace std;
#define MAX 5

class Queue {
    private:
        int data[MAX];
        int rear, front;

    public:
        Queue() {
            rear = -1; 
            front = 0; 
        }
        void enqueue();
        void dequeue();
        void display();
};

void Queue::enqueue() {
    if (rear == MAX - 1) {
        cout << "Queue is full" << endl;
    } else {
        int value;
        cout << "Enter the value to be inserted: ";
        cin >> value;
        rear++;
        data[rear] = value;
        cout << "Inserted " << value << endl;
    }
}

void Queue::dequeue() {
    if (front > rear ){
        cout << "Queue is empty" << endl;
    } else {
        front++;
        cout << "Deleted " << data[front] << endl;
    }
}

void Queue::display() {
    if (front > rear) {
        cout << "Queue is empty" << endl;
    } else {
        cout << "Queue elements are: ";
        for (int i = front; i <= rear; i++) {
            cout << data[i] << " ";
        }
        cout << endl;
    }
}

int main() {
    Queue q;
    int choice;
    do {
        cout << "1. Enqueue\n2. Dequeue\n3. Display\n4. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;
        switch (choice) {
            case 1:
                q.enqueue();
                break;
            case 2:
                q.dequeue();
                break;
            case 3:
                q.display();
                break;
            case 4:
                cout << "Exiting..." << endl;
                break;
            default:
                cout << "Invalid choice, please try again." << endl;
        }
    } while (choice != 4);
    
    return 0;
}