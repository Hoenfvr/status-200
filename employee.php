<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

include 'connecthp.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/')); // Trim slashes from URI

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM employee_info";
        
        if (isset($path[2]) && is_numeric($path[2])) { // Changed from path[3] to path[2] based on the request structure
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[2]);
            $stmt->execute();
            $employee_info = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $employee_info = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        // If no employee found for specific ID
        if (isset($path[2]) && is_numeric($path[2]) && !$employee_info) {
            http_response_code(404); // Not Found
            echo json_encode(['status' => 0, 'message' => 'Employee not found.']);
            exit;
        }
        
        echo json_encode($employee_info);
        break;

    case "POST":
        $employee_info = json_decode(file_get_contents('php://input'));
        
        if (!isset($employee_info->create_date) || empty($employee_info->create_date)) {
            $employee_info->create_date = date('Y-m-d H:i:s'); // Added time to the date
        } else {
            $employee_info->create_date = date('Y-m-d H:i:s', strtotime($employee_info->create_date));
        }

        // Validate building_id
        if (!isset($employee_info->building_id) || empty($employee_info->building_id)) {
            $response = ['status' => 0, 'message' => 'Building ID is required.'];
            echo json_encode($response);
            exit;
        }

        $building_id = $employee_info->building_id;
        $sql_check = "SELECT id FROM building WHERE id = :id"; 
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bindParam(':id', $building_id);
        $stmt_check->execute();
        if ($stmt_check->rowCount() == 0) {
            $response = ['status' => 0, 'message' => 'Invalid Building ID.'];
            echo json_encode($response);
            exit;
        }

        $sql = "INSERT INTO employee_info (fnameth, lnameth, fnameen, lnameen, position, department_id, create_by, create_date, update_by, update_date) 
                VALUES (:fnameth, :lnameth, :fnameen, :lnameen, :position, :department_id, :create_by, :create_date, :update_by, :update_date)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':fnameth', $employee_info->fnameth);
        $stmt->bindParam(':lnameth', $employee_info->lnameth);
        $stmt->bindParam(':fnameen', $employee_info->fnameen);
        $stmt->bindParam(':lnameen', $employee_info->lnameen);
        $stmt->bindParam(':position', $employee_info->position);
        $stmt->bindParam(':department_id', $employee_info->department_id);
        $stmt->bindParam(':create_by', $employee_info->create_by);
        $stmt->bindParam(':create_date', $employee_info->create_date);
        $stmt->bindParam(':update_by', $employee_info->update_by);
        $stmt->bindParam(':update_date', $employee_info->update_date);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        if (isset($path[2]) && is_numeric($path[2])) {
            $sql = "DELETE FROM employee_info WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[2]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Invalid ID.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        if (!isset($path[2]) || !is_numeric($path[2])) {
            $response = ['status' => 0, 'message' => 'Invalid ID.'];
            echo json_encode($response);
            exit;
        }

        $employee_info = json_decode(file_get_contents('php://input'));

        if (!isset($employee_info->create_date) || empty($employee_info->create_date)) {
            $employee_info->create_date = date('Y-m-d H:i:s');
        } else {
            $employee_info->create_date = date("Y-m-d H:i:s", strtotime($employee_info->create_date));
        }

        // Validate building_id
        if (!isset($employee_info->building_id) || empty($employee_info->building_id)) {
            $response = ['status' => 0, 'message' => 'Building ID is required.'];
            echo json_encode($response);
            exit;
        }

        $building_id = $employee_info->building_id;
        $sql_check = "SELECT id FROM building WHERE id = :id"; 
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bindParam(':id', $building_id);
        $stmt_check->execute();
        if ($stmt_check->rowCount() == 0) {
            $response = ['status' => 0, 'message' => 'Invalid Building ID.'];
            echo json_encode($response);
            exit;
        }

        try {
            $sql = "UPDATE employee_info SET fnameth = :fnameth, lnameth = :lnameth, fnameen = :fnameen, lnameen = :lnameen, 
                    position = :position, department_id = :department_id, create_by = :create_by, 
                    create_date = :create_date, update_by = :update_by, update_date = :update_date 
                    WHERE id = :id";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':fnameth', $employee_info->fnameth);
            $stmt->bindParam(':lnameth', $employee_info->lnameth);
            $stmt->bindParam(':fnameen', $employee_info->fnameen);
            $stmt->bindParam(':lnameen', $employee_info->lnameen);
            $stmt->bindParam(':position', $employee_info->position);
            $stmt->bindParam(':department_id', $employee_info->department_id);
            $stmt->bindParam(':create_by', $employee_info->create_by);
            $stmt->bindParam(':create_date', $employee_info->create_date);
            $stmt->bindParam(':update_by', $employee_info->update_by);
            $stmt->bindParam(':update_date', $employee_info->update_date);
            $stmt->bindParam(':id', $path[2]);

            if ($stmt->execute()) {
                http_response_code(200);
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                http_response_code(500);
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
        } catch (PDOException $e) {
            http_response_code(500);
            $response = ['status' => 0, 'message' => 'Error: ' . $e->getMessage()];
        }

        echo json_encode($response);
        break;
}
?>
