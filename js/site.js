var App = window.App || {};

App.init = function(){
    App.tools.init();
};

App.tools = {
    inputHandler:function(){
        $("input").on({
            focus:function(){
                $(this).parent().addClass("focused hasValue");
                $(this).removeClass("hasValue").removeClass("error");
            },
            blur:function(){
                var par =  $(this).parent();
                par.removeClass("focused");

                if($(this).val() != ""){
                    $(this).addClass("hasValue");
                    par.addClass("hasValue");
                } else {
                    $(this).removeClass("hasValue");
                    par.removeClass("hasValue");
                }
            }
        });
    },
    scrollToTop:function(){
        $(".top").off().on({
            click:function(e){
                e.preventDefault();

                $("html,body").animate({scrollTop:0}, '500', 'swing');
            }
        })
    },
    checkboxReplace:function(){
        $("input[type=checkbox],input[type=radio]").each(function(){
            var that = $(this);
            var name = that.attr("name");
            var id = that.attr("id");
            var isRadio = (that.attr("type") == "radio");
            var eclass = "";
            var active = "";

            if(isRadio){
                eclass = " radio";
            }

            if(that.is(":checked")){
                active = " active"
            }

            var newCheckbox = "<div class='checkbox"+eclass+active+"' data-name='"+name+"' data-id='"+id+"'></div>";

            $("label[for='"+id+"']").attr("data-for",id).addClass("checkbox-lbl");
            that.wrap(newCheckbox);

        }).hide();

        $(".checkbox").off().on("click", function (e) {
            e.preventDefault();

            var isRadio = $(this).hasClass("radio");

            $(this).removeClass("error");

            if(!isRadio){
                if($(this).hasClass("active")){
                    $(this).find("input").attr("checked",false).removeClass("active");
                } else {
                    $(this).find("input").attr("checked",true).addClass("active");
                }

                $(this).toggleClass("active");

            } else {

                $(this).addClass("active").find("input").attr("checked",true).addClass("active");

                $(".checkbox[data-name='"+$(this).attr("data-name")+"']").not(this).removeClass("active")
                    .find("input").removeClass("active").attr("checked",false);
            }

        });

        $(".checkbox-lbl").off().on("click", function (e) {
            e.preventDefault();
            $(".checkbox[data-id='"+$(this).attr("data-for")+"']").trigger("click");
        })
            .children("a").click(function() {
                window.open($(this).attr("href"),$(this).attr("target"));
                return false;
        });
    },
    submitTestForm:function(){
        var scope = this;
        $("#submit").off().on({
            click:function(){
                $("input:not([type=submit]),.checkbox").addClass("error");
                $(this).off().on({
                    click:function(){
                        $(this).off();
                        $("input,.checkbox").removeClass("error");
                        $("input:not([type=submit])").val("").blur();
                        $(".checkbox").removeClass("active").find("input").attr("checked",false).removeClass("active");

                        alert("Vielen Dank für Ihre Anmeldung, Sie erhalten in Kürze eine Bestätigung per Mail.");
                        scope.submitTestForm();
                    }
                });
            }
        });
    },
    init:function(){
        this.scrollToTop();
        this.checkboxReplace();
        this.inputHandler();

        // TO SEE ERROR STATE
        this.submitTestForm();
    }
};