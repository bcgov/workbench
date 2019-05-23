import React from 'react';

import bs from 'main.css';
import Modal from 'components/modal';

const EvaluateExport = (props) => (
  <Modal
    {...props}
    title="Evaluate Export"
  >
    <form style={{ width: 400 }}>
      <div className={bs.formGroup}>
        <label>Dataset</label>
        <select className={bs.formControl}>
          <option>Hourly Coarse Particulate</option>
          <option>Hourly Coarse Particulate</option>
          <option>Hourly Coarse Particulate</option>
        </select>
      </div>
      <div className={bs.formGroup}>
        <label>Some Field</label>
        <input type="text" className={bs.formControl}/>
      </div>
      <div className={bs.formGroup}>
        <label>Some Field</label>
        <textarea rows={5} className={bs.formControl}/>
      </div>
    </form>
  </Modal>
);

export default EvaluateExport;
