# [Day 22] If Santa, Then Christmas

## Instructions

[Download](files/re-challenge-2.zip)

McSkidy has been faring on well so far with assembly - they got some inside knowledge that the christmas monster is weaponizing if statements. Can they get ahead of the curve?

These programs have been compiled to be executed on Linux x86-64 systems.

Check out the supporting material [here](https://docs.google.com/document/d/1cIHd_YQ_PHhkUPMrEDWAIfQFb9M9ge3OFr22HHaHQOU/edit?usp=sharing). 

The questions below relate to the if2 binary.

## #1 - what is the value of local_8h before the end of the main function?

We are provided with a zip archive that contains 3 files, 2 of which (`if1`, `if1.c`) are used for the training material. To answer the questions, we need `if2` only.

We'll start by opening the binary in radare2 with the `-d` option (debug). Run `aa` to analyze all symbols and functions, and print the `main` function.

```asm
$ r2 -d ./if2
Process with PID 31085 started...
= attach 31085 31085
bin.baddr 0x00400000
Using 0x400000
asm.bits 64
 -- The unix-like reverse engineering framework.
[0x00400a30]> aa
[Invalid address from 0x004843bcith sym. and entry0 (aa)
Invalid address from 0x0044efd6
[x] Analyze all flags starting with sym. and entry0 (aa)
[0x00400a30]> pdf @main
            ; DATA XREF from entry0 @ 0x400a4d
┌ 43: int main (int argc, char **argv, char **envp);
│           ; var int64_t var_8h @ rbp-0x8
│           ; var int64_t var_4h @ rbp-0x4
│           0x00400b4d      55             push rbp
│           0x00400b4e      4889e5         mov rbp, rsp
│           0x00400b51      c745f8080000.  mov dword [var_8h], 8
│           0x00400b58      c745fc020000.  mov dword [var_4h], 2
│           0x00400b5f      8b45f8         mov eax, dword [var_8h]
│           0x00400b62      3b45fc         cmp eax, dword [var_4h]
│       ┌─< 0x00400b65      7e06           jle 0x400b6d
│       │   0x00400b67      8345f801       add dword [var_8h], 1
│      ┌──< 0x00400b6b      eb04           jmp 0x400b71
│      │└─> 0x00400b6d      8345fc07       add dword [var_4h], 7
│      │    ; CODE XREF from main @ 0x400b6b
│      └──> 0x00400b71      b800000000     mov eax, 0
│           0x00400b76      5d             pop rbp
└           0x00400b77      c3             ret
```

To see the value of `local_8h` before the end of the function, we'll set a breakpoint at address `0x00400b76` and we'll run the program.

```asm
[0x00400a30]> db 0x00400b76
[0x00400a30]> dc
hit breakpoint at: 400b76
[0x00400b76]> pdf @main
            ; DATA XREF from entry0 @ 0x400a4d
┌ 43: int main (int argc, char **argv, char **envp);
│           ; var int64_t var_8h @ rbp-0x8
│           ; var int64_t var_4h @ rbp-0x4
│           0x00400b4d      55             push rbp
│           0x00400b4e      4889e5         mov rbp, rsp
│           0x00400b51      c745f8080000.  mov dword [var_8h], 8
│           0x00400b58      c745fc020000.  mov dword [var_4h], 2
│           0x00400b5f      8b45f8         mov eax, dword [var_8h]
│           0x00400b62      3b45fc         cmp eax, dword [var_4h]
│       ┌─< 0x00400b65      7e06           jle 0x400b6d
│       │   0x00400b67      8345f801       add dword [var_8h], 1
│      ┌──< 0x00400b6b      eb04           jmp 0x400b71
│      │└─> 0x00400b6d      8345fc07       add dword [var_4h], 7
│      │    ; CODE XREF from main @ 0x400b6b
│      └──> 0x00400b71      b800000000     mov eax, 0
│           ;-- rip:
│           0x00400b76 b    5d             pop rbp
└           0x00400b77      c3             ret
[0x00400b76]> px @ rbp-0x8
- offset -       0 1  2 3  4 5  6 7  8 9  A B  C D  E F  0123456789ABCDEF
0x7ffe3fbe50d8  0900 0000 0200 0000 5018 4000 0000 0000  ........P.@.....
0x7ffe3fbe50e8  f910 4000 0000 0000 0000 0000 0000 0000  ..@.............
0x7ffe3fbe50f8  0000 0000 0100 0000 0852 be3f fe7f 0000  .........R.?....
0x7ffe3fbe5108  4d0b 4000 0000 0000 0000 0000 0000 0000  M.@.............
0x7ffe3fbe5118  0600 0000 3c00 0000 3000 0000 0300 0000  ....<...0.......
0x7ffe3fbe5128  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe5138  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe5148  0000 0000 0000 0000 0004 4000 0000 0000  ..........@.....
0x7ffe3fbe5158  6b7f ab22 d871 bcf0 f018 4000 0000 0000  k..".q....@.....
0x7ffe3fbe5168  0000 0000 0000 0000 1890 6b00 0000 0000  ..........k.....
0x7ffe3fbe5178  0000 0000 0000 0000 6b7f ebb3 240e 400f  ........k...$.@.
0x7ffe3fbe5188  6b7f 5f33 d871 bcf0 0000 0000 0000 0000  k._3.q..........
0x7ffe3fbe5198  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe51a8  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe51b8  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe51c8  0000 0000 0000 0000 0000 0000 0000 0000  ................
``` 

Before the end of the `main` function, `local_8h` is equal to `9` (`0x7ffe3fbe50d8  09......`).

## #2 - what is the value of local_4h before the end of the main function?

```asm
[0x00400b76]> px @ rbp-0x4
- offset -       0 1  2 3  4 5  6 7  8 9  A B  C D  E F  0123456789ABCDEF
0x7ffe3fbe50dc  0200 0000 5018 4000 0000 0000 f910 4000  ....P.@.......@.
0x7ffe3fbe50ec  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe50fc  0100 0000 0852 be3f fe7f 0000 4d0b 4000  .....R.?....M.@.
0x7ffe3fbe510c  0000 0000 0000 0000 0000 0000 0600 0000  ................
0x7ffe3fbe511c  3c00 0000 3000 0000 0300 0000 0000 0000  <...0...........
0x7ffe3fbe512c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe513c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe514c  0000 0000 0004 4000 0000 0000 6b7f ab22  ......@.....k.."
0x7ffe3fbe515c  d871 bcf0 f018 4000 0000 0000 0000 0000  .q....@.........
0x7ffe3fbe516c  0000 0000 1890 6b00 0000 0000 0000 0000  ......k.........
0x7ffe3fbe517c  0000 0000 6b7f ebb3 240e 400f 6b7f 5f33  ....k...$.@.k._3
0x7ffe3fbe518c  d871 bcf0 0000 0000 0000 0000 0000 0000  .q..............
0x7ffe3fbe519c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe51ac  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe51bc  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffe3fbe51cc  0000 0000 0000 0000 0000 0000 0000 0000  ................
```

And `local_4h` is equal to `2`

## Reverse engineering the binary

Below are the commented disassembled code and the equivalent in C:

```asm
┌ 43: int main (int argc, char **argv, char **envp);
│           ; var int64_t var_8h @ rbp-0x8
│           ; var int64_t var_4h @ rbp-0x4
│           0x00400b4d      55             push rbp                  ; function prologue
│           0x00400b4e      4889e5         mov rbp, rsp              ; function prologue
│           0x00400b51      c745f8080000.  mov dword [var_8h], 8     ; a = 8
│           0x00400b58      c745fc020000.  mov dword [var_4h], 2     ; b = 2
│           0x00400b5f      8b45f8         mov eax, dword [var_8h]   ; eax = 8
│           0x00400b62      3b45fc         cmp eax, dword [var_4h]   ; if 8 <= 2
│       ┌─< 0x00400b65      7e06           jle 0x400b6d              ;   go to 0x400b6d (will not jump)
│       │   0x00400b67      8345f801       add dword [var_8h], 1     ; else a += 1 (a = 9)
│      ┌──< 0x00400b6b      eb04           jmp 0x400b71              : goto end
│      │└─> 0x00400b6d      8345fc07       add dword [var_4h], 7     ; 0x400b6d: b+=7 (will never happen)
│      │    ; CODE XREF from main @ 0x400b6b
│      └──> 0x00400b71      b800000000     mov eax, 0
│           0x00400b76      5d             pop rbp                   ; function epilogue
└           0x00400b77      c3             ret                       ; function epilogue
```

```c
#include <stdio.h>

int main(void){
  int a = 8;
  int b = 2;
  if(a > b){
    a += 1;
  }
  else{
    b += 7;
  }
  return 0;
```
