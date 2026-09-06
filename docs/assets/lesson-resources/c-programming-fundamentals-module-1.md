# C Programming Fundamentals

## Module 1: Programming and C Foundations

Build a small temperature-reporting program and learn how source becomes an executable.

### 1.1 Set up the C toolchain

The compiler translates C source and the linker resolves referenced functions. Save a .c file, compile with warnings enabled and run the resulting executable. Treat a compiler error, linker error and runtime failure as different evidence; changing random lines hides the cause.

### 1.2 Variables and data types

A variable has a type, a value and a lifetime. Choose an integer for a count and a floating-point type when fractions matter. Initialize before reading. Conversion can lose information: assigning 3.75 to an int does not retain its fractional part.

### 1.3 Operators and expressions

Operators combine values, but their operand types influence the result. Integer division truncates toward zero. Parentheses make intended grouping visible; they do not change operand types. Test a calculation with values that produce a fraction rather than only conveniently divisible inputs.

### 1.4 Input and output

Formatted output requires conversion specifiers that match the arguments. Read input with a bounded buffer and validate the conversion result. Input is untrusted data, including local terminal input. A failed conversion must not leave the program using an uninitialized value.

## Worked lab

#include <stdio.h>
int main(void) {
  int count = 3;
  double total = 71.0;
  printf("Average: %.2f\n", total / count);
  return 0;
}
// Compile: cc -Wall -Wextra report.c -o report

The output is Average: 23.67. Replacing total with an integer changes the division before formatting, so the intermediate result must be inspected.

## Assignment

1. Compile and explain one warning.
   Your evidence: 

2. Compare integer and floating-point division with 7 and 2.
   Your evidence: 

3. Add validated terminal input for the reading count.
   Your evidence: 

## Evidence to submit

Compilable source, command transcript and input validation cases.

## Review

Why does changing only the printed number of decimals not repair integer division?

Your reasoning: 
