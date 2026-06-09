import { stringifyDate } from '../../libs/utils/stringifyDate';

interface DateVisualProps {
  date: Date;
}

export const DateVisual: React.FC<DateVisualProps> = ({ date }) => {
  return (
    <time dateTime={date.toLocaleDateString('en-US')}>
      {stringifyDate(date)}
    </time>
  );
};
