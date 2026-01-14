#include<stdio.h>
int add(int x);
int main(){
	int a,sum;
	printf("enter any no:\n");
	scanf("%d",&a);
	sum=add(a);
	printf("the sum of the no is: %d",sum);
	return 0;
}
int add(int x){
	while(x!=0){
		int r= x %10;
		return r+ add(x/10);
	}
}



