$(document).ready(function () {
//--------------------Start Variablen------------------------  
  var spieler1 = [];
  for(var i=0; i<=16; i++) {
    spieler1[i] = [];
    for(var j=0; j<=16; j++) {
        (i==16||j==16)?spieler1[i][j] = -1:spieler1[i][j] = 0;
    }
  }
  var spieler2 = [];
  for(var i=0; i<=16; i++) {
    spieler2[i] = [];
    for(var j=0; j<=16; j++) {
        (i==16||j==16)?spieler2[i][j] = -1:spieler2[i][j] = 0;
    }
  }
  var zwischenspieler = [];
  for(var i=0; i<=16; i++) {
    zwischenspieler[i] = [];
    for(var j=0; j<=16; j++) {
        (i==16||j==16)?zwischenspieler[i][j] = -1:zwischenspieler[i][j] = 0;
    }
  }
  var p1life=30;
  var p2life=30;
  var rowLimit = spieler1.length - 1;
  var columnLimit = spieler1[0].length - 1;
  var x,y, xclick,yclick;
  var boot="l";
  var waagerecht=true;
  var player="a";
  var schuss="c";

//------------------Start Button----------------------------------
  $("#bt1").click(function () {
    if(player=="a"){
      $("body").css("backgroundImage", "none");
      document.getElementById("p1").className = "visible";
      document.getElementById("konsole").className = "visible";
      document.getElementById("start").className = "invisible";
      $("h2").text("Spieler 1 muss seine schiffe setzen");
    }else{
      document.getElementById("p2").className = "visible";
      document.getElementById("konsole").className = "visible";
      document.getElementById("randomdiv").className = "visible";
      document.getElementById("start").className = "invisible";
      document.getElementById("f2").className = "flotte";
      $("h2").text("Spieler 2 muss seine schiffe setzen");
    }
  })
//------------------Spieler Wechsel----------------------------------
  $("#bt2").click(function () {
    if(player=="b"){
      document.getElementById("p1").className = "visible";
      document.getElementById("bclick").className = "visible";
      document.getElementById("konsole").className = "visible";
      document.getElementById("weiter").className = "invisible";
      for (var i = 0; i < zwischenspieler.length; i++) zwischenspieler[i] = spieler2[i].slice();
      $("h2").text("Spieler 1 ist dran!");
      player="a";
      schuss="c";
    }else{
      document.getElementById("p2").className = "visible";
      document.getElementById("aclick").className = "visible";
      document.getElementById("konsole").className = "visible";
      document.getElementById("weiter").className = "invisible";
      for (var i = 0; i < zwischenspieler.length; i++) zwischenspieler[i] = spieler1[i].slice();
      $("h2").text("Spieler 2 ist dran!");
      player="b";
      schuss="d";
    }
  })
//------------------Schiffe gesetzt-------------------------------
  $("#fertig").click(function(){
    if(player=="a"){
      for (var i = 0; i < zwischenspieler.length; i++) spieler1[i] = zwischenspieler[i].slice();
      document.getElementById("fertigdiv").className = "invisible";
      document.getElementById("p1").className = "invisible";
      document.getElementById("konsole").className = "invisible";
      document.getElementById("start").className = "visible";
      document.getElementById("bt1").textContent = "Weiter";
      $("h2").text("Spieler 2 ist dran!");
      player="b";
      schuss="d";
    }else{
      for (var i = 0; i < zwischenspieler.length; i++) spieler2[i] = zwischenspieler[i].slice();
      document.getElementById("p2").className = "invisible";
      document.getElementById("konsole").className = "invisible";
      document.getElementById("weiter").className = "visible";
      $("h2").text("Spieler 1 ist dran!");
      $("h3").text("Feuer frei!");
      $("h3").css("color","white");
      $("#fertig").remove();
      $("#start").remove();
      $("#random").remove();
    }
    for(var i=0; i<=16; i++) {
      for(var j=0; j<=16; j++) {
          (i==16||j==16)?zwischenspieler[i][j] = -1:zwischenspieler[i][j] = 0;
      }
    }

  })
//------------------fertig2-----------------------------------------
 $("#fertig2").click(function(){

    if(player=="a"){
      for (var i = 0; i < zwischenspieler.length; i++) spieler2[i] = zwischenspieler[i].slice();
      document.getElementById("p1").className = "invisible";
      document.getElementById("konsole").className = "invisible";
      document.getElementById("weiter").className = "visible";
      document.getElementById("fertig2div").className = "invisible";
      $("h2").text("Spieler 2 ist dran!");
      $("h3").text("Feuer frei!");
      $("h3").css("color","white");
    }else{
      for (var i = 0; i < zwischenspieler.length; i++) spieler1[i] = zwischenspieler[i].slice();
      document.getElementById("p2").className = "invisible";
      document.getElementById("konsole").className = "invisible";
      document.getElementById("weiter").className = "visible";
      document.getElementById("fertig2div").className = "invisible";
      $("h2").text("Spieler 1 ist dran!");
      $("h3").text("Feuer frei!");
      $("h3").css("color","white");
    }
    for(var i=0; i<=16; i++) {
      for(var j=0; j<=16; j++) {
        (i==16||j==16)?zwischenspieler[i][j] = -1:zwischenspieler[i][j] = 0;
      }
    } 
  })
//----------------Ausrichtung des Schiffs wählen-----------------
  $("#rotate").click(function(){
    if(waagerecht){
      waagerecht=false;
      $("#"+boot).click();
    }else{
      waagerecht=true;
      $("#"+boot).click();
    }
  })
//-----------------Schiff wählen----------------------------------
  $("li").click(function(){
    document.getElementById("rotatediv").className = "visible";
    boot=this.id;    
  })
//------------------Hover mit Schiff------------------------------
  $("td").hover(function() {
      if(boot!="l"){
        x= parseInt(this.id.substr(0,this.id.indexOf(player)));
        y= parseInt(this.id.substr(this.id.indexOf(player)+1,this.id.length));
        switch(boot){
          case "u":
            if(zwischenspieler[x][y]==0 && 
              (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0)){
              (waagerecht)? y++:x++;
              $(this).toggleClass("hover");
              $("#"+x+player+y).toggleClass("hover");
            }else{
              (waagerecht)? y++:x++;
              $(this).toggleClass("bad");
              $("#"+x+player+y).toggleClass("bad");
            }
            break;
          case "z":
            if(zwischenspieler[x][y]==0 && 
              (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0) && 
              (waagerecht ? zwischenspieler[x][y+2]==0 : zwischenspieler[x+2][y]==0)){
              (waagerecht)? y++:x++;
              $(this).toggleClass("hover");
              $("#"+x+player+y).toggleClass("hover");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("hover");
            }else{
              (waagerecht)? y++:x++;
              $(this).toggleClass("bad");
              $("#"+x+player+y).toggleClass("bad");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("bad");
            }
            break;
          case "k":
            if(zwischenspieler[x][y]==0 && 
              (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0) && 
              (waagerecht ? zwischenspieler[x][y+2]==0 : zwischenspieler[x+2][y]==0) &&
              (waagerecht ? zwischenspieler[x][y+3]==0 : zwischenspieler[x+3][y]==0)){
              (waagerecht)? y++:x++;
              $(this).toggleClass("hover");
              $("#"+x+player+y).toggleClass("hover");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("hover");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("hover");
            }else{
              (waagerecht)? y++:x++;
              $(this).toggleClass("bad");
              $("#"+x+player+y).toggleClass("bad");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("bad");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("bad");
            }
            break;
          case "s":
            if(zwischenspieler[x][y]==0 && 
              (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0) && 
              (waagerecht ? zwischenspieler[x][y+2]==0 : zwischenspieler[x+2][y]==0) &&
              (waagerecht ? zwischenspieler[x][y+3]==0 : zwischenspieler[x+3][y]==0) &&
              (waagerecht ? zwischenspieler[x][y+4]==0 : zwischenspieler[x+4][y]==0)){
              (waagerecht)? y++:x++;
              $(this).toggleClass("hover");
              $("#"+x+player+y).toggleClass("hover");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("hover");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("hover");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("hover");
            }else{
              (waagerecht)? y++:x++;
              $(this).toggleClass("bad");
              $("#"+x+player+y).toggleClass("bad");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("bad");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("bad");
              (waagerecht)? y++:x++;
              $("#"+x+player+y).toggleClass("bad");
            }
            break;
          default:
            break;
        }
      }
    })
//------------------Schiffe setzen--------------------------------
  $("td").click(function() {
    if(boot!="l"){
      xclick= parseInt(this.id.substr(0,this.id.indexOf(player)));
      yclick= parseInt(this.id.substr(this.id.indexOf(player)+1,this.id.length));
      switch(boot){
        case "u":
          if(!this.classList.contains("bad")){
              var string="front";
              for(var b=0;b<2;b++){
                zwischenspieler[xclick][yclick]=1;
                (waagerecht)? $("#"+xclick+player+yclick).addClass(string+" waage"): $("#"+xclick+player+yclick).addClass(string);
                for (var u = Math.max(0, xclick - 1); u <= Math.min(xclick + 1, rowLimit); u++) {
                  for (var v = Math.max(0, yclick - 1); v <= Math.min(yclick + 1, columnLimit); v++) {
                    if(zwischenspieler[u][v]==0) zwischenspieler[u][v]=-2;
                  }
                }            
                (waagerecht)? yclick++:xclick++;
                string="heck";
              }
            boot="l";
            for (var index = 1; index < 5; index++) {
              if(document.getElementById("u").textContent.startsWith(index)){
                $("#u").text(document.getElementById("u").textContent.replace(index, index-1));
                if(document.getElementById("u").textContent.startsWith("0")) $('#u').remove();
                break;                
              }
            }
          }
        break;
        case "z":
          if(!this.classList.contains("bad")){
              var string="front";
              for(var b=0;b<3;b++){
                zwischenspieler[xclick][yclick]=1;
                (waagerecht)? $("#"+xclick+player+yclick).addClass(string+" waage"): $("#"+xclick+player+yclick).addClass(string);
                for (var u = Math.max(0, xclick - 1); u <= Math.min(xclick + 1, rowLimit); u++) {
                  for (var v = Math.max(0, yclick - 1); v <= Math.min(yclick + 1, columnLimit); v++) {
                    if(zwischenspieler[u][v]==0) zwischenspieler[u][v]=-2;
                  }
                }            
                (waagerecht)? yclick++:xclick++;
                (b==1)?string="heck":string="mitte";
              }
            boot="l";
            for (var index = 1; index < 4; index++) {
              if(document.getElementById("z").textContent.startsWith(index)){
                $("#z").text(document.getElementById("z").textContent.replace(index, index-1));
                if(document.getElementById("z").textContent.startsWith("0")) $('#z').remove();
                break;                
              }
            }
          }
        break;
        case "k":
          if(!this.classList.contains("bad")){
              var string="front";
              for(var b=0;b<4;b++){
                zwischenspieler[xclick][yclick]=1;
                (waagerecht)? $("#"+xclick+player+yclick).addClass(string+" waage"): $("#"+xclick+player+yclick).addClass(string);
                for (var u = Math.max(0, xclick - 1); u <= Math.min(xclick + 1, rowLimit); u++) {
                  for (var v = Math.max(0, yclick - 1); v <= Math.min(yclick + 1, columnLimit); v++) {
                    if(zwischenspieler[u][v]==0) zwischenspieler[u][v]=-2;
                  }
                }            
                (waagerecht)? yclick++:xclick++;
                (b==2)?string="heck":string="mitte";
              }
            boot="l";
            for (var index = 1; index < 3; index++) {
              if(document.getElementById("k").textContent.startsWith(index)){
                $("#k").text(document.getElementById("k").textContent.replace(index, index-1));
                if(document.getElementById("k").textContent.startsWith("0")) $('#k').remove();
                break;                
              }
            }
          }
        break;
        case "s":
          if(!this.classList.contains("bad")){
              var string="front";
              for(var b=0;b<5;b++){
                zwischenspieler[xclick][yclick]=1;
                (waagerecht)? $("#"+xclick+player+yclick).addClass(string+" waage"): $("#"+xclick+player+yclick).addClass(string);
                for (var u = Math.max(0, xclick - 1); u <= Math.min(xclick + 1, rowLimit); u++) {
                  for (var v = Math.max(0, yclick - 1); v <= Math.min(yclick + 1, columnLimit); v++) {
                    if(zwischenspieler[u][v]==0) zwischenspieler[u][v]=-2;
                  }
                }            
                (waagerecht)? yclick++:xclick++;
                (b==3)?string="heck":string="mitte";
              }
            boot="l";
            $('#s').remove();                
            
          }
        break;
      }
      if($("#f").has("li").length ===0 && player=="a"|| $("#f2").has("li").length ===0 && player=="b"){
        document.getElementById("rotatediv").className = "invisible";
        document.getElementById("fertigdiv").className = "visible";
      }
      document.getElementById("randomdiv").className = "invisible";
    }
  })

//------------------Schuss-----------------------------------------
  $(".tdclick").click(function(){
      xclick= parseInt(this.id.substr(0,this.id.indexOf(schuss)));
      yclick= parseInt(this.id.substr(this.id.indexOf(schuss)+1,this.id.length));
      (player=="b")?player="a":player="b";
      if(zwischenspieler[xclick][yclick]==1){
        zwischenspieler[xclick][yclick]=2;
        $("h3").text("Getroffen!");
        $("h3").css("color","lightgreen");
        document.getElementById(xclick+schuss+yclick).className="tdgetroffen";
        document.getElementById(xclick+player+yclick).className="tdgetroffen";
        (player=="a"&&zwischenspieler[xclick][yclick]!=2)?--p1life:--p2life;
        if(p1life==0||p2life==0){
          $("h3").text("Gewonnen!");
          $("h3").css("color","lightgreen");
          $("h2").text("Gewonnen!");
          $("h2").css("background-color","green");
          document.getElementById(player+"click").className = "invisible";
        }
      }else if(zwischenspieler[xclick][yclick]<=0){
        zwischenspieler[xclick][yclick]=2;
        $("h3").text("Daneben!");
        $("h3").css("color","red");
        document.getElementById(xclick+schuss+yclick).className="tddaneben";
        document.getElementById(xclick+player+yclick).className="tddaneben";
        document.getElementById(player+"click").className = "invisible";
        document.getElementById("fertig2div").className = "visible";
      }
    (player=="b")?player="a":player="b";
  })

  $("#random").click(function(){
    let x,y,ok;
    for (let index = 0; index < 4; index++) {
      boot="u";     
      x=Math.floor(Math.random()*16);
      y=Math.floor(Math.random()*16);
      ok=false;
      if(Math.random()<0.5) $("#rotate").click();
      while(!ok){
        if(zwischenspieler[x][y]==0 && 
          (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0)){
          $("#"+x+player+y).click();
          ok=true;
        }else{
          x=Math.floor(Math.random()*16);
          y=Math.floor(Math.random()*16);
        }
      }
    }
    for (let index = 0; index < 3; index++) {
      boot="z";
      x=Math.floor(Math.random()*16);
      y=Math.floor(Math.random()*16);
      ok=false;
      if(Math.random()<0.5) $("#rotate").click();
      while(!ok){
        if(zwischenspieler[x][y]==0 && 
          (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0) && 
          (waagerecht ? zwischenspieler[x][y+2]==0 : zwischenspieler[x+2][y]==0)){
          $("#"+x+player+y).click();
          ok=true;
        }else{
          x=Math.floor(Math.random()*16);
          y=Math.floor(Math.random()*16);
        }
      }
    }
    for (let index = 0; index < 2; index++) {
      boot="k";
      x=Math.floor(Math.random()*16);
      y=Math.floor(Math.random()*16);
      ok=false;
      if(Math.random()<0.5) $("#rotate").click();
      while(!ok){
        if(zwischenspieler[x][y]==0 && 
          (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0) && 
          (waagerecht ? zwischenspieler[x][y+2]==0 : zwischenspieler[x+2][y]==0) &&
          (waagerecht ? zwischenspieler[x][y+3]==0 : zwischenspieler[x+3][y]==0)){
          $("#"+x+player+y).click();
          ok=true;
        }else{
          x=Math.floor(Math.random()*16);
          y=Math.floor(Math.random()*16);
        }
      }
    }
    boot="s";
    x=Math.floor(Math.random()*16);
    y=Math.floor(Math.random()*16);
    ok=false;
    if(Math.random()<0.5) $("#rotate").click();
    while(!ok){
      if(zwischenspieler[x][y]==0 && 
        (waagerecht ? zwischenspieler[x][y+1]==0 : zwischenspieler[x+1][y]==0) && 
        (waagerecht ? zwischenspieler[x][y+2]==0 : zwischenspieler[x+2][y]==0) &&
        (waagerecht ? zwischenspieler[x][y+3]==0 : zwischenspieler[x+3][y]==0) &&
        (waagerecht ? zwischenspieler[x][y+4]==0 : zwischenspieler[x+4][y]==0)){
        $("#"+x+player+y).click();
        ok=true;
      }else{
        x=Math.floor(Math.random()*16);
        y=Math.floor(Math.random()*16);
      }
    }
    document.getElementById("randomdiv").className = "invisible";
  }) 
});