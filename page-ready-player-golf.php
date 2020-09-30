<?php
     global $wpdb;
     global $tee_times_array;
     
      $tee_times_array = array("CET 3pm", "CET 4pm", "BST 3pm", "BST 4pm", "EDT 3pm", "EDT 4pm", "PDT 3pm", "PDT 4pm");
     $path = "/wp-content/themes/webxrlink/";
    if(@$_POST['update']){
        if($_POST['update'] == 'match'){
           
            extract($_POST);
           $sql = "update rpg_matches set player = '$player', opponent='$opponent', tee_time = '$tee_time' where id = $id";
     $wpdb->query($sql);

        }


    }



    global $wpdb;
    $sql = "select * from rpg_players";
    $q = $wpdb->get_results($sql);
   // var_dump($q);
function get_players(){
    global $wpdb;
     $sql = "select * from rpg_players where cancelled <> 1 order by tee_time, last_name ";

   return $wpdb->get_results($sql);
    
}
function get_matches(){
    global $wpdb;
     $sql = "select * from rpg_matches order by id asc ";

   return $wpdb->get_results($sql);
    
}

function get_player_by_id($id){
    global $wpdb;
     $sql = "select * from rpg_players where id = $id";
    return $wpdb->get_row($sql);
    
}
function get_player_by_email($email){
    global $wpdb;
     $sql = "select id from rpg_players where email like '%$_POST[email]'";
    $q = $wpdb->get_var($sql);
    if($q){
        return $q;
    } else {
       return 0;
    }   
}

function get_player_options($players, $id){
    $options = '<option>Select Player</option>';
    $selected = '';
    foreach($players as $key=>$player){
          $selected = '';
        if($id == $player->id){
            $selected = ' selected';
        }
        $options.= "<option value='$player->id'$selected>$player->first_name $player->last_name  $player->tee_time</option>";
    }
    return $options;

}
function get_tee_times($tee_time){
    global $tee_times_array;
    $tee_times = $tee_times_array;
    $options = '';
    foreach($tee_times_array as $key=>$value){
        $selected = '0';
        if($value == $tee_time){
            $selected = ' selected';
        }
        $options.= "<option value='$value'$selected>$value</option>";
    }
    return $options;


}

function matchBoard(){
    $matches = get_matches();
    $players = get_players();
    
   


    foreach($matches as $key => $match){
      
      print "<a href='$match->match_id' target='_blank'>$match->course  $match->id</a>";

    matchForm($match,$players);
        

    }


}
function matchForm($match,$players){
print "<form method='post' id='form$match->id' action='?matches=1#form$match->id'>
   <input type='hidden' name='id' value='$match->id'> 
   <input type='hidden' name='update' value='match'> 
    <select name='player'>".get_player_options($players,$match->player)."</select> VS 
 <select name='opponent'>".get_player_options($players,$match->opponent)."</select>
 <select name='tee_time'>".get_tee_times($match->tee_time)."</select>
 <input type='submit' value='SET'>";
  if(@$match->email != ''){
                print "<a href='mailto:$$match->email'><i class='fa fa-envelope'></i></a>";
             }
             if(@$match->$linkedin != ''){
                    print "<a href='$$match->linkedin' target='_new'><i class='fa fa-linkedin'></i></a>";
            
             }
print" </form>

<br>";
}

function get_matches_by_time($tee_time){

 global $wpdb;
     $sql = "select * from rpg_matches where tee_time = '$tee_time' order by id asc ";



   return $wpdb->get_results($sql);
}
function get_emails_by_matchtime(){
    global $tee_times_array;
    foreach($tee_times_array as $key => $value){
        $matches = get_matches_by_time($value);
        print "<BR><hR>$value<br>";
        foreach($matches as $key => $value){
            extract((array) $value);
            $p = get_player_by_id($player);
            $o = get_player_by_id($opponent);
        // var_dump($p);
    //        print "$p->last_name vs. $o->$last_name"; 
            print $p->email."<br>";
            
        
            print $o->email."<br>";
            
        
        }

    }
}
 function get_player_matches(){
    $players = get_players();
    print "<table>";
    foreach($players as $key => $player){
        print "<tr><td>$player->first_name $player->last_name</td>";
        print "<tr><td><table><tr>";
        $matches = get_my_matches($player->id);
        


         foreach($matches as $key => $match){
            print "<td class='match-thumb'>";
            display_match($match,$player);
            print "</td>";
            
         }
        print "<tr></table></td>";        
        print "</tr>";
    }
    print "</table>";

 }


function get_my_matches($id){
    global $wpdb;
    $sql = "select * from rpg_matches where ((player = $id) or (opponent = $id)) order by tee_time";
    $q = $wpdb->get_results($sql);
    $my_matches = array();
    foreach($q as $key => $value){
        array_push($my_matches,(array) $value);
    }
    return $my_matches;
}
function display_match($match,$p){
    extract($match);
            print "<div class='course $course'>";
            print "<a href='$match_id' target='_blank'>$tee_time $course<br>";
            //print "$player | $opponent | $p->id";
           print " ";
            if($match['player'] == $p->id){
                $x = extract((array) get_player_by_id($opponent));
                 print "$p->first_name $p->last_name vs. $first_name $last_name";
                 
            } else if ($match['opponent'] == $p->id){
                $x = extract((array) get_player_by_id($player));
                 print "$first_name $last_name vs. $p->first_name $p->last_name";
                  
                
                
            }
            print "</a>
            </div>";
            print "<div class='contact'>";
            if(@$_GET['players']){
                print $match['course']. " ". $match['id'];
            }
            
           print " Contact $first_name $last_name";
            if(@$email != ''){
                print "<a href='mailto:$email'><i class='fa fa-envelope'></i></a>";
             }
             if(@$linkedin != ''){
                    print "<a href='$linkedin' target='_new'><i class='fa fa-linkedin'></i></a>";
            
             }
             print '</div>';

}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Ready Player Golf</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" crossorigin="anonymous">
<style>
    h1,h2,h3,h4{
        text-align:center;
    }
    header,footer{
        width:100%;
        background:#000;
        color:#fff;
    }
    header #logo{
        width:200px;
        margin:0px auto;
    }
  
    header #logo img{
        width:100%;
    }
      @media(max-width:767px){
        header{
            display:none !important;
        }
    }
    .container{
        max-width: 800px;
        margin:0px auto;

    }
    h1{
        text-align:center;
    }
    .rpg {
       color:#2ea3bb;
       background:#000;
       border-radius:10px;
       width:300px;
        padding:15px;
       font-size:1rem;
        display:block;
         margin:0px auto;
    }
    .email-input{
        width:300px;
        padding:15px;
        font-size:1rem;
        margin:0px auto;
        display:block;
        text-align:center;

    }
   
    .Beach{
        background:url(<?=$path?>rpg/Beach.jpg) center center no-repeat;
    }
    .Forest{
        background:url(<?=$path?>rpg/Forest.jpg) center center no-repeat;

    }
    .Desert{
        background:url(<?=$path?>rpg/Desert.jpg) center center no-repeat;
    }
     .course{
        height:0px;
        position:relative;
        padding:15px 0px 56.4% 15px;
        background-size:cover;
        font-size:1.618rem;
        font-weight:bold;

    }
     .course a{
        display:flex;
        flex-direction: row; 
        height:100%;
     }
    @media(max-width:800px){
        .course{
            font-size:3.5vw;
            }
        }
    .contact{
        position:relative;
        display:block;
        padding:10px;
          margin-bottom:25px;
          text-align:right;
    }
    .contact a{
        float:right;
        display:inline-block;
        margin-left:10px;
    }
    .footer a{
        display:block; text-align:center;
    }
    
</style>

</head>

<body>
<header><div id="logo"><img src="<?=$path?>rpg/rpg-logo.png"></div></header>
<main>


    <section>
     <div class='container'>
  
<form method="post" action ="?">
<h2>1. FIND YOUR MATCHES</h2>

<strong style="text-align:center; display:block;"> Get the links that activate your matches<br></strong><br>
   
    <input class="email-input" type="text" placeholder="Enter email used to donate to MSF" name="email" size="25" value="<?=@$_POST['email']?>"><br><input type="submit" value="Look Up My Matches" class="rpg">
             <br>

    <em  style="text-align:center; display:block;">
    
    (does not have to be the same as your Oculus account email)</em><BR>
    


</form>
</div>
</section>
 <section>
 <div class='container'>
<?php

if(@$_POST['email']){
   $id = get_player_by_email($_POST['email']);
    if($id > 0) {
        $p = get_player_by_id($id);
         
        $m = get_my_matches($id);
        print "<strong>Here are your matchups! <BR>
        First, make sure you have closed Pro Putt in your quest.
       
        Click on the scheduled course and and it will open in your quest. </strong>";
        print "<div class='matches'>";
        foreach($m as $key => $match){
            display_match($match,$p);

        }
        print "</div>";
       
    }

    //print  get_player_by_email($_POST['email']);

}

?>
</section>
<hr>
<section>
 <div class='container'>
<h2>2. JOIN YOUR MATCH </h2>
<strong>Once you have purchased and installed ProPutt by TopGolf from the Oculus Store in your Quest</strong>
<ol>
<li>Click on the link provided in the “location” of the invite</li>
<li>Type in your email you used to donate to MSF/Doctors Without Borders</li>
<li><strong>MAKE SURE YOUR HEADSETS ARE LOGGED OUT OF PROPUTT</strong></li>

<li>Click on the match you want to join, this will open Oculus.com in a new tab</li>
<li>If you haven't already, log into Oculus.com with the email associated with your Quest</li>
<li>Once you are logged in, you will see a blue OPEN button, click on it and ProPutt will sync your match to your Quest</li>
<li>Put on your headset within 10 minutes of performing the previous action. Your headset should automatically start your session in Pro Putt</li>
<li>Wait for your opponent to join</li>

</ol>
<strong>Notes</strong>
<ul>
<li>If your session is interrupted, perform the same actions above in sequential to play your full round</li>
<li>Charge headset before start time</li>
<li>Mind your power. Plug your headset in before it completely runs out of power, or you may have to wait until it charges back to 35%</li>
<li>For questions, please contact game@readyplayergolf.com </li>


</ul>
<h2>3. LIVE ZOOM SUPPORT CALL ALL DAY </h2>
Feel free to join on on this zoom call at any time<BR>
<a href="https://us02web.zoom.us/j/85235087778" target="_new">https://us02web.zoom.us/j/85235087778 </a>
<BR><BR><BR>
</div>
</section>

<section>
 <div class='container'>
<?php
if(@$_GET['players']){
 get_player_matches();
}
if(@$_GET['emails']){
    get_emails_by_matchtime();
}
if(@$_GET['matches'] == 1){

    matchBoard();

}
?>
</div>
</section>

</main>
<footer>
<a href="https://discord.gg/sCWJXTv" target="">Join our Discord</a>
</footer>
</body>
</html>
