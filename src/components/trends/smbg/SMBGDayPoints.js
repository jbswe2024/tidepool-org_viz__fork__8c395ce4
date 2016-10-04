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

import React, { PropTypes } from 'react';
import _ from 'lodash';

import { findClassForValue } from '../../../utils/trends/bgBoundary';

const SMBGDayPoints = (props) => {
  const { data } = props;
  if (!data) {
    return null;
  }

  const { radius, xScale, yScale } = props;

  const renderSmbg = (smbg) => {
    const focus = () => {
      console.log('focused on', smbg.id);
    };
    const unfocus = () => {
      console.log('unfocus', smbg.id);
    };
    return (
      <circle
        className={findClassForValue(smbg.value)}
        key={`smbg-${smbg.id}`}
        id={`smbg-${smbg.id}`}
        onMouseOver={focus}
        onMouseOut={unfocus}
        cx={xScale(smbg.msX)}
        cy={yScale(smbg.value)}
        r={radius}
      />
    );
  };

  const smbgs = _.each(data, (smbg) => ({
    renderSmbg(smbg);
  });

  return (
    <g id="smbgs">
      {smbgs}
    </g>
  );
};

SMBGDayPoints.defaultProps = {
  radius: 7,
};

SMBGDayPoints.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    msX: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
};

export default SMBGDayPoints;
