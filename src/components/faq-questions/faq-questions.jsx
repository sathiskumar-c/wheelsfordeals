import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./faq-questions.scss";
import JSON from "../../data/faq-questions.json";

const UsedBikeFaq = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="container faq-parent component-parent">
      <h3 className="section-title text-center">{JSON.title}</h3>
      {JSON.faqData.map((item, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion
            TransitionProps={{ unmountOnExit: true, timeout: 500 }}
            key={index}
            className="accordion-parent"
            expanded={expanded === panelId}
            onChange={handleChange(panelId)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${panelId}-content`}
              id={`${panelId}-header`}
            >
              <Typography component="span">🏍️ {item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default UsedBikeFaq;
