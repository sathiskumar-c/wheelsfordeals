// AccordionItem.jsx
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CommonAccordion = ({ id, expanded, onChange, question, answer }) => {
  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true, timeout: 500 }}
      expanded={expanded === id}
      onChange={onChange(id)}
      className="accordion-parent"
      role="listitem"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Typography component="h4" variant="subtitle1">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="p">{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CommonAccordion;
