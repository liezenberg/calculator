$(document).ready( function(){
   //число получается когда кликаем по функциональной кнопке
    let firstnumber;
    let secondnumber;
    let inputstr="";    
      
     //button click
     $('button.num , button.functional').on('click', function(){  
        inputstr+=$(this).attr('name');
        $('input').val(inputstr);
     });

     $('button#c').on('click',function(){
      $('input').val("");
        inputstr="";
     });
      
      $('button#backspace').on('click',function(){
         var temp = inputstr.substring(0, inputstr.length - 1);
         $('input').val(temp);
        });
      
      $('button.result').on('click', function(){
         var result = eval(inputstr);
         $('input').val(result);
      });
    
});