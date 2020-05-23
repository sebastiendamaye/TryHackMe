#!/usr/bin/php5
<?php
namespace KD2;

/*
    Bubble Babble Binary Data Encoding - PHP5 Library

    See http://bohwaz.net/archives/web/Bubble_Babble.html for details.

    Copyright 2011 BohwaZ - http://bohwaz.net/

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, version 3 of the
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Based on :
    - Bubble Babble spec: http://wiki.yak.net/589/Bubble_Babble_Encoding.txt
    - Nitrxgen PHP script: http://www.nitrxgen.net/bubblebabble.php
    - Bubble Babble encoder for Go: http://codereview.appspot.com/181122

    Use:

    $encoded = BubbleBabble::Encode('Pineapple');
    // => xigak-nyryk-humil-bosek-sonax

    $decoded = BubbleBabble::Decode('xigak-nyryk-humil-bosek-sonax');
    // => Pineapple

    If your prefer procedural code, just use:

    function babble_encode($str)
    {
        return BubbleBabble::Encode($str);
    }

    function babble_decode($str)
    {
        return BubbleBabble::Decode($str);
    }
*/

class BubbleBabble_Exception extends \Exception
{
}

class BubbleBabble
{
    // The table of Babble vowels
    static protected $vowels = 'aeiouy';

    // The table of Babble consonants.
    static protected $consonants = 'bcdfghklmnprstvzx';

    // Encodes $src in a babble string
    static public function Encode($src)
    {
        $src = (string) $src; // Just to make sure PHP doesn't casts $a = '123456789'; as an int
        $out = 'x';
        $c = 1; // checksum

        for ($i = 0;; $i += 2)
        {
            if ($i >= strlen($src))
            {
                $out .= self::$vowels[$c%6];
                $out .= self::$consonants[16];
                $out .= substr(self::$vowels, $c/6, 1);
                break;
            }

            $byte1 = ord($src[$i]);

            $out .= self::$vowels[((($byte1>>6)&3)+$c)%6];
            $out .= self::$consonants[($byte1>>2)&15];
            $out .= self::$vowels[(($byte1&3)+($c/6))%6];

            if ($i+1 >= strlen($src))
                break;

            $byte2 = ord($src[$i + 1]);
            $out .= self::$consonants[($byte2>>4)&15];
            $out .= '-';
            $out .= self::$consonants[$byte2&15];

            $c = ($c * 5 + $byte1 * 7 + $byte2) % 36;
        }

        $out .= 'x';
        return $out;
    }

    static protected function _decode2WayByte($a1, $a2, $offset)
    {
        if ($a1 > 16)
            throw new BubbleBabble_Exception("Corrupt string at offset ".$offset);

        if ($a2 > 16)
            throw new BubbleBabble_Exception("Corrupt string at offset ".($offset+2));

        return ($a1 << 4) | $a2;
    }

    static protected function _decode3WayByte($a1, $a2, $a3, $offset, $c)
    {
        $high2 = ($a1 - ($c%6) + 6) % 6;

        if ($high2 >= 4)
            throw new BubbleBabble_Exception("Corrupt string at offset ".$offset);

        if ($a2 > 16)
            throw new BubbleBabble_Exception("Corrupt string at offset ".($offset+1));

        $mid4 = $a2;
        $low2 = ($a3 - ($c/6%6) + 6) % 6;

        if ($low2 >= 4)
            throw new BubbleBabble_Exception("Corrupt string at offset ".($offset+2));

        return $high2<<6 | $mid4<<2 | $low2;
    }

    protected static function _decodeTuple($src, $pos)
    {
        $tuple = array(
            strpos(self::$vowels, $src[0]),
            strpos(self::$consonants, $src[1]),
            strpos(self::$vowels, $src[2])
        );

        if (isset($src[3]))
        {
            $tuple[] = strpos(self::$consonants, $src[3]);
            $tuple[] = '-';
            $tuple[] = strpos(self::$consonants, $src[5]);
        }

        return $tuple;
    }

    public static function Decode($src)
    {
        $src = trim((string) $src);

        $c = 1; // checksum

        // Integrity checks
        if (substr($src, 0, 1) != 'x')
            throw new BubbleBabble_Exception("Corrupt string at offset 0: must begin with a 'x'");

        if (substr($src, -1) != 'x')
            throw new BubbleBabble_Exception("Corrupt string at offset 0: must end with a 'x'");

        if (strlen($src) != 5 && strlen($src)%6 != 5)
            throw new BubbleBabble_Exception("Corrupt string at offset 0: wrong length");

        $src = str_split(substr($src, 1, -1), 6);
        $last_tuple = count($src) - 1;
        $out = '';

        foreach ($src as $k=>$tuple)
        {
            $pos = $k * 6;
            $tuple = self::_decodeTuple($tuple, $pos);

            if ($k == $last_tuple)
            {
                if ($tuple[1] == 16)
                {
                    if ($tuple[0] != $c % 6)
                        throw new BubbleBabble_Exception("Corrupt string at offset $pos (checksum)");
                    if ($tuple[2] != (int)($c / 6))
                        throw new BubbleBabble_Exception("Corrupt string at offset ".($pos+2)." (checksum)");
                }
                else
                {
                    $byte = self::_decode3WayByte($tuple[0], $tuple[1], $tuple[2], $pos, $c);
                    $out .= chr($byte);
                }
            }
            else
            {
                $byte1 = self::_decode3WayByte($tuple[0], $tuple[1], $tuple[2], $pos, $c);
                $byte2 = self::_decode2WayByte($tuple[3], $tuple[5], $pos);

                $out .= chr($byte1);
                $out .= chr($byte2);

                $c = ($c * 5 + $byte1 * 7 + $byte2) % 36;
            }
        }

        return $out;
    }

    // Returns true if $string seems to be a BubbleBabble encoded string
    static public function Detect($string)
    {
        if ($string[0] != 'x' || substr($string, -1) != 'x')
            return false;

        if (strlen($string) != 5 && strlen($string)%6 != 5)
            return false;

        if (!preg_match('/^(['.self::$consonants.self::$vowels.']{5})(-(?1))*$/', $string))
            return false;

        return true;
    }
}

if (empty($argv[1]) || ($argv[1] == '-d' && empty($argv[2])))
{
    echo "Usage: " . $argv[0] . " [-d] FILE" . PHP_EOL;
    exit(1);
}

if ($argv[1] == '-d')
{
    $file = $argv[2];
    $decode = true;
}
else
{
    $file = $argv[1];
    $decode = false;
}

if ($file == '-')
{
    $content = file_get_contents('php://stdin');
}
else
{
    $content = file_get_contents($file);
}

try {
    if ($decode)
    {
        echo BubbleBabble::Decode($content);
    }
    else
    {
        echo BubbleBabble::Encode($content);
        echo PHP_EOL;
    }
}
catch (BubbleBabble_Exception $e)
{
    echo "Error: " . $e->getMessage();
    echo PHP_EOL;
}