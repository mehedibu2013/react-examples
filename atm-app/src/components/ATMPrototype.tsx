import React, { useState } from 'react';
import { CreditCard, DollarSign, ArrowRight, LogOut } from 'lucide-react';

const ATMPrototype: React.FC = () => {
  const [step, setStep] = useState<'welcome' | 'pin' | 'menu' | 'balance' | 'withdraw' | 'complete'>('welcome');
  const [pin, setPin] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [balance, setBalance] = useState<number>(1500.00);

  const handlePinSubmit = () => {
    if (pin === '1234') {
      setStep('menu');
    } else {
      alert('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > balance) {
      alert('Insufficient funds');
      return;
    }
    
    setBalance(balance - withdrawAmount);
    setStep('complete');
  };

  const resetATM = () => {
    setStep('welcome');
    setPin('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
      <div className="bg-bank-blue-600 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">Bank ATM</h1>
        <p className="text-bank-blue-50">24/7 Banking Services</p>
      </div>

      <div className="p-6 min-h-96">
        {step === 'welcome' && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CreditCard size={64} className="text-bank-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Welcome to Bank ATM</h2>
            <p className="mb-8 text-gray-600">Please insert your card to begin</p>
            <button 
              onClick={() => setStep('pin')}
              className="bg-bank-blue-600 text-white px-6 py-2 rounded-md hover:bg-bank-blue-700 transition-colors"
            >
              Insert Card
            </button>
          </div>
        )}

        {step === 'pin' && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Enter PIN</h2>
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              className="w-full p-3 border border-gray-300 rounded-md text-center text-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
              placeholder="****"
            />
            <button 
              onClick={handlePinSubmit}
              disabled={pin.length !== 4}
              className="bg-bank-blue-600 text-white px-6 py-2 rounded-md hover:bg-bank-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        )}

        {step === 'menu' && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-center">Select Transaction</h2>
            <div className="space-y-4">
              <button 
                onClick={() => setStep('balance')}
                className="w-full bg-bank-blue-50 text-bank-blue-700 p-4 rounded-md hover:bg-bank-blue-100 transition-colors flex items-center justify-between"
              >
                <span>Check Balance</span>
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setStep('withdraw')}
                className="w-full bg-bank-blue-50 text-bank-blue-700 p-4 rounded-md hover:bg-bank-blue-100 transition-colors flex items-center justify-between"
              >
                <span>Withdraw Cash</span>
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={resetATM}
                className="w-full bg-gray-100 text-gray-700 p-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-between mt-8"
              >
                <span>Exit</span>
                <LogOut size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 'balance' && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Your Balance</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex items-center justify-center mb-2">
                <DollarSign size={24} className="text-green-600 mr-2" />
                <span className="text-3xl font-bold">{balance.toFixed(2)}</span>
              </div>
              <p className="text-gray-500">Available Balance</p>
            </div>
            <button 
              onClick={() => setStep('menu')}
              className="bg-bank-blue-600 text-white px-6 py-2 rounded-md hover:bg-bank-blue-700 transition-colors"
            >
              Back to Menu
            </button>
          </div>
        )}

        {step === 'withdraw' && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Withdraw Cash</h2>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Enter Amount</label>
              <div className="flex items-center">
                <span className="bg-gray-100 p-3 rounded-l-md text-gray-500">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                  placeholder="0.00"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Available balance: ${balance.toFixed(2)}</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setStep('menu')}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleWithdraw}
                disabled={!amount || parseFloat(amount) <= 0}
                className="flex-1 bg-bank-blue-600 text-white px-4 py-2 rounded-md hover:bg-bank-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Withdraw
              </button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <DollarSign size={48} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Transaction Complete</h2>
            <p className="text-gray-600 mb-2">You have withdrawn ${parseFloat(amount).toFixed(2)}</p>
            <p className="text-gray-600 mb-6">Your new balance is ${balance.toFixed(2)}</p>
            <button 
              onClick={resetATM}
              className="bg-bank-blue-600 text-white px-6 py-2 rounded-md hover:bg-bank-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATMPrototype;