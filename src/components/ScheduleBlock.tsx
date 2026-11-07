type ScheduleBlockProps = {
  date: string;
  time: string;
  timeNote?: string;
  programme?: string;
  extra?: string;
};

/** A shared printed-invitation treatment for confirmed event schedules. */
export function ScheduleBlock({ date, time, timeNote, programme, extra }: ScheduleBlockProps) {
  return <div className="schedule-block">
    <p className="schedule-date">{date}</p>
    <div className="schedule-divider" aria-hidden="true" />
    <p className="schedule-time">{time}{timeNote && <span className={'schedule-note' + (timeNote === 'Vivah Muhurat' ? ' schedule-note-muhurat' : '')}> {timeNote}</span>}</p>
    {programme && <p className="schedule-programme">{programme}</p>}
    {extra && <p className="schedule-extra">{extra}</p>}
  </div>;
}
