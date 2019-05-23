import React from 'react';

import bs from 'main.css';
import Modal from 'components/modal';

const DeferTimeout = (props) => (
  <Modal
    {...props}
    title="Defer a Timeout"
  >
    <form className={bs.formInline}>
      <div className={bs.formRow}>
        <label className={bs.colAuto}>
          Add
        </label>
        <div className={bs.colAuto}>
          <input
            type="number"
            className={bs.formControl}
            defaultValue={5}
            min={5}
            max={30}
            step={5}
            style={{ width: 80 }}
          />
        </div>
        <div className={bs.colAuto}>
          <select className={bs.formControl} defaultValue="min">
            <option value="min">Minutes</option>
            <option value="hr">Hours</option>
          </select>
        </div>
      </div>
    </form>
  </Modal>
);

export default DeferTimeout;
