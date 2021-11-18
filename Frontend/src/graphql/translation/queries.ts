import { gql, useQuery } from "@apollo/client";
import { Translations } from "./types";

export const GET_ALL_TRANSLATIONS = gql`
  query getTranslations {
    translations {
      id
      levelId
      level {
        id
        difficulty
        code
      }
      wordFrom {
        id
        name
        languageId
      }
      wordTo {
        id
        name
        languageId
      }
    }
  }
`;

export const useTranslationsQuery = () => {
  const { data, loading, refetch } =
    useQuery<Translations>(GET_ALL_TRANSLATIONS);
  return { data, loading, refetch };
};

