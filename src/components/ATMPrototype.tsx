import React, { useState } from 'react';
import { CreditCard, ArrowLeft, CheckCircle, XCircle, Receipt, DollarSign } from 'lucide-react';

// Type definitions
type ScreenType = 'welcome' | 'pin' | 'menu' | 'withdrawal' | 'dispensing' | 'receipt' | 'blocked';

interface TransactionData {
  amount: number;
  date: string;
  transactionId: string;
  availableBalance: number;
}

const ATMPrototype: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [pin, setPin] = useState<string>('');
  const [pinAttempts, setPinAttempts] = useState<number>(3);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [cardInserted, setCardInserted] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [balance] = useState<number>(1250.50);
  const [transactionComplete, setTransactionComplete] = useState<boolean>(false);

  // Simulate card insertion
  const handleCardInsertion = (): void => {
    setCardInserted(true);
    setTimeout(() => {
      setCurrentScreen('pin');
    }, 1500);
  };

  // Handle PIN entry
  const handlePinEntry = (digit: string): void => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  // Clear PIN
  const clearPin = (): void => {
    setPin('');
  };

  // Submit PIN
  const submitPin = (): void => {
    if (pin === '1234') { // Demo PIN
      setCurrentScreen('menu');
      setPin('');
    } else {
      setPinAttempts(pinAttempts - 1);
      setPin('');
      if (pinAttempts <= 1) {
        setCurrentScreen('blocked');
      }
    }
  };

  // Handle withdrawal process
  const processWithdrawal = (): void => {
    const amount: number = selectedAmount || parseFloat(customAmount);
    
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (amount > balance) {
      alert('Insufficient funds');
      return;
    }
    
    if (amount > 500) {
      alert('Daily limit exceeded');
      return;
    }
    
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCurrentScreen('dispensing');
      setTimeout(() => {
        setTransactionComplete(true);
        setCurrentScreen('receipt');
      }, 3000);
    }, 2000);
  };

  // Reset application state
  const resetApplication = (): void => {
    setCurrentScreen('welcome');
    setSelectedAmount(null);
    setCustomAmount('');
    setCardInserted(false);
    setTransactionComplete(false);
    setPinAttempts(3);
    setPin('');
    setProcessing(false);
  };

  // Screen Components
  const WelcomeScreen: React.FC = () => (
    <div className="text-center space-y-6">
      <div className="text-blue-600 text-6xl mb-4">
        <CreditCard className="mx-auto" size={80} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Welcome to SecureBank ATM</h1>
      <p className="text-lg text-gray-600">Please insert your debit card to begin</p>
      <div className="mt-8">
        <button
          onClick={handleCardInsertion}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={cardInserted}
        >
          {cardInserted ? 'Card Inserted...' : 'Insert Card (Simulate)'}
        </button>
      </div>
      <div className="mt-6 text-sm text-gray-500">
        <p>Languages: English | Español | Français</p>
      </div>
    </div>
  );

  const PinScreen: React.FC = () => (
    <div className="text-center space-y-6">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <CheckCircle className="text-green-600" size={24} />
        <span className="text-lg">Card Accepted</span>
      </div>
      
      <h2 className="text-2xl font-bold">Enter Your PIN</h2>
      
      <div className="flex justify-center space-x-2 mb-6">
        {[0, 1, 2, 3].map((i: number) => (
          <div
            key={i}
            className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center"
          >
            {pin.length > i && (
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num: number) => (
          <button
            key={num}
            onClick={() => handlePinEntry(num.toString())}
            className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded-lg text-xl font-bold transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={clearPin}
          className="w-16 h-16 bg-red-200 hover:bg-red-300 rounded-lg text-lg font-bold transition-colors"
        >
          CLR
        </button>
        <button
          onClick={() => handlePinEntry('0')}
          className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded-lg text-xl font-bold transition-colors"
        >
          0
        </button>
        <button
          onClick={submitPin}
          disabled={pin.length !== 4}
          className="w-16 h-16 bg-green-200 hover:bg-green-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg text-lg font-bold transition-colors"
        >
          OK
        </button>
      </div>

      <p className="text-sm text-red-600">
        Attempts remaining: {pinAttempts} (Demo PIN: 1234)
      </p>
    </div>
  );

  const MenuScreen: React.FC = () => (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold">Select Transaction</h2>
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        <button
          onClick={() => setCurrentScreen('withdrawal')}
          className="bg-blue-600 text-white py-4 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <DollarSign size={24} />
          <span>Cash Withdrawal</span>
        </button>
        <button className="bg-gray-200 text-gray-700 py-4 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors">
          Balance Inquiry
        </button>
        <button className="bg-gray-200 text-gray-700 py-4 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors">
          Mini Statement
        </button>
        <button className="bg-gray-200 text-gray-700 py-4 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors">
          Change PIN
        </button>
      </div>
      <p className="text-sm text-gray-600">Available Balance: ${balance.toFixed(2)}</p>
    </div>
  );

  const WithdrawalScreen: React.FC = () => (
    <div className="text-center space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentScreen('menu')}
          className="text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Select Amount</h2>
        <div></div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {[20, 40, 60, 100, 200, 300].map((amount: number) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`py-3 px-4 rounded-lg text-lg transition-colors ${
              selectedAmount === amount
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-lg mb-2">Other Amount:</p>
        <input
          type="number"
          value={customAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null);
          }}
          placeholder="Enter amount"
          className="border-2 border-gray-300 rounded-lg px-4 py-2 text-lg text-center"
          max="500"
          min="1"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={processWithdrawal}
          disabled={!selectedAmount && !customAmount}
          className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Available Balance: ${balance.toFixed(2)}<br/>
        Daily Limit: $500
      </p>
    </div>
  );

  const ProcessingScreen: React.FC = () => (
    <div className="text-center space-y-6">
      <div className="animate-spin text-blue-600 mx-auto">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>
      <h2 className="text-2xl font-bold">Processing Transaction</h2>
      <p className="text-lg text-gray-600">Please wait while we process your request...</p>
      <p className="text-sm text-gray-500">Do not remove your card</p>
    </div>
  );

  const DispensingScreen: React.FC = () => (
    <div className="text-center space-y-6">
      <div className="text-green-600 text-6xl mb-4">
        <CheckCircle className="mx-auto animate-pulse" size={80} />
      </div>
      <h2 className="text-2xl font-bold text-green-600">Cash Dispensed</h2>
      <p className="text-lg">Please take your cash: ${selectedAmount || customAmount}</p>
      <p className="text-lg">Please take your card</p>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 text-left">
        <p className="text-sm">⚠️ Remember to take your cash and card before leaving</p>
      </div>
    </div>
  );

  const ReceiptScreen: React.FC = () => {
    const transactionAmount = selectedAmount || parseFloat(customAmount);
    
    return (
      <div className="text-center space-y-6">
        <Receipt className="mx-auto text-blue-600" size={60} />
        <h2 className="text-2xl font-bold">Transaction Complete</h2>
        
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 max-w-md mx-auto text-left">
          <h3 className="font-bold text-center mb-4">TRANSACTION RECEIPT</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction:</span>
              <span>Cash Withdrawal</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span>${transactionAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Available Balance:</span>
              <span>${(balance - transactionAmount).toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Transaction ID:</span>
              <span>TXN-{Date.now().toString().slice(-8)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={resetApplication}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            New Transaction
          </button>
        </div>
      </div>
    );
  };

  const BlockedScreen: React.FC = () => (
    <div className="text-center space-y-6">
      <XCircle className="mx-auto text-red-600" size={80} />
      <h2 className="text-2xl font-bold text-red-600">Card Blocked</h2>
      <p className="text-lg">Too many incorrect PIN attempts</p>
      <p className="text-gray-600">Please contact your bank to unblock your card</p>
      <button
        onClick={resetApplication}
        className="bg-red-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition-colors"
      >
        Exit
      </button>
    </div>
  );

  // Main render
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-2xl overflow-hidden">
      {/* ATM Header */}
      <div className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-xl font-bold">SecureBank ATM</h1>
        <p className="text-sm opacity-90">24/7 Banking Services</p>
      </div>

      {/* Screen Area */}
      <div className="min-h-96 p-8 bg-gray-50">
        {currentScreen === 'welcome' && <WelcomeScreen />}
        {currentScreen === 'pin' && <PinScreen />}
        {currentScreen === 'menu' && <MenuScreen />}
        {currentScreen === 'withdrawal' && <WithdrawalScreen />}
        {processing && <ProcessingScreen />}
        {currentScreen === 'dispensing' && <DispensingScreen />}
        {currentScreen === 'receipt' && <ReceiptScreen />}
        {currentScreen === 'blocked' && <BlockedScreen />}
      </div>

      {/* ATM Footer */}
      <div className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>For assistance, call 1-800-BANK-HELP</p>
        <p className="text-xs opacity-75">This is a prototype demonstration</p>
      </div>
    </div>
  );
};

export default ATMPrototype;