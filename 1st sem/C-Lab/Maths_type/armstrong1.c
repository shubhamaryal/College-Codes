#include<stdio.h>
int main ()
{
    int aa,r,a,b,i, temp;
    printf ("Enter the range[2 numbers]");
    scanf ("%d%d",&a,&b);
    for (i=a;i<=b;i++)
    {
    temp =i;
    aa=0;
        while (temp!=0)
        {
            r=temp%10;
            aa= aa+r*r*r;
            temp=temp/10;
        }
    printf ("%d\n",aa);
    }
}