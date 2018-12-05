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
        },
        delMusic:function(index){

            //删除对应索引的音乐
            this.musicList.splice(index,1);
            //判断当前删除的是不是当前播放的前面索引
            if(index<this.currentIndex){
                this.currentIndex=this.currentIndex-1;
            }

        },
        
        musicTimeUpdate:function(callback){
            var $this=this;
            this.$audio.on("timeupdate",function(){
                var duration=$this.audio.duration;
                var currentTime=$this.audio.currentTime;
                var timeStr=$this.formateTime(currentTime,duration);
                callback(currentTime,duration,timeStr);
            })
        },
        musicSeekTo:function(value){
            if(isNaN(value))return;
            this.audio.currentTime=this.audio.duration*value;
        },
        voiceSeekTo:function(value){
            //0~1
            if(isNaN(value))return;
            if(value<0||value>1)return;
            this.audio.volume=value;
        },
        formateTime:function (currentTime,duration){
            var endMin=parseInt(duration/60);
            var endSec=parseInt(duration%60);
            if(endMin<10){
                endMin="0"+endMin;
            }
            if(endSec<10){
                endSec="0"+endSec;
            }
    
            var startMin=parseInt(currentTime/60);
            var startSec=parseInt(currentTime%60);
            if(startMin<10){
                startMin="0"+startMin;
            }
            if(startSec<10){
                startSec="0"+startSec;
            }
            return startMin+":"+startSec+" / "+endMin+":"+endSec;
        }

    }

    Player.prototype.init.prototype=Player.prototype;
    window.Player=Player;

})(window)
