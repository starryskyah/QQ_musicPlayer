// Player模块
(function(window){
    function Player($audio){
        return new Player.prototype.init($audio);
    }
    Player.prototype={
        constructor:Player,
        musicList:[],
        init: function($audio){
            this.$audio=$audio;//Jquery对象
            this.audio=$audio.get(0);//原生DOM对象

        },
        currentIndex:-1,
        playMusic:function(index,music){
            //判断是不是同一首歌曲
            if(index==this.currentIndex){
                //同一首则在暂停和播放间切换
                if(this.audio.paused){
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
            }else{
                //不是同一首
                this.$audio.attr("src",music.link_url);
                this.audio.play();
                this.currentIndex=index;
            }
        },
        preIndex:function(){
            var index=-1;
            if(this.currentIndex==0){
                index=this.musicList.length-1;
            }else{
                index=this.currentIndex-1;
            }
            return index;
        },
        nextIndex:function(){
            var index=-1;
            if(this.currentIndex==this.musicList.length-1){
                index=0;
            }else{
                index=this.currentIndex+1;
            }
            return index;
        }
    }

    Player.prototype.init.prototype=Player.prototype;
    window.Player=Player;

})(window)
