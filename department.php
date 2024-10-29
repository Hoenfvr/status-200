<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connecthp.php';

if (!isset($conn)) {
    die("Database connection not established.");
}

// Rest of your code

$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', $_SERVER['REQUEST_URI']);

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM department";
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $department = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $department = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($department);
        break;

    case "POST":
        $department = json_decode(file_get_contents('php://input'));
        
        // Check if all required fields are present
        if (isset($department->department_name) && isset($department->floor_count) && isset($department->create_by)) {
            $sql = "INSERT INTO department (department_name, create_by, create_date, update_by, update_date) 
                    VALUES (:department_name, :create_by, :create_date, :update_by, :update_date)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':building_name', $department->department_name);
            $stmt->bindParam(':create_by', $department->create_by);
            $stmt->bindParam(':create_date', $department->create_date);
            $stmt->bindParam(':update_by', $department->update_by);
            $stmt->bindParam(':update_date', $department->update_date);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Invalid input data.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql = "DELETE FROM building WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Delete successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Invalid ID.'];
        }
        echo json_encode($response);
        break;

    // Example: Enhanced error checking for the PUT method
case "PUT":
    if (isset($path[3]) && is_numeric($path[3])) {
        $department = json_decode(file_get_contents('php://input'));
        
        // Validate input data here if necessary
        
        $checkSql = "SELECT * FROM building WHERE id = :id";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->bindParam(':id', $path[3]);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() > 0) {
            // Proceed with update
            $sql = "UPDATE department SET department_name = :department_name, create_by = :create_by, create_date = :create_date, 
                    update_by = :update_by, update_date = :update_date 
                    WHERE id = :id"; 

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->bindParam(':building_name', $department->department_name);
            $stmt->bindParam(':create_by', $department->create_by);
            $stmt->bindParam(':create_date', $department->create_date);
            $stmt->bindParam(':update_by', $department->update_by);
            $stmt->bindParam(':update_date', $department->update_date);


            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Record not found.'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'Invalid ID.'];
    }
    echo json_encode($response);
    break;

}
?>
