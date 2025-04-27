import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./frequently-asked-questions.scss";
import JSON from "../../data/frequently-asked-questions.json";

const FrequentlyAskedQuestions = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section
      className="container faq-parent component-parent"
      aria-labelledby="frequently-asked-questions"
      role="region"
    >
      <h3 className="section-title text-center" id="faq-title">
        {JSON.title}
      </h3>

      <div className="faq-list" role="list">
        {JSON.faqData.map((item, index) => {
          const panelId = `panel${index}`;
          return (
            <Accordion
              TransitionProps={{ unmountOnExit: true, timeout: 500 }}
              key={index}
              className="accordion-parent"
              expanded={expanded === panelId}
              onChange={handleChange(panelId)}
              role="listitem"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${panelId}-content`}
                id={`${panelId}-header`}
              >
                <Typography component="h4" variant="subtitle1">
                  🏍️ {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="p">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
