//Progress module
(function(window){
    function Progress(){
        return new Progress.prototype.init();
    }
    Progress.prototype={
        constructor:Progress,
        init:function(){

        }
    }
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window)