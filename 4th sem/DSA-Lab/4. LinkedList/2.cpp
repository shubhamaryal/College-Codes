// Implementation of queue using Linked List

#include<iostream>
using namespace std;
struct Node {
    int data; 
    Node* next; 
};

class Queue {
private:
    Node* front;
    Node* rear;

public:
    Queue() {
        front = rear = NULL;
    }
    
    void enqueue(int value) {
        Node* newnode = new Node();
        if (newnode == NULL) {
            cout << "Memory full, cannot enqueue" << endl;
            return;
        }
        newnode->data = value;
        newnode->next = NULL;
        if (rear == NULL) {
            front = newnode;
            rear = newnode;
        } else {
            rear->next = newnode;
            rear = newnode;
        }
        cout << "Enqueued: " << value << endl;
    }
    
    void dequeue() {
        if (front == NULL) {
            cout << "Queue is empty" << endl;
        } else {
            Node* temp = front;
            front = front->next;
            if (front == NULL) {
                rear = NULL;
            }
            cout << "Dequeued: " << temp->data << endl;
            delete temp;
        }
    }
    
    void display() {
        if (front == NULL) {
            cout << "Queue is empty" << endl;
            return;
        }
        Node* temp = front;
        cout << "Queue: ";
        while (temp != NULL) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }
    
};

int main() {
    Queue q;
    int choice, value;
    
    do {
        cout << "\nQueue Operations:" << endl;
        cout << "1. Enqueue" << endl;
        cout << "2. Dequeue" << endl;
        cout << "3. Display" << endl;
        cout << "4. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;
        
        switch(choice) {
            case 1:
                cout << "Enter value to enqueue: ";
                cin >> value;
                q.enqueue(value);
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
                cout << "Invalid choice!" << endl;
        }
    } while(choice != 4);
    
    return 0;
}
