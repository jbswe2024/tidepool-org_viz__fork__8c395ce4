/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2016, Tidepool Project
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

import isTSA from 'tidepool-standard-action';

import * as actionTypes from '../../../src/redux/constants/actionTypes';
import * as actions from '../../../src/redux/actions/';

describe('worker action creators', () => {
  describe('generatePDFRequest', () => {
    const payload = {
      type: 'daily',
      mostRecent: 'mostRecent',
      groupedData: [],
      opts: {},
    };

    const {
      type,
      mostRecent,
      groupedData,
      opts,
    } = payload;

    const action = actions.generatePDFRequest(type, mostRecent, groupedData, opts);

    it('should be a TSA', () => {
      expect(isTSA(action)).to.be.true;
    });

    it('should create an action to request a PDF generation', () => {
      expect(action).to.deep.equal({
        type: actionTypes.GENERATE_PDF_REQUEST,
        meta: { WebWorker: true, origin: document.location.origin },
        payload,
      });
    });
  });

  describe('generatePDFSuccess', () => {
    const pdf = {
      daily: {
        url: 'someURL',
        blob: 'someBlob',
      },
    };

    const action = actions.generatePDFSuccess(pdf);

    it('should be a TSA', () => {
      expect(isTSA(action)).to.be.true;
    });

    it('should create an action to store a generated pdf', () => {
      expect(action).to.deep.equal({
        type: actionTypes.GENERATE_PDF_SUCCESS,
        payload: { pdf },
      });
    });
  });

  describe('generatePDFFailure', () => {
    const error = new Error;

    const action = actions.generatePDFFailure(error);

    it('should be a TSA', () => {
      expect(isTSA(action)).to.be.true;
    });

    it('should create an action notify of a pdf generation failure', () => {
      expect(action).to.deep.equal({
        type: actionTypes.GENERATE_PDF_FAILURE,
        error,
      });
    });
  });

  describe('removeGeneratedPDFS', () => {
    const action = actions.removeGeneratedPDFS();

    it('should be a TSA', () => {
      expect(isTSA(action)).to.be.true;
    });

    it('should create an action to remove all generated PDFs', () => {
      expect(action).to.deep.equal({
        type: actionTypes.REMOVE_GENERATED_PDFS,
      });
    });
  });
});
