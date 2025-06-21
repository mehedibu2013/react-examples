# 🧩 React Checkbox Tree

A dynamic, recursive checkbox tree built with React that supports nested structures, automatic parent-child synchronization, and indeterminate checkbox states.

## ✨ Features

- ✅ Recursive rendering of nested checkbox items
- ✅ Parent checkbox reflects state of its children:
  - Checked if all children are checked
  - Indeterminate if some are checked
  - Unchecked if none are checked
- ✅ Toggling a parent updates all its descendants
- ✅ Fully functional with plain React, no styling library required

## 📁 Folder Structure

```

checkbox-tree/
├── public/
│   └── index.html          # Root HTML file
├── src/
│   ├── CheckboxTree.jsx    # Main component
│   ├── data.js             # Tree data
│   └── index.js            # React entry point
├── package.json
└── README.md

````

## 🛠️ Technologies

- React (Hooks)
- JavaScript (ES6+)
- No external UI libraries

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### 📥 Installation

```bash
git clone https://github.com/mehedibu2013/react-practice.git
cd checkbox-tree
npm install
````

### 🧪 Running the App

```bash
npm start
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🗃️ Sample Data (`data.js`)

## The indeterminate state is visually represented by a horizontal dash in the checkbox.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

### 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

Let me know if you'd like help deploying this to GitHub Pages or Vercel.

```

