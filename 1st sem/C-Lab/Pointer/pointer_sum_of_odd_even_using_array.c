#include <stdio.h>
int main()
{
    int a[100],s,osum=0,esum=0,i,*p;
    p=a;
    printf ("Enter the size of array");
    scanf ("%d",&s);
    printf ("Enter the array element");
    for (i=0;i<s;i++)
    {
        scanf ("%d",(p+i));
        if (*(p+i)%2==0)
        {
            esum = esum+*(p+i);
        }
        else
        {
            osum=osum+*(p+i);
        }
    }
    printf ("The even sum is %d and odd sum is %d",esum,osum);
    return 0;
}