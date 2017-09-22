var myTodo = angular.module('myTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // 할일 모두 얻기
    $http.get('/todos')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // 할일 저장
    $scope.createTodo = function() {
        $http.post('/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // 할일 삭제
    $scope.deleteTodo = function(id) {
        $http.delete('/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

} // mainController
