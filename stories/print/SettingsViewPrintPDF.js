/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2017, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

import React from 'react';
import _ from 'lodash';
import { storiesOf } from '@storybook/react';

import { createPrintView } from '../../src/modules/print/index';
import { MARGIN } from '../../src/modules/print/utils/constants';
import PrintView from '../../src/modules/print/PrintView';

import * as profiles from '../../data/patient/profiles';

import { MGDL_UNITS, MMOLL_UNITS } from '../../src/utils/constants';

/* global PDFDocument, blobStream, window */

const stories = storiesOf('Settings View PDF', module);

let queries;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  queries = require('../../local/PDFDataQueries.json');
} catch (e) {
  queries = {};
}

import animasDataMultiRate from '../../data/pumpSettings/animas/multirate.json';
import animasDataFlatRate from '../../data/pumpSettings/animas/flatrate.json';
import medtronicDataMultiRate from '../../data/pumpSettings/medtronic/multirate.json';
import medtronicDataFlatRate from '../../data/pumpSettings/medtronic/flatrate.json';
import medtronicDataAutomated from '../../data/pumpSettings/medtronic/automated.json';
import omnipodDataMultiRate from '../../data/pumpSettings/omnipod/multirate.json';
import omnipodDataFlatRate from '../../data/pumpSettings/omnipod/flatrate.json';
import tandemDataMultiRate from '../../data/pumpSettings/tandem/multirate.json';
import tandemDataFlatRate from '../../data/pumpSettings/tandem/flatrate.json';

const bgBounds = {
  [MGDL_UNITS]: {
    veryHighThreshold: 250,
    targetUpperBound: 180,
    targetLowerBound: 70,
    veryLowThreshold: 54,
  },
  [MMOLL_UNITS]: {
    veryHighThreshold: 13.9,
    targetUpperBound: 10,
    targetLowerBound: 3.9,
    veryLowThreshold: 3.0,
  },
};

function openPDF(dataUtil, { patient, bgUnits = MGDL_UNITS }, dataFixture) {
  const doc = new PDFDocument({ autoFirstPage: false, bufferPages: true, margin: MARGIN });
  const stream = doc.pipe(blobStream());
  const opts = {
    bgPrefs: {
      bgBounds: bgBounds[bgUnits],
      bgUnits,
    },
    timePrefs: {
      timezoneAware: true,
      timezoneName: 'US/Eastern',
    },
    patient,
  };

  const data = dataFixture || queries ? dataUtil.query(queries.settings) : {};

  createPrintView('settings', data, opts, doc).render();
  PrintView.renderPageNumbers(doc);

  doc.end();

  stream.on('finish', () => {
    window.open(stream.toBlobURL('application/pdf'));
  });
}

const notes = `Run \`window.downloadPrintViewData()\` from the console on a Tidepool Web data view.
Save the resulting file to the \`local/\` directory of viz as \`print-view.json\`,
and then use this story to iterate on the Settings Print PDF outside of Tidepool Web!`;

profiles.longName = _.cloneDeep(profiles.standard);
profiles.longName.profile.fullName = 'Super Duper Long Patient Name';

stories.add(`standard account (${MGDL_UNITS})`, ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.standard })}>
    Open PDF in new tab
  </button>
), { notes });

stories.add(`standard account (${MMOLL_UNITS})`, ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.standard, bgUnits: MMOLL_UNITS })}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('animas flat rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, animasDataFlatRate)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('animas multi rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, animasDataMultiRate)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('medtronic flat rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, medtronicDataFlatRate)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('medtronic multi rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, medtronicDataMultiRate)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('medtronic automated rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, medtronicDataAutomated)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('medtronic automated inactive rate', ({ dataUtil }) => {
  const inactiveAutomatedBasaldata = _.assign({}, medtronicDataAutomated, {
    activeSchedule: 'Standard',
  });

  return (
    <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, inactiveAutomatedBasaldata)}>
      Open PDF in new tab
    </button>
  );
}, { notes });

stories.add('omnipod flat rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, omnipodDataFlatRate)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('omnipod multi rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, omnipodDataMultiRate)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('tandem flat rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, tandemDataFlatRate)}>
    Open PDF in new tab
  </button>
), { notes });

stories.add('tandem multi rate', ({ dataUtil }) => (
  <button onClick={() => openPDF(dataUtil, { patient: profiles.longName }, tandemDataMultiRate)}>
    Open PDF in new tab
  </button>
), { notes });
