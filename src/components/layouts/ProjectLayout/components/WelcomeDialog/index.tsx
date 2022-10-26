import React from 'react';

import Dialog from '../../../../elements/Dialog';
import DialogContent from '../../../../elements/DialogContent';

const WelcomeDialog: React.FC = () => {
  return (
    <Dialog open={true} onClose={() => {}}>
      <DialogContent>
        test
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
