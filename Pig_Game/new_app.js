/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores;
var currentPlayer;
var roundScore;
// var pastScore;
var gamePlaying;  

//游戏加载时初始化
init();

//当有人点击roll按钮时
document.querySelector(".btn-roll").addEventListener("click",function(){
    //当gamePlaying为true时(没有产生winner)
    
    if(gamePlaying)
    {
        //产生随机筛子值
        var dice1 = Math.floor(Math.random()*6+1);
        var dice2 = Math.floor(Math.random()*6+1);

        //解除筛子的隐藏并显示对应图片
        document.querySelector("#dice-1").style.display = 'block';
        document.querySelector("#dice-2").style.display = 'block';
        document.querySelector('#dice-1').src = "dice-" + dice1 + ".png";
        document.querySelector('#dice-2').src = "dice-" + dice2 + ".png";

        //显示数值
        // if(dice1 === 1 || dice2 === 1)
        // {     
        //     //如果是1,当前一方的current归0,并且转到另一方
        //     console.log("1出现")
        //     nextPlayer();
        // }
        // else if(pastScore === 6 && (dice1 === 6 || dice2 ===6))
        // {
        //     //如果本次score和上次的都是6,失去目前所有分数
        //     scores[currentPlayer] = 0;
        //     document.querySelector("#score-" + currentPlayer).textContent = 0;  
        //     nextPlayer();
        // }
        // else
        // {
        //     //如果筛子不是1,累加分数,并且显示在UI上
        //     roundScore += (dice1 + dice2);
        //     document.getElementById("current-" + currentPlayer).textContent = roundScore;
            
        //     //如果有一个筛子是6,就在pastScore中记录下6
        //     if(dice1 === 6 || dice2 === 6)
        //     {
        //         pastScore = 6;
        //     }
        //     //否则记录筛子1的值
        //     else
        //     {
        //         pastScore = dice1;
        //     }           
        // }

        if(dice1 === 1 || dice2 === 1)
        {     
            //如果是1,当前一方的current归0,并且转到另一方
            console.log("1出现")
            nextPlayer();
        }
        else
        {
            //如果筛子不是1,累加分数,并且显示在UI上
            roundScore += (dice1 + dice2);
            document.getElementById("current-" + currentPlayer).textContent = roundScore;          
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
            //先从input中读取数据
        var input = document.querySelector('.input-score').value;

        var finalScore;
            //如果没有输入final score,使用默认值100
        if(input)
        {
            finalScore = input;
        }
        else
        {
            finalScore = 100;
        }
        
        //如果目前的值大于finalScore,执行下面语句
        if(scores[currentPlayer] >= finalScore)
        {
            document.querySelector("#name-" + currentPlayer).innerHTML = "winner";
            document.querySelector("#dice-1").style.display = 'none';
            document.querySelector("#dice-2").style.display = 'none';
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
    // pastScore = 0;

    //游戏开始前,隐藏筛子
    document.querySelector("#dice-1").style.display = 'none';
    document.querySelector("#dice-2").style.display = 'none';

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
    //更换位置时,pastScore更新为0,如果不初始化,player1筛6,然后player2筛6,player2的score就会变为0
    // pastScore = 0;

    document.getElementById("current-" + currentPlayer).textContent = 0;
    //roundScore也更新为0
    roundScore = 0;
    //隐藏筛子
    document.querySelector("#dice-1").style.display = 'none';
    document.querySelector("#dice-2").style.display = 'none';
    currentPlayer === 0? currentPlayer = 1: currentPlayer = 0;

    //最后用toggle把active class移到另一边
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}