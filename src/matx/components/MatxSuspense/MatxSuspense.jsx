/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MatxLoading } from '../..';
import axios from '../../../axios';

const MatxSuspense = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (props.loadbar) {
      axios.interceptors.request.use((config) => {
        // spinning start to show
        setLoading(true);
        return config;
      }, (error) => {
        setLoading(false);
        return Promise.reject(error);
      });

      axios.interceptors.response.use((response) => {
        // spinning hide
        setLoading(false);

        return response;
      }, (error) => {
        setLoading(false);
        return Promise.reject(error);
      });
    }
  }, []);

  // eslint-disable-next-line react/jsx-one-expression-per-line
  return <Suspense fallback={<MatxLoading />}>{loading && props.loadbar && <LinearProgress />}{props.children}</Suspense>;
};

export default MatxSuspense;
