# React Progress Bar Example

A simple and elegant React app that dynamically adds animated progress bars that fill from 0% to 100%.

---

## 📝 Description

This is a minimal React application demonstrating how to create dynamic, animated progress bars using React hooks and CSS transitions.  
Each time you click the **Add** button, a new progress bar appears and fills up smoothly over 2 seconds.

---

## 🧩 Features

- Add as many progress bars as you want.
- Each bar animates independently.
- Smooth 2-second fill animation using CSS transitions.
- Easily extendable for further customization.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed (v14 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the main repository:

```bash
git clone https://github.com/mehedibu2013/react-examples.git
cd react-examples
```

2. Navigate into this example:

```bash
cd progress-bar-app
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

### Run the App

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

---

## 📁 Project Structure

```
progress-bar-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProgressBar.jsx
│   │   └── ProgressBar.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## 💡 How It Works

- The `App` component maintains an array of progress bar IDs in state.
- When the **Add** button is clicked, a new ID is added to the array.
- Each `ProgressBar` component mounts and starts an animation using `useState` and `useEffect`.
- CSS transitions animate the width change smoothly over 2 seconds.

---

## 🔧 Future Improvements

- Add percentage label inside each progress bar.
- Allow customization of animation duration via props.
- Add "Pause", "Resume", and "Remove" functionality per bar.
- Include a "Clear All" button.

---
