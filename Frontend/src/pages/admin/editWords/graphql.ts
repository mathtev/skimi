import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_LANGUAGES } from '../../../graphql/language/queries';
import { Languages } from '../../../graphql/language/types';
import { GET_ALL_LEVELS } from '../../../graphql/level/queries';
import { Levels } from '../../../graphql/level/types';
import {
  CREATE_TRANSLATION,
  DELETE_TRANSLATION,
} from '../../../graphql/translation/mutations';
import { GET_ALL_TRANSLATIONS } from '../../../graphql/translation/queries';
import { Translations } from '../../../graphql/translation/types';
import { ADD_WORD } from '../../../graphql/word/mutations';
import { gql } from "@apollo/client";


export const useEditWordQuery = () => {
  const translationsQuery = useQuery<Translations>(GET_ALL_TRANSLATIONS);
  const levelsQuery = useQuery<Levels>(GET_ALL_LEVELS);
  const languagesQuery = useQuery<Languages>(GET_ALL_LANGUAGES);
  return { translationsQuery, levelsQuery, languagesQuery };
};

export const useEditWordMutation = () => {
  const [addWordMutation] = useMutation(ADD_WORD);
  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION);
  const [deleteTranslationMutation] = useMutation(DELETE_TRANSLATION);
  return {
    addWordMutation,
    createTranslationMutation,
    deleteTranslationMutation,
  };
};
