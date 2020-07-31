<?php 


function selectLayoutTemplate( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'layout_template',
		'title' => esc_html__( 'Layout Template', 'metabox-online-generator' ),
		'post_types' => array('guide','hardware'),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
		array(
				'id' => $prefix . 'page_layout_template',
				'name' => esc_html__( 'Page Layout Template', 'metabox-online-generator' ),
				'type' => 'select',
				'placeholder' => esc_html__( 'Select an Item', 'metabox-online-generator' ),
				'options' => array(
					'default' => esc_html__( 'Default', 'metabox-online-generator' ),
                    'two_column' => esc_html__( 'Two Column', 'metabox-online-generator' ),
                    'front_page' => esc_html__( 'Front Page', 'metabox-online-generator' ),
				),
				'std' => 'default',
            ),
            	array(
				'id' => $prefix . 'full_bleed',
				'name' => esc_html__( 'Full Bleed', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Page has no margins', 'metabox-online-generator' ),
			),
			array(
				'id' => 'page_break_after',
				'name' => esc_html__( 'Checkbox', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Page Break After', 'metabox-online-generator' )
			)
                
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'selectLayoutTemplate' );

function selectHeroImage( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'hero',
		'title' => esc_html__( 'Hero Image', 'metabox-online-generator' ),
		'post_types' => array('post', 'page','resource','profile','guide' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => $prefix . 'hero',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Hero Image', 'metabox-online-generator' ),
				'desc' => esc_html__( '', 'metabox-online-generator' ),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'selectHeroImage' );


    function video_meta( $meta_boxes ) {
        $prefix = '';

        $meta_boxes[] = array(
            'id' => 'featured_video',
            'title' => esc_html__( 'Featured Video', 'ps-video' ),
            'post_types' => array( 'page','post','project' ),
            'context' => 'side',
            'priority' => 'default',
            'autosave' => false,
            'fields' => array(
                array(
                    'id' => 'featured_video',
                    'type' => 'video',
                    'name' => esc_html__( 'Video', 'ps-video' ),
                    'max_file_uploads' => 4,
                ),
                array(
                    'id' => $prefix . 'featured_video_url',
                    'type' => 'url',
                    'name' => esc_html__( 'Featured Video URL', 'ps-video' ),
                ),
                array(
                    'id' => $prefix . 'video_aspect',
                    'name' => esc_html__( 'Video Aspect', 'ps-video' ),
                    'type' => 'select',
                    'placeholder' => esc_html__( 'Select an Item', 'ps-video' ),
                    'options' => array(
                        'hd' => '16:9',
                        'sd' => '4:3',
                    ),
                    'std' => 'hd',
                ),
            ),
        );

        return $meta_boxes;
    }
    add_filter( 'rwmb_meta_boxes', 'video_meta' );


    function section_class( $meta_boxes ) {
        $prefix = '';

        $meta_boxes[] = array(
            'id' => 'section',
            'title' => esc_html__( 'SECTION', 'section_class' ),
            'post_types' => array( 'page' ),
            'context' => 'side',
            'priority' => 'default',
            'autosave' => false,
            'fields' => array(
               
                array(
                    'id' => $prefix . 'section_class',
                    'type' => 'text',
                    'name' => esc_html__( 'section-class', 'ps-social' ),
                ),
                
            ),
        );

        return $meta_boxes;
    }
    add_filter( 'rwmb_meta_boxes', 'section_class' );



    function social_meta( $meta_boxes ) {
        $prefix = '';

        $meta_boxes[] = array(
            'id' => 'social_url',
            'title' => esc_html__( 'Social', 'ps-social' ),
            'post_types' => array( 'social' ),
            'context' => 'side',
            'priority' => 'default',
            'autosave' => false,
            'fields' => array(
               
                array(
                    'id' => $prefix . 'social_url',
                    'type' => 'url',
                    'name' => esc_html__( 'URL', 'ps-social' ),
                ),
                
            ),
        );

        return $meta_boxes;
    }
    add_filter( 'rwmb_meta_boxes', 'social_meta' );



    function ps_metabox( $meta_boxes ) {
        $prefix = '';

        $meta_boxes[] = array(
            'id' => 'project_info',
            'title' => esc_html__( 'Project Info', 'ps_metabox' ),
            'post_types' => array( 'project' ),
            'context' => 'side',
            'priority' => 'default',
            'autosave' => false,
            'fields' => array(
                array(
                    'id' => $prefix . 'project_url',
                    'type' => 'url',
                    'name' => esc_html__( 'Project URL', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_title',
                    'type' => 'text',
                    'name' => esc_html__( 'Project Title', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_client',
                    'type' => 'text',
                    'name' => esc_html__( 'Client', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_agency',
                    'type' => 'text',
                    'name' => esc_html__( 'Agency', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_era',
                    'type' => 'text',
                    'name' => esc_html__( 'Era', 'ps_metabox' ),
                ),
            
            ),
        );

        return $meta_boxes;
    }
    add_filter( 'rwmb_meta_boxes', 'ps_metabox' );
            
function selectScreenImage( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'screen_image',
		'title' => esc_html__( 'Screen Image', 'metabox-online-generator' ),
		'post_types' => array( 'post', 'page','project' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => false,
		'fields' => array(
			array(
				'id' => 'screen_image',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Screen Image', 'metabox-online-generator' ),
				'desc' => esc_html__( 'Appears in Screen', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'selectScreenImage' );



function resourceInfo( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'screen_image',
		'title' => esc_html__( 'Resource Info', 'metabox-online-generator' ),
		'post_types' => array( 'resource' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => false,
		'fields' => array(
			array(
				'id' => 'screen_image',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Screen Image', 'metabox-online-generator' ),
				'desc' => esc_html__( 'Appears in Screen', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),
			array(
				'id' => 'url',
				'type' => 'url',
				'name' => esc_html__( 'Website', 'metabox-online-generator' ),
			),
			
			array(
				'id' => 'linkedin',
				'type' => 'url',
				'name' => esc_html__( 'LinkedIn URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'twitter',
				'type' => 'url',
				'name' => esc_html__( 'Twitter URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'facebook',
				'type' => 'url',
				'name' => esc_html__( 'Facebook URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'github',
				'type' => 'url',
				'name' => esc_html__( 'Github Repo URL', 'metabox-online-generator' ),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'resourceInfo' );

















function profile_info( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'profile_info',
		'title' => esc_html__( 'Profile Info', 'metabox-online-generator' ),
		'post_types' => array('profile' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => 'profile_title',
				'type' => 'text',
				'name' => esc_html__( 'Title', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_company',
				'type' => 'text',
				'name' => esc_html__( 'Organization', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_website',
				'type' => 'url',
				'name' => esc_html__( 'Website', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_wikipedia',
				'type' => 'url',
				'name' => esc_html__( 'Wikipedia URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_linkedin',
				'type' => 'url',
				'name' => esc_html__( 'LinkedIn URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_twitter',
				'type' => 'url',
				'name' => esc_html__( 'Twitter URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_facebook',
				'type' => 'url',
				'name' => esc_html__( 'Facebook URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_flickr',
				'type' => 'url',
				'name' => esc_html__( 'Flickr URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_instagram',
				'type' => 'url',
				'name' => esc_html__( 'Instagram URL', 'metabox-online-generator' ),
			),
			
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'profile_info' );

function relatedProfile( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'related-profile',
		'title' => esc_html__( 'Related Profiles', 'metabox-online-generator' ),
		'post_types' => array('profile','resource'),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => $prefix . 'related-profile',
				'type' => 'post',
				'name' => esc_html__( '', 'metabox-online-generator' ),
				'post_type' => 'profile',
				'field_type' => 'checkbox_list',
				'query_args' => array(
					'post_category' => 'author',
				),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'relatedProfile' );	
function relatedHardware( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'hardware',
		'title' => esc_html__( 'Related Hardware', 'metabox-online-generator' ),
		'post_types' => array('profile','resource'),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => $prefix . 'hardware',
				'type' => 'post',
				'name' => esc_html__( 'Devices', 'metabox-online-generator' ),
				'post_type' => 'hardware',
				'field_type' => 'checkbox_list',
				'query_args' => array(
					'post_category' => 'author',
				),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'relatedHardware' );

	function setHardwareSpecs( $meta_boxes ) { // this shows the box were 
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'hardware_specs',
		'title' => esc_html__( 'Hardware Specs', 'omniscience-profiler' ),
		'post_types' => array('hardware' ),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => 'device_name',
				'type' => 'text',
				'name' => esc_html__( 'Device', 'metabox-online-generator' ),
			),
			array(
				'id' => 'url',
				'type' => 'text',
				'name' => esc_html__( 'Website URL', 'metabox-online-generator' ),
			),

			array(
				'id' => 'specs_url',
				'type' => 'text',
				'name' => esc_html__( 'Specs URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'MSRP',
				'type' => 'text',
				'name' => esc_html__( 'MSRP', 'metabox-online-generator' ),
			),
			array(
				'id' => 'os',
				'type' => 'text',
				'name' => esc_html__( 'Operating System', 'metabox-online-generator' ),
			),
			array(
				'id' => 'fov',
				'type' => 'text',
				'name' => esc_html__( 'Field of View', 'metabox-online-generator' ),
			),
			array(
				'id' => 'resolution',
				'type' => 'text',
				'name' => esc_html__( 'Resolution Per Eye', 'metabox-online-generator' ),
			),
			array(
				'id' => 'optics',
				'type' => 'text',
				'name' => esc_html__( 'Optics', 'metabox-online-generator' ),
			),
			array(
				'id' => 'refresh_rate',
				'type' => 'text',
				'name' => esc_html__( 'Refresh Rate', 'metabox-online-generator' ),
			),
			array(
				'id' => 'connectivity',
				'type' => 'text',
				'name' => esc_html__( 'Connectivity (port)', 'metabox-online-generator' ),
			),
			array(
				'id' => 'weight',
				'type' => 'text',
				'name' => esc_html__( 'Weight', 'metabox-online-generator' ),
			),
			array(
				'id' => 'controllers',
				'type' => 'text',
				'name' => esc_html__( 'Controllers', 'metabox-online-generator' ),
			),
			array(
				'id' => 'sensors',
				'type' => 'textarea',
				'name' => esc_html__( 'Sensors (SLAM)', 'metabox-online-generator' ),
			),
			array(
				'id' => 'untethered',
				'name' => esc_html__( 'Checkbox', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Untethered', 'metabox-online-generator' ),
			),
			array(
				'id' => 'hand_tracking',
				'name' => esc_html__( 'Checkbox', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Hand Tracking', 'metabox-online-generator' )
			),
			array(
				'id' => 'gaze_tracking',
				'name' => esc_html__( 'Checkbox', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Gaze Tracking', 'metabox-online-generator' )
			),
			array(
				'id' => 'spatial_audio',
				'name' => esc_html__( 'Checkbox', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Spatial Audio', 'metabox-online-generator' )
			),
			array(
				'id' => 'acccessories',
				'type' => 'textarea',
				'name' => esc_html__( 'Accessories', 'metabox-online-generator' ),
			),
			array(
				'id' => 'system_requirements',
				'type' => 'textarea',
				'name' => esc_html__( 'System Requirements', 'metabox-online-generator' ),
			),
		
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'setHardwareSpecs' );


function setProfileURL( $meta_boxes ) { // this shows the box were 
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'profile_info',
		'title' => esc_html__( 'PROFILE', 'omniscience-profiler' ),
		'post_types' => array('profile' ),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => $prefix . 'url',
				'type' => 'url',
				'name' => esc_html__( 'URL', 'omniscience-profiler' ),
				'desc' => esc_html__( 'Enter URL for the Resource to Profile', 'omniscience-profiler' ),
			),
			array(
				'id' => $prefix . 'logo',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Logo', 'omniscience-profiler' ),
				//'desc' => esc_html__( 'Size to 1920x1280', 'metabox-online-generator' ),
			),
			array(
				'id' => 'screenshot',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Screenshots', 'metabox-online-generator' ),
				'desc' => esc_html__( 'submitted with', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),


					array(
					'id' =>  'demo_video',
					'type' => 'url',
					'name' => esc_html__( 'Demo Video', 'omniscience-profiler' ),
				),



           				array(
					'id' =>  'wikipedia',
					'type' => 'url',
					'name' => esc_html__( 'Wikipedia URL', 'omniscience-profiler' ),
				),

				array(
					'id' =>  'linkedin',
					'type' => 'url',
					'name' => esc_html__( 'LinkedIn URL', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'twitter',
					'type' => 'url',
					'name' => esc_html__( 'Twitter URL', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'facebook',
					'type' => 'url',
					'name' => esc_html__( 'Facebook URL', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'flickr',
					'type' => 'url',
					'name' => esc_html__( 'Flickr URL', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'instagram',
					'type' => 'url',
					'name' => esc_html__( 'Instagram URL', 'omniscience-profiler' ),
				),

			
				array(
					'id' =>  'Tumblr',
					'type' => 'url',
					'name' => esc_html__( 'Tumblr', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'google_plus',
					'type' => 'url',
					'name' => esc_html__( 'Google Plus', 'omniscience-profiler' ),
				),

				array(
					'id' =>  'pinterest',
					'type' => 'url',
					'name' => esc_html__( 'Pinterest', 'omniscience-profiler' ),
				),


					array(
					'id' =>  'GitHub',
					'type' => 'url',
					'name' => esc_html__( 'Github', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'medium',
					'type' => 'url',
					'name' => esc_html__( 'Medium', 'omniscience-profiler' ),
				),

				//comms
				array(
					'id' =>  'telegram',
					'type' => 'url',
					'name' => esc_html__( 'Telegram ', 'omniscience-profiler' ),
				),



				array(
					'id' =>  'slack',
					'type' => 'url',
					'name' => esc_html__( 'Slack', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'skype',
					'type' => 'url',
					'name' => esc_html__( 'Skype', 'omniscience-profiler' ),
				),

				//video
				array(
					'id' =>  'youtube',
					'type' => 'url',
					'name' => esc_html__( 'YouTube Channel', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'vimeo',
					'type' => 'url',
					'name' => esc_html__( 'Vimeo', 'omniscience-profiler' ),
				),

			array(
				'id' =>  'crunchbase',
				'type' => 'url',
				'name' => esc_html__( 'crunchbase URL', 'omniscience-profiler' ),
			),
							array(
					'id' =>  'rss',
					'type' => 'url',
					'name' => esc_html__( 'RSS Feed URL', 'omniscience-profiler' ),
				),
		
				



// URLs
			array(
				'id' => 'logo_url',
				'type' => 'text',
				'name' => esc_html__( 'Logo URL', 'omniscience-profiler' ),
			),
			array(
				'id' => 'logo_svgtag',
				'type' => 'text',
				'name' => esc_html__( 'Logo SVG', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'contact_url',
				'type' => 'url',
				'name' => esc_html__( 'Contact URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'blog_url',
				'type' => 'url',
				'name' => esc_html__( 'Blog URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'apply_url',
				'type' => 'url',
				'name' => esc_html__( 'Apply URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'jobs_url',
				'type' => 'url',
				'name' => esc_html__( 'Jobs URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'events_url',
				'type' => 'url',
				'name' => esc_html__( 'Events URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'conference_url',
				'type' => 'url',
				'name' => esc_html__( 'Conference URL', 'omniscience-profiler' ),
			),
				array(
				'id' =>  'developers_url',
				'type' => 'url',
				'name' => esc_html__( 'Developers URL', 'omniscience-profiler' ),
			),
			
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'setProfileURL' );

?>