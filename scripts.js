function displayVisits() 
 {    
  // How many visits so far? 
      var numVisits = GetCookie("numVisits"); 
      if (numVisits) numVisits = parseInt(numVisits) + 1; 
      else numVisits = 1; // the value for the new cookie 
  
  // Show the number of visits 
      if (numVisits==1){
      	document.write("<p>This is your first visit.</p>");
      }  
      else{
      	document.write("<p>You have visited this page " + numVisits + " times.</p>"); 
      } 
  
  // Set the cookie to expire 365 days from now 
      var today = new Date(); 
      today.setTime(today.getTime() + 365 /*days*/ * 24 /*hours*/ * 60 /*minutes*/ * 60 /*seconds*/ * 1000 /*milliseconds*/); 
      SetCookie("numVisits", numVisits, today); 
  }

displayVisits();