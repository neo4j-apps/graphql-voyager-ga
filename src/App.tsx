import React from 'react';
import {Voyager} from 'graphql-voyager';
import './voyager.css';

const url = new URL(window.location.href);
const relateApiEndpoint = url.searchParams.get('neo4jDesktopApiUrl');

const relateApiClientId = url.searchParams.get('neo4jDesktopGraphAppClientId');

const graphQLEndpoint = relateApiEndpoint || 'https://movies.grandstack.io/';

function introspectionProvider(query:string) {
  return fetch(graphQLEndpoint, {
    method: 'post',
    headers: { 
      'Content-Type': 'application/json', 
      'ClientId': relateApiClientId || 'missing client id'
    },
    body: JSON.stringify({query: query}),
  }).then(response => response.json());
}

function App() {
  return (
    <Voyager 
      introspection={introspectionProvider} 
      workerURI={process.env.PUBLIC_URL + '/voyager.worker.js'}
      />
  );
}

export default App;
