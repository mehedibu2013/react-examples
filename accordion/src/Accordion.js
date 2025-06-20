import React, { useState } from 'react';
import './accordion.css';

const AccordionItem = ({ title, content, isOpen, onClick, styles }) => {
  return (
    <div className="accordion-item" style={styles}>
      <div className="accordion-title" onClick={onClick}>
        <div>{title}</div>
        <span aria-hidden={true} className={`accordion-icon ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

const accordionData = [
  {
    title: 'HTML',
    content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    title: 'CSS',
    content: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    title: 'JavaScript',
    content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
];

export default function Accordion({ styles }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion" style={styles}>
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
}