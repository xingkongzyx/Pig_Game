/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores;
var currentPlayer;
var roundScore;
var gamePlaying; 

//游戏加载时初始化
init();

//当有人点击roll按钮时
document.querySelector(".btn-roll").addEventListener("click",function(){
    //当gamePlaying为true时(没有产生winner)
    if(gamePlaying)
    {
        //产生随机筛子值
        var dice = Math.floor(Math.random() * 6 + 1);

        //解除筛子的隐藏并显示对应图片
        document.querySelector(".dice").style.display = 'block';
        document.querySelector('.dice').src = "dice-" + dice + ".png";

        //显示数值
        if(dice !== 1)
        {
            //如果筛子不是1,累加分数,并且显示在UI上
            roundScore += dice;
            document.getElementById("current-" + currentPlayer).textContent = roundScore;
        }
        else
        {
            //如果是1,当前一方的current归0,并且转到另一方
            nextPlayer();
        }
    }  
})

//当有人点击hold button
document.querySelector(".btn-hold").addEventListener('click',function(){
    if(gamePlaying)
    {
        //roundScore加到对应的分数池中
        scores[currentPlayer] += roundScore;

        //显示scores到UI上
        document.querySelector("#score-" + currentPlayer).textContent = scores[currentPlayer];

        //检查是否已经胜利
        if(scores[currentPlayer] >= 10)
        {
            document.querySelector("#name-" + currentPlayer).innerHTML = "winner";
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(".player-" + currentPlayer + "-panel").classList.add('winner');
            document.querySelector(".player-" + currentPlayer + "-panel").classList.remove('active');
            gamePlaying = false;
        }
        else
        {
            //转换到另一个玩家
            nextPlayer();
        }
    }      
})


//当有人点击new game button
document.querySelector('.btn-new').addEventListener('click', init);

//用于初始化游戏的方程
//调用地点：游戏刚加载; 点击New game button
function init()
{
    //初始化时没有winner
    gamePlaying = true;
    scores = [0,0];
    currentPlayer = 0;
    roundScore = 0;

    //游戏开始前,隐藏筛子
    document.querySelector(".dice").style.display = 'none';

    //游戏开始前,初始化所有分数
    document.querySelector("#score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;

    //游戏开始前,移除winner class和active class,
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    //并且把winner的文字变成正常的player0或player1
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    //激活player1的active class
    document.querySelector('.player-0-panel').classList.add('active');
}

//用于处理更换player时的方程
function nextPlayer()
{
    document.getElementById("current-" + currentPlayer).textContent = 0;
    //roundScore也更新为0
    roundScore = 0;
    //隐藏筛子
    document.querySelector(".dice").style.display = 'none';
    currentPlayer === 0? currentPlayer = 1: currentPlayer = 0;

    //最后用toggle把active class移到另一边
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}