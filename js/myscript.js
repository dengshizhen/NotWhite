    var clock = null;
    var state = 0;
    var speed = 4;
    var flag=0;
     /*
        *    初始化 init
        */
        function init(){
     	var child=document.getElementById("con").firstChild;
              child.parentNode.removeChild(child);
              var child=document.getElementById("con").firstChild;
              child.parentNode.removeChild(child);

            
            for(var i=0; i<4; i++){
               createrow();
            }

            // 添加onclick事件
            document.getElementById('main').onclick = function(ev){
                judge(ev);
            }
              setTimeout(setmove(),5000);
           
        }
        
        function setmove(){
        	 // 定时器 每30毫秒调用一次move()
                clock = window.setInterval('move()', 30);
        }

 //创建div, 参数className是其类名
    function creatediv(className){
        var div = document.createElement('div');
        div.className = className;
     
        return div;
    }


    // 创造一个<div class="row">并且有四个子节点<div class="cell">
    function createrow(){
        var con = document.getElementById('con');
        var row = creatediv('row'); //创建div className=row
    
       var arr = creatcell(); //定义div cell的类名,其中一个为cell black

        con.appendChild(row); // 添加row为con的子节点

        for(var i = 0; i < 4; i++){
            row.appendChild(creatediv(arr[i])); //添加row的子节点 cell
        }

        if(con.firstChild == null){
            con.appendChild(row);
        }else{
            con.insertBefore(row, con.firstChild);
        }
    }

    //删除div#con的子节点中最后那个<div class="row">    
    function delrow(){
            var con = document.getElementById('con');
         if(con.childNodes.length=6){
                   con.removeChild(con.lastChild);
              }
        }    

    //创建一个类名的数组，其中一个为cell black, 其余为cell
    function creatcell(){
        var temp = ['cell', 'cell', 'cell', 'cell',];
        var i = Math.floor(Math.random()*4);//随机生成黑块的位置
        temp[i] = 'cell black';
        return temp;
    }
     //使黑块向下移动    
    function move(){
        var con = document.getElementById('con');
        var top = parseInt(window.getComputedStyle(con, null)['top']);

        if(speed + top > 0){
            top = 0;
        }else{
            top += speed;
        }            
        con.style.top = top + 'px';

        if(top == 0){
            createrow();
            con.style.top = '-100px';
            delrow();
        }else if(top == (-100 + speed)){
            var rows = con.childNodes;
            if((rows.length == 5)&&(rows[4].childNodes[0].className==("cell black")||rows[4].childNodes[1].className==("cell black")||rows[4].childNodes[2].className==("cell black")||rows[4].childNodes[3].className==("cell black"))){
                fail();
            }
        }
    }

    function fail(){
            clearInterval(clock);
            confirm('你的最终得分为 ' + parseInt(document.getElementById('score').innerHTML) );
          document.location.reload();
        }
    function judge(ev){
    if(ev.target.className.indexOf('black') == -1){
             ev.target.className = 'cell red';
                fail();
               flag=1
    }else{
        ev.target.className = 'cell';
      flag= 0; //定义属性pass，表明此行row的黑块已经被点击
        score();
    }
}
     // 加速函数
        function speedup(){
            speed += 2;
            if(speed == 20){
                alert('你超神了');
            }
        }
      // 记分
        function score(){
         var newscore = parseInt(document.getElementById('score').innerHTML) + 1;
            document.getElementById('score').innerHTML = newscore;
            if(newscore % 10 == 0){
                speedup();
            }
        }
  
