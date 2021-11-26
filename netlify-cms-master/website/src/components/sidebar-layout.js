import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Page from './page';
import { mq } from '../utils';

const Children = styled.div`
  overflow: hidden;
  padding-left: 2rem;
`;

function SidebarLayout({ sidebar, children }) {
  return (
    <Page
      css={css`
        ${mq[1]} {
          display: grid;
          grid-template-columns: ${sidebar ? '300px' : ''} minmax(0, 1fr);
          grid-gap: 2rem;
        }
      `}
    >
      {sidebar && <div>{sidebar}</div>}
      <Children>{children}</Children>
    </Page>
  );
}

export default SidebarLayout;
