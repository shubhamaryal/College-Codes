#include<stdio.h>
int add(int a);
int main()
{
    int n,result;
    printf ("Enter the number");
    scanf ("%d",&n);
    result= add(n);
    printf ("%d",result);
    return 0;
}
int add(int a)
{
    int r,  s=0;
    while (a!=0)
    {
        r=a%10;
        return r+add(a/10);
    }
}