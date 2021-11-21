import React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  Paper,
  TableHead,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import {
  Translation,
  Translations,
} from '../../../../graphql/translation/types';
import { Language } from '../../../../graphql/language/types';
import { ApolloQueryResult } from '@apollo/client';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
    },
    deleteBtn: {
      transform: 'scale(0.8)',
    },
    tableRow: {
      '& .MuiTableCell-head': {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.main,
      },
    },
  })
);

interface TranslationsTableProps {
  translations?: Translation[];
  languageFrom?: Language;
  languageTo?: Language;
  deleteTranslation: (id: number) => Promise<ApolloQueryResult<Translations>>;
}

const TranslationsTable: React.FC<TranslationsTableProps> = ({
  translations,
  languageFrom,
  languageTo,
  deleteTranslation,
}) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell align="left">{languageFrom?.name}</TableCell>
            <TableCell align="left">{languageTo?.name}</TableCell>
            <TableCell align="left">Skill</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {translations?.map((translation: Translation) => (
            <TableRow key={translation.id}>
              <TableCell align="left">{translation.wordFrom.name}</TableCell>
              <TableCell align="left">{translation.wordTo.name}</TableCell>
              <TableCell align="left">{translation.level.code}</TableCell>
              <TableCell align="left">
                <IconButton
                  className={classes.deleteBtn}
                  onClick={() => deleteTranslation(translation.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TranslationsTable;
