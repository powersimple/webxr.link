<?php
get_header(); ?>
<script>
  //var useWheelNav = true
</script>
<main id="main" role="main">
    <?php

    /*
    function list_slugs(){
        global $wpdb;
        $sql = "select ID, post_title, post_name from wp_posts where post_type = 'profile' and post_status = 'publish'";
        $q = $wpdb->get_results($sql);

    $titles_sql = "select * from wp_posts";
    $titles = $wpdb->get_results($titles_sql);

        print "<ul>";
        foreach ($q as $key => $value) {
            extract((array) $value);
            print "<li><a href='?slut_id=$ID'>$ID | $post_title | $post_name ";
            print $new_slug = wp_unique_term_slug(sanitize_title($post_title),$titles);
           // $wpdb->query("update wp_posts set post_name = '$new_slug' where ID = $ID");
            print "</a><li>";

		}
        print "</ul>";

        //        return $child_list;
        



    }
    list_slugs();
    */
    
    ?>

</main>
<?php
get_footer(); 
?>