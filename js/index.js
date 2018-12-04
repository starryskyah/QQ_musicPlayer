$(function(){
    //0 自定义滚动条
    $(".content_list").mCustomScrollbar();

    var $audio=$("audio");
    var player=new Player($audio);

    //1 获取歌曲列表
    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url:"./sources/musiclist.json",
            dataType:"json",
            
            success:function(data){
                player.musicList=data;
                var $musicList=$(".content_list ul");
                //3.1 遍历获取到的数据，创建歌单
                $.each(data,function(index,ele){
                    var $item=createMusicItem(index,ele);
                    $musicList.append($item);
                })
            },
            error:function(error){

            }

        })
    }

    // 2 初始化事件监听
    initEvent();
    function initEvent(){
        //1\监听歌曲的移入移除(动态创建的必须需要用委托)
        $(".content_list").delegate(".list_music","mouseenter",function(){
            //显示子菜单 隐藏时长
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            $(this).find(".list_time span").stop().fadeOut(100);
        });
        $(".content_list").delegate(".list_music","mouseleave",function(){
            //显示子菜单 隐藏时长
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            $(this).find(".list_time span").stop().fadeIn(100);
        });
        

        //2 监听复选框的点击事件
        $(".content_list").delegate(".list_check","click",function(){
            $(this).toggleClass("list_checked")
        });

        //3 监听子菜单中的播放按钮
        var $musicPlay=$(".music_play");//获取底部播放按钮
        $(".content_list").delegate(".list_menu_play","click",function(){
            
            var $listMusic=$(this).parents(".list_music");//当前点击的li行
            
            // 3.1 切换选中行的播放、暂停按钮状态
            $(this).toggleClass("list_menu_play2");
            // 3.2 还原其他行的播放图标
            $listMusic.siblings().find(".list_menu_play").removeClass("list_menu_play2");
            // 3.3 同步底部播放按钮图标状态
            if($(this).attr("class").indexOf("list_menu_play2")!=-1){
                // 子菜单中当前行是播放状态，切换底部播放图标为播放状态
                $musicPlay.addClass("music_play2");
                // 让播放行歌曲名高亮
                $listMusic.find("div").css("color","#fff");
                $listMusic.siblings().find("div").css("color","rgba(255,255,255,0.5)");
                //切换序列号为 动态播放图标
                $listMusic.find("div.list_number").addClass("list_number2");
                $listMusic.siblings().find("div.list_number").removeClass("list_number2");
            }else{
                // 子菜单中当前行不是是播放状态，切换底部播放图标为暂停状态
                $musicPlay.removeClass("music_play2");
                // 让播放行歌曲名不高亮
                $listMusic.find("div").css("color","rgba(255,255,255,0.5)");
                // 还原序列号为 序列号
                $listMusic.find("div.list_number").removeClass("list_number2");
            }

            //3.4 播放音乐
            player.playMusic($listMusic.get(0).index,$listMusic.get(0).music);
        });

        // 监听子菜单中删除按钮
        

        //4\ 监听底部操作按钮
          //4.1监听底部播放按钮
          $(".music_play").click(function(){
                //判断当前有没有播放音乐
                if(player.currentIndex==-1){
                    //没有播放过音乐，播放第一首音乐
                    $(".list_music").eq(0).find(".list_menu_play").trigger("click");

                }else{
                    //已经在播放音乐，暂停当前音乐
                    $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
                }
          });
          //4.2监听底部上一首按钮
          $(".music_pre").click(function(){
              $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click"); 
          });
          //4.3监听底部下一首按钮
          $(".music_next").click(function(){
              $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
          });

    }

    


    
    // 定义创建音乐条目的方法
    function createMusicItem(index,music){
        var $item=$("<li class=\"list_music\">"
    +                  "<div class=\"list_check\"><i></i></div>"
    +                  "<div class=\"list_number\">"+(index+1)+"</div>"
    +                  "<div class=\"list_name\">"+music.name
    +                     "<div class=\"list_menu\">"
    +                        "<a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>"
    +                        "<a href=\"javascript:;\" title=\"添加到歌单\"></a>"
    +                        "<a href=\"javascript:;\" title=\"下载\"></a>"
    +                        "<a href=\"javascript:;\" title=\"分享\"></a>"
    +                      "</div>"
    +                  "</div>"
    +                  "<div class=\"list_singer\">"+music.singer+"</div>"
    +                  "<div class=\"list_time\">"
    +                     "<span>"+music.time+"</span>"
    +                     "<a href=\"javascript:;\" title=\"删除\" class=\"list_menu_del\"></a>"
    +                  "</div>"
    +              "</li>");
        $item.get(0).index=index;
        $item.get(0).music=music;
        return $item;
    }
})