// are the two string permutations of each other?
import java.util.*;

class Main {

  public boolean perm(String str1, String str2){

    if(str1.length() != str2.length()) return false;

    int[] holder = new int[128];

    for(int i = 0; i < str1.length(); i++){
      holder[str1.charAt(i)] ++;
    }

    for(int i=0; i < str2.length(); i++){
      holder[str2.charAt(i)] --;
      if(holder[str2.charAt(i)] < 0){
        return false;
      }
    }
    return true;
  }

  public static void main(String[] args) {
    Main m = new Main();
    // System.out.println(m.perm("hello", "hello"));
  }
}


//////////////////////////////////////////////////////////
//Replace space with %20

import java.util.*;

class Main {

  void replaceString(char[] str, int trueLength){

    int spaceCount = 0;
    for(int i = 0; i < trueLength; i++){
      if(str[i] == ' '){
        System.out.println(str[i]);
        spaceCount ++;
      }
    }


    int newLength = trueLength + spaceCount * 2;
    for(int j = trueLength - 1; j <= 0; j--){
      if(str[j] == ' '){
        str[newLength - 1] = '0';
        str[newLength - 2] = '2';
        str[newLength - 3] = '%';
        newLength -= 3;
      }
      else{
        str[newLength - 1] = str[j];
        newLength -= 1;
      }
    }

    // System.out.println(str);
  }

  public static void main(String[] args) {
    Main m = new Main();
    char[] array = new String("hello there").toCharArray();
      // char[] array = {'a'};
    int length = array.length;
    m.replaceString(array, length);
  }
}

///////////////////////////////////////////////////////////////////
// Palidrome permutations

import java.util.*;

class Main {

  public boolean pp(String str){
    Set<Character> unpaired = new HashSet<Character>();

    for(char c : str.toCharArray()){
      if(unpaired.contains(c)){
        unpaired.remove(c);
      }
      else{
        unpaired.add(c);
      }
    }

    return unpaired.size() <= 1;
  }

  public static void main(String[] args) {
    Main m = new Main();

    String str1 = "tactcoa";
    // System.out.println(m.pp(str1));
  }
}
