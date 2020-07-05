// Listen for Submits
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  //UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12 ;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly) && amount.value >0 && interest.value >0 && years.value >= 0) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // Create diagram
    var chart = new CanvasJS.Chart("chartContainer", {
  		animationEnabled: true,
  		title: {
  			text: "Total payment distribution"
  		},
  		data: [{
  			type: "pie",
  			startAngle: 240,
  			yValueFormatString: "##0.00",
  			indexLabel: "{label} {y}",
  			dataPoints: [
  				{y: totalPayment.value - totalInterest.value , label: "Initial loan amount"},
  				{y: totalInterest.value, label: "Interest"}
  			]
  		}]
  	});
    chart.render();


  } else {
    showError('Please check your numbers');
  }

}

// Show error
function showError(error) {
  // Show results
  document.getElementById('results').style.display = 'none';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  //Create a div
  const errorDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after x seconds
  setTimeout(clearError, 3000);

}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}
