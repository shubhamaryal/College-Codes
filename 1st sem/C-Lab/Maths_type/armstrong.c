#include<stdio.h>
int main ()
{
    int n,a=0,r;
    printf ("Enter the number");
    scanf ("%d",&n);
    while (n!=0)
    {
        r=n%10;
        a= a+r*r*r;
        n=n/10;
    }
    printf ("%d",a);
}