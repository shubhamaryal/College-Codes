#include<stdio.h>
int main()
{
    int a[3][3],esum=0,i,j;
    printf ("Enter the array elements");
    for (i=0;i<3;i++)
    {
        for (j=0;j<3;j++)
        {
            scanf ("%d",*(a+i)+j);
            if (*(*(a+i)+j)%2==0)
            {
                esum=esum+*(*(a+i)+j);
            }
        }
    }
    printf ("Evenn sum is %d",esum);
}