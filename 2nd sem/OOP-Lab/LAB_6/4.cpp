// wap to add 2 matrices by overloading the + operator.

#include <iostream>
using namespace std;

class Matrix{
    int mat[10][10];
    int row,col;

public:
    void input(int r,int c){
        row=r;
        col=c;
        for (int i=0;i<row;i++){
            for (int j=0;j<col;j++){
                cin>>mat[i][j];
            }
        }
    }

    Matrix operator +(Matrix m){
        Matrix s;
        for (int i=0;i<row;i++){
            for (int j=0;j<col;j++){
                s.mat[i][j]=mat[i][j]+m.mat[i][j];
            }
        }
        return s;
    }

    void display(int a,int b){
        for (int i=0;i<a;i++){
            for (int j=0;j<b;j++){
                cout<<mat[i][j]<<" ";
            }
            cout<<endl;
        }
    }

};

int main(){
    Matrix m1,m2,sum;
    int r,c;

    cout<<"enter the number of row and colum: "<<endl;
    cin>>r>>c;
    cout<<"enter the first matrix: "<<endl;
    m1.input(r,c);
    cout<<"enter the second matrix: "<<endl;
    m2.input(r,c);

    sum=m1+m2;

    cout<<"the sum of matrix is: "<<endl;
    sum.display(r,c);

    return 0;
}