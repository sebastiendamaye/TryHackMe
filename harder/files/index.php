<?php
  session_start();
  require("auth.php");
  $login = new Login;
  $login->authorize();
  require("hmac.php");
  require("credentials.php");
?> 
  <table style="border: 1px solid;">
     <tr>
       <td style="border: 1px solid;">url</td>
       <td style="border: 1px solid;">username</td>
       <td style="border: 1px solid;">password (cleartext)</td>
     </tr>
     <tr>
       <td style="border: 1px solid;"><?php echo $creds[0]; ?></td>
       <td style="border: 1px solid;"><?php echo $creds[1]; ?></td>
       <td style="border: 1px solid;"><?php echo $creds[2]; ?></td>
     </tr>
   </table>
