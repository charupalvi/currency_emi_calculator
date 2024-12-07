// Currency Converter
const apiKey = '1bf6a6ac9160261b6c71c523'; // Use ExchangeRate-API 

document.addEventListener('DOMContentLoaded', loadCurrencies);

async function loadCurrencies() {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD';
    const response = await fetch(url);
    const data = await response.json();
    
    const currencyOptions = Object.keys(data.rates);
    currencyOptions.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        document.getElementById('fromCurrency').appendChild(option1);
    
        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        document.getElementById('toCurrency').appendChild(option2);
    });
}

document.getElementById('convert').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Enter a valid amount.');
        return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById('conversionResult').innerText = 
            `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            
    } catch (error) {
        alert('Error fetching exchange rates. Please try again later.');
        console.error(error);
    }
});

// EMI Calculator
document.getElementById('calculateEMI').addEventListener('click', () => {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTenure = parseInt(document.getElementById('loanTenure').value);

    if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTenure)) {
        alert('Please enter valid numbers.');
        return;
    }

    const emi = (loanAmount * annualInterestRate * Math.pow(1 + annualInterestRate, loanTenure)) /
                (Math.pow(1 + annualInterestRate, loanTenure) - 1);
    document.getElementById('emiResult').innerText = `Monthly EMI: ₹${emi.toFixed(2)}`;
});
