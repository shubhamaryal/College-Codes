// Evaluation of postfix expressions 

#include <iostream>
#include <stack>
#include <string>
using namespace std;

int evaluationFunction(string expression) {
    stack<float> s;

    for(int i=0; i< expression.length(); i++) {
        char c = expression[i];
        
        if(isdigit(c)) {
            s.push(c - '0'); 
        } else {

            float operand2 = s.top(); s.pop();
            float operand1 = s.top(); s.pop();

            switch(c) {
                case '+':
                    s.push(operand1 + operand2);
                    break;
                case '-':
                    s.push(operand1 - operand2);
                    break;
                case '*':
                    s.push(operand1 * operand2);
                    break;
                case '/':
                    s.push(operand1 / operand2);
                    break;
            }
        }
    }
    
    return s.top();
}

int main(){
    // string expression;
    // cout << "Enter a postfix expression: ";
    // cin >> expression;

    // int result = evaluationFunction(expression);
    // cout << "The result of the postfix expression is: " << result << endl;

    string expression1 = "56*";
    float result1 = evaluationFunction(expression1);
    cout << "The result of the postfix expression is: " << result1 << endl;

    string expression2 = "532/15+*+7-";
    float result2 = evaluationFunction(expression2);
    cout << "The result of the postfix expression is: " << result2 << endl;

    string expression3 = "56*32*+93/-79*21/-+";
    float result3 = evaluationFunction(expression3);
    cout << "The result of the postfix expression is: " << result3 << endl;

    return 0;
}
