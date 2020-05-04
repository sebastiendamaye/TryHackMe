# [Day 21] Reverse Elf-ineering

## Instructions

[Download](files/files.zip)

McSkidy has never really touched low level languages - this is something they must learn in their quest to defeat the Christmas monster.

Download the archive and apply the command to the following binary files: `chmod +x file-name`

Please note that these files are compiled to be executed on Linux x86-64 systems.

The questions below are regarding the `challenge1` binary file.

Read the supporting materials [here](https://drive.google.com/file/d/1maTcdquyqnZCIcJO7jLtt4cNHuRQuK4x/view?usp=sharing).


## #1 - What is the value of local_ch when its corresponding movl instruction is called (first if multiple)?

The [files.zip](files/files.zip) archive contains 2 binaries: `challenge1` and `file1`:

~~~
$ file *
challenge1: ELF 64-bit LSB executable, x86-64, version 1 (GNU/Linux), statically linked, for GNU/Linux 3.2.0, BuildID[sha1]=884f57a67cddb0fc0104f1d556ab051183952324, not stripped
file1:      ELF 64-bit LSB executable, x86-64, version 1 (GNU/Linux), statically linked, for GNU/Linux 3.2.0, BuildID[sha1]=2f008113913d9954124126e4c874b1394588c972, not stripped
files.zip:  Zip archive data, at least v?[0x314] to extract
~~~

We are told in the instructions that the questions relate to `challenge1`. The other binary (`file1`) is used for the training material.

Let's debug the binary with radare2:

```asm
$ r2 -d ./challenge1 
Process with PID 29174 started...
= attach 29174 29174
bin.baddr 0x00400000
Using 0x400000
asm.bits 64
 -- Log On. Hack In. Go Anywhere. Get Everything.
[0x00400a30]> pdf @main
p: Cannot find function at 0x00400b4d
[0x00400a30]> aa
[Invalid address from 0x004843acith sym. and entry0 (aa)
Invalid address from 0x0044efc6
[x] Analyze all flags starting with sym. and entry0 (aa)
[0x00400a30]> pdf @main
            ; DATA XREF from entry0 @ 0x400a4d
┌ 35: int main (int argc, char **argv, char **envp);
│           ; var int64_t var_ch @ rbp-0xc
│           ; var int64_t var_8h @ rbp-0x8
│           ; var int64_t var_4h @ rbp-0x4
│           0x00400b4d      55             push rbp
│           0x00400b4e      4889e5         mov rbp, rsp
│           0x00400b51      c745f4010000.  mov dword [var_ch], 1
│           0x00400b58      c745f8060000.  mov dword [var_8h], 6
│           0x00400b5f      8b45f4         mov eax, dword [var_ch]
│           0x00400b62      0faf45f8       imul eax, dword [var_8h]
│           0x00400b66      8945fc         mov dword [var_4h], eax
│           0x00400b69      b800000000     mov eax, 0
│           0x00400b6e      5d             pop rbp
└           0x00400b6f      c3             ret
```

We see in the `main` function that the value `1` is moved to `var_ch` at address `0x00400b51`. Let's set a breakpoint, step in, and print the value of `rbp-0xc` (`var_ch`).

```asm
[0x00400a30]> db 0x00400b51
[0x00400a30]> dc
hit breakpoint at: 400b51
[0x00400b51]> ds
[0x00400b58]> px @ rbp-0xc
- offset -       0 1  2 3  4 5  6 7  8 9  A B  C D  E F  0123456789ABCDEF
0x7ffec78aa344  0100 0000 1890 6b00 0000 0000 4018 4000  ......k.....@.@.
0x7ffec78aa354  0000 0000 e910 4000 0000 0000 0000 0000  ......@.........
0x7ffec78aa364  0000 0000 0000 0000 0100 0000 78a4 8ac7  ............x...
0x7ffec78aa374  fe7f 0000 4d0b 4000 0000 0000 0000 0000  ....M.@.........
0x7ffec78aa384  0000 0000 0600 0000 3c00 0000 3000 0000  ........<...0...
0x7ffec78aa394  0300 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa3a4  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa3b4  0000 0000 0000 0000 0000 0000 0004 4000  ..............@.
0x7ffec78aa3c4  0000 0000 883a 1764 8650 5208 e018 4000  .....:.d.PR...@.
0x7ffec78aa3d4  0000 0000 0000 0000 0000 0000 1890 6b00  ..............k.
0x7ffec78aa3e4  0000 0000 0000 0000 0000 0000 883a 5712  .............:W.
0x7ffec78aa3f4  13df aff7 883a a375 8650 5208 0000 0000  .....:.u.PR.....
0x7ffec78aa404  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa414  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa424  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa434  0000 0000 0000 0000 0000 0000 0000 0000  ................
```

We see the value `1` (`0x7ffec78aa344  01......`).

## #2 - What is the value of eax when the imull instruction is called?

In the below extract, we see that `imul` is called at address `0x00400b62`:

```asm
[0x00400b58]> pdf @main
            ; DATA XREF from entry0 @ 0x400a4d
            ;-- rax:
┌ 35: int main (int argc, char **argv, char **envp);
│           ; var int64_t var_ch @ rbp-0xc
│           ; var int64_t var_8h @ rbp-0x8
│           ; var int64_t var_4h @ rbp-0x4
│           0x00400b4d      55             push rbp
│           0x00400b4e      4889e5         mov rbp, rsp
│           0x00400b51 b    c745f4010000.  mov dword [var_ch], 1
│           ;-- rip:
│           0x00400b58      c745f8060000.  mov dword [var_8h], 6
│           0x00400b5f      8b45f4         mov eax, dword [var_ch]
│           0x00400b62      0faf45f8       imul eax, dword [var_8h]
│           0x00400b66      8945fc         mov dword [var_4h], eax
│           0x00400b69      b800000000     mov eax, 0
│           0x00400b6e      5d             pop rbp
└           0x00400b6f      c3             ret
```

Let's set a breakpoint, step in, and check the value of eax:

```asm
[0x00400b58]> db 0x00400b62
[0x00400b58]> dc
hit breakpoint at: 400b62
[0x00400b62]> ds
[0x00400b66]> dr rax
0x00000006
```

`eax` now has the value `6`.

## #3 - What is the value of local_4h before eax is set to 0?

We see that `eax` will be set to `0` at address `0x00400b69`:

```asm
[0x00400b66]> pdf @main
            ; DATA XREF from entry0 @ 0x400a4d
┌ 35: int main (int argc, char **argv, char **envp);
│           ; var int64_t var_ch @ rbp-0xc
│           ; var int64_t var_8h @ rbp-0x8
│           ; var int64_t var_4h @ rbp-0x4
│           0x00400b4d      55             push rbp
│           0x00400b4e      4889e5         mov rbp, rsp
│           0x00400b51 b    c745f4010000.  mov dword [var_ch], 1
│           0x00400b58      c745f8060000.  mov dword [var_8h], 6
│           0x00400b5f      8b45f4         mov eax, dword [var_ch]
│           0x00400b62 b    0faf45f8       imul eax, dword [var_8h]
│           ;-- rip:
│           0x00400b66      8945fc         mov dword [var_4h], eax
│           0x00400b69      b800000000     mov eax, 0
│           0x00400b6e      5d             pop rbp
└           0x00400b6f      c3             ret
```

To see the value of `local_4h` before `eax` is set to `0`, we set a breakpoint at address `0x00400b69` (it will stop before the instruction is executed), and we read the value of `rbp-0x4` (`local_4h`):

```
[0x00400b66]> db 0x00400b69
[0x00400b66]> dc
hit breakpoint at: 400b69
[0x00400b69]> px @ rbp-0x4
- offset -       0 1  2 3  4 5  6 7  8 9  A B  C D  E F  0123456789ABCDEF
0x7ffec78aa34c  0600 0000 4018 4000 0000 0000 e910 4000  ....@.@.......@.
0x7ffec78aa35c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa36c  0100 0000 78a4 8ac7 fe7f 0000 4d0b 4000  ....x.......M.@.
0x7ffec78aa37c  0000 0000 0000 0000 0000 0000 0600 0000  ................
0x7ffec78aa38c  3c00 0000 3000 0000 0300 0000 0000 0000  <...0...........
0x7ffec78aa39c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa3ac  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa3bc  0000 0000 0004 4000 0000 0000 883a 1764  ......@......:.d
0x7ffec78aa3cc  8650 5208 e018 4000 0000 0000 0000 0000  .PR...@.........
0x7ffec78aa3dc  0000 0000 1890 6b00 0000 0000 0000 0000  ......k.........
0x7ffec78aa3ec  0000 0000 883a 5712 13df aff7 883a a375  .....:W......:.u
0x7ffec78aa3fc  8650 5208 0000 0000 0000 0000 0000 0000  .PR.............
0x7ffec78aa40c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa41c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa42c  0000 0000 0000 0000 0000 0000 0000 0000  ................
0x7ffec78aa43c  0000 0000 0000 0000 0000 0000 0000 0000  ................
```

The answer is `6` (`0x7ffec78aa34c  06......`)
