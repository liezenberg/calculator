$(document).ready( function(){
   let result;
   let firstnumber;
   let secondnumber;
   let inputstr="";
   const minusstr = $('button#minus').attr('id');    
   const c = $('button#c').attr('id');  
   const testRegex = /[0-9]/; 
   const operators = /[^-][^0-9]$/ //если в строке после чисел есть знак выключаем функциональные клавиши
  //Если строка пустая выключаем все кроме цифр и -
   if (isEmpty(inputstr)) {
      $("button.functional").addClass("disabled").prop("disabled", true);  
      if(minusstr=='minus'|| c =='c'){
      $("button#minus , button#c").removeClass("disabled").prop("disabled", false);
      }
   }
   $('button.functional, button.num').on('click', function(){  
      //Если не пустая включам функциональные клавиши
      inputstr+=$(this).attr('name');
      $('input').val(inputstr);
      if(!isEmpty(inputstr)&&operators.test(inputstr)){
         $("button.functional").addClass("disabled").prop("disabled", true);
      }
      else if(testRegex.test(inputstr)){
         $("button.functional").removeClass("disabled").prop("disabled", false);
      }
   });
  
   
   function clear(){
      $('input').val("");
      inputstr="";
      $("button.functional").addClass("disabled").prop("disabled", true);  
      if(minusstr=='minus'|| c =='c'){
      $("button#minus , button#c").removeClass("disabled").prop("disabled", false);
      }
   };
   $('button#c').on('click', clear);
   $('button.backspace').on('click',function(){
         temp = inputstr.substring(0, inputstr.length - 1);
         inputstr = temp;
         $('input').val(inputstr);
   });
      
   $('button.result').on('click', function(){
      try{
            var result = eval(inputstr);
            $('input').val(result);
            inputstr = result.toString();
            
         } catch (error) {
            $('input').val('Error!');
            inputstr="";
         }
         
      });
   function isEmpty(str) {
         if (str.trim() == '') 
           return true;
           
         return false;
   };
       
});