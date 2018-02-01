
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
var siteUrl=document.getElementById('siteURL').value;
var siteName=document.getElementById('siteName').value;

if(!siteName || !siteUrl){
  alert('please fill in the form');
  return ;
}
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

var bookmark={
  name:siteName,
  Url:siteUrl
}
//localStorage.removeItem('bookmarks');
if(localStorage.getItem('bookmarks')==null){
  var bookmarksArray = [];

  bookmarksArray.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarksArray));
}
else{
  var bookmarksArray=JSON.parse(localStorage.getItem('bookmarks'));
  bookmarksArray.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarksArray));
}

// Re-fetch bookmarks
  fetchBookmarks();

e.preventDefault();
}

function deleteBookmark(url){
  var bookmarksArray=JSON.parse(localStorage.getItem('bookmarks'));
  for(i=0;i<bookmarksArray.length;i++){
    if(bookmarksArray[i].Url==url){
      bookmarksArray.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));

 // Re-fetch bookmarks
 fetchBookmarks();

}


function fetchBookmarks(){
    var bookmarksArray=JSON.parse(localStorage.getItem('bookmarks'));
       var bookmarksResults=document.getElementById('bookmarksResults');

       for(i=0;i<bookmarksArray.length;i++){
         console.log(bookmarksArray[i].name);
         var name=bookmarksArray[i].name;
         var url=bookmarksArray[i].Url;

         bookmarksResults.innerHTML+='<div class="well">'+
                                      '<h3>'+name+" "+
                                       '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+" "+
                                       '<a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a>'+
                                       '</h3>'+
                                      '</div>';

    }

}
