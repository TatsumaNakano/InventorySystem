namespace InventorySystem.Utility
{
    public class Tool
    {

        //引用元
        //https://ameblo.jp/ponkotsuameba/entry-11599269577.html
        public static string KatakanaToAlphabet(string s1)
        {
            string s2 = "";
            for (int i = 0; i < s1.Length; i++)
            {
                // 小さい文字が含まれる場合
                if (i + 1 < s1.Length)
                {
                    // 「ッ」が含まれる場合
                    if (s1.Substring(i, 1).CompareTo("ッ") == 0)
                    {
                        s2 += KatakanaCharToAlphabet(s1.Substring(i + 1, 1)).Substring(0, 1);
                        continue;
                    }


                    // それ以外の小さい文字
                    string s3 = KatakanaCharToAlphabet(s1.Substring(i, 2));
                    if (s3.CompareTo("*") != 0)
                    {
                        s2 += s3;
                        i++;
                        continue;
                    }
                }
                s2 += KatakanaCharToAlphabet(s1.Substring(i, 1));
            }
            return s2;
        }

        static string KatakanaCharToAlphabet(string s1)
        {
            switch (s1)
            {
                case "ア": return "a";
                case "イ": return "i";
                case "ウ": return "u";
                case "エ": return "e";
                case "オ": return "o";
                case "カ": return "ka";
                case "キ": return "ki";
                case "ク": return "ku";
                case "ケ": return "ke";
                case "コ": return "ko";
                case "サ": return "sa";
                case "シ": return "shi";
                case "ス": return "su";
                case "セ": return "se";
                case "ソ": return "so";
                case "タ": return "ta";
                case "チ": return "chi";
                case "ツ": return "tsu";
                case "テ": return "te";
                case "ト": return "to";
                case "ナ": return "na";
                case "ニ": return "ni";
                case "ヌ": return "nu";
                case "ネ": return "ne";
                case "ノ": return "no";
                case "ハ": return "ha";
                case "ヒ": return "hi";
                case "フ": return "fu"; // "fu" for ふ, not "hu"
                case "ヘ": return "he";
                case "ホ": return "ho";
                case "マ": return "ma";
                case "ミ": return "mi";
                case "ム": return "mu";
                case "メ": return "me";
                case "モ": return "mo";
                case "ヤ": return "ya";
                case "ユ": return "yu";
                case "ヨ": return "yo";
                case "ラ": return "ra";
                case "リ": return "ri";
                case "ル": return "ru";
                case "レ": return "re";
                case "ロ": return "ro";
                case "ワ": return "wa";
                case "ヲ": return "wo";
                case "ン": return "n";
                case "ガ": return "ga";
                case "ギ": return "gi";
                case "グ": return "gu";
                case "ゲ": return "ge";
                case "ゴ": return "go";
                case "ザ": return "za";
                case "ジ": return "ji";
                case "ズ": return "zu";
                case "ゼ": return "ze";
                case "ゾ": return "zo";
                case "ダ": return "da";
                case "ヂ": return "ji";
                case "ヅ": return "du";
                case "デ": return "de";
                case "ド": return "do";
                case "バ": return "ba";
                case "ビ": return "bi";
                case "ブ": return "bu";
                case "ベ": return "be";
                case "ボ": return "bo";
                case "パ": return "pa";
                case "ピ": return "pi";
                case "プ": return "pu";
                case "ペ": return "pe";
                case "ポ": return "po";
                case "キャ": return "kya";
                case "キィ": return "kyi";
                case "キュ": return "kyu";
                case "キェ": return "kye";
                case "キョ": return "kyo";
                case "シャ": return "sha";
                case "シィ": return "syi";
                case "シュ": return "shu";
                case "シェ": return "she";
                case "ショ": return "sho";
                case "チャ": return "cha";
                case "チィ": return "cyi";
                case "チュ": return "chu";
                case "チェ": return "che";
                case "チョ": return "cho";
                case "ニャ": return "nya";
                case "ニィ": return "nyi";
                case "ニュ": return "nyu";
                case "ニェ": return "nye";
                case "ニョ": return "nyo";
                case "ヒャ": return "hya";
                case "ヒィ": return "hyi";
                case "ヒュ": return "hyu";
                case "ヒェ": return "hye";
                case "ヒョ": return "hyo";
                case "ミャ": return "mya";
                case "ミィ": return "myi";
                case "ミュ": return "myu";
                case "ミェ": return "mye";
                case "ミョ": return "myo";
                case "リャ": return "rya";
                case "リィ": return "ryi";
                case "リュ": return "ryu";
                case "リェ": return "rye";
                case "リョ": return "ryo";
                case "ギャ": return "gya";
                case "ギィ": return "gyi";
                case "ギュ": return "gyu";
                case "ギェ": return "gye";
                case "ギョ": return "gyo";
                case "ジャ": return "ja";
                case "ジィ": return "ji";
                case "ジュ": return "ju";
                case "ジェ": return "je";
                case "ジョ": return "jo";
                case "ヂャ": return "dha";
                case "ヂィ": return "dhi";
                case "ヂュ": return "dhu";
                case "ヂェ": return "dhe";
                case "ヂョ": return "dho";
                case "テャ": return "tha";
                case "ティ": return "thi";
                case "テュ": return "thu";
                case "テェ": return "the";
                case "テョ": return "tho";
                default: return "*";
            }
        }
    }
}
