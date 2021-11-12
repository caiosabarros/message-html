const { assert } = require("console");
//Testing with Mocha

//Write normal code
class Car {

  drive(){
    console.log("driving");
    return "driven";
  }

  park(){
    console.log("parking");
    return "parked";
  }
}

/*Declare variable to be in the escope both 
of the beforeEach() and describe() functions*/
let car;

//Every it run will be preceded by this run to create
//an instance of the Car() class.
beforeEach( 
  () => {
    car = new Car();
  }
);

//The pattern is: string, ()=>{code} for the describe and it functions.
describe("Testing Car Class with Mocha", () => {
  it("Testing drive functionality",
  () => {
    //const car = new Car;
    assert.equal(car.drive(),"driven");
  });

  it("Testing parking functionality",
  ()=> {
    //const car = new Car;
    assert.equal(car.park(),"parked");
  });
});