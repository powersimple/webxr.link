<?php

//ENQUE

    function admin_q() {
		wp_enqueue_style('admin-styles', get_template_directory_uri().'/profiler/admin.css');
		wp_enqueue_style( 'font-awesome','https://use.fontawesome.com/releases/v5.6.3/css/all.css');

		wp_register_script('admin_js', get_template_directory_uri() . '/profiler/admin.js'); 
        wp_enqueue_script('admin_js');
		wp_register_script('ajax_js', get_template_directory_uri() . '/profiler/ajax.js'); 
        wp_enqueue_script('ajax_js');
    }
	add_action('admin_enqueue_scripts', 'admin_q');
	


// PROFILE METABOXES
function setProfileTaxonomyData( $meta_boxes ) { // this shows the box were 
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'old_taxonomy_info',
		'title' => esc_html__( 'OLD TAXONOMY', 'omniscience-profiler' ),
		'post_types' => array('profile' ),
		'context' => 'side',
		'priority' => 'low',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => 'features',
				'type' => 'textarea',
				'name' => esc_html__( 'Features', 'metabox-online-generator' ),
			),
			array(
				'id' => 'platform',
				'type' => 'textarea',
				'name' => esc_html__( 'Platform', 'metabox-online-generator' ),
			),
			array(
				'id' => 'industries',
				'type' => 'textarea',
				'name' => esc_html__( 'Industries', 'metabox-online-generator' ),
			),
			array(
				'id' => 'industry_subtags',
				'type' => 'textarea',
				'name' => esc_html__( 'Industry Subtags', 'metabox-online-generator' ),
			),
			array(
				'id' => 'feature_subtags',
				'type' => 'textarea',
				'name' => esc_html__( 'Feature Subtags', 'metabox-online-generator' ),
			)

		
		),
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'setProfileTaxonomyData' );

// PROFILE METABOXES

function setProfileContactInfo( $meta_boxes ) { // this shows the box were 
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'contact_info',
		'title' => esc_html__( 'CONTACT INFO', 'omniscience-profiler' ),
		'post_types' => array('profile' ),
		'context' => 'side',
		'priority' => 'low',
		'autosave' => 'false',
		'fields' => array(
				array(
				'id' => 'company',
				'type' => 'text',
				'name' => esc_html__( 'Company', 'metabox-online-generator' ),
			),
			array(
				'id' => 'solution_name',
				'type' => 'text',
				'name' => esc_html__( 'Solution Name', 'metabox-online-generator' ),
			),
			array(
				'id' => 'contact_name',
				'type' => 'text',
				'name' => esc_html__( 'Contact Name', 'metabox-online-generator' ),
			),
			array(
				'id' => 'contact_title',
				'type' => 'text',
				'name' => esc_html__( 'Contact Title', 'metabox-online-generator' ),
			),
			array(
				'id' => 'contact_email',
				'type' => 'text',
				'name' => esc_html__( '(private) Contact Email', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_email',
				'type' => 'email',
				'name' => esc_html__( '(public) Email Address', 'metabox-online-generator' ),
			),
			array(
				'id' => 'phone',
				'type' => 'text',
				'name' => esc_html__( 'Phone Number', 'metabox-online-generator' ),
			),
			array(
				'id' => 'address',
				'type' => 'text',
				'name' => esc_html__( 'Address', 'metabox-online-generator' ),
			),
			array(
				'id' => 'address2',
				'type' => 'text',
				'name' => esc_html__( 'Address 2', 'metabox-online-generator' ),
			),
			array(
				'id' => 'city',
				'type' => 'text',
				'name' => esc_html__( 'City', 'metabox-online-generator' ),
			),
			array(
				'id' => 'state',
				'type' => 'text',
				'name' => esc_html__( 'State / Province', 'metabox-online-generator' ),
			),
			array(
				'id' => 'postal_code',
				'type' => 'text',
				'name' => esc_html__( 'Postal Code', 'metabox-online-generator' ),
			),
			array(
				'id' => 'country',
				'type' => 'text',
				'name' => esc_html__( 'Country', 'metabox-online-generator' ),
			),
		
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'setProfileContactInfo' );







function setProfileResearch( $meta_boxes ) { // this shows the box where the scrape and search results
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'profiler',
		'title' => esc_html__( 'PROFILE RESEARCH', 'omniscience-profiler' ),
		'post_types' => array('profile' ),
		'context' => 'advanced',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => $prefix . 'card',
				'type' => 'custom_html',
				 //'std'  => '<div class="alert alert-warning">This is a custom HTML content</div>',
				 'callback' => 'profile_menu',
			),
            array(
				'id' => $prefix . 'profile_results',
				'type' => 'custom_html',
				 //'std'  => '<div class="alert alert-warning">This is a custom HTML content</div>',
				 'callback' => 'profiler',
			),
			array(
				'id' => 'search_content',
				'type' => 'textarea',
				'name' => esc_html__( 'Saved Search', 'metabox-online-generator' ),
			),
			array(
				'id' => 'scraped_content',
				'type' => 'textarea',
				'name' => esc_html__( 'Saved Scrape', 'metabox-online-generator' ),
			),
			array(
				'id' => 'lang',
				'type' => 'text',
				'name' => esc_html__( 'Language', 'metabox-online-generator' ),
				'size' => 5,
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'setProfileResearch' );

function getImg($src){
	@$_GET['addImg'] = $src; // the php way. 
	return addImageToLibrary();
	
}




function addImageToLibrary($title,$path){ // THIS ADDS AN IMAGE TO THE MEDIA LIBRARY FROM A SRC URL.
	global $post;
	$image_url = $path;//strtok(@$_GET['addImg'],"?");

	$upload_dir = wp_upload_dir();

	$image_data = file_get_contents( $image_url );
	$ext = pathinfo($image_url, PATHINFO_EXTENSION);
	if($ext ==  ''){
		$filename = basename($image_url);
	} else {
		$filename = basename( sanitize_file_name($title).".".$ext );
	}
	if ( wp_mkdir_p( $upload_dir['path'] ) ) {
	$file = $upload_dir['path'] . '/' . $filename;
	}
	else {
	$file = $upload_dir['basedir'] . '/' . $filename;
	}

	file_put_contents( $file, $image_data );

	$wp_filetype = wp_check_filetype( $filename, null );
	
	$attachment = array(
		'post_mime_type' => $wp_filetype['type'],
		'post_title' => $title,
		'post_excerpt' => '',
		'post_content' => '',
		'post_status' => 'inherit'
	);

	$attach_id = wp_insert_attachment( $attachment, $file );
	require_once( ABSPATH . 'wp-admin/includes/image.php' );
	$attach_data = wp_generate_attachment_metadata( $attach_id, $file );
	wp_update_attachment_metadata( $attach_id, $attach_data );
	update_post_meta($attach_id, '_wp_attachment_image_alt', $title);
	return $attach_id;
}


function profile_events() {
	if(@$_GET['addImg']){

		addImageToLibrary($_GET['addImg']);
	}

	//THIS IS A HACK, needs to be done right. 
	//Gutternberg doesn't update the dom
	if(@$_GET['updateExcerpt']){
		 $my_post = array(
      'ID'           => @$_GET['POST'],
	  
      'post_excerpt' => json_decode($_GET['updateExcerpt']),
		);

		// Update the post into the database
		wp_update_post( $my_post );
		
	}
	if(@$_GET['updateContent']){

	
	}
	if(@$_GET['updateTitle']){

	
	}


}
add_action( 'admin_init', 'profile_events' );