import React from 'react';

const combineProviders = (...providers) => providers.reduce(
    (AccumulatedProviders, Provider) => (props) => (
        <AccumulatedProviders {...props}>
            <Provider {...props} />
        </AccumulatedProviders>
    ),
    ({ children }) => children
);

export default combineProviders;