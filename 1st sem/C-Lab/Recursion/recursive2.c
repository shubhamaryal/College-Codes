#include <stdio.h>
int sum(int a, int b, int c);
int main()
{
    int num,n;
    printf ("Enter the how many number you want");
    scanf ("%d",&n);
    printf ("Enter the number");
    scanf ("%d",&num);
    int result= sum(num,n,1);
    printf ("the sum is %d",result);
    return 0;
}
int sum(int a, int b, int c)
{
    if (b<=c)
    {
        return a;
    }
    else 
    {
        int nn;
        printf ("Enter the nxt number");
        scanf ("%d",&nn);
        return a+sum(nn,b,c+1);
    }
}