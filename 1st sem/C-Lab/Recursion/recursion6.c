#include<stdio.h>
int ser(int n);
int main()
{
	int a,i=1,z;
	printf("Enter the number of terms :");
	scanf("%d",&z);
	do
	{
		a=ser(i);
		printf("%d\t",a);
		i++;
		
		
	}while(i!=z+1);
}
int ser(int n)
{
	if(n==1)
	return 1;
	else
	return(1+10*ser(n-1));
}