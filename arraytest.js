const { askQuestions } = require('./ask');
const { askQuestions2} = require('./ask2');
const { askQuestions3} = require('./ask3');


var digitaltwin
var item
var brand
var prodDate
var bestby
var expdate
var lotquant
var supplier
var farm
var packaged
var color
var style
var material
var origin
var season



askQuestions([
		'Is it an apparel or food item?',
  
])
    .then(answers => {
		if(answers[0]=== "food")
		{
			askQuestions2	([
							'What is the digital twin id?',
							'What is the item? ',
							'What is the Brand? ',
							'What is the production date? ',
							'What is the Best by date ',
							'What is the Expiration date? ',
							'What is the Lot Quantity? ',
							'What is the Supplier? ',
							'What is the farm? ',
							'what is the packaged location? ',
  
							])
							.then(answers => {
								
								farm = answers[8]
								console.log("farm location is " + farm);
								
											 });	
		
			
		}else if (answers[0] === "apparel"){
			
			askQuestions3	([
							'What is the digital twin id?',
							'What is the item? ',
							'What is the Brand? ',
							'What is the color? ',
							'What is the style? ',
							'What is the Material? ',
							'What is the Origin? ',
							'What is the Season? ',
							
  
							])
							.then(answers => {
								console.log(answers[4]);
								
											 });	
							
			
		
			
		}else {
			console.log("sorry you did not select an appropriate asset type. Food or Apparel");
			
			
		}
		
       
	  
    });
	
	
	exports.digitaltwin = digitaltwin;