// Player模块
(function(window){
    function Player(){
        
    }
    Player.prototype={
        constructor:Player,
        init:function(){},
    }

    Player.prototype.init.prototype=Player.prototype;
    window.Player=Player;

})(window)