import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../../store/hooks';
import { setSidebarWidth } from '../../../../../store/entities/ui/preferences';

// import CollapsibleBox from '../../../../elements/CollapsibleBox';
import ColumnDragger from '../../../../elements/ColumnDragger';
import SidebarButton from '../../../../elements/SidebarButton';

import styles from './styles.module.scss';

const Sidebar: React.FC = () => {
  const savedWidth = useAppSelector(state => state.ui.preferences.sidebarWidth);
  // const collapsedIds = useAppSelector(state => state.ui.preferences.collapsedAccountIds);
  const [width, setWidth] = useState<number>(savedWidth);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation(['projectInfo', 'bookmarks']);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    setWidth(savedWidth);
  }, [savedWidth]);

  // const handleCollapseChange = (id: number, collapsed?: boolean) => {
  //   collapsed
  //     ? dispatch(addCollapsedAccountId(id))
  //     : dispatch(removeCollapsedAccountId(id));
  // };

  // const handleAccountContextMenu = (account: Account) => {
  //   window.api.send('openEmailSidebarAccountContextMenu', account);
  // };

  return (
    <div
      className={styles.sidebar}
      style={{ flex: `0 0 ${width}px` }}
      ref={columnRef}
    >
      <div className={styles.contents}>
        <SidebarButton
          to='/'
          icon={<span className='material-icons'>info</span>}
          end
        >
          {t('projectInfo:projectInfo')}
        </SidebarButton>

        <SidebarButton
          to='/bookmarks'
          icon={<span className='material-icons'>bookmark</span>}
        >
          {t('bookmarks:bookmarks')}
        </SidebarButton>

        {/* {Array.isArray(accounts) && accounts.length > 0 ? accounts.map(account => (
          <span key={`account-${account.id}`}>
            {account.active && (
              <CollapsibleBox
                title={account.description || account.emailAddress}
                onCollapseChange={(collapsed?: boolean) => handleCollapseChange(account.id, collapsed)}
                isCollapsed={collapsedIds.includes(account.id)}
                onLabelContextMenu={() => handleAccountContextMenu(account)}
              >
                {account.folders && sortFolders(account.folders, account.type).map(folder => (
                  <Folder
                    key={`folder-${folder.id}`}
                    account={account}
                    folder={folder}
                    icon={<FolderIcon folder={folder} />}
                  >
                    {getFolderName(folder)}
                  </Folder>
                ))}
              </CollapsibleBox>
            )}
          </span>
        )) : (
          <Button
            className={styles.addAccountButton}
            large
            icon={<span className='material-icons'>add</span>}
            onClick={() => window.api.send('openPreferencesWindow', '/accounts/add')}
          >
            {t('accounts:addAccount')}
          </Button>
        )} */}
      </div>

      <ColumnDragger
        columnRef={columnRef}
        setWidth={setWidth}
        setStoreWidth={setSidebarWidth}
      />
    </div>
  );
};

export default Sidebar;
