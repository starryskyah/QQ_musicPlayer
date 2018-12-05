//Progress module
(function(window){
    function Progress(bar,line,dot){
        return new Progress.prototype.init(bar,line,dot);
    }
    Progress.prototype={
        constructor:Progress,
        isMove:false,
        init:function(bar,line,dot){
            this.$progressBar=bar;
            this.$progressLine=line;
            this.$progressDot=dot;
            
        },
        initEvent:function(){
            
            
            
        },
        progressClick:function(callback){
            var $this=this;
            //监听点击事件
            this.$progressBar.click(function(event){
                //背景进度条 距离窗口左边距离
                var normalLeft=$(this).offset().left;
                //点击位置距离窗口左边距离
                var eventLeft=event.pageX;
                $this.$progressLine.css("width",eventLeft-normalLeft);
                $this.$progressDot.css("left",eventLeft-normalLeft);
                //计算比例值
                var value=(eventLeft-normalLeft)/$(this).width();
                callback(value);
            });

        },
        progressMove:function(callback){
            var $this=this;
            //背景进度条 距离窗口左边距离
            var normalLeft=this.$progressBar.offset().left;
            var eventLeft;
            var barWidth=this.$progressBar.width();
            //监听鼠标按下事件
            this.$progressBar.mousedown(function(){
                this.isMove=true;
                
               //监听鼠标移动事件
               $(document).mousemove(function(event){
                   
                   //点击位置距离窗口左边距离
                   eventLeft=event.pageX;
                   var offset=eventLeft-normalLeft;
                   if(offset<0||offset>barWidth){
                       return;
                   }
                   $this.$progressLine.css("width",eventLeft-normalLeft);
                   $this.$progressDot.css("left",eventLeft-normalLeft);
                   
               });
           });
           $(document).mouseup(function(){
               $(document).off("mousemove");
               $this.isMove=false;
               //计算比例值
               var value=(eventLeft-normalLeft)/$this.$progressBar.width();
               callback(value);
           });
        },
        setProgress:function(value){
            if(this.isMove) return;
            if(value<0||value>100){
                return;
            }
            this.$progressLine.css({
                width:value+"%"
            });
            this.$progressDot.css({
                left:value+"%"
            })
        }
    }
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window)