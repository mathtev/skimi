import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import donutImg from '../assets/images/subjectDonut.png';
import subjectRacoon from '../assets/images/subjectRacoon.png';
import subjectHand from '../assets/images/subjectHand.png';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
      height: '300px',
    },
    subjectImage: {
      width: '30px',
      height: '30px',
      background: '#fff',
      border: '1px solid #adadad',
    },
    heading: {
      marginLeft: '20px',
    },
  })
);

const mockedData = [
  {
    id: 'panel1',
    title: 'basics',
    description: 'this is a basic set',
    image: donutImg,
  },
  {
    id: 'panel2',
    title: 'intermediate basics',
    description: 'this is a basic set',
    image: subjectRacoon,
  },
  {
    id: 'panel3',
    title: 'more basics',
    description: 'this is a basic set',
    image: subjectHand,
  },
];

function SubjectList() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classes.root}>
      {mockedData.map((panel) => (
        <Accordion
          expanded={expanded === panel.id}
          onChange={handleChange(panel.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={panel.id + 'bh-content'}
            id={panel.id}
          >
            <Avatar className={classes.subjectImage} src={panel.image} alt="" />

            <Typography className={classes.heading}>
              {panel.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{panel.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default SubjectList;
