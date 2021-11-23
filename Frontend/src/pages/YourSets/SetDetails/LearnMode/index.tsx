import React from 'react';
import { useParams } from 'react-router';
import { Sentence } from '../../../../graphql/sentence/types';
import { useSetQuery } from '../../../../graphql/set/queries';
import { Translation } from '../../../../graphql/translation/types';
import { TranslationSet } from '../../../../graphql/translationSet/types';
import { getRandom, weightedRandom } from '../../../../utils/helperFunctions';

interface IRouterParams {
  id: string;
}

const LearnMode: React.FC = () => {
  const id = +useParams<IRouterParams>().id;
  const { data, loading, refetch } = useSetQuery(id);

  const translations = data?.set.translationSetGroup || [];
  const weigtedTranslations = translations.map((translationSet) => ({
    translationSet,
    weight: 10 - translationSet.skill,
  }));

  const translation: Translation =
    weightedRandom(weigtedTranslations)?.translationSet.translation;
  const sentence: Sentence = translation?.sentences && getRandom(translation.sentences)

  return (
    <div>
      {translation?.wordFrom.name}
      {sentence?.textFrom}
    </div>
  );
};

export default LearnMode;
