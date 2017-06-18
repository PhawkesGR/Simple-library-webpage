function addBook(){
	var response;
				var author = document.getElementById("author").value;
				var title = document.getElementById("title").value;
				var genre = document.getElementById("genre").value;
				var price = document.getElementById("price").value;

				//check if form is complete
				if ( title.length == 0 || genre.length == 0 || author.length == 0 || price.length == 0) {
					window.alert("Missing data!");
					return;
				}

				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState==4 && xmlhttp.status==200) {
						//alert(this.responseText);
						var obj = JSON.parse(this.responseText);
						alert(obj.status_message);
					}
				}
				//xmlhttp.open("POST","addbook.php?title="+title+"&author="+author+"&genre="+genre+"&price="+price,true);
				xmlhttp.open("POST","books.php?title="+title+"&author="+author+"&genre="+genre+"&price="+price,true);
				xmlhttp.send();
}

function getBook(){
	var response;
	var temp="";
	var bookTitle = document.getElementById("bookTitle").value;

	if ( bookTitle.length == 0) {
			window.alert("Missing data!");
			return;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var obj = JSON.parse(this.responseText);
				if(obj.length == 0){
					alert("No such book");
				}else{
					for(var i=0; i<obj.length; i++){
						temp = temp+"\n"+"Title: "+obj[i].title+"\nAuthor: "+obj[i].author+"\nGenre: "+obj[i].genre
						+"\nPrice: "+obj[i].price+"\nId: "+obj[i].id +"\n";
					}
					alert(temp)
				}

				//document.getElementById("displayBook").innerHTML = this.response;
	 }
 };
xmlhttp.open("GET","books.php?keyword="+bookTitle,true);
xmlhttp.send();
}
