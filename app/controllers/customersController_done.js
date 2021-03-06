(function customersControllerIIFE(){

  var CustomersController = function(customersFactory, appSettings){
    var vm = this;
    vm.appSettings = appSettings;
    vm.sortBy = "name";
    vm.reverse = false;

    // All the customers
    vm.customers= [];
    // reflects the contents of the form, the current customer
    vm.currentCustomer = {};
    // The customer to be saved/persisted
    vm.master = {};

    function init(){
      // Init the customers from the factory
      // Get all the customers from the backend
      customersFactory.getCustomers()
      .then(function(result){
        vm.customers = result.data;
      }, function(data, status, headers, config){
        console.log("Error getting customers from the remote api");
        alert("Error getting customers from the remote api");
      });
    }

    init();

    vm.create = function(){
      // vm.master = angular.copy(vm.currentCustomer);
      customersFactory.createCustomer(vm.currentCustomer)
        .then(function(result){
          vm.master = result.data;
          vm.customers.push(vm.master);
          vm.currentCustomer = {};
        }, function(data, status,headers, config){
          console.log('Error creating a customer');
          alert('Error creating a customer');
        });
    };

    // reset the form to empty
    vm.reset = function(){
      vm.currentCustomer = angular.copy({});
    };

    vm.isUnchanged = function(customer) {
      return angular.equals(vm.currentCustomer, vm.master);
    };

    // start off with a reset form
    vm.reset();

    vm.doSort = function(propName){
      vm.sortBy = propName;
      vm.reverse = !vm.reverse;
    };

  };

 CustomersController.$inject = ['customersFactory', 'appSettings'];

 // The Controller is part of the module.
 angular.module('customersApp').controller('customersController', CustomersController);

})();
