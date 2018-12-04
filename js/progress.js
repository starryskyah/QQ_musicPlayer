//Progress module
(function(window){
    function Progress(bar,line,dot){
        return new Progress.prototype.init(bar,line,dot);
    }
    Progress.prototype={
        constructor:Progress,
        init:function(bar,line,dot){
            this.$progressBar=bar;
            this.$progressLine=line;
            this.$progressDot=dot;
            //初始化监听事件
            this.initEvent();
        },
        initEvent:function(){
            var $this=this;
            this.$progressBar.click(function(event){
                //背景进度条 距离窗口左边距离
                var normalLeft=$(this).offset().left;
                //点击位置距离窗口左边距离
                var eventLeft=event.pageX;
                $this.$progressLine.css("width",eventLeft-normalLeft);
                $this.$progressDot.css("left",eventLeft-normalLeft)
            });
            
        },
        progressClick:function(){

        },
        progressMove:function(){

        },
    }
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window)