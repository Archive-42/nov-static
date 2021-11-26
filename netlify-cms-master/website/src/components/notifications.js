import React from 'react';

import Notification from './notification';

function Notifications({ notifications }) {
  return notifications.map((node, i) => (
    <Notification key={i} url={node.url} loud={node.loud}>
      {node.message}
    </Notification>
  ));
}

export default Notifications;
