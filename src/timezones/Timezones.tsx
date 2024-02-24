import {FC} from "react";
import useTimezones from "@/timezones/useTimezones.ts";
import {LOADING_STATE} from "@/util/async.ts";

const Timezones: FC = () => {
  const [loadingState, error, timezones] = useTimezones();
  const listClasses = ['timezone-listing', `loading-state-${loadingState}`];

  return <section>
    <ul id="timezones-list" className={listClasses.join(' ')}>
      {timezones.map(tz => <li key={tz}>{tz}</li>)}
    </ul>
    {loadingState === LOADING_STATE.FAIL ? <aside role="alert" className="error-message">{error}</aside> : []}
  </section>;
}

export default Timezones;