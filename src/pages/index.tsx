import React from 'react';
import Layout from '../components/Layout';
import { withApollo } from '../utilities/withApollo';

const Index = () => (
  <Layout>
    <h1>M A X I M U S</h1>
  </Layout>
);

export default withApollo({ ssr: true })(Index);
