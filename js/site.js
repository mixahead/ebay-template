var App = window.App || {};

App.init = function(){
    App.tools.init();
};

App.tools = {
    image:function(){
        $(".thumb img").on({
            click:function(e){
                e.preventDefault();
                var src = $(this).attr("src");
                $(".fullImage img").attr("src",src);
            }
        });
    },
    init:function(){
        this.image();
    }
};