function initLanguageMenu(container){
    
       // console.log("languages",languages)
        state.language = languages.default;
        var language_menu = "<ul>"
        for(var code in languages){
            if(code != 'default'){
                var active_language = ''
                if (code == state.language)
                {
                    active_language = ' class="active-language"'
                }
                language_menu += '<li id="'+code+'"'+active_language+'>'+languages[code].native+'</li>'

                

            }        
        
        //language_menu += "</ul>"//FIX
    }
 //console.log(container + " ul li")
    jQuery(container).on("click",'li',function(e){
        
        state.language = jQuery(this).attr('id');
         for (var code in languages) {
            if(code == state.language){
                //console.log(code+' add')
                if (code != languages.default) { // not the default language

                    if (languages[code].data == undefined) { // tests to see if this language data is loaded or not
                        //console.log("fetch language for the first time ", code)
                        getStaticJSON(code, setLanguage, code)//load language data. Passing language code as first param
                        
                    } else {
                       // console.log(code + "already loaded ", languages[code].data)
                    
                    }
                }
                state.language = code
                changeLanguage(code)
                jQuery('#'+code).addClass('active-language') // set the class on the language switcher to active
            } else {
                //console.log(code+ ' remove')
                jQuery('#'+code).removeClass('active-language') // remove the active class
            }
         }
    
       // console.log(language_menu,state.language)

    })
    //console.log(language_menu, state.language)
    jQuery(container).html(language_menu)


}
function retreiveML(struct,field,id,language){

    if(struct == 'posts'){
        if (posts[id].languages != undefined){
           
            if (posts[id].languages[language]!= undefined) {
                var translation_id = posts[id].languages[language].id
                return posts[translation_id][field]
            }
        } 
        return posts[id][field]

    }

}


// retrieves language specific data


function setLanguage(data,code) {
    
    languages[code].data = data;
    //console.log(code,"data", data)
    for(var d in data){
        if (data[d].type == 'page' || data[d].type == 'post' || data[d].type == 'project'){
        //console.log(data[d].type, d, data[d].of )
        posts[d] = data[d];
        }
    
    }
    //console.log("set", menus['wheel-menu'].linear_nav);
    changeLanguage(code);
   
}
function changeLanguage(code){
 //console.log("change language", code)
}
if(typeof languages !== 'undefined') {
    initLanguageMenu("#language-menu");
}