#include <stdio.h>

void printbox(char box[3][3]);
int check(char box[3][3], char sym);
//char box initializes 3x3 character array to represent tic tac toe box with empty spaces initially 
int main() {
    char box[3][3] = { {' ', ' ', ' '}, {' ', ' ', ' '}, {' ', ' ', ' '} };
    int row, col, player_no = 1, result = 0;
    char sym;

   printf("TIC TAC TOE GAME\n");
//starts a do while loop that continues until there is a winner or a draw
    do {
        printbox(box);
        //calls print box function to display current state of box
        player_no = (player_no % 2) ? 1 : 2; 
//updates the current player number (1 or 2)
        printf("Player %d, enter row and column (1-3) to place your sym: ", player_no);
        scanf("%d %d", &row, &col);
//to determine players sym
        if (player_no == 1)
            sym = 'X';
        else
            sym = 'O';
//check if the move is valid(within boundary of box and the selected cell is empty), updates the box with players sym
//checks for a winner, increments the player for the next turn
        if (row >= 1 && row <= 3 && col >= 1 && col <= 3 && box[row - 1][col - 1] == ' ') {
            box[row - 1][col - 1] = sym;
            result = check(box, sym); 
            player_no++;
        } else {
            printf("Invalid move. Please try again.\n");
        }
    } while (result == 0);

    printbox(box);

    if (result == 1)
        printf("Player %d wins!\n", --player_no);
    else
        printf("It's a draw!\n");

    return 0;
}
//defines the print box function to print tic tac toe box
void printbox(char box[3][3]) {
    printf("\n");
    printf(" %c | %c | %c\n", box[0][0], box[0][1], box[0][2]);
    printf("---|---|---\n");
    printf(" %c | %c | %c\n", box[1][0], box[1][1], box[1][2]);
    printf("---|---|---\n");
    printf(" %c | %c | %c\n", box[2][0], box[2][1], box[2][2]);
    printf("\n");
}
//checks if there is a winner or if the box is full
int check(char box[3][3], char sym) {
    for (int i = 0; i < 3; i++) {
        if (box[i][0] == sym && box[i][1] == sym && box[i][2] == sym)
            return 1;
        if (box[0][i] == sym && box[1][i] == sym && box[2][i] == sym)
            return 1;
    }
    if (box[0][0] == sym && box[1][1] == sym && box[2][2] == sym)
        return 1;
    if (box[0][2] == sym && box[1][1] == sym && box[2][0] == sym)
        return 1;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (box[i][j] == ' ')
                return 0;
        }
    }
    return -1;
}
