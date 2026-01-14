#include<stdio.h>
int hcf (int a , int b, int c);
int main ()
{
    int n1,n2,min,result;
    printf("ENter any number");
    scanf ("%d%d",&n1,&n2);
    if (n1>n2)
    {
        min=n2;
    }
    else
    {
        min=n1;
    }
    result = hcf (n1,n2,min);
    printf ("the hcf is= %d",result);
}
int hcf (int a , int b, int c)
{
    if (a%c==0 && b%c==0)
    {
        return c;
    }
    else 
    {
        return hcf (a,b,c-1);
    }
}