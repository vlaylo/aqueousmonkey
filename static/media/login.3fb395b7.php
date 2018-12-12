<?php
    session_start();
  
    // Database Credentials
    $host       = "localhost";
    $dbname     = "sinfron_voterapp";
    $username   = "root";
    
    // Create connection
	$DBConnect = new mysqli($host, $username, $password, $dbname);

	// Check connection
	if ($DBConnect->connect_error) 
		{
	    die("Connection failed: " . $DBConnect->connect_error);
		} 

    // Check Referring URL
    if ($_SERVER['HTTP_REFERER'] <> "https://app.sinfron.com/") 
        {
        $_SESSION["ErrorCode"] = "0000";
        $_SESSION["ErrorDescription"] = "Illegal referring page to login processor.";
        header ('Location: https://app.sinfron.com/error.php');
        exit;
        }
        
    // Get Form Variables 
    $frmLogin       = strtoupper($_POST['frmLogin']);
    $frmPassword    = $_POST['frmPassword'];
    
    $_SESSION["SIN-LOGIN"] = $frmLogin;
    
    // Search DB for Account Records with User Name
    $UserQuery = 'SELECT * FROM users WHERE username="'.$frmLogin.'"';
    $UserResults = $DBConnect->query($UserQuery);
    
    // Get Login and Password from DB
    $sql = "SELECT * FROM users WHERE username='".$frmLogin."'";
	$result = $DBConnect->query($sql);

	while($row = $result->fetch_assoc()) 
		{
    	if ($row["password"] == $frmPassword) 
    	    { 
    	    $_SESSION["SIN-FNAME"] = $row["firstname"];
    	    $_SESSION["SIN-LNAME"] = $row["lastname"];
    	    $_SESSION["SIN-SECUR"] = $row["security"];
    	    $_SESSION["SIN-USRID"] = $row["id"];
    	    $_SESSION["SIN-PETAG"] = $row["PetitionTag"];
    	   
            $sql2 = "SELECT * FROM permissions WHERE userid='".$row["id"]."'";
	        $result2 = $DBConnect->query($sql2);

	        while($row2 = $result2->fetch_assoc()) 
		        {
		        $_SESSION["SIN-LSTID"] = $row2["listid"];  
		        }
    	    
    	    // Notify Jason if Ed Burke Logs In
    	    if ($frmLogin == "JBAUMANN")
                {
                header ('Location: https://app.sinfron.com/super-admin.php');
                exit();
                }
        	    
        	header ('Location: https://app.sinfron.com/home.php');
            exit;
    	    }
    	else
    	    {
    	    $_SESSION["ErrorCode"] = "0002" ;
            $_SESSION["ErrorDescription"] = "Login Error. Incorrect Password.";
    	    header ('Location: https://app.sinfron.com/');
            exit;    
    	    }
		}
	
    $_SESSION["ErrorCode"] = "0001" ;
    $_SESSION["ErrorDescription"] = "(" . $sql . ") Login Error. No Username found in DB.";
    header ('Location: https://app.sinfron.com/error.php');
    exit;
?>