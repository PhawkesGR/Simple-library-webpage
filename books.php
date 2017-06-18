<?php
//$connection = mysqli_connect("localhost","root","test","books");
$connection = mysqli_connect("83.212.105.20","21438","4t%hs5dw","21438");

$request_method=$_SERVER["REQUEST_METHOD"];
switch($request_method)
{
  case 'GET':
    // Retrive Products
    $keyword=isset($_GET['keyword']) ? $_GET['keyword'] : '';
    get_books($keyword);

    break;
  case 'POST':
    // Insert Product
    insert_book();
    break;
  default:
    // Invalid Request Method
    header("HTTP/1.0 405 Method Not Allowed");
    break;
}

function get_books($keyword){
		global $connection;
		$query="SELECT * FROM books where title LIKE '%".$keyword."%'";

		$response=array();

		$result=mysqli_query($connection, $query);
    if (!$result) {
      printf("Error: %s\n", mysqli_error($connection));
      exit();
    }
    while($row=mysqli_fetch_array($result)){
  			$response[]=$row;
  	}

		header('Content-Type: application/json');
    echo json_encode($response);
}


function insert_book(){
  		global $connection;
      $title = $_REQUEST['title'];
      $author = $_REQUEST['author'];
      $genre = $_REQUEST['genre'];
      $price = $_REQUEST['price'];
  		$query="INSERT INTO books (author,title,genre,price) VALUES ('$author','$title','$genre','$price')";
      if(is_numeric($price)){
    		if(mysqli_query($connection, $query))
    		{
    			$response=array(
    				'status' => 1,
    				'status_message' =>'Book Added Successfully.'
    			);
    		}else {
    			$response=array(
    				'status' => 0,
    				'status_message' =>'Book Addition Failed.',
            'error' => mysqli_error($connection)
    			);
    		}
    }else{
      $response=array(
        'status' => 0,
        'status_message' =>'Price must be a number.'
      );
    }
  		header('Content-Type: application/json');
  		echo json_encode($response);
}

 ?>
